import { ADDPHOTO,ADDSCRAPBOOK } from "../constant";
export const addPhoto = (scrapbookName,photoObj) => ({type:ADDPHOTO,scrapbookName:scrapbookName,data:photoObj})
export const addScrapbook=(scrapbookName)=>({type:ADDSCRAPBOOK,data:scrapbookName})