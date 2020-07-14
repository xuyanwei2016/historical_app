<template>
	<view>
		<view class="mark"></view>
		<view class="comment-header">
			<view style="width:40upx;height:38upx;padding-top:50upx;" @tap="returnPre">
				<image src="../../static/images/home/return2.png" ></image>
			</view>	
			<text class="title">我的评论</text>
			<view style="width: 40upx;">	
			</view>
		</view>
		<view class="book-comment">
			<view class="comment-list" v-if="commentList.length>0">
				<view class="comment-item" v-for="(item,index) in commentList" :key="index">
					<view class="top">
						<view class="left">
							<image v-if="header" :src="imagePath+header"></image>
							<image v-else src="../../static/images/my/header.png"></image>
							<text>{{name}}</text>
						</view>
						<view class="right">
							<view class="star" v-for="(item2,index2) in startList" :key="item2.key">
								<image v-if="index2 < item.starLevel" src="../../static/images/books/star2.png"></image>
								<image v-else src="../../static/images/books/star.png"></image>
							</view>
						</view>
					</view>
					<view class="time">
						<text>{{item.commentTime}}</text>
					</view>
					<view class="con">
						<text>{{item.content}}</text>
					</view>
					<view class="replay" v-if="item.reply">
						<text class="caret"></text>
						<view class="con">
							<view class="title">
								回复:
							</view>
							<rich-text :nodes="item.reply"></rich-text>
							<!-- <text>{{item.reply}}</text> -->
						</view>
					</view>
					<!-- 图书 -->
					<view v-if="item.resource && item.resource.resourceType==1" class="book-msg" @tap="toDetails('bookDetails',item.resource.id,item.resource.status,item.resource)">
						<view class="left">
							<image v-if="item.resource.cover && !item.resource.showDefault" :src="imagePath+item.resource.cover" @error="item.resource.showDefault=true"></image>
							<image v-if="!item.resource.cover || item.resource.showDefault" src="../../static/images/article/default.png"></image>
						</view>
						<view class="right">
							<view class="title">
								<text>{{item.resource.name}}</text>
							</view>
							<!-- 只有图书有作者 -->
							<view class="author">
								<text>{{item.resource.author}}</text>
							</view>
							<view class="msg-con">
								<text>{{item.resource.intro}}</text>
							</view>							
						</view>
					</view>
					<!-- 文章模板 -->
					<view v-if="item.resource && item.resource.resourceType==2" class="article-msg" @tap="toDetails('articleDetails',item.resource.contentid,item.resource.status,item.resource)">
						<view class="title">
							<text>{{item.resource.title}}</text>
						</view>
						<view class="msg-con">
							{{item.resource.intro}}
						</view>
						<view class="origin" @tap.stop="toDetails('bookDetails',item.resource.bookid,item.resource.bookStatus,item.resource)">
							<text>《{{item.resource.bookName}}》</text>
							<text class="from">来源 &gt;</text>
						</view>
					</view>
					<!-- 图片、音频、视频、其他 -->
					<view v-if="item.resource && (item.resource.resourceType!=2 && item.resource.resourceType !=1)" class="book-msg common-msg">
						<view class="left" v-if="item.resource.resourceType!=6" @tap="toDetails(details[item.resource.resourceType-1]+'Details',item.resource.resourceid,item.resource.status,item.resource)">
							<!-- 音频 -->
							<image v-if="item.resource.resourceType==5" src="../../static/images/audio/yinpin.png"></image>
							<!-- 图片 -->
							<image v-if="item.resource.resourceType==3" :src="imagePath+item.resource.path"></image>
							<!-- 视频 -->
							<image v-if="item.resource.resourceType==4" :src="imagePath+item.resource.previewPath"></image>
						</view>
						<!-- 其他类型 -->
						<view class="left left2" v-if="item.resource.resourceType==6"  @tap="toDetails('otherDetails',item.resource.resourceid,item.resource.status,item.resource)">
							<image v-if="item.resource.otherType ==1" src="../../static/images/home/excel.png"></image>
							<image v-if="item.resource.otherType ==2" src="../../static/images/home/word.png"></image>
							<image v-if="item.resource.otherType ==3" src="../../static/images/home/ppt.png"></image>
							<image v-if="item.resource.otherType ==4" src="../../static/images/home/pdf.png"></image>
							<image v-if="item.resource.otherType ==5" src="../../static/images/home/rar.png"></image>
							<image v-if="item.resource.otherType ==6" src="../../static/images/home/default.png"></image>
						</view>
						<view class="right" @tap="toDetails(details[item.resource.resourceType-1]+'Details',item.resource.resourceid,item.resource.status,item.resource)">
							<view class="title">
								<text>{{item.resource.resourceName}}</text>
							</view>
							<view class="msg-con" v-if="item.resource.intro">
								<text>{{item.resource.intro}}</text>
							</view>
							<view class="origin" v-if="item.resource.bookName" @tap.stop="toDetails('bookDetails',item.resource.bookid,item.resource.bookStatus,item.resource)">
								<text>《{{item.resource.bookName}}》</text>
								<text class="from">来源 &gt;</text>
							</view>
						</view>
					</view>
				</view>
				<view style="height: 60upx; width:100%;text-align: center;color: #555555;" v-if="commentList.length>rows">
					{{loadingType==0?loadingText.contentdown:loadingType==1?loadingText.contentrefresh:loadingText.contentnomore}}
				</view>
			</view>
			<view class="empty"  v-if="commentList.length==0&&isShowLoad">
				<image src="../../static/images/empty/comment.png" ></image>
				<text>暂无评论</text>
			</view>
			<!-- 正在加载中 -->
			<view class="loadingList" v-if="!isShowLoad" >
			<image src="../../static/images/home/loading.png" mode=""></image>
			</view>
			
			
			
		</view>
	</view>
