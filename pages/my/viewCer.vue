<template>
	<view>
		<view class="certification-header">
			<view style="width:40upx;height:38upx;margin-top:50upx;margin-right:138upx;" @tap="returnPre">
				<image src="../../static/images/home/return2.png" ></image>
			</view>
			<text class="title">实名认证</text>
		</view>
		<view class="mark"></view>
		<view class="main">
			<view class="name">
				<text>姓名</text>
				<text>{{name}}</text>
			</view>
			<view class="card">
				<view>
					<text>身份证</text>
				</view>
				<view class="center">
					<image :src="previewPhoto" class="cardPhoto"></image>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {  getRealNameInfoAPI } from '../../api/info.js'
	export default {
		data() {
			return {
				previewPhoto:'',
				name:'',
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
			getRealNameInfo(){
				getRealNameInfoAPI({
					memberid:this.userId
				}).then( res => {
					console.log(res);
					this.previewPhoto = this.imgURL()+res.data.uniqueValue.realName.img;
					this.name = res.data.uniqueValue.realName.userName;
				})
			}
		},
		onLoad(){
			this.getRealNameInfo()
		},
		computed:{
			userId(){
				return this.$store.getters.userId;
			}
		},
		/* onShow(){
			this.getRealNameInfo()
		} */
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
		margin-left:-170upx;
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
.main{
	margin-top:150upx;
	background:#fff;
	// padding:0 30upx;
	position:fixed;
	top:0;
	width:100%;
	.name{
		padding:30upx 30upx;
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
		padding:30upx 30upx 60upx;
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
</style>
