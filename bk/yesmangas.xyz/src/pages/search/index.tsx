
import { FetchApi } from "@/constants/FetchApi";
import { MangaLang, SelectMangaTypeByPage } from "@/constants/configBase";
import ImageLoading from "@/ui/ImageLoading";
import { Boundary } from "@/ui/boundary";
import { GlobalNav } from "@/ui/global-nav";
import getDate from "@/utils/caldate";
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useEffect, useState, useRef } from "react";
import { useQuery } from "react-query";
import AdsTop from "@/ads/ads_top_body";
import AdsDetail from "@/ads/ads_detail";
import { useRouter } from 'next/router'
import { NextSeo } from "next-seo";
const FetchData = async (config: MangaLang, keysearch: string, pageParam: number) => {
  if(keysearch==null || keysearch==''){
    return null;
  }
   // console.log("call API:",{keysearch,pageParam,_test});
  return await FetchApi(config.apiPath + config.endPointPath.mangaListSearch + keysearch + '/' + pageParam);
}
export default function SearchPage() {
  const router = useRouter()

  const _cons=SelectMangaTypeByPage('');
  const[config,setConfig]=useState(_cons);
  const sectionRef = useRef<HTMLDivElement>(null);
  let block=config.activeSource;
  const [selectedOption, setSelectedOption] = useState('');
  const [page, setPage] = useState(0);
  const [valueFind, setValueFind] = useState<string>();


  const {
      data,
      isFetching
  } = useQuery(["Query Page",valueFind,config.typeName,page], () => FetchData(config, valueFind||'', page), {retry: 10,staleTime: 10000, cacheTime: 5000, keepPreviousData: true, refetchOnWindowFocus: false });

  //console.log("useQuery",{isLoading,error,isError,status});

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
   /*  console.log('option change or:',event.target.value);
    console.log('option change:',selectedOption); */
    setConfig(SelectMangaTypeByPage(event.target.value));
   /*  console.log("type",config?.typeName); */
    //refetch();
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: any) => {
    setValueFind(event.target.value);
    //refetch();
  };
  useEffect(() => {
    setConfig(SelectMangaTypeByPage(''));
    setSelectedOption(config?.typeName);
    inputRef.current?.focus();

    setValueFind(router.query.q?.toString());
  }, []);

  //FN
  const funcSearchData = (e:any) => {
    e.preventDefault()
    setPage(0);
    //console.log("call ",{page,valueFind,selectedOption})
  }

