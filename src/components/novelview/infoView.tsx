import React, { useState } from "react";

import { MangaLang } from "@/constants/configBase";
import StoreLocalView from "./storeLocalView";
import ContenView from "./contenView";
import InfoActionView from "./infoActionView";
import RenderChapterList from "../mangaInfo/renderChapterList";
import InfoActionViewSkeletion from "./infoActionViewSkeletion";
import ContenViewSkeletion from "./contenViewSkeletion";
import DisqusComments from "../mangaInfo/disquscomment";
import InfoActionViewBt from "./infoActionViewBt";
import AdsDetail from "@/ads/ads_detail";


const InfoViewNovels = ({ config, data ,loading}: { config: MangaLang, data: any,loading:boolean }) => {
//novels
const [fontSize, setfontSize] = useState(19);
const [lineHeight, setLineHeight] = useState(1.9);
const [bgColor, setBgColor] = useState(null);
const [colorSelect, setColorSelect] = useState(null);
const [fontFamilySelect, setFontFamilySelect] = useState(null);
const [showISettingView, setShowSettingView] = useState(false);
    //set hist
    if (data) {
        StoreLocalView(config, data);
    }
    //seo
    let name_author = '';
    let des_meta = '';//250 ky tu
    let key_word = '';
    let title = '';
    let url='';
    let imageurl='';
    if (data != null) {

       key_word = config.configSetting.keyword_view_name_chapter.replace(/{name}/gi, data.nameDoc).replace(/{nameOther}/g, data.manga.nameOther).replace(/{auth}/g, name_author).replace(/{domain}/g, config.configSetting.lbl_domain_name).replace(/{chapter}/g, data.idDetail);
       title = config.configSetting.view_name_chapter_title.replace(/{name}/gi,  data.nameDoc).replace(/{nameOther}/g, data.manga.nameOther).replace(/{auth}/g, name_author).replace(/{domain}/g, config.configSetting.lbl_domain_name).replace(/{chapter}/g, data.idDetail);
       des_meta = config.configSetting.desc_view_name_chapter.replace(/{name}/gi,  data.nameDoc).replace(/{nameOther}/g, data.manga.nameOther).replace(/{auth}/g, name_author).replace(/{domain}/g, config.configSetting.lbl_domain_name).replace(/{chapter}/g, data.idDetail);
       url=`${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${data.idDoc}${config.configPrefix.endManga}/${config.configPrefix.startViewmanga}${data.idDetail}${config.configPrefix.endViewmanga}`;
       imageurl=data?.manga?.image;
    } 

    //console.log("data view",{data,listImg});
    return (
        <>
            {/*  <SeoHead title={title} desc={des_meta} image={imageurl} key_word={key_word} locale={null} url={url}  />  */}
    
            { loading &&<InfoActionViewSkeletion/>}
            {data && <InfoActionView  
             config={config} 
             data={data} 
             show={showISettingView}  
             fontSize={fontSize}
             setfontSize={setfontSize}
             lineHieght={lineHeight}
             setLineHieght={setLineHeight}
             bgColor={bgColor}
             setBgColor={setBgColor}
             colorSelect={colorSelect}
             setColorSelect={setColorSelect}
             fontFamilySelect={fontFamilySelect}
             setFontFamilySelect={setFontFamilySelect}
            />}
            <div  id="read-view" className="mt-2 mx-1 flex flex-col items-center">
            { loading &&<ContenViewSkeletion/>}
            {data && <ContenView data={data} fontSize={fontSize} lineHeight={lineHeight} bgColor={bgColor} colorSelect={colorSelect}  fontFamilySelect={fontFamilySelect} config={config} />}
            </div>
            {data && <InfoActionViewBt config={config}   data={data} />}
           
            {data && <RenderChapterList id={data.idDoc} config={config} mangaName={data?.nameDoc} idchapter={data.idDetail} isSeo={false} dataManga={null}/>}
            <AdsDetail/>
            {data &&<div id="manga-comments" className="w-full bg-slate-900/70 ">
            <h3 className="font-semibold text-white/80 first-letter:uppercase before:content-['_↗']">
                {config.configSetting.lbl_inf_comment}
            </h3>
                <DisqusComments image={data.manga.image} type={config.typeManga} url={`${config.configPrefix.url_host}${config.configPrefix.pageViewManga}/${config.configPrefix.startManga}${data.idDoc}${config.configPrefix.endManga}`} id={data.idDoc} title={data.manga.name} />
            </div>
            } 
        </>
    );
};
export default InfoViewNovels;
