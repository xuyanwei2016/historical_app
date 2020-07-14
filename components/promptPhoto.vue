<template>
	<view>
		<view class="photo" :class="{photoInit:showPhoto}">
			<view class="mark" @tap="hidePhoto"></view>
			<view class="main">
				<view class="item" @tap="albumPhoto">
					<text>从手机相册选择</text>
				</view>
				<view class="item" @tap="cameraPhoto">
					<text>拍照</text>
				</view>
				<view class="item cancel" @tap="hidePhoto">
					<text>取消</text>
				</view>
			</view>	
		</view>
	</view>
</template>

<script>
	export default {
		name:"promptPhoto",
		data() {
			return {
				
			};
		},
		props:{
			showPhoto:{
				type:Boolean
			},
			photoOptions:{
				type:Object
			}
		},
		methods:{
			hidePhoto(){
				if(typeof(this.photoOptions.change) == 'function'){
					this.photoOptions.change();
				}
				this.$emit('closeFn');
			},
			//从相册选择图片
			albumPhoto(){
				let self=this;
				/* this.uploadPhoto('album') */
				/* uni.chooseImage({
					count:1,
					sizeType:['compressed'],
					sourceType:['album'],
					success:(res)=>{
						// console.log(res.tempFilePaths[0],res.tempFilePaths)
						res.tempFilePaths && this.photoOptions.success(res.tempFilePaths[0])
					}
				}) */
				plus.gallery.pick(function(path){
				        var name = path.substring(path.lastIndexOf("/")+1); 
				           self.compressImage(path,name);//图片压缩
				    }, function(e){
				    }, {filter:'image'});
			},	
			
			//点击拍照
			cameraPhoto(){
				var self=this;
				var cmr = plus.camera.getCamera();
				       cmr.captureImage(function(p) {    
				           plus.io.resolveLocalFileSystemURL(p, function(entry) {    
				               self.compressImage(entry.toLocalURL(),entry.name);    
				           }, function(e) {    
				               plus.nativeUI.toast("读取拍照文件错误：" + e.message);    
				           });    
				       }, function(e) {    
				       }, {    
				           filter: 'image'   
				       }); 
				
				
				/* this.uploadPhoto('camera') */
				/* uni.chooseImage({
					count:1,
					sizeType:['compressed'],
					sourceType:['camera'],
					success:(res)=>{ */
						/* plus.zip.compressImage({
									src:res.tempFilePaths[0],
									dst:true,
									quality:20
								},
								function() {
									res.tempFilePaths && this.photoOptions.success(res.tempFilePaths[0]);
									alert("Compress success!");
								},function(error) {
									alert("Compress error!");
							}); */
							
						// console.log(res.tempFilePaths[0],res.tempFilePaths)
						//res.tempFilePaths && this.photoOptions.success(res.tempFilePaths[0])
					/* }
				}) */
			},
			uploadPhoto(type){
				uni.chooseImage({
					count:1,
					sizeType:['compressed'],
					sourceType:['camera'],
					success:(res)=>{
						// console.log(res.tempFilePaths[0],res.tempFilePaths)
						res.tempFilePaths && this.photoOptions.success(res.tempFilePaths[0])
					}
				})
			},
			/* 压缩图片 */
			compressImage(url,filename){    
			let self=this;
			       var name="_doc/upload/"+filename;
			var pages = getCurrentPages();  
			var page = (pages[pages.length - 1]).route;  
			console.log('获取当前路由',page)
			let  params={
				src:url,//src: (String 类型 )压缩转换原始图片的路径
				               dst:name,//压缩转换目标图片的路径    
				               //quality: (Number 类型 )压缩图片的质量.取值范围为1-100    
				               overwrite:true,//overwrite: (Boolean 类型 )覆盖生成新文件
			};
			if(page=='pages/my/info'){
				params.width='150';
				/* params.height='150'; */
				params.quality=60;
			}else{
				params.width='400';
				/* params.height='400'; */
				params.quality=70;
			}
			       plus.zip.compressImage(params,    
			           function(zip) {  
			               //页面显示图片
			console.log('压缩图片',zip.target)
							self.$emit('sFn',zip.target)
			           },function(error) {    
			               plus.nativeUI.toast("压缩图片失败，请稍候再试");    
			       });    
			   },

		},
		computed:{
			userId(){
				return this.$store.getters.userId
			}
		},
	}
</script>

<style lang="less" scoped>
.photo {
	position:fixed;
	bottom:0;
	width:750upx;
	height:0;
	.mark{
		width:750upx;
		height:100%;
		// z-index:9999;
		background:rgba(0,0,0,0.2);		
	}
	.main{
		width:100%;
		position:fixed;
		transition:all .3s linear;
		bottom:-1;
		height:0;
		.item{
			background:#fff;
			margin-bottom:10upx;
			text-align: center;
			height:100upx;
			line-height:100upx;
			color:#36373B;
			font-size:32upx;
		}
		.cancel{
			margin-bottom:0;
		}
	}
}
.photoInit{
	height:100%;
	.main{
		height:320upx;
		bottom:0;
	}
}
</style>
