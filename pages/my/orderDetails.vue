<template>
	<view>
		<view class="orderDetails-top">
			<view style="width:40upx;height:38upx;margin-top:50upx;" @tap="returnPre">
				<image src="../../static/images/home/return2.png" ></image>
			</view>	
			<text class="title">订单详情</text>
		</view>
		<view class="no-pay" v-if="orderMsg.status==1">
			<view class="wait">
				<text>等待付款</text>
			</view>
			<view class="wait-time">
				<text v-if="time">剩余时间 : {{time}}</text>
				<text v-else>剩余时间 : 计算中...</text>
			</view>
			<view class="pay-price">
				<text>需付款 : ¥ {{orderMsg.totalPrice}}</text>
			</view>
		</view>
		<view class="mark"></view>
		<view class="orderDetails-main" :class="{orderDetails:orderMsg.status==1}">
			<view class="resource-title">
				<text>资源</text>
			</view>
			<view class="details-list" v-for="(item,index) in orderDetailsList" :key="index">
					<!-- 图书列表 -->
					<view class="book-list" v-if="item.objectType == 1">
						<view class="item">
							<view class="left" @tap="toDetails('bookDetails',item.objectid,item.status,item)">
								<image v-if="item.url && !item.showDefault" :src="imagePath+item.url" @error="item.showDefault=true"></image>
								<image v-if="!item.url || item.showDefault" src="../../static/images/article/default.png"></image>
								<view class="upImg" v-if="item.status!=1">
									<image src="../../static/images/my/invalid1.png" style="width: 120upx;height:91upx;" mode=""></image>
								</view>
							</view>
							<view class="right" @tap="toDetails('bookDetails',item.objectid,item.status,item)">
								<view class="title">
									<text>{{item.objectName}}</text>
								</view>
								<view class="price">
									<text>￥</text>
									<text class="big"> {{item.before}}</text>
									<text v-if="item.after" style="fontSize:28upx;">.{{item.after}}</text>
								</view>
								<view class="author" v-if="item.author">
									<text>作者&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;{{item.author}}</text>
								</view>
								<view class="publish" v-if="item.publishDate">
									<text>出版时间&nbsp;:&nbsp;{{item.publishDate}}</text>
								</view>
							</view>
						</view>
					</view>
					
					<!-- 其他列表 -->
					<view class="other-list" v-if="item.objectType == 6">
						<view class="item">
							<view class="left" @tap="toDetails('otherDetails',item.objectid,item.status,item)">
								<image v-if="item.otherType ==1" src="../../static/images/home/excel.png" ></image>
								<image v-if="item.otherType ==2" src="../../static/images/home/word.png"></image>
								<image v-if="item.otherType ==3" src="../../static/images/home/ppt.png"></image>
								<image v-if="item.otherType ==4" src="../../static/images/home/pdf.png"></image>
								<image v-if="item.otherType ==5" src="../../static/images/home/rar.png"></image>
								<image v-if="item.otherType ==6" src="../../static/images/home/default.png"></image>
								<view class="upImg" v-if="item.status!=1">
									<image src="../../static/images/my/invalid1.png" style="width: 120upx;height:91upx;" mode=""></image>
								</view>
							</view>
							<view class="right" @tap="toDetails('otherDetails',item.objectid,item.status,item)">
								<view class="title" >
									<text>{{item.objectName}}</text>
								</view>
								<view class="price">
									<text>￥</text>
									<text class="big"> {{item.before}}</text>
									<text v-if="item.after" style="fontSize:28upx;">.{{item.after}}</text>
									<!-- <text class="big">26</text>
									<text>.6</text> -->
								</view>
								<view class="origin" v-if="item.bookName" @tap.stop="toDetails('bookDetails',item.bookid,item.bookStatus,item)">
									<text>《{{item.bookName}}》</text>&nbsp;&nbsp;
									<text class="from">来源 &gt;</text>
								</view>
							</view>
						</view>
					</view>
					
					<!-- 图片等列表布局一致(除文章外) -->
					<view class="img-list" v-if="item.objectType == 3">
						<view class="item">
							<view class="left" @tap="toDetails('imgDetails',item.objectid,item.status,item)">
								<image :src="imagePath+item.url"></image>
								<view class="upImg" v-if="item.status!=1">
									<image src="../../static/images/my/invalid1.png" style="width: 120upx;height:91upx;" mode=""></image>
								</view>
							</view>
							<view class="right" @tap="toDetails('imgDetails',item.objectid,item.status,item)">
								<view class="title">
									<text>{{item.objectName}}</text>
								</view>
								<view class="price">
									<text>￥</text>
									<text class="big"> {{item.before}}</text>
									<text v-if="item.after" style="fontSize:28upx;">.{{item.after}}</text>
								</view>
								<view class="origin" @tap.stop="toDetails('bookDetails',item.bookid,item.bookStatus,item)" v-if="item.bookName">
									<text>《{{item.bookName}}》</text>&nbsp;&nbsp;
									<text class="from">来源 &gt;</text>
								</view>
							</view>
						</view>
					</view>
					
					<!-- 音频列表 -->
					<view class="audio-list" v-if="item.objectType == 5">
						<view class="item">
							<view class="left" @tap="toDetails('audioDetails',item.objectid,item.status,item)">
								<image src="../../static/images/audio/yinpin.png" mode=""></image>
								<text class="time">02:34</text>
								<view class="upImg" v-if="item.status!=1">
									<image src="../../static/images/my/invalid1.png" style="width: 120upx;height:91upx;" mode=""></image>
								</view>
							</view>
							<view class="right" @tap="toDetails('audioDetails',item.objectid,item.status,item)">
								<view class="title">
									<text>{{item.objectName}}</text>
								</view>
								<view class="price">
									<text>￥</text>
									<text class="big"> {{item.before}}</text>
									<text v-if="item.after" style="fontSize:28upx;">.{{item.after}}</text>
								</view>
								<view v-if="item.bookName" class="origin" @tap.stop="toDetails('bookDetails',item.bookid,item.bookStatus,item)">
									<text>《{{item.bookName}}》</text>&nbsp;&nbsp;
									<text class="from">来源 &gt;</text>
								</view>
							</view>
						</view>
					</view>
					
					<!-- 视频列表 -->
					<view class="video-list" v-if="item.objectType == 4">
						<view class="item">
							<view class="left" @tap="toDetails('videoDetails',item.objectid,item.status,item)">
								<image v-if="item.url" :src="imagePath+item.url"></image>
								<!-- <image v-else src="../../static/images/audio/yinpin.png" ></image> -->
								<text class="time">02:34</text>
								<view class="upImg" v-if="item.status!=1">
									<image src="../../static/images/my/invalid1.png" style="width: 120upx;height:91upx;" mode=""></image>
								</view>
							</view>
							<view class="right" @tap="toDetails('videoDetails',item.objectid,item.status,item)">
								<view class="title">
									<text>{{item.objectName}}</text>
								</view>
								<view class="price">
									<text>￥</text>
									<text class="big"> {{item.before}}</text>
									<text v-if="item.after" style="fontSize:28upx;">.{{item.after}}</text>
								</view>
								<view class="origin" v-if="item.bookName" @tap.stop="toDetails('bookDetails',item.bookid,item.bookStatus,item)">
									<text>《{{item.bookName}}》</text>&nbsp;&nbsp;
									<text class="from">来源 &gt;</text>
								</view>
							</view>
						</view>
					</view>
					
					<!-- 文章列表 -->
					<view class="article-list" v-if="item.objectType == 2">
						<view class="item"  @tap="toDetails('articleDetails',item.objectid,item.status,item)">
							<view class="title">
								<text>{{item.objectName}}</text>
							</view>
							<view class="price">
								<text>￥</text>
								<text class="big"> {{item.before}}</text>
								<text v-if="item.after" style="fontSize:28upx;">.{{item.after}}</text>
							</view>
							<view v-if="item.bookName" class="origin" @tap.stop="toDetails('bookDetails',item.bookid,item.bookStatus,item)">
								<text>《{{item.bookName}}》</text>&nbsp;&nbsp;
								<text class="from">来源 &gt;</text>
							</view>
						</view>
						<view class="upImg" v-if="item.status!=1">
							<image src="../../static/images/my/invalid1.png" style="width: 120upx;height:91upx;" mode=""></image>
						</view>
					</view>
			</view>
			<view class="price2">
				<view class="border-top">
					<text>总金额:</text>
					<text class="RMB">¥</text>
					<view class="total">
						<text>{{orderMsg.before}}</text>
						<text v-if="orderMsg.after" style="fontSize:28upx;">.{{orderMsg.after}}</text>
					</view>
				</view>				
			</view>
			<view class="orderDetails-msg">
				<view class="pay-top">
					<view class="title">
						<text>订单详情</text>
					</view>
					<view class="msg">
						<view class="order-no">
							<text>订单编号 ：{{orderMsg.orderNumber}}</text>
						</view>
						<view class="order-time">
							<text>下单时间 ：{{orderMsg.createDate}}</text>
						</view>
						<!-- 仅支付成功显示 -->
						<view class="pay-time" v-if="orderMsg.status==2">
							<text>付款时间 ：{{orderMsg.buyTime}}</text>
						</view>
					</view>
					<!-- 仅支付成功显示 -->
					<view class="pay-mode" v-if="orderMsg.status==2 && orderMsg.payment_mode">
						<text>支付方式 : {{orderMsg.payment_mode}}</text>
					</view>
				</view>
				<view class="pay-bottom">
					<!-- 未支付订单显示 -->
					<view class="noPay-bottom" v-if="orderMsg.status==1">
						<view class="cancel" @tap="updateOrderStatus">
							<text>取消订单</text>
						</view>
						<view class="pay-now" @tap="toPay">
							<text>立即支付</text>
						</view>
					</view>
					<!-- 已取消订单显示 -->
					<view class="cancelPay-bottom"  v-if="orderMsg.status==3">
						<view class="cancel" @tap="delOrder">
							<text>删除</text>
						</view>
					</view>
				</view>				
			</view>
		</view>
		<promptBox :promptObj="promptObj"></promptBox>
		<alertBox :alertOptions="alertOptions"></alertBox>
	</view>
