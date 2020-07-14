<template>
	<view>
		<view class="sendComment-header">
			<view style="width:40upx;height:38upx;margin-top:50upx;" @tap="returnPre">
				<image src="../../static/images/home/return2.png" ></image>
			</view>	
			<text class="title">发表评论</text>
			<text class="send" @tap="send">发布</text>
		</view>
		<view class="mark"></view>
		<view class="sendComment-main">
			<view class="sendComment-list" v-for="(item,index) in orderDetails" :key="item.objectid">
				<!-- 图书类 -->
				<view class="common-item" v-if="item.objectType==1">
					<view class="common-top">
						<view class="common-con">
							<view class="left">
								<image v-if="item.url && !item.showDefault" :src="imagePath+item.url" @error="item.showDefault=true"></image>
								<image v-if="!item.url || item.showDefault" src="../../static/images/article/default.png"></image>
							</view>
							<view class="right">
								<view class="title">
									<text>{{item.objectName}}</text>
								</view>
								<view class="author" v-if="item.author">
									<text>{{item.author}}</text>
								</view>
							</view>
						</view>
						<view class="star" v-for="(item2,index2) in startList" :key="index2" @tap="item.starLevel=item2">
							<image v-if="index2 < item.starLevel" src="../../static/images/books/star2.png"></image>
							<image v-else src="../../static/images/books/star.png"></image>
						</view>
					</view>
					<view class="common-bottom">
						<textarea v-model="item.content" placeholder="发表您的评论" placeholder-style="color:#ABABB1;fontSize:28upx"/>
					</view>
				</view>
				<!-- 文章类 -->
				<view class="common-item" v-if="item.objectType==2">
					<view class="common-top">
						<view class="common-con">
							<view class="left">
								<image src="../../static/images/article/default.png"></image>
							</view>
							<view class="right">
								<view class="title">
									<text>{{item.objectName}}</text>
								</view>
								<view class="author" v-if="item.author">
									<text>{{item.author}}</text>
								</view>
							</view>
						</view>
						<view class="star" v-for="(item2,index2) in startList" :key="index2" @tap="item.starLevel=item2">
							<image v-if="index2 < item.starLevel" src="../../static/images/books/star2.png"></image>
							<image v-else src="../../static/images/books/star.png"></image>
						</view>
					</view>
					<view class="common-bottom">
						<textarea v-model="item.content" placeholder="发表您的评论" placeholder-style="color:#ABABB1;fontSize:28upx"/>
					</view>
				</view>
				<!-- 音频类 -->
				<view class="common-item audio-item" v-if="item.objectType==5">
					<view class="common-top">
						<view class="common-con">
							<view class="left">
								<image src="../../static/images/audio/yinpin.png"></image>
							</view>
							<view class="right">
								<view class="title">
									<text>{{item.objectName}}</text>
								</view>
								<view class="author"  v-if="item.author">
									<text>{{item.author}}</text>
								</view>
							</view>
						</view>
						<view class="star" v-for="(item2,index2) in startList" :key="index2" @tap="item.starLevel=item2">
							<image v-if="index2 < item.starLevel" src="../../static/images/books/star2.png"></image>
							<image v-else src="../../static/images/books/star.png"></image>
						</view>
					</view>
					<view class="common-bottom">
						<textarea v-model="item.content" placeholder="发表您的评论" placeholder-style="color:#ABABB1;fontSize:28upx"/>
					</view>
				</view>
				<!-- 图片类 -->
				<view class="common-item audio-item" v-if="item.objectType==3">
					<view class="common-top">
						<view class="common-con">
							<view class="left">
								<!-- <image src="../../static/images/audio/yinpin.png"></image> -->
								<image :src="imagePath+item.url" mode=""></image>
							</view>
							<view class="right">
								<view class="title">
									<text>{{item.objectName}}</text>
								</view>
								<view class="author"  v-if="item.author">
									<text>{{item.author}}</text>
								</view>
							</view>
						</view>
						<view class="star" v-for="(item2,index2) in startList" :key="index2" @tap="item.starLevel=item2">
							<image v-if="index2 < item.starLevel" src="../../static/images/books/star2.png"></image>
							<image v-else src="../../static/images/books/star.png"></image>
						</view>
					</view>
					<view class="common-bottom">
						<textarea v-model="item.content" placeholder="发表您的评论" placeholder-style="color:#ABABB1;fontSize:28upx"/>
					</view>
				</view>
				<!-- 视频类 -->
				<view class="common-item audio-item video-item" v-if="item.objectType==4">
					<view class="common-top">
						<view class="common-con">
							<view class="left">
								<image :src="imagePath+item.url"></image>
								<image class="play-icon" src="../../static/images/audio/play.png" ></image>
							</view>
							<view class="right">
								<view class="title">
									<text>{{item.objectName}}</text>
								</view>
								<view class="author"  v-if="item.author">
									<text>{{item.author}}</text>
								</view>
							</view>
						</view>
						<view class="star" v-for="(item2,index2) in startList" :key="index2" @tap="item.starLevel=item2">
							<image v-if="index2 < item.starLevel" src="../../static/images/books/star2.png"></image>
							<image v-else src="../../static/images/books/star.png"></image>
						</view>
					</view>
					<view class="common-bottom">
						<textarea v-model="item.content" placeholder="发表您的评论" placeholder-style="color:#ABABB1;fontSize:28upx"/>
					</view>
				</view>
				<!-- 其他类 -->
				<view class="common-item other-item" v-if="item.objectType==6">
					<view class="common-top">
						<view class="common-con">
							<view class="left">
								<image src="../../static/images/home/ppt.png"></image>
							</view>
							<view class="right">
								<view class="title">
									<text>{{item.objectName}}</text>
								</view>
								<!-- <view class="author"  v-if="item.author">
									<text>{{item.author}}</text>
								</view> -->
							</view>
						</view>
						<view class="star" v-for="(item2,index2) in startList" :key="index2" @tap="item.starLevel=item2">
							<image v-if="index2 < item.starLevel" src="../../static/images/books/star2.png"></image>
							<image v-else src="../../static/images/books/star.png"></image>
						</view>
					</view>
					<view class="common-bottom">
						<textarea v-model="item.content" placeholder="发表您的评论" placeholder-style="color:#ABABB1;fontSize:28upx"/>
					</view>
				</view>
			</view>
			<!-- <view style="height: 60upx; width:100%;text-align: center;color: #555555;" v-if="orderDetails.length>=5">
				{{loadingType==0?loadingText.contentdown:loadingType==1?loadingText.contentrefresh:loadingText.contentnomore}}
			</view> -->
			
		</view>
		<promptBox :promptObj="promptObj"></promptBox>
	</view>
