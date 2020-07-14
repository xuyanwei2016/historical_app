<template>
	<view class="book-details">
		<view :class="{cover : showCover}"></view>
		<view class="book-top">
			<view class="audioBtn" v-if="!details.isShop||details.isShop==0">

				<image class="audioStartBtn" src="../../static/images/home/start.png" mode="" @tap="startPlayBtn"></image>
				<image class="videoImg" :src="imagePath+details.previewPath"></image>
			</view>

			<video id="myVideo" class="book-cover" :src="imagePath+details.path" :poster="imagePath+details.previewPath" @error="videoErrorCallback"
			 controls="true" v-if="details.isShop==1"></video>

			<view class="book-header">
				<view class="left" @tap="returnPre">
					<image src="../../static/images/home/return2.png"></image>
				</view>
				<view class="center">
					<text>视频</text>
				</view>
				<view class="right">
					<image @tap="addShopCar" src="../../static/images/books/cart2.png" style="width:38upx;height:38upx;margin-right:30upx;"
					 v-if="(!details.isShop||details.isShop==0)&&!isPayStatus"></image>
					<image src="../../static/images/books/share1.png" style="width:33upx;height:38upx;" @tap="showShare = true"></image>
				</view>
			</view>

		</view>
		<view class="book-info">
			<view class="book-intro">
				<view class="title">
					<text>{{details.resourceName}}</text>
				</view>
				<view class="con">
					<!-- <text v-if="showMore && showMoreIcon">{{details.intro}}</text>
					<text>{{details.intro2}}</text> -->
					<view class="conFrom" v-if="details.bookName&&details.bookName!=''" @tap="linkBookDetail('/pages/home/bookDetails?id=',details.bookid,details)">
						《{{details.bookName}}》<text>来源 &gt;</text>
					</view>

					<view class="price">
						<view class="now">
							<text>￥</text>
							<text class="big">{{isPay.before}}</text>
							<text>.{{isPay.after}}</text>
						</view>
						<view class="origin" v-if="details.isPay">
							<text class="RMB">￥</text>
							<text class="small">{{price.before}}</text>
							<text>.{{price.after}}</text>
						</view>

					</view>

					<view class="collect" @tap="addFavorites">
						<image v-if="!details.isFavorites||details.isFavorites==0" src="../../static/images/books/collect.png"></image>
						<image v-if="details.isFavorites == 1" src="../../static/images/books/collected.png"></image>
						<text>收藏</text>
					</view>


				</view>
			</view>





			<view class="imgIntroduce" v-if="details.intro&&details.intro!=''">
				<view class="title">
					<text>内容简介</text>
				</view>
				<view class="con">
					<text v-if="showMore && showMoreIcon">{{details.intro}}</text>
					<text v-else>{{details.intro2}}</text>

					<view class="more-icon" @tap="showMore = !showMore" v-if="details.intro&&details.intro.length>60">
						<!--  v-if="showMoreIcon" -->
						<image v-if="!showMore" src="../../static/images/books/zhankai.png"></image>
						<image v-else src="../../static/images/books/shouqi.png"></image>
					</view>
				</view>

			</view>

			<!-- <navigator class="book-list" :url="'bookCatalog?type=1&id='+details.id">
				<view class="left">
					<text>目录</text>
				</view>
				<view class="right">
					<text>绪论</text>
					<image src="../../static/images/books/return.png"></image>
				</view>
			</navigator>-->
			<view class="book-comment" :style="{marginBottom: (!details.isShop||details.isShop==0)&&!isPayStatus?'100upx':'0'}">
				<text class="top-title">评论</text>
				<view class="comment-list" v-if="commentList.length>0">
					<view class="comment-item" v-for="(item,index) in commentList" :key="index">
						<view class="top">
							<view class="left">
								<image v-if="item.path" :src="imagePath+item.path"></image>
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



				<view style="height: 40upx; width:100%;text-align: center;color: #555555;" v-if="commentList.length>0&&loadingType!=2">
					{{loadingType==0?loadingText.contentdown:loadingType==1?loadingText.contentrefresh:loadingText.contentnomore}}
				</view>

