import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';


import { SelectMangaTypeByPage } from '@/constants/configBase';
import { FetchApi } from '@/constants/FetchApi';

//import feed from './feed.json';


const handler = nc();

/**
 * Respond with an rss.xml
 *
 * @param {object} req NextApiRequest
 * @param {object} res NextApiResponse
 */
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {

      // Method to source urls from cms
      const { type,idmanga,iddetail } = req.query;
      let config = SelectMangaTypeByPage('');
      if(type!=undefined)
        config = SelectMangaTypeByPage(type.toString());


      let _fixid='';
      if (idmanga != null && idmanga.length > 0) {
        _fixid = idmanga.toString().replace(config.configPrefix.startManga, '').replace(config.configPrefix.endManga, '');
      }
      let _fixiddetail='';
      if (iddetail != null && iddetail.length > 0) {
        _fixiddetail = iddetail.toString().replace(config.configPrefix.startViewmanga, '').replace(config.configPrefix.endViewmanga, '');
   
      }
      let manga=null;

      manga= await FetchApi(config.apiPath + config.endPointPath.infoManga + _fixid);

      let manga_des_full='';
      let manga_title='';
      let manga_key_word='';
      let name_author='';
     if(manga){
       /* if (manga.listAuthors && manga.listAuthors.length > 0) {
         name_author = `(by ${manga.listAuthors[0].name})`;
      } */
      manga_des_full=config.configSetting.desc_info_manga.replace(/{name}/gi,manga.name).replace(/{nameOther}/g,manga.nameOther).replace(/{auth}/g,name_author).replace(/{domain}/g,config.configSetting.lbl_domain_name).replace(/{chapter}/g,_fixiddetail);
      manga_title=config.configSetting.info_name_manga_title.replace(/{name}/gi,manga.name).replace(/{nameOther}/g,manga.nameOther).replace(/{auth}/g,name_author).replace(/{domain}/g,config.configSetting.lbl_domain_name).replace(/{chapter}/g,_fixiddetail);
      manga_key_word = config.configSetting.keyword_view_name_chapter.replace(/{name}/gi, manga.name).replace(/{nameOther}/g, manga.nameOther).replace(/{auth}/g, name_author).replace(/{domain}/g, config.configSetting.lbl_domain_name).replace(/{chapter}/g, _fixiddetail);
      
     }



    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:ror="http://rorweb.com/0.1/" 
                        xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
                        xmlns:dc="http://purl.org/dc/elements/1.1/"
                        xmlns:content="http://purl.org/rss/1.0/modules/content/" 
                        xmlns:atom="http://www.w3.org/2005/Atom"  >
      <channel>
      <title>${manga_title}</title>
      <link>${config.configPrefix.url_host}${config.configPrefix.pageViewManga}/${config.configPrefix.startManga}${manga.idDoc}${config.configPrefix.endManga}/${config.configPrefix.startViewmanga}${_fixiddetail}${config.configPrefix.endViewmanga}</link>
      <language>en-us</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <description>${manga_des_full}</description>
      <docs>${config.configPrefix.url_host}/api${config.configPrefix.pageViewManga}/${config.configPrefix.startManga}${manga.idDoc}${config.configPrefix.endManga}/${config.configPrefix.startViewmanga}${_fixiddetail}${config.configPrefix.endViewmanga}/feed</docs>
      <sy:updatePeriod>hourly</sy:updatePeriod>
      <sy:updateFrequency>1</sy:updateFrequency>
      <atom:link href="${config.configPrefix.url_host}/api${config.configPrefix.pageViewManga}/${config.configPrefix.startManga}${manga.idDoc}${config.configPrefix.endManga}/${config.configPrefix.startViewmanga}${_fixiddetail}${config.configPrefix.endViewmanga}/feed" type="application/rss+xml" />
      <atom:link href="${config.configPrefix.url_host}/api${config.configPrefix.pageViewManga}/${config.configPrefix.startManga}${manga.idDoc}${config.configPrefix.endManga}/rss.xml" type="application/rss+xml" />
      <atom:link href="${config.configPrefix.url_host}/api${config.configPrefix.pageViewManga}/${config.configPrefix.startManga}${manga.idDoc}${config.configPrefix.endManga}/${config.configPrefix.startViewmanga}${_fixiddetail}${config.configPrefix.endViewmanga}/rss.xml" type="application/rss+xml" />
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
