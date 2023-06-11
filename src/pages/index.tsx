import baseSeo from "@/constants/baseSeo";
import  {GlobalNav}  from "@/ui/global-nav";
import SliderHome from "@/components/homePage/slideHome";
import PopupHome from "@/components/homePage/popupHome";
import LastUpdateHome from "@/components/homePage/lastUpdate";
import TopComment from '@/components/homePage/topComments';
import HistoryHome from '@/components/homePage/historyHome';
import AdsTop from '@/ads/ads_top_body';
import AdsDetail from '@/ads/ads_detail';



export default function Home() {
  
  return (
    <>
      <h1 hidden> {baseSeo.title}</h1>
      <GlobalNav />
      <div className="lg:pl-60  bg-slate-900/70 border border-slate-700">
        <main className="px-2">
            <SliderHome typeManga={null}/>
            <AdsTop/>
            <HistoryHome/>
            <PopupHome typeManga={null} nameLable={null}/>
            <AdsTop/>
            <LastUpdateHome typeManga={null}/>
            <AdsDetail/>
            <TopComment />
           
        </main>
      </div>
    </>
  );
}