<!-- 正在加载中 -->
				<view class="loadingList" v-if="!isShowLoad" >
					<image src="../../static/images/home/loading.png" mode=""></image>
				</view>

				<!-- 暂无数据 -->
				<view class="noHave" v-if="commentList.length==0&&isShowLoad">
				<img src="../../static/images/home/left.png" alt="" class="noHaveLeft">
					<image src="../../static/images/home/icon.png" mode="" class="noHaveSmall"></image>
					<text>还没有评论，快来评论吧~</text>
					<img src="../../static/images/home/right.png" alt="" class="noHaveRight">

				</view>

			</view>

		</view>
		<view class="bottom" v-if="(!details.isShop||details.isShop==0)&&!isPayStatus">


			<view class="bottomBtn" @tap="nowShop">
				<text>立即购买</text>
			</view>

		</view>
		<view class="share" :class="{shareInit:showShare}">
			<view class="mark" @tap="showShare = false"></view>
			<view class="main">
				<view class="top">
					<view class="item" v-for="(item,index) in shareList" :key="index">
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
	import uniIcon from "@/components/uni-icon.vue";
	import {
		getbookinfoAPI,
		getInfoAPI,
		addFavoritesAPI
	} from '../../api/resource.js';
	import {
		addShopCarAPI
	} from '../../api/cart.js';
	import {
		getCommentsListAPI
	} from '../../api/comment.js'

	import {
		deleteFavoritesAPI,
		saveFootmarkAPI
	} from '../../api/info.js';
	export default {

		data() {
			return {
				showMore: false,
				showMoreIcon: false,
				startList: [1, 2, 3, 4, 5],
				showCover: false,
				details: [],
				price: {},
				isPay: {},
				commentList: [],
				imagePath: '',
				page: 1,
				arr: [1, 2, 3, 4],
				arr2: [6, 7, 8],
				audioVal: 0,
				showShare: false,
				shareList: [{
					icon: 'weixin',
					text: '微信好友'
				}, {
					icon: 'quan',
					text: '微信朋友圈'
				}, {
					icon: 'qq',
					text: 'QQ好友'
				}],
				userType: null,
				detailsId: null,
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: ""
				},
				loadingType: 0,
				commentsTotal: 0,
				isShowLoad:false,
			};
		},
		components: {
			uniIcon
		},
		computed:{
			isPayStatus(){
				if(this.$store.state.isPayId==this.detailsId){
					return this.$store.state.isPayStatus
				}
				
			},
		},
		methods: {
			returnPre() {
				var pages = getCurrentPages();
				if(pages.length==1){
					history.back();
				}
				uni.navigateBack({
					delta: 1
				});
			},
			filterIntro(str) {
				if (!this.showMore) {
					if (str && str.length > 60) {
						this.showMoreIcon = true;
						return str.slice(0, 60) + '...'
					} else {
						this.showMoreIcon = false;
						return str
					}
				} else {
					return str;
				}

			},
			getImgInfo(bookid) {
				let obj = {};
				if (this.userType == 1) { //普通用户
					obj.resourceid = bookid;
					obj.memberid = this.$store.state.userId;
				} else { //机构用户
					obj.resourceid = bookid;
					obj.orgId = this.$store.state.userId;
				}
				getInfoAPI(obj).then(res => {
					this.details = res.data;
					this.details.intro2 = this.filterIntro(this.details.intro);
					//this.details.publishDate = this.details.publishDate.split(' ')[0];
					let numToString = this.details.price + '';
					console.log('钱', numToString.indexOf('.'))
					if (numToString.indexOf('.')) {
						this.price.before = this.details.price.toFixed(2).split('.')[0];
						this.price.after = this.details.price.toFixed(2).split('.')[1];
					} else {
						this.price.before = this.details.price;
						this.price.after = '00';
					}

					let isPayPic = Number(this.details.isPay)
					if (isPayPic) {

						this.isPay.before = isPayPic.toFixed(2).split('.')[0];
						this.isPay.after = isPayPic.toFixed(2).split('.')[1];
					} else {
						this.isPay.before = this.price.before;
						this.isPay.after = this.price.after;
					}
					this.getCommentsList(res.data.resourceid);

				})

			},
			/* 评论 */
			getCommentsList(id) {
				getCommentsListAPI({
					objectid: id,
					page: this.page,
					rows: 5
				}).then(res => {
					this.isShowLoad=true;
					this.commentsTotal = res.data.page.total;
					if (res.data.page.rows.length > 0) {
						this.commentList.push(...res.data.page.rows);
						if(this.commentList.length<res.data.page.total){
							this.loadingType = 0;
						}else{
							this.loadingType = 2;
						}
					} else {
						this.loadingType = null;
						/* uni.showToast({
							title: '没有更多的数据了'
						}) */
					}
					uni.stopPullDownRefresh();
				})
			},
			addShopCar() {
				if (!this.$store.state.userId) {
					uni.navigateTo({
						url: '/pages/my/login'
					})
				} else {
					addShopCarAPI({
						memberid: this.$store.state.userId,
						objectid: this.detailsId,
						type: 4
					}).then(res => {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						})
					})

				}
			},

			/* 收藏 */
			addFavorites() {
				if (!this.$store.state.userId) {
					uni.navigateTo({
						url: '/pages/my/login'
					})
				} else {
					if (this.details.isFavorites == 1) {
						deleteFavoritesAPI({ //取消收藏
							memberid: this.$store.state.userId,
							ids: this.details.resourceid,
						}).then(res => {
							if (res.data.status == 1) {
								this.details.isFavorites = 0;
								uni.showToast({
									title: '已取消收藏',
									icon: 'none'
								})
							}
						})
					} else {
						let params = {
							objectid:this.details.resourceid,
							type:4
						}
						if(this.$store.state.isOrg){
							params.orgId = this.$store.state.userId
						}else {
							params.memberid = this.$store.state.userId
						}
						addFavoritesAPI(params).then(res => {
							// console.log(res)
							if (res.data.status == 1) {
								this.details.isFavorites = 1;
								uni.showToast({
									title: '已加入收藏',
									icon: 'none'
								})
							}
						})
					}

				}
			},

			startPlayBtn() {
				uni.showToast({
					title: '购买后可在线播放',
					icon: 'none'
				})
			},

			/* 视频 */
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			/* 立即购买 */
			nowShop() {
				console.log('立即购买', this.details)
				if (!this.$store.state.userId) {
					uni.navigateTo({
						url: '/pages/my/login'
					})
				} else {
					uni.navigateTo({
						url:'/pages/cart/orders?ids='+this.details.resourceid
					})
					/* addOrderAPI({
						memberid: this.$store.state.userId,
						objectids: this.detailsId,
						totalPrice: this.details.price * 1
					}).then(res => {

						console.log(res)
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						})

					}) */
				}

			},
			/* 我的足迹 */
			saveFootmark() {
				if (this.$store.state.userId) {
					saveFootmarkAPI({
						memberid: this.$store.state.userId,
						resourceType: 4,
						resourceid: this.detailsId,
					}).then(res => {
						console.log('足迹添加', res.data)
					})
				}

			},
			
			linkBookDetail(str, id, val) {
				if (val.bookStatus == 0 || val.bookStatus == 2) {
					uni.navigateTo({
						url: '/pages/my/invalid?type=0'
						})
						} else {
							uni.navigateTo({
								url: str + id
					})
				}
			},
		},
		onPageScroll(e) {
			this.showCover = e.scrollTop > 0 ? true : false;
		},
		onLoad(opt) {
			this.isShowLoad=false;
			this.userType = uni.getStorageSync('userType');
			this.getImgInfo(opt.id)
			this.detailsId = opt.id;
			this.imagePath = this.imgURL().slice(0, this.imgURL().length - 1);
			this.saveFootmark();
		},
		/* 下拉刷新 */
		onPullDownRefresh() {
			console.log('下拉刷新')
			this.commentList = [];
			this.page = 1;
			this.showMore=false;
			this.showMoreIcon=false;
			this.getImgInfo(this.detailsId);
		},

		//上拉加载更多
		onReachBottom() {
			// console.log(555)

			if (this.commentsTotal > this.commentList.length) {
				this.loadingType = 1;
				this.page++;
				setTimeout(() => {
					this.getCommentsList(this.detailsId)
				}, 300)

			} else {
				this.loadingType = 2;
			}
		}
	}
