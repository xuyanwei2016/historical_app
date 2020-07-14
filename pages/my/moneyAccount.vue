<template>
	<view>
		<view class="update-header">
		<view class="update-returnPre" @tap="returnPre">
		<image src="../../static/images/home/return2.png"></image>
		</view>
			
			<text class="title">充值</text>
		</view>
		<view class="mark"></view>
		<view class="main">
			<view class="list">
				<view v-for="(item,index) in list" :key="index" @tap="clickInd(index)" :class="curIndex==index?'itemCss active':'itemCss'">
					<text>{{item}}元</text>
					<view class="price">
						<text>¥ </text>
						<text class="int">{{item}}.0</text>
					</view>
				</view>
			</view>
			<view class="sure" v-if="ispay" @tap="pay">
				<text>确定</text>
			</view>
			<view class="sure" v-if="!ispay">
				<text>确定</text>
			</view>
		</view>
		<promptBox :promptObj="promptObj"></promptBox>
	</view>
</template>

<script>
	import { updateBalanceAPI } from '../../api/info.js'
	export default {
		data() {
			return {
				list:[10,20,30,50,100],
				curIndex:0,
				promptObj:{},
				ispay:true,
			};
		},
		methods:{
			returnPre(){
				uni.navigateBack({
					delta:1
				})
			},
			pay(){
				this.ispay=false;
				var params = {};
				params.memberid = this.userId;
				params.value = this.list[this.curIndex];				
				
				updateBalanceAPI(params).then( res => {
					 this.$store.commit("balanceFn", this.list[this.curIndex]);
						this.promptObj = {
							isShow:true,
							title:'充值成功！'
						}
						this.ispay=true;
						let time = setTimeout(function(){
							uni.navigateBack({
								delta:2
							})
							clearInterval(time)
						},500)
				})
			},
			clickInd(index){
				console.log(1111,index);
				this.curIndex=index;
			},
		},
		computed:{
			userId(){
				return this.$store.getters.userId
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
	// z-index:9;
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
	position:fixed;
	top:0;
	.list{
		display:flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap:wrap;
		.itemCss{
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
				color:#3A5697;
				font-size:22upx;
				border-radius:20upx;
				margin-top:10upx;
				.int{
					font-size:26upx;
				}
			}
		}
		.active{
			border:2upx solid #3A5697;
		}
	}
	.sure{
		width:690upx;
		height:100upx;
		background:#3A5697;
		color:#fff;
		font-size:38upx;
		text-align:center;
		line-height: 100upx;
		margin-top:350upx;
	}
}
.andriod{
	margin-top:128upx;	
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