</template>

<script>
	import { saveCommentAPI } from '../../api/comment.js'
	import { getOrdersDetailsAPI } from '../../api/info.js'
	export default {
		data() {
			return {
				startList:[1,2,3,4,5],
				orderDetails:[],
				order:{},
				// page:1,
// 				loadingText: {
// 					contentdown: "上拉显示更多",
// 					contentrefresh: "正在加载...",
// 					contentnomore: "没有更多数据了"
// 				},
// 				loadingType:0,
				// dataTotal:0,
				orderNum:'',
				promptObj:{},
				imagePath:''
				// pullDowm:false
			};
		},
		methods:{
			returnPre(){
				var pages = getCurrentPages();
				if(pages.length==1){
					history.back();
				}
				uni.navigateBack({
					delta:1
				})
			},
			getOrders(){
				getOrdersDetailsAPI({
					orderNumber:this.orderNum,
// 					page:this.page,
// 					rows:5
				}).then( res => {
					this.order = res.data.order;
					// this.dataTotal = res.data.page.total;
					this.orderDetails=res.data.orderList.filter( v => v.isComments==0);
// 					if(this.pullDowm){
// 						this.orderDetails=res.data.page.rows;
// 					}else {
// 						if(this.dataTotal>0){
// 							this.orderDetails.push(...res.data.page.rows)
// 							if(this.dataTotal > this.orderDetails.length){
// 								this.loadingType = 0;
// 							}else {
// 								this.loadingType = 2;
// 							}
// 						}else {
// 							this.orderDetails = []
// 							this.loadingType = null;
// 						}
// 					}
					this.orderDetails.map( v => {
						this.$set(v,'showDefault',false);
						this.$set(v,'starLevel',5);
						this.$set(v,'content','');
						return v;
					})
					uni.stopPullDownRefresh()
				})
			},
			send(){
				let bool = this.orderDetails.some(v => v.starLevel!=0 && v.content.replace(/\s*/g,'').length>0);
				if(!bool){
					uni.showToast({
						title:'请至少评论一个商品',
						icon:'none'
					})
					return ;
				}
				let str = [];
				this.orderDetails.map( v => {
					let obj={
						resourceName:v.objectName,
						resourceid :v.objectid
					};
// 					if(v.objectType==1){//图书
// 						obj.resourceid = v.id;
// 						obj.resourceName = v.name;
// 					}else if(v.objectType==2){//文章
// 						obj.resourceid = v.contentid;
// 						obj.resourceName = v.title;
// 					}else {
// 						obj.resourceid = v.resourceid;
// 						obj.resourceName = v.resourceName; 
// 					}
					//默认评论
					if(v.starLevel!=0 && v.content!=''){
						obj.starLevel = v.starLevel;
						obj.content = v.content;
					}else {
						obj.starLevel = 5;
						obj.content = '此用户没有填写评价';
					}
					
					obj.resourceType = v.objectType; 
					str.push(obj)
				})
				// console.log(str)
				str = JSON.stringify(str)
				saveCommentAPI({
					memberid:this.userId,
					orderNum:this.order.orderNumber,
					str:str
				}).then( res => {
					console.log(res);
					if(res.data.status==1){
						this.promptObj = {
							isShow:true,
							title:'评论成功！'
						}
						setTimeout(function(){
							uni.navigateTo({
								url:'/pages/my/order'
							})
						},500)
					}
				})
			}
		},
		onLoad(opt) {
			this.orderNum = opt.orderNum;
			this.getOrders()
			this.imagePath = this.imgURL();
			console.log(this.imgURL(),this.imagePath)
		},
		onPullDownRefresh() {
			// this.pullDowm = true;
			this.getOrders()
		},
		computed:{
			userId(){
				return this.$store.getters.userId;
			}
		},
// 		onReachBottom() {
// 			console.log(this.orderDetails.length)
// 			if(this.dataTotal > this.orderDetails.length){
// 				this.loadingType=1;
// 				this.page++;
// 				this.getOrders();
// 			}else {
// 				this.loadingType = 2;
// 			}
// 		}
		
	}
