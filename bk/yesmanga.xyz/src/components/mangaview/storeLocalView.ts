import { getStorage, setStorage } from "@/utils/localFx";


const StoreLocalView=(config:any,data:any)=>{
      const _key=config.localKey.localReadView;
      let local_data = getStorage(_key)
      if ((local_data == null && data.idDetail != null && data.idDetail != undefined) || local_data == "null") 
      {
         // console.log("local_data", local_data)
         var item_obj:any = {};
         item_obj[data.idDoc] = data.idDetail;
         item_obj["comicId"] = data.idDoc;
         item_obj["chapterId"] = data.idDetail;
         item_obj["namechapter"] =config.configSetting.lbl_start_chapter+" "+ data.idDetail;
         item_obj["namecomic"] = data.nameDoc;
         item_obj["time"] = data.date;
         item_obj["image"] = data.manga.image;
         item_obj["url_detail"] = `${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${data.idDoc}${config.configPrefix.endManga}`;
         item_obj["url_view"] = `${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${data.idDoc}${config.configPrefix.endManga}/${config.configPrefix.startViewmanga}${data.idDetail}${config.configPrefix.endViewmanga}`;
  
         setStorage(_key, JSON.stringify([item_obj]), 30 * 24 * 60 * 60)
      }
      else {
         var cookie_obj = JSON.parse(getStorage(_key) as string);
         var exist = false;
         if (cookie_obj != null) {
            for (var i = 0; i < cookie_obj.length; i++) {
               var obj = cookie_obj[i];
               if (obj[data.idDoc] && data.idDetail != null && data.idDetail != undefined) {
                  obj[data.idDoc] = data.idDetail;
                  obj["comicId"] = data.idDoc;
                  obj["chapterId"] = data.idDetail;
                  obj["namechapter"] =config.configSetting.lbl_start_chapter+" "+ data.idDetail;
                  obj["namecomic"] = data.nameDoc;
                  obj["time"] = data.date;
                  obj["image"] = data.manga.image;
                  obj["url_detail"] = `${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${data.idDoc}${config.configPrefix.endManga}`;
                  obj["url_view"] = `${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${data.idDoc}${config.configPrefix.endManga}/${config.configPrefix.startViewmanga}${data.idDetail}${config.configPrefix.endViewmanga}`;
           
                  exist = true;
                  break;
               }
            }
         }
         else {
            var item_obj:any = {};
            if (data.idDetail != null && data.idDetail != undefined) {
               item_obj[data.idDoc] = data.idDetail;
               item_obj["comicId"] = data.idDoc;
               item_obj["chapterId"] = data.idDetail;
               item_obj["namechapter"] =config.configSetting.lbl_start_chapter+" "+ data.idDetail;
               item_obj["namecomic"] = data.nameDoc;
               item_obj["time"] = data.date;
               item_obj["image"] = data.manga.image;
               item_obj["url_detail"] = `${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${data.idDoc}${config.configPrefix.endManga}`;
               item_obj["url_view"] = `${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${data.idDoc}${config.configPrefix.endManga}/${config.configPrefix.startViewmanga}${data.idDetail}${config.configPrefix.endViewmanga}`;
        
               setStorage(_key, JSON.stringify([item_obj]), 30 * 24 * 60 * 60)
               exist = true;
            }
         }
         if (!exist && data.idDetail != null && data.idDetail != undefined) {
            var item_obj:any = {};
            item_obj[data.idDoc] = data.idDetail;
            item_obj["comicId"] = data.idDoc;
            item_obj["chapterId"] = data.idDetail;
            item_obj["namechapter"] =config.configSetting.lbl_start_chapter+" "+ data.idDetail;
            item_obj["namecomic"] = data.nameDoc;
            item_obj["time"] = data.date;
            item_obj["image"] = data.manga.image;
            item_obj["url_detail"] = `${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${data.idDoc}${config.configPrefix.endManga}`;
            item_obj["url_view"] = `${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${data.idDoc}${config.configPrefix.endManga}/${config.configPrefix.startViewmanga}${data.idDetail}${config.configPrefix.endViewmanga}`;
     
            cookie_obj.push(item_obj);
         }
  
         setStorage(_key, JSON.stringify(cookie_obj), 30 * 24 * 60 * 60)
      }
}
export default StoreLocalView;

