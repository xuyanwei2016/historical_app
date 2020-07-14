<template>
	<view>
		<view class="msg-header">
			<view style="width:40upx;height:38upx;margin-top:50upx;" @tap="returnPre">
				<image src="../../static/images/home/return2.png" ></image>
			</view>	
			<text class="title">我的消息</text>
		</view>
		<view class="mark" v-if="msgList.length>0"></view>
		<view class="msg-main" :class="{fixedBox:msgList.length<rows}">
			<view class="msg-item" v-for="(item,index) in msgList" :key="index" @tap="toMsgDetails(item)" v-if="msgList.length>0">
				<view class="msg-image">
					<image src="../../static/images/my/msg.png"></image>
					<image v-if="item.isRead==0" class="no-read" src="../../static/images/my/icon.png" mode=""></image>
				</view>				
				<view class="msg-con">
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
		<view class="empty" v-if="msgList.length<=0">
			<image src="../../static/images/empty/other.png" ></image>
			<text>什么也没有哦~</text>
		</view>
		<view style="height: 60upx; width:100%;text-align: center;color: #555555;" v-if="msgList.length>rows">
			{{loadingType==0?loadingText.contentdown:loadingType==1?loadingText.contentrefresh:loadingText.contentnomore}}
		</view>
	</view>
</template>

<script>
	import { getMyMessageAPI, updateNewStatusAPI, getMessageAPI } from '../../api/info.js'
	export default {
		data() {
			return {
				msgList:[],
				page:1,
				rows:11,
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loadingType:0,
				dataTotal:0,
				pullDown:false
			};
		},
		methods:{
			returnPre(){
				var pages = getCurrentPages();
				if(pages.length==1){
					history.back();
				}
				uni.navigateBack({
					delta: 1
				});
			},
			getMsgList(){
				getMyMessageAPI({
					memberid:this.userId,
					page:this.page,
					rows:this.rows
				}).then( res => {
					uni.stopPullDownRefresh()
					this.dataTotal = res.data.page.total;
					if(this.pullDown){
						this.msgList = res.data.page.rows;
					}else {
						if(this.dataTotal>0){
							this.msgList.push(...res.data.page.rows);
							if(this.dataTotal > this.msgList.length){
								this.loadingType = 0;
							}else {
								this.loadingType = 2;
							}
						}else {
							this.msgList = [];
							this.loadingType = null;
						}
					}
				})
			},
			toMsgDetails(item){
				updateNewStatusAPI({
					messageid:item.messageid,
					userId:this.userId
				}).then( res => {
					if(res.data.status==1){
						item.isRead = 1;
					}
					this.getMsg()
				})
				uni.navigateTo({
					url:'/pages/my/myMsgDetails?id='+item.messageid
				})
			},
			getMsg(){
				getMessageAPI({
					memberid:this.userId
				}).then( res => {
					this.$store.commit('changeMsg',res.data.msg.some( v => v.isOpen==0));
					console.log(this.$store.getters.getIsReadMsg)
				})
			}
		},
		onLoad() {
			this.getMsgList()
		},
		computed:{
			userId(){
				return this.$store.getters.userId
			},
			isLogin(){
				return this.$store.getters.isLogin
			}
		},
		onPullDownRefresh() {
			this.page = 1;
			this.pullDown = true;
			this.getMsgList()
		},
		onReachBottom() {
			if(this.dataTotal > this.msgList.length){
				this.loadingType=1;
				this.page++;
				this.getMsgList();
			}else {
				this.loadingType = 2;
			}
		},
	}
</script>

<style lang="less" scoped>
//单行省略号
.ellipsis{
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.msg-header {
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
.fixedBox{
	position:fixed;
	top:0;
	width:100%;
}
.msg-main{
	background:#fff;
	padding:0 30upx;
	margin-top:150upx;
	.msg-item{
		padding:0 30upx;
		background:#fff;
		border-top:1upx solid #E0E1E8;
		display:flex;
		justify-content:flex-start;
		align-items:center;
		padding:30upx 0;
		color:#3D3D3D;
		font-size:28upx;
		.msg-image{
			position:relative;
			margin-right:30upx;
			width:52upx;
			height:52upx;
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
		.msg-con{
			width:600upx;
			height:52upx;
			.ellipsis;
		}
	}
	.msg-item:first-child{
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
