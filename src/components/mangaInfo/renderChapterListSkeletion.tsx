"use client";
import { MangaLang } from "@/constants/configBase";
import {
  BarsArrowUpIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";


 const RenderChapterListSkeletion = ({config}:{config: MangaLang}) => {


  const LoadingChapterList=()=>{
    return(
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


  return (
    <>
      <div id="chapter-list" className="">
        <div id="header-list" className="flex flex-row h-8 my-3">
          <h3 className="font-semibold text-white/80 first-letter:uppercase before:content-['≣_'] mr-3">
            {config.configSetting.lbl_inf_chapter_list}
          </h3>
          <b></b>
        </div>
        <div id="search-chapter" className="flex flex-row h-8 my-2 mr-2">
          <input
            className="flex-1 mr-4 text-sm text-white leading-6 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-4 pr-3  dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700"
            placeholder="Search Chapter. Example: 25 or 178"
            autoComplete="off" 
          />
          <a  className="cursor-pointer">
              <BarsArrowUpIcon className="w-6 inline  text-sky-500 dark:text-sky-400" />Sort
          </a>
        </div>
        {/** co thoi gian sua dang gird */}
        <div className="flex flex-wrap flex-row">
        { LoadingChapterList()}
        
        </div>

        {/**Page Action */}
     {/*    {PageAction()} */}
      </div>
    </>
  );
};
export default RenderChapterListSkeletion; 
