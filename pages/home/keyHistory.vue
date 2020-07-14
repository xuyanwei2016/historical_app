<template>
	<view>
		<view class="history-header">
			<view style="width:40upx;margin-top:50upx;height:38upx;" @tap="returnPre">
				<image src="../../static/images/home/return2.png" ></image>
			</view>			
			<text class="title">{{title}}</text>
		</view>
		<view class="history">
			<view class="history-list"  v-if="keyHistoryList.length>0">
				<view class="history-item" v-for="(item,index) in keyHistoryList" :key="index" @tap="toBookDetails(item.id)" >
					<view class="history-image">
						<image v-if="item.cover && !item.showDefault" :src="imagePath+item.cover" @error="item.showDefault=true"></image>
						<image v-if="!item.cover || item.showDefault" src="../../static/images/article/default.png"></image>
					</view>
					<view class="history-text">
						<view class="title">
							<text>{{item.name}}</text>
						</view>
						<view class="author" v-if="item.author">
							<text>{{item.author}}</text> 
						</view>
						<view class="price">
							<text class="small">¥</text>
							<text> {{item.before}}</text>
							<text v-if="item.after" style="fontSize:28upx;">.{{item.after}}</text>
							<!-- <text class="big">{{item.price[0]}}</text>
							<text>.{{item.price[1]}}</text> -->
						</view>
						<view class="con" v-if="item.bookDescription">
							<text>{{item.bookDescription}}</text>
						</view>
					</view>
				</view>				
			</view>
			<view class="empty" v-else>
				<image src="../../static/images/empty/other.png" ></image>
				<text>什么也没有哦~</text>
			</view>
			<view style="height: 60upx; width:100%;text-align: center;color: #555555;" v-if="keyHistoryList.length>0">
				{{loadingType==0?loadingText.contentdown:loadingType==1?loadingText.contentrefresh:loadingText.contentnomore}}
			</view>
		</view>	
	</view>
</template>

<script>	
	import { getbookcontentbylocationAPI } from '../../api/home.js'
	export default {
		data() {
			return {
				keyHistoryList:[],
				title:'',
				imagePath:'',
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loadingType:0,
				dataTotal:0,
				page:1,
				location:'',
				pullDown:false
			};
		},
		methods:{
			returnPre(){
				uni.navigateBack({
					delta: 1
				});
			},	
			getHistoryList(){
				getbookcontentbylocationAPI({
					location:this.location,
					page:this.page,
					rows:5
				}).then( res => {
					this.dataTotal = res.data.page.total;
					if(this.pullDown){
						this.keyHistoryList=res.data.page.rows;
					}else {
						if(this.dataTotal>0){
							this.keyHistoryList.push(...res.data.page.rows);
							if(this.dataTotal > this.keyHistoryList.length){
								this.loadingType = 0;
							}else {
								this.loadingType = 2;
							}
						}else {
							this.keyHistoryList = [];
							this.loadingType = null;
						}
					}
					this.keyHistoryList.map( v => {
						if(v.showDefault!=false){
							this.$set(v,'showDefault',false)
						}
						if(v.isPay){
							// isPay为string类型
							this.splitPrice(v.isPay,v);
						}else {
							// price字段为number类型
							this.splitPrice(v.price+'',v)
						}
						return v;
					})
					uni.stopPullDownRefresh()
				})
			},
			splitPrice(price,item){
				if(price.indexOf('.')>0){
					let [before,after] = price.split('.');
					item.before = before;
					item.after = after;
				}else {
					item.before = price;
				}
				
			},
			toBookDetails(id){
				uni.navigateTo({
					url:'/pages/home/bookDetails?id='+id
				})
			},
		},
		onLoad(opt) {
			this.location = opt.location;
			this.getHistoryList();
			this.title = opt.location;
			this.imagePath = this.imgURL()
		},
		onReachBottom() {
			if(this.dataTotal > this.keyHistoryList.length){
				this.loadingType=1;
				this.page++;
				this.getHistoryList();
			}else {
				this.loadingType = 2;
			}
		},
		onPullDownRefresh() {
			this.page = 1;
			this.pullDowm = true;
			this.getHistoryList();
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
.history-header {
	width:690upx;
	position:fixed;
	z-index: 11;
	top:0;
	height:150upx;
	background:linear-gradient(40deg,#6080CB,#4465B7);
	display:flex;
	justify-content: flex-start;
	align-items: center;
	padding:0 30upx;
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
.history {
	margin-top:150upx;
	padding:0 30upx;
	.history-list {
		background-size:100% 100%;
		.history-item {
			padding:30upx 0;
			border-top:1upx solid #E0E1E8;
			display:flex;
			justify-content:flex-start;
			align-items: center;
			.history-image {
				width:160upx;
				height:220upx;
				margin-right:30upx;
				image {
					width:160upx;
					height:220upx;
				}
			}
			.history-text {
				height:220upx;
				width:500upx;
				.title {
					color:#3D3D3D;
					font-size:34upx;
					font-weight:bold;
					line-height:34upx;
					margin-bottom:10upx;
					padding-top: 4px;
					.ellipsis;
				}
				.author {
					color:#8E8F91;
					font-size:24upx;
					// margin-top:10upx;
					margin-bottom:10upx;
				}
				.price{
					color:#D61F1F;
					font-weight: bold;
					font-size:34upx;
					line-height:34upx;
					margin-bottom:15upx;
					.small{
						font-size:28upx;
					}
// 					.big{
// 						font-size:36upx;
// 						margin-left:8upx;
// 					}
				}
				.con {
					color:#666666;
					font-size:26upx;
					line-height:36upx;
					.line-clamp
				}
			}
		}
		.history-item:first-child {
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
}
</style>
