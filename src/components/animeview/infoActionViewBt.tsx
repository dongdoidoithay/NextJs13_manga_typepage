import React, { } from "react";

import { MangaLang } from "@/constants/configBase";

import { BookOpenIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";


const InfoActionViewBt = ({ config, data }:
    { config: MangaLang, data: any}) => {



    return (

        <div id="action-info-bt" className="my-5 text-center ">
            <div className="flex flex-col font-semibold text-xs lg:text-sm">
                <div id="act-chapter" className="flex flex-row flex-wrap my-3 gap-3">
                    {data.idDetailPrev == '' && <a
                        title={`Next Chapter ${data.idDetailPrev}`}
                        className="w-1/2 justify-center flex-1 line-through rounded border-curent hover:border-dashed mb-2 flex cursor-pointer border border-slate-700  py-1.5  hover:border-sky-400 dark:hover:border-sky-400 hover:text-orange-500 dark:hover:text-orange-400 h-9">
                        <ChevronDoubleLeftIcon className="inline w-6" />  {config.configSetting.lbl_prev_data} Chapter 
                    </a>}
                    {data.idDetailPrev && <a
                        title={`Prev Chapter ${data.idDetailPrev}`}
                        href={`${config.configPrefix.url_host}${config.configPrefix.pageViewManga}/${config.configPrefix.startManga}${data.idDoc}/${config.configPrefix.startViewmanga}${data.idDetailPrev}${config.configPrefix.endViewmanga}`}
                        className="w-1/2 justify-center flex-1 rounded border-curent hover:border-dashed  mb-2 flex cursor-pointer border border-slate-700 py-1.5 hover:border-sky-400 dark:hover:border-sky-400 hover:text-sky-500 dark:hover:text-sky-400 h-9">
                        <ChevronDoubleLeftIcon className="inline w-6" /> {config.configSetting.lbl_prev_data} Chapter <p className="pl-2 text-sky-500 dark:text-sky-400">{data.idDetailPrev}</p> 
                    </a>}

                    {data.idDetailNext && <a
                        title={`Next Chapter ${data.idDetailNext}`}
                        href={`${config.configPrefix.url_host}${config.configPrefix.pageViewManga}/${config.configPrefix.startManga}${data.idDoc}/${config.configPrefix.startViewmanga}${data.idDetailNext}${config.configPrefix.endViewmanga}`}
                        className="w-1/2 justify-center rounded border-curent hover:border-dashed  mb-2 flex cursor-pointer border border-slate-700  py-1.5  hover:border-sky-400 dark:hover:border-sky-400 hover:text-sky-500 dark:hover:text-sky-400 h-9">
                        {config.configSetting.lbl_next_data} Chapter <p className="pl-2 text-sky-500 dark:text-sky-400">{data.idDetailNext}</p>  <ChevronDoubleRightIcon className="w-6 inline " />
                    </a>}
                    {data.idDetailNext == '' && <a
                        title={`Next Chapter ${data.idDetailNext}`}
                        className="w-1/2 justify-center line-through rounded border-curent hover:border-dashed  mb-2 flex cursor-pointer border border-slate-700 py-1.5 hover:border-sky-400 dark:hover:border-sky-400 hover:text-orange-500 dark:hover:text-orange-400 h-9">
                        {config.configSetting.lbl_next_data} Chapter <ChevronDoubleRightIcon className="w-6 inline " />
                    </a>}
                </div>
            </div>
        </div>
    );
};
export default InfoActionViewBt;
