<template>
	<view>
		<view class="certification-header">
			<view style="width:40upx;height:38upx;padding-top:50upx;" @tap="returnPre">
				<image src="../../static/images/home/return2.png" ></image>
			</view>	
			<text class="title">实名认证</text>
			<view style="width: 40upx;"></view>
		</view>
		<view class="mark"></view>
		<view class="fixed-box">
			<view class="main">
				<view class="name">
					<text>姓名</text>
					<input type="text" @focus="hidePhoto" @input="changeSureBtn" maxlength="6" v-model="name" placeholder="请填写真实姓名" placeholder-style="color:#ABABB1;fontSize:30upx;" />
				</view>
				<view class="card">
					<view>
						<text>身份证</text>
					</view>
					<view class="center" @tap="changePhoto" >
						<image v-if="previewPhoto&&previewPhoto!=''" :src="previewPhoto" class="cardPhoto"></image>
						<view v-else class="photo">
							<view class="icon">
								<image src="../../static/images/my/camera.png" mode=""></image>
							</view>
							<text>添加图片</text>
						</view>
					</view>
				</view>
			</view>
			<view class="sure" @tap="sure" :class="{modifyBtn:isOk && previewPhoto&&previewPhoto!=''}">
				<text>确定</text>
			</view>
		</view>
		<prompPhoto :showPhoto="showPhoto" :photoOptions="photoOptions"  @sFn="fFn"  @closeFn="closeFn"></prompPhoto>
	</view>
</template>

<script>
	import { saveRealNameAPI } from '../../api/info.js'
	export default {
		data() {
			return {
				showPhoto:false,
				photoOptions:{},
				hasPhoto:false,
				previewPhoto:'',
				name:'',
				status:null,
				isOk:false,
				imgUrl:'',
			};
		},
		methods:{
			returnPre(){
				var pages = getCurrentPages();
				if(pages.length==1){
					history.back();
				}
				uni.navigateBack({
					delta:1
				})
			},
			changePhoto(){
				this.showPhoto = true;
				let _this = this;
				this.photoOptions = {
					change(){
						_this.showPhoto =false;
					},
					success(res){
						
						
					}
				}
			},
			hidePhoto(){
				this.showPhoto = false;
			},
			sure(){
				if(this.name.replace(/\s*/,'').length<=0 || !this.previewPhoto){
					uni.showToast({
						title:'请填写完整后提交',
						icon:'none'
					})
					return ;
				}
				saveRealNameAPI({
					filePath:this.imgUrl,
					formData:{
						'realName':this.name,
						'memberid':this.userId
					},
					name:'pic'
				}).then( res => {
					if(JSON.parse(res.data).status==1){
						uni.navigateTo({
							url:'/pages/my/info'
						})
					}
				})
			},
			fFn(imgUrl){
				let  self=this;
				self.showPics(imgUrl);
				self.imgUrl=imgUrl;
				self.showPhoto =false;
				self.hasPhoto = true;
				/* saveRealNameAPI({
					filePath:imgUrl,
					formData:{
						'realName':this.name,
						'memberid':this.userId
					},
				}).then( res => {
					self.showPhoto =false;
					self.hasPhoto = true;
					if(JSON.parse(res.data).status==1){
						uni.navigateTo({
							url:'/pages/my/info'
						})
					} */
					/* self.showPhoto = false;
					self.prePhoto = true;
					uni.showToast({
						title:'修改成功！',
						icon:'none'
					}) */
				/* }) */
				
			},
			closeFn(){
				this.showPhoto = false;
			},
			/* 展示图片 */
			showPics(url){ 
			let  self=this;
			     //根据路径读取到文件   
			       plus.io.resolveLocalFileSystemURL(url,function(entry){  
			           entry.file( function(file){
			               var fileReader = new plus.io.FileReader();  
			               fileReader.readAsDataURL(file);  
			               fileReader.onloadend = function(e) {  
			                    self.previewPhoto= e.target.result.toString();
			console.log(2222,self.previewPhoto) 
			               }  
			           });  
			      });   
			   },
			changeSureBtn(e){
				if(e.detail.value.replace(/\s*/,'').length>0){
					this.isOk = true;
				}else {
					this.isOk = false;
				}
			}
		},
		
		
		computed:{
			userId(){
				return this.$store.getters.userId;
			}
		}
	}
</script>

<style lang="less" scoped>
.certification-header {
	width:690upx;
	position:fixed;
	top:0;
	height:150upx;
	background:linear-gradient(40deg,#6080CB,#4465B7);
	display:flex;
	justify-content: flex-start;
	align-items: center;
	padding:0 30upx;
	z-index:9;
	image{
		width:23upx;
		height:38upx;
		z-index:1;
	}
	.title {
		display:inline-block;
		width:100%;
		/* margin-left:-23upx; */
		text-align: center;
		font-size:36upx;
		color:#FFFFFF;
	}
	.title{
		margin-top:50upx;
	}
}
.mark{
	width:100%;
	height:100%;
	position:fixed;
	z-index:-4;
	background:#f5f5f4;
}
.fixed-box{
	position:fixed;
	top:0;
	width:100%;
}
.main{
	margin-top:150upx;
	background:#fff;
	padding:0 30upx;
	.name{
		padding:30upx 0;
		border-bottom:1upx solid #E0E1E8;
		display:flex;
		justify-content: space-between;
		align-items: center;
		input{
			width:206upx;
			text-align: left;
		}
	}
	.name,.card{
		font-size:30upx;
		color:#3D3D3D;
	}
	.card{
		padding:30upx 0 60upx;
		.center{
			display:flex;
			justify-content: center;
			margin-top:6upx;
			.cardPhoto{
				width:320upx;
				height:238upx;
			}
			.photo{
				width:320upx;
				height:238upx;
				border:2upx solid #E0E1E8;
				color:#666666;
				font-size:28upx;
				display:flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.icon{
					width:74upx;
					height:70upx;
					margin-bottom:20upx;
					margin-top:60upx;
					image{
						width:74upx;
						height:70upx;
					}
				}
			}
		}
	}
}
.sure{
	width:690upx;
	height:86upx;
	background:#CCCCCC;
	color:#fff;
	font-size:34upx;
	line-height:86upx;
	text-align: center;
	margin-left:30upx;
	margin-top:90upx;
}
.modifyBtn{
	background:#3a5697;
}
</style>
