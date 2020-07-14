<template>
	<view class="article-details">
		<view :class="{cover : showCover,cover1:showShare}" ></view>
		<view class="article-top">
			<image class="article-cover" :src="imagePath+details.cover" mode="widthFix"></image>
			<view class="article-header" :class="{canclePos:showShare}">
				<view class="left" @tap="returnPre" style="width:40upx;">
					<image src="../../static/images/home/return2.png" ></image>
				</view>
				<view class="center">
					<text>文章</text>
				</view>
				<view class="right">
					<image v-if="(!isLogin || details.isShop ==0)&&!isPayStatus" @tap="addShopCar" src="../../static/images/books/cart2.png" style="width:38upx;height:38upx;margin-right:30upx;"></image>
					<image @tap="showShare = true" src="../../static/images/books/share1.png" style="width:33upx;height:38upx;"></image>
				</view>			
			</view>
			<view class="article-main" :class="{cancleMargin:showShare}">	
				<view class="article-item">
					<view class="article-image">
						<image src="../../static/images/article/default.png"></image>
					</view>
					<view class="article-text">
						<view class="title">
							<text>{{details.title}}</text>
						</view>
						<view class="book-name" @tap="toBookDetails">
							<text>《{{details.bookName}}》</text>
						</view>
						<view class="author" v-if="details.author">
							<text>作者&nbsp;:&nbsp;&nbsp;{{details.author}}</text>
						</view>						
						<view class="price">
							<view class="now">
								<text>¥</text>
								<text class="big">{{details.before}}</text>
								<text v-if="details.after" style="fontSize:28upx;">.{{details.after}}</text>
							</view>
							<view class="origin" v-if="details.isPay">
								<text class="RMB">¥</text>
								<text class="big">{{details.originBefore}}</text>
								<text v-if="details.originAfter" style="fontSize:22upx;">.{{details.originAfter}}</text>
							</view>
						</view>
						<view class="collect" @tap="addFavorites">
							<image v-if="!isLogin || details.isFavorites == 0" src="../../static/images/books/collect.png"></image>
							<image v-if="details.isFavorites == 1" src="../../static/images/books/collected.png"></image>
							<text>收藏</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="article-info">
			<view class="article-intro" v-if="details.intro">
				<view class="title">
					<text>内容简介</text>
				</view>
				<view class="con">
					<text v-if="showMore && showMoreIcon" v-html="details.intro"></text>
					<text v-if="showIntro2" v-html="details.intro2"></text>
					<view class="more-icon" @tap="showMore = !showMore;showIntro2 = !showIntro2" v-if="showMoreIcon">
						<image v-if="!showMore" src="../../static/images/books/zhankai.png"></image>
						<image v-else src="../../static/images/books/shouqi.png"></image>
					</view>
				</view>
			</view>
			<view class="article-comment">
				<text class="top-title">评论</text>
				<view class="comment-list" v-if="commentList.length>0">
					<view class="comment-item" v-for="(item,index) in commentList" :key="index">
						<view class="top">
							<view class="left">
								<image v-if="item.path" :src="imagePath+item.path" ></image>
								<image v-else src="../../static/images/my/header.png" mode=""></image>
								<text>{{item.memberName}}</text>
							</view>
							<view class="right">
								<view class="star" v-for="(val,i) in startList" :key="val">
									<image v-if="i < item.starLevel" src="../../static/images/books/star2.png"></image>
									<image v-else src="../../static/images/books/star.png"></image>
								</view>
							</view>
						</view>
						<view class="con">
							<text>{{item.content}}</text>
						</view>
						<view class="replay" v-if="item.objectName">
							<view class="con">
								<view class="title">
									回复:
								</view>
								<rich-text :nodes="item.objectName"></rich-text>
								
							</view>
							<text class="caret"></text>
						</view>
					</view>
				</view>	
				<!-- 正在加载中 -->
				<view class="loadingList" v-if="!isShowLoad" >
				<image src="../../static/images/home/loading.png" mode=""></image>
				</view>
				<!-- 默认图片需修改 -->
				<view class="empty"  v-if="commentList.length==0&&isShowLoad">
					<img src="../../static/images/home/left.png" alt="" class="noHaveLeft">
										<image src="../../static/images/home/icon.png" mode="" class="noHaveSmall"></image>
										<text>还没有评论，快来评论吧~</text>
										<img src="../../static/images/home/right.png" alt="" class="noHaveRight">
					
				</view>
				<view style="height: 60upx; width:100%;text-align: center;color: #555555;" v-if="commentList.length>rows">
					{{loadingType==0?loadingText.contentdown:loadingType==1?loadingText.contentrefresh:loadingText.contentnomore}}
				</view>
			</view>
			
		</view>
		<view class="bottom">
			<!-- 未登录或者未购买 -->
			<view class="no-buy" v-if="(!isLogin || details.isShop!=1)&&!isPayStatus">
				<view class="left" @tap="onlineRead">
					<image src="../../static/images/books/online.png" ></image>
					<text>在线试读</text>
				</view>
				<view class="right" @tap="pay">
					<text>立即购买</text>
				</view>
			</view>
			<!-- 已登录且已购买 -->
			<view class="buy" v-if="isLogin && details.isShop == 1" @tap="onlineRead">
				<image src="../../static/images/books/online2.png" ></image>
				<text>在线阅读</text>
			</view>
		</view>
		<view class="share" :class="{shareInit:showShare}">
			<view class="mark" @tap="showShare = false"></view>
			<view class="main">
				<view class="top">
					<view class="item" v-for="(item,ind) in shareList" :key="ind">
						<image :src="'../../static/images/books/'+item.icon+'.png'"></image>
						<view class="">
							<text>{{item.text}}</text>
						</view>
					</view>
				</view>
				<view class="cancel" @tap="showShare = false">
					<text>取消</text>
				</view>
			</view>			
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon.vue"
	import { getcontentinfoAPI, addFavoritesAPI  } from '../../api/resource.js'
	import { addShopCarAPI } from '../../api/cart.js'
	import { deleteFavoritesAPI, saveFootmarkAPI } from '../../api/info.js'
	import { getCommentsListAPI } from '../../api/comment.js'
	export default {
		data() {
			return {
				showMore:false,
				showMoreIcon:false,
				startList:[1,2,3,4,5],
				showCover:false,
				details:[],
				// price:{},
				isPay:{},
				commentList:[],
				imagePath:'',
				page:1,
				showIntro2:true,
				showShare:false,
				shareList:[{
					icon:'weixin',
					text:'微信好友'
				},{
					icon:'quan',
					text:'微信朋友圈'
				},{
					icon:'qq',
					text:'QQ好友'
				}
				],	
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loadingType:0,
				dataTotal:0,
				objectid:'',
				contentid:'',
				pullDown:false,
				rows:5,
				isShowLoad:false,
			};
		},
		components: {uniIcon},
		methods:{
			returnPre(){
				var pages = getCurrentPages();
				if(pages.length==1){
					history.back();
				}
				var len = pages.length;
				var page = pages[len-1];
				uni.navigateBack({
					delta: 1
				});
			},
			filterIntro(str){
				if(!this.showMore){
					if(str && str.length>130){
						this.showMoreIcon = true;
						return str.slice(0,130)+'...'
					}else {
						this.showMoreIcon = false;
						return str
					}
				}else {
					return str;
				}
				
			},
			filterBook(str){
				if(str && str.length>500){
					return str.slice(0,500)+'...'
				}else {
					return str;
				}
			},
			getContentInfo(){
				let params = {
					contentid:this.contentid,
				}
				if(this.isOrg){
					params.orgId = this.userId
				}else {
					params.memberid = this.userId
				}
				getcontentinfoAPI(params).then( res => {
					this.details = res.data;
					this.details.intro = this.filterBook(this.details.intro);
					this.details.intro2 = this.filterIntro(this.details.intro); 						
					if(this.details.bookName){ 
						this.details.bookName = this.details.bookName.length>12 ? this.details.bookName.slice(0,12)+'...' : this.details.bookName;
					}
					this.objectid = res.data.contentid;
					this.getCommentsList()
					uni.stopPullDownRefresh()
					if(this.details.isPay){
						this.splitPrice(this.details.isPay,this.details)
					}else {
						this.splitPrice(this.details.price+'',this.details)
					}
					if(this.details.price+''.indexOf('.')>0){
						let [before,after] = (this.details.price+'').split('.');
						this.details.originBefore = before;
						this.details.originAfter = after;
					}else {
						this.details.originBefore = this.details.price;
					}
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
			getCommentsList(){
				getCommentsListAPI({
					objectid:this.objectid,
					page:this.page,
					rows:this.rows				
				}).then( res => {
					this.isShowLoad=true,
					this.dataTotal = res.data.page.total;
					if(this.pullDown){
						this.commentList=res.data.page.rows;
					}else {
						if(this.dataTotal > 0){
							if(this.page==1){
								this.commentList=res.data.page.rows;
							}else {
								this.commentList.push(...res.data.page.rows)
							}
							if(this.dataTotal > this.commentList.length){
								this.loadingType = 0;
							}else {
								this.loadingType = 2;
							}
						}else {
							this.loadingType = null;
						}
					}
				})
			},
			addShopCar(){
				if(this.isLogin){
					addShopCarAPI({
						memberid:this.userId,
						objectid:this.details.contentid,
						type:2//文章					
					}).then( res => {
						uni.showToast({
							title:res.data.info,
							icon:'none'
						})
					})
				}else {
					uni.navigateTo({
						url:'/pages/my/login'
					})
				}
				
			},
			addFavorites(){
				if(this.isLogin){
					if(this.details.isFavorites == 1){
						deleteFavoritesAPI({//取消收藏
							memberid:this.userId,
							ids:this.details.contentid,
						}).then( res => {
							if(res.data.status==1){
								this.details.isFavorites = 0;
								uni.showToast({
									title:'已取消收藏',
									icon:'none'
								})
							}
						})
					}else {
						let params = {
							objectid:this.details.contentid,
							type:2
						}
						if(this.isOrg){
							params.orgId = this.userId
						}else {
							params.memberid = this.userId
						}
						addFavoritesAPI(params).then( res => {
							// console.log(res)
							if(res.data.status==1){
								this.details.isFavorites = 1;
								uni.showToast({
									title:'已加入收藏',
									icon:'none'
								})
							}
						})
					}
				}else {
					uni.navigateTo({
						url:'/pages/my/login'
					})
				}
				
				
			},
			//在线试读或者阅读
			onlineRead(){
				uni.navigateTo({
					url:'/pages/home/readera?type=article&markid='+this.details.markid+'&bookid='+this.contentid
				})
			},
			//点击文章来源跳转到图书详情
			toBookDetails(){
				if (this.details.bookStatus == 0 || this.details.bookStatus == 2) {
					uni.navigateTo({
						url: '/pages/my/invalid?type=0'
						})
						}else{
							uni.navigateTo({
								url:'bookDetails?id='+this.details.bookid
							})
						}
				
			},
			//添加到我的足迹
			saveFootmark(){
				if(this.isLogin){
					saveFootmarkAPI({
						memberid:this.userId,
						resourceid:this.contentid,
						resourceType:2
					}).then( )
				}
			},
			//立即支付
			pay(){
				if(this.isLogin){
					uni.navigateTo({
						url:'/pages/cart/orders?ids='+this.details.contentid
					})
				}else {
					uni.navigateTo({
						url:'/pages/my/login'
					})
				}
			}
		},
		onPageScroll(e) {
			this.showCover = e.scrollTop > 0 ? true : false;	
		},
		onLoad(opt) {
			this.isShowLoad=false;
			this.contentid = opt.id;
			this.getContentInfo()
			this.saveFootmark()
			this.imagePath = this.imgURL()
		},
		onShow() {
			this.getContentInfo()
			// this.saveFootmark()
			this.imagePath = this.imgURL()
		},
		onPullDownRefresh() {
			this.page =1;
			this.pullDown = true;
			this.showMore=false;
			this.showMoreIcon=false;
			this.showIntro2=true;
			this.getContentInfo()
		},
		computed:{
			isLogin(){
				return this.$store.getters.isLogin;
			},
			userId(){
				return this.$store.getters.userId;
			},
			isOrg(){
				return this.$store.getters.isOrg;
			},
			isPayStatus(){
				if(this.$store.state.isPayId==this.detailsId){
					return this.$store.state.isPayStatus
				}
				
			},
		},
		onReachBottom() {
			this.pullDown = false;
			if(this.dataTotal > this.commentList.length){
				this.loadingType=1;
				this.page++;
				this.getCommentsList();
			}else {
				this.loadingType = 2;
			}
		}
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
.cover {
	width:750upx;
	height:150upx;
	position:fixed;
	top:0;
	background: rgba(59, 86, 151, 0.6);
	z-index:1;
	opacity:0.9;
}
.cover1{
	background:none;
}
.article-top{
	position:relative;
	width:750upx;
	height:518upx;
	background-image:url('../../static/images/article/bg_top.png');
	background-size:100% 100%;
	overflow: hidden;
	.article-cover {
		position:absolute;
		top:-30%;
		z-index:-1;
		width:100%;
		height:100%;
		filter:blur(8upx);//设置图片模糊距离
	}
}
.article-header {
	position:fixed;
	width:690upx;
	z-index:3;
	height:150upx;
	display:flex;
	justify-content: space-between;
	align-items: center;
	padding:0 30upx;
	.left image{
		width:23upx;
		height:38upx;
	}
	.center {
		font-size:36upx;
		color:#FFFFFF;
		margin-left:60upx;
	}
	.left,.center,.right{
		margin-top:50upx;
	}
}
.canclePos{
	position:static;
}
.article-main {
	height:389upx;
	padding:0 30upx;
	position:relative;
	margin-top:150upx;
	.article-item {
		padding:30upx 0;
		display:flex;
		justify-content:flex-start;
		align-items: center;
		.article-image {
			width:207upx;
			height:300upx;
			margin-right:30upx;
			image {
				width:207upx;
				height:300upx;
			}
		}
		.article-text {
			height:300upx;
			color:#FFFFFF;
			.title {
				width:480upx;
				font-size:36upx;
				font-weight:bold;
				line-height:46upx;
				// .ellipsis
				.line-clamp
			}
			.book-name{
				font-size:28upx;
				margin-top:28upx;
				// margin-bottom:40upx;
				text-decoration: underline;
			}
			.author {	
				font-size:28upx;
				// margin-top:26upx;
				// margin-bottom:10upx;
				width:480upx;
				.ellipsis
			}
			.price{
				margin-top:48upx;
				margin-bottom:20upx;				
				display:flex;
				justify-content: flex-start;
				align-items: baseline;
				.now{					
					font-size:32upx;
					line-height:32upx;	
					margin-right:30upx;
					font-weight: bold;
					.big{
						font-size:42upx;
						margin-left:8upx;
					}
				}
				.origin{
					font-size:22upx;
					line-height:22upx;	
					text-decoration: line-through;
					.RMB{
						margin-right:4upx;
					}
					.big{
						font-size:28upx;
					}
					.small{
						font-size:28upx;
						margin-left:8upx;
					}
				}
				
			}
			.collect {
				position:absolute;
				right:0;
				bottom:36upx;
				width:115upx;
				height:60upx;
				background:#ffffff;
				border-radius:36upx 0 0 36upx;
				text-align: center;
				image{
					width:29upx;
					height:26upx;
					margin-right:10upx;
					vertical-align: -2upx;
					margin-top:16upx;
				}
				text{
					color:#8E8F91;
					font-size:26upx;
				}
			}
		}
	}
	.article-item:first-child {
		border-top:none;
	}
}
.cancleMargin{
	margin-top:0;
}
.article-info {
	// min-height:500upx;
	background:#f5f5f4;
	padding-bottom:0upx;
	position:relative;
	.article-intro {
		padding:40upx 30upx;
		color:#3D3D3D;
		background:#ffffff;
		margin-bottom:20upx;
		.title{
			font-weight: bold;
			font-size:32upx;
			margin-bottom:20upx;
		}
		.con {
			font-size:30upx;
			text-indent: 60upx;
			image {
				width:20upx;
				height:10upx;
				vertical-align: 2upx;
				margin-left:-40upx;
			}
			.more-icon {
				display:inline-block;
			}
		}
	}
}
.article-list {
	margin-bottom:20upx;
	padding:0 30upx;
	height:100upx;
	background:#ffffff;
	display:flex;
	justify-content: space-between;
	align-items: center;
	.left {
		color:#3D3D3D;
		font-size:32upx;
		font-weight: bold;
	}
	.right{
		color:#8E8F91;
		font-size:28upx;
		image{
			width:12upx;
			height:20upx;
			margin-left:18upx;
		}
	}
}
.article-comment{
	padding: 40upx 30upx 60upx 30upx;
	background:#fff;
	margin-bottom:100upx;
	.top-title {
		color:#3D3D3D;
		font-size:32upx;
		font-weight: bold;
	}
	.comment-list {
		.comment-item{
			padding:30upx 0;
			border-top:1upx solid #E0E1E8;
			.top {
				display:flex;
				justify-content:space-between;
				align-items:center;
				.left{
					display:flex;
					align-items: center;
					image {
						width:50upx;
						height:50upx;
						border-radius:50%;
						margin-right:20upx;
					}
					text{
						color:#333333;
						font-size:26upx;
					}
				}
				.right{
					.star {
						display: inline-block;
						image {
							width:26upx;
							height:26upx;
							margin-left:8upx;
						}
					}
				}
			}
			.con {
				color:#555555;
				font-size:28upx;
				margin-top:10upx;
			}
			.replay{
				position:relative;
				.con{
					padding:26upx 22upx;
					background:#F3F4F7;
					border-radius:5upx;
					font-size: 28upx;
					.title {
						color:#555555;
						font-weight:bold;
					}
				}
				.caret {
					position:absolute;
					top:-28upx;
					left:16upx;
					border:16upx solid transparent;
					border-bottom-color:#F3F4F7;
				}
			}
		}
		.comment-item:first-child{
			border-top:none;
		}
	}
	
		/* 正在加载 */
		.loadingList{
			width:100%;
			height:270upx;
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
	
	
	.empty{
		width: 100%;
				height:106upx;
				background: #FAFAFC;
				margin-top: 30upx;
				/* padding-top: 100upx;
				padding-bottom: 100upx; */
				
				display: flex;
				/* flex-direction: column; */
				align-items: center;
				justify-content: center;
				.noHaveLeft{
					width:32upx;
					height:24upx;
				}
				.noHaveSmall {
					width:66upx;
					height: 60upx;
					margin-left: 32upx;
				}
				.noHaveRight{
					width:32upx;
					height:24upx;
					
				}
		
				text {
					margin-left: 28upx;
					margin-right: 32upx;
					font-size: 32upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(153, 153, 153, 1);
					/* padding-top: 20upx; */
				}
	}
}
.bottom {
	position:fixed;
	bottom:0;
	width:750upx;
	height:100upx;
	background:#ffffff;
	display:flex;
	justify-content: flex-start;
	// border-top:1upx solid #E0E1E8;
	image{
		width:32upx;
		height:30upx;
		margin-right:8upx;
		vertical-align: -4upx;
	}
	.no-buy{
		display:flex;
		justify-content: space-between;
		align-items: center;
		width:100%;
		height:100upx;
		font-size:28upx;
		.left{
			width:50%;
			height:100upx;
			line-height: 100upx;
			background:#fff;
			color:#666;
			text-align: center;
			border-top:1upx solid #E0E1E8;
		}
		.right{
			width:50%;
			height:100upx;
			line-height: 100upx;
			text-align: center;
			background:#3A5697;
			color:#fff;
		}
	}
	.buy{
		width:100%;
		height:100upx;
		line-height: 100upx;
		text-align: center;
		background:#3A5697;
		color:#fff;
	}
}
.share {
	position:fixed;
	bottom:0;
	width:750upx;
	height:0;
	.mark{
		width:750upx;
		height:100%;
		z-index:9999;
		background:rgba(0,0,0,0.2);		
	}
	.main{
		width:100%;
		position:fixed;
		transition:all .3s linear;
		bottom:-1;
		height:0;
		.top{
			padding:60upx 30upx;
			background:#F0EFEF;
			height:166upx;
			display:flex;
			justify-content: space-between;
			align-items: center;
			.item{
				image{
					width:120upx;
					height:120upx;
				}
			}
		}
		.cancel{
			height:100upx;
			background:#fff;
			text-align: center;
			line-height:100upx;
			color:#36373B;
			font-size:32upx;
		}
	}
}
.shareInit{
	height:100%;
	.main{
		height:384upx;
		bottom:0;
	}
}
</style>