</script>

<style lang="less" scoped>
	//超出两行添加省略号
	.line-clamp {
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	//单行省略号
	.ellipsis {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.cover {
		width: 750upx;
		height: 148upx;
		position: fixed;
		top: 0;
		background: rgba(59, 86, 151, 0.6);
		z-index: 1;
		opacity: 0.9;
	}

	.book-top {

		width: 750upx;
		height: 420upx;
		overflow: hidden;

		.audioBtn {
			width: 100%;
			height: 100%;
			position: relative;
			left: 0upx;
			top: 0upx;


			display: flex;
			justify-content: center;
			align-items: center;

			.audioStartBtn {
				width: 140upx;
				height: 140upx;
				position: absolute;
				z-index: 0;
			}

			.videoImg {
				position: absolute;
				z-index: -1;
				top: 0;
				left: 0;
				width: 750upx;
				height: 420upx;
			}

		}


		video {
			width: 750upx;
			height: 420upx;
		}

		.book-cover {
			width: 750upx;
			height: 420upx;
			/* top:-30%; */
			z-index: 0;


		}
	}

	.book-header {
		position: fixed;
		width: 710upx;
		z-index: 3;
		height: 128upx;
		/* background: rgba(176, 124, 65, 0.6); */
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 22upx 30upx 0 10upx;
		top: 0;
		.left{
			width: 43upx;
			height: 38upx;
			text-align: right;
		}
		.left image {
			width: 23upx;
			height: 38upx;
		}

		.center {
			font-size: 36upx;
			color: #FFFFFF;
			margin-left: 60upx;
			margin-top:20upx;
		}
		.left,.right{
			margin-top:30upx;
		}
	}

	.book-main {
		height: 389upx;
		background: rgba(176, 124, 65, 0.6);
		padding: 0 30upx;
		position: relative;
		margin-top: 128upx;

		.book-item {
			padding: 30upx 0;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.book-image {
				width: 207upx;
				height: 300upx;
				margin-right: 30upx;

				image {
					width: 207upx;
					height: 300upx;
				}
			}

			.book-text {
				height: 300upx;
				color: #FFFFFF;

				.title {
					width: 450upx;
					font-size: 36upx;
					font-weight: bold;
					line-height: 34upx;
					.ellipsis
				}

				.author,
				.ISBN,
				.publish {
					font-size: 26upx;
				}

				.author {
					margin-top: 30upx;
					margin-bottom: 10upx;
				}

			}
		}

		.book-item:first-child {
			border-top: none;
		}
	}

	.book-info {
		min-height: 500upx;
		background: #f5f5f4;
		padding-bottom: 0upx;
		position: relative;

		.book-intro {
			padding: 30upx 30upx;
			color: #3D3D3D;
			background: #ffffff;
			border-bottom: 1upx solid #e0e1e8;

			.title {
				font-weight: bold;
				font-size: 34upx;
				margin-bottom: 20upx;

			}


			.con {
				font-size: 30upx;
				text-indent: 0upx;
				position: relative;

				image {
					width: 20upx;
					height: 10upx;
					vertical-align: 2upx;
					margin-left: -40upx;
				}

				.conFrom {
					font-size: 24upx;
					navigator{ float: left; display: block;}
					text {
						color: #4C5679;
					}
				}

				.more-icon {
					display: inline-block;
				}

				.price {
					margin-top: 30upx;
					margin-bottom: 20upx;
					display: flex;
					justify-content: flex-start;
					align-items: baseline;

					.now {
						font-size: 32upx;
						line-height: 32upx;
						margin-right: 30upx;
						font-weight: bold;
						color: #D61F1F;

						.big {
							font-size: 42upx;
							margin-left: 8upx;
						}
					}

					.origin {
						font-size: 22upx;
						line-height: 22upx;
						text-decoration: line-through;
						color: #8E8F91;

						.small {
							font-size: 28upx;
							margin-left: 8upx;
						}
					}

				}

				.collect {
					position: absolute;
					right: -30upx;
					bottom: 0upx;
					width: 115upx;
					height: 60upx;
					line-height: 60upx;
					background: #FFf;
					border-radius: 36upx 0 0 36upx;
					text-align: center;
					padding-left: 20upx;
					box-shadow: -1px 0px 16px 0px rgba(112, 122, 159, 0.35);

					image {
						width: 29upx;
						height: 25upx;
						margin-right: 10upx;
						vertical-align: -2upx;
						margin-top: 16upx;
					}

					text {
						color: #8E8F91;
						font-size: 26upx;
					}
				}

			}
		}

		.imgIntroduce {
			margin-top: 20upx;
			border-top: 1upx solid #e0e1e8;
			border-bottom: 1upx solid #e0e1e8;
			padding: 40upx 30upx 30upx 30upx;
			color: #3D3D3D;
			background: #ffffff;

			.title {
				height: 40upx;
				font-size: 32upx;
				font-family: PingFang-SC-Bold;
				font-weight: bold;
				color: rgba(61, 61, 61, 1);
				line-height: 40upx;
				margin-bottom: 20upx;
			}

			.con {
				font-size: 30upx;
				text-indent: 60upx;

				image {
					width: 20upx;
					height: 10upx;
					vertical-align: 2upx;
					margin-left: -40upx;
				}

				.more-icon {
					display: inline-block;
				}
			}
		}




	}

	.book-list {
		margin: 20upx 0;
		padding: 0 30upx;
		height: 100upx;
		background: #ffffff;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.left {
			color: #3D3D3D;
			font-size: 32upx;
			font-weight: bold;
		}

		.right {
			color: #8E8F91;
			font-size: 28upx;

			image {
				width: 12upx;
				height: 20upx;
				margin-left: 18upx;
			}
		}
	}

	.book-comment {
		padding: 40upx 30upx 60upx 30upx;
		background: #fff;
		margin-bottom: 100upx;
		margin-top: 20upx;
		border-top: 1upx solid #e0e1e8;
		/* border-bottom: 1upx solid #e0e1e8; */

		.top-title {
			color: #3D3D3D;
			font-size: 32upx;
			font-weight: bold;
		}

		.comment-list {
			.comment-item {
				padding: 30upx 0;
				border-top: 1upx solid #E0E1E8;

				.top {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.left {
						display: flex;
						align-items: center;

						image {
							width: 50upx;
							height: 50upx;
							border-radius: 50%;
							margin-right: 20upx;
						}

						text {
							color: #333333;
							font-size: 26upx;
						}
					}

					.right {
						.star {
							display: inline-block;

							image {
								width: 26upx;
								height: 26upx;
								margin-left: 8upx;
							}
						}
					}
				}

				.con {
					color: #555555;
					font-size: 28upx;
					margin-top: 10upx;
				}

				.replay {
					position: relative;

					.con {
						padding: 26upx 22upx;
						background: #F3F4F7;
						border-radius: 5upx;
						font-size: 28upx;

						.title {
							color: #555555;
							font-weight: bold;
						}
					}

					.caret {
						position: absolute;
						top: -28upx;
						left: 16upx;
						border: 16upx solid transparent;
						border-bottom-color: #F3F4F7;
					}
				}
			}

			.comment-item:first-child {
				border-top: none;
			}
		}
	}

	.loading {
		margin-bottom: 100upx;
	}

	.bottom {
		position: fixed;
		bottom: 0;
		width: 750upx;
		height: 100upx;
		background: #3a5697;

		.bottomBtn {
			width: 100%;
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			font-size: 28upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
		}
	}

	.share {
		position: fixed;
		bottom: 0;
		width: 750upx;
		height: 0;
		z-index: 11;

		.mark {
			width: 750upx;
			height: 100%;
			z-index: 9999;
			background: rgba(0, 0, 0, 0.2);
		}

		.main {
			width: 100%;
			position: fixed;
			transition: all .3s linear;
			bottom: -1;
			height: 0;

			.top {
				padding: 60upx 30upx;
				background: #F0EFEF;
				height: 166upx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.item {
					image {
						width: 120upx;
						height: 120upx;
					}
				}
			}

			.cancel {
				height: 100upx;
				background: #fff;
				text-align: center;
				line-height: 100upx;
				color: #36373B;
				font-size: 32upx;
			}
		}
	}

	.shareInit {
		height: 100%;

		.main {
			height: 384upx;
			bottom: -1upx;
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

	/* 暂无数据 */
	.noHave {
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
</style>
