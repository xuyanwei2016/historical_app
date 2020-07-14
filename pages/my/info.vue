<template>
	<view>
		<view class="info-header">
			<view style="width:40upx;height:38upx;padding-top:50upx;" @tap="returnPre">
				<image src="../../static/images/home/return2.png" ></image>
			</view>
			<text class="title">我的</text>
		</view>
		<view class="mark"></view>
		<view class="info-box">
			<view class="info-msg">
				<view class="item">
					<text class="left">用户名</text>
					<text class="right">{{info.memberName || info.uname}}</text>
				</view>
				<navigator class="item" v-if="info.orgcode" url="orgMsg">
					<text class="left">机构信息</text>
					<image class="more" src="../../static/images/home/return1.png" mode=""></image>
				</navigator>
				<view class="item" @tap="changePhoto">
					<text class="left">头像</text>
					<view class="right2">
						<image v-if="prePhoto" class="head" :src="previewPhoto"></image>
						<image v-if="info.headPortrait && !prePhoto" class="head" :src="info.headPortrait"></image>
						<image v-if="!info.headPortrait && !prePhoto" class="head" src="../../static/images/my/header.png"></image>
						<image class="more" src="../../static/images/home/return1.png"></image>
					</view>				
				</view>
				<navigator class="item" v-if="info.phone" url="change?type=phone">
					<text class="left">手机号</text>
					<view class="right3">
						<text class="phone">{{info.phone}}</text>
						<image class="more" src="../../static/images/home/return1.png"></image>
					</view>				
				</navigator>
				<view class="item" @tap="toCertification">
					<text class="left">实名认证</text>
					<view class="right3">
						<text class="viewinfo">{{cerStatus[info.realStatus]}}</text>
						<image class="more" src="../../static/images/home/return1.png"></image>
					</view>				
				</view>
				<navigator class="item" url="change?type=pwd">
					<text class="left">修改密码</text>
					<image class="more" src="../../static/images/home/return1.png"></image>
				</navigator>
			</view>
			<view class="logout" @tap="logout">
				<text>退出登录</text>
			</view>
		</view>
		<!-- <view class="photo" :class="{photoInit:showPhoto}">
			<view class="mark" @tap="showPhoto = false"></view>
			<view class="main">
				<view class="item">
					<text>从手机相册选择</text>
				</view>
				<view class="item">
					<text>拍照</text>
				</view>
				<view class="item cancel">
					<text>取消</text>
				</view>
			</view>	
		</view> -->
		<prompPhoto :showPhoto="showPhoto" :photoOptions="photoOptions" @sFn="fFn" @closeFn="closeFn"></prompPhoto>
	</view>
</template>

<script>
	import { getinfoAPI,updateImgAPI } from '../../api/info.js'
	export default {
		data() {
			return {
				info:{},
				showPhoto:false,
				photoOptions:{},
				prePhoto:false,
				previewPhoto:'',
				cerStatus:['未认证','认证中','已认证','认证失败']
			};
		},
		methods:{
			returnPre(){
				uni.switchTab({
					url:'my'
				})
			},
			getInfo(){
				getinfoAPI({
					userid:this.userId
				}).then( res => {
					this.info = res.data.uniqueValue;
					this.info.headPortrait = this.info.headPortrait ? this.imgURL()+this.info.headPortrait : null;
					uni.stopPullDownRefresh()
				})
			},
			toCertification(){
				if(this.info.realStatus==0){//未认证 
					uni.navigateTo({
						url:'certification'
					})
				}else if(this.info.realStatus == 3){//认证失败
					uni.navigateTo({
						url:'/pages/my/modifyCer' 
					})
				}else {
					uni.navigateTo({
						url:'/pages/my/viewCer'
					})
				}
				
			},
			changePhoto(){
				console.log('上传图片',this.photoOptions)
				let _this = this;
				this.showPhoto = true;
				this.photoOptions = {
					//隐藏弹出框
					change(){
						console.log('取消按钮')
						_this.showPhoto = false;
					},
					// 图片上传成功
					success(res){
						console.log('上传成功',res)
						/* _this.getImg(res); */
						// this.$refs.userHead.src=res;
						/* _this.showPhoto = false;
						_this.prePhoto = true;
						_this.previewPhoto = res;
						updateImgAPI({
							filePath:res,
							formData:{
								'memberid':_this.userId,
							},
							name:'pic'
						}).then( resImg => {
							console.log(resImg)
						}) */
					}
				}
			},
			fFn(imgUrl){
				let  self=this;
				self.showPics(imgUrl);
				self.showPhoto = false;
				self.prePhoto = true;
				updateImgAPI({
					filePath:imgUrl,
					formData:{
						'memberid':self.userId,
					},
					name:'pic'
				}).then( resImg => {
					
					uni.showToast({
						title:'修改成功！',
						icon:'none'
					})
				}) 
				
			},
			closeFn(){
				this.showPhoto = false;
				console.log('关闭');
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
			               }  
			           });  
			      });   
			   },
			
			logout(){
				this.$store.commit('logout');
				uni.removeStorage({
					key:'appToken',
					success:()=>{
						uni.switchTab({
							url:'/pages/my/my'
						})
					}
				});
			}
		},
		onLoad() {
			this.getInfo()
		},
		onShow(){
			this.getInfo()
		},
		computed:{
			isLogin(){
				return this.$store.getters.isLogin
			},
			userId(){
				return this.$store.getters.userId
			}
		},
		onPullDownRefresh() {
			this.getInfo()
		}
	}
</script>

<style lang="less" scoped>
.info-header {
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
		// margin-top:30upx;
	}
	.title {
		display:inline-block;
		width:100%;
		margin-left:-23upx;
		text-align: center;
		font-size:36upx;
		color:#FFFFFF;
		margin-top:50upx;
	}
}
.info-box{
	position:fixed;
	top:0;
	width:100%;
}
.info-msg{
	margin-top:150upx;
	background:#fff;
	padding:0 30upx;
	.item{
		display:flex;
		justify-content: space-between;
		align-items: center;
		padding:20upx 0;
		border-top:1upx solid #E0E1E8;
		.left{
			color:#3D3D3D;
			font-size:34upx;
		}
		.more{
			width:16upx;
			height:26upx;
			margin-left:30upx;
		}	
		.right2{
			height:126upx;
		}
		.right2,.right3{
			// width:126upx;			
			display:flex;
			align-items:center;
			.head{
				width:126upx;
				height:126upx;
				border-radius:50%;
				box-shadow:1upx 1upx 14upx 0upx rgba(58,86,151,0.3);
			}		
			.phone{
				color:#666666;
				font-size:30upx;
			}
			.viewinfo{
				color:#ABABB1;
				font-size:30upx; 
			}
		}
		.right{
			color:#666666;
			font-size:30upx;			
		}
	}
	.item:first-child{
		border-top:none;
	}
}
.mark{
	width:100%;
	height:100%;
	position:fixed;
	z-index:-4;
	background:#f5f5f4;
}
.logout{
	background:#fff;
	width:100%;
	height:86upx;
	line-height:86upx;
	text-align: center;
	font-size:34upx;
	color:#3D3D3D;
	margin-top:210upx;

}
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
