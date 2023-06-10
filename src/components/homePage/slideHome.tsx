import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules
import { Autoplay, FreeMode, Pagination } from "swiper";



import { MangaLang, SelectMangaTypeByPage } from "@/constants/configBase";
import { FetchApi } from "@/constants/FetchApi";
import { useQuery } from "react-query";
import getDate from "@/utils/caldate";
import ImageLoading from "@/ui/ImageLoading";
import { useState } from "react";
import { Boundary } from "@/ui/boundary";

import baseSeo from "@/constants/baseSeo";

const FetchDataTrend = async (config: MangaLang) => {
  return await FetchApi(config.apiPath + config.endPointPath.homeTren);
};
const FetchDataSlide = async (config: MangaLang) => {
  return await FetchApi(config.apiPath + config.endPointPath.homeSlide);
};

const SliderHome = ({ typeManga }: any) => {
  const [imangeSlide, setImangeSlide] = useState<any>(null)
  const [imangeSlideError, setImangeSlideError] = useState<boolean>(false)

  let config = SelectMangaTypeByPage(typeManga);
  const _fetchDataSlide = useQuery(
    ["Slide", typeManga],
    () => FetchDataSlide(config),
    {
      retry: 10,
      staleTime: 10000,
      cacheTime: 5000,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  const _fetchDataTrend = useQuery(
    ["Trend", typeManga],
    () => FetchDataTrend(config),
    {
      retry: 10,
      staleTime: 10000,
      cacheTime: 5000,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  const trending = (data: any) => {

    return (
      <a
        key={data.idDoc}
        rel="nofollow"
        href={`${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${data.idDoc}${config.configPrefix.endManga}`}
        className="border border-slate-700 rounded-md hover:border-dashed hover:border-sky-400 w-full h-64 overflow-hidden"
      >
        <div className="relative bg-red-950 ">
           <ImageLoading url={data.image} title="silde" classStyle="w-full object-cover"/>
           <div className="absolute inset-0  bg-stripes-gray bg-slate-800/95 mt-32 text-sm rounded-md"></div>
          
            <div className="absolute mt-32 text-sm px-1 inset-0">
              <h2 className="py-1 truncate ... font-semibold first-line:uppercase text-sky-500 dark:text-sky-400 first-letter:text-2xl first-letter:font-bold w-80" >
                {data.name}
              </h2>
              <div className="block text-slate-300 dark:text-slate-400 toverflow-hidden">
                {config.configSetting.lbl_inf_Genres}:<span className="font-semibold runcate ... inline"> {data.genres}</span>
              </div>
              <span className="block text-slate-300 dark:text-slate-400">
                {config.configSetting.lbl_inf_date}:<span className="font-semibold"> {getDate(data.date, config)}</span>
              </span>
            </div> 
        </div>
      </a>
    )
  };

  const blockSlide = (dataArr: any) => {
    return (
      dataArr &&
      dataArr.map((_data: any, indx: number) => {
        let data = _data.document;
        return (
          <a
            className="flex h-1/2 w-full lg:w-1/2 text-sm text-sky-500 dark:text-sky-400  hover:text-sky-200 "
            key={data.idDoc}
            rel="nofollow"
            href={`${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${data.idDoc}${config.configPrefix.endManga}`}
          >
            <div
              id="box"
              className="flex flex-row mx-1 my-1 border border-slate-700 rounded-lg w-full hover:border-dashed hover:border-sky-400"
            >
              <div id="image-box" className="flex w-1/3 h-28">
                <ImageLoading
                  url={data.image}
                  title={data.nameSeo}
                  classStyle="w-full object-cover rounded-lg"
                />
              </div>
              <div id="conten" className="flex flex-col w-2/3">
                <h2 className="px-1 truncate .. font-semibold first-line:uppercase first-letter:text-xl hover:text-md hover:font-semibold hover:text-sky-200 w-full">
                  {data.name}
                </h2>
                <span className="px-1  text-slate-300 dark:text-slate-400">
                  {config.configSetting.lbl_inf_status}:{" "}
                  <strong>{data.status}</strong>
                </span>
                <span className="px-1  text-slate-300 dark:text-slate-400">
                  {config.configSetting.lbl_inf_date}:{" "}
                  <strong>{getDate(data.date, config)}</strong>
                </span>
                {/*  <span className="px-1">{config.configSetting.lbl_inf_Type}:{data.type}</span> */}
                <span className="px-1  text-slate-300 dark:text-slate-400">
                  {config.configSetting.lbl_inf_Year}:{" "}
                  <strong>{data.year}</strong>
                </span>
              </div>
            </div>
          </a>
        );
      })
    );
  };

  const skeletonSlide = () => {
    return (
      <div className="flex w-full lg:w-1/2 p-1">
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
  const slideSkeleton = () => {
    return (
      <>
        <div className="lg:flex-row flex-wrap">
          {skeletonSlide()}
          {skeletonSlide()}

        </div>
      </>
    );
  };
  const trendingkeleton = () => {
    return (
      <>
        <div className="relative h-64 bg-cover bg-no-repeat bg-inherit bg-center rounded-md xs:w-full">
          {skeletonSlide()}

        </div>
      </>
    );
  };
  const json_ld={
    "@context": "http://schema.org",
    "@type": "WebSite",
    "name": baseSeo.domainName,
    "url": baseSeo.canonical,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseSeo.canonical}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }
  
  return (
    <>
      <Boundary labels={config.configSetting.Lbl_Home_Hot}/>
      <div className="flex flex-col lg:flex-row">
        <div className="flex w-full lg:w-1/3 ">
          {_fetchDataTrend?.isLoading && trendingkeleton()}
          {!_fetchDataTrend?.isLoading &&
            _fetchDataTrend?.data &&
            trending(_fetchDataTrend?.data[0].document)}
        </div>
        <div className="flex w-full lg:w-2/3">
          {_fetchDataSlide.isLoading && slideSkeleton()}
          <Swiper
            slidesPerView={1}
            spaceBetween={1}
            loop={true}
            freeMode={true}
            autoplay={{
              delay: 6500,
              disableOnInteraction: false,
            }}
            navigation={true}
            /*  pagination={{
                clickable: true,
              }} */
            modules={[Autoplay, FreeMode, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide className="flex-col lg:flex-row flex-wrap">
              {!_fetchDataSlide.isLoading &&
                _fetchDataSlide.data &&
                blockSlide(_fetchDataSlide.data.slice(0, 4))}
            </SwiperSlide>
            <SwiperSlide className="flex-col lg:flex-row flex-wrap">
              {!_fetchDataSlide.isLoading &&
                _fetchDataSlide.data &&
                blockSlide(_fetchDataSlide.data.slice(5, 9))}
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default SliderHome;
