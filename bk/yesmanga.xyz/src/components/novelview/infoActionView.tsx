import React, { useState } from "react";

import { toast } from "react-toastify";
import { BookmarkIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ExclamationTriangleIcon, HeartIcon, Square3Stack3DIcon, TagIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import ModelSettingView from "./settingView";

const FnSubscribe = () => {
    toast("🦄 Subscribe Functions under development", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const FnFavorite = () => {
    toast("🦄 Favorite Functions under development", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const FnReadLater = () => {
    toast("🦄 Read Later Functions under development", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const FnReportError = () => {
    toast("🦄 Report Error Functions under development", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
const InfoActionView = ({ 
    config, 
    data,
    fontSize,
    setfontSize,
    lineHieght,
    setLineHieght,
    bgColor,
    setBgColor,
    colorSelect,
    setColorSelect,
    fontFamilySelect,
    setFontFamilySelect}: any) => {
    
    const[modelSetting,setModelSetting]=useState(false);


    return (
        <>
            <div id="info" className="my-1 mx-2">
                <h1 className="font-semibold text-2xl  text-white/80 first-line:uppercase">
                    {data?.nameDoc}
                    <span className="pl-2 first-line:uppercase text-current before:content-['_↗']">{config.configSetting.lbl_text_chapter} <strong>{data.idDetail} </strong></span>
                </h1>
            </div>
            <div id="action-info" className="flex flex-wrap flex-col sm:flex-row">
                <div className="flex flex-1 flex-wrap gap-0  my-1 items-center">
                    <button
                        onClick={()=>setModelSetting(!modelSetting)}
                        type="button"
                        className="px-2 text-sm hover:text-sky-500 dark:hover:text-sky-400 h-9 text-sky-500 dark:text-sky-400 font-semibold relative " >
                       <div><Square3Stack3DIcon className="inline w-4 " /> Setting View </div>
                        <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                        </span>
                    </button>
                    <button type="button" className="px-2 text-sm hover:text-sky-500 dark:hover:text-sky-400 h-9" onClick={FnSubscribe}>
                        <BookmarkIcon className="inline w-4 hover:animate-bounce" /> Subscribe
                    </button>
                    <button type="button" className="px-2 text-sm hover:text-sky-500 dark:hover:text-sky-400 h-9"  onClick={FnFavorite}>
                        <HeartIcon className="inline w-4 animate-pin hover:animate-spin" /> Favorite
                    </button>

                    <button type="button" className=" px-2 text-sm hover:text-sky-500 dark:hover:text-sky-400 h-9" onClick={FnReadLater}>
                        <TagIcon className="inline w-4 " /> Read Later
                    </button>
                   <button type="button" className="px-2 text-sm  hover:text-orange-500 dark:hover:text-orange-400 h-9" onClick={FnReportError}>
                        <ExclamationTriangleIcon className="inline w-4" /> Report Error
                    </button> 
                </div>
                <div className="flex flex-wrap font-semibold my-1">
                    <div>
                        {data.idDetailPrev == '' && <a 
                            title={`Next Chapter ${data.idDetailPrev}`}
                            className="line-through text-de px-2 text-sm hover:text-orange-500 dark:hover:text-orange-400 h-9">
                            <ChevronDoubleLeftIcon className="inline w-6" />  {config.configSetting.lbl_prev_data}   {config.configSetting.lbl_text_chapter} 
                        </a>}
                        {data.idDetailPrev && <Link 
                            title={`Prev Chapter ${data.idDetailPrev}`}
                            href={`${config.configPrefix.url_host}${config.configPrefix.pageViewManga}/${config.configPrefix.startManga}${data.idDoc}/${config.configPrefix.startViewmanga}${data.idDetailPrev}${config.configPrefix.endViewmanga}`} 
                            className="cursor-pointer px-2 text-sm hover:text-sky-500 dark:hover:text-sky-400 h-9">
                            <ChevronDoubleLeftIcon className="inline w-6" /> {config.configSetting.lbl_prev_data}  {config.configSetting.lbl_text_chapter} 
                        </Link>}

                        {data.idDetailNext && <Link 
                            title={`Next Chapter ${data.idDetailNext}`}
                            href={`${config.configPrefix.url_host}${config.configPrefix.pageViewManga}/${config.configPrefix.startManga}${data.idDoc}/${config.configPrefix.startViewmanga}${data.idDetailNext}${config.configPrefix.endViewmanga}`} 
                            className="cursor-pointer px-2 text-sm hover:text-sky-500 dark:hover:text-sky-400 h-9">
                            {config.configSetting.lbl_next_data}   {config.configSetting.lbl_text_chapter}  <ChevronDoubleRightIcon className="w-6 inline " />
                        </Link>}
                        {data.idDetailNext == '' && <a 
                            title={`Next Chapter ${data.idDetailNext}`}
                            className="line-through text-de px-2 text-sm hover:text-orange-500 dark:hover:text-orange-400 h-9">
                            {config.configSetting.lbl_next_data}  {config.configSetting.lbl_text_chapter} <ChevronDoubleRightIcon className="w-6 inline " />
                        </a>}
                    </div>
                </div>
            </div>
            <ModelSettingView
             config={config} 
             data={data} 
             show={modelSetting}  
             setShow={setModelSetting}
             fontSize={fontSize}
             setfontSize={setfontSize}
             lineHieght={lineHieght}
             setLineHieght={setLineHieght}
             bgColor={bgColor}
             setBgColor={setBgColor}
             colorSelect={colorSelect}
             setColorSelect={setColorSelect}
             fontFamilySelect={fontFamilySelect}
             setFontFamilySelect={setFontFamilySelect}
            
            
           />
        </>
    );
};
export default InfoActionView;
