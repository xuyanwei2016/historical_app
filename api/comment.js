import {ajax,requestPath} from '../request.js'
//获取图书，文章，资源详情页获得评论列表
export function getCommentsListAPI(params){
	return ajax({
		url:`${requestPath.comment}getCommentsList.do`,
		data:params
	}) 
}
//添加评论
export function saveCommentAPI(params){
	return ajax({
		url:`${requestPath.personage}saveComment.do`,
		data:params,
		method:'POST',
		header:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	}) 
}