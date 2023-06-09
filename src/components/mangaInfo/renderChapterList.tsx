"use client";
import { FetchApi } from "@/constants/FetchApi";
import baseSeo from "@/constants/baseSeo";
import { MangaLang } from "@/constants/configBase";
import getDate from "@/utils/caldate";
import { getStorage, setStorage } from "@/utils/localFx";
import {
  ArrowPathIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  RectangleGroupIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

const FetchDataChaper = async (
  config: MangaLang,
  idmanga: string,
  idDetail: string,
  sort: string,
  currentPage: number
) => {
  return await FetchApi(
    config.apiPath +
    config.endPointPath.infoChapter +
    idmanga +
    "/16/" +
    currentPage +
    "/" +
    idDetail +
    "/" +
    sort
  );
};
const SkeletonLoadding = () => {
  return (
    <div className="w-1/2 md:w-1/4 animate-pulse">
      <div className="rounded border-curent hover:border-dashed hover:border-sky-400 dark:hover:border-sky-400 mr-2 mb-2 hover:text-sky-500 dark:hover:text-sky-400 flex border border-slate-700  p-1" >
        <div className="rounded-full bg-slate-700 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <ArrowPathIcon className="w-4 animate-spin font-semibold"/> Loadding...
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};  


const RenderChapterList = ({ id, config, mangaName,idchapter,dataManga,isSeo}: { id: string, config: MangaLang,mangaName: any,idchapter?:any,dataManga:any,isSeo:boolean }) => {
  const [idDetailFilter, setIdDetailFilter] = useState("all");
  const [sort, setSort] = useState("ASC");
  const [currentPage, SetCurrentPage] = useState(0);
  const [valueFind, setValueFind] = useState("");
  let _fixid = "";
  if (id != null) {
    _fixid = id
      .replace(config.configPrefix.startManga, "")
      .replace(config.configPrefix.endManga, "");
  }

  useEffect(() => {
    var cookie_sort = getStorage(config.localKey?.localSort);
    if (cookie_sort != null) {
      setSort(cookie_sort.toString());
    }
  }, [sort, setSort]);

  const {
    isLoading: isLoadingChapter,
    data: dataChapter,
    isFetching: isFetchingChapter,
  } = useQuery(
    [
      "GetChapterFilter",
      _fixid,
      config.typeName,
      idDetailFilter,
      sort,
      currentPage,
    ],
    () => FetchDataChaper(config, _fixid, idDetailFilter, sort, currentPage),
    {
      retry: 10,
      staleTime: 10000,
      cacheTime: 5000,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const FnFindChapter = (input: any) => {
    let _word = input.target.value;
    if (_word.length <= 0) {
      setIdDetailFilter("all");
      SetCurrentPage(0);
      setValueFind("");
    } else {
      setIdDetailFilter(_word);
      SetCurrentPage(0);
      setValueFind(_word);
    }
  };
  const FnSortChapter = () => {
    let _sort = "DESC";
    if (sort == "DESC") {
      setSort("ASC");
      _sort = "ASC";
    }
    if (sort == "ASC") setSort("DESC");
    SetCurrentPage(0);
    setStorage(config.localKey.localSort, _sort, 30 * 24 * 60 * 60);
  };

  const FnNextChapter = () => {
    if (currentPage + 1 < dataChapter.totalPage)
      SetCurrentPage(currentPage + 1);
    else {
      toast("≫ Page last", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const FnPrevChapter = () => {
    if (currentPage > 0) SetCurrentPage(currentPage - 1)
    else {
      toast("≪ Page First", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const PageAction = () => {
    return (
      <div id="next-prev" className="my-3 flex flex-row gap-2 mr-2">
        {currentPage == 0 && <a

          title={`${config.configSetting.lbl_prev_data} ${currentPage - 1}`}
          className="cursor-pointer line-through hover:border-dashed w-1/2 block border border-slate-700 rounded p-2 text-center hover:border-orange-500 dark:hover:orange-sky-400  hover:text-orange-500 dark:hover:text-orange-400" >
          <ChevronLeftIcon className="w-4 inline " />
          <b className="ml-3 font-semibold first-letter:uppercase">
            {config.configSetting.lbl_prev_data}
          </b>
        </a>

        }
        {currentPage > 0 && <a
          onClick={FnPrevChapter}
          title={`${config.configSetting.lbl_text_chapter} ${currentPage - 1}`}
          className="cursor-pointer hover:border-dashed w-1/2 block border border-slate-700 rounded p-2 text-center hover:border-sky-500 dark:hover:border-sky-400  hover:text-sky-500 dark:hover:text-sky-400">
          <ChevronLeftIcon className="w-4 inline " />
          <b className="ml-3 font-semibold first-letter:uppercase">
            {config.configSetting.lbl_prev_data}
          </b>
        </a>}
        {dataChapter && (currentPage >= dataChapter.totalPage - 1) && <a

          title={`${config.configSetting.lbl_prev_data} ${currentPage - 1}`}
          className="cursor-pointer line-through hover:border-dashed w-1/2 block border border-slate-700 rounded p-2 text-center hover:border-orange-500 dark:hover:orange-sky-400  hover:text-orange-500 dark:hover:text-orange-400">
          <b className="mr-3 font-semibold first-letter:uppercase">
            {config.configSetting.lbl_next_data}
          </b>
          <ChevronRightIcon className="w-4 inline " />
        </a>}
        {dataChapter && (currentPage < dataChapter.totalPage - 1) && (
          <a
            onClick={FnNextChapter}
            title={`${config.configSetting.lbl_text_chapter} ${currentPage + 1}`}
            className="cursor-pointer hover:border-dashed  w-1/2 block border border-slate-700 rounded p-2 text-center  hover:border-sky-500 dark:hover:border-sky-400  hover:text-sky-500 dark:hover:text-sky-400">
            <b className="mr-3 font-semibold first-letter:uppercase">
              {config.configSetting.lbl_next_data}
            </b>
            <ChevronRightIcon className="w-4 inline " />
          </a>
        )}
      </div>
    );
  };

  const searchNodata = () => {
    if (
      (!isFetchingChapter && !isLoadingChapter && dataChapter == undefined) ||
      (dataChapter && dataChapter.data && dataChapter.data.length == 0)
    )
      return (
        <div className="w-full animate-pulse">
          <div className="rounded border-curent hover:border-dashed hover:border-sky-400 dark:hover:border-sky-400 mr-2 mb-2 hover:text-sky-500 dark:hover:text-sky-400 flex border border-slate-700  p-1" >

            <div className="flex-1 space-y-1 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-1 font-semibold p-auto text-lg text-center text-sky-500 dark:text-sky-400">No Data Found</div>
            </div>
          </div>
        </div>
      );
  };
  const LoadingChapterList = () => {
    return (
      <>
        <div className="w-1/2 md:w-1/4 animate-pulse">
          <div className="rounded border-curent hover:border-dashed hover:border-sky-400 dark:hover:border-sky-400 mr-2 mb-2 hover:text-sky-500 dark:hover:text-sky-400 flex border border-slate-700  p-1" >
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 md:w-1/4 animate-pulse">
          <div className="rounded border-curent hover:border-dashed hover:border-sky-400 dark:hover:border-sky-400 mr-2 mb-2 hover:text-sky-500 dark:hover:text-sky-400 flex border border-slate-700  p-1" >
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 md:w-1/4 animate-pulse">
          <div className="rounded border-curent hover:border-dashed hover:border-sky-400 dark:hover:border-sky-400 mr-2 mb-2 hover:text-sky-500 dark:hover:text-sky-400 flex border border-slate-700  p-1" >
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 md:w-1/4 animate-pulse">
          <div className="rounded border-curent hover:border-dashed hover:border-sky-400 dark:hover:border-sky-400 mr-2 mb-2 hover:text-sky-500 dark:hover:text-sky-400 flex border border-slate-700  p-1" >
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }


let histIdchap = "";
var cookie_obj = JSON.parse(
  getStorage(config.localKey.localReadView) as string
);
if (cookie_obj != null && _fixid ) {
  for (var i = 0; i < cookie_obj.length; i++) {
    var obj = cookie_obj[i];
    if (obj["comicId"] == _fixid) {
      histIdchap = obj["chapterId"];
      break;
    }
  }
}
let json_ld={};
if(isSeo){
  let des_full='';
  if (dataManga.desc != null && dataManga.desc != "") {
    des_full = dataManga.desc
      .replace(/"/gi, "")
      .replace(/{domain}/g, config.configSetting.lbl_domain_name);
  } else {
    des_full = config.configSetting.desc_info_manga
      .replace(/{name}/gi, dataManga.name)
      .replace(/{nameOther}/g, dataManga.nameOther)
      .replace(/{auth}/g, '')
      .replace(/{domain}/g, config.configSetting.lbl_domain_name)
      .replace(/{chapter}/g, '');
  }
  const key_word =
  config.configSetting.keyword_info_manga
    .replace(/{name}/gi, dataManga.name)
    .replace(/{nameOther}/g, dataManga.nameOther)
    .replace(/{auth}/g, '')
    .replace(/{domain}/g, config.configSetting.lbl_domain_name)
    .replace(/{chapter}/g, idchapter) + dataManga.tags;
    const title = config.configSetting.info_name_manga_title
  .replace(/{name}/gi, dataManga.name)
  .replace(/{nameOther}/g, dataManga.nameOther)
  .replace(/{auth}/g, '')
  .replace(/{domain}/g, config.configSetting.lbl_domain_name)
  .replace(/{chapter}/g, idchapter);
  const url=`${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${dataManga.idDoc}${config.configPrefix.endManga}`;
 
 
  let _arrPart:any=[];
  if(!isFetchingChapter &&
    !isLoadingChapter &&
    dataChapter &&
    dataChapter.data ){
      dataChapter.data.map((item: any, index: number) => {
        const url_part=`${config.configPrefix.url_host}${config.configPrefix.pageViewManga}/${config.configPrefix.startManga}${item.idDoc}${config.configPrefix.endManga}/${config.configPrefix.startViewmanga}${item.idDetail}${config.configPrefix.endViewmanga}`;
        const _itenpart={
            "@type": "ComicIssue",
            "name": dataManga.name+" #"+item.idDetail,
            "url": url_part,
            "issueNumber": item.idDetail,
            "datePublished": new Date(dataManga.date).toUTCString(),
            "image": dataManga.image,
            "description": des_full,
            "about": {
              "@type": "Thing",
              "name": title,
              "url": url
            }
        };

        _arrPart.push(_itenpart);
      })
    }
 
 
  json_ld={
    "@context": "https://schema.org/",
    "@type": "ComicSeries",
    "name": title,
    "url": url,
    "image": dataManga.image,
    "description": des_full,
    "publisher": {
      "@type": "Organization",
      "name": baseSeo.publisher,
      "url": baseSeo.canonical,
      "logo": {
        "@type": "ImageObject",
        "url": "/icon.svg",
        "width": 283,
        "height": 81
      }
    },
    "creator": {
      "@type": "Person",
      "name": baseSeo.publisher
    },
    "keywords": key_word,
    "genre": "Superhero",
    "inLanguage": "English",
    "isPartOf": {
      "@type": "ComicSeries",
      "name": dataManga.name,
      "url": url
    },
    "alternateName": dataManga.nameOther,
    "startDate": dataManga.year,
    "endDate": "present",
    "sameAs": [
      "https://www.wikidata.org/wiki/"+dataManga.idDoc
    ],
    
    "hasPart": _arrPart
  }
}

let json_chapter_ld={}
if(!isFetchingChapter &&
  !isLoadingChapter &&
  dataChapter &&
  dataChapter.data ){
  let chapter_js:any=[];
  dataChapter.data.map((item: any, index: number) => {
    const url_part=`${config.configPrefix.url_host}${config.configPrefix.pageViewManga}/${config.configPrefix.startManga}${item.idDoc}${config.configPrefix.endManga}/${config.configPrefix.startViewmanga}${item.idDetail}${config.configPrefix.endViewmanga}`;
    const _itenpart={
        "@type": "ListItem",
        "position": index+4,
        "name": `${config.configSetting.lbl_text_chapter} ${item.idDetail}`,
        "item": url_part
      };

      chapter_js.push(_itenpart);
  })
  json_chapter_ld={
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseSeo.canonical
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Type Manga",
        "item": `${config.configPrefix.url_host}${config.configPrefix.pageManga}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": mangaName,
        "item": `${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${_fixid}${config.configPrefix.endManga}`
      },
      ...chapter_js
    ]
  }
} 
//onclick loadding

const [loading, setLoading] = useState(false);
const [itemLoading, setItemLoading] = useState<number>();
const handleClick = (index:number) => {
  setLoading(true);
  setItemLoading(index);
};


  return (
    <>
     {isSeo && <Helmet>
        <script type="application/ld+json">{JSON.stringify(json_ld)}</script>
      </Helmet>
      }
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(json_chapter_ld)}</script>
      </Helmet>

      <div id="chapter-list" className="">
        <div id="header-list" className="flex flex-row h-8 my-3">
          <h3 className="font-semibold text-white/80 first-letter:uppercase before:content-['≣_'] mr-3">
            {config.configSetting.lbl_inf_chapter_list}
          </h3>
          <b>{mangaName}</b>
        </div>
        <div id="search-chapter" className="flex flex-row h-8 my-2 mr-2">
          <input
            className="flex-1 mr-4 text-sm text-white leading-6 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-4 pr-3  dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700"
            placeholder="Search Chapter. Example: 25 or 178"
            autoComplete="off" onChange={(e) => FnFindChapter(e)} value={valueFind}
          />
          <a onClick={() => FnSortChapter()} className="cursor-pointer" >
            {sort == "ASC" ? (
              <BarsArrowUpIcon className="w-6 inline  text-sky-500 dark:text-sky-400" />
            ) : (
              <BarsArrowDownIcon className="w-6 inline  text-sky-500 dark:text-sky-400" />
            )}
            Sort
          </a>
        </div>
        {/** co thoi gian sua dang gird */}
        <div className="flex flex-wrap flex-row">
          {searchNodata()}
          {isFetchingChapter && LoadingChapterList()}
          {!isFetchingChapter &&
            !isLoadingChapter &&
            dataChapter &&
            dataChapter.data &&
            dataChapter.data.map((item: any, index: number) => {
              let active=item.idDetail===idchapter || item.idDetail===histIdchap;
              return (
                <>
                {/*  {loading && index==itemLoading ? <SkeletonLoadding key={item.idDetail + "-" + index}/>: */}
                 <div
                  className="w-1/2 md:w-1/4"
                  key={item.idDetail + "-" + index}
                >
                  <a
                    href={`${config.configPrefix.url_host}${config.configPrefix.pageViewManga}/${config.configPrefix.startManga}${item.idDoc}${config.configPrefix.endManga}/${config.configPrefix.startViewmanga}${item.idDetail}${config.configPrefix.endViewmanga}`}
                    title={`${config.configSetting.lbl_text_chapter} ${item.idDetail}`}
                    className={clsx('rounded border-curent hover:border-dashed hover:border-sky-400 dark:hover:border-sky-400 mr-2 mb-2 hover:text-sky-500 dark:hover:text-sky-400 flex border  p-1',{
                        'border-slate-700':!active,
                        'border-orange-500':active,
                    })}
                    onClick={()=>handleClick(index)}
                  >
                    <CheckCircleIcon className={clsx('w-4 inline',{
                      ' text-orange-500 dark:text-orange-500':active,
                    })}/>
                    <div className="flex-0">
                      <p className={clsx('ml-3 font-semibold first-letter:uppercase gap-2 ',{
                         ' text-sky-500 dark:text-sky-400':!active,
                         ' text-orange-500 dark:text-orange-500':active,
                      })}>
                        <RectangleGroupIcon className="w-4 inline" /> {config.configSetting.lbl_text_chapter} {item.idDetail}
                      </p>
                      <i className={clsx('ml-3',{
                      ' text-orange-500 dark:text-orange-500':active,
                    })}>
                        <ClockIcon className="w-4 inline" /> {config.configSetting.lbl_inf_date}: {getDate(item.date, config)}
                      </i>
                    </div>
                  </a>
                </div>
               {/*  } */}
              </>
              );
            })}
        </div>

        {/**Page Action */}
        {PageAction()}
      </div>
    </>
  );
};
export default RenderChapterList; 
