import "@/styles/globals.css";

import { Metadata } from "next";
import Head from 'next/head';
import baseSeo from "@/constants/baseSeo";
import 'react-toastify/dist/ReactToastify.css';
import Script from "next/script";


export const metadata: Metadata = {
  title: {
    default: baseSeo.title,
    template: "%s | " + baseSeo.domainName,
  },
  description: baseSeo.description,
  keywords: baseSeo.keywords,
  openGraph: {
    title: baseSeo.title,
    description: baseSeo.description,
    type: "website",
    images: baseSeo.images,
    siteName: baseSeo.domainName,
    locale:baseSeo.locale
  },
  twitter: {
    card: "summary_large_image",
    site: baseSeo.twitterSite,
    creator: baseSeo.domainName,
    images: baseSeo.images,
  },
  category: "manga, novels, comic, anime",
  archives: baseSeo.archives,
  appLinks: {
    ios: {
      app_store_id: "123456789",
      url: baseSeo.canonical,
    },
    android: {
      package: "com.example",
      url: baseSeo.canonical,
    },
    web: {
      url: baseSeo.canonical,
      should_fallback: false,
    },
  },
  icons: baseSeo.Icon,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark [--scroll-mt:9.875rem] lg:[--scroll-mt:6.3125rem] js-focus-visible lg:mx-24">
      
      <body className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 bg-[url('/grid.svg')]">
        {children}
      </body>
      <Head>
          {/*Meta*/}
          {/* <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" /> */}
          <meta name="format-detection" content="telephone=no" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="referrer" content="never" />
      </Head>
     
       {/* https://adcash.myadcash.com/ */}
      {/*  <Script data-cfasync="false" type="text/javascript" src="//onclickprediction.com/a/display.php?r=6014526" strategy="afterInteractive"></Script> */}
      {/*  <Script data-cfasync="false" type="text/javascript" src="//onclickprediction.com/a/display.php?r=6014526" id="G-ads"/> */}
     
      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-MKK8RTGH1R" strategy="afterInteractive"/>
      <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-MKK8RTGH1R');
      `}
      </Script>
    </html>
  );
}
