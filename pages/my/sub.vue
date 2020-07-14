<template>
	<view>
		<view class="sub-header">
			<view style="width:40upx;height:38upx;margin-top:50upx;" @tap="returnPre">
				<image src="../../static/images/home/return2.png" ></image>
			</view>	
			<text class="title">我的订阅</text>
		</view>
		<view class="mark"></view>
		<view class="sub-main">
			<view class="sub-item" v-for="(item,index) in subList" :key="index" @tap="toDetails(item)" v-if="subList.length>0">
				<view class="sub-image">
					<image src="../../static/images/my/sub.png"></image>
					<image v-if="item.isRead==0" class="no-read" src="../../static/images/my/icon.png" mode=""></image>
				</view>				
				<view class="sub-con">
					<text>您的订阅有新增资源“{{item.title}}”请点击查看>></text>
				</view>
			</view>
		</view>
		<view class="empty" v-if="subList.length<=0">
			<image src="../../static/images/empty/other.png" ></image>
			<text>什么也没有哦~</text>
		</view>
		<view style="height: 60upx; width:100%;text-align: center;color: #555555;" v-if="subList.length>rows">
			{{loadingType==0?loadingText.contentdown:loadingType==1?loadingText.contentrefresh:loadingText.contentnomore}}
		</view>
	</view>
</template>

<script>
	import { getMySubscriptionsAPI, updatemessagestatusAPI } from '../../api/info.js'
	export default {
		data() {
			return {
				subList:[],
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loadingType: 0,
				dataTotal: 0,
				page: 1,
				rows:8,
				pullDown: false,
			};
		},
		methods:{
			getSubList(){
				getMySubscriptionsAPI({
					orgId:this.userId,
					page:this.page,
					rows:this.rows
				}).then( res => {
					this.dataTotal = res.data.page.total;
					if(this.pullDown){
						this.subList = res.data.page.rows;
					}else {
						if(this.dataTotal>0){
							this.subList.push(...res.data.page.rows);
							if(this.dataTotal > this.subList.length){
								this.loadingType = 0;
							}else {
								this.loadingType = 2;
							}
						}else {
							this.subList = [];
							this.loadingType = null;
						}
					}
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
			//跳转到详情页
			toDetails(item){
				let path='';
				switch(item.objectType){
					case 1:
						path='book';
						break;
					case 2:
						path='article';
						break;
					case 3:
						path='img';
						break;
					case 4:
						path='audio';
						break;
					case 5:
						path='video';
						break;
					case 6:
						path='other';
				}
				updatemessagestatusAPI({
					id:item.messageid,
					userId:this.userId
				}).then( res => {
					if(res.data.status==1){
						item.isRead = 1;
					}
				})
				uni.navigateTo({
					url:`/pages/home/${path}Details?id=${item.objectId}`
				})
			}
		},
		onLoad(){
			this.getSubList()
		},
		computed:{
			userId(){
				return this.$store.getters.userId
			}
		},
		onPullDownRefresh() {
			this.page = 1;
			this.pullDown = true;
			this.getSubList()
		},
		onReachBottom() {
			if(this.dataTotal > this.subList.length){
				this.loadingType=1;
				this.page++;
				this.getSubList();
			}else {
				this.loadingType = 2;
			}
		},
	}
</script>

<style lang="less" scoped>
//超出两行添加省略号
.line-clamp{
	text-overflow: -o-ellipsis-lastline;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
}
//单行省略号
.ellipsis{
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.sub-header {
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
		margin-left:-23upx;
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
.sub-main{
	padding:0 30upx;
	background:#fff;
	margin-top:150upx;
	.sub-item{
		border-top:1upx solid #E0E1E8;
		display:flex;
		justify-content:flex-start;
		align-items:center;
		padding:30upx 0;
		color:#3D3D3D;
		font-size:28upx;
		.sub-image{
			position:relative;
			margin-right:30upx;
			image{
				width:52upx;
				height:52upx;
			}
			.no-read{
				width:15upx;
				height:15upx;
				position:absolute;
				right:2upx;
			}
		}
		.sub-con{
			width:600upx;
			.line-clamp;
		}
	}
	.sub-item:first-child{
		border-top:none;
	}
	
}
.empty{
		width:100%;
		height:100%;
		display:flex;
		justify-content: center;
		align-items: center;
		flex-direction: column; 
		padding-top:280upx;
		color:#999999;
		font-size:32upx;
		image{
			width:422upx;
			height:300upx;
			margin-bottom:30upx;
		}
	}
</style>
