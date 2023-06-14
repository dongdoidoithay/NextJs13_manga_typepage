import ImageLoading from "@/ui/ImageLoading";
import { BookOpenIcon, HashtagIcon, PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const InfoOtherBlock = ({
  id,
  config,
  dataManga,
  key_word,
}: {
  id: any;
  config: any;
  dataManga: any;
  key_word: any;
}) => {
  return (
    <div id="info-more" className="w-full bg-slate-900/70 ">
      {/**social */}
      <div>
        <h3 className="font-semibold text-white/80 first-letter:uppercase">
            {`Social`}
            <HashtagIcon className="w-2 inline" />
          </h3>
      </div>
      <div className="flex flex-row flex-wrap">
        <Link
            rel="nofollow"
            href={`https://www.facebook.com/sharer/sharer.php?u=${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${dataManga.idDoc}${config.configPrefix.endManga}&t=${dataManga.name}`}
            target="_blank"
            title="Follow us on Facebook"
            className="flex w-1/2  lg:w-1/4 "
          >
            <div className="m-1 flex py-2 gap-2 text-xl items-center border  border-slate-700  w-full mr-3 px-3 rounded-md hover:font-semibold hover:border-dashed hover:border-sky-400 dark:hover:border-sky-400">
              <ImageLoading url={`/facebook.svg`} title="Follow us on Facebook" classStyle="w-5 inline flex"/>
              <span  className="flex ">Facebook</span>
            </div>
           
        </Link>
        <Link
          rel="nofollow"
          href={`https://www.twitter.com/intent/tweet?url=${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${dataManga.idDoc}${config.configPrefix.endManga}&text=${dataManga.name}`}
          target="_blank"
          title="Follow us on Twitter"
          className="flex w-1/2  lg:w-1/4"
          >
            <div className="m-1 flex py-2 gap-2 text-xl items-center border  border-slate-700  w-full mr-3 px-3 rounded-md hover:font-semibold hover:border-dashed hover:border-sky-400 dark:hover:border-sky-400">
              <ImageLoading url={`/twitter.svg`} title="Follow us on Twitter" classStyle="w-5 inline flex"/>
              <span  className="flex ">Twitter</span>
            </div>
          
        </Link>
        <Link
          rel="nofollow"
          href={`whatsapp://send?text=${dataManga.name} ${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${dataManga.idDoc}${config.configPrefix.endManga}`}
          target="_blank"
          title="Follow us on WhatsApp"
          className="flex w-1/2  lg:w-1/4"
          >
            <div className="m-1 flex py-2  gap-2 text-xl items-center border  border-slate-700  w-full mr-3 px-3 rounded-md hover:font-semibold hover:border-dashed hover:border-sky-400 dark:hover:border-sky-400">
              <ImageLoading url={`/whatsapp.svg`} title="Follow us on WhatsApp" classStyle="w-6 inline flex"/>
              <span  className="flex ">WhatsApp</span>
            </div>
        
        </Link>
          <Link
            rel="nofollow"
            href={`https://pinterest.com/pin/create/button/?url=${config.configPrefix.url_host}${config.configPrefix.pageManga}/${config.configPrefix.startManga}${dataManga.idDoc}${config.configPrefix.endManga}&media=${dataManga.image}&description=${dataManga.name}`}
            target="_blank"
            title="Follow us on Pinterest"
            className="flex w-1/2  lg:w-1/4"
            >
              <div className="m-1 flex py-2  gap-2 text-xl items-center border  border-slate-700  w-full mr-3 px-3 rounded-md hover:font-semibold hover:border-dashed hover:border-sky-400 dark:hover:border-sky-400">
                <ImageLoading url={`/pinterest.svg`} title="Follow us on Pinterest" classStyle="w-6 inline flex"/>
                <span  className="flex ">Pinterest</span>
              </div>
          </Link>
      </div>

      <div className="ml-1 overflow flex flex-row flex-wrap">
        <div className="flex w-1/2">
          <h3 className="font-semibold text-white/80 first-letter:uppercase">
            {config.configSetting.lbl_inf_Auth}
            <HashtagIcon className="w-2 inline" />
          </h3>
          <div className="flex flex-row flex-wrap gap-1">
            {dataManga.lsauths &&
              dataManga.lsauths.map(
                (item: any, index: any) =>
                  item &&
                  item.id && (
                    <Link
                      rel="tag nofollow"
                      href={`${config.configPrefix.url_host}${config.configPrefix.pageAuth}/${config.configPrefix.startAuth}${item.id}${config.configPrefix.endAuth}`}
                      key={item.id + index}
                      className="flex hover:text-sky-500 dark:hover:text-sky-400 first-letter:uppercase pr-1 hover:font-semibold before:content-['↗_'] after:content-[',']"
                      title={item.name
                        ?.replace("&nbsp;", "")
                        .replace("[Add, ]", "")}
                    >
                      {item.name?.replace("&nbsp;", "").replace("[Add, ]", "")}
                    </Link>
                  )
              )}
          </div>
        </div>
        <div className="flex w-1/2">
          <h3 className="font-semibold text-white/80 first-letter:uppercase">
            {config.configSetting.lbl_inf_Art}
            <HashtagIcon className="w-2 inline" />
          </h3>
          <div className="flex flex-row flex-wrap gap-1">
            {dataManga.lsarts &&
              dataManga.lsarts.map(
                (item: any, index: any) =>
                  item &&
                  item.id && (
                    <Link
                      rel="tag nofollow"
                      href={`${config.configPrefix.url_host}${config.configPrefix.pageArt}/${config.configPrefix.startArt}${item.id}${config.configPrefix.endArt}`}
                      key={item.id + index}
                      className="flex hover:text-sky-500 dark:hover:text-sky-400 first-letter:uppercase pr-1 hover:font-semibold before:content-['↗_'] after:content-[',']"
                      title={item.name
                        ?.replace("&nbsp;", "")
                        .replace("[Add, ]", "")}
                    >
                      {item.name?.replace("&nbsp;", "").replace("[Add, ]", "")}
                    </Link>
                  )
              )}
          </div>
        </div>
        <div className="flex w-1/2">
          <h3 className="font-semibold text-white/80 first-letter:uppercase">
            {config.configSetting.lbl_inf_status}
            <HashtagIcon className="w-2 inline" />
          </h3>
          <div className="flex flex-row flex-wrap gap-1">
            {dataManga.lsstatus &&
              dataManga.lsstatus.map(
                (item: any, index: any) =>
                  item &&
                  item.id && (
                    <Link
                      rel="tag nofollow"
                      href={`${config.configPrefix.url_host}${config.configPrefix.pageStatus}/${config.configPrefix.startStatus}${item.id}${config.configPrefix.endStatus}`}
                      key={item.id + index}
                      className="flex hover:text-sky-500 dark:hover:text-sky-400 first-letter:uppercase pr-1 hover:font-semibold before:content-['↗_'] after:content-[',']"
                      title={item.name
                        ?.replace("&nbsp;", "")
                        .replace("[Add, ]", "")}
                    >
                      {item.name?.replace("&nbsp;", "").replace("[Add, ]", "")}
                    </Link>
                  )
              )}
          </div>
        </div>
        <div className="flex w-1/2">
          <h3 className="font-semibold text-white/80 first-letter:uppercase">
            {config.configSetting.lbl_inf_Type}
            <HashtagIcon className="w-2 inline" />
          </h3>
          <div className="flex flex-row flex-wrap gap-1">
            {dataManga.lstypes &&
              dataManga.lstypes.map(
                (item: any, index: any) =>
                  item &&
                  item.id && (
                    <Link
                      rel="tag nofollow"
                      href={`${config.configPrefix.url_host}${config.configPrefix.pageType}/${config.configPrefix.startType}${item.id}${config.configPrefix.endType}`}
                      key={item.id + index}
                      className="flex hover:text-sky-500 dark:hover:text-sky-400 first-letter:uppercase pr-1 hover:font-semibold before:content-['↗_'] after:content-[',']"
                      title={item.name
                        ?.replace("&nbsp;", "")
                        .replace("[Add, ]", "")}
                    >
                      {item.name?.replace("&nbsp;", "").replace("[Add, ]", "")}
                    </Link>
                  )
              )}
          </div>
        </div>
      </div>
      <div className="w-full">
        <strong>{config.configSetting.lbl_inf_keyword}: </strong>
        {dataManga.tags ? dataManga.tags : key_word}
      </div>
    </div>
  );
};
export default InfoOtherBlock;
