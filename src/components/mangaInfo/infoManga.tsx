import React, {  } from "react";

import { MangaLang } from "@/constants/configBase";
import  InfoActionBlock  from "./InfoBlock";
import RenderChapterList from "./renderChapterList";
import InfoHeaderBlock from "./InfoHeaderBlock";
import InfoOtherBlock from "./InfoOtherBlock";
import AdsDetail from "../ads/ads_detail";
import SeoHead from "./seoHead";



 const InfoManga = ({id,config,dataManga}:{id: string;config: MangaLang;dataManga: any}) => {

  let name_author = "";
  let name_author_org = "no-auth";
  let des_full = "";
  let des_meta = ""; //250 ky tu
  let key_word = "";
  let title = "";
  let manga_name = "";
  let url = "";
  let chapter_name_view = "";
  if (dataManga && dataManga) 
  {
    url = `${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${dataManga.idDoc}${config.configPrefix.endManga}`;
    if (dataManga.listAuthors && dataManga.listAuthors.length > 0) {
      name_author = `(by ${dataManga.listAuthors[0].name})`;
      name_author_org = dataManga.listAuthors[0].name;
    }
    if (dataManga.desc != null && dataManga.desc != "") {
      des_full = dataManga.desc
        .replace(/"/gi, "")
        .replace(/{domain}/g, config.configSetting.lbl_domain_name);
      des_meta = dataManga.desc.replace(/"/gi, "").substring(0, 250) + "...";
    } else {
      des_full = config.configSetting.desc_info_manga
        .replace(/{name}/gi, dataManga.name)
        .replace(/{nameOther}/g, dataManga.nameOther)
        .replace(/{auth}/g, name_author)
        .replace(/{domain}/g, config.configSetting.lbl_domain_name)
        .replace(/{chapter}/g, chapter_name_view);
      des_meta = des_full;
    }

    key_word =
      config.configSetting.keyword_info_manga
        .replace(/{name}/gi, dataManga.name)
        .replace(/{nameOther}/g, dataManga.nameOther)
        .replace(/{auth}/g, name_author)
        .replace(/{domain}/g, config.configSetting.lbl_domain_name)
        .replace(/{chapter}/g, chapter_name_view) + dataManga.tags;
    title = config.configSetting.info_name_manga_title
      .replace(/{name}/gi, dataManga.name)
      .replace(/{nameOther}/g, dataManga.nameOther)
      .replace(/{auth}/g, name_author)
      .replace(/{domain}/g, config.configSetting.lbl_domain_name)
      .replace(/{chapter}/g, chapter_name_view);
    manga_name = config.configSetting.info_name_manga
      .replace(/{name}/gi, dataManga.name)
      .replace(/{nameOther}/g, dataManga.nameOther)
      .replace(/{auth}/g, name_author)
      .replace(/{domain}/g, config.configSetting.lbl_domain_name)
      .replace(/{chapter}/g, chapter_name_view);
  }


  

  return (
    <>
    <SeoHead title={title} desc={des_full} image={dataManga.image} key_word={key_word} locale={null} url={url}  />
    
     
     <InfoHeaderBlock config={config} dataManga={dataManga}/>
     <InfoActionBlock id={id}  des_full={des_full} config={config} dataManga={dataManga}/>
     <RenderChapterList id={id} config={config} mangaName={dataManga.name}  dataManga={dataManga} isSeo={true}/>
     <AdsDetail/>
     <InfoOtherBlock id={id}  key_word={key_word} config={config} dataManga={dataManga}/>
    </>
  );
};
export default InfoManga;
