<template>
	<view>
		<view class="order-head">
			<view class="head-top">
				<view class="order-returnPre" @tap="returnPre">
					<image src="../../static/images/home/return2.png"></image>
				</view>

				<view class="title">
					<text>我的订单</text>
				</view>
				<view style="width: 40upx;">
				</view>
			</view>
			<view class="head-bottom">
				<view class="bottom-item" :class="{active:curStaInd==index1}" v-for="(item1,index1) in statusList" :key="index1"
				 @tap="changeOrder(item1.status,index1)">
					<text>{{item1.text}}</text>
				</view>
			</view>
		</view>
		<view class="mark"></view>
		<view class="order-main">
			<view class="order-list" v-for="(item,index) in orderList" :key="index">
				<view class="date">
					<text>{{item.createTime}}</text>
				</view>
				<view class="order-item" v-for="(item2,index2) in item.resourceInfo" :key="item2.order.orderid">
					<view class="item-top">
						<view class="order-no">
							<text>订单号：{{item2.order.orderNumber}}</text>
						</view>
						<text class="order-sta">{{item2.order.status==1?'未支付':(item2.order.status==2? '已支付': '已取消')}}</text>
					</view>
					<view class="item-middle" @tap="toOrderDetails(item2.order.orderNumber)">
						<view class="title" v-for="(item3,index3) in item2.list" :key="item3.objectid">
							<text>{{item3.objectName}}</text>
						</view>
						<!-- <view class="title">
							<text>清代两湖地区的出版业清代两湖地区的出版业清代两湖地区的出版业</text>
						</view> -->
					</view>
					<view class="item-bottom">
						<view class="sum">
							合计：
							<text class="RMB">¥</text>
							<!-- <text class="price">{{item2.order.totalPrice}}</text> -->
							<text class="big">{{item2.order.before}}</text>
							<text v-if="item2.order.after" class="small">.{{item2.order.after}}</text>
						</view>
						<!-- 已完成订单 -->
						<navigator class="comment" v-if="item2.order.status==2 && item2.order.commentStatus==2" :url="'sendComment?orderNum='+item2.order.orderNumber">
							<text>评论</text>
						</navigator>
						<view class="comment" v-if="item2.order.status==2 && item2.order.commentStatus==1">
							<text>已评论</text>
						</view>
						<!-- 未支付订单 -->
						<view class="btns" v-if="item2.order.status==1">
							<view class="cancel" @tap="updateOrderStatus(item2.order.orderid)">
								<text>取消订单</text>
							</view>
							<view class="pay" @tap="toPay(item2.order)">
								<text>立即支付</text>
							</view>
						</view>
						<!-- 已取消订单 -->
						<view class="del" v-if="item2.order.status==3" @tap="delOrder(item2.order.orderid)">
							<text>删除</text>
						</view>
					</view>
				</view>
			</view>
			<view style="height: 60upx; width:100%;text-align: center;color: #555555;" v-if="orderList.length>rows">
				{{loadingType==0?loadingText.contentdown:loadingType==1?loadingText.contentrefresh:loadingText.contentnomore}}
			</view>
		</view>
		<promptBox :promptObj="promptObj"></promptBox>
		<alertBox :alertOptions="alertOptions"></alertBox>


<!-- 正在加载中 -->
				<view class="loadingList" v-if="!isShowLoad" >
					<image src="../../static/images/home/loading.png" mode=""></image>
				</view>

		<!-- 暂无数据 -->
		<view class="noHave" v-if="dataTotal==0&&isShowLoad">
			<image src="../../static/images/my/nohave.png" mode=""></image>
			<text>暂无订单</text>
		</view>


	</view>
</template>