</template>

<script>
	import { getOrdersDetailsAPI, updateOrderStatusAPI, delOrderAPI} from '../../api/info.js'
	export default {
		data() {
			return {
				orderDetailsList:[],
				orderMsg:{},
				promptObj:{},
				alertOptions:{},
				imagePath:'',
				time:''
			};
		},
		methods:{
			returnPre(){
				var pages = getCurrentPages();
				if(pages.length==1){
					history.back();
				}
				uni.navigateBack({
					delta: 1
				});
			},
			getOrderDetailsList(id){
				getOrdersDetailsAPI({
					orderNumber:id
				}).then( res => {
					// console.log(res)
					this.orderMsg = res.data.order;
					this.orderDetailsList = res.data.orderList;
					this.orderDetailsList.map( v => {
						this.$set(v,'showDefault',false);
						if(v.objectType ==1){
							if(v.publishDate){
								v.publishDate = v.publishDate.split(' ')[0];
							}
						}
						if(v.objectType !=1 && v.objectType !=2 ){
							if(v.bookName){ 
								v.bookName = v.bookName.length>12 ? v.bookName.slice(0,12)+'...' : v.bookName;
							}
						}
// 						if(v.isPay){
// 							// isPay为string类型
// 							this.splitPrice(v.isPay,v);
// 						}else {
// 							// price字段为number类型
// 							this.splitPrice(v.price+'',v)
// 						}
						this.splitPrice(v.totalPrice+'',v)
						if(v.objectType == 6){//其他类型
							var type = v.url.slice(v.url.lastIndexOf('.')+1);
							switch(type){
								case 'xls': 
								case 'xlsx':
									v.otherType = 1;
									break;
								case 'doc': 
								case 'docx': 
									v.otherType = 2;
									break;
								case 'ppt': 
								case 'pptx':
									v.otherType = 3;
									break;
								case 'pdf': 
									v.otherType = 4;
									break;
								case 'rar':
									v.otherType = 5;
									break;
								default:
									v.otherType = 6;
							}
						}
						return v;
					})
					let totalPrice = this.orderMsg.totalPrice+'';
					if(totalPrice.indexOf('.')>0){
						let [before,after] = totalPrice.split('.');
						this.orderMsg.before = before;
						this.orderMsg.after = after;
					}else {
						this.orderMsg.before = totalPrice;
					}
					this.getTime()
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
			//取消订单
			updateOrderStatus(){
				this.alertOptions = {
					show: true,
					title: '确定取消此订单吗？',
					sure() {
						updateOrderStatusAPI({
							ordersid:this.orderMsg.orderid
						}).then( res => {
							// console.log(res)
							if(res.data.status==1){
								uni.showToast({
									title:'订单取消成功!',
									icon:'none'
								})
								setTimeout(function(){
									uni.navigateTo({
										url:'/pages/my/order?status=3'
									})
								},500)
							}
						})
					},
					cancel() {
						this.show = false;
					}
				}
				
			},
			//确认支付
			toPay(){
				uni.navigateTo({
					url:`/pages/cart/pay?id=${this.orderMsg.orderid}&total=${this.orderMsg.totalPrice}`
				})
			},
			//删除订单
			delOrder(orderid){
				let that = this;
				this.alertOptions = {
					show:true,
					title:'确认要删除此订单吗？',
					sure(){
						this.show = false;
						delOrderAPI({
							ordersid:that.orderMsg.orderid
						}).then( res => {
							if(res.data.status==1){
								that.promptObj={
									isShow:true,
									title:'订单已删除'
								}
								setTimeout(function(){
									uni.navigateTo({
										url:'/pages/my/order'
									})
								},500)								
							}
						})
					},
					cancel(){
						this.show = false;
					}
				}
				
			},
			//未支付订单倒计时
			getTime(){
				if(this.orderMsg.status==1){//只计算未支付订单的时间差 
					let date = new Date(this.orderMsg.createDate);
					date.setDate(date.getDate()+1);
					let timer = setInterval(()=>{
						let ms = date -new Date();
						let s=ms/1000;//总秒数
						let H = Math.floor(s/(3600));//小时
						H = H<10 ? '0'+H : H
						let M = Math.floor(s%3600/60);
						M = M<10 ? '0'+M : M;
						let S = Math.round(s%60);
						S = S<10 ? '0'+S : S;
						this.time = H+'时'+M+'分'+S+'秒';
						if(ms<=0){
							console.log(ms)
							clearInterval(timer);
							this.updateOrderStatus()
						}
					},1000)
				}
				
			},
			toDetails(url,id,status,item){
				if(status != 1){//商品下架或删除
					//跳转到失效页面
					uni.navigateTo({
						url: '/pages/my/invalid?type='+(item.objectType-1)
					})
				}else {//跳转到详情页
					uni.navigateTo({
						url:'/pages/home/'+url+'?id='+id
					})
				}
			}
			
		},
		onLoad(opt) {
			console.log(opt.id)
			this.getOrderDetailsList(opt.id)
			this.imagePath = this.imgURL()
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
.orderDetails-top {
	width:690upx;
	position:fixed;
	top:0;
	height:150upx;
	background:linear-gradient(90deg,#6080CB,#4465B7);
	display:flex;
	justify-content: flex-start;
	align-items: center;
	padding:0 30upx;
	z-index:9;
	image{
		width:23upx;
		height:38upx;
		z-index:1;
		// margin-top:50upx;
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
.no-pay{
	margin-top:150upx;
	padding:24upx 0;
	background:linear-gradient(90deg,#6080CB,#4465B7);
	padding-left:52upx;
	color:#fff;
	.wait{
		font-weight: bold;
		font-size:50upx;
	}
	.wait-time,.pay-price{
		font-size:26upx;
	}
}
.mark{
	width:100%;
	height:100%;
	position:fixed;
	z-index:-4;
	background:#f5f5f4;
}
.orderDetails-main{
	margin-top:150upx;
	.resource-title{
		background:#fff;
		height:70upx;
		line-height:70upx;
		padding-left:30upx;
		color:#3D3D3D;
		font-size:28upx;
		margin-bottom:10upx;
	}
	.details-list{
		background:#fff;
		padding-left:30upx;
		padding-right:30upx;
		.book-list{
				.item:first-child{
					border-top:none;
				}
			}
		.book-list,.other-list,.img-list,.audio-list,.video-list{
				.item{
					display:flex;
					justify-content: flex-start;
					// padding:30upx 30upx;
					padding:30upx 0;
					border-bottom:1upx solid #E0E1E8;
				}
				.left{
					position:relative;
					image{
						width:154upx;
						height:210upx;
						margin-right:40upx;
					}
					.upImg {
						position: absolute;
						width:154upx;
						height:210upx;
						background: rgba(0, 0, 0, 0.5);
						display: flex;
						justify-content: center;
						align-items: center;
						top: 0;
						left: 0;
						image{
							margin:0;
						}
					}
				}
				.right{
					.title{
						color:#3D3D3D;
						font-size:34upx;
						font-weight: bold;
						width:500upx;
						.ellipsis
					}
					.price{
						color:#D61F1F;
						font-size:28upx;
						font-weight: bold;
						.big{
							font-size:36upx;
						}
					}
					.author,.publish{
						color:#8E8F91;
						font-size:28upx;
						width:500upx;
						.ellipsis
					}
				}
			}
		.other-list,.img-list,.audio-list,.video-list{
				.left{
					.upImg,image{
						width:112upx;
						height:142upx;				
					}
				}
				.right{
					.origin{
						color:#8E8F91;
						font-size:24upx;
						.from{
							color:#4C5679;
						}
					}
					.price{
						line-height:40upx;
					}
				}
			}
		.img-list,.audio-list,.video-list{
				.left{
					.upImg,image{
						width:142upx;
						height:142upx;
						border-radius:10upx;
					}
				}
			}
		.audio-list,.video-list{
				.left{
					position:relative;
					.time{
						position:absolute;
						right:48upx;
						bottom:20upx;
						color:#fff;
						font-size:20upx;
					}
				}
		}
// 		.video-list{
// 				.left{
// 					.time{
// 						bottom:20upx;
// 					}
// 				}
// 		}
		.article-list{
			position:relative;
			.upImg{
				position:absolute;
				right:0;
				top:40upx;
			}
			.item{
				padding:30upx 0;
				border-bottom:1upx solid #E0E1E8;
				.title{
					color:#3D3D3D;
					font-size:34upx;
					font-weight: bold;
					width:690upx;
					.ellipsis
				}
				.price{
					color:#D61F1F;
					font-size:28upx;
					font-weight: bold;
					.big{
						font-size:36upx;
					}
				}
				.origin{
					color:#8E8F91;
					font-size:24upx;
					.from{
						color:#4C5679;
					}
				}
			}
		}
	}
	.price2{
		color:#3D3D3D;
		font-size:24upx;
		background:#fff;
		padding:0 30upx;
		.border-top{
			width:100%;
			// border-top:1upx solid #E0E1E8;
			display:flex;
			justify-content: flex-end;
			align-items: center;
			padding:30upx 0;
			.RMB{
				color:#D61F1F;
				font-size:28upx;
				font-weight: bold;
				margin-left:10upx;
				margin-right:4upx;
			}
			.total{
				color:#D61F1F;
				font-size:36upx;
				font-weight: bold;
			}
		}
		
	}
	.orderDetails-msg{
		margin-top:20upx;
		padding:30upx 30upx 0;
		background:#fff;
		height:540upx;
		.pay-top{
			.title{
				color:#666666;
				font-size:28upx;
			}
			.msg{
				color:#8E8F91;
				font-size:26upx;
				padding:30upx 0;
				border-bottom:1upx solid #E0E1E8;
			}
			.pay-mode{
				padding:30upx 0;
				color:#8E8F91;
				font-size:26upx;
			}
		}
		.pay-bottom{
			.noPay-bottom{
				border-top:1upx solid #E0E1E8;
				display:flex;
				justify-content: flex-end;
				align-items: center;
				padding-top:30upx;
				.cancel,.pay-now{
					width:158upx;
					height:60upx;
					border:1upx solid #3A5697;
					color:#3A5697;
					font-size:26upx;
					text-align: center;
					line-height:60upx;
				}
				.pay-now{
					background:#3A5697;
					color:#fff;
					margin-left:20upx;
				}
			}
			.cancelPay-bottom{
				border-top:1upx solid #E0E1E8;
				display:flex;
				justify-content: flex-end;
				align-items: center;
				padding-top:30upx;
				.cancel{
					width:158upx;
					height:60upx;
					font-size:26upx;
					text-align: center;
					line-height:60upx;
					background:#3A5697;
					color:#fff;
					margin-left:20upx;
				}
			}
		}
	}
}
.orderDetails{
	margin-top:0;
}
</style>
