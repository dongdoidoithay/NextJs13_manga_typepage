import {
    BookOpenIcon,
  HashtagIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";


 const InfoActionBlockSkeletion = ({config}:any) => {


  return (
    <div id="info-act" className="mr-2 animate-pulse">
      <div className="flex flex-wrap flex-col sm:flex-row ">
        <div className="w-full sm:w-1/4 ">
          <div className="box-content border-2 rounded mr-4 bg-slate-700">
            <div className="w-full h-52 bg-cover bg-no-repeat bg-center rounded-lg"></div>
          </div>
        </div>
        <div className="w-full sm:w-3/4 xs:hidden">
          <div className="ml-1 overflow">
            <h3 className="bg-slate-700 h-32"></h3>
            
            <h3 className="font-semibold text-white/80 first-letter:uppercase">
              {config.configSetting.lbl_inf_Genres}
              <HashtagIcon className="w-2 inline" />
            </h3>
            <div className="flex flex-row flex-wrap gap-1 bg-slate-700 h-5"></div>
            <h3 className="font-semibold text-white/80 first-letter:uppercase">
              {config.configSetting.lbl_inf_Year}
              <HashtagIcon className="w-2 inline" />
            </h3>
            <div className="flex flex-row flex-wrap gap-1 bg-slate-700 h-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InfoActionBlockSkeletion;


