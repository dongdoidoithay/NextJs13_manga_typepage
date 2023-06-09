"use client";
import { FetchApi } from '@/constants/FetchApi';
import { MangaLang, SelectMangaTypeByPage } from '@/constants/configBase';
import ImageLoading from '@/ui/ImageLoading';
import { Boundary } from '@/ui/boundary';
import getDate from '@/utils/caldate';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import { useQuery } from 'react-query';


const FetchData = async (config: MangaLang, typeApi: string, idFind: string, page: any) => {
    console.log("FetchData",{typeApi,idFind,page});
  let _fixid = '';
  if (idFind != '' && idFind != null && idFind != undefined && page != undefined && page != null) {
    switch(typeApi) 
    {
      case "genres":
        if (idFind != null && idFind.length > 0) {
          _fixid = idFind.replace(config.configPrefix.startGenre, '').replace(config.configPrefix.endGenre, '');
        }
        if (_fixid != '' && _fixid != null) {
          return await FetchApi(config.apiPath + config.endPointPath.mangaGenres + _fixid + '/' + page);
        }
      break;
      case "year":
        if (idFind != null && idFind.length > 0) {
          _fixid = idFind.replace(config.configPrefix.startYear, '').replace(config.configPrefix.endYear, '');
        }
        if (_fixid != '' && _fixid != null) {
          return await FetchApi(config.apiPath + config.endPointPath.mangaYear + _fixid + '/' + page);
        }
      break;
      case "status":
        if (idFind != null && idFind.length > 0) {
          _fixid = idFind.replace(config.configPrefix.startStatus, '').replace(config.configPrefix.endStatus, '');
        }
        if (_fixid != '' && _fixid != null) {
          return await FetchApi(config.apiPath + config.endPointPath.mangaStatus + _fixid + '/' + page);
        }
      break;
      case "auth":
        if (idFind != null && idFind.length > 0) {
          _fixid = idFind.replace(config.configPrefix.startAuth, '').replace(config.configPrefix.endAuth, '');
        }
        if (_fixid != '' && _fixid != null) {
          return await FetchApi(config.apiPath + config.endPointPath.mangaAuth + _fixid + '/' + page);
        }
      break;
      case "art":
        if (idFind != null && idFind.length > 0) {
          _fixid = idFind.replace(config.configPrefix.startArt, '').replace(config.configPrefix.endArt, '');
        }
        if (_fixid != '' && _fixid != null) {
          return await FetchApi(config.apiPath + config.endPointPath.mangaArt + _fixid + '/' + page);
        }
      break;
      case "type":
        if (idFind != null && idFind.length > 0) {
          _fixid = idFind.replace(config.configPrefix.startType, '').replace(config.configPrefix.endType, '');
        }
        if (_fixid != '' && _fixid != null) {
          return await FetchApi(config.apiPath + config.endPointPath.mangaType + _fixid + '/' + page);
        }
      break;
      case "alpha":
        if (idFind != null && idFind.length > 0) {
          _fixid = idFind.replace(config.configPrefix.startAlphaBet, '').replace(config.configPrefix.endAlphaBet, '');
        }
        if (_fixid != '' && _fixid != null) {
          return await FetchApi(config.apiPath + config.endPointPath.mangaAlpha + _fixid + '/' + page);
        }
      break;

      default:
        return null;
    }
  }
  else
    return null;
}
const MangaByGroup = ({ typeManga, typeApi, idFind, pageIndex}:any) => {
  let config = SelectMangaTypeByPage(typeManga);
  const [page, setPage] = useState(pageIndex);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeManga== undefined || page == undefined) {
      setPage(0)
    }
  }, [page])

  const {
    data,
    isFetching
  } = useQuery(['FetchDataMangaByGroup', config.typeName, idFind, typeApi, page], () => FetchData(config, typeApi, idFind, page), {retry: 10,staleTime: 10000, cacheTime: 5000, keepPreviousData: true, refetchOnWindowFocus: false });


  if (!isFetching && data && page > 0) {
    setTimeout(() => {
        sectionRef.current?.scrollIntoView();
      }, 0);
  }
  const FnNext = () => {
    if (data&& (page+1) < data.totalPage)
    setPage(page + 1);
  }
  const FnPrev = () => {
    if (page > 0)
     setPage(page - 1);
  }

  const [loading, setLoading] = useState(false);
  const [itemLoading, setItemLoading] = useState<number>();
  const handleClick = (index:number) => {
    setLoading(true);
    setItemLoading(index);
  };


  const _renderItem = (data: any, index: number) => {

    const regex = new RegExp(`(${idFind})`, "gi");

    let resultOther='';
    const partsother = data.nameOther.split(regex);
    partsother.filter(String).map((part:any, i:number) => {
      if (regex.test(part)) {
        resultOther += '<strong class="text-orange-600 font-medium">' + part + '</strong>';
      } else {
        resultOther += part;
      }
    });
    
    
      return (
        <>
        {loading && index==itemLoading ? skeletonLoadding(): 
          <tr key={index + "-" + data.idDoc} className="border-b border-dotted border-slate-700 hover:border-dashed hover:border-sky-400">
            <td className="w-1/12 justify-center text-center text-lg font-semibold">
              <div className="border border-dashed justify-center w-10/12 bg-slate-950/70 overflow-hidden rounded-md p-1 m-2">
                <ImageLoading url={data.image} title={`${config.configSetting.lbl_start_manga} ${data.name}`} classStyle={"w-full object-cover"} />
              </div>
            </td>
            <td className="w-1/2">
              <a
                className="text-sm  text-sky-500 dark:text-sky-400 hover:text-md hover:font-semibold hover:text-sky-200"
                rel="nofollow"
                href={`${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${data.idDoc}${config.configPrefix.endManga}`}
                title={`${config.configSetting.lbl_start_manga} ${data.name}`}
                onClick={()=>handleClick(index)}
              >
                <div dangerouslySetInnerHTML={{ __html: data.name }}></div>
              </a>
              <div dangerouslySetInnerHTML={{ __html: resultOther }} className="break-word overflow-hidden first-line:uppercase line-clamp-2"></div>
            </td>
            <td className="hidden sm:block py-5 align-middle">
              <div className="items-center">
                <div>
                  {config.configSetting.lbl_inf_status}: <strong className="  text-sky-600 dark:text-sky-500">{data.status}</strong>
                </div>
                <div>
                  {config.configSetting.lbl_inf_View}: <strong className=" text-sky-600 dark:text-sky-500">{data.view}</strong>
                </div>
              </div>
            </td>
            <td className="w-1/5 xs:1/2">
              <table className="w-full text-left border-collapse text-sm ">
                <tbody>
                  {data.detail_documents &&
                    data.detail_documents.slice(0, 2).map((item: any, index: number) => (
                      <tr
                        className="m-3 border-b border-dotted border-slate-600 hover:border-dashed hover:border-sky-400"
                        key={index + "" + item.idDetail}
                      >
                        <td className="py-2 mr-1">
                          <a
                            className="text-sm text-sky-500 dark:text-sky-400 hover:text-md hover:font-semibold hover:text-sky-300"
                            rel="nofollow"
                            href={`${config.configPrefix.url_host}${config.configPrefix.pageViewManga}/${config.configPrefix.startManga}${item.idDoc}/${config.configPrefix.startViewmanga}${item.idDetail}${config.configPrefix.endViewmanga}`}
                            title={`${config.configSetting.lbl_start_manga} ${data.name} ${config.configSetting.lbl_start_chapter} ${item.idDetail}`}
                            onClick={()=>handleClick(index)}
                          >
                            {config.configSetting
                              ? config.configSetting.lbl_text_chapter
                              : ""} {item.idDetail}
                          </a>
                        </td>
                        <td className="hidden sm:block justify-end float-right">
                          {getDate(item.date, config)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </td>
          </tr>
          }
        </>
      );
    };
  const PageAction = () => {
      return (
        <>
          <div id="next-prev" className="my-3 flex flex-row gap-2 mr-2">
            {page == 0 && <a
    
              title={`${config.configSetting.lbl_prev_data} ${page - 1}`}
              className="cursor-pointer line-through hover:border-dashed w-1/2 block border border-slate-700 rounded p-2 text-center hover:border-orange-500 dark:hover:orange-sky-400  hover:text-orange-500 dark:hover:text-orange-400"  >
              <ChevronLeftIcon className="w-4 inline " />
              <b className="ml-3 font-semibold first-letter:uppercase">
                {config.configSetting.lbl_prev_data}
              </b>
            </a>
    
            }
            {page > 0 && <a
              onClick={FnPrev}
              title={`${config.configSetting.lbl_text_chapter} ${page - 1}`}
              className="cursor-pointer hover:border-dashed w-1/2 block border border-slate-700 rounded p-2 text-center hover:border-sky-500 dark:hover:border-sky-400  hover:text-sky-500 dark:hover:text-sky-400" >
              <ChevronLeftIcon className="w-4 inline " />
              <b className="ml-3 font-semibold first-letter:uppercase">
                {config.configSetting.lbl_prev_data}
              </b>
            </a>}
            {(page >= data.totalPage - 1) && <a
    
              title={`${config.configSetting.lbl_prev_data} ${page + 1}`}
              className="cursor-pointer line-through hover:border-dashed w-1/2 block border border-slate-700 rounded p-2 text-center hover:border-orange-500 dark:hover:orange-sky-400  hover:text-orange-500 dark:hover:text-orange-400" >
              <b className="mr-3 font-semibold first-letter:uppercase">
                {config.configSetting.lbl_next_data}
              </b>
              <ChevronRightIcon className="w-4 inline " />
            </a>}
            {(page < data.totalPage - 1) && (
              <a
                onClick={FnNext}
                title={`${config.configSetting.lbl_text_chapter} ${page + 1}`}
                className="cursor-pointer hover:border-dashed  w-1/2 block border border-slate-700 rounded p-2 text-center  hover:border-sky-500 dark:hover:border-sky-400  hover:text-sky-500 dark:hover:text-sky-400" >
                <b className="mr-3 font-semibold first-letter:uppercase">
                  {config.configSetting.lbl_next_data}
                </b>
                <ChevronRightIcon className="w-4 inline " />
              </a>
            )}
          </div>
        </>
      );
    };
    
  const skeletonLoadding = () => {
      return (
        <tr className="animate-pulse border border-blue-300 shadow rounded-md">
          <td className="w-1"><div className="h-5 bg-slate-700 rounded-full "></div></td>
          <td className="w-1/2 ml-1"><div className="h-3 bg-slate-700 rounded "></div></td>
          <td className="w-1/5"><div className="h-7 bg-slate-700 rounded"></div></td>
          <td className="w-1/5"><div className="h-3 bg-slate-700 rounded "></div></td>
        </tr>
      )
    };  
  const skeleton = () => {
    return (
      <tr className="animate-pulse border border-blue-300 shadow rounded-md">
        <td className="w-1"><div className="h-5 bg-slate-700 rounded-full "></div></td>
        <td className="w-1/2 ml-1"><div className="h-3 bg-slate-700 rounded "></div></td>
        <td className="w-1/5"><div className="h-7 bg-slate-700 rounded"></div></td>
        <td className="w-1/5"><div className="h-3 bg-slate-700 rounded "></div></td>
      </tr>
    )
  };
    const tableSkeleton = () => {
    return (
      <>
        {skeleton()}
        {skeleton()}
        {skeleton()}
        {skeleton()}
        {skeleton()}
        {skeleton()}
      </>
    )
    }
    
  return (
    <div ref={sectionRef}>
      <Boundary labels={`Result - ${idFind}`} />
       <table className="w-full text-left border-collapse text-sm ">
        <tbody>
            {isFetching && tableSkeleton()}
            {!isFetching && data && data.data && data.data.map((data: any, index: number) => (_renderItem(data, index)))}
        </tbody>
        </table>
        {/*load more*/}
        {!isFetching && data&& data.data && data.data.length>0 && PageAction()}
    </div>
  );
}
export default MangaByGroup;