</script>

<style lang="less" scoped>
//单行省略号
.ellipsis{
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}	
.sendComment-header {
	width:690upx;
	position:fixed;
	top:0;
	height:150upx;
	background:linear-gradient(40deg,#6080CB,#4465B7);
	display:flex;
	justify-content:space-between;
	align-items: center;
	padding:0 30upx;
	font-size:36upx;
	color:#FFFFFF;	
	z-index:5;
	image{
		width:22upx;
		height:38upx;
		// margin-top:50upx;
		margin-right:50upx;
	}
	.title{
		margin-top:50upx;
	}
	.send{
		display:block;
		margin-top:50upx;
		height:48upx;
		line-height:48upx;
	}
}
.mark{
	width:100%;
	height:100%;
	position:fixed;
	z-index:-4;
	background:#f5f5f4;
}
.sendComment-main{
	margin-top:150upx;
	.sendComment-list{
		.common-item{
			padding-top:50upx;
			background:#fff;
			.common-top{
				padding:0 30upx 20upx;
				.common-con{
					display:flex;
					justify-content: flex-start;
					align-items: center;
					margin-bottom:24upx;
					.left{
						width:60upx;
						height:82upx;
						margin-right:20upx;
						image{
							width:60upx;
							height:82upx;
						}
					}
					.right{
						display:flex;
						flex-direction:column;
						justify-content: flex-start;
						height:82upx;
						.title{
							color:#3D3D3D;
							font-size:30upx;
							font-weight:bold;
							width:600upx;
							.ellipsis;
						}
						.author{
							color:#8E8F91;
							font-size:24upx;
						}
					}
				}
				.star{
					display: inline-block;
					image{
						width:38upx;
						height:38upx;
						margin-right:8upx;
					}
				}
			}
			.common-bottom{
				border-top:1upx solid #E0E1E8;
				textarea{
					padding:20upx 30upx 0;
					width:690upx;
				}
			}
		}
		.audio-item{
			.common-top{
				.common-con{
					.left{
						width:86upx;
						height:82upx;
						image{
							width:86upx;
							height:82upx;
						}
					}
				}
			}
		}
		.video-item{
			.common-top{
				.common-con{
					.left{
						position:relative;
						.play-icon{
							width:30upx;
							height:30upx;
							position:absolute;
							top:50%;
							left:50%;
							margin-left:-15upx;
							margin-top:-15upx;
						}
					}
				}
			}
		}
		.other-item{
			.common-top{
				.left{
					width:64upx;
					image{
						width:64upx;
					}
				}
			}
		}
	}
}
</style>
