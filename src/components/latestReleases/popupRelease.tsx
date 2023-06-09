"use client";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules

import "@/styles/slide.css";

import { MangaLang, SelectMangaTypeByPage } from "@/constants/configBase";
import { FetchApi } from "@/constants/FetchApi";
import { useQuery } from "react-query";
import getDate from "@/utils/caldate";
import ImageLoading from "@/ui/ImageLoading";
import { Boundary } from "@/ui/boundary";
import Link from "next/link";
import { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

const FetchDataPopular = async (config: MangaLang) => {
  return await FetchApi(config.apiPath + config.endPointPath.homePopular);
};
const PopupRelease = ({ typeManga }: any) => {
  let config = SelectMangaTypeByPage(typeManga);
  const _fetchDataPopular = useQuery(
    ["_fetchDataPopular", typeManga],
    () => FetchDataPopular(config),
    {
      retry: 10,
      staleTime: 10000,
      cacheTime: 5000,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const [loading, setLoading] = useState(false);
  const [itemLoading, setItemLoading] = useState<number>();
  const handleClick = (index:number) => {
    setLoading(true);
    setItemLoading(index);
  };
  const skeletonLoadding = () => {
    return (
      <tr className="animate-pulse border border-blue-300 shadow rounded-md">
      <td className="w-1"><div className="h-5 bg-slate-700 rounded-full "><ArrowPathIcon className="w-4 animate-spin font-semibold"/></div></td>
      <td className="w-1/2 ml-1"><div className="h-3 bg-slate-700 rounded ">Loadding..</div></td>
      <td className="w-1/5"><div className="h-7 bg-slate-700 rounded"></div></td>
      <td className="w-1/5"><div className="h-3 bg-slate-700 rounded "></div></td>
    </tr>
    )
  };  

  const popular = (data: any, index: number) => {
    return (
      <>
       {loading && index==itemLoading ? skeletonLoadding():
        <a
        rel="nofollow"
        href={`${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${data.idDoc}${config.configPrefix.endManga}`}
        title={`${config.configSetting.lbl_inf_start_manga} ${data.name}`}
        key={index}
        className="relative rounded-xl lg:w-1/2 w-full text-sm text-sky-500 dark:text-sky-400 " 
        onClick={()=>handleClick(index)}
      >
        <div className="overflow-auto my-1 mx-1 border rounded-lg  hover:border-dashed hover:border-sky-400">
          <div className="overflow-hidden relative mx-auto flex items-center gap-6">
            <ImageLoading
              url={data.image}
              title={data.nameSeo}
              classStyle="absolute  w-24 h-24 rounded-full shadow-lg"
            />
            <div className="flex flex-col py-5 pl-24 ">
              <h2 className="px-1 truncate .. font-semibold first-line:uppercase first-letter:text-xl hover:text-md hover:font-semibold hover:text-sky-200">
                {data.name}
              </h2>
              <span className="px-1 text-slate-300 dark:text-slate-400">
                {config.configSetting.lbl_inf_status}:{" "}
                <strong>{data.status}</strong>
              </span>
              <span className="px-1 text-slate-300 dark:text-slate-400">
                {config.configSetting.lbl_inf_date}:{" "}
                <strong>{getDate(data.date, config)}</strong>
              </span>
            </div>
          </div>
        </div>
        </a>
      }
      </>
    );
  };
  const skeleton = () => {
    return (
      <div className="w-full lg:w-1/2 p-1">
        <div className="animate-pulse flex space-x-4 mx-1 my-1 border border-blue-300 shadow rounded-md ">
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const popularSkeleton = () => {
    return (
      <>
        {skeleton()}
        {skeleton()}
        {skeleton()}
        {skeleton()}
      </>
    );
  };

  return (
    <>
      <Boundary labels={config.configSetting.Lbl_Home_Pop}/>
      <div className="flex flex-wrap  pt-1">
        {_fetchDataPopular.isLoading && popularSkeleton()}
        {!_fetchDataPopular.isLoading &&
          _fetchDataPopular.data &&
          _fetchDataPopular.data.map((data: any, index: number) =>
            popular(data.document, index)
          )}
      </div>
    </>
  );
};

export default PopupRelease;
