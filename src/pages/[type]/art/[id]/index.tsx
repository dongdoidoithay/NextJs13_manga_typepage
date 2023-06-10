import AdsDetail from "@/components/ads/ads_detail";
import AdsTop from "@/components/ads/ads_top_body";
import MangaByGroup from "@/components/groupPage/mangaByGroup";
import baseSeo from "@/constants/baseSeo";
import { GlobalNav } from "@/ui/global-nav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Type Page",
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
export default function PageInGenres({ params,searchParams }: { params: { type: string, id: string } ,searchParams:{page?:number}}) {
 
  return (
    <>
      <GlobalNav />
      <div className="lg:pl-60 ">
        <main className=" bg-slate-900/60 border border-slate-700">
          <div id="wapper" className="mt-4 px-2">
            <AdsTop/>
            <MangaByGroup typeManga={params.type} typeApi='art' idFind={params.id} pageIndex={searchParams.page} />
            <AdsDetail/>
          </div>
        </main>
      </div>
    </>
  );
}
