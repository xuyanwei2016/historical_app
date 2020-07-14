<template>
	<view>
		<view class="order-header">
			<view style="width:40upx;height:38upx;margin-top:50upx;" @tap="returnPre">
				<image src="../../static/images/home/return2.png" ></image>
			</view>	
			<text class="title">确认订单</text>
		</view>
		<view class="mark"></view>
		<view class="main">
			<view class="main-item" v-for="(item ,index) in orderList" :key="index">
				<!-- 图书列表 -->
				<view class="book-list" v-if="item.resourceType == 1">
					<navigator class="item" :url="'/pages/home/bookDetails?id='+item.id">
						<view class="left">
							<image v-if="item.cover && !item.showDefault" :src="imagePath+item.cover" @error="item.showDefault = true"></image>
							<image v-if="!item.cover || item.showDefault" src="../../static/images/article/default.png"></image>
						</view>
						<view class="right">
							<view class="title">
								<text>{{item.name}}</text>
							</view>
							<view class="price">
								<text>￥</text>
								<text class="big"> {{item.before}}</text>
								<text v-if="item.after" style="fontSize:28upx;">.{{item.after}}</text>
							</view>
							<view class="author" v-if="item.author">
								<text>作者&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;{{item.author}}</text>
							</view>
							<view class="publish">
								<text>出版时间&nbsp;:&nbsp;{{item.publishDate}}</text>
							</view>
						</view>
					</navigator>
				</view>
				
				<!-- 其他列表 -->
				<view class="other-list" v-if="item.resourceType == 6">
					<view class="item">
						<navigator class="left" :url="'/pages/home/otherDetails?id='+item.resourceid">
							<image v-if="item.otherType ==1" src="../../static/images/home/excel.png" ></image>
							<image v-if="item.otherType ==2" src="../../static/images/home/word.png"></image>
							<image v-if="item.otherType ==3" src="../../static/images/home/ppt.png"></image>
							<image v-if="item.otherType ==4" src="../../static/images/home/pdf.png"></image>
							<image v-if="item.otherType ==5" src="../../static/images/home/rar.png"></image>
							<image v-if="item.otherType ==6" src="../../static/images/home/default.png"></image>
						</navigator>
						<view class="right">
							<navigator class="title" :url="'/pages/home/otherDetails?id='+item.resourceid">
								<text>{{item.resourceName}}</text>
							</navigator>
							<view class="price">
								<text>￥</text>
								<text class="big"> {{item.before}}</text>
								<text v-if="item.after" style="fontSize:28upx;">.{{item.after}}</text>
								<!-- <text class="big">26</text>
								<text>.6</text> -->
							</view>
							<navigator class="origin" v-if="item.bookName" :url="'/pages/home/bookDetails?id='+item.bookid">
								<text>《{{item.bookName}}》</text>&nbsp;&nbsp;
								<text class="from">来源 &gt;</text>
							</navigator>
						</view>
					</view>
				</view>
				
				<!-- 图片等列表布局一致(除文章外) -->
				<view class="img-list" v-if="item.resourceType == 3">
					<view class="item">
						<navigator class="left" :url="'/pages/home/imgDetails?id='+item.resourceid">
							<image :src="imagePath+item.path"></image>
						</navigator>
						<view class="right">
							<navigator class="title" :url="'/pages/home/imgDetails?id='+item.resourceid">
								<text>{{item.resourceName}}</text>
							</navigator>
							<view class="price">
								<text>￥</text>
								<text class="big"> {{item.before}}</text>
								<text v-if="item.after" style="fontSize:28upx;">.{{item.after}}</text>
							</view>
							<navigator class="origin" :url="'/pages/home/bookDetails?id='+item.bookid" v-if="item.bookName">
								<text>《{{item.bookName}}》</text>&nbsp;&nbsp;
								<text class="from">来源 &gt;</text>
							</navigator>
						</view>
					</view>
				</view>
				
				<!-- 音频列表 -->
				<view class="audio-list" v-if="item.resourceType == 5">
					<view class="item">
						<navigator class="left" :url="'/pages/home/audioDetails?id='+item.resourceid">
							<image src="../../static/images/audio/yinpin.png" mode=""></image>
							<text class="time">02:34</text>
						</navigator>
						<view class="right">
							<navigator class="title" :url="'/pages/home/audioDetails?id='+item.resourceid">
								<text>{{item.resourceName}}</text>
							</navigator>
							<view class="price">
								<text>￥</text>
								<text class="big"> {{item.before}}</text>
								<text v-if="item.after" style="fontSize:28upx;">.{{item.after}}</text>
							</view>
							<navigator v-if="item.bookName"  class="origin" :url="'/pages/home/bookDetails?id='+item.bookid">
								<text>《{{item.bookName}}》</text>&nbsp;&nbsp;
								<text class="from">来源 &gt;</text>
							</navigator>
						</view>
					</view>
				</view>
				
				<!-- 视频列表 -->
				<view class="video-list" v-if="item.resourceType == 4">
					<view class="item">
						<navigator class="left" :url="'/pages/home/videoDetails?id='+item.resourceid">
							<image v-if="item.path" :src="imagePath+item.path"></image>
							<image v-else src="../../static/images/audio/yinpin.png" ></image>
							<text class="time">02:34</text>
						</navigator>
						<view class="right">
							<navigator class="title" :url="'/pages/home/videoDetails?id='+item.resourceid">
								<text>{{item.resourceName}}</text>
							</navigator>
							<view class="price">
								<text>￥</text>
								<text class="big"> {{item.before}}</text>
								<text v-if="item.after" style="fontSize:28upx;">.{{item.after}}</text>
							</view>
							<navigator v-if="item.bookName" class="origin" :url="'/pages/home/bookDetails?id='+item.bookid">
								<text>《{{item.bookName}}》</text>&nbsp;&nbsp;
								<text class="from">来源 &gt;</text>
							</navigator>
						</view>
					</view>
				</view>
				
				<!-- 文章列表 -->
				<view class="article-list" v-if="item.resourceType == 2">
					<view class="item">
						<navigator class="title" :url="'/pages/home/articleDetails?id='+item.contentid">
							<text>{{item.title}}</text>
						</navigator>
						<view class="price">
							<text>￥</text>
							<text class="big"> {{item.before}}</text>
							<text v-if="item.after" style="fontSize:28upx;">.{{item.after}}</text>
						</view>
						<navigator class="origin" v-if="item.bookName" :url="'/pages/home/bookDetails?id='+item.bookid">
							<text>《{{item.bookName}}》</text>&nbsp;&nbsp;
							<text class="from">来源 &gt;</text>
						</navigator>
					</view>
				</view>
			</view>
			
		</view>
		<view class="bottom">				
			<view class="price">
				<text class="sum">合计:</text>
				<text>￥ {{totalPrice}}</text>
			</view>
			<view class="submit" @tap="submitOrder">
				<text>提交订单</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { confirmOrderAPI, addOrderAPI } from '../../api/cart.js'
	export default {
		data() {
			return {
				orderList:[],
				ids:'',
				totalPrice:0,
				imagePath:'',
			};
		},
		methods:{
			returnPre(){
				var route = this.getPage();
				if(route == 'pages/cart/cart'){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
					this.$store.commit('changeIsCart',true);
				}else {
					uni.navigateBack({
						delta: 1
					});	
					this.$store.commit('changeIsCart',false);
				}
				
			},
			getPage(){
				var pages = getCurrentPages();
				var len = pages.length;
				return pages[len-2].route;
			},
			getOrderList(){
				confirmOrderAPI({
					memberid:this.userId,
					objectids:this.ids
				}).then( res => {
					// console.log(res)
					this.orderList = res.data.rows;
					this.totalPrice = res.data.totalPrice;
					this.orderList.map( v => {
						this.$set(v,'showDefault',false)
						if(v.publishDate) v.publishDate = v.publishDate.split(' ')[0];
						if(v.bookName){ 
							v.bookName = v.bookName.length>13 ? v.bookName.slice(0,13)+'...' : v.bookName;
						}
						if(v.resourceType == 6){//其他类型
							var type = v.path.slice(v.path.lastIndexOf('.')+1);
							console.log(type)
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
						if(v.isPay){
							// isPay为string类型
							this.splitPrice(v.isPay,v);
						}else {
							// price字段为number类型
							this.splitPrice(v.price+'',v)
						}
						return v;
					})					
					uni.stopPullDownRefresh()
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
			submitOrder(){
				addOrderAPI({
					memberid:this.userId,
					objectids:this.ids,
					totalPrice:this.totalPrice
				}).then( res => {
					// console.log(res)
					if(res.data.status==1){
						let n={id:this.ids};
						this.$store.commit("changeBuyStatus",n)
						uni.redirectTo({
							url:`/pages/cart/pay?total=${this.totalPrice}&id=${res.data.order.orderid}`
						})
					}
				})
			}
		},
		onLoad(opt) {
			// console.log(opt.ids)
			this.ids = opt.ids;
			this.getOrderList();
			this.imagePath = this.imgURL()
		},
		onPullDownRefresh() {
			this.getOrderList()
		},
		
		computed:{
			userId(){
				return this.$store.getters.userId
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
.order-header {
	width:690upx;
	position:fixed;
	top:0;
	height:150upx;
	background:linear-gradient(40deg,#6080CB,#4465B7);
	display:flex;
	justify-content: flex-start;
	align-items: center;
	padding:0 30upx;
	z-index:5;
	image{
		width:23upx;
		height:38upx;
		z-index:1;
	}
	.title {
		display:inline-block;
		width:100%;
		margin-left:-23upx;
		text-align: center;
		font-size:36upx;
		color:#FFFFFF;
	}
	.title{
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
	padding:0 30upx;
	background:#fff;	
	margin-bottom:120upx;
	.main-item{
		border-top:1upx solid #E0E1E8;
	}
	.main-item:first-child{
		border-top:none;
	}
	.book-list,.other-list,.img-list,.audio-list,.video-list{
		.item{
			display:flex;
			justify-content: flex-start;
			padding:30upx 0;
			// border-top:1upx solid #E0E1E8;
		}
		.left{
			image{
				width:154upx;
				height:210upx;
				margin-right:40upx;
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
			image{
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
			image{
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
	.article-list{
		.item{
			padding:30upx 0;
			// border-top:1upx solid #E0E1E8;
			.title{
				color:#3D3D3D;
				font-size:34upx;
				font-weight: bold;
				width:600upx;
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
.bottom{
		position:fixed;
		// bottom:100upx;//pc端
		bottom:0;//手机端
		width:100%;
		height:90upx;
		background:#fff;
		display:flex;
		justify-content: flex-end;
		align-items: center;
		.submit{
			width:214upx;
			height:90upx;
			text-align: center;
			line-height: 90upx;
			color:#fff;
			background:#3a5697;
			font-size: 30upx;
			margin-left:36upx;
		}
		.price{
			color:#D61F1F;
			font-size:32upx;
			font-weight: bold;
			.sum{
				color:#3D3D3D;
				font-weight:normal;
			}
// 			.big{
// 				font-size:32upx;
// 			}
		}
	}
	.navigator-hover{background: none;opacity:1;}
</style>
