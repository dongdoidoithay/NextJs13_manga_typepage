"use client";
import { useState } from "react";
import MangaByGroup from "./mangaByGroup";
import clsx from "clsx";

const PageMangaList = () => {
    const arrayAlpha = ['all', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const [itemAct, setItemAct] = useState('all');

    const changeAction = (item: any) => {
        setItemAct(item);
    }

    
    return (
        <>
            <div className="flex flex-row flex-wrap gap-3">
                {arrayAlpha.map((item: any, idx: number) => {
                    const isActive = item == itemAct;

                    return <button className={clsx('px-2 py-1 font-medium bg-slate-900 border-2 border-slate-900/70 hover:border-sky-500',
                        {
                            'text-orange-500 text-lg': isActive,
                            'text-md ': !isActive
                        }
                    )} type="button" key={idx} onClick={() => changeAction(item)}> {item} </button>
                })}
            </div>
            <MangaByGroup typeManga={''} typeApi='alpha' idFind={itemAct} pageIndex={0} />
        </>
    );
}
export default PageMangaList;