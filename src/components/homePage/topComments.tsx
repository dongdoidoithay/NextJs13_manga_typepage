"use client";
import { FetchApi } from "@/constants/FetchApi";
import {
  MangaLang,
  SelectMangaTypeByPage,
  apiConfigPath,
} from "@/constants/configBase";
import {
  _Prefix_Root_Adult,
  _Prefix_Root_Dc,
  _Prefix_Root_Novel,
  _Prefix_Root_Raw,
  _Prefix_Root_Scan,
  _Prefix_Type_Adult,
  _Prefix_Type_Dc,
  _Prefix_Type_Novel,
  _Prefix_Type_Raw,
  _Prefix_Type_Scan,
} from "@/constants/configPrefixBase";
import ImageLoading from "@/ui/ImageLoading";
import { Boundary } from "@/ui/boundary";
import getDate from "@/utils/caldate";
import Link from "next/link";
import { useQuery } from "react-query";

const FetchData = async (config: MangaLang) => {
  return await FetchApi(
    apiConfigPath +
      config.endPointPath.configGetTopComment +
      "0/" +config.configSetting.lbl_domain_Page 
  );
};

const TopComment = () => {
  let config = SelectMangaTypeByPage("");
  const _key =
    config.configSetting.lbl_domain_home + "-" + config.localKey.localType;
  /*  let local_data = getStorage(_key);
    if (local_data != '' && local_data != null)
        config = SelectMangaTypeByPage(local_data); */

  const { data, isFetching } = useQuery(
    ["GetTopCommentManga", config.typeName],
    () => FetchData(config),
    {
      retry: 10,
      staleTime: 10000,
      cacheTime: 5000,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  return (
    <>
      <Boundary labels={`Top ${config.configSetting.lbl_inf_comment}`}/>
      {!isFetching && data && data.length > 0 && (
        <div id="blockComent" className="flex flex-wrap flex-col gap-2 ">
          {data &&
            data.length > 0 &&
            data.map((item: any, indx: number) => {
              let _urlPage = "";
              let _config = SelectMangaTypeByPage("");
              switch (item.type_manga) {
                case _Prefix_Type_Scan:
                  _config = SelectMangaTypeByPage(_Prefix_Root_Scan);
                  break;
                case _Prefix_Type_Raw:
                  _config = SelectMangaTypeByPage(_Prefix_Root_Raw);
                  break;
                case _Prefix_Type_Adult:
                  _config = SelectMangaTypeByPage(_Prefix_Root_Adult);
                  break;
                case _Prefix_Type_Dc:
                  _config = SelectMangaTypeByPage(_Prefix_Root_Dc);
                  break;
                case _Prefix_Type_Novel:
                  _config = SelectMangaTypeByPage(_Prefix_Root_Novel);
                  break;
              }
              _urlPage = `${_config.configPrefix.url_host}${_config.configPrefix.pageManga}/${_config.configPrefix.startManga}${item.id_manga}${_config.configPrefix.endManga}`;
             
              return (
                  <div id="box" key={indx}
                   className="flex border-b border-dotted rounded-md flex-row flex-wrap">
                    <div id="img" className="flex flex-row w-1/3 gap-2 text-start items-start">
                        <div className="border rounded w-10 text-center  my-7 mx-2 font-semibold">{indx+1}</div>
                        <div id="contenCmt" className="px-1 mx-1 my-1 flex flex-col">
                            <Link
                            className="flex flex-1 text-lg text-sky-500 dark:text-sky-400 hover:text-md hover:font-semibold hover:text-sky-200"
                            rel="nofollow"
                            href={`${_urlPage}`}
                            title={`${config.configSetting.lbl_start_manga} ${item.name_manga}`}
                            >
                            {item.name_manga} 
                            </Link>
                            <div className="flex">
                                {getDate(item.created_date, _config)}
                            </div>
                        </div>
                    </div>
                    <div className="w-2/3">
                      <div
                          dangerouslySetInnerHTML={{ __html: item.contents }}
                          className="overflow-hidden max-h-36"
                        >
                        </div>
                    </div>
                  </div>
              );
            })}
        </div>
      )}
    </>
  );
};
export default TopComment;
