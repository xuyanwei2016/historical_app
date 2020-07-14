<template>
	<view>
		<view class="top">
			<image class="cover" src="../../static/images/my/bg_top.png"></image>
			<view class="my-header">
				<!-- <image class="return" src="../../static/images/home/return2.png"></image> -->
				<view class="empty"></view>
				<text>我的</text>
				<image @tap="toMymsg" src="../../static/images/my/xiaoxi.png"></image>
				<image class="icon" v-if="isReadMsg" src="../../static/images/my/icon.png" mode=""></image>
			</view>
			<view class="login" v-if="!isLogin">
				<view class="center">
					<view class="image">
						<image src="../../static/images/my/header.png"></image>
					</view>					
					<navigator class="btn" url="login">
						<text>登录</text>
					</navigator>
				</view>
			</view>
			<view class="login login2" v-if="isLogin">
				<view class="center" @tap="toInfo" >
					<view class="image">
						<image v-if="infoList.headPortrait" class="head-img" :src="imagePath+infoList.headPortrait"></image>
						<image v-else  src="../../static/images/my/header.png"></image>
						<view class="edit" >
							<image src="../../static/images/my/edit.png"></image>
						</view>						
					</view>		
					<view class="name">
						<text>{{infoList.memberName || infoList.uname}}</text>
					</view>
				</view>
			</view>
			<view class="middle">
				<view class="list">
					<view class="item" v-for="(item,index) in myList" :key="index" @tap="jump(item)">
						<image :src="'../../static/images/my/'+item.icon+'.png'"></image>
						<view class="con">
							<text>我的{{item.text}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>		
		<view class="other">
			<view class="bg"></view>
			<view class="main">
				<view class="item" @tap="toOthers('balance')">
					<text>账户余额</text>
					<image src="../../static/images/home/return1.png" mode=""></image>
				</view>
				<view class="item" @tap="toOthers('sub')" v-if="infoList.orgcode">
					<text>我的订阅</text>
					<image src="../../static/images/home/return1.png" mode=""></image>
				</view>
				<view class="item" @tap="toOthers('view')">
					<text>意见反馈</text>
					<image src="../../static/images/home/return1.png" mode=""></image>
				</view>
				<view class="item" @tap="toOthers('showShare')">
					<text>分享APP</text>
					<image src="../../static/images/home/return1.png" mode=""></image>
				</view>
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
	import { getinfoAPI, getMessageAPI } from '../../api/info.js'
	export default {
		data() {
			return {
				myList:[
					{
						icon:'store',
						text:'收藏'
					},
					{
						icon:'foot',
						text:'足迹'
					},
					{
						icon:'book',
						text:'书架'
					},
					{
						icon:'buy',
						text:'购买'
					},
					{
						icon:'order',
						text:'订单'
					},
					{
						icon:'comment',
						text:'评论'
					},
				],
				other:[
					{
						text:'账户余额',
						url:'balance'
					},
					{
						text:'我的订阅',
						url:'sub'
					},
					{
						text:'意见反馈',
						url:'view'
					},
					{
						text:'分享APP',
						url:'showShare'
					}
				],
				// isLogin:true,
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
				showShare:false,
				infoList:{},
				// isReadMsg:false
				imagePath:''
			};
		},
		methods:{
			toInfo(){
				uni.navigateTo({
					url:'/pages/my/info'
				})
			},
			toOthers(url){
				console.log(url)
				if(url!='showShare' && !this.isLogin ){
					uni.navigateTo({
						url: '/pages/my/login'
					})
					/* uni.showToast({
						title:'请先登录！',
						icon:'none'					
					}) */
					return ;
				}
				if(url=='showShare'){
					this.showShare = true;
				}else {
					uni.navigateTo({
						url:'/pages/my/'+url
					})
				}
			},
			toMymsg(){
				if(!this.isLogin){
					uni.navigateTo({
						url: '/pages/my/login'
					})
					/* uni.showToast({
						title:'请先登录！',
						icon:'none'					
					}) */
					return ;
				}
				uni.navigateTo({
					url:'/pages/my/myMsg'
				})
			},
			jump(item){
				if(!this.isLogin){
					uni.navigateTo({
						url: '/pages/my/login'
					})
					/* uni.showToast({
						title:'请先登录！',
						icon:'none'					
					}) */
					return ;
				}
				uni.navigateTo({
					url:`/pages/my/${item.icon}`
				})
			},
			getInfo(){
				if(this.isLogin){
					getinfoAPI({
						userid:this.userId
					}).then( res => {
						this.infoList = res.data.uniqueValue;
						uni.stopPullDownRefresh()
					})
				}
			},
			getMsg(){
				getMessageAPI({
					memberid:this.userId
				}).then( res => {
					this.$store.commit('changeMsg',res.data.msg.some( v => v.isRead==0));
				})
			}
		},	
		computed:{
			isLogin(){
				return this.$store.getters.isLogin;
			},
			userId(){
				return this.$store.getters.userId;
			},
			isReadMsg(){
				return this.$store.getters.getIsReadMsg;
			},
			
		},
		onLoad() {
			this.getMsg();
			this.getInfo();
			this.imagePath = this.imgURL();
		},
		onShow(){
			this.getInfo();
			this.getMsg();
		},
		onPullDownRefresh() {
			this.getMsg();
			this.getInfo();
		}
	}
</script>

<style lang="less" scoped>
@imgUrl:"http://114.118.7.81:8081/h5/img/";

.top{
	height:550upx;
	position: relative;
	
	.cover{
		width:100%;
		height:550upx;
		z-index:-1;
		position:fixed;
	}
	.my-header{		
		height:150upx;
		display:flex;
		justify-content: space-between;
		align-items: center;
		color:#fff;
		font-size:36upx;
		padding:0 30upx;
		.empty{
			width:38upx;
			height:38upx;
		}
		image{
			width:38upx;
			height:38upx;
		}
		.return {
			width:22upx;
			margin-right:16upx;
		}
		image,text,.return {
			margin-top:50upx;
		}
		.icon{
			width:16upx;
			height:16upx;
			position:absolute;
			right:24upx;
			top:28upx;
		}
	}
	.login{
		display:flex;
		justify-content: center;
		align-items: center;
		margin-top:64upx;
		// -webkit-tap-highlight-color:rgba(255,0,0,0);
		-webkit-tap-highlight-color:transparent;
		.center{
			.image{
				text-align: center;
				margin-bottom:20upx;
				image{
					width:140upx;
					height:140upx;
					border-radius:50%;
				}
			}
			.btn{
				width:230upx;
				height:70upx;
				background:#fff;
				color:#4C5679;
				font-weight: bold;
				font-size:32upx;
				line-height:70upx;
				text-align: center;
				box-shadow:-1upx 0upx 16upx 0upx rgba(123,78,34,0.24);
			}
		}
	}
	.login2{
		.center{
			// text-align: center;
			color:#fff;
			font-size: 36upx;
			// font-weight:bold;
			display:flex;
			justify-content: center;
			align-items:center;
			flex-direction: column;
			.image{
				position:relative;
				width:126upx;
				height:126upx;
				text-align: center;
						
				.head-img{
					width:126upx;
					height:126upx;
					border-radius:50%;
					border:2upx solid #fff;
					object-fit: cover;
					object-position: top;
					
				}
				.edit{
					position:absolute;
					bottom:-8upx;
					right:-18upx;
					width:46upx;
					height:46upx;
					border-radius:50%;
					background:rgba(255,255,255,0.8);
					image{
						width:26upx;
						height:26upx;
						border-radius:0;
					}
				}
			}
			.name{
				font-size:36upx;
			}
		}
	}
	.middle{
		width:690upx;
		height:316upx;
		position:absolute;
		bottom:-240upx;
		left:30upx;
		background:#fff;
		background-size:100% 100%;
		box-shadow:1upx 1upx 21upx 0upx rgba(153,153,153,0.25);
		border-radius:10upx;
		.list {
			padding:0upx 54upx 50upx;
			display:flex;
			justify-content:space-between;
			align-items:center;
			flex-wrap:wrap;
			.item{
				width:26%;
				margin-top:50upx;
				text-align: center;
				image{
					width:40upx;
					height:40upx;
				}
				.con{
					color:#3D3D3D;
					font-size: 24upx;
				}
			}
		}
	}
	
}
.other{
	height:100%;
	padding-bottom:60upx;
	.bg{
		position:fixed;
		width:100%;
		height:100%;
		background-image:url('@{imgUrl}bj.png');
		background-size:100% 100%;
		z-index:-1;
	}
	.main{
		background-image:url('@{imgUrl}fenlei.png');
		background-size:100% 100%;
		padding:0 30upx;
		padding-top:250upx;
		.item{
			padding:30upx 0;
			display:flex;
			justify-content: space-between;
			align-items: center;
			border-bottom:1px solid rgba(174,176,184,0.4);
			color:#3D3D3D;
			font-size: 30upx;
			line-height:34upx;
			image{
				width:16upx;
				height:26upx;
			}
		}
		.item:first-child{
			border-top:none;
		}
	}
}
.share {
	position:fixed;
	bottom:0;
	width:750upx;
	height:0;
	z-index: 1111;
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
