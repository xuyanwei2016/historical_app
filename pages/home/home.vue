<template>
	<view>
		<view class="home-header" >
			<view class="input" @tap="toSearch">
				<view class="search-icon">
				<image src="../../static/images/home/ss.png" style="width: 24upx; height:26upx;"></image>
				</view>
				<view class="search-input">
					<text>请输入关键字</text>
				</view>								
			</view>			
		</view>
		
		<view class="home-nav">
			<view class="home-nav-item" v-for="(item,index) in classfy" :key="index" @tap="toResourceList(index)">
				<view class="classfy">{{item.title}}</view>
			</view>
		</view>
		<view class="main">
			<!-- <view class="key-history">
				<view>
					<image src="../../static/images/home/2.png"></image>
					<text class="title">重点史料11</text>
				</view>
				<view class="swiper">
					<swiper @change="getCurrent">
						<swiper-item v-for="(item,index) in historyList" :key="index" @tap="toKeyHistory(item.location)">
							<view class="swiper-item">
								<text class="history">{{item.location}}</text>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<image style="width:690upx;height:140upx;boxShadow:1upx 1upx 21upx 0upx rgba(159,97,16,0.25);" :src="imagePath+keyHistoryPath"></image>
			</view> -->
			<view class="recommend">
				<view class="reTit">
					<!-- <image src="../../static/images/home/shape1.png"></image> -->
					<text class="title">推荐图书</text>
				</view>
				<view class="recommend-list">
					<view class="recommend-item" @tap="toBookDetails(item.id)" v-for="(item,index) in recommendList" :key="index">
						<view class="recommend-image">
							<image v-if="item.cover && !item.showDefault" :src="imagePath+item.cover" @error="item.showDefault=true"></image>
							<image v-if="!item.cover || item.showDefault" src="../../static/images/article/default.png"></image>
						</view>
						<view class="recommend-text">
							<view class="title">
								<text>{{item.name}}</text>
							</view>
							<view class="author" v-if="item.author">
								<text>{{item.author}}</text>
							</view>
							<view class="con">
								<text>{{item.intro}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="love">
				<view class="love-title">
					<view class="left">
						<text>猜你喜欢</text>
					</view>
					<view class="right" @tap="forAnother">
						<image src="../../static/images/home/shape3.png"></image>
						<text>换一批</text>
					</view>
				</view>
				<view class="love-list">
					<view class="love-item" v-for="(item,index) in loveList" :key="index" @tap="toArticalDetails(item)">
						<view class="love-left">
							<view class="title">
								<text>{{item.title}}</text>
							</view>
							<view class="con">
								<text >{{item.intro||''}}</text>
								<!-- <rich-text :nodes="item.text"></rich-text> -->
							</view>
						</view>
						<!-- <view class="love-right">
							<image src="../../static/images/home/return1.png" mode=""></image>
						</view> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getadspaceAPI, getyourlikeAPI, getKeyHistoricalMaterialsAPI, getbookcontentbylocationAPI,getBookbylocation } from '../../api/home.js'
	export default {
		data() {
			return {
				classfy:[{
						pic:'book',
						title:'文学馆'
					},
					{
						pic:'article',
						title:'史传馆'
					},
					{
						pic:'pic',
						title:'国学馆'
					},
					{
						pic:'music',
						title:'出版专业文库'
					},
					{
						pic:'more',
						title:'中国书籍文库'
					},
				],
				historyList :[],
				keyHistoryPath:'',
				loveList:[],
				recommendList:[],
				imagePath:'',
				curIndex:0,
				scrollLeft:0,
				checked:true
			};
		},
		methods:{
			toSearch(){
				uni.navigateTo({
					url:'/pages/home/search'
				})
			},
			toKeyHistory(location){
				uni.navigateTo({
					url:'/pages/home/keyHistory?location='+location
				})
			},
			toBookDetails(id){
				uni.navigateTo({
					url:'/pages/home/bookDetails?id='+id
				})
			},
			//猜你喜欢
			getyourlike(){
				getyourlikeAPI({
					userId:this.$store.getters.getToken || ''
				}).then(res => {
					this.loveList = res.data;
					console.log('猜你喜欢',this.loveList)
					uni.stopPullDownRefresh()
					
				})
			},
			// 猜你喜欢-换一批
			forAnother(){
				this.getyourlike()
			},
			//获取重点史料
			getKeyHistorical(){
				getKeyHistoricalMaterialsAPI().then(res => {
					this.historyList = res.data;
					uni.stopPullDownRefresh()
				})
			},
			getRecommendList(){
				getBookbylocation().then( res => {
					this.recommendList = res.data;
					uni.stopPullDownRefresh()
				})
			},
			//获取广告位图片
			getadSpace(){
				getadspaceAPI().then(res=>{
					this.keyHistoryPath = res.data.filter(v => v.mark == 'index')[0].imageUrl;
					uni.stopPullDownRefresh()
				})
			},
			//跳转到资源列表页
			toResourceList(index){
				uni.navigateTo({
					url:'/pages/home/literature?type='+index
				})
				
			},
			//跳转到文章详情页
			toArticalDetails(item){
				uni.navigateTo({
					url:`/pages/home/articleDetails?id=${item.contentid}`
				})
			},
			getCurrent(e){
				console.log(e.detail.current)
			}
		},
		onLoad() {
			this.getadSpace()
			this.getyourlike(),
			this.getKeyHistorical()
			this.getRecommendList()
			this.imagePath = this.imgURL()
		},
		onPullDownRefresh(){
			this.getadSpace()
			this.getyourlike()
			this.getKeyHistorical()
			this.getRecommendList()
			this.imagePath = this.imgURL()
		}
	}
