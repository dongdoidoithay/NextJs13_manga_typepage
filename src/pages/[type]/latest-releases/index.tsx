import AdsDetail from "@/ads/ads_detail";
import AdsTop from "@/ads/ads_top_body";
import LastRelease from "@/components/latestReleases/lastUpdate";
import PopupRelease from "@/components/latestReleases/popupRelease";
import { GlobalNav } from "@/ui/global-nav";
import { useRouter } from 'next/router'
const LatestReleasePage = () => {
    const router = useRouter()
    return (
        <>
            <GlobalNav />
            <div className="lg:pl-60 ">
                <main className=" bg-slate-900/60 border border-slate-700">
                    <div id="wapper" className="mt-4 px-2">
                        <AdsTop/>
                    <LastRelease typeManga={router.query.type}/>
                    <AdsDetail/>
                    <PopupRelease typeManga={router.query.type}/>

                    </div>
                </main>
            </div>
        </>
    );
}
export default LatestReleasePage;