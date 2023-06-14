import Link from "next/link";
import {
  ArrowPathIcon,
  Bars4Icon,
  BoltIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  FireIcon,
  HomeIcon,
  ListBulletIcon,
  MagnifyingGlassCircleIcon,
  RectangleGroupIcon,
  ShieldExclamationIcon,
  SquaresPlusIcon,
  TagIcon,
  VideoCameraIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";
import { MangaSource, MenuLeft, SelectMangaTypeByPage } from "@/constants/configBase";
import { _Prefix_Root_Adult, _Prefix_Root_Adult_Br, _Prefix_Root_Anime, _Prefix_Root_Dc, _Prefix_Root_Manga_Br, _Prefix_Root_Novel, _Prefix_Root_Raw, _Prefix_Root_Scan, _hostwww } from "@/constants/configPrefixBase";
import { SubnNav } from "./sub-nav";
import Byline from "./byline";

export function GlobalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
  };

  let config = SelectMangaTypeByPage('');
  return (
    <>
      <SubnNav />
      <div className="sticky lg:fixed top-0 z-40 flex w-full bg-slate-950 flex-col border-b border-gray-800 lg:bottom-0 lg:z-auto lg:w-60 lg:border-b-0 lg:border-r lg:border-gray-800 ">

        <div className="flex h-14 items-center py-4 px-4 lg:h-auto z-50 ">
          <Link className="group flex w-full items-center gap-x-2.5 " onClick={close} href={'#'}>
            <div className="h-7 w-7 ">
            </div>
            <h3 className="font-semibold tracking-wide text-gray-400 group-hover:text-gray-50 text-xl first-line:uppercase first-letter:text-2xl first-letter:font-bold lg:hidden">
              <div dangerouslySetInnerHTML={{ __html: config.configSetting.lbl_Name_Page }}></div>
            </h3>
          </Link>
          <button
            type="button"
            className="group absolute left-0 top-0 flex h-14 items-center gap-x-2 px-4 lg:hidden mr-7"
            onClick={() => setIsOpen(!isOpen)} >
            {isOpen ? (
              <XMarkIcon className="block w-6 font-semibold text-orange-500" />
            ) : (
              <Bars4Icon className="block w-6 font-semibold text-orange-500" />
            )}
          </button>
          <Link className="group absolute right-0 top-0 flex h-14 items-center gap-x-2 px-4 lg:hidden mr-2"
              href="/search"
              onClick={handleClick}>
              {loading ? <BoltIcon className="block w-7  text-orange-500" /> :<MagnifyingGlassCircleIcon className="block w-9 text-sky-500" />
              }              
           </Link> 

        </div>


        <div
          className={clsx("overflow-y-auto lg:static lg:block ", {
            "fixed inset-0 bottom-0 top-14 mt-px  bg-black z-50": isOpen,
            hidden: !isOpen,
          })}
        >
          <nav className="lg:text-sm lg:leading-6 relative">
            {/*  <div className="font-semibold items-center pb-3">MENU</div> */}
            <ul>
              {MenuLeft.map((navItem, idx) => {
                return <NavItem item={navItem} idx={idx} key={idx} />;
              })}
              <Byline className="" />
            </ul>

          </nav>
        </div>
      </div>

    </>
  );
};


function LoadingIcon() {
  return (<>
    <ArrowPathIcon className="w-4 animate-spin font-semibold" /> ...
  </>
  )
}
import { useRouter } from 'next/router'
function NavItem({
  item,
  idx
}: {
  item: MangaSource,
  idx: number
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
  };
  const router = useRouter()
  const segment = router.asPath;
  let isActive = false;
  if(segment.length>1 && item.value.length>1)
     isActive = segment.includes(item.value);
  if(segment.length==1||segment.length==0)
    isActive = segment.includes(item.value);

  let _link = `${_hostwww}/${item.value}`;


  let _target: any = '_self';
  let Icon: any = null;
  const renderText=()=>{
    switch(item.value){
      case _Prefix_Root_Anime:
       return <span className={clsx('font-semibold',{'text-purple-500':!isActive,'text-sky-500':isActive})}>{item.lable}</span>
      case _Prefix_Root_Adult:
      case _Prefix_Root_Adult_Br:
        return <span className={clsx('font-semibold',{'text-orange-500':!isActive,'text-sky-500':isActive})}>{item.lable}</span>
      case _Prefix_Root_Novel:
        return <span className={clsx('font-semibold',{'text-orange-200':!isActive,'text-sky-500':isActive})}>{item.lable}</span>
      default:
        return <span>{item.lable}</span>
    }
  }
  if (item.icon == "home") {
    Icon = <HomeIcon className="w-6 text-sky-500" />
  }
  if (item.icon == "cate") {
    //console.log("Item",item);
    switch(item.value){
      case _Prefix_Root_Anime:
        Icon = <VideoCameraIcon className="w-6 text-purple-500" />
      break;
      case _Prefix_Root_Adult:
      case _Prefix_Root_Adult_Br:
        Icon = <ShieldExclamationIcon className="w-6 text-orange-500" />
      break;
      case _Prefix_Root_Novel:
        Icon = <BookOpenIcon className="w-6 text-orange-200" />
      break;
      case _Prefix_Root_Manga_Br:
        Icon = <TagIcon className="w-6 text-purple-300" />
      break;
      case _Prefix_Root_Scan:
        Icon = <TagIcon className="w-6 text-sky-300" />
      break;
      case _Prefix_Root_Raw:
        Icon = <TagIcon className="w-6 text-red-300" />
      break;
      case _Prefix_Root_Dc:
        Icon = <TagIcon className="w-6 text-lime-300" />
      break;
      default:
      Icon = <TagIcon className="w-6 text-white" />
      break;
    }
    
  }
  if (item.icon == "popular") {
    Icon = <FireIcon className="w-6 text-red-500" />
  }
  if (item.icon == "latestrelease") {
    Icon = <ListBulletIcon className="w-6 text-rose-500" />
  }
  if (item.icon == "advanced-search") {
    Icon = <MagnifyingGlassCircleIcon className="w-6 text-white" />
  }
  if (item.icon == "collections") {
    Icon = <SquaresPlusIcon className="w-6 text-white" />
  }
  if (item.icon == "community") {
    _target = "_blank";
    _link = item.value;
    Icon = <ChatBubbleLeftRightIcon className="w-6 text-green-500" />
  }
  if (item.icon == "mangalist") {
    Icon = <RectangleGroupIcon className="w-6 text-sky-500" />
  }
  if (item.icon == "bookmark") {
    Icon = <SquaresPlusIcon className="w-6 text-blue-500" />
  }

  
  return (
    <Link
      target={_target}
      href={_link}
      key={idx}
      onClick={handleClick}

      className={clsx(
        'group flex items-center lg:text-sm lg:leading-6 mb-4  py-1',
        {
          'font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300 pl-5 ': !isActive,
          'font-semibold text-sky-500 dark:text-sky-400 border-r border-double border-sky-500  bg-slate-500/10 pl-2': isActive,
        },
      )}
    >
       <div className={clsx(
        'mr-2 p-1 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none  dark:highlight-white/5',
        {
          'group-hover:shadow-indigo-200 dark:group-hover:bg-indigo-500/50 dark:bg-slate-800 dark:highlight-white/5': !isActive,
          'shadow-indigo-200 border border-indigo-500 rounded-md bg-sky-500/20': isActive,
        }
      )}>
        {Icon}
      </div>
      {renderText()}
      {loading ? LoadingIcon() : ''}
    </Link>
  );
}