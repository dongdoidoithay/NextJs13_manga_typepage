import axios from "axios";
import { SelectMangaTypeByPage } from "./configBase";

var md5=require("md5");
let config = SelectMangaTypeByPage('');
const _slat="8e0550790c94d6abc71d738959a88d209690dc86";
const _domain=config.configSetting.lbl_domain_Page;
const _date=new Date().toUTCString();
const _hashgen=md5(_slat+_domain+_date);

const _header= {
    _domain: _domain,
    _date:_date,
    _tranId:_hashgen,
    _hash:_hashgen,
    _path:'',
    "Access-Control-Allow-Origin": '*',
    cache:'no-store',
    mode: 'no-cors'
}
const _headerpost= {
  _domain: _domain,
  _date:_date,
  _tranId:_hashgen,
  _hash:_hashgen,
  _path:'',
  "Access-Control-Allow-Origin": '*',
  mode: 'no-cors'
}
export async function FetchApi(path:string) 
{
     const _hashPath=md5(_slat+_domain+_date+path);
    _header._path=path;
    _header._tranId=_hashPath; 
    //TODO: - check HASH
   /*  console.log("HASH",{_hashgen,_hashPath}) */
    let res = await fetch(path, {
      headers: _header,
      cache:'no-store',
    });
    if (res.ok) {
      return await res.json();
    }else{
      throw new Error('404 Not Found');
    }
    return await res.json();
}
export async function FetchPostApi(path:string,data:any) 
{
     const _hashPath=md5(_slat+_domain+_date+path);
    _header._path=path;
    _header._tranId=_hashPath; 
    //TODO: - check HASH
   /*  console.log("HASH",{_hashgen,_hashPath}) */
    let res = await fetch(path, {
      headers: _headerpost,
      method: 'POST',
      body: data
    });
    if (res.ok) {
      return await res.json();
    }else{
      console.log("Call ex",res)
    }
    return await res.json();
}
export async function AxiosPostApi(path:string,data:any) 
{
     const _hashPath=md5(_slat+_domain+_date+path);
     _headerpost._path=path;
     _headerpost._tranId=_hashPath; 
      //TODO: - check HASH
      await axios.post(path, data,{headers: _headerpost})
     .then(response => {
       console.log("post cmd-->response",response);
       return response;
     }) 
    
    
}