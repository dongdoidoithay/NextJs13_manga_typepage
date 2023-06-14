

import { SelectMangaTypeByPage } from "@/constants/configBase";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";

//react-query
import { QueryClient, QueryClientProvider } from "react-query";
import { ArrowUpCircleIcon } from "@heroicons/react/20/solid";
import FotterPage from "@/ui/footer";
import AdsTemplate from "@/ads/ads_template";
import AdsTop from "@/ads/ads_top_body";
const queryClient = new QueryClient();



export default function Template({ children }: { children: React.ReactNode }) {
  let config = SelectMangaTypeByPage("");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState('');
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  })
  const handleScroll = () => {
    let number =
      window.pageXOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (document.getElementsByName('body') != undefined) {
      if (number >= 10) {
        setScroll('fixed');
      } else {
        setScroll('');
      }
    }
  }
  const Scroll = () => {
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  //check
  //console.log("Home temmplate");
  return (
    <>
     {/* {loading && <div>Loading...</div>} */}
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <div ref={sectionRef}></div>
        {children}
        <AdsTemplate/>
        <FotterPage/>
        <a onClick={Scroll} className={`${scroll} inset bottom-6 z-50 right-6 text-sky-400 hover:text-orange-500 cursor-pointer`} ><ArrowUpCircleIcon className="w-9" /> </a> 
        
      </QueryClientProvider>
      
    </>
  );
}
