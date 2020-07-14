import {ajax,requestPath} from '../request.js'
//首页/精选获取广告位图片
export function getadspaceAPI(params){
	return ajax({
		url:`${requestPath.common}getadspace.do`,
		data:params
	}) 
}
//猜你喜欢
export function getyourlikeAPI(params){
	return ajax({
		url:`${requestPath.common}getyourlike.do`,
		data:params
	}) 
}
//获取重点史料
export function getKeyHistoricalMaterialsAPI(params){
	return ajax({
		url:`${requestPath.common}getKeyHistoricalMaterials.do`,
		data:params
	})
}
/* 搜索 */
//http://192.168.2.152:8084/xswh/fg/hdb/solr/searchlist.do
//http://192.168.2.152:8084/xswh/app/search/searchlist.do
export function searchlistAPI(params){
	return ajax({
		url:`${requestPath.search}searchlist.do`,
		
		data:params
	}) 
}
/* 自动补全 tiplist*/
export function tiplistAPI(params){
	return ajax({
		url:`${requestPath.search}tiplist.do`,
		data:params
	}) 
}

//获取推荐图书
export function getbookcontentbylocationAPI(params){
	return ajax({
		url:`${requestPath.common}getbookcontentbylocation.do`,
		data:params
	}) 
}
/* 修改推荐图书 */
export function getBookbylocation(params){
	return ajax({
		url:`${requestPath.common}getBookbylocation.html?location=推荐图书&rows=3`,
		/* data:params */
	}) 
}
/* 获取搜索热词 */
export function gethotsearchwordAPI(params){
	return ajax({
		url:`${requestPath.common}gethotsearchword.do`,
		
		data:params
	}) 
}
/* 获取标签树形数据 */
export function gettagAPI(params){
	return ajax({
		url:`${requestPath.common}gettag.do`,
		
		data:params
	}) 
}

/* 获取出版范围数据 */
export function gettagNewAPI(params){
	return ajax({
		url:`${requestPath.common}gettagNew.do`,
		
		data:params
	}) 
}

/* 获取自定义分类树形数据 */
export function getclassifyAPI(params){
	return ajax({
		url:`${requestPath.common}getclassify.do`,
		
		data:params
	}) 
}