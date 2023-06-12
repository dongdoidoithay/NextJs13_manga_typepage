
export const ITEM_SLIDE=10
export const ITEM_TREND=1
export const ITEM_POPULAR=6
export const ITEM_SERIES=6

export const ITEM_HOME_COUNT=12
export const ITEM_PAGE_COUNT=12
export type EndpointType={
    homeSlide:string;
    homeTren:string;
    homeLastUpdate:string;
    homePopular:string;
    homeSeriesPopular:string;
    infoManga:string;
    infoChapter:string;
    randomManga:string;
    viewmanga:string;
    genres:string;
    mangaGenres:string;
    mangaYear:string;
    mangaStatus:string;
    mangaAuth:string;
    mangaArt:string;
    mangaType:string;
    mangaAlpha:string;
    sitemapDoc:string;
    sitemapAll:string;
    mangaQuickSearch: string;
    mangaListSearch: string;
    mangaAdvanceSearch: string,
    
    configAddcomment: string;
    configGetAllDomain: string;
    configGetTopComment: string;

    newtags:string;
    listtags:string;

    checkTrend:string;
    addTrend:string;
}
export const EndpointSetting:EndpointType={
    homeSlide:`/MangaTrend/${ITEM_SLIDE}/0/slide`,
    homeTren:`/MangaTrend/${ITEM_TREND}/0/trend`,
    homeLastUpdate:`/MangaHomeUpdate/${ITEM_PAGE_COUNT}/`,
    homePopular: `/MangaTrend/${ITEM_POPULAR}/0/popular`,
    homeSeriesPopular: `/GetListTopViewHome/${ITEM_SERIES}/0`,
    infoManga: `/GetInfoManga/`,
    infoChapter: `/GetChapterListFilter/`,
    randomManga:`/getRandomManga`,
    viewmanga:`/GetImageChapter/`,
    genres:`/AllGenres`,
    mangaGenres:`/getGenresMangas/${ITEM_PAGE_COUNT}/`,
    mangaYear:`/getYearsMangas/${ITEM_PAGE_COUNT}/`,
    mangaStatus:`/getStatusMangas/${ITEM_PAGE_COUNT}/`,
    mangaAuth:`/getAuthMangas/${ITEM_PAGE_COUNT}/`,
    mangaArt:`/getArtsMangas/${ITEM_PAGE_COUNT}/`,
    mangaType:`/getTypeMangas/${ITEM_PAGE_COUNT}/`,
    mangaAlpha:`/getAlphaberMangas/${ITEM_PAGE_COUNT}/`,
    sitemapDoc: `/AutoSiteMapDoc/`,
    sitemapAll: `/SiteMapDoc/`,
    mangaQuickSearch: `/searchterm/`,
    mangaListSearch: `/searchforms/${ITEM_SERIES}/`,
    mangaAdvanceSearch: `/advanceSearch`,

    configAddcomment: `/addCommentsDomain`,
    configGetAllDomain: `/alldomain`,
    configGetTopComment: `/TopCommentsDomain/${ITEM_SERIES}/`,
    newtags:`/AllTag`,
    listtags:`/getTagsMangas/${ITEM_PAGE_COUNT}/`,

    checkTrend:`/CheckMangaTrend/`,
    addTrend:`/addTrend`,
}
export type LocalKeyType={
    localReadView:string;
    localViewMode:string;
    localQuickSearch:string;
    localGenres:string;
    localBackLink:string;
    localType:string;
    localSort:string;
}
export const LocalKey:LocalKeyType={
    localReadView:"[VIEW]VIEW_PAGE_READ",
    localViewMode:"[VIEW]ViewMode",
    //#local
    localGenres:"[VIEW]localGenres",
    localBackLink:"[VIEW]localBackLink",
    localQuickSearch: "[MANGARE-BORN-RAW]QUICK_SEARCH",
    localType:"[Tab]Select-Type",
    localSort:"[Sort]Local"
}

