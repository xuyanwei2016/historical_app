import {ajax,requestPath} from '../request.js'
//加入购物车
export function sendcodeAPI(params){
	return ajax({
		url:`${requestPath.personage}sendcode.do`,
		method:'get',
		data:params
	}) 
}
// 我的购买列表
export function getMyPurchaseAPI(params){
	return ajax({
		url:`${requestPath.personage}getMyPurchase.do`,
		method:'get',
		data:params
	}) 
}
//统计我的购买每个资源分类下的总数
export function getMyPurchaseCountAPI(params){
	return ajax({
		url:`${requestPath.personage}getMyPurchaseCount.do`,
		method:'get',
		data:params
	}) 
}
/* 获取我的收藏列表 */
export function getFavoritesPageAPI(params){
	return ajax({
		url:`${requestPath.personage}getFavoritesPage.do`,
		method:'get',
		data:params
	}) 
}
/* 获取我的收藏总数 */
export function getFavoritesCountAPI(params){
	return ajax({
		url:`${requestPath.personage}getFavoritesCount.do`,
		method:'get',
		data:params
	}) 
}
/* 批量删除我的收藏 */
export function deleteFavoritesAPI(params){
	return ajax({
		url:`${requestPath.personage}deleteFavorites.do`,
		method:'get',
		data:params
	}) 
}
/* 获取我的书架列表 */
export function selectAllBookShelfListAPI(params){
	return ajax({
		url:`${requestPath.personage}findBookShelfList.do`,
		method:'get',
		data:params
	}) 
}
/* 新建书架 */
export function saveBookShelfNameAPI(params){
	return ajax({
		url:`${requestPath.personage}saveBookShelfName.do`,
		method:'get',
		data:params
	}) 
}
// 修改书架名称
export function updateBookShelfNameAPI(params){
	return ajax({
		url:`${requestPath.personage}updateBookShelfName.do`,
		method:'get',
		data:params
	}) 
}
/* 删除书架 */
export function deleteBookShelfNameAPI(params){
	return ajax({
		url:`${requestPath.personage}deleteBookShelfName.do`,
		method:'get',
		data:params
	}) 
}
/* 获取书架下的图书信息 */
export function findBookShelfAPI(params){
	return ajax({
		url:`${requestPath.personage}findBookShelf.do`,
		method:'get',
		data:params
	}) 
}
/* 删除图书 */
export function deleteBookAPI(params){
	return ajax({
		url:`${requestPath.personage}deleteBook.do`,
		method:'get',
		data:params
	}) 
}
/* 修改密码 */
export function changePwdAPI(params){
	return ajax({
		url:`${requestPath.personage}changePwd.do`,
		method:'get',
		data:params
	}) 
}
/* 修改手机号 */
export function updatePhoneBySecureAPI(params){
	return ajax({
		url:`${requestPath.personage}updatePhoneBySecure.do`,
		method:'get',
		data:params
	}) 
}
