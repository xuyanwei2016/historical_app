<template>
	<view>
		<view class="org-header">
			<view class="update-returnPre" @tap="returnPre">
				<image src="../../static/images/home/return2.png"></image>
			</view>
			
			<text class="title">机构信息</text>
		</view>
		<view class="mark"></view>
		<view class="main">
			<view class="item">
				<text class="left">机构名称</text>
				<text class="right">{{orgMsg.orgname}}</text>
			</view>
			<view class="item">
				<text class="left">使用期限</text>
				<text class="right">{{orgMsg.startDate}}-{{orgMsg.endDate}}</text>
			</view>
			<view class="item">
				<text class="left">版本</text>
				<text class="right">{{version}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { getOrgInfoAPI } from '../../api/info.js'
	export default {
		data() {
			return {
				orgMsg:{},
				version:''
			};
		},
		methods:{
			getOrgInfo(){
				getOrgInfoAPI({
					userid:this.userId
				}).then( res => {
					console.log(res);
					this.orgMsg = res.data.uniqueValue;
					this.orgMsg.startDate = this.orgMsg.startDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g,'$1年$2月$3日');					
					this.orgMsg.endDate = this.orgMsg.endDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g,'$1年$2月$3日');
					this.version = this.orgMsg.ip == 1 ? '互联网' :( this.orgMsg.ip == 2 ? '局域网': '互联网 局域网')
				})
			},
			returnPre(){
				var pages = getCurrentPages();
				if(pages.length==1){
					history.back();
				}
				uni.navigateBack({
					delta: 1
				});
			},
		},
		onLoad() {
			this.getOrgInfo()
		},
		computed:{
			userId(){
				return this.$store.getters.userId;
			}
		}
	}
</script>

<style lang="less" scoped>
.org-header {
	width:690upx;
	position:fixed;
	top:0;
	height:128upx;
	background:linear-gradient(40deg,#6080CB,#4465B7);
	display:flex;
	justify-content: flex-start;
	align-items: center;
	padding:0 30upx;
	//z-index:9;
	.update-returnPre{
		width:40upx;
		height:38upx;
		display: block;
		margin-top: 48upx;
		image{
		width:23upx;
		height:38upx;
		z-index:1;
		margin-top:0upx;
		margin-left: 10upx;
	}
	}
	.title {
		display:inline-block;
		width:100%;
		margin-left:-23upx;
		text-align: center;
		font-size:36upx;
		color:#FFFFFF;
	}
	image,.title{
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
.main{
	background:#fff;
	margin-top:128upx;
	padding:0 30upx;
	.item{
		padding:20upx 0;
		display:flex;
		justify-content: space-between;
		align-items: center;
		font-size:30upx;
		border-top:1upx solid #E0E1E8;
		.left{
			color:#3D3D3D;			
		}
		.right{
			color:#666666;
		}
	}
	.item:first-child{
		border-top:none;
	}
}
</style>
