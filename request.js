import { ApiUrl } from './env.js'
const requestPath = {
	// 首页/精选
	common:'app/',
	// 资源
	resource:'app/resource/',
	// 搜索
	search:'app/search/',
	searchPC:'fg/hdb/solr/',
	//评论
	comment:'app/comments/',

	//购物车
	cart:'/app/shopcart/',

	//个人中心
	personage:'app/personage/',
	//个人中心
	login:'app/login/'
}
const ajax = (opt) => {
	opt = opt || {}
	opt.url = opt.url || ''
	opt.method = opt.method || 'GET';
    opt.header = opt.header || {
        "Content-Type": "application/json"
    };
    opt.success = opt.success || function () {}
	return new Promise((resolve,reject) => {
		uni.request({
			url:ApiUrl+opt.url,
			data: opt.data,
			method: opt.method,
			header: opt.header,
			dataType: 'json',
			success: function (res) {
				// opt.success(res);
				resolve(res)
			},
			fail: function (res) {
				reject(
				/* uni.showToast({
					title: '请稍后重试',
					icon:'none',
					duration:12000,
				})*/) 
				
			}
		})
	})	
}
const upload = (opt) => {
	opt = opt || {}
	opt.url = opt.url || ''
	opt.filePath = opt.filePath || null;//要上传文件资源的路径。
	opt.name = opt.name || null;
//     opt.header = opt.header || {
//         "Content-Type": "multipart/form-data"
//     };
    opt.success = opt.success || function () {}
	return new Promise((resolve,reject) => {
		uni.uploadFile({
			url:ApiUrl+opt.url,
			filePath: opt.filePath,
			name:opt.name,
			formData:opt.formData,
			success: function (res) {
				resolve(res)
			},
			fail: function (res) {
				reject(
				uni.showToast({
					title: '请稍后重试',
					icon:'none',
					duration:12000,
				}))
				
			}
		})
	})	
}
export  {
    ajax,
	requestPath,
	upload,
}