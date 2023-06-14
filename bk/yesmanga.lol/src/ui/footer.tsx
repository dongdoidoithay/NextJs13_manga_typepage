import AdsFooter from "@/ads/ads_footer";
import { FetchApi } from "@/constants/FetchApi";
import {
  MangaLang,
  SelectMangaTypeByPage,
  apiConfigPath,
} from "@/constants/configBase";
import { getStorage, setStorage } from "@/utils/localFx";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const FetchAllDataDomain = async (config: MangaLang) => {
   // console.log("call Data Domain");
  return await FetchApi(apiConfigPath + config.endPointPath.configGetAllDomain);
};

const FotterPage = () => {
  //let dataDomain:any = [];
  const[dataDomain,setDataDomain]=useState<any[]>([])
  const [config, setConfig] = useState(SelectMangaTypeByPage(""));
  let _SID = "";
  const[sid,setSid]=useState(_SID);
  const { isLoading, data ,refetch,isFetching} = useQuery(
    ["Get All Domain", config.configSetting.lbl_domain_Page],
    () => FetchAllDataDomain(config),
    {
      retry: 10,
      staleTime: 10000,
      cacheTime: 5000,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled:false
    }
  );

  useEffect(() => {
    const _key =
      config.configSetting.lbl_domain_home + "-" + config.localKey.localType;
    let type = getStorage(_key);
    if (type != "" && type != null && type != undefined) 
    {
      setConfig(SelectMangaTypeByPage(type.toString()));
    }
    const _keydomain=config.configSetting.lbl_domain_home + "-domain";
    let _domainData =getStorage(_keydomain);
    if (_domainData != "" &&  _domainData != null && _domainData != undefined) 
    {
      //console.log("local")
      let _data=JSON.parse(_domainData);
      setDataDomain(_data);

      const _keydomain_sid=config.configSetting.lbl_domain_home + "-domain-sid";
      _SID = getStorage(_keydomain_sid) as string;
      setSid(_SID);

    }else{
        refetch();
        //get data inlocal
       
        let _domainData =getStorage(_keydomain);
        //console.log("local",_domainData)
        if (_domainData != "" &&  _domainData != null && _domainData != undefined) 
        {
          //console.log("local")
          let _data=JSON.parse(_domainData);
          setDataDomain(_data);
    
          const _keydomain_sid=config.configSetting.lbl_domain_home + "-domain-sid";
          _SID = getStorage(_keydomain_sid) as string;
          setSid(_SID);
        }
    }

  }, [setConfig,setDataDomain,setSid,data]);

  
 

  //console.log("useQuery",{isLoading,isFetching,data})
  if(!isLoading&&data&& data.length)
  {
     const _infodomain=data.filter((x:any)=>x.domain==config.configSetting.lbl_domain_Page);
    if(_infodomain && _infodomain.length>0){
        _SID=_infodomain[0].histats_id;
        const _keydomain_sid=config.configSetting.lbl_domain_home + "-domain-sid";
        setStorage( _keydomain_sid,_SID,7 * 24 * 60 * 60);

    }
    //map
    let  nyArr:any =[];
    if(data.length>30)
    {
      var randomIndices = [];
      while (randomIndices.length <= 20) {
        randomIndices.push(Math.floor(Math.random() * data.length));
      }
      nyArr =randomIndices.map(function(i) {
        return data[i];
      });
      //setDataDomain(nyArr)
      //dataDomain=dataDomain.concat(nyArr);
      const _keydomain=config.configSetting.lbl_domain_home + "-domain";
      const _dataDomain=JSON.stringify(nyArr);
      setStorage( _keydomain,_dataDomain,7 * 24 * 60 * 60);
      // window.location.reload();
    }
    //setSid(_SID);
   // setDataDomain(nyArr);
  }
 //console.log("xx",{dataDomain,sid})
  return (
    <>
      <div className="w-full h-80 pl-0  lg:pl-56 mt-14 bottom-0 ">
        <div id="heder" className="h-7 rounded bg-slate-700/70 align-middle justify-center ">
          <ul className="flex flex-row gap-3 align-middle justify-center items-center">
            <li ><Link title="Site map " href={`${config.configPrefix.url_host}/server-sitemap.xml`}>SiteMap</Link></li>
            <li ><Link title="Site map " href={`${config.configPrefix.url_host}/api/sitemap.html`}>Google SiteMap</Link></li>
            <li ><Link title="Site map " href={`${config.configPrefix.url_host}/api/urllist.txt`}>Bing SiteMap</Link></li>
          </ul>
        </div>
        <div id="box-inf" className="flex flex-col gap-3  bg-slate-900/70 border border-slate-700">
          <AdsFooter/>
          <div className="flex flex-row">
            <div id="box-left" className="w-1/5 flex flex-col gap-2 flex-1 items-center">
              <Link href="/" title={config.configSetting.lbl_Name_Page}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: config.configSetting.lbl_Name_Page,
                  }}
                  className="text-xl font-semibold first-line:uppercase first-letter:text-2xl first-letter:font-bold"
                ></div>
              </Link>
        
                 {sid&& sid!=''&& <Link href={`https://www.histats.com/viewstats/?SID=${sid}&f=2`} target="_blank" >
                        <div id="histatsC"><img  src={`https://s4is.histats.com/stats/i/${sid}.gif?${sid}&103`} alt={config.configSetting.lbl_Name_Page}/></div>
                    </Link>}
               
                 <Link href="https://www.dmca.com/Protection/Status.aspx?ID=e4da793f-4aab-437a-85bc-033cbafb0b7c" title="DMCA.com Protection Status" className="dmca-badge">
                    <img src="https://images.dmca.com/Badges/dmca_protected_sml_120m.png?ID=e4da793f-4aab-437a-85bc-033cbafb0b7c" alt="DMCA.com Protection Status" />
                </Link> 
                <Script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js" async/> 
            </div>
            <div id="box-right" className="w-4/5">
                <div className="block py-1 text-sm justify-center">
                    <p className="text-center">Copyrights and trademarks for the manga, and other promotional materials are held by their respective owners and their use is allowed under the fair use clause of the Copyright Law. © 2019 {config.configSetting.lbl_domain_Page}</p>
                    <i className="text-xs text-center">If you have any problems with the image on our website, you can contact us via Gmail or Facebook, When requested, we will review and remove it immediately. Thanks for reading.My Gmail: mangavn1@gmail.com</i>
                </div>
                <div className="text-xs">
                    {dataDomain && dataDomain.map((item:any,index:number)=>{
                            return(
                                <Link className="hover:text-sky-500 dark:hover:text-sky-400 before:content-['↗_'] after:content-[',_']" key={item.domain+'-'+index} title={item.domain_name} href={`https://${item.domain}`}>{item.domain_name}</Link>
                            )
                    })}
                </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};
export default FotterPage;
