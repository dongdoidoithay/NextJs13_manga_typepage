/* export  const _host="http://localhost:5213";
export const _hostwww="http://www.localhost:5213"; */
export const _host="https://www.mangakakalot.lol";
export const _hostwww="https://www.mangakakalot.lol"; 


export const _Prefix_Root_Manga_Br='manga-br';
export const _Prefix_Root_Adult_Br='adult-br';
export const _Prefix_Root_Scan='scans';
export const _Prefix_Root_Raw='raw';
export const _Prefix_Root_Adult='adult';
export const _Prefix_Root_Dc='comic';
export const _Prefix_Root_Novel='novel';
export const _Prefix_Root_NewsDc='blog';
export const _Prefix_Root_Anime='anime';


export const _Prefix_Type_Adult_Br='adult-br';
export const _Prefix_Type_Manga_Br='manga-br';
export const _Prefix_Type_Scan='scan';
export const _Prefix_Type_Raw='raw';
export const _Prefix_Type_Adult='adult';
export const _Prefix_Type_Dc='comic';
export const _Prefix_Type_Novel='novel';
export const _Prefix_Type_NewsDc='blog';
export const _Prefix_Type_Anime='anime';

export type ConfigPrefix ={
    pageManga:string;
    pageGenre:string;
    pageYear:string;
    pageAuth:string;
    pageType:string;
    pageScan:string;
    pageArt:string;
    pageStatus:string;
    pageViewManga:string;
    pageAlphaBet:string;
    pageTag:string;


    startGenre:string;
    startYear:string;
    startAuth:string;
    startManga:string;
    startType:string;
    startScan:string;
    startArt:string;
    startStatus:string;
    startAlphaBet:string;
    startViewmanga:string;
    startTag:string;

    endGenre:string;
    endYear:string;
    endAuth:string;
    endManga:string;
    endType:string;
    endScan:string;
    endArt:string;
    endStatus:string;
    endAlphaBet:string;
    endViewmanga:string;
    endTag:string;

    url_host:string;
    url_www_host:string;

} 

export const MangaBrPrefix:ConfigPrefix={
    pageManga:`/${_Prefix_Root_Manga_Br}`,
    pageGenre:`/${_Prefix_Root_Manga_Br}/genres`,
    pageYear:`/${_Prefix_Root_Manga_Br}/year`,
    pageAuth:`/${_Prefix_Root_Manga_Br}/auth`,
    pageType:`/${_Prefix_Root_Manga_Br}/type`,
    pageScan:`/${_Prefix_Root_Manga_Br}/scan`,
    pageArt:`/${_Prefix_Root_Manga_Br}/art`,
    pageStatus:`/${_Prefix_Root_Manga_Br}/status`,
    pageViewManga:`/${_Prefix_Root_Manga_Br}`,
    pageAlphaBet:`/${_Prefix_Root_Manga_Br}/a-z`,
    pageTag:`/${_Prefix_Root_Manga_Br}/tags`,

    startGenre:"",
    startYear:"",
    startAuth:"",
    startManga:"",
    startType:"",
    startScan:"",
    startArt:"",
    startStatus:"",
    startAlphaBet:"",
    startViewmanga:"cap-",
   

    endGenre:"",
    endYear:"",
    endAuth:"",
    endManga:"",
    endType:"",
    endScan:"",
    endArt:"",
    endStatus:"",
    endAlphaBet:"",
    endViewmanga:"",


    startTag:"",
    endTag:"",

    url_host:_host,
    url_www_host:_hostwww,
}

export const AdultBrPrefix:ConfigPrefix={
    pageManga:`/${_Prefix_Root_Adult_Br}`,
    pageGenre:`/${_Prefix_Root_Adult_Br}/genres`,
    pageYear:`/${_Prefix_Root_Adult_Br}/year`,
    pageAuth:`/${_Prefix_Root_Adult_Br}/auth`,
    pageType:`/${_Prefix_Root_Adult_Br}/type`,
    pageScan:`/${_Prefix_Root_Adult_Br}/scan`,
    pageArt:`/${_Prefix_Root_Adult_Br}/art`,
    pageStatus:`/${_Prefix_Root_Adult_Br}/status`,
    pageViewManga:`/${_Prefix_Root_Adult_Br}`,
    pageAlphaBet:`/${_Prefix_Root_Adult_Br}/a-z`,
    pageTag:`/${_Prefix_Root_Adult_Br}/tags`,

    startGenre:"",
    startYear:"",
    startAuth:"",
    startManga:"",
    startType:"",
    startScan:"",
    startArt:"",
    startStatus:"",
    startAlphaBet:"",
    startViewmanga:"cap-",
   

    endGenre:"",
    endYear:"",
    endAuth:"",
    endManga:"",
    endType:"",
    endScan:"",
    endArt:"",
    endStatus:"",
    endAlphaBet:"",
    endViewmanga:"",


    startTag:"",
    endTag:"",

    url_host:_host,
    url_www_host:_hostwww,
}

