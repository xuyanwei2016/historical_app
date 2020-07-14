

<template>
	<view class="book-details">
		<view class="cover"></view>
		<view class="book-top">
			<image class="book-cover" :class="{filterCss:!details.isShop||details.isShop==0}" :src="imagePath+details.path" @tap="noShop"></image><!-- :src="imagePath+details.path" -->

			<view class="book-header" :class="{canclePos:showShare}">
				<view class="left" @tap="returnPre">
					<image src="../../static/images/home/return2.png"></image>
				</view>
				<view class="center">
					<text>图片</text>
				</view>
				<view class="right">
					<image @tap="addShopCar" src="../../static/images/books/cart2.png" style="width:38upx;height:38upx;margin-right:30upx;"
					 v-if="!isPayStatus&&(!details.isShop||details.isShop==0)"></image>
					<image src="../../static/images/books/share1.png" style="width:33upx;height:38upx;" @tap="share"></image>
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
							<text>¥</text>
							<text class="big">{{isPay.before}}</text>
							<text>.{{isPay.after}}</text>
						</view>
						<view class="origin" v-if="details.isPay">
							<text class="RMB">¥</text>
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


			<view class="book-comment">
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
		<view class="bottom">
			<view class="bottomBtn">
				
				<view class="shopBtn" v-if="(!details.isShop||details.isShop==0)&&!isPayStatus" @tap="nowShop">立即购买</view>
				<view class="downLoadBtn" v-if="details.isShop==1||isPayStatus" @tap="downLoad">
					<image src="../../static/images/home/download.png" mode="" style="width: 28upx; height: 29upx;"></image>
					下载
				</view>
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
	import uniIcon from "@/components/uni-icon.vue";
	import {
		getbookinfoAPI,
		getInfoAPI,
		addFavoritesAPI
	} from '../../api/resource.js';
	import {
		addShopCarAPI,
		addOrderAPI

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
				commentsTotal: 0,
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: ""
				},
				loadingType: 0,
				providerList:[],
				shareText: 'uni-app可以同时发布成原生App、微信小程序、H5，邀请你一起体验！',
				href:"https://uniapp.dcloud.io",
				image: '',
				shareType:1,
				isShowLoad:false,
				
			}
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
			noShop() {
				if (this.details.isShop == 0) {
					uni.showToast({
						title: '购买后可下载高清图片',
						icon: 'none'
					})
				}

			},
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
					} else { //没有折扣价
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
						console.log(55555)
						/* uni.showToast({
							title: '没有更多的数据了'
						}) */
					}


					uni.stopPullDownRefresh();
				})
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
							type:3
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

			addShopCar() {
				if (!this.$store.state.userId) {
					uni.navigateTo({
						url: '/pages/my/login'
					})
				} else {
					addShopCarAPI({
						memberid: this.$store.state.userId,
						objectid: this.detailsId,
						type: 3
					}).then(res => {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						})
					})
				}

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
						url: '/pages/cart/orders?ids=' + this.details.resourceid
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
						resourceType: 3,
						resourceid: this.detailsId,
					}).then(res => {
						console.log('足迹添加', res.data)
					})
				}

			},

			/* 下载 */
			downLoad() {
				console.log('下载', this.imagePath, this.details.path)
				plus.runtime.openURL(this.imagePath + this.details.path);  
				/* uni.downloadFile({
					url: this.imagePath + this.details.path, //仅为示例，并非真实的资源
					success: (res) => {
						if (res.statusCode === 200) {
							
							console.log(res.tempFilePath)

							var tempFilePaths = res.tempFilePath;
							uni.saveFile({
								tempFilePath: tempFilePaths,
								success: function(res) {
									var savedFilePath = res.savedFilePath;
									 uni.showToast({
										title: '下载地址：' + savedFilePath,
										icon: 'none',
										duration:3000
									});
								}
							});


							
						}
					}
				}); */
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
			/* 分享 */
			async share(e) {
				this.showShare = true;
				
				
					/* console.log('分享通道:'+ e.id +'； 分享类型:' + this.shareType);
					
					if(!this.shareText && (this.shareType === 1 || this.shareType === 0)){
						uni.showModal({
							content:'分享内容不能为空',
							showCancel:false
						})
						return;
					}
					
					if(!this.image && (this.shareType === 2 || this.shareType === 0)){
						uni.showModal({
							content:'分享图片不能为空',
							showCancel:false
						})
						return;
					}
					
					let shareOPtions = {
						provider: e.id,
						scene: e.type && e.type === 'WXSenceTimeline' ? 'WXSenceTimeline' : 'WXSceneSession', //WXSceneSession”分享到聊天界面，“WXSenceTimeline”分享到朋友圈，“WXSceneFavorite”分享到微信收藏     
						type: this.shareType,
						success: (e) => {
							console.log('success', e);
							uni.showModal({
								content: '分享成功',
								showCancel:false
							})
						},
						fail: (e) => {
							console.log('fail', e)
							uni.showModal({
								content: e.errMsg,
								showCancel:false
							})
						},
						complete:function(){
							console.log('分享操作结束!')
						}
					}
					
					switch (this.shareType){
						case 0:
							shareOPtions.summary = this.shareText;
							shareOPtions.imageUrl = this.image;
							shareOPtions.title = '欢迎体验uniapp';
							shareOPtions.href = 'http://uniapp.dcloud.io';
							break;
						case 1:
							shareOPtions.summary = this.shareText;
							break;
						case 2:
							shareOPtions.imageUrl = this.image;
							break;
						case 5:
							shareOPtions.imageUrl = this.image ? this.image : 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png'
							shareOPtions.title = '欢迎体验uniapp';
							shareOPtions.miniProgram = {
								id:'gh_33446d7f7a26',
								path:'/pages/tabBar/component/component',
								webUrl:'http://uniapp.dcloud.io',
								type:0
							};
							break;
						default:
							break;
					}
					
					if(shareOPtions.type === 0 && plus.os.name === 'iOS'){//如果是图文分享，且是ios平台，则压缩图片 
						shareOPtions.imageUrl = await this.compress();
					}
					if(shareOPtions.type === 1 && shareOPtions.provider === 'qq'){//如果是分享文字到qq，则必须加上href和title
						shareOPtions.href = 'http://uniapp.dcloud.io';
						shareOPtions.title = '欢迎体验uniapp';
					}
					uni.share(shareOPtions);
				
				 */
				
			},
		},
		onPageScroll(e) {
			this.showCover = e.scrollTop > 0 ? true : false;
		},
		onLoad(opt) {
			this.isShowLoad=false;
			this.userType = uni.getStorageSync('userType');
			this.detailsId = opt.id;
			this.getImgInfo(opt.id)

			this.imagePath = this.imgURL().slice(0, this.imgURL().length - 1);
			this.saveFootmark();
			
			/* 分享 */
			uni.getProvider({
				service: 'share',
				success: (e) => {
					let data = [];
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '分享到微信好友',
									id: 'weixin'
								})
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type: 'WXSenceTimeline'
								})
								break;
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq'
								})
								break;
							default:
								break;
						}
					}
					this.providerList = data;
				},
				fail: (e) => {
					console.log('获取登录通道失败'+ JSON.stringify(e));
				}
			});
			
			
		},
		/* 下拉刷新 */
		onPullDownRefresh() {
			this.page = 1;
			this.commentList = [];
			this.showMore=false;
			this.showMoreIcon=false;
			this.getImgInfo(this.detailsId);
			/* setTimeout(function () {
			
		}, 1000); */
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
	}

	.book-top {
		position: relative;
		width: 750upx;
		height: 580upx;
		overflow: hidden;
		
		image {
			width: 750upx;
			height: 420upx;
		}

		.book-cover {
			position: absolute;
			width: 750upx;
			height: 420upx;
			top:160upx;
			/* top:-30%; */
			/* z-index: -1; */
			

		}
		.filterCss{
			filter: blur(1.5px);
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
			margin-top: 20upx;
		}

		.left,
		.right {
			margin-top: 30upx;
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

					navigator {
						float: left;
						display: block;
					}

					text {
						color: #4C5679;
						font-family: PingFang-SC-Medium;
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

			.shopBtn {
				font-size: 28upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				height: 100upx;
				line-height: 100upx;
			}

			.downLoadBtn {
				font-size: 28upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				height: 100upx;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					margin-right: 8upx;
				}
			}
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
			bottom: 0;
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
