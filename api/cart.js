import {ajax,requestPath} from '../request.js'
//加入购物车
export function addShopCarAPI(params){
	return ajax({
		url:`${requestPath.cart}addShopCar.do`,
		data:params
	}) 
}
//获取购物车列表
export function getShopCarAPI(params){
	return ajax({
		url:`${requestPath.cart}getShopCar.do`,
		data:params
	}) 
}
//购物车页面确定订单
export function confirmOrderAPI(params){
	return ajax({
		url:`${requestPath.cart}confirmOrder.do`,
		data:params
	}) 
}
//删除购物车中商品
 export function deleteShopAPI(params){
 	return ajax({
 		url:`${requestPath.cart}deleteShop.do`,
 		data:params
 	}) 
 }
 //提交订单
 export function addOrderAPI(params){
	 return ajax({
		url:`${requestPath.cart}addOrder.do`,
		data:params
	 }) 
 }
 //
 export function saveFavoritesAPI(params){
 	return ajax({
 	url:`${requestPath.cart}saveFavorites.do`,
 	data:params
 	}) 
 }
 //批量加入收藏
 export function saveBatchFavoritesAPI(params){
 	return ajax({
 		url:`${requestPath.cart}saveBatchFavorites.do`,
 		data:params,
 		method:'POST',
 		header:{
 			'Content-Type':'application/x-www-form-urlencoded'
 		}
 	}) 
 }
 //确认支付
 export function paymentAPI(params){
 	return ajax({
 		url:`${requestPath.cart}payment.do`,
 		data:params				
 	}) 
 }
 