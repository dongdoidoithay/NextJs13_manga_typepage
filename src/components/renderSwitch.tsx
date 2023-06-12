import { FetchApi } from "@/constants/FetchApi"
import InfoViewNovels from "./novelview/infoView"
import InfoViewAnime from "./animeview/infoView"
import InfoViewManga from "./mangaview/infoView"
import { MangaLang, SelectMangaTypeName } from "@/constants/configBase"
import { _Prefix_Root_Anime, _Prefix_Root_Novel } from "@/constants/configPrefixBase"
import { useQuery } from "react-query"
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid"

const FetchData = async (config: MangaLang, idmanga: string, iddetail: string) => {
    // console.log("url trend", config.apiPath + config.endPointPath.checkTrend + idmanga)
    //FetchApi(config.apiPath + config.endPointPath.viewmanga + encodeURIComponent(_idmanga) + "/" + encodeURIComponent(_iddetail))
    return await FetchApi(config.apiPath + config.endPointPath.viewmanga + encodeURIComponent(idmanga) + "/" + encodeURIComponent(iddetail))
  }
const RenderSwitch=({type,config,idmanga,iddetail}:{type:any,config:MangaLang,idmanga:any,iddetail:any})=> {
    let _dataManga = useQuery(['GetDetailManga', idmanga, iddetail, config.typeName], () => FetchData(config, idmanga, iddetail,), { retry: 10, staleTime: 10000, cacheTime: 5000, keepPreviousData: true, refetchOnWindowFocus: false });

    const breadcrumb = () => {
        return (
          <div id="breadcrumb" className="group block xs:hidden font-semibold mb-4 mt-4 4-50">
            <ol className="list-outside list-none flex flex-wrap gap-1" itemScope itemType="http://schema.org/BreadcrumbList">
              <li className="flex flex-row flex-nowrap  hover:text-sky-500 dark:hover:text-sky-400" itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                <HomeIcon className="block w-6 mx-1" />
                <a href={`${config.configPrefix.url_host}`}
                  className="hover:text-sky-500 dark:hover:text-sky-400"
                  itemProp="name">
                  {config.configSetting.lbl_domain_home}
                </a>
                <meta itemProp="position" content="1" />
              </li>
              <li className="flex flex-row flex-nowrap  hover:text-sky-500 dark:hover:text-sky-400" itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                <ChevronRightIcon className="block w-4 mx-1" />
                <a href={`${config.configPrefix.url_host}${config.configPrefix.pageManga}`}
                  className="hover:text-sky-500 dark:hover:text-sky-400"
                  itemProp="name">
                  {SelectMangaTypeName(config.typeName)}
    
                </a>
                <meta itemProp="position" content="2" />
              </li>
              <li className="flex flex-row flex-nowrap  hover:text-sky-500 dark:hover:text-sky-400" itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                <ChevronRightIcon className="block w-4 mx-1" />
                <a href={`${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${_dataManga.data.idDoc}${config.configPrefix.endManga}`}
                  className="hover:text-sky-500 dark:hover:text-sky-400"
                  itemProp="name">
                  {_dataManga.data.nameDoc}
    
                </a>
                <meta itemProp="position" content="3" />
              </li>
    
              <li className="flex flex-row" itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                <ChevronRightIcon className="block w-4 text-gray-400 mx-1" />{" "}
                {config.configSetting.lbl_start_chapter} {_dataManga.data?.idDetail}
                <meta itemProp="name" content={`${config.configSetting.lbl_start_chapter} ${_dataManga.data?.idDetail}`} />
                <meta itemProp="position" content="4" />
              </li>
            </ol>
          </div>
        )
      }
      const breadcrumbSkeleton = () => {
        return (
          <div id="breadcrumb" className="group block xs:hidden font-semibold mb-4 mt-4 animate-pulse border">
            <ol className="list-outside list-none flex flex-wrap gap-1" itemScope itemType="http://schema.org/BreadcrumbList">
              <li className="flex flex-row flex-nowrap  hover:text-sky-500 dark:hover:text-sky-400" itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                <HomeIcon className="block w-6 mx-1 " />
                <a href={`${config.configPrefix.url_host}`}
                  className="hover:text-sky-500 dark:hover:text-sky-400"
                  itemProp="name">
                  {config.configSetting.lbl_domain_home}
                </a>
                <meta itemProp="position" content="1" />
              </li>
              <li className="flex flex-row flex-nowrap  hover:text-sky-500 dark:hover:text-sky-400" itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                <ChevronRightIcon className="block w-4 mx-1" />
                <a href={`${config.configPrefix.url_host}${config.configPrefix.pageManga}`} className="hover:text-sky-500 dark:hover:text-sky-400">
                  {SelectMangaTypeName(config.typeName)}
                </a>
                <meta itemProp="position" content="2" />
              </li>
              <li className="flex flex-row rounded-full" itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                <ChevronRightIcon className="block w-4 text-gray-400 mx-1" />
              </li>
            </ol>
          </div>
    
        );
      }

    switch(type) {
      case _Prefix_Root_Novel:
        return (
        <>
            {_dataManga.isLoading && breadcrumbSkeleton()}
            {!_dataManga.isLoading && breadcrumb()}
            <InfoViewNovels config={config} data={_dataManga.data} loading={_dataManga.isLoading} />
        </>
        )
      case _Prefix_Root_Anime:
          return (
            <>
                {_dataManga.isLoading && breadcrumbSkeleton()}
                {!_dataManga.isLoading && breadcrumb()}
                <InfoViewAnime config={config} data={_dataManga.data} loading={_dataManga.isLoading} />
            </>
            )
      default:
        return  (
            <>
                {_dataManga.isLoading && breadcrumbSkeleton()}
                {!_dataManga.isLoading && breadcrumb()}
                <InfoViewManga config={config} data={_dataManga.data} loading={_dataManga.isLoading} />
            </>
            )
    }
  }
export default RenderSwitch;