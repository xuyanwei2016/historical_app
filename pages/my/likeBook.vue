<template>
	<view class="bookshelf">
		<view class="uni-navbar" :class="{'uni-navbar-fixed':true}">

			<view class="loginTop">
				<view class="loginBtn">
					<view class="loginBack" @tap="back">
						<image src="../../static/images/home/return2.png" style="width:22upx; height:38upx;"></image>
					</view>
					<view class="loginText">
						{{title}}
					</view>
					<view class="loginRegister" @tap="megBtn">
						<view v-if="listCont.length>0">{{isCheckBtn?'完成':'管理'}}</view>
					</view>
				</view>
			</view>



		</view>



		<view class="shelfCont" v-bind:style="{marginBottom:megMarginBottom}" v-if="listCont.length>0">
			<view class="bookCss" v-for="(newsitem,index) in listCont" :key=index>

				<view class="orderCont" @longpress="longClick(newsitem)">
					<view class="checkAll" v-if="isCheckBtn" @tap="clickChang(newsitem)">
						<view class="noCheck" v-if="!newsitem.isChecked"></view>
						<image src="../../static/images/books/xuanze.png" mode="" style="height: 38upx; width: 38upx;" v-if="newsitem.isChecked"></image>
					</view>
					<image :src="imagePath+newsitem.cover" mode="" style="width: 160upx;height:220upx;" v-if="newsitem.cover" @tap="linkHref(newsitem)"></image>
					<image src="../../static/images/article/default.png" mode="" style="width: 160upx;height:220upx;" v-if="!newsitem.cover||newsitem.cover==''" @tap="linkHref(newsitem)"></image>
					<!-- <image src="../../static/images/home/book2.png" mode="" style="width: 160upx;height:220upx;"></image> -->

					<view class="wordCon" v-bind:style="{width:megWidth}" @tap="linkHref(newsitem)">
						<view class="title">
							{{newsitem.name}}
						</view>
						<view class="name" v-if="newsitem.author">{{newsitem.author}}</view>
						<view class="price">￥<text>{{newsitem.beforePrice}}</text><text v-if="newsitem.afterPrice">.</text><text style="font-size: 28upx;">{{newsitem.afterPrice}}</text></view>
						<view class="introduce" v-if="newsitem.intro">{{newsitem.intro}}</view>
					</view>

				</view>

			</view>



		</view>




		<view class="load-more" v-if="listCont.length>0">
			<!-- 动图转 -->
			<!-- <view class="loading-img" v-show="loadingType === 1 ">
					<view class="load1">
						<view :style="{background:color}"></view>
						<view :style="{background:color}"></view>
						<view :style="{background:color}"></view>
						<view :style="{background:color}"></view>
					</view>
					<view class="load2">
						<view :style="{background:color}"></view>
						<view :style="{background:color}"></view>
						<view :style="{background:color}"></view>
						<view :style="{background:color}"></view>
					</view>
					<view class="load3">
						<view :style="{background:color}"></view>
						<view :style="{background:color}"></view>
						<view :style="{background:color}"></view>
						<view :style="{background:color}"></view>
					</view>
				</view> -->
			<!-- 动图圈结束 -->
			<text class="loading-text">{{loadingType==0?loadingText.contentdown:loadingType==1?loadingText.contentrefresh:loadingText.contentnomore}}</text>
		</view>


<!-- 正在加载中 -->
<view class="loadingList" v-if="!isShowLoad" >
<image src="../../static/images/home/loading.png" mode=""></image>
</view>
<view class="noHave" v-if="listData.length==0&&isShowLoad">
			<image src="../../static/images/my/nohave.png" mode=""></image>
			<text>暂无图书</text>

		</view>

		




		<view class="managementBox" v-if="isCheckBtn">
			<view class="checkAll" @tap="chackAllBtn">
				<view class="noCheck" v-if="!checkAll"></view>
				<image src="../../static/images/books/xuanze.png" mode="" style="height: 38upx; width: 38upx;" v-if="checkAll"></image>
				全选
			</view>
			<view class="deleteBtn" @tap="deleteBtn">
				删除
			</view>
		</view>






	</view>
