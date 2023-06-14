import { MangaLang } from "@/constants/configBase";
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  BookmarkIcon,
  HashtagIcon,
  HeartIcon,
  QueueListIcon,
  TagIcon,
} from "@heroicons/react/20/solid";
import { toast } from "react-toastify";

const InfoHeaderBlock = ({config, dataManga}:{config: any; dataManga: any}) => {
  const FnSubscribe = () => {
    toast("🦄 Subscribe Functions under development", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const FnFavorite = () => {
    toast("🦄 Favorite Functions under development", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const FnReadLater = () => {
    toast("🦄 Read Later Functions under development", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const FnCollection = () => {
    toast("🦄 Collection Functions under development", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <div id="info" className="my-2 mr-2">
        <div className="flex flex-wrap flex-col sm:flex-row">
          <div id="name-info" className="flex-1 text-2xl">
            <h1 className="font-semibold first-letter:text-3xl text-white/80">
              {config.configSetting.lbl_inf_start_manga} {dataManga.name}
            </h1>
            <h2 className="text-sm">{dataManga.nameOther}</h2>
          </div>
          <div
            id="action-info"
            className="flex flex-wrap gap-1 font-semibold my-1 items-center"
          >
            <button
              onClick={FnSubscribe}
              type="button"
              className="px-2  xs:text-xs sm:text-sm bg-slate-700 hover:bg-slate-800  hover:text-sky-500 dark:hover:text-sky-400 h-9"
            >
              <BookmarkIcon className="inline w-6 xs:w-2" /> Subscribe
            </button>
            <button
              onClick={FnFavorite}
              type="button"
              className="px-2 sm:text-sm bg-slate-700 hover:bg-slate-800  hover:text-sky-500 dark:hover:text-sky-400 h-9"
            >
              <HeartIcon className="inline w-6" /> Favorite
            </button>

            <button
              onClick={FnReadLater}
              type="button"
              className=" px-2 sm:text-sm bg-slate-700 hover:bg-slate-800  hover:text-sky-500 dark:hover:text-sky-400 h-9"
            >
              <TagIcon className="inline w-6 " /> Read Later
            </button>
            <button
              onClick={FnCollection}
              type="button"
              className="px-2 sm:text-sm bg-slate-700 hover:bg-slate-800  hover:text-sky-500 dark:hover:text-sky-400 h-9"
            >
              <QueueListIcon className="inline w-6" /> Collection
            </button>
          </div>
        </div>
      </div>
    </>
  );
};


export default InfoHeaderBlock;