</template>

<script>
	import {getCommentsAPI} from '../../api/info.js'
	export default {
		data() {
			return {
				startList:[{key:'s1'},{key:'s2'},{key:'s3'},{key:'s4'},{key:'s5'}],
				commentList:[],
				header:'',
				name:'',
				details:['book','article','img','video','audio','other'],
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loadingType:0,
				dataTotal:0,
				page:1,
				pullDown:false,
				rows:5,
				imagePath:'',
				isShowLoad:false,
			};
		},
		methods:{
			getComment(){
				getCommentsAPI({
					memberid:this.userId,
					page:this.page,
					rows:this.rows
				}).then(res => {
					this.isShowLoad=true;
					uni.stopPullDownRefresh()
					this.header = res.data.userInfo.headPortrait;
					this.name = res.data.userInfo.memberName;
					this.dataTotal = res.data.page.total;
					if(this.pullDown && this.page==1){
						this.commentList=res.data.page.rows;
					}else {
						if(this.dataTotal>0){
							this.commentList.push(...res.data.page.rows);
							if(this.dataTotal>this.commentList.length){
								this.loadingType=0;
							}else{
								this.loadingType=2;
							}
						}else {
							this.commentList = [];
							this.loadingType = null;
						}
					}
					this.commentList.map( v => {
// 						if(v.resource.path && v.resource.path.indexOf(this.imgURL())==-1){
// 							v.resource.path = this.imgURL()+v.resource.path;
// 						}else if(v.resource.cover && v.resource.cover.indexOf(this.imgURL())==-1){
// 							v.resource.cover = this.imgURL()+v.resource.cover;
// 						}						
						if(v.resource.bookName && v.resource.resourceType !=2){//过滤除文章外其他类型的书名
							v.resource.bookName = v.resource.bookName.length>15 ? v.resource.bookName.slice(0,15)+'...' : v.resource.bookName;
						}
						if (v.resource.resourceType == 6) { //其他类型
							var type = v.resource.path.slice(v.resource.path.lastIndexOf('.') + 1);
							switch (type) {
								case 'xls':
								case 'xlsx':
									v.resource.otherType = 1;
									break;
								case 'doc':
								case 'docx':
									v.resource.otherType = 2;
									break;
								case 'ppt':
								case 'pptx':
									v.resource.otherType = 3;
									break;
								case 'pdf':
									v.resource.otherType = 4;
									break;
								case 'rar':
									v.resource.otherType = 5;
									break;
								default:
									v.resource.otherType = 6;
							}
						}
						this.$set(v.resource,'showDefault',false)
						return v;
					})
					uni.stopPullDownRefresh()
				})
			},
			returnPre(){
				var pages = getCurrentPages();
				if(pages.length==1){
					history.back();
				}
				uni.navigateBack({
					delta:1
				})
			},
			//跳转到详情页面
			toDetails(url,id,status,item){
				console.log(item)
				if(status != 1){//商品下架或删除
					//跳转到失效页面
					uni.navigateTo({
						url: '/pages/my/invalid?type='+(item.resourceType-1)
					})
				}else {//跳转到详情页
					uni.navigateTo({
						url:'/pages/home/'+url+'?id='+id
					})
				}
			}
		},
		onLoad() {
			this.isShowLoad=false;
			this.getComment()
			this.imagePath = this.imgURL()
		},
		onPullDownRefresh() {
			this.page = 1;
			this.pullDown = true;
			this.getComment()
		},
		computed:{
			userId(){
				return this.$store.getters.userId;
			}
		},
		onReachBottom() {
			if(this.dataTotal > this.commentList.length){
				this.loadingType=1;
				this.page++;
				this.getComment();
			}else {
				this.loadingType = 2;
			}
		}
	}
