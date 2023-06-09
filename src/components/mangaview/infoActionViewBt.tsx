import React, { } from "react";

import { MangaLang } from "@/constants/configBase";

import { BookOpenIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";


const InfoActionViewBt = ({ config, data, fnChangeVidewMode, listImg, CurrentImage, SetCurrentImage, ImageSelect, SetImageSelect, prev_img, next_img, viewMode }:
    { config: MangaLang, data: any, fnChangeVidewMode: any, listImg: any, CurrentImage: any, SetCurrentImage: any, ImageSelect: any, SetImageSelect: any, prev_img: any, next_img: any, viewMode: any }) => {



    return (

        <div id="action-info-bt" className="my-5 text-center ">
            <div className="flex flex-col font-semibold text-xs lg:text-sm">
            {viewMode == 'N' &&<div id="act-image" className="flex flex-row flex-wrap my-3 gap-3">
                    { CurrentImage == 0 && <a
                        title={`Prev Image ${data.idDetailPrev}`}
                        className="w-1/3 justify-end flex-1 line-through rounded border-curent hover:border-dashed mb-2 py-2 flex cursor-pointer border border-slate-700   hover:border-orange-400 dark:hover:border-orange-400 hover:text-orange-500 dark:hover:text-orange-400 h-9" >
                        <ChevronDoubleLeftIcon className="inline w-6" /> {config.configSetting.lbl_prev_data} Image
                    </a>}
                    { CurrentImage != 0 && <a
                        title={`Prev Image ${data.idDetailPrev}`}
                        onClick={prev_img}
                        className="w-1/3 justify-end flex-1 rounded border-curent hover:border-dashed  mb-2  py-1.5 flex cursor-pointer border border-slate-700  hover:border-sky-400 dark:hover:border-sky-400 hover:text-sky-500 dark:hover:text-sky-400 h-9" >
                        <ChevronDoubleLeftIcon className="inline w-6" />{config.configSetting.lbl_prev_data} Image
                    </a>}

                    <a
                        title={`Select Image ${data.idDetailPrev}`}
                        className="w-1/3 justify-center flex-1 rounded border-curent hover:border-dashed p-1 mb-2 flex cursor-pointer border border-slate-700 hover:border-sky-400 dark:hover:border-sky-400 hover:text-sky-500 dark:hover:text-sky-400 h-9">
                        <BookOpenIcon className="inline w-8 text-sky-400 dark:text-sky-500" /><strong className="inline text-orange-400 dark:text-orange-500 pt-1">{`[${CurrentImage + 1}/${listImg.length}]`}</strong>
                    </a>

                    {(CurrentImage < listImg.length - 1)  && <a
                        title={`Next Image ${data.idDetailNext}`}
                        onClick={next_img}
                        className="w-1/3 justify-start rounded border-curent hover:border-dashed  mb-2 flex cursor-pointer border border-slate-700  py-1.5  hover:border-sky-400 dark:hover:border-sky-400 hover:text-sky-500 dark:hover:text-sky-400 h-9" >
                        {config.configSetting.lbl_next_data} Image <ChevronDoubleRightIcon className="w-6 inline " />
                    </a>}
                    {(CurrentImage >= listImg.length - 1) && <a
                        title={`Next Image ${data.idDetailNext}`}
                        className="w-1/3 justify-start line-through rounded border-curent hover:border-dashed  mb-2 flex cursor-pointer border border-slate-700 py-1.5 hover:border-orange-400 dark:hover:border-orange-400 hover:text-orange-500 dark:hover:text-orange-400 h-9">
                        {config.configSetting.lbl_next_data} Image <ChevronDoubleRightIcon className="w-6 inline " />
                    </a>}
                </div>
                }
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
