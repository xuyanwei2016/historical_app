<template>
	<view>
		<view class="balance-header">
			<view style="width:40upx;height:38upx;padding-top:50upx;" @tap="returnPre">
				<image src="../../static/images/home/return2.png" ></image>
			</view>	
			<text class="center">账户余额</text>
			<navigator class="right" url="updateBalance">充值</navigator>
		</view>
		<view :class="{box:ordersList.length==0}">
			<view class="top">
				<text>当前账户余额（金币）</text>
				<view class="price">
					<text>{{val || 0}}</text>
				</view>
			</view>
			<view class="record" >
				<view class="mark"></view>
				<view class="title">
					<text>消费记录</text>
				</view>
				<view class="record-list" v-if="ordersList.length>0">
					<view class="item" v-for="(item,index) in ordersList" :key="index">
						<view class="left">
							<view class="msg">
								
								<text v-if="item.resourceType==1">购买资源【图书】{{item.resourceName}}</text>
								<text v-if="item.resourceType==2">购买资源【文章】{{item.resourceName}}</text>
								<text v-if="item.resourceType==3">购买资源【图片】{{item.resourceName}}</text>
								<text v-if="item.resourceType==4">购买资源【音频】{{item.resourceName}}</text>
								<text v-if="item.resourceType==5">购买资源【视频】{{item.resourceName}}</text>
								<text v-if="item.resourceType==6">购买资源【其他】{{item.resourceName}}</text>
								<text v-if="item.resourceType!=1&&item.resourceType!=2&&item.resourceType!=3&&item.resourceType!=4&&item.resourceType!=5&&item.resourceType!=6">充值</text>
							</view>
							<view class="time">
								<text>{{item.createTime}}</text>
							</view>
						</view>
						<view class="right">
							<view class="price">	
								<text>{{item.isPay==1?"+":"-"}}{{item.minValue}}</text>
							</view>
							<view class="balance">
								<text>{{item.value}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	
		<view style="height: 60upx; width:100%;text-align: center;color: #555555;" v-if="ordersList.length>rows">
			{{loadingType==0?loadingText.contentdown:loadingType==1?loadingText.contentrefresh:loadingText.contentnomore}}
		</view>
		<!-- 正在加载中 -->
		<view class="loadingList" v-if="!isShowLoad" >
			<image src="../../static/images/home/loading.png" mode=""></image>
		</view>
		<!-- 暂无数据 -->
		<view class="noHave" v-if="ordersList.length==0&&isShowLoad">
			<image src="../../static/images/my/nohave.png" mode=""></image>
			<text>暂无消费记录</text>
		</view>
	</view>
</template>

<script>
	import { getOrdersListAPI } from '../../api/info.js'
	export default {
		data() {
			return {
				ordersList:[],
				val:null,
				page:1,
				rows:7,
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loadingType:0,
				dataTotal:0,
				pullDown:false,
				isShowLoad:false,
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
			getOrdersList(){
				getOrdersListAPI({
					memberid:this.userId,
					page:this.page,
					rows:this.rows
				}).then( res => {
					uni.stopPullDownRefresh()
					this.isShowLoad=true;
					this.val = res.data.page.value;
					this.$store.commit('balanceFn',this.val)
					this.dataTotal = res.data.page.total;
					
					if(this.pullDown){
						this.ordersList = res.data.page.rows;
					}else {
						if(this.dataTotal>0){
							this.ordersList.push(...res.data.page.rows);
							if(this.dataTotal > this.ordersList.length){
								this.loadingType = 0;
							}else {
								this.loadingType = 2;
							}
						}else {
							this.ordersList = [];
							this.loadingType = null;
						}
					}
					
				})
			}
		},
		onLoad() {
			this.isShowLoad=true;;
			this.getOrdersList();
		},
		computed:{
			/* this.$store.dispatch('getShelfList'); */
			userId(){
				return this.$store.getters.userId
			},
			balanceMoney(){			
				return this.$store.state.balanceMoney
			},
		},
		watch: {
			balanceMoney() {
				console.log(1111111)
				this.isShowLoad=true;
				this.ordersList=[];
				this.getOrdersList()
			}
		},
		onPullDownRefresh() {
			this.isShowLoad=true;
			this.page = 1;
			this.pullDown = true;
			this.getOrdersList()
		},
		onReachBottom() {
			this.isShowLoad=true;
			this.pullDown = false;
			if(this.dataTotal > this.ordersList.length){
				this.loadingType=1;
				this.page++;
				this.getOrdersList();
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
.balance-header{
	padding:0 30upx;
	width:690upx;
	height:150upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position:fixed;
	top:0;
	background:linear-gradient(to right,#6080CB,#4465B7);
	color:#fff;
	font-size:32upx;
	.return {
		width:22upx;
		height:38upx;
		margin-right:42upx;
	}
	.center{
		font-size:36upx;
	}
	.right,.center,.return{
		margin-top:50upx;
	}
	image{
		width:22upx;
		height:38upx;
	}
}
.top{
	margin-top:150upx;
	height:300upx;
	background:linear-gradient(to right,#6080CB,#4465B7);
	padding:40upx 30upx 0;
	color:#fff;
	font-size:28upx;
	.price{
		font-size:120upx;
		font-weight:bold;
	}
}
.box{
	position:fixed;
	top:0;
	width:100%;
	z-index:-1;
}
.record{
	.mark{
		width:100%;
		height:100%;
		position:fixed;
		z-index:-4;
		background:#f5f5f4;
	}
	.title{
		color:#3D3D3D;
		font-size:28upx;
		padding-left:30upx;
		height:66upx;
		line-height:66upx;
	}
	.record-list{
		background:#fff;
		padding:0 30upx;
		.item{
			padding:10upx 0;
			display:flex;
			justify-content: space-between;
			align-items: center;
			border-top:1upx solid #E0E1E8;
			.title,.price{
				font-size:32upx;
				color:#3D3D3D;
			}
			.time,.balance{
				color:#8E8F91;
				font-size:24upx;
			}
			.left{
				.msg{
					width:540upx;
					.ellipsis;
				}
			}
			.right{
				text-align:right;
			}
		}
		.item:first-child{
			border-top:none;
		}
	}
}
/* 暂无数据 */
.noHave {
	width: 100%;
	padding-top: 100upx;
	margin-top:428upx;
	display: flex;
	flex-direction: column;
	align-items: center;
	position:fixed;
	z-index: 2;
	image {
		width: 442upx;
		height: 330upx;
	}

	text {
		font-size: 32upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
		color: #999;
		padding-top: 20upx;
	}
}
	/* 正在加载中 */
	.loadingList{
		width:100%;
		height:600upx;
		display: flex;
		justify-content: center;
		align-items: center;
		image{
			width:40upx;
			height:40upx;
			animation:mymove 1s linear infinite;
			-moz-animation:mymove 1s linear infinite;
			-webkit-animation:mymove 1s linear infinite;
			-o-animation:mymove 1s linear infinite;
		}
	}
	
	@keyframes mymove{
from {transform: rotate(0deg);}
to {transform: rotate(360deg);}
}
	@-moz-keyframes mymove{
from {transform: rotate(0deg);}
to {transform: rotate(360deg);}
}
	@-webkit-keyframes mymove{
from {transform: rotate(0deg);}
to {transform: rotate(360deg);}
}
	@-o-keyframes mymove{
from {transform: rotate(0deg);}
to {transform: rotate(360deg);}
}
</style>