<script>
	import {
		getOrdersPageAPI,
		delOrderAPI,
		updateOrderStatusAPI
	} from '../../api/info.js'
	export default {
		data() {
			return {
				statusList: [{
						status: 2,
						text: '已支付订单'
					},
					{
						status: 1,
						text: '未支付订单'
					},
					{
						status: 3,
						text: '已取消订单'
					}
				],
				curStaInd: 0,
				status: 2,
				orderList: [],
				promptObj: {},
				alertOptions: {},
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loadingType: 0,
				dataTotal: 0,
				page: 1,
				pullDown: false,
				rows: 5,
				back: '',
				isShowLoad:false,
			};
		},
		methods: {
			returnPre() {
				var pages = getCurrentPages();
				if(pages.length==1){
					history.back();
				}
				console.log(this.back)
				if (this.back) {
					// 					uni.switchTab({
					// 						url:'/pages/cart/'+this.back
					// 					})
					uni.navigateBack({
						delta: 1
					})
					// 					console.log(getCurrentPages())
					this.$store.commit('changeIsCart', false);
				} else {
					uni.switchTab({
						url: '/pages/my/my'
					})
				}
			},
			getPage() {
				let pages = getCurrentPages();
				let routeArr = [];
				pages.map(v => {
					routeArr.push(v.route)
				});
				console.log(pages)
				console.log(routeArr)
				let i = routeArr.indexOf('pages/home/bookDetails');
				return routeArr.length - 1 - i;
			},
			changeOrder(sta, index) {
				this.isShowLoad=false;
				this.curStaInd = index;
				this.page = 1;
				this.status = sta;
				this.getOrderList();
			},
			getOrderList() {
				getOrdersPageAPI({
					memberid: this.userId,
					page: this.page,
					rows: this.rows,
					status: this.status
				}).then(res => {
					this.isShowLoad=true;
					this.dataTotal = res.data.page.total;
					if (this.pullDown) {
						this.orderList = res.data.page.rows
					} else {
						if (this.dataTotal > 0) {
							if (this.page == 1) {
								this.orderList = res.data.page.rows;
							} else {
								res.data.page.rows.map(v1 => {
									let time = v1.createTime.replace(/-/g, '.');
									let last = this.orderList[this.orderList.length - 1];
									if (last.createTime == time) {
										last.resourceInfo.push(...v1.resourceInfo);
									} else {
										this.orderList.push(v1)
									}
								})
							}
							if (this.dataTotal > this.sum) {
								this.loadingType = 0;
							} else {
								this.loadingType = 2;
							}
						} else {
							this.orderList = []
							this.loadingType = null;
						}
					}

					this.orderList.map(v => {
						v.createTime = v.createTime.replace(/-/g, '.');
						v.resourceInfo.map(v2 => {
							this.splitPrice(v2.order.totalPrice + '', v2.order);
							return v2;
						})
						return v;
					})
					uni.stopPullDownRefresh()
				})
			},
			splitPrice(price, item) {
				if (price.indexOf('.') > 0) {
					let [before, after] = price.split('.');
					item.before = before;
					item.after = after;
				} else {
					item.before = price;
				}

			},
			//跳转到订单详情页
			toOrderDetails(orderid) {
				uni.navigateTo({
					url: `/pages/my/orderDetails?id=${orderid}`
				})
			},
			//删除订单
			delOrder(orderid) {
				let that = this;
				this.alertOptions = {
					show: true,
					title: '确认要删除此订单吗？',
					sure() {
						this.show = false;
						delOrderAPI({
							ordersid: orderid
						}).then(res => {
							this.isShowLoad=false;
							if (res.data.status == 1) {
								that.promptObj = {
									isShow: true,
									title: '订单已删除'
								}
								that.status = 3;
								that.getOrderList()
							}
						})
					},
					cancel() {
						this.show = false;
					}
				}

			},
			//取消订单
			updateOrderStatus(orderid) {
				let that = this;
				this.alertOptions = {
					show: true,
					title: '确定取消此订单吗？',
					sure() {
						this.show = false;
						updateOrderStatusAPI({
							ordersid: orderid
						}).then(res => {
							that.promptObj = {
								isShow: true,
								title: '订单已取消'
							}
							that.status = 1;
							that.getOrderList()
						})
					},
					cancel() {
						this.show = false;
					}
				}

			},
			//立即支付
			toPay(item) {
				uni.navigateTo({
					url: `/pages/cart/pay?id=${item.orderid}&total=${item.totalPrice}`
				})
			}
		},
		onLoad(opt) {
			this.isShowLoad=false;
			if (opt.status == 1) {
				this.status = opt.status;
				this.curStaInd = 1;
			} else if (opt.status == 3) {
				this.status = opt.status;
				this.curStaInd = 2;
			} else {
				this.status = 2;
				this.curStaInd = 0;
			}
			if (opt.back && opt.back == 'cart') {
				this.back = opt.back;
			}
			this.getOrderList()
		},
		onPullDownRefresh() {
			this.page = 1;
			this.pullDowm = true;
			this.getOrderList()
		},
		computed: {
			userId() {
				return this.$store.getters.userId
			}
		},
		onReachBottom() {
			this.sum = 0;
			this.orderList.map(v => {
				this.sum += v.resourceInfo.length;
				return this.sum
			})
			if (this.dataTotal > this.sum) {
				this.loadingType = 1;
				this.page++;
				this.getOrderList();
			} else {
				this.loadingType = 2;
			}
		},
		// #ifdef APP-PLUS
		onBackPress(options) {
			console.log('order', options.from)
			if (options.from === 'navigateBack') {
				return false;
			}
			this.returnPre();
			return true;
		}
		// #endif
	}
