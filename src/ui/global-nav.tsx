
import Link from "next/link";
import {
  ArrowPathIcon,
  Bars4Icon,
  BoltIcon,
  ChatBubbleLeftIcon,
  FireIcon,
  HomeIcon,
  ListBulletIcon,
  MagnifyingGlassCircleIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  TagIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";
import { MangaSource, MenuLeft, SelectMangaTypeByPage } from "@/constants/configBase";
import { _hostwww } from "@/constants/configPrefixBase";
import { SubnNav } from "./sub-nav";
import Byline from "./byline";
import { useRouter } from 'next/router'

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
              {/* <li>
                <Link href="/docs/installation" 
                  className="group flex items-center lg:text-sm lg:leading-6 mb-4 ">
                  <div className="mr-4 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10 ">
                  <HomeIcon className="w-7 text-white"/>
                  </div>Home</Link>
              </li>
              <li>
                <Link href="https://tailwindui.com/components?ref=sidebar" 
                  className="group flex items-center lg:text-sm lg:leading-6 mb-4 font-medium text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300">
                  <div className="mr-4 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10 ">
                  <HomeIcon className="w-7 text-white"/>
                  </div>Components
                  </Link>
              </li> */}
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
  //const segment = usePathname();
  //console.log("Path",router)
  const isActive = router.asPath.includes("/" + item.value);
  let _link = `${_hostwww}/${item.value}`;

  let _target: any = '_self';
  let Icon: any = null;
  if (item.icon == "home") {
    Icon = <HomeIcon className="w-6 text-white" />
  }
  if (item.icon == "cate") {
    Icon = <TagIcon className="w-6 text-white" />
  }
  if (item.icon == "popular") {
    Icon = <FireIcon className="w-6 text-white" />
  }
  if (item.icon == "latestrelease") {
    Icon = <ListBulletIcon className="w-6 text-white" />
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
    Icon = <ChatBubbleLeftIcon className="w-6 text-white" />
  }
  if (item.icon == "mangalist") {
    Icon = <RectangleGroupIcon className="w-6 text-white" />
  }
  if (item.icon == "bookmark") {
    Icon = <SquaresPlusIcon className="w-6 text-white" />
  }

  /*   console.log("nav-item-10",item.value)
    console.log("nav-item",{segment,isActive,}) */
  return (
    <Link
      target={_target}
      href={_link}
      key={idx}
      onClick={handleClick}

      className={clsx(
        'group flex items-center lg:text-sm lg:leading-6 mb-4 pl-5  py-1',
        {
          'font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300': !isActive,
          'font-semibold text-sky-500 dark:text-sky-400 border-r border-double border-sky-500  bg-slate-500/10': isActive,
        },
      )}
    >
      <div className={clsx(
        'mr-4 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none  dark:highlight-white/5',
        {
          'group-hover:shadow-indigo-200 dark:group-hover:bg-indigo-500 dark:bg-slate-800 dark:highlight-white/5': !isActive,
          'group-hover:shadow-sky-200 dark:group-hover:bg-sky-500 dark:bg-sky-500 dark:highlight-white/10': isActive,
        }
      )}>
        {Icon}
      </div>
      {item.lable}
      {loading ? LoadingIcon() : ''}
    </Link>
  );
}