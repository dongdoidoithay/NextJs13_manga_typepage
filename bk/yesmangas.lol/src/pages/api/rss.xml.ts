import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import {
  ActMangaSource,
  MangaLang,
  SelectMangaTypeByPage,
} from "@/constants/configBase";
import { FetchApi } from "@/constants/FetchApi";
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
    let config = SelectMangaTypeByPage("");
    let xmlresult:any = [];
    for (const item of ActMangaSource) {
      config = SelectMangaTypeByPage(item.value);
      let _data = await FetchData(config);
      //console.log("server-sitemap", _data);
      let fields = _data.map((item: any) => {
        const url = `${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${item.idDoc}${config.configPrefix.endManga}`;
        return `<item>
          <title><![CDATA[${item.name}]]></title>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${new Date().toUTCString()}</pubDate>
          <description><![CDATA[${item.nameOther ? item.nameOther : ""} ${
          item.desc ? item.desc : ""
        }]]></description>
          
          <content:encoded><![CDATA[${item.nameOther} ${item.desc} tag ${
          item.tags
        }]]></content:encoded>
        </item>`;
      });
      xmlresult = xmlresult.concat(fields);
    }

    // Add urlSet to entire sitemap string

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
      <channel>
      <title>${config.configSetting.sb_seo_df_title}</title>
      <description>${
        config.configSetting.sb_seo_page_default_desc
      }</description>
      <link>${config.configPrefix.url_host}</link>
      <atom:link href="${
        config.configPrefix.url_host
      }/api/rss.xml" type="application/rss+xml" />
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      ${xmlresult.join("")}
      </channel>
      
      </rss>`;

    // set response content header to xml
    res.setHeader("Content-Type", "text/xml; charset=utf-8");
    res.setHeader("Accept-Encoding", "*");
    return res.status(200).send(sitemap);
  } catch (e: unknown) {
    if (!(e instanceof Error)) {
      throw e;
    }

    return res.status(500).json({ error: e.message || "" });
  }
});

export default handler;