</script>

<style lang="less" scoped>
	//单行省略号
	.ellipsis {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.order-head {
		position: fixed;
		width: 100%;
		top: 0;
		height: 236upx;
		background:linear-gradient(40deg,#6080CB,#4465B7);

		.head-top {
			height: 100upx;
			padding: 50upx 30upx 0 20upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.order-returnPre {
				width: 44upx;
				height: 46upx;
				display: block;
				padding-top: 4upx;
				image {
					width: 22upx;
					height: 38upx;
					z-index: 1;
					margin-top: 0upx;
					margin-left: 10upx;
				}

			}


			.title {
				display: inline-block;
				/* width: 100%; */
				/* margin-left: -23upx; */
				text-align: center;
				font-size: 36upx;
				color: #FFFFFF;
			}

			image,
			.title {
				/* margin-top: 50upx; */
			}
		}

		.head-bottom {
			height: 86upx;
			padding: 0 20upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.bottom-item {
				color: #fff;
				font-size: 32upx;
				padding-bottom: 16upx;
			}

			.active {
				border-bottom: 8upx solid #fff;
			}
		}
	}

	.mark {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: -4;
		background: #f5f5f4;
	}

	.order-main {
		margin-top: 236upx;

		.order-list {
			.date {
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				color: #8E8F91;
				font-size: 24upx;
			}

			.order-item {
				background: #fff;
				padding: 0 30upx;
				margin-bottom: 20upx;

				.item-top {
					padding: 30upx 0;
					display: flex;
					justify-content: space-between;
					align-items: center;

					// border-bottom: 1upx solid #E0E1E8;
					.order-no {
						color: #8E8F91;
						font-size: 26upx;
					}

					.order-sta {
						color: #3A5697;
						font-size: 24upx;
					}
				}

				.item-middle {
					padding: 26upx 0;
					border-top: 1upx solid #E0E1E8;
					border-bottom: 1upx solid #E0E1E8;

					.title {
						color: #555555;
						font-size: 28upx;
						line-height: 60upx;
						width: 100%;
						.ellipsis
					}
				}

				.item-bottom {
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: #3D3D3D;
					font-size: 24upx;
					padding: 20upx 0;

					.sum {
						.RMB {
							color: #D61F1F;
							font-size: 28upx;
							margin-right: 8upx;
							font-weight: bold;
						}

						.big {
							color: #D61F1F;
							font-weight: bold;
							font-size: 36upx;
						}

						.small {
							color: #D61F1F;
							font-weight: bold;
							font-size: 28upx;
						}
					}

					.comment,
					.del {
						width: 158upx;
						height: 60upx;
						text-align: center;
						line-height: 60upx;
						background: #3A5697;
						color: #fff;
						font-size: 26upx;
					}

					.btns {
						display: flex;
						align-items: center;

						.cancel,
						.pay {
							width: 158upx;
							height: 60upx;
							line-height: 60upx;
							text-align: center;
							font-size: 26upx;
							border: 1upx solid #3A5697;
						}

						.cancel {
							color: #3A5697;
							margin-right: 20upx;
						}

						.pay {
							color: #fff;
							background: #3A5697;

						}
					}
				}
			}
		}
	}
		/* 正在加载 */
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
</style>
