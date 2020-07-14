import {ajax,requestPath,upload} from '../request.js'
//获取账户余额
export function getaccountbalanceAPI(params){
	return ajax({
		url:`${requestPath.personage}getaccountbalance.do`,
		data:params
	}) 
}
//批量删除我的收藏
export function deleteFavoritesAPI(params){
	return ajax({
		url:`${requestPath.personage}deleteFavorites.do`,
		data:params
	}) 
}
//获取我的评论
export function getCommentsAPI(params){
	return ajax({
		url:`${requestPath.personage}getComments.do`,
		data:params
	}) 
}
//获取我的订阅列表
export function getMySubscriptionsAPI(params){
	return ajax({
		url:`${requestPath.personage}getMySubscriptions.do`,
		data:params
	}) 
}
//修改我的订阅为已读
export function updatemessagestatusAPI(params){
	return ajax({
		url:`${requestPath.personage}updatemessagestatus.do`,
		data:params
	}) 
}
//意见反馈
export function feedBackAPI(params){
	return ajax({
		url:`${requestPath.personage}saveSuggestionFeedback.do`,
		data:params,
		method:'POST',
		header:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	}) 
}
//获取用户详细信息
export function getinfoAPI(params){
	return ajax({
		url:`${requestPath.personage}getinfo.do`,
		data:params,
		method:'POST',
		header:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	}) 
}
//获取登录机构用户机构信息
export function getOrgInfoAPI(params){
	return ajax({
		url:`${requestPath.personage}getOrgInfo.do`,
		data:params,
	}) 
}
//获取我的账户余额及消费记录列表
export function getOrdersListAPI(params){
	return ajax({
		url:`${requestPath.personage}getOrdersList.do`,
		data:params				
	}) 
}
//获取我的消息列表
export function getMyMessageAPI(params){
	return ajax({
		url:`${requestPath.personage}getMyMessage.do`,
		data:params				
	}) 
}
//获取我的消息(无分页)
export function getMessageAPI(params){
	return ajax({
		url:`${requestPath.personage}getMessage.do`,
		data:params				
	}) 
}
//获取消息详情
export function getMyMessageDetailAPI(params){
	return ajax({
		url:`${requestPath.personage}getMyMessageDetail.do`,
		data:params				
	}) 
}

//修改我的消息为已读
export function updateNewStatusAPI(params){
	return ajax({
		url:`${requestPath.personage}updateNewStatus.do`,
		data:params				
	}) 
}
//获取我的足迹列表
export function getFootmarkAPI(params){
	return ajax({
		url:`${requestPath.personage}getFootmark.do`,
		data:params				
	}) 
}
//                                               订单

//获取我的订单
export function getOrdersPageAPI(params){
	return ajax({
		url:`${requestPath.personage}getOrdersPage.do`,
		data:params				
	}) 
}
//获取订单详情
export function getOrdersDetailsAPI(params){
	return ajax({
		url:`${requestPath.personage}getOrdersDetails.do`,
		data:params				
	}) 
}
//删除订单
export function delOrderAPI(params){
	return ajax({
		url:`${requestPath.personage}delOrder.do`,
		data:params				
	}) 
}
//取消订单
export function updateOrderStatusAPI(params){
	return ajax({
		url:`${requestPath.personage}updateOrderStatus.do`,
		data:params				
	}) 
}

//批量删除我的足迹
export function deleteFootmarkAPI(params){
	return ajax({
		url:`${requestPath.personage}deleteFootmark.do`,
		data:params				
	}) 
}

//添加图书等为我的足迹
export function saveFootmarkAPI(params){
	return ajax({
		url:`${requestPath.personage}saveFootmark.do`,
		data:params,
		method:'POST',
		header:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	}) 
}

//上传头像
export function updateImgAPI(params){
	return upload({
		url:`${requestPath.personage}updateImg.do`,
		filePath:params.filePath,
		formData:params.formData,
		name:params.name
	}) 
}
//实名认证
export function saveRealNameAPI(params){
	return upload({
		url:`${requestPath.personage}saveRealName.do`,
		filePath:params.filePath,
		formData:params.formData,
		name:params.name
	}) 
}
//获取我的实名认证消息
export function getRealNameInfoAPI(params){
	return ajax({
		url:`${requestPath.personage}getRealNameInfo.do`,
		data:params
	}) 
}
//取消认证
export function updateRealNameStatusAPI(params){
	return ajax({
		url:`${requestPath.personage}updateRealNameStatus.do`,
		data:params
	}) 
}
//修改实名认证
export function updateRealNameInfoAPI(params){
	return upload({
		url:`${requestPath.personage}updateRealNameInfo.do`,
		filePath:params.filePath,
		formData:params.formData,
		name:params.name
	}) 
}
//新建书架
export function saveBookShelfNameAPI(params){
	return ajax({
		url:`${requestPath.personage}saveBookShelfName.do`,
		data:params
	}) 
}
//获取我的书架列表
export function selectAllBookShelfListAPI(params){
	return ajax({
		url:`${requestPath.personage}findBookShelfList.do`,
		data:params
	}) 
}
//余额充值
 export function updateBalanceAPI(params){
	 return ajax({
		url:`${requestPath.personage}updateBalance.do`,
		data:params				
	 }) 
 }