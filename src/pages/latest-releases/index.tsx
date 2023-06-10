import LastRelease from "@/components/latestReleases/lastUpdate";
import PopupRelease from "@/components/latestReleases/popupRelease";
import { GlobalNav } from "@/ui/global-nav";
import AdsDetail from "@/components/ads/ads_detail";
import AdsTop from "@/components/ads/ads_top_body";
import AdsViews from "@/components/ads/ads_view";
import baseSeo from "@/constants/baseSeo";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: 'Latest Release',
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
    /*   ios: {
        app_store_id: "123456789",
        url: baseSeo.canonical,
      },
      android: {
        package: "com.example",
        url: baseSeo.canonical,
      }, */
      web: {
        url: baseSeo.canonical,
        should_fallback: false,
      },
    },
    icons: baseSeo.Icon,
    publisher:baseSeo.publisher,
    viewport:baseSeo.viewport,
    robots:baseSeo.robots,
    alternates:baseSeo.alternates,
    bookmarks:baseSeo.bookmarks,
    
  };
const LatestReleasePage = ({ params }: { params: { type: string} }) => {
    return (
        <>
            <GlobalNav />
            <div className="lg:pl-60 ">
                <main className=" bg-slate-900/60 border border-slate-700">
                    <div id="wapper" className="mt-4 px-2">
                    <AdsTop/>
                    <LastRelease typeManga={null}/>
                    <AdsDetail/>
                    <PopupRelease typeManga={null}/>
                    <AdsViews/>
                    </div>
                </main>
            </div>
        </>
    );
}
export default LatestReleasePage;