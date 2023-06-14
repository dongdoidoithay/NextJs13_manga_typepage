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
        return `${url}\n`;
      });

      xmlresult = xmlresult.concat(fields);
    }

    // Add urlSet to entire sitemap string
    const sitemap = `${xmlresult.join('')}`;

    // set response content header to xml
    res.setHeader("Content-Type", "text/plain");

    return res.status(200).send(sitemap);
  } catch (e: unknown) {
    if (!(e instanceof Error)) {
      throw e;
    }

    return res.status(500).json({ error: e.message || "" });
  }
});

export default handler;