export const ScanPrefix:ConfigPrefix={
    pageManga:`/${_Prefix_Root_Scan}`,
    pageGenre:`/${_Prefix_Root_Scan}/genres`,
    pageYear:`/${_Prefix_Root_Scan}/year`,
    pageAuth:`/${_Prefix_Root_Scan}/auth`,
    pageType:`/${_Prefix_Root_Scan}/type`,
    pageScan:`/${_Prefix_Root_Scan}/scan`,
    pageArt:`/${_Prefix_Root_Scan}/art`,
    pageStatus:`/${_Prefix_Root_Scan}/status`,
    pageViewManga:`/${_Prefix_Root_Scan}`,
    pageAlphaBet:`/${_Prefix_Root_Scan}/a-z`,
    pageTag:`/${_Prefix_Root_Scan}/tags`,

    startGenre:"",
    startYear:"",
    startAuth:"",
    startManga:"",
    startType:"",
    startScan:"",
    startArt:"",
    startStatus:"",
    startAlphaBet:"",
    startViewmanga:"chapter-",
   

    endGenre:"",
    endYear:"",
    endAuth:"",
    endManga:"",
    endType:"",
    endScan:"",
    endArt:"",
    endStatus:"",
    endAlphaBet:"",
    endViewmanga:"",


    startTag:"",
    endTag:"",

    url_host:_host,
    url_www_host:_hostwww,
}

export const RawPrefix:ConfigPrefix={
    pageManga:`/${_Prefix_Root_Raw}`,
    pageGenre:`/${_Prefix_Root_Raw}/genres`,
    pageYear:`/${_Prefix_Root_Raw}/year`,
    pageAuth:`/${_Prefix_Root_Raw}/auth`,
    pageType:`/${_Prefix_Root_Raw}/type`,
    pageScan:`/${_Prefix_Root_Raw}/scan`,
    pageArt:`/${_Prefix_Root_Raw}/art`,
    pageStatus:`/${_Prefix_Root_Raw}/status`,
    pageViewManga:`/${_Prefix_Root_Raw}`,
    pageAlphaBet:`/${_Prefix_Root_Raw}/a-z`,
    pageTag:`/${_Prefix_Root_Raw}/tags`,



    startGenre:"",
    startYear:"",
    startAuth:"",
    startManga:"",
    startType:"",
    startScan:"",
    startArt:"",
    startStatus:"",
    startAlphaBet:"",
    startViewmanga:"chapter-",

    endGenre:"",
    endYear:"",
    endAuth:"",
    endManga:"",
    endType:"",
    endScan:"",
    endArt:"",
    endStatus:"",
    endAlphaBet:"",
    endViewmanga:"",

    startTag:"",
    endTag:"",

    url_host:_host,
    url_www_host:_hostwww,
}

export const AdultPrefix:ConfigPrefix={
    pageManga:`/${_Prefix_Root_Adult}`,
    pageGenre:`/${_Prefix_Root_Adult}/genres`,
    pageYear:`/${_Prefix_Root_Adult}/year`,
    pageAuth:`/${_Prefix_Root_Adult}/auth`,
    pageType:`/${_Prefix_Root_Adult}/type`,
    pageScan:`/${_Prefix_Root_Adult}/scan`,
    pageArt:`/${_Prefix_Root_Adult}/art`,
    pageStatus:`/${_Prefix_Root_Adult}/status`,
    pageViewManga:`/${_Prefix_Root_Adult}`,
    pageAlphaBet:`/${_Prefix_Root_Adult}/a-z`,
    pageTag:`/${_Prefix_Root_Adult}/tags`,

    startGenre:"",
    startYear:"",
    startAuth:"",
    startManga:"",
    startType:"",
    startScan:"",
    startArt:"",
    startStatus:"",
    startAlphaBet:"",
    startViewmanga:"chapter-",

    endGenre:"",
    endYear:"",
    endAuth:"",
    endManga:"",
    endType:"",
    endScan:"",
    endArt:"",
    endStatus:"",
    endAlphaBet:"",
    endViewmanga:"",

    startTag:"",
    endTag:"",

    url_host:_host,
    url_www_host:_hostwww,
}