</template>

<script>
	import {
		findBookShelfAPI,
		deleteBookAPI
	} from '../../api/my.js';
	export default {
		data() {
			return {
				isCheckBtn: false,
				checkAll: false,
				isShowDrop: false,
				showPopupMiddle: false,
				typeInput: '',
				detailId: '',
				listCont: [],
				listData: [],
				title: '',
				megWidth: '500upx',
				megMarginBottom: '0upx',
				imagePath: '',
				pages: 1,
				dataTotal: 0,
				loadingType: 0,
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				isShowLoad:false,
			};
		},
		onLoad(option) {
			this.isShowLoad=false;
			this.imagePath = this.imgURL().slice(0, this.imgURL().length - 1)
			this.detailId = option.id;
			if (option.title.length > 12) {
				this.title = option.title.substring(0, 12) + '...';
			} else {
				this.title = option.title;
			}

			this.getLikeBook(1);
		},
		methods: {
			/* 长安删除 */
			longClick(item) {
				let self = this;
				self.isCheckBtn = true;

				if (this.isCheckBtn) {
					let curWidth = uni.getSystemInfoSync().screenWidth * 430 / 750;
					let curMarginBottom = uni.getSystemInfoSync().screenWidth * 90 / 750;
					this.megWidth = curWidth + 'px';
					this.megMarginBottom = curMarginBottom + 'px';
				} else {
					let curmegWidth = uni.getSystemInfoSync().screenWidth * 500 / 750;
					this.megWidth = curmegWidth + 'px';
					this.megMarginBottom = '0px';
				}


				this.clickChang(item);

			},




			back() {
				var pages = getCurrentPages();
				if(pages.length==1){
					history.back();
				}
				uni.navigateBack({
					delta: 1
				})
			},
			/* 获取我的书架下的图书 */
			getLikeBook(n) {

				findBookShelfAPI({
					memberid: this.$store.getters.getToken,
					bookShelfId: this.detailId,
					page: this.pages,
					rows: 5,
				}).then(res => {
					this.isShowLoad=true;
					this.listCont.push(...res.data.page.rows);
					if (n == 1) {
						this.listData = res.data.page.rows;
					}

					this.dataTotal = res.data.page.total;
					console.log(555,this.dataTotal > this.listCont.length)
					if (this.dataTotal > this.listCont.length) {
						this.loadingType = 0;
					} else {
						this.loadingType = 2;
					}
					this.listCont.map(val => {
						return this.$set(val, 'isChecked', false)
						/* val.isChecked = false; */
					})

					this.listCont.map((item, index) => {
						if (item.isPay) { //有折扣价
							let ispayString = item.isPay;
							if (ispayString.indexOf('.') >= 0) {
								if (ispayString.split('.')[1] > 10) {
									return item.beforePrice = ispayString.split('.')[0], item.afterPrice = Number(ispayString).toFixed(2).split(
										'.')[1];
								} else {
									return item.beforePrice = ispayString.split('.')[0], item.afterPrice = ispayString.split('.')[1];
								}

							} else {
								return item.beforePrice = ispayString;
							}
						} else {
							let itemString = typeof item.price == 'number' ? item.price + '' : item.price;

							if (itemString.indexOf('.') >= 0) {
								if (itemString.split('.')[1] > 10) {
									return item.beforePrice = itemString.split('.')[0], item.afterPrice = Number(itemString).toFixed(2).split(
										'.')[1];
								} else {
									return item.beforePrice = itemString.split('.')[0], item.afterPrice = itemString.split('.')[1];
								}

							} else {
								return item.beforePrice = itemString;
							}
						}
					})




					uni.stopPullDownRefresh();
				})
			},
			/* 管理按钮 */
			megBtn() {
				this.isCheckBtn = !this.isCheckBtn;

				if (this.isCheckBtn) {
					let curWidth = uni.getSystemInfoSync().screenWidth * 430 / 750;
					let curWidthBottom = uni.getSystemInfoSync().screenWidth * 90 / 750;
					this.megWidth = curWidth + 'px';
					this.megMarginBottom = curWidthBottom + 'px';
				} else {
					let curmegWidth = uni.getSystemInfoSync().screenWidth * 500 / 750;
					this.megWidth = curmegWidth + 'px';
					this.megMarginBottom = '0px';
				}

				let curData = this.listCont;
				for (let i = 0; i < curData.length; i++) {
					curData[i].isChecked = false;
				}

			},
			/* 点击勾选 */
			clickChang(val) {
				console.log('选择', val)
				val.isChecked = !val.isChecked;
				this.checkAll = this.listCont.every(function(item) {
					return item.isChecked
				})
			},

			/* 全选按钮 */
			chackAllBtn() {
				let self = this;
				self.checkAll = !self.checkAll;
				self.listCont.map(function(val) {
					return val.isChecked = self.checkAll;
				})

			},
			/* 删除 */
			deleteBtn() {
				let ids = '';

				this.listCont.map(function(val) {
					if (val.isChecked) {
						return ids = ids + val.bId + ',';
					}

				})
				if (ids == '') {
					uni.showToast({
						title: '请至少选择一条资源',
						icon: 'none'
					});
				} else {
					deleteBookAPI({
						bookShelfId: this.detailId,
						ids: ids,

					}).then(res => {
						this.isShowLoad=false;
						this.promptObj = {
							isShow: true,
							title: res.data.info,
						}
						this.listCont = [];
						
						
						if(this.checkAll){
							this.checkAll = false;
							this.isCheckBtn = false;
							this.megMarginBottom = '0';
							this.megWidth = "500upx";
						}
						this.pages = 1;
						this.getLikeBook(1);
						
					})
				}

			},
			/* 跳轉 */
			linkHref(val) {
				if(val.status==0||val.status==2){
					uni.navigateTo({
						url: '/pages/my/invalid?type=0'
						})
				}else{
					uni.navigateTo({
						url: '/pages/home/bookDetails?id=' + val.bookId
					})
				}
				
			},




		},

		/* 下拉刷新 */
		onPullDownRefresh() {
			console.log('下拉刷新')
			this.pages = 1;
			this.listCont = [];
			this.loadingType = 0;
			this.getLikeBook();
			/* setTimeout(function () {
            
        }, 1000); */
		},


		//上拉加载更多
		onReachBottom() {
			console.log(555)
			if (this.dataTotal > this.listCont.length) {
				this.loadingType = 1;
				this.pages++;
				this.getLikeBook();
			} else {
				this.loadingType = 2;
			}

		}




	}
