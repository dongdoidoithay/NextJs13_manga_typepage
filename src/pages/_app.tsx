import '@/styles/globals.css'

import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import DefaultLayout from './layout';
import { DefaultSeo, SiteLinksSearchBoxJsonLd } from 'next-seo';
import { NextSeo } from 'next-seo';
// import your default seo configuration
import SEO from '../constants/seoConfig';
import NextNprogress from 'nextjs-progressbar';
import {sb_seo_page_default_key} from '../constants/configSettingBase';
import {_hostwww} from '../constants/configPrefixBase';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useEffect, useRef, useState } from 'react';
import { SelectMangaTypeByPage } from '@/constants/configBase';
import FotterPage from '@/ui/footer';
import AdsTemplate from '@/ads/ads_template';
import { ArrowUpCircleIcon } from '@heroicons/react/20/solid';
const queryClient = new QueryClient();


export default function App({ Component, pageProps }: AppProps) {
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


  return(
    
    <DefaultLayout>
    <NextSeo
          additionalMetaTags={[{
            property: 'keywords',
            content: sb_seo_page_default_key
          }]}
          additionalLinkTags={[{
            rel: "alternate",
            href: `${_hostwww}/api/rss.xml`,         
            type: "application/rss+xml"
          },
          {
            rel: "alternate",
            href: `${_hostwww}/api/ror.xml`,         
            type: "application/rss+xml"
          },
          {
            rel: "alternate",
            href: `${_hostwww}/api/sitemap.html`,         
            type: "text/html"
          },
          {
            rel: "alternate",
            href: `${_hostwww}/api/urllist.txt`,         
            type: "text/plain"
          },
          {
            rel: "alternate",
            href: `${_hostwww}/server-sitemap.xml`,         
            type: "application/rss+xml"
          }
         ]}
        />
        <DefaultSeo {...SEO} />
        <SiteLinksSearchBoxJsonLd
          url={_hostwww}
          potentialActions={[
            {
              target: `${_hostwww}/search?q`,
              queryInput: 'search_term_string',
            }
          ]}
        /> 
        <NextNprogress
          color="#e61a05"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          options={{ easing: 'ease', speed: 500 }}
        />

<ToastContainer />
      <QueryClientProvider client={queryClient}>
        <div ref={sectionRef}></div>
        <Component {...pageProps} />
        <AdsTemplate/>
        <FotterPage/>
        <a onClick={Scroll} className={`${scroll} inset bottom-6 z-50 right-6 text-sky-400 hover:text-orange-500 cursor-pointer`} ><ArrowUpCircleIcon className="w-9" /> </a> 
        
      </QueryClientProvider>
  </DefaultLayout>
  )
}
