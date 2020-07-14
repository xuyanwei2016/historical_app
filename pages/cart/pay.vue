<template>
	<view>
		<view class="order-header">
			<view style="width:40upx;height:38upx;margin-top:50upx;" @tap="returnPre">
				<image src="../../static/images/home/return2.png"></image>
			</view>
			<text class="title">选择支付方式</text>
		</view>
		<!-- <view class="mark"></view> -->
		<view class="main">
			<view class="total">
				<view class="right">
					<text>应付款:</text>
					<text class="RMB">¥</text>
					<text class="price">{{total}}</text>
				</view>
			</view>
			<view class="pay-list">
				<view class="pay-item" v-for="(item,index) in payList" :key="index" @tap="changePayIndex(index)">
					<view class="left">
						<view class="icon">
							<image :src="'../../static/images/books/'+item.icon+'.png'"></image>
						</view>
						<view class="name">
							<text>{{item.name}}</text>
							<text class="price">&nbsp;&nbsp;{{item.price}}</text>
							<view class="con">
								<text v-if="item.con">{{item.con}}</text>
							</view>
						</view>
					</view>
					<view class="right">
						<view class="radio" v-if="curPayIndex!=index"></view>
						<image v-else src="../../static/images/books/xuanze.png"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom" v-if="curPayIndex==0">
			<view class="bottom-inner">
				<view class="left" :class="{active:isPoor}" @tap="toAdd">
					<text>去充值</text>
				</view>
				<view class="left" :class="{active:isRich}" @tap="goPay">
					<text>去支付</text>
				</view>
			</view>
		</view>
		<view class="bottom-pay" v-else>
			<view class="pay" @tap="goPay">
				<text>去支付</text>
			</view>
		</view>
		<alertBoxTwo :alertOptions="alertOptions" v-if="isShow"></alertBoxTwo>
		<alertPay :alertPayCont="alertPayCont" v-if="isShowPay"></alertPay>
		<promptBox :promptObj="promptObj"></promptBox>
	</view>
</template>

