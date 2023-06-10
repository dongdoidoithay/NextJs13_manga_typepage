
import AdsTop from "@/components/ads/ads_top_body";
import InfoViewManga from "@/components/mangaview/infoView";
import InfoViewNovels from "@/components/novelview/infoView";
import { FetchApi } from "@/constants/FetchApi";
import { MangaLang, SelectMangaTypeByPage, SelectMangaTypeName } from "@/constants/configBase";
import { _Prefix_Root_Novel } from "@/constants/configPrefixBase";
import { GlobalNavView } from "@/ui/global-nav-view";
import {
  ChevronRightIcon,
  HomeIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { useQuery } from "react-query";
import { useRouter } from 'next/router'
const FetchData = async (config: MangaLang, idmanga: string, iddetail: string) => {
  // console.log("url trend", config.apiPath + config.endPointPath.checkTrend + idmanga)
  return await await FetchApi(config.apiPath + config.endPointPath.viewmanga + idmanga + "/" + iddetail)
}


export default function DetaiView() {
  const router = useRouter();
  let config = SelectMangaTypeByPage('');
  let _idmanga = '';
  let _iddetail = '';
  if (router.query.type != undefined)
    config = SelectMangaTypeByPage(router.query.type.toString());
  if (router.query.idmanga != undefined) {
    _idmanga = router.query.idmanga.toString().replace(config.configPrefix.startManga, '').replace(config.configPrefix.endManga, '');
  }
  if (router.query.iddetail != undefined) {
    _iddetail = router.query.iddetail.toString().replace(config.configPrefix.startViewmanga, '').replace(config.configPrefix.endViewmanga, '');
  }

  let _dataManga = useQuery(['GetDetailManga', _idmanga, _iddetail, config.typeName], () => FetchData(config, _idmanga, _iddetail,), { retry: 10, staleTime: 10000, cacheTime: 5000, keepPreviousData: true, refetchOnWindowFocus: false });

  //console.log("_dataManga", _dataManga)

  const breadcrumb = () => {
    return (
      <div id="breadcrumb" className="group block xs:hidden font-semibold mb-4 mt-4 4-50">
        <ol className="list-outside list-none flex flex-wrap gap-1" itemScope itemType="http://schema.org/BreadcrumbList">
          <li className="flex flex-row flex-nowrap  hover:text-sky-500 dark:hover:text-sky-400" itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
            <HomeIcon className="block w-6 mx-1" />
            <Link href={`${config.configPrefix.url_host}`}
              className="hover:text-sky-500 dark:hover:text-sky-400"
              itemProp="name">
              {config.configSetting.lbl_domain_home}
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <li className="flex flex-row flex-nowrap  hover:text-sky-500 dark:hover:text-sky-400" itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
            <ChevronRightIcon className="block w-4 mx-1" />
            <Link href={`${config.configPrefix.url_host}${config.configPrefix.pageManga}`}
              className="hover:text-sky-500 dark:hover:text-sky-400"
              itemProp="name">
              {SelectMangaTypeName(config.typeName)}

            </Link>
            <meta itemProp="position" content="2" />
          </li>
          <li className="flex flex-row flex-nowrap  hover:text-sky-500 dark:hover:text-sky-400" itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
            <ChevronRightIcon className="block w-4 mx-1" />
            <Link href={`${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${_dataManga.data.idDoc}${config.configPrefix.endManga}`}
              className="hover:text-sky-500 dark:hover:text-sky-400"
              itemProp="name">
              {_dataManga.data.nameDoc}

            </Link>
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
            <Link href={`${config.configPrefix.url_host}`}
              className="hover:text-sky-500 dark:hover:text-sky-400"
              itemProp="name">
              {config.configSetting.lbl_domain_home}
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <li className="flex flex-row flex-nowrap  hover:text-sky-500 dark:hover:text-sky-400" itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
            <ChevronRightIcon className="block w-4 mx-1" />
            <Link href={`${config.configPrefix.url_host}${config.configPrefix.pageManga}`} className="hover:text-sky-500 dark:hover:text-sky-400">
              {SelectMangaTypeName(config.typeName)}
            </Link>
            <meta itemProp="position" content="2" />
          </li>
          <li className="flex flex-row rounded-full" itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
            <ChevronRightIcon className="block w-4 text-gray-400 mx-1" />
          </li>
        </ol>
      </div>

    );
  }
  return (
    <>
      <GlobalNavView />
      <main className="px-0 lg:px-2 bg-slate-900/60 border border-slate-700">
        {_dataManga.isLoading && breadcrumbSkeleton()}
        {!_dataManga.isLoading && breadcrumb()}
          <AdsTop/>
        {router.query.type != undefined && router.query.type != _Prefix_Root_Novel && <InfoViewManga config={config} data={_dataManga.data} loading={_dataManga.isLoading} />} 
        {router.query.type != undefined && router.query.type == _Prefix_Root_Novel && <InfoViewNovels config={config} data={_dataManga.data} loading={_dataManga.isLoading} />} 
        
        <div id="manga suggets"></div>

      </main>
    </>
  );
}
