import ImageLoading from '@/ui/ImageLoading';
import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import AdsViews from '../../ads/ads_view';
import AdsDetail from '../../ads/ads_detail';

const ContenView = ({ config, viewMode, data, listImg, SetlistImg, CurrentImage, ImageSelect, SetCurrentImage, SetImageSelect, prev_img, next_img }: any) => {

    const is_full = viewMode;
    let is_next = data.idDetailNext;
    let is_prev = data.idDetailPrev;
    const sectionRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (data != null && data.source != null && data.source != undefined) {
            let imagelist = data.source.split(',').filter((word: any) => word.length > 1);
            SetlistImg(imagelist);
            if (imagelist.length > 0) {
                let imageselected = imagelist[0];
                SetImageSelect(imageselected);
            }
            // console.log('listImg', {listImg});
        }
        if (data != null && data.image != null && data.image != undefined) {
            let imagelist = data.image.split('#').filter((word: any) => word.length > 1);
            SetlistImg(imagelist);
            if (imagelist.length > 0) {
                let imageselected = imagelist[0];
                SetImageSelect(imageselected);
            }
        }

    }, []);



    useEffect(() => {
        // Runs ONCE after initial rendering
        // and after every rendering ONLY IF `prop` or `state` changes
        if (listImg.length > 0 && CurrentImage == 0) {
            if (listImg.length > 0) {
                let imageselected = listImg[0];
                SetImageSelect(imageselected);
                //console.log('imageselected', {imageselected});
            }
        }
    }, [ImageSelect]);
    useEffect(() => {
        // Runs ONCE after initial rendering
        // and after every rendering ONLY IF `prop` or `state` changes
        if (listImg.length > 0 && CurrentImage != 0) {
            let imageselected = listImg[CurrentImage];
            SetImageSelect(imageselected);
        }
        // console.log("change CurrentImage", { CurrentImage })
    }, [CurrentImage]);

    useEffect(() => {
        // every rendering 
        if (listImg.length > 0 && CurrentImage == 0 && ImageSelect == '' && is_full == 'N') {
            let imageselected = listImg[0];
            SetImageSelect(imageselected);
            // console.log('imageselected', {imageselected});
        }
    });


    const next_pic = (e: any) => {
        if (e < listImg.length) {

            //window.location.href = "#" + (parseInt(e) + 1);
            let hash = "#" + (parseInt(e) + 1);
            window.location.hash = hash;
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

        }
        if (e == listImg.length) {
            if (is_next != '') {
                toast.success('🦄 you are reading next chapter:' + is_next, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
                window.location.href = `${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${data.idDoc}${config.configPrefix.endManga}/${config.configPrefix.startViewmanga}${is_next}${config.configPrefix.endViewmanga}`;
            }
            else {

                toast.warn('🦄 you are reading the last chapter. You can read other Manga waiting for the new chapter to update !', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            };
        }
    }
    const next_pic_point = () => {

        const viewportHeight = window.innerHeight;
        // Calculate the position of the next screen
        const nextScreenPosition = Math.ceil((window.scrollY + 1) / viewportHeight) * viewportHeight;

       // console.log("nextScreenPosition", nextScreenPosition)
        // Scroll to the next screen
        window.scroll({
            top: nextScreenPosition,
            behavior: 'smooth' // Add smooth scrolling effect
        });
      
    }

    useEffect(() => {
        const handleKeyPress = (event: any) => {

            if (is_full == "N" && ImageSelect != '') {
                if (event.code.toString() == 'ArrowRight') {
                    console.log('next_img!');
                    next_img();
                }
                if (event.code == 'ArrowLeft') {
                    console.log('prev_img!');
                    prev_img();
                }
            }
        }

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const loadOneImage = () => {
        // console.log("loadOneImage",{is_full,ImageSelect})
        if (is_full == "N" && ImageSelect != '') {
            return (
                <>
               {/*  <div className='flex flex-col items-center w-full relative'> */}

                    <ImageLoading url={ImageSelect} title={`${data.nameDoc}-${CurrentImage}`} classStyle="w-full h-full object-fill" />
                    <AdsViews/>
                    <a title='prev Img' className="absolute w-1/2 h-full left-0  cursor-[url('/pre.cur'),_pointer]" onClick={() => prev_img()} ></a>
                    <a title='next Img' className="absolute w-1/2 h-full right-0 cursor-[url('/next.cur'),_pointer]" onClick={() => next_img()} ></a>
               {/*  </div> */}
                </>
            )
        }
    }
    const loadAllImage = () => {
        if (is_full == "Y" && listImg.length > 0) {
            return (
                <>
                    {
                        listImg.map((image: any, k: number) => {
                            return (
                                <div key={k} className="flex flex-col items-center w-full cursor-[url('/down.png'),_pointer]" onClick={() => { next_pic(k + 1); next_pic_point() }} >
                                    <ImageLoading url={image} title={`${data.nameDoc}-${k}`} classStyle="w-full h-full object-fill" />
                                    {(k%3==0)&&<AdsViews/>} 
                                    {(k==7)&&<AdsDetail/>}
                                </div>
                            )
                        })
                    }
                </>
            )
        }
    }
    //#endregion

    return (
        <div ref={sectionRef} className='flex flex-col items-center w-full relative'>
            {loadAllImage()}
            {loadOneImage()}
        </div>
    )
}
export default ContenView;