</script>

<style lang="less" scoped>
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
.mark{
	width:100%;
	height:100%;
	position:fixed;
	z-index:-4;
	background:#f5f5f4;
}
.comment-header {
	width:690upx;
	position:fixed;
	z-index: 11;
	top:0;
	height:150upx;
	background:linear-gradient(40deg,#6080CB,#4465B7);
	display:flex;
	justify-content: flex-start;
	align-items: center;
	padding:0 30upx;
	image{
		width:23upx;
		height:38upx;
		z-index:1;
	}
	.title {
		display:inline-block;
		width:100%;
		/* margin-left:-23upx; */
		text-align: center;
		font-size:36upx;
		color:#FFFFFF;
	}
	.title{
		margin-top:50upx;
	}
}
.book-comment{
	padding:40upx 0 0;
	min-height:500upx;
	background:#f5f5f4;
	margin-top:150upx;
	margin-bottom:20upx;
	.comment-list {
		// border:1upx solid #E0E1E8;
		.comment-item{
			background:#fff;
			padding:30upx 30upx 50upx;
			margin-bottom:20upx;
			.top {
				display:flex;
				justify-content:space-between;
				align-items:center;
				.left{
					display:flex;
					align-items: center;
					image {
						width:50upx;
						height:50upx;
						border-radius:50%;
						margin-right:20upx;
						box-shadow:1upx 1upx 21upx 0upx rgba(159,97,16,0.25);
					}
					text{
						color:#333333;
						font-size:26upx;
					}
				}
				.right{
					.star {
						display: inline-block;
						image {
							width:26upx;
							height:26upx;
							margin-left:8upx;
						}
					}
				}
			}
			.time{
				color:#8E8F91;
				font-size:24upx;
				// margin:6upx 0 8upx;
			}
			.con {
				color:#555555;
				font-size:28upx;
				margin-top:10upx;
			}
			.replay{
				margin-top:-40upx;
				.con{
					padding:26upx 22upx;
					background:#F3F4F7;
					border-radius:5upx;
					font-size: 28upx;
					.title {
						color:#555555;
						font-weight:bold;
					}
				}
				.caret {
					
					margin-left:16upx;
					border:16upx solid transparent;
					border-bottom-color:#F3F4F7;
				}
			}
			.book-msg{
				display:flex;
				justify-content: flex-start;
				align-items: flex-start;
				.left{
					margin-right:24upx;
					image{
						width:95upx;
						height:130upx;
					}
				}
				.right{
					.title{
						width:500upx;
						font-size:30upx;
						line-height:40upx;
						color:#3D3D3D;
						font-weight: bold;
						.ellipsis;
					}
					.author{
						color:#8E8F91;
						font-size:24upx;
						margin:8upx 0 6upx;
					}
					.msg-con{
						width:520upx;
						color:#505052;
						font-size:26upx;
						.ellipsis;
					}
				}
			}
			.common-msg{
				.left{
					image{
						width:134upx;
						height:127upx;
						border-radius:4upx;
					}
				}
				.left2{
					image{
						width:100upx;
						height:128upx;
					}
				}
			}
			.book-msg,.article-msg{
				padding:20upx;
				background:#fff;
				margin-top:30upx;
				box-shadow:1px 1px 10px 0px rgba(89,94,108,0.3);
				border-radius:8upx;
				.origin{
					color:#8E8F91;
					font-size:24upx;
					margin-top:10upx;
					.from{
						color:#4C5679;
						margin-left:20upx;
					}
				}
			}
			.article-msg{
				text-align: left;
				.title{
					color:#3D3D3D;
					font-size:30upx;
					font-weight: bold;
					// width:690upx;
					.ellipsis;
				}
				.msg-con{
					width: 654upx;
					color:#505052;
					font-size:26upx;
					.ellipsis;
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
	
	.empty{
		width:100%;
		height:100%;
		display:flex;
		justify-content: center;
		align-items: center;
		flex-direction: column; 
		padding-top:280upx;
		color:#999999;
		font-size:32upx;
		image{
			width:422upx;
			height:300upx;
			// margin-bottom:30upx;
		}
	}
}
</style>
