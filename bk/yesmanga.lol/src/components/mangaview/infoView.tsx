import React, { useRef, useState } from "react";

import { toast } from "react-toastify";
import { MangaLang } from "@/constants/configBase";
import { getStorage, setStorage } from "@/utils/localFx";
import StoreLocalView from "./storeLocalView";
import ContenView from "./contenView";
import InfoActionView from "./infoActionView";
import RenderChapterList from "../mangaInfo/renderChapterList";
import InfoActionViewSkeletion from "./infoActionViewSkeletion";
import ContenViewSkeletion from "./contenViewSkeletion";
import DisqusComments from "../mangaInfo/disquscomment";
import InfoActionViewBt from "./infoActionViewBt";
import AdsDetail from "../../ads/ads_detail";

import SeoHead from "../mangaInfo/seoHead";
import { NextSeo } from "next-seo";

const InfoViewManga = ({ config, data ,loading}: { config: MangaLang, data: any,loading:boolean }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    let _viewmode = getStorage("View-Mode-Option");
    if (_viewmode == '' || _viewmode == null)
        _viewmode = 'N';
        
    const [viewMode, setViewMode] = useState(_viewmode);
    const fnChangeVidewMode = () => {
        let value='';
        if(_viewmode=='Y')
            value='N';
        else
        value='Y'
        setStorage("View-Mode-Option", value, 30 * 24 * 60 * 60);

        setViewMode(value);
    }
    /**FN next Prev Image */
    const [CurrentImage, SetCurrentImage] = useState(0);
    const [ImageSelect, SetImageSelect] = useState('');
    const [listImg, SetlistImg] = useState([]);
    const prev_img = () => {
        if ((CurrentImage - 1) >= 0) {
            SetImageSelect('');
            SetCurrentImage(CurrentImage - 1);
            setTimeout(() => {
                sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
              }, 0);
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        } else {
            if (data && data.idDetailPrev != '') {
                SetlistImg([]);
                SetImageSelect('');
                SetCurrentImage(0);
                toast.success('🦄 you are reading prev chapter:' + data.idDetailPrev, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
                window.location.href = `${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${data.idDoc}${config.configPrefix.endManga}/${config.configPrefix.startViewmanga}${data.idDetailPrev}${config.configPrefix.endViewmanga}`;
            }
            else

                toast.warn('🦄 you are reading the First chapter. You can click next chapter to read', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
        }
    }
    const next_img = () => {
        if ((CurrentImage + 1) < listImg.length) {
            SetImageSelect('');
            SetCurrentImage(CurrentImage + 1);
            setTimeout(() => {
                sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
              }, 0);
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        } else {
            if (data && data.idDetailNext != '') {
                SetlistImg([]);
                SetImageSelect('');
                SetCurrentImage(0);
                toast.success('🦄 you are reading next chapter:' + data.idDetailNext, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
                window.location.href = `${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${data.idDoc}${config.configPrefix.endManga}/${config.configPrefix.startViewmanga}${data.idDetailNext}${config.configPrefix.endViewmanga}`;
            }
            else

                toast.warn('🦄 you are reading the last chapter. You can read other Manga waiting for the new chapter to update !', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
        }
    }
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
       imageurl=listImg.length>0?listImg[0]:data?.manga?.image;
    } 

    //console.log("data view",{data,listImg});
    return (
        <>
             {data &&  <NextSeo
            title={title}
            additionalMetaTags={[{
                property: 'keywords',
                content: key_word
            }]}
            description={des_meta}
            openGraph={{
                title: title,
                description: des_meta,
                url: url,
                type: 'article',
                article: {
                    publishedTime: new Date().toISOString(),
                    modifiedTime: new Date().toISOString(),
                    expirationTime: new Date().toISOString(),
                    section: "News",
                    tags: [key_word],
                },
                images: [
                    {
                        url: data?.manga?.image,
                        alt: title,
                    },
                ],
            }
            }
            additionalLinkTags={[{
                rel: "alternate",
                href: `${config.configPrefix.url_host}/api${config.configPrefix.pageViewManga}/${config.configPrefix.startManga}${data.idDoc}${config.configPrefix.endManga}/${config.configPrefix.startViewmanga}${data.idDetail}${config.configPrefix.endViewmanga}/feed`,
                type: "application/rss+xml"
            },
            {
                rel: "alternate",
                href: `${config.configPrefix.url_host}/api${config.configPrefix.pageViewManga}/${config.configPrefix.startManga}${data.idDoc}${config.configPrefix.endManga}/${config.configPrefix.startViewmanga}${data.idDetail}${config.configPrefix.endViewmanga}/rss.xml`,
                type: "application/rss+xml"
            }
            ]}
        />}
            { loading &&<InfoActionViewSkeletion/>}
            {data && <InfoActionView  config={config} viewMode={viewMode}  data={data} fnChangeVidewMode={fnChangeVidewMode} listImg={listImg} CurrentImage={CurrentImage} SetCurrentImage={SetCurrentImage}  ImageSelect={ImageSelect} SetImageSelect={SetImageSelect} prev_img={prev_img} next_img={next_img}/>}
            <div  ref={sectionRef} id="read-view" className="mt-2 mx-1 flex flex-col items-center">
            { loading &&<ContenViewSkeletion/>}
            {data && <ContenView config={config} viewMode={viewMode} data={data} listImg={listImg} SetlistImg={SetlistImg} CurrentImage={CurrentImage} SetCurrentImage={SetCurrentImage} ImageSelect={ImageSelect} SetImageSelect={SetImageSelect} prev_img={prev_img} next_img={next_img} />}
            </div>
            {data && <InfoActionViewBt config={config} viewMode={viewMode}  data={data} fnChangeVidewMode={fnChangeVidewMode} listImg={listImg} CurrentImage={CurrentImage} SetCurrentImage={SetCurrentImage} ImageSelect={ImageSelect} SetImageSelect={SetImageSelect} prev_img={prev_img} next_img={next_img}/>}
           
            {data && <RenderChapterList id={data.idDoc} config={config} mangaName={data?.nameDoc} idchapter={data.idDetail} isSeo={false} dataManga={null}/>}
            <AdsDetail/>
            {data &&<div id="manga-comments" className="w-full bg-slate-900/70 ">
            <h3 className="font-semibold text-white/80 first-letter:uppercase before:content-['_↗']">
                {config.configSetting.lbl_inf_comment}
            </h3>
                <DisqusComments image={data?.manga?.image} type={config.typeManga} url={`${config.configPrefix.url_host}${config.configPrefix.pageViewManga}/${config.configPrefix.startManga}${data.idDoc}${config.configPrefix.endManga}`} id={data.idDoc} title={data.manga.name} />
            </div>
            } 
        </>
    );
};
export default InfoViewManga;