</script>

<style lang="less" scoped>
	@imgUrl: "http://114.118.7.81:8081/";

	uni-page-body,
	uni-page-refresh {
		display: block;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
	}

	.bookshelf {
		width: 750upx;
		height: 100%;
		background: #fff;

		.uni-navbar {
			display: block;
			position: relative;
			width: 100%;
			background:linear-gradient(40deg,#6080CB,#4465B7);
			overflow: hidden;
			height: 150upx;

		}


		.uni-navbar.uni-navbar-fixed {
			position: fixed;
			z-index: 998;
		}

		.loginTop {
			width: 750upx;
			height: 60upx;
			margin-top: 82upx;

			.loginBtn {
				padding: 0upx 30upx 0 20upx;
				height: 38upx;
				font-size: 36upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				display: flex;
				justify-content: space-between;
				align-items: center;

				.loginBack {
					float: left;
					width: 40upx;
					height: 38upx;
					line-height: 38upx;
					text-align:center;
				}

				.loginText {
					font-size: 36upx;
					height: 38upx;
					line-height: 38upx;
				}

				.loginRegister {
					float: right;
					width: 80upx;
					text-align: right;
					font-size: 32upx;
					height: 38upx;
					line-height: 38upx;
				}
			}
		}

		/* 书架内容 */
		.shelfCont {
			width: 690upx;
			padding: 149upx 30upx 0 30upx;
			background: #fff;
			border-bottom: 1upx solid #E0E1E8;

			/* 图书样式 */
			.bookCss {
				padding-top: 30upx;
				height: 260upx;
				border-top: 1upx solid #E0E1E8;

				.orderTime {
					width: 100%;
					height: 30upx;
					line-height: 30upx;
					font-size: 26upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(102, 102, 102, 1);
					margin-bottom: 30upx;
				}

				.orderCont {
					width: 100%;
					display: flex;
					justify-content: space-between;
					/* align-items: center; */
				}


				image {
					width: 160upx;
					height: 220upx;
					background: #fff;
				}

				.wordCon {
					width: 500upx;
					height: auto;

					.title {
						color: #3D3D3D;
						font-size: 34upx;
						font-family: PingFang-SC-Bold;
						font-weight: bold;
						height: 60upx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;

						navigator {
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}


					}

					.name {
						height: 42upx;
						font-size: 24upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(142, 143, 145, 1);
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.price {
						height: 50upx;
						line-height: 50upx;
						font-size: 28upx;
						font-family: PingFang-SC-Bold;
						font-weight: bold;
						color: rgba(214, 31, 31, 1);

						text {
							font-size: 36upx;
						}
					}

					.introduce {
						height: 75upx;
						font-size: 26upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(85, 85, 85, 1);
						line-height: 38upx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
				}
			}



		}

		/* + */
		.promptCont {

			.promptContbg {
				position: fixed;
				width: 100%;
				height: 100%;
				background: #000;
				opacity: 0.4;
				top: 0;
				left: 0;
				z-index: 1111;
			}

			.newAdd {
				position: absolute;
				top: 300upx;
				left: 30upx;
				width: 690upx;
				height: 385upx;
				background: rgba(255, 255, 255, 1);
				box-shadow: 0upx 4upx 20upx 0upx rgba(165, 166, 168, 0.42);
				border-radius: 30upx;
				opacity: 1;
				z-index: 1112;

				.newAddCont {

					font-size: 34upx;
					font-family: PingFang-SC-Bold;
					font-weight: bold;
					color: rgba(61, 61, 61, 1);
					line-height: 44upx;
					/* margin-bottom: 57upx; */
					opacity: 1;
					text-align: left;
					margin-top: 40upx;
					margin-left: 40upx;
				}

				.newAddInput {
					width: 610upx;
					height: 134upx;
					margin-top: 30upx;
					position: relative;

					textarea {
						width: 570upx;
						height: 94upx;
						margin-left: 40upx;
						background: #F3F4F7;
						font-size: 30upx;
						line-height: 30upx;
						padding: 20upx;
					}

					.newAddNum {
						position: absolute;
						bottom: 4upx;
						right: -24upx;
						color: #ABABB1;
						font-size: 26upx;

					}
				}

				.newAddBtn {
					opacity: 1;
					width: 100%;
					position: absolute;
					/* display: flex;
							justify-content: space-between; */
					height: 88upx;
					font-size: 32upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(76, 86, 121, 1);
					text-align: center;
					left: 0;
					bottom: 0;
					border-top: 1upx #E0E1E8 solid;

					.cancelbtn {
						opacity: 1;
						font-size: 32upx;
						border-right: 1upx #E0E1E8 solid;
						width: 49%;
						float: left;
						height: 88upx;
						line-height: 88upx;
					}

					.determinebtn {
						opacity: 1;
						font-size: 32upx;
						width: 50%;
						float: right;
						height: 88upx;
						line-height: 88upx;
					}
				}

			}


		}


		.DropDown {
			width: 100%;
			height: 100%;

			.DropDownBg {
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, 0.3);
				position: fixed;
				z-index: 2222;
				left: 0;
				top: 0;
			}

			.DownCont {
				background: #fff;
				width: 100%;
				height: 225upx;
				position: absolute;
				bottom: 0;
				z-index: 2333;
				left: 0;

				.resetType {
					height: 112upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 30upx;

					text {
						width: 620upx;
						height: 100%;
						display: flex;
						align-items: center;
						font-size: 34upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(54, 55, 59, 1);
					}

					.borderBot {
						border-bottom: 1upx solid #E0E1E8;
					}
				}
			}

		}

		.checkAll {
			/* margin-top: 60upx; */
			font-size: 24upx;
			color: #585858;
			height: auto;
			display: flex;
			align-items: center;

			.noCheck {
				height: 34upx;
				width: 34upx;
				border: 2upx solid rgba(195, 195, 195, 1);
				border-radius: 50%;
				margin-right: 10upx;
			}

			image {
				margin-right: 10upx;
			}

		}

		.managementBox {
			position: fixed;
			bottom: 0;
			left: 0;
			height: 90upx;
			width: 720upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #fff;
			border-top: 1upx solid #E0E1E8;
			padding-left: 30upx;

			.deleteBtn {
				width: 158upx;
				height: 60upx;
				background: #3a5697;
				line-height: 60upx;
				text-align: center;
				margin-right: 30upx;
				color: #fff;
				font-size: 26upx;
			}
		}


	}
	/* 正在加载中 */
	.loadingList{
		width:100%;
		height:1000upx;
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
		padding-top: 200upx;

		display: flex;
		flex-direction: column;
		align-items: center;

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

	/* 加载更多样式 */
	.load-more {
		display: flex;
		flex-direction: row;
		padding: 20upx 0;
		height: 80upx;
		align-items: center;
		justify-content: center;
	}

	.loading-img {
		height: 24px;
		width: 24px;
		margin-right: 10px;
	}

	.loading-text {
		font-size: 28upx;
		color: #777777;
	}

	.loading-img>view {
		position: absolute;
	}

	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px;
	}

	.load2 {
		transform: rotate(30deg);
	}

	.load3 {
		transform: rotate(60deg);
	}

	.loading-img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #777;
		position: absolute;
		opacity: 0.2;
		transform-origin: 50%;
		-webkit-animation: load 1.56s ease infinite;
	}

	.loading-img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px;
	}

	.loading-img>view view:nth-child(2) {
		-webkit-transform: rotate(180deg);
		top: 11px;
		right: 0px;
	}

	.loading-img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px;
	}

	.loading-img>view view:nth-child(4) {
		top: 11px;
		left: 0px;
	}

	.load1 view:nth-child(1) {
		animation-delay: 0s;
	}

	.load2 view:nth-child(1) {
		animation-delay: 0.13s;
	}

	.load3 view:nth-child(1) {
		animation-delay: 0.26s;
	}

	.load1 view:nth-child(2) {
		animation-delay: 0.39s;
	}

	.load2 view:nth-child(2) {
		animation-delay: 0.52s;
	}

	.load3 view:nth-child(2) {
		animation-delay: 0.65s;
	}

	.load1 view:nth-child(3) {
		animation-delay: 0.78s;
	}

	.load2 view:nth-child(3) {
		animation-delay: 0.91s;
	}

	.load3 view:nth-child(3) {
		animation-delay: 1.04s;
	}

	.load1 view:nth-child(4) {
		animation-delay: 1.17s;
	}

	.load2 view:nth-child(4) {
		animation-delay: 1.30s;
	}

	.load3 view:nth-child(4) {
		animation-delay: 1.43s;
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0.2;
		}
	}
</style>
