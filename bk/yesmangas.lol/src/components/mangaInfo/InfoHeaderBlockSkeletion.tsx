import {
  BookmarkIcon,
  HeartIcon,
  QueueListIcon,
  TagIcon,
} from "@heroicons/react/20/solid";

const InfoHeaderBlockSkeletion = () => {
  
  return (
      <div id="info" className="my-2 mr-2 animate-pulse">
        <div className="flex flex-wrap flex-col sm:flex-row ">
          <div id="name-info" className="flex-1 flex-col gap-1">
            <h1 className="bg-slate-700 h-5 mb-2 mr-8"></h1>
            <h2 className="bg-slate-700 h-3 w-1/3"></h2>
          </div>
          <div
            className="flex flex-wrap gap-1 font-semibold my-1 items-center "
          >
            <button
              className="px-2  xs:text-xs sm:text-sm bg-slate-700 hover:bg-slate-800  hover:text-sky-500 dark:hover:text-sky-400 h-9"
            >
              <BookmarkIcon className="inline w-6 xs:w-2" /> 
            </button>
            <button
              className="px-2 sm:text-sm bg-slate-700 hover:bg-slate-800  hover:text-sky-500 dark:hover:text-sky-400 h-9"
            >
              <HeartIcon className="inline w-6" /> 
            </button>

            <button
              className=" px-2 sm:text-sm bg-slate-700 hover:bg-slate-800  hover:text-sky-500 dark:hover:text-sky-400 h-9"
            >
              <TagIcon className="inline w-6 " />
            </button>
            <button
              className="px-2 sm:text-sm bg-slate-700 hover:bg-slate-800  hover:text-sky-500 dark:hover:text-sky-400 h-9"
            >
              <QueueListIcon className="inline w-6" /> 
            </button>
          </div>
        </div>
      </div>
  );
};


export default InfoHeaderBlockSkeletion;


