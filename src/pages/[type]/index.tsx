import baseSeo from "@/constants/baseSeo";
import { GlobalNav } from "@/ui/global-nav";
import { Metadata } from "next";
import SliderHome from "@/components/homePage/slideHome";
import PopupHome from "@/components/homePage/popupHome";
import LastUpdateHome from "@/components/homePage/lastUpdate";
import TopComment from "@/components/homePage/topComments";
import HistoryHome from "@/components/homePage/historyHome";
import AdsTop from "@/ads/ads_top_body";
import AdsDetail from "@/ads/ads_detail";
import AdsViews from "@/ads/ads_view";
import Head from "next/head";
import { useRouter } from 'next/router'

export default function PageInTye() {
  const router = useRouter()
  return (
    <>
    <Head>
      <title>{router.query.type} | {baseSeo.domainName}</title>
    </Head>
      <GlobalNav />
      <div className="lg:pl-60  bg-slate-900/70 border border-slate-700">
        <main className="px-2">
        
          <SliderHome typeManga={router.query.type} />
          <AdsTop/>
          <HistoryHome/>
          <PopupHome typeManga={router.query.type} nameLable={null}/>
          <AdsDetail/>
          <LastUpdateHome typeManga={router.query.type} />
          <AdsViews/>
          <TopComment />
        </main>
      </div>
    </>
  );
}
