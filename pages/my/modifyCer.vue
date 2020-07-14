<template>
	<view>
		<view class="certification-header">
			<view style="width:40upx;height:38upx;margin-top:50upx;margin-right:138upx;" @tap="returnPre">
				<image src="../../static/images/home/return2.png" ></image>
			</view>	
			<text class="title">实名认证</text>
			<text class="title" @tap="cancel">取消认证</text>
		</view>
		<view class="mark"></view>
		<view class="fixed-box">
			<view class="main">
				<view class="name">
					<text>姓名</text>
					<input type="text" @focus="hidePhoto" maxlength="6" v-model="name" placeholder="请填写真实姓名" placeholder-style="color:#ABABB1;fontSize:30upx;" />
				</view>
				<view class="card">
					<view>
						<text>身份证</text>
					</view>
					<view class="center" @tap="changePhoto">
						<image v-if="hasPhoto" :src="previewPhoto" class="cardPhoto"></image>
						<view v-else class="photo">
							<view class="icon">
								<image src="../../static/images/my/camera.png" mode=""></image>
							</view>
							<text>添加图片</text>
						</view>
					</view>
				</view>
			</view>
			<view class="sure" @tap="sure">
				<text>修改</text>
			</view>
		</view>
		<prompPhoto :showPhoto="showPhoto" :photoOptions="photoOptions"></prompPhoto>
		<alertBox :alertOptions="alertOptions"></alertBox>
		<promptBox :promptObj="promptObj"></promptBox>
	</view>
</template>

<script>
	import { updateRealNameInfoAPI, getRealNameInfoAPI, updateRealNameStatusAPI } from '../../api/info.js'
	export default {
		data() {
			return {
				showPhoto:false,
				photoOptions:{},
				hasPhoto:false,
				previewPhoto:'',
				name:'',
				status:null,
				alertOptions:{},
				filePath:'',
				promptObj:{}
			};
		},
		methods:{
			returnPre(){
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
						_this.showPhoto =false;
						_this.hasPhoto = true;
						_this.previewPhoto = res;
						_this.filePath = res;
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
				updateRealNameInfoAPI({
					filePath:this.previewPhoto,
					formData:{
						'realName':this.name,
						'memberid':this.userId
					},
					name:'file'
				}).then( res => {
					if(JSON.parse(res.data).status==1){
						this.promptObj = {
							isShow:true,
							title:'修改成功！'
						}
						setTimeout(function(){
							uni.navigateTo({
								url:'/pages/my/info'
							})
						},500)
						
					}
				})
			},
			getRealNameInfo(){
				getRealNameInfoAPI({
					memberid:this.userId
				}).then( res => {
					// console.log(res);
					this.hasPhoto = true;
					this.previewPhoto = this.imgURL()+res.data.uniqueValue.realName.img;
					// console.log(this.previewPhoto)
					this.name = res.data.uniqueValue.realName.userName;
				})
			},
			cancel(){
				let that = this;
				this.alertOptions = {
					show:true,
					title:'确定取消认证吗？',
					sure(){
						this.show = false;
						//调用接口修改为未认证
						updateRealNameStatusAPI({
							memberid:that.userId
						}).then( res => {
							// console.log(res)
							if(res.data.status==1){
								uni.navigateTo({
									url:'/pages/my/info'
								})
							}
						})
						uni.navigateTo({
							url:'/pages/my/info'
						})
					},
					cancel(){
						this.show = false;
					}
				}
			},
		},
		onLoad(){
			this.getRealNameInfo()
		},
		computed:{
			userId(){
				return this.$store.getters.userId
			}
		},
// 		onShow(){
// 			this.getRealNameInfo()
// 		}
	}
</script>

<style lang="less" scoped>
.certification-header {
	width:690upx;
	position:fixed;
	top:0;
	height:128upx;
	background:linear-gradient(40deg,#6080CB,#4465B7);
	display:flex;
	justify-content: space-between;
	align-items: center;
	padding:0 30upx;
	z-index:9;
	image{
		width:23upx;
		height:38upx;
		// z-index:1;
		
	}
	.title {
		// display:inline-block;
		// width:100%;
		// margin-left:-23upx;
		// text-align: center;
		font-size:36upx;
		color:#FFFFFF;
	}
	.title{
		margin-top:30upx;
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
	width:100%;
	top:0;
}
.main{
	margin-top:128upx;
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
	background:#3a5697;
	color:#fff;
	font-size:34upx;
	line-height:86upx;
	text-align: center;
	margin-left:30upx;
	margin-top:90upx;
}
</style>
