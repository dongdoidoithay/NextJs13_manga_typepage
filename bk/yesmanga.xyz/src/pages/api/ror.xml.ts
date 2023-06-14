import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { ActMangaSource, MangaLang, SelectMangaTypeByPage } from '@/constants/configBase';
import { FetchApi } from '@/constants/FetchApi';
//import feed from './feed.json';


const handler = nc();
const FetchData = async (config: MangaLang) => {
  return await FetchApi(config.apiPath + config.endPointPath.sitemapDoc + 20);
};
/**
 * Respond with an rss.xml
 *
 * @param {object} req NextApiRequest
 * @param {object} res NextApiResponse
 */
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
      // Method to source urls from cms
      let config = SelectMangaTypeByPage("");
      let xmlresult:any = [];
      for (const item of ActMangaSource) {
        config = SelectMangaTypeByPage(item.value);
        let _data = await FetchData(config);
        //console.log("server-sitemap", _data);
        let fields = _data.map((item: any) => {
          const url = `${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${item.idDoc}${config.configPrefix.endManga}`;
          return `<item>
          <link>${url}</link>
          <title><![CDATA[${item.name}]]></title>
          <pubDate>${new Date().toUTCString()}</pubDate>
          <description><![CDATA[${item.nameOther} ${item.desc?item.desc.replace(/{domain}/gm,config.configSetting.lbl_domain_Page):''} tag ${item.tags?item.tags:''}]]></description>
          <ror:updatePeriod>always</ror:updatePeriod>
          <ror:sortOrder>0</ror:sortOrder>
          <ror:type>Product</ror:type>
          </item>`;
        });
        xmlresult = xmlresult.concat(fields);
      }
  


    // Add urlSet to entire sitemap string

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:ror="http://rorweb.com/0.1/"  xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
      <channel>
      <title>${config.configSetting.sb_seo_df_title}</title>
      <link>${config.configPrefix.url_host}</link>
      <item>
         <title>${config.configSetting.sb_seo_df_title}</title>  
         <link>${config.configPrefix.url_host}</link>
         <description>${config.configSetting.sb_seo_page_default_desc}</description>
         <ror:type>Main</ror:type>
         <ror:keywords>${config.configSetting.sb_seo_page_default_key}</ror:keywords>
        <ror:image>${config.configSetting.sb_seo_default_image}</ror:image>
         <ror:updated>${new Date().toUTCString()}</ror:updated>
         <ror:updatePeriod>day</ror:updatePeriod>
      </item>

      ${xmlresult.join("")}

    <item>
        <title>Sitemap</title>
        <ror:type>SiteMap</ror:type>
        <ror:seeAlso>${config.configPrefix.url_host}/server-sitemap.xml</ror:seeAlso>
    </item>
      </channel>
      </rss>`;

    // set response content header to xml  
    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.setHeader('Accept-Encoding','*');
    return res.status(200).send(sitemap);
  } catch (e: unknown) {
    if (!(e instanceof Error)) {
      throw e;
    }

    return res.status(500).json({ error: e.message || '' });
  }
});

export default handler;
