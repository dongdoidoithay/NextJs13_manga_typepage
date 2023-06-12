
import AdsTop from "@/ads/ads_top_body";
import { SelectMangaTypeByPage } from "@/constants/configBase";
import { _Prefix_Root_Novel } from "@/constants/configPrefixBase";
import { GlobalNavView } from "@/ui/global-nav-view";
import { useRouter } from 'next/router'
import RenderSwitch from "@/components/renderSwitch";


export default function DetaiView() {
  const router = useRouter();
  let config = SelectMangaTypeByPage('');
  let _idmanga = '';
  let _iddetail = '';
  if (router.query.type != undefined)
    config = SelectMangaTypeByPage(router.query.type.toString());
  if (router.query.idmanga != undefined) {
    _idmanga = router.query.idmanga.toString().replace(config.configPrefix.startManga, '').replace(config.configPrefix.endManga, '');
  }
  if (router.query.iddetail != undefined) {
    _iddetail = router.query.iddetail.toString().replace(config.configPrefix.startViewmanga, '').replace(config.configPrefix.endViewmanga, '');
  }


  return (
    <>
      <GlobalNavView />
      <main className="px-0 lg:px-2 bg-slate-900/60 border border-slate-700">
          <AdsTop/>
        <RenderSwitch type={router.query.type} config={config} iddetail={_iddetail} idmanga={_idmanga}/>
        <div id="manga suggets"></div>

      </main>
    </>
  );
}
