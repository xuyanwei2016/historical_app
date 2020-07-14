import {ajax,requestPath} from '../request.js'
//获取图书详情页
export function getbookinfoAPI(params){
	return ajax({
		url:`${requestPath.resource}getbookinfo.do`,
		data:params
	}) 
}

//获取目录列表
export function getChapterListAPI(params){
	return ajax({
		url:`${requestPath.resource}getChapterList.do`,
		data:params
	}) 
}
//图书阅读页，根据章节标签获取章节
export function getContentByMarkidAPI(params){
	return ajax({
		url:`${requestPath.resource}getContentByMarkid.do`,
		data:params
	}) 
}

//获取书签列表
export function queryBookMarkByBookidAPI(params){
	return ajax({
		url:`${requestPath.resource}queryBookMarkByBookid.do`,
		data:params
	}) 
}
//获取文章详情
 export function getcontentinfoAPI(params){
 	return ajax({
 		url:`${requestPath.resource}getcontentinfo.do`,
 		data:params
 	}) 
 }
 //加入收藏
 export function addFavoritesAPI(params){
	 return ajax({
		url:`${requestPath.resource}addFavorites.do`,
		data:params
	 }) 
 }
 //加入书签
 export function addBookMarkAPI(params){
 	return ajax({
		url:`${requestPath.resource}addBookMark.do`,
		data:params
 	}) 
 }
 //删除书签
 export function deleteBookMarkAPI(params){
	return ajax({
		url:`${requestPath.resource}deleteBookMark.do`,
		data:params
	}) 
 }

/* 获取资源详情 */
export function getInfoAPI(params){
	return ajax({
		url:`${requestPath.resource}getInfo.do`,
		data:params
	}) 
}
//加入书架
export function addbooktoshelfAPI(params){
	return ajax({
		url:`${requestPath.resource}addbooktoshelf.do`,
		data:params
	}) 
}
// 专题title
export function getSpecialAPI(params) {
	return ajax({
		url:`${requestPath.common}getSpecialTopic.html?`,
		data:params
	}) 
}
// 获取专题二级名称
export function getBookLibraryTwoAPI(params) {
	return ajax({
		url:`${requestPath.common}getSpecialTopicByClassify.html?classifyCode=`+params,
		data:params
	}) 
}
// 获取专题二级图书详情
export function getBookDetailsAPI(params) {
	return ajax({
		url:`${requestPath.common}getBookByClassifyCode.html?classifyCode=${params.classifyCode}&page={params.page}&rows={params.rows}`,
		data:params
	}) 
}