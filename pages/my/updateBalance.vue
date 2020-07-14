<template>
	<view>
		<view class="update-header">
			<view class="update-returnPre" @tap="returnPre">
				<image src="../../static/images/home/return2.png"></image>
			</view>
			
			<text class="title">充值</text>
		</view>
		<view class="mark"></view>
		<view class="andriod" >
			<view class="title">
				<text>请选择付款方式</text>
			</view>
			<view class="pay-list">
				<view class="pay-item" v-for="(item,index) in payList" :key="index" @tap="updateBalance(index)">
					<view class="left">
						<view class="icon">
							<image :src="'../../static/images/books/'+item.icon+'.png'" ></image>
						</view>
						<view class="name">
							<text>{{item.name}}支付</text>
							<text class="price" v-if="item.price">&nbsp;&nbsp;{{item.price}}</text>
							<view class="con">
								<text v-if="item.con">{{item.con}}</text>
							</view>
						</view>
					</view>					
					<view class="right" >
						<view class="radio" v-if="curPayIndex!=index"></view>
						<image v-else src="../../static/images/books/xuanze.png"></image>					
					</view>
				</view>				
			</view>
			<view class="intro">
				<view class="title">
					<text>使用说明</text>
				</view>
				<view class="con">
					<view>
						<text>1. 充值金额（金币）与人民币比例为1：1。</text>
					</view>
					<view>
						<text>2. 充值金额仅用于资源库购买资源使用。</text>
					</view>
					<view>
						<text>3. 充值金额没有使用期限，会一直保存在你的账户内,可以随时使用。</text>
					</view>
					<view>
						<text>4. 充值金额不能退回，不能提现。</text>
					</view>
					<view>
						<text>5. 充值到账时间可能有延迟。如果交易超过一小时仍未到账，请致电客服</text><text class="phone" @tap="call('010-84015100')">010-84015100</text><text>咨询。</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payList:[					
					{
						icon:'zhifubao',
						name:'支付宝'
					},
					{
						icon:'weixinpay',
						name:'微信'
					},
				],
				curPayIndex:null,
			};
		},
		methods:{
			returnPre(){
				uni.navigateBack({
					delta:1
				})
			},
			updateBalance(index){
				this.curPayIndex = index;
				uni.navigateTo({
					url:'/pages/my/moneyAccount'
				})
			},
			call(num){
// 				uni.makePhoneCall({
// 					phoneNumber: num 
// 				});
			}
		}
	}
</script>

<style lang="less" scoped>
.update-header {
	width:690upx;
	position:fixed;
	top:0;
	height:150upx;
	background:linear-gradient(40deg,#6080CB,#4465B7);
	display:flex;
	justify-content: flex-start;
	align-items: center;
	padding:0 30upx 0 20upx;
	
	.update-returnPre{
		width:40upx;
		height:38upx;
		display: block;
		margin-top: 48upx;
		image{
		width:23upx;
		height:38upx;
		z-index:1;
		margin-top:0upx;
		margin-left: 10upx;
	}
	}
	
	
	
	// z-index:9;
	
	.title {
		display:inline-block;
		width:100%;
		margin-left:-23upx;
		text-align: center;
		font-size:36upx;
		color:#FFFFFF;
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
.main{
	margin-top:150upx;
	padding:30upx 30upx 0;
	.list{
		display:flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap:wrap;
		.item{
			background:#fff;
			width:334upx;
			height:170upx;
			color:#3D3D3D;
			font-size:38upx;
			display:flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom:20upx;
			border-radius:5upx;
			.price{
				width:130upx;
				height:40upx;
				line-height:40upx;
				text-align: center;
				background:#F1ECE8;
				color:#76491D;
				font-size:22upx;
				border-radius:20upx;
				margin-top:10upx;
				.int{
					font-size:26upx;
				}
			}
		}
		.active{
			border:2upx solid #76491D;
		}
	}
	.sure{
		width:690upx;
		height:100upx;
		background:#76491D;
		color:#fff;
		font-size:38upx;
		text-align:center;
		line-height: 100upx;
		margin-top:350upx;
	}
}
.andriod{
	margin-top:150upx;	
	position:fixed;
	top:0;
	.title{
		padding:0 30upx;
		height:68upx;
		line-height:68upx;
		color:#3D3D3D;
		font-size:28upx;
	}
	.pay-list{
		background:#fff;
		.pay-item{
			display:flex;
			justify-content: space-between;
			align-items: center;
			line-height:50upx;
			padding:25upx 30upx;
			.left{
				display:flex;
				justify-content: flex-start;
				align-items: center;
				.icon{
					width:50upx;
					height:50upx;
					margin-right:30upx;
					image{
						width:50upx;
						height:50upx;
					}
				}
				.name{
					color:#3D3D3D;
					font-size:32upx;
					.price{
						color:#D61F1F;
					}
					.con{
						color:#8E8F91;
						font-size:24upx;
					}
				}
				
			}
			.right{
				.radio{
					display:inline-block;
					width:34upx;
					height:34upx;
					border:2upx solid #AEB0B8;
					border-radius:50%;
				}
				image{
					width:38upx;
					height:38upx;
				}
			}
		}
		.pay-item:first-child{
			border-bottom:1upx solid #E0E1E8;
		}
	}
	.intro{
		margin-top:70upx;
		padding:0 30upx;
		.title{
			padding:0;
			font-size:32upx;
			color:#3D3D3D;
			font-weight:bold;
		}
		.con{
			color:#8E8F91;
			font-size:26upx;
			line-height:46upx;
			.phone{
				color:#4AA0FF;
				text-decoration: underline;
			}
		}
	}
}
</style>
