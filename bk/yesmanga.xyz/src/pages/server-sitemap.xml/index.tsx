import { getServerSideSitemapLegacy } from 'next-sitemap'
///import { GetServerSideProps } from 'next'
import { ActMangaSource, MangaLang, SelectMangaTypeByPage } from '@/constants/configBase';
import { FetchApi } from '@/constants/FetchApi';
import { GetServerSideProps } from 'next';
const FetchData = async (config: MangaLang) => {

  return await FetchApi(config.apiPath + config.endPointPath.sitemapDoc + 200);
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    let xmlresult: any = [];
    for (const item of ActMangaSource) {
        let config = SelectMangaTypeByPage(item.value);
        let _data = await FetchData(config);
        //console.log("server-sitemap", _data);
        if (_data != null && _data.length > 0) {
            let fields = _data.map((item: any) => ({
                loc: `${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${item.idDoc}${config.configPrefix.endManga}`,
                lastmod: new Date().toISOString(),
                changefreq: 'always',
                priority: 1
            }));
            // const fields = [...newsSitemaps];
            //xmlresult=xmlresult.concat(fields);
            xmlresult = [...fields];
        }
    }
    console.log("server-sitemap", xmlresult.length);
    return getServerSideSitemapLegacy(ctx, xmlresult);
}

// Default export to prevent next.js errors
export default () => { }