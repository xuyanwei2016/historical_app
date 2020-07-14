import {ajax,requestPath} from '../request.js'
//登录
export function loginAPI(params){
	return ajax({
		url:`${requestPath.login}login.do`,
		method:'get',
		data:params
	}) 
}
//手机验证码登录
export function loginByPhoneAPI(params){
	return ajax({
		url:`${requestPath.login}loginByPhone.do`,
		method:'get',
		data:params
	}) 
}

/* 注册 */
export function registerAPI(params){
	return ajax({
		url:`${requestPath.login}register.do`,
		method:'get',
		data:params
	}) 
}
/* 忘记密码 */
export function updatePwdAPI(params){
	return ajax({
		url:`${requestPath.login}updatePwd.do`,
		method:'get',
		data:params
	}) 
}
/* 检查手机号跟验证码 */
export function checkPhoneAndCodeAPI(params){
	return ajax({
		url:`${requestPath.login}checkPhoneAndCode.do`,
		method:'get',
		data:params
	}) 
}
/* 绑定手机号 */
export function savePhoneAPI(params){
	return ajax({
		url:`${requestPath.login}savePhone.do`,
		method:'get',
		data:params
	}) 
}
