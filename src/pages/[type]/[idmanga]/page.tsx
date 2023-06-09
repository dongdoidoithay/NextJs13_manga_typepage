"use client"
import AdsTop from "@/components/ads/ads_top_body";
import DisqusComments from "@/components/mangaInfo/disquscomment";
import InfoManga from "@/components/mangaInfo/infoManga";
import InfoMangaSkeletion from "@/components/mangaInfo/infoMangaSkeletion";
import { FetchApi } from "@/constants/FetchApi";
import baseSeo from "@/constants/baseSeo";
import { MangaLang, SelectMangaTypeByPage, SelectMangaTypeName } from "@/constants/configBase";
import { GlobalNav } from "@/ui/global-nav";
import {
  ChevronRightIcon,
  HomeIcon,
} from "@heroicons/react/20/solid";
import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";
import { useQuery } from "react-query";




const FetchData = async (config: MangaLang, idmanga: string) => {
  return await FetchApi(config.apiPath + config.endPointPath.infoManga + idmanga);
}

const Info = ({ params }: { params: { type: string, idmanga: string } }) => {
  let config = SelectMangaTypeByPage('');
  let _idmanga = '';
  if (params.type != undefined)
    config = SelectMangaTypeByPage(params.type.toString());
  if (params.idmanga != undefined) {
    _idmanga = params.idmanga.toString().replace(config.configPrefix.startManga, '').replace(config.configPrefix.endManga, '');
  }

  let _dataManga = useQuery(['GetInfoManga', _idmanga, config.typeName], () => FetchData(config, _idmanga), { retry: 10, staleTime: 10000, cacheTime: 5000, keepPreviousData: true, refetchOnWindowFocus: false });


  const breadcrumb = () => {
    return (
      <div id="breadcrumb" className="group block xs:hidden font-semibold mb-4">
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
          <li className="flex flex-row" itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
            <ChevronRightIcon className="block w-4 text-gray-400 mx-1" />{" "}
            {_dataManga.data?.name}
            <meta itemProp="name" content={_dataManga.data?.name} />
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </div>
    )
  }
  const breadcrumbSkeleton = () => {
    return (
      <div id="breadcrumb" className="group block xs:hidden animate-pulse border">
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
      
      <GlobalNav />
      <div className="lg:pl-60 ">
        <main className=" bg-slate-900/60 border border-slate-700">
          <div id="wapper" className="mt-4 px-2">
            <AdsTop/>
            {_dataManga.isLoading && breadcrumbSkeleton()}
            {!_dataManga.isLoading && breadcrumb()}
            {_dataManga.isLoading && <InfoMangaSkeletion config={config} />}
            {!_dataManga.isLoading && <InfoManga id={_idmanga} config={config} dataManga={_dataManga.data} />}

            {!_dataManga.isLoading && <div id="manga-comments" className="w-full bg-slate-900/70 ">
              <h3 className="font-semibold text-white/80 first-letter:uppercase before:content-['_↗']">
                {config.configSetting.lbl_inf_comment}
              </h3>
              {!_dataManga.isLoading && <DisqusComments image={_dataManga.data?.image} type={config.typeManga} url={`${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${_dataManga.data?.idDoc}${config.configPrefix.endManga}`} id={_dataManga.data?.idDoc} title={_dataManga.data?.name} />}
            </div>}
          </div>
        </main>
      </div>
    </>
  );
}


export default Info;