export const DcPrefix:ConfigPrefix={
    pageManga:`/${_Prefix_Root_Dc}`,
    pageGenre:`/${_Prefix_Root_Dc}/genres`,
    pageYear:`/${_Prefix_Root_Dc}/year`,
    pageAuth:`/${_Prefix_Root_Dc}/auth`,
    pageType:`/${_Prefix_Root_Dc}/type`,
    pageScan:`/${_Prefix_Root_Dc}/scan`,
    pageArt:`/${_Prefix_Root_Dc}/art`,
    pageStatus:`/${_Prefix_Root_Dc}/status`,
    pageViewManga:`/${_Prefix_Root_Dc}`,
    pageAlphaBet:`/${_Prefix_Root_Dc}/a-z`,
    pageTag:`/${_Prefix_Root_Dc}/tags`,

    startGenre:"",
    startYear:"",
    startAuth:"",
    startManga:"",
    startType:"",
    startScan:"",
    startArt:"",
    startStatus:"",
    startAlphaBet:"",
    startViewmanga:"issue-",

    endGenre:"",
    endYear:"",
    endAuth:"",
    endManga:"",
    endType:"",
    endScan:"",
    endArt:"",
    endStatus:"",
    endAlphaBet:"",
    endViewmanga:"",

    startTag:"",
    endTag:"",

    url_host:_host,
    url_www_host:_hostwww,
}

export const NewsDcPrefix:ConfigPrefix={
    pageManga:`/${_Prefix_Root_NewsDc}`,
    pageGenre:`/${_Prefix_Root_NewsDc}/cat`,
    pageYear:`/${_Prefix_Root_NewsDc}/year`,
    pageAuth:`/${_Prefix_Root_NewsDc}/auth`,
    pageType:`/${_Prefix_Root_NewsDc}/type`,
    pageScan:`/${_Prefix_Root_NewsDc}/scan`,
    pageArt:`/${_Prefix_Root_NewsDc}/art`,
    pageStatus:`/${_Prefix_Root_NewsDc}/status`,
    pageViewManga:`/${_Prefix_Root_NewsDc}`,
    pageAlphaBet:`/${_Prefix_Root_NewsDc}/a-z`,
    pageTag:`/${_Prefix_Root_NewsDc}/tags`,

    startGenre:"",
    startYear:"",
    startAuth:"",
    startManga:"",
    startType:"",
    startScan:"",
    startArt:"",
    startStatus:"",
    startAlphaBet:"",
    startViewmanga:"",

    endGenre:"",
    endYear:"",
    endAuth:"",
    endManga:"",
    endType:"",
    endScan:"",
    endArt:"",
    endStatus:"",
    endAlphaBet:"",
    endViewmanga:"",

    startTag:"",
    endTag:"",

    url_host:_host,
    url_www_host:_hostwww,
}

export const NovelPrefix:ConfigPrefix={
    pageManga:`/${_Prefix_Root_Novel}`,
    pageGenre:`/${_Prefix_Root_Novel}/genres`,
    pageYear:`/${_Prefix_Root_Novel}/year`,
    pageAuth:`/${_Prefix_Root_Novel}/auth`,
    pageType:`/${_Prefix_Root_Novel}/type`,
    pageScan:`/${_Prefix_Root_Novel}/scan`,
    pageArt:`/${_Prefix_Root_Novel}/art`,
    pageStatus:`/${_Prefix_Root_Novel}/status`,
    pageViewManga:`/${_Prefix_Root_Novel}`,
    pageAlphaBet:`/${_Prefix_Root_Novel}/a-z`,
    pageTag:`/${_Prefix_Root_Novel}/tags`,


    startGenre:"",
    startYear:"",
    startAuth:"",
    startManga:"",
    startType:"",
    startScan:"",
    startArt:"",
    startStatus:"",
    startAlphaBet:"",
    startViewmanga:"volume-",

    endGenre:"",
    endYear:"",
    endAuth:"",
    endManga:"",
    endType:"",
    endScan:"",
    endArt:"",
    endStatus:"",
    endAlphaBet:"",
    endViewmanga:"",

    startTag:"",
    endTag:"",

    url_host:_host,
    url_www_host:_hostwww,
}

export const AnimePrefix:ConfigPrefix={
    pageManga:`/${_Prefix_Root_Anime}`,
    pageGenre:`/${_Prefix_Root_Anime}/genres`,
    pageYear:`/${_Prefix_Root_Anime}/year`,
    pageAuth:`/${_Prefix_Root_Anime}/auth`,
    pageType:`/${_Prefix_Root_Anime}/type`,
    pageScan:`/${_Prefix_Root_Anime}/scan`,
    pageArt:`/${_Prefix_Root_Anime}/art`,
    pageStatus:`/${_Prefix_Root_Anime}/status`,
    pageViewManga:`/${_Prefix_Root_Anime}`,
    pageAlphaBet:`/${_Prefix_Root_Anime}/a-z`,
    pageTag:`/${_Prefix_Root_Anime}/tags`,


    startGenre:"",
    startYear:"",
    startAuth:"",
    startManga:"",
    startType:"",
    startScan:"",
    startArt:"",
    startStatus:"",
    startAlphaBet:"",
    startViewmanga:"ep-",

    endGenre:"",
    endYear:"",
    endAuth:"",
    endManga:"",
    endType:"",
    endScan:"",
    endArt:"",
    endStatus:"",
    endAlphaBet:"",
    endViewmanga:"",

    startTag:"",
    endTag:"",

    url_host:_host,
    url_www_host:_hostwww,
}