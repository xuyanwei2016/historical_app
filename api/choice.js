import {ajax,requestPath} from '../request.js'
//获取广告位图片
export function getarticlecontentbylocationAPI(params){
	return ajax({
		url:`${requestPath.common}getarticlecontentbylocation.do`,
		data:params
	}) 
}
//获取史料文献数据
export function getHistoricalDocumentsAPI(params){
	return ajax({
		url:`${requestPath.common}getHistoricalDocuments.do`,
	}) 
}

/* 获取专题以及图书 */
export function getHistoricalDocuments(params){
	return ajax({
		url:`${requestPath.common}getHistoricalDocuments.html`,
	}) 
}