<script>
	import {
		getaccountbalanceAPI
	} from '../../api/info.js'
	import {
		paymentAPI
	} from '../../api/cart.js'
	export default {
		data() {
			return {
				payList: [{
						icon: 'money',
						name: '余额',
						con: '点击使用余额支付',
						price: 0
					},
					{
						icon: 'zhifubao',
						name: '支付宝'
					},
					{
						icon: 'weixinpay',
						name: '微信'
					},
				],
				curPayIndex: 0,
				total: 0,
				alertOptions: {},
				alertPayCont: {},
				isShowPay: false,
				isRich: false,
				isPoor: false,
				isShow: false,
				promptObj: {}
			};
		},
		methods: {
			returnPre() {
				let _this = this;
				this.isShow = true;
				this.alertOptions = {
					title: '确定要放弃付款吗？',
					confirmText: '放弃',
					cancelText: '取消',
					sure() {
						_this.isShow = false;
						uni.redirectTo({
							url: '/pages/my/order?status=1&back=cart'
						})
					},
					cancel() {
						_this.isShow = false;
					}
				}
			},
			getBalance(total) {
				getaccountbalanceAPI({
					memberid: this.userId
				}).then(res => {
					console.log("获取余额", res.data)
					// console.log(res)
					this.payList[0].price = res.data.value ? res.data.value : 0;
					if (total > res.data.value) {
						this.isPoor = true;
						this.isRich = false;
					} else {
						this.isRich = true;
						this.isPoor = false;
					}
				})
			},
			changePayIndex(index) {
				if ((!this.payList[0].price && index == 0) || (this.payList[0].price < this.total && index == 0)) {
					// return ;
					this.isPoor = true;
					this.isRich = false;
				} else {
					this.isRich = true;
					this.isPoor = false;
				}
				this.curPayIndex = index;
			},
			goPay() {
				if (this.isPoor) {
					uni.showToast({
						title: '余额不足，请充值！',
						icon: 'none'
					})
					return;
				}
				// 				if(this.curPayIndex==null){
				// 					uni.showToast({
				// 						title:'请选择支付方式',
				// 						icon:'none'
				// 					})
				// 					return;
				// 				}
				var payType;
				switch (this.curPayIndex) {
					case 0: //余额支付
						payType = 3;
						break;
					case 1: //支付宝支付
						payType = 1;
						break;
					case 2: //微信支付
						payType = 2;
				}
				paymentAPI({
					orderid: this.orderid,
					payType: payType
				}).then(res => {
					if (res.data.status == 1) {
						/* this.promptObj = {
							isShow:true,
							title:'支付成功！'
						} */
						let n = {
							id: this.$store.state.isPayId,
							isPayStatus: true
						};
						this.$store.commit("changeBuyStatus", n)
						let _this = this;
						this.isShowPay = true;
						this.alertPayCont = {
							title: '支付成功',
							confirmText: '确定',
							show: true,
							/* cancelText:'取消', */
							sure() {
								_this.isShowPay = false;
								uni.redirectTo({
									url: '/pages/my/order?status=2&back=cart'
								});
							},
							cancel() {
								_this.isShowPay = false;
							}
						}

						/* let time = setTimeout(function(){
							uni.redirectTo({
								url:'/pages/my/order?status=2&back=cart'
							});
							clearInterval(time)
						},500) */
					} else {
						this.promptObj = {
							isShow: true,
							title: '支付失败，请重新下单'
						}
					}
				})
			},
			toAdd() {
				uni.navigateTo({
					url: '/pages/my/updateBalance'
				})
			}

		},
		onLoad(opt) {
			this.orderid = opt.id;
			this.total = opt.total;
			this.getBalance(opt.total)
		},
		onShow() {
			this.getBalance(this.total)
		},
		computed: {
			userId() {
				return this.$store.getters.userId
			}
		},
		onBackPress(options) {
			if (this.isShow) {
				this.isShow = false;
				return true;
			} else {
				this.isShow = true;
				this.returnPre()
				return true;
			}

		},
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

	.order-header {
		width: 690upx;
		position: fixed;
		z-index: 11;
		top: 0;
		height: 150upx;
		background:linear-gradient(40deg,#6080CB,#4465B7);
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 0 30upx;

		image {
			width: 23upx;
			height: 38upx;
			z-index: 1;
		}

		.title {
			display: inline-block;
			width: 100%;
			margin-left: -23upx;
			text-align: center;
			font-size: 36upx;
			color: #FFFFFF;
		}

		.title {
			margin-top: 50upx;
		}
	}

	.mark {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: -4;
		background: #f5f5f4;
	}

	.main {
		margin-top: 150upx;
		// padding:0 30upx;
		margin-bottom: 120upx;

		.total {
			height: 76upx;
			line-height: 76upx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			color: #3D3D3D;
			font-size: 28upx;
			padding: 0 30upx;

			.RMB {
				color: #D61F1F;
				font-size: 28upx;
				margin: 0 10upx;
				font-weight: bold;
			}

			.price {
				color: #D61F1F;
				font-size: 36upx;
				font-weight: bold;
				vertical-align: -2upx;
			}
		}

		.pay-list {
			background: #fff;
			padding: 0 30upx;

			.pay-item {
				padding: 25upx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				line-height: 50upx;
				border-top: 1upx solid #E0E1E8;

				.left {
					display: flex;
					justify-content: flex-start;
					align-items: center;

					.icon {
						width: 50upx;
						height: 50upx;
						margin-right: 30upx;

						image {
							width: 50upx;
							height: 50upx;
						}
					}

					.name {
						color: #3D3D3D;
						font-size: 32upx;

						.price {
							color: #D61F1F;
						}

						.con {
							color: #8E8F91;
							font-size: 24upx;
						}
					}

				}

				.right {
					.radio {
						display: inline-block;
						width: 34upx;
						height: 34upx;
						border: 2upx solid #AEB0B8;
						border-radius: 50%;
					}

					image {
						width: 38upx;
						height: 38upx;
					}
				}
			}

					.pay-item:last-child{
						border-bottom: 1upx solid #E0E1E8;
					}
		}
	}

	.bottom {
		position: fixed;
		bottom: 10upx;
		text-align: center;
		line-height: 90upx;
		width: 100%;

		.bottom-inner {
			padding: 0 30upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.left,
		.right {
			width: 320upx;
			height: 90upx;
			line-height: 90upx;
			font-size: 30upx;
			border: 1upx solid #3a5697;
		}

		.left {
			border: 1upx solid #3a5697;
			color: #3a5697;
		}

		// 	.right{
		// 		color:#fff;
		// 		background:#76491D;
		// 	}
		.active {
			color: #fff;
			background: #3a5697;
		}
	}

	.bottom-pay {
		padding: 0 30upx;
		position: fixed;
		bottom: 10upx;
		text-align: center;

		.pay {
			width: 690upx;
			height: 90upx;
			line-height: 90upx;
			font-size: 30upx;
			color: #fff;
			background: #3a5697;
		}
	}
</style>
