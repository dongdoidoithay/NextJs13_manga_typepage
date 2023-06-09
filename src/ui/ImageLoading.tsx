/* "use client"; */
import LRU from "lru-cache";
import { useState, useEffect } from "react";

const cache = new LRU({ max: 100 });
import Images from 'next/image'
const myLoader = ({ src}:any) => {
  return `${src}`
}

const ImageLoading = ({url, title,classStyle}:any) => {
  const loadingUrl = "/loading.gif";
  const [imgSrc, setImgSrc] = useState<string>(loadingUrl);
  const errorUrl = "/next.svg";
  const noImageUrl = "/noimage.jpg";


  useEffect(() => {
    if (cache.has(url)) {
      const _x = cache.get(url) as string;
      setImgSrc(_x);
      return;
    }

    const img = new Image();
    img.onload = () => {
      setImgSrc(url);
      cache.set(url, url);
    };
    img.onerror=( e)=>{
      //console.log('error image',e)
      setImgSrc(noImageUrl);
      cache.set(url, noImageUrl);
    }
    img.src = url;
    img.alt = title;
  }, [url]);


  //return <img src={imgSrc} alt={title} className={classStyle}/>;
  return <Images  
            loader={myLoader}
            src={imgSrc}
            alt={title||'No title'}
            width={20}
            height={20}
            className={`bg-white ${classStyle}`}
            />
};

export default ImageLoading;