</script>
<style lang="less" scoped>
@imgUrl:"http://122.14.50.6:8084/h5/img/";
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
.home-header{
	background-image:url('../../static/images/home/bg_top.png');
	// background-image: url('../../static/images/home/banner.png');
	background-size:100% 100%;
	width:750upx;
	height:376upx;
	overflow: hidden;
	.input {
		width:690upx;
		height:64upx;
		background:#F1F1F3;
		margin:258upx auto 0;
		display:flex;
		.search-icon {
			width:24upx;
			height: 26upx;
			margin: 10upx 20upx 0;
			image{
				/* object-fit: cover; 
object-position: top; */
			}
			
		}
		.search-input text{
			width:620upx;
			height:64upx;
			line-height:64upx;
			color:#8D8D92;
			font-size:28upx;
		}
	}
}
.home-nav{
	width:698upx;
	height:120upx;
	margin:48upx auto 0;
	background-size:100% 100%;
	display:flex;
	justify-content: space-around;
	align-items: center;
	uni-view{
		line-height: 20upx;
	}
	.home-nav-item{
		text-align:center;
		width:116upx;
		height: 120upx;
		background-image:url('../../static/images/home/bg_rukou.png');
			display: flex;
			justify-content: center;
			align-content: center;	
			align-items: center;
			background-size: cover;
		/* .nav-image  {
			width:66upx;
			height:66upx;
			margin-bottom:10upx;
			image {
				width:100%;
				height:100%;
			}
		} */
		.classfy {
			width: 100upx;
			font-size:24upx;
			line-height:30upx;
			color:#3D5696;
			
			
		}
	}
	
}
.main {
	background-image:url('@{imgUrl}bj.png');
	// width:100%;
	min-height:500upx;
	padding:0upx;
	width: 750upx;
	.key-history,.recommend {
		image{
			width:32upx;
			height:32upx;
			margin-right:11upx;
		}
		.title {
			font-size:36upx;
			color:#27272B;
			font-weight:bold;
		}
	}
	.key-history {	
		margin-bottom:52upx;
		.swiper {
			margin:40upx 0;
			height:120upx;
			width:690upx;
			swiper-item {
				width:330upx !important;
			}
			uni-swiper {
				width:690upx;
				height:120upx;
			}
// 			uni-swiper .uni-swiper-slides{
// 				width:580upx !important;
// 			}
			.swiper-item {
				width:300upx;
				height:120upx;
				background-image:url('@{imgUrl}anniu.png');
				background-size:100% 100%;
				text-align:center;
				border-left:10upx solid #4C5679;
				display:flex;
				flex-wrap:wrap;
				align-items:center;
				justify-content: center;
				box-shadow:1upx 1upx 21upx 0upx rgba(159,97,16,0.25);
				.history {
					font-size:28upx;
					color:#4C5679;
					font-weight:bold;
					line-height:40upx;
					width:200upx;
				}
			}
		}
		.scroll{
			margin:40upx 0;
			height:120upx;
			overflow:hidden;
			scroll-view{
				width:2640upx;
				height:120upx;
			}
			.scroll-item{
				width:290upx;
				height:120upx;
				border-left:10upx solid #4C5679;
				background-image:url('@{imgUrl}anniu.png');
			}
			.box{
				width:330upx;
			}
		}
	}
	.recommend {
		width:750upx;
		.reTit{/* bg_tjts */
			background-image:url('../../static/images/home/bg_tjts.png');
			width: 720upx;
			height: 64upx;
			padding: 80upx 0 0 30upx;
		}
		.recommend-list {
			/* margin-top:40upx;
			padding:0 30upx; */
			/* background-image:url('@{imgUrl}book-bottom.png'); */
			background-size:100% 100%;
			/* box-shadow:1upx 1upx 21upx 0upx rgba(159,97,16,0.25); */
			.recommend-item {
				padding: 30upx;
				width: 630upx;
				height: 206upx;
				background-color: #fff;
				box-shadow:1upx 1upx 21upx 0upx rgba(58,86,151,0.25);
				/* border-top:1upx solid #AEB0B8; */
				display:flex;
				justify-content: space-between;
				align-items: center;
				margin: 30upx auto;
				.recommend-image {
					width:142upx;
					height:206upx;
					image {
						width:142upx;
						height:206upx;
					}
				}
				.recommend-text {
					width: 462upx;
					height:206upx;
					.title {
						color:#3D3D3D;
						font-size:32upx;
						font-weight:bold;
						width:460upx;
						.ellipsis
					}
					.author {
						color:#8E8F91;
						font-size:24upx;
						margin-top:20upx;
						margin-bottom:20upx;
						width:460upx;
					}
					.con {
						width:460upx;
						color:#8E8F91;
						font-size:26upx;
						line-height:36upx;
						.line-clamp
					}
				}
			}
			.recommend-item:first-child {
				border-top:none;
			}
		}
	}
	.love {
		width:690upx;
		margin:60upx auto 40upx;
		.love-title {
			display:flex;
			justify-content: space-between;
			align-items:center;
			margin-bottom:40upx;
			.left {
				text{
					font-size:36upx;
					color:#27272B;
					font-weight: bold;
				}
			}
			.right{
				image {
					width:23upx;
					height:23upx;
					margin-right:10upx;
				}
				text {
					color:#666666;
					font-size:24upx;
				}
			}
		}
		.love-list{
			width:630upx;
			height:auto;
			background-color: #fff;
			box-shadow:1upx 1upx 21upx 0upx rgba(58,86,151,0.25);
			padding:0 30upx;
			.love-item {
				padding:40upx 0 30upx;
				// border-top:1upx solid #AEB0B8;
				border-bottom:1upx solid #D8D9DE;
				display:flex;
				justify-content:space-between;
				align-items:center;
				.love-left {
					width:100%;
					.title{
						color:#3D3D3D;
						font-size:32upx;
						.ellipsis;
						font-weight:bold;
						margin-bottom: 6upx;
					}
					.con{
						font-size:26upx;
						color:#8E8F91;
						.line-clamp;
					}
				}
				.love-right {
					image {
						width:12upx;
						height:20upx;
					}
				}
			}
			.love-item:first-child {
				border-top:none;
			}
			.love-item:last-child {
				border:none;
			}
		}
	}
}
</style>
