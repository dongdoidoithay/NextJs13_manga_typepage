
import baseSeo from "@/constants/baseSeo";
import { GlobalNav } from "@/ui/global-nav";
import { Metadata } from "next";
import PageMangaList from ".@/components/groupPage/mangaList";
import AdsTop from ".@/components/ads/ads_top_body";
import AdsDetail from ".@/components/ads/ads_detail";

export const metadata: Metadata = {
  title: "Manga list Page",
  description: baseSeo.description,
  keywords: baseSeo.keywords,
  openGraph: {
    title: baseSeo.title,
    description: baseSeo.description,
    type: "article",
    images: baseSeo.images,
    siteName: baseSeo.domainName,
  },
  twitter: {
    card: "summary_large_image",
    site: baseSeo.canonical,
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
export default function PageAlpha() {
  
  return (
    <>
      <GlobalNav />
      <div className="lg:pl-60 ">
        <main className=" bg-slate-900/60 border border-slate-700">
          <div id="wapper" className="mt-4 px-2">
          <AdsTop/>
            <PageMangaList/>
            <AdsDetail/>
          </div>
        </main>
      </div>
    </>
  );
}
