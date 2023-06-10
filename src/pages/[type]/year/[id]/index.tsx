import AdsDetail from "@/components/ads/ads_detail";
import AdsTop from "@/components/ads/ads_top_body";
import MangaByGroup from "@/components/groupPage/mangaByGroup";
import { GlobalNav } from "@/ui/global-nav";
import { useRouter } from 'next/router'

export default function PageInGenres() {
  const router = useRouter()
  return (
    <>
      <GlobalNav />
      <div className="lg:pl-60 ">
        <main className=" bg-slate-900/60 border border-slate-700">
          <div id="wapper" className="mt-4 px-2">
            <AdsTop/>
            <MangaByGroup typeManga={router.query.type} typeApi='year' idFind={router.query.id} pageIndex={router.query.page} />
            <AdsDetail/>
          </div>
        </main>
      </div>
    </>
  );
}