//render
const FnNext = () => {
  if (data && (page + 1) < data.totalPage )
    setPage(page + 1)
  //refetch();
}
const FnPrev = () => {
  if (page > 0)
    setPage(page - 1)
   // refetch();
}
if (!isFetching && data && page > 0) {
  /*  setTimeout(
     () => scrollAction(), 
     100
   );  */
  setTimeout(() => {
    sectionRef.current?.scrollIntoView();
  }, 0);

}
const _renderItem = (data: any, index: number) => {

const regex = new RegExp(`(${valueFind})`, "gi");
const parts = data.name.split(regex);
let result = '';
parts.filter(String).map((part:any, i:number) => {
    if (regex.test(part)) {
        result += '<strong class="text-orange-600 font-medium">' + part + '</strong>';
    } else {
        result += part;
    }
});

let resultOther='';
const partsother = data.nameOther.split(regex);
partsother.filter(String).map((part:any, i:number) => {
  if (regex.test(part)) {
    resultOther += '<strong class="text-orange-600 font-medium">' + part + '</strong>';
  } else {
    resultOther += part;
  }
});


  return (
    <tr key={index + "-" + data.idDoc} className="border-b border-dotted border-slate-700 hover:border-dashed hover:border-sky-400">
      <td className="w-1/12 justify-center text-center text-lg font-semibold">
        <div className="border border-dashed justify-center w-10/12 bg-slate-950/70 overflow-hidden rounded-md p-1 m-2">
          <ImageLoading url={data.image} title={`${config.configSetting.lbl_start_manga} ${data.name}`} classStyle={"w-full object-cover"} />
        </div>
      </td>
      <td className="w-1/2">
        <a
          className="text-sm  text-sky-500 dark:text-sky-400 hover:text-md hover:font-semibold hover:text-sky-200"
          rel="nofollow"
          href={`${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${data.idDoc}${config.configPrefix.endManga}`}
          title={`${config.configSetting.lbl_start_manga} ${data.name}`}
        >
           <div dangerouslySetInnerHTML={{ __html: result }}></div>
        </a>
        <div dangerouslySetInnerHTML={{ __html: resultOther }} className="break-word overflow-hidden first-line:uppercase line-clamp-2"></div>
      </td>
      <td className="hidden sm:block py-5 align-middle">
        <div className="items-center">
          <div>
            {config.configSetting.lbl_inf_status}: <strong className="  text-sky-600 dark:text-sky-500">{data.status}</strong>
          </div>
          <div>
            {config.configSetting.lbl_inf_View}: <strong className=" text-sky-600 dark:text-sky-500">{data.view}</strong>
          </div>
        </div>
      </td>
      <td className="w-1/5 xs:1/2">
        <table className="w-full text-left border-collapse text-sm ">
          <tbody>
            {data.detail_documents &&
              data.detail_documents.slice(0, 2).map((item: any, index: number) => (
                <tr
                  className="m-3 border-b border-dotted border-slate-600 hover:border-dashed hover:border-sky-400"
                  key={index + "" + item.idDetail}
                >
                  <td className="py-2 mr-1">
                    <a
                      className="text-sm text-sky-500 dark:text-sky-400 hover:text-md hover:font-semibold hover:text-sky-300"
                      rel="nofollow"
                      href={`${config.configPrefix.url_host}${config.configPrefix.pageViewManga}/${config.configPrefix.startManga}${item.idDoc}/${config.configPrefix.startViewmanga}${item.idDetail}${config.configPrefix.endViewmanga}`}
                      title={`${config.configSetting.lbl_start_manga} ${data.name} ${config.configSetting.lbl_start_chapter} ${item.idDetail}`}
                    >
                      {config.configSetting
                        ? config.configSetting.lbl_text_chapter
                        : ""} {item.idDetail}
                    </a>
                  </td>
                  <td className="hidden sm:block justify-end float-right">
                    {getDate(item.date, config)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </td>
    </tr>
  );
};
const PageAction = () => {
  return (
    <>
      <div id="next-prev" className="my-3 flex flex-row gap-2 mr-2">
        {page == 0 && <a

          title={`${config.configSetting.lbl_prev_data} ${page - 1}`}
          className="cursor-pointer line-through hover:border-dashed w-1/2 block border border-slate-700 rounded p-2 text-center hover:border-orange-500 dark:hover:orange-sky-400  hover:text-orange-500 dark:hover:text-orange-400"  >
          <ChevronLeftIcon className="w-4 inline " />
          <b className="ml-3 font-semibold first-letter:uppercase">
            {config.configSetting.lbl_prev_data}
          </b>
        </a>

        }
        {page > 0 && <a
          onClick={FnPrev}
          title={`${config.configSetting.lbl_text_chapter} ${page - 1}`}
          className="cursor-pointer hover:border-dashed w-1/2 block border border-slate-700 rounded p-2 text-center hover:border-sky-500 dark:hover:border-sky-400  hover:text-sky-500 dark:hover:text-sky-400" >
          <ChevronLeftIcon className="w-4 inline " />
          <b className="ml-3 font-semibold first-letter:uppercase">
            {config.configSetting.lbl_prev_data}
          </b>
        </a>}
        {(page >= data.totalPage - 1) && <a

          title={`${config.configSetting.lbl_prev_data} ${page + 1}`}
          className="cursor-pointer line-through hover:border-dashed w-1/2 block border border-slate-700 rounded p-2 text-center hover:border-orange-500 dark:hover:orange-sky-400  hover:text-orange-500 dark:hover:text-orange-400" >
          <b className="mr-3 font-semibold first-letter:uppercase">
            {config.configSetting.lbl_next_data}
          </b>
          <ChevronRightIcon className="w-4 inline " />
        </a>}
        {(page < data.totalPage - 1) && (
          <a
            onClick={FnNext}
            title={`${config.configSetting.lbl_text_chapter} ${page + 1}`}
            className="cursor-pointer hover:border-dashed  w-1/2 block border border-slate-700 rounded p-2 text-center  hover:border-sky-500 dark:hover:border-sky-400  hover:text-sky-500 dark:hover:text-sky-400" >
            <b className="mr-3 font-semibold first-letter:uppercase">
              {config.configSetting.lbl_next_data}
            </b>
            <ChevronRightIcon className="w-4 inline " />
          </a>
        )}
      </div>
    </>
  );
};


const skeleton = () => {
return (
  <tr className="animate-pulse border border-blue-300 shadow rounded-md">
    <td className="w-1"><div className="h-5 bg-slate-700 rounded-full "></div></td>
    <td className="w-1/2 ml-1"><div className="h-3 bg-slate-700 rounded "></div></td>
    <td className="w-1/5"><div className="h-7 bg-slate-700 rounded"></div></td>
    <td className="w-1/5"><div className="h-3 bg-slate-700 rounded "></div></td>
  </tr>
)
};
const tableSkeleton = () => {
return (
  <>
    {skeleton()}
    {skeleton()}
    {skeleton()}
    {skeleton()}
    {skeleton()}
    {skeleton()}
  </>
)
}
  return (
    <>
    <NextSeo
        title={`${config.configSetting.sb_seo_page_group_title
          .replace(/{domain}/g, config.configSetting.lbl_domain_name)
          .replace(/{groupname}/g, config.configSetting.lbl_status)
          .replace(/{key}/g, router.query.q?.toString()||'')
          .replace(/{page}/g, `${router.query.page}`)
          }`
        }
        description={`${config.configSetting.sb_seo_page_group_desc
          .replace(/{domain}/g, config.configSetting.lbl_domain_name)
          .replace(/{groupname}/g, "Search Key ")
          .replace(/{key}/g, router.query.q?.toString()||"")
          .replace(/{page}/g, `${router.query.page}`)}`
        }
        canonical={`${config.configPrefix.url_host}${router.asPath}`}
        openGraph={{
          url: `${config.configPrefix.url_host}${router.asPath}`,
          title: `${"Search Key "} ${router.query.q?.toString()}`,
          description: `${config.configSetting.sb_seo_page_group_desc
            .replace(/{domain}/g, config.configSetting.lbl_domain_name)
            .replace(/{groupname}/g, "Search Key ")
            .replace(/{key}/g, router.query.q?.toString()||"")
            .replace(/{page}/g, `${router.query.page}`)}`,
          site_name: `${config.configSetting.lbl_domain_Page}`,
        }
        }
        additionalMetaTags={[{
          property: 'keywords',
          content: config.configSetting.sb_seo_page_group_key
            .replace(/{domain}/g, config.configSetting.lbl_domain_name)
            .replace(/{groupname}/g, config.configSetting.lbl_genres)
            .replace(/{key}/g, router.query.q?.toString()||"")
            .replace(/{page}/g, `${router.query.page}`)
        }]}
        additionalLinkTags={[{
          rel: "next",
          href: `${config.configPrefix.url_host}${config.configPrefix.pageAlphaBet}/${router.query.q?.toString()||""}?page=${page+1}`,
        }, {
          rel: "prev",
          href: `${config.configPrefix.url_host}${config.configPrefix.pageAlphaBet}/${router.query.q?.toString()||""}?page=${page-1}`,
        }
        ]}
      />
      <GlobalNav />
      <div ref={sectionRef} className="lg:pl-60  bg-slate-900/70 border border-slate-700">
        <main className="px-2">
           <AdsTop/>
          <Boundary labels={config.configSetting.lbl_Find_list} />
          <form onSubmit={funcSearchData}>
            <div id="box-search"
              className="flex flex-wrap flex-row  my-3 mx-14  h-12 rounded-sm"
            >
              <input type="text" ref={inputRef} onChange={(e)=>handleChange(e)} className="flex flex-1 w-1 pl-5 focus:outline-dotted text-sky-500 rounded-s-md
              hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700" placeholder="Keyword find manga" />
              <button 
              onClick={(e)=>funcSearchData(e)}
              className="flex w-12 p-2 items-center  font-bold text-sky-500 bg-gray-700 rounded-e-md hover:dark:bg-slate-700 hover:bg-slate-600">
                <MagnifyingGlassIcon className="w-7 font-semibold" />
              </button>
            </div>
            <div id="find-option" className="items-center flex flex-row flex-wrap mx-14 ">

              {block.map((option:any) => (
                <label key={option.value} className="flex p-2">
                  <input
                    type="radio"
                    name="options"
                    value={option.value}
                    checked={selectedOption === option.value}
                    onChange={(e)=>handleOptionChange(e)}
                  />
                  {option.lable}
                </label>
              ))}
            </div>
          </form>
        
          <Boundary labels={`Result`} />
          <table className="w-full text-left border-collapse text-sm ">
            <tbody>
              {isFetching && tableSkeleton()}
              {!isFetching && data && data.data && data.data.map((data: any, index: number) => (_renderItem(data, index)))}
            </tbody>
          </table>
          {/*load more*/}
          {!isFetching && data&& data.data && data.data.length>0 && PageAction()}
          <AdsDetail/>
        </main>
      </div>
    </>
  );
}
