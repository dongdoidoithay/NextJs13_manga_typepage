import React from "react";

import { getStorage } from "@/utils/localFx";
import { BookOpenIcon, BookmarkIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ExclamationTriangleIcon, HeartIcon, Square2StackIcon, Square3Stack3DIcon, TagIcon } from "@heroicons/react/20/solid";

const InfoActionViewSkeletion = () => {

    return (
        <>
                <div id="info" className="animate-pulse my-1 mx-2 ">
                    <h1 className="bg-slate-700 h-5 w-1/2"></h1>
                </div>
                <div id="action-info" className="animate-pulse flex flex-wrap flex-col sm:flex-row gap-4 ">
                    <div className="flex flex-1 flex-wrap gap-0  my-1 items-center bg-slate-700 h-3 w-5/6">
                       
                    </div>
                    <div className="flex flex-wrap font-semibold my-1  bg-slate-700 h-3  w-1/6">
                       
                    </div>
                </div>
           
        </>
    );
};
export default InfoActionViewSkeletion;