export const Endpoint ={
    ITEM_PAGE:18,
 
    GENRES: `/AllGenres`,
    TYPE: `/AllType`,
    YEAR: `/AllYear`,
    STATUS: `/AllStatus`,
    ROOT: `/GetRoot`,
    //home
    MG_FEATURES: `/MangaSlide`,
    MG_LAST_UPDATE: `/GetListDocLasteUpdate/`,
    MG_TOP_VIEW: `/GetListTopViewHome`,
    //layout
    MG_SLIDE: `/MangaSlide`,
    MG_NOTICE: `/MangaNotice`,
    MG_POP: `/GetListPopHome`,
 
    MG_GET_COMENT: `/GetCommentHome/`,
    //end layout
    //home
 
    MG_INFO: `/GetInfoManga/`,
    MG_INFO_CHAPTERS: `/GetChapterList/`,
    MG_VIEW_MANGA: `/GetImageChapter/`,
    MG_RANDOM_MANGA:`/getRandomManga`,
 
    //new
    MG_HOME_SLIDE: `/MangaTrend/${ITEM_SLIDE}/0/slide`,
    MG_HOME_TREND: `/MangaTrend/${ITEM_TREND}/0/trend`,
    MG_HOME_POPULAR: `/MangaTrend/${ITEM_POPULAR}/0/popular`,
    MG_HOME_LASTUPDATE: `/MangaHomeUpdate/${ITEM_HOME_COUNT}/0`,
    MG_HOME_ADULT_LASTUPDATE: `/MangaHomeUpdate/${ITEM_PAGE_COUNT}/0`,
    MG_HOME_TOPDAYLY: `/MangaHomeUpdate/${ITEM_POPULAR}/1`,
    //list manga by genres
    MG_LIST_MANGA_GENRES: `/getGenresMangas/${ITEM_PAGE_COUNT}/`,
    MG_LIST_MANGA_AUTH: `/getAuthMangas/${ITEM_PAGE_COUNT}/`,
    MG_LIST_MANGA_STATUS: `/getStatusMangas/${ITEM_PAGE_COUNT}/`,
    MG_LIST_MANGA_LASTUPDATE:`/MangaHomeUpdate/${ITEM_PAGE_COUNT}/`,
    MG_LIST_MANGA_YEAR: `/getYearsMangas/${ITEM_PAGE_COUNT}/`,
    MG_LIST_MANGA_TYPE: `/getTypeMangas/${ITEM_PAGE_COUNT}/`,
    MG_LIST_MANGA_ART: `/getArtsMangas/${ITEM_PAGE_COUNT}/`,
    MG_LIST_MANGA_SCAN: `/getScansMangas/${ITEM_PAGE_COUNT}/`,
    MG_LIST_MANGA_ALPHABET: `/getAlphaberMangas/${ITEM_PAGE_COUNT}/`,
    //search
    MG_LIST_MANGA_SEARCH_ITEM: `/searchterm/`,
    MG_LIST_MANGA_SEARCH_PAGE: `/searchforms/${ITEM_PAGE_COUNT}/`,
    //list manga by menu
    MG_LIST_MN_HOT: `/getListMangaHots/${ITEM_POPULAR}/`,
    MG_LIST_MN_COMPLATE: `/getListMangaComplates/${ITEM_POPULAR}/`,
    //sitemap manga all
    MG_SM_MANGA: `/AutoSiteMapDoc/`,
    MG_SM_DETAIL: `/AutoSiteMapDetail/`,
    MG_SM_GENSITE_MAP: `/GenSitemap/`,
    //postcoment
    MG_POST_COMMENT: `/PostComments`,
    MG_GET_COMMENT: `/GetCommentHome/`,
 
    //sitemap manga all
    MG_SM_MANGA_GEN: `/SiteMapDoc/`,
    MG_SM_DETAIL_GEN: `/SiteMapDetail/`,
    MG_SM_GENRES_GEN: `/SiteMapGenres/`,
    MG_SM_AUTHOR_GEN: `/SiteMapAuthor/`,
    MG_SM_ART_GEN: `/SiteMapArt/`,
    MG_SM_SCAN_GEN: `/SiteMapScan/`,
    MG_SM_TYPE_GEN: `/SiteMapType/`,
    MG_SM_YEAR_GEN: `/SiteMapYear/`,
}