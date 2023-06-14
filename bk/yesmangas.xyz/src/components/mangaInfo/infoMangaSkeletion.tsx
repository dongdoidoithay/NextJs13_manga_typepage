import React from "react";

import InfoHeaderBlockSkeletion from "./InfoHeaderBlockSkeletion";
import InfoActionBlockSkeletion from "./InfoBlockSkeletion";
import RenderChapterListSkeletion from "./renderChapterListSkeletion";


 const InfoMangaSkeletion = ({config}:any) => {

 

  return (
    <>
     <InfoHeaderBlockSkeletion/>
     <InfoActionBlockSkeletion config={config}/>
     <RenderChapterListSkeletion  config={config}/>
    </>
  );
};
export default InfoMangaSkeletion;
