import { AxiosPostApi, FetchApi } from "@/constants/FetchApi";
import { MangaLang } from "@/constants/configBase";
import ImageLoading from "@/ui/ImageLoading";
import { getStorage } from "@/utils/localFx";
import {
    BookOpenIcon,
  HashtagIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

const FetchCheckTrend = async (config: MangaLang, idmanga: string) => {
     return await FetchApi(config.apiPath + config.endPointPath.checkTrend + idmanga);
   }
 const InfoActionBlock = ({id,config, dataManga, des_full}:{id:any,config: any; dataManga: any; des_full: any}) => {
  

    const {
        data: checkTrend,
        isLoading: isLoadingtrend,
      } = useQuery(['FetchCheckTrend', id, config.typeName], () => FetchCheckTrend(config, id), { retry: 10,staleTime: 10000, cacheTime: 5000, keepPreviousData: true, refetchOnWindowFocus: false });
    

      const AddTrend = async () => {
        
        const _arraytype = ['trend', 'popular', 'slide'];
        const params = new URLSearchParams({ idDoc: id, type: _arraytype[Math.floor(Math.random() * _arraytype.length)] });
       await AxiosPostApi(config.apiPath + config.endPointPath.addTrend, params).then(response => {
         
          toast("🦄Thank you for the nomination, manga / novels will be on the  Popular  list soon!", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          checkTrend.data=false;
        })
      }
      //hit
      let histNamechap = "";
      let histIdchap = "";
      let histIddoc = "";
    var cookie_obj = JSON.parse(
      getStorage(config.localKey.localReadView) as string
    );
    if (cookie_obj != null && dataManga && dataManga) {
      for (var i = 0; i < cookie_obj.length; i++) {
        var obj = cookie_obj[i];
        if (obj["comicId"] == dataManga.idDoc) {
          histIdchap = obj["chapterId"];
          histNamechap = obj["namechapter"];
          histIddoc = obj["comicId"];
          break;
        }
      }
    }

  return (
    <div id="info-act" className="mr-2">
      <div className="flex flex-wrap flex-col sm:flex-row text-sm">
        <div className="w-full sm:w-1/4">
          <div className="box-content border-2 rounded mr-4">
            {/*<div className="object-cover w-full h-48 bg-cover bg-no-repeat bg-center " style={{ backgroundImage: "url(" + dataManga.image + ")" }}></div> */}
            <div className="w-full h-52 bg-cover bg-no-repeat bg-center rounded-lg">
              <ImageLoading url={dataManga.image} title={dataManga.name} classStyle="w-full h-full object-cover rounded-md"/> 
            </div>
          </div>
        </div>
        <div className="w-full sm:w-3/4 xs:hidden">
          <div className="ml-1 overflow">
            <h3 className="font-semibold text-white/80 first-letter:uppercase">
              {config.configSetting.lbl_inf_Summary} {dataManga.name}<HashtagIcon className="w-2 inline" />
            </h3>
            <p className="sx:text-xs lg:text-md first-letter:text-lg first-letter:font-semibold break-word overflow-hidden first-line:uppercase line-clamp-3 lg:line-clamp-none">
              {des_full}
            </p>
            <h3 className="font-semibold text-white/80 first-letter:uppercase">
              {config.configSetting.lbl_inf_Genres}
              <HashtagIcon className="w-2 inline" />
            </h3>
            <div className="flex flex-row flex-wrap gap-1">
              {dataManga.lsgenres &&
                dataManga.lsgenres.map(
                  (item: any, index: any) =>
                    item &&
                    item.id && (
                      <Link
                        rel="tag nofollow"
                        href={`${config.configPrefix.url_host}${config.configPrefix.pageGenre}/${config.configPrefix.startGenre}${item.id}${config.configPrefix.endGenre}`}
                        key={item.id + index}
                        className="flex hover:text-sky-500 dark:hover:text-sky-400 first-letter:uppercase pr-1 hover:font-semibold before:content-['↗_'] after:content-[',']"
                        title= {item.name}
                      >
                        {item.name}
                      </Link>
                    )
                )}
            </div>
            <h3 className="font-semibold text-white/80 first-letter:uppercase">
              {config.configSetting.lbl_inf_Year}
              <HashtagIcon className="w-2 inline" />
            </h3>
            <Link
              rel="tag nofollow"
              href={`${config.configPrefix.url_host}${
                config.configPrefix.pageYear
              }/${config.configPrefix.startYear}${dataManga.year?.replace(
                ",",
                ""
              )}${config.configPrefix.endYear}`}
              className="hover:text-sky-500 dark:hover:text-sky-400 first-letter:uppercase pr-1 hover:font-semibold before:content-['_↗']"
              title={dataManga.year?.replace(",", "")}
            >
              {dataManga.year?.replace(",", "")}
            </Link>
            <h3 className="font-semibold text-white/80 first-letter:uppercase">
              {`Action`}
              <HashtagIcon className="w-2 inline" />
            </h3>
            {histIdchap && histIdchap != '' && <Link
              rel="tag nofollow"
              href={`${config.configPrefix.url_host}${config.configPrefix.pageViewManga}/${config.configPrefix.startManga}${dataManga.idDoc}/${config.configPrefix.startViewmanga}${histIdchap}${config.configPrefix.endViewmanga}`}
              className="hover:text-sky-500 dark:hover:text-sky-400 first-letter:uppercase pr-1 hover:font-semibold after:content-['_↗']"
              title={`${config.configSetting.lbl_inf_continue} ${histNamechap}`}
            >
            <BookOpenIcon className="w-5 inline" />  {config.configSetting.lbl_inf_continue} {histNamechap}
            </Link>}
            {checkTrend && checkTrend.pass == true && 
            <a 
                onClick={() => AddTrend()}
                className="cursor-pointer hover:text-sky-500 dark:hover:text-sky-400 first-letter:uppercase pr-1 hover:font-semibold after:content-['_↗']" >

            <PlusIcon className="w-5 inline" /> Add Nominations
            </a>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default InfoActionBlock;


