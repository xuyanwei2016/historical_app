<template>
	<view>
		<view class="choice-header">
			<view class="title">
				<text>精选</text>
			</view>
		</view>
		<view class="choice-main">
			<!-- 文学馆 -->
			<view class="publication common-1">
				<view class="title">
					<view class="left">
						<text class="border"></text>
						<text class="key">{{publicationList.location}}</text>
					</view>
					<view class="right" @tap="toResourceList('0')">
						<text>更多</text>
					</view>
				</view>
				<view class="list">
					<view class="item" v-for="(item,index) in publicationList.list" :key="index" v-if='index<2'>
						<navigator class="left" :url="'bookDetails?id='+item.id">
							<image v-if="item.cover && !item.showDefault" :src="imagePath+item.cover" @error="item.showDefault=true"></image>
							<image v-if="!item.cover || item.showDefault" src="../../static/images/article/default.png"></image>
						</navigator>
						<view class="right">
							<navigator :url="'bookDetails?id='+item.id">
								<view class="title">
									<text>{{item.name}}</text>
								</view>
								<view class="con">
									<text>{{item.intro}}</text>
								</view>
							</navigator>
							<!-- <navigator class="name" :url="'bookDetails?id='+item.bookId">
								《{{item.bookName}}》<text>来源 &gt;</text>								
							</navigator> -->
						</view>
					</view>
				</view>
			</view>
			<!-- 史传馆 -->
			<view class="practice common-2">
				<view class="title">
					<view class="left">
						<text class="border"></text>
						<text class="key">{{practiceList.location}}</text>
					</view>
					<view class="right" @tap="toResourceList('1')">
						<text>更多</text>
					</view>
				</view>
				<view class="list">
					<navigator class="item" v-for="(item,index) in practiceList.list" :key="index"  :url="'bookDetails?id='+item.id" v-if='index<2'>
						<view class="left">
							<view class="title">
								<text>{{item.name}}</text>
							</view>
							<view class="con">
								<text>{{item.intro}}</text>
							</view>
						</view>
						<view class="right">
							<image src="../../static/images/books/return.png"></image>
						</view>
					</navigator>
				</view>
			</view>
			<view class="image">
				<image :src="imagePath+keyHistoryPath"></image>
			</view>
			<!-- 国学馆 -->
			<view class="culture common-2">
				<view class="title">
					<view class="left">
						<text class="border"></text>
						<text class="key">{{cultureList.location}}</text>
					</view>
					<view class="right" @tap="toResourceList('2')">
						<text>更多</text>
					</view>
				</view>
				<view class="list">
					<navigator class="item" v-for="(item,index) in cultureList.list" :key="index" :url="'bookDetails?id='+item.id" v-if="index<2">
						<view class="left">
							<view class="title">
								<text>{{item.name}}</text>
							</view>
							<view class="con">
								<text>{{item.intro}}</text>
							</view>
						</view>
						<view class="right">
							<image src="../../static/images/books/return.png"></image>
						</view>
					</navigator>
				</view>
			</view>
			<!-- 出版专业文库 -->
			<view class="manage">
				<view class="title">
					<view class="left">
						<text class="border"></text>
						<text class="key">{{manageList.location}}</text>
					</view>
					<view class="right" @tap="toResourceList('3')">
						<text>更多</text>
					</view>
				</view>
				<view class="list">
						<view class="item" v-for="(item,index) in manageList.list" :key="index" v-if="index<3">
						<navigator class="title1" :url="'bookDetails?id='+item.id">
							<image v-if="item.cover" :src="imagePath+item.cover"></image>
							<image v-else src="../../static/images/article/default.png"></image>
							<view class="title">
								<text>{{item.name}}</text>
								</view>
						</navigator>
					</view>
				</view>				
			</view>
			<!-- 中国书籍文库 -->
			<view class="publication common-1">
				<view class="title">
					<view class="left">
						<text class="border"></text>
						<text class="key">{{researchList.location}}</text>
					</view>
					<view class="right" @tap="toResourceList('4')">
						<text>更多</text>
					</view>
				</view>
				
				
				<view class="list">
						<view class="item" v-for="(item,index) in researchList.list" :key="index" v-if='index<2'>
							<navigator class="left" :url="'bookDetails?id='+item.id">
								<image v-if="item.cover && !item.showDefault" :src="imagePath+item.cover" @error="item.showDefault=true"></image>
								<image v-if="!item.cover || item.showDefault" src="../../static/images/article/default.png"></image>
							</navigator>
							<view class="right">
								<navigator :url="'bookDetails?id='+item.id">
									<view class="title">
										<text>{{item.name}}</text>
									</view>
									<view class="con">
										<text>{{item.intro}}</text>
									</view>
								</navigator>
								<!-- <navigator class="name" :url="'bookDetails?id='+item.bookId">
									《{{item.bookName}}》<text>来源 &gt;</text>								
								</navigator> -->
							</view>
						</view>
					</view>
				
				
				
				
			</view>
			
			</view>
	</view>
</template>

<script>
	import { getadspaceAPI } from '../../api/home.js'
	import { getarticlecontentbylocationAPI, getHistoricalDocuments } from '../../api/choice.js'
	export default {
		data() {
			return {
				keyHistoryPath:'',
				list:['publication','practice','culture','manage','research','communicate'],
				publicationList:{location:'',list:[]},
				practiceList:{location:'',list:[]},
				cultureList:{location:'',list:[]},
				manageList:{location:'',list:[]},
				researchList:{location:'',list:[]},
				communicateList:{location:'',list:[]},
				imagePath:'',
				manageImg:'',
				manageId:''
			};
		},
		methods:{
			//获取广告位图片
			getadSpace(){
				getadspaceAPI().then( res => {
					this.keyHistoryPath = res.data.filter(v => v.mark == 'choice')[0].imageUrl;
				})
			},
			getArticle(location,data,index){
				this[`${this.list[index]}List`].location = location;
				this[`${this.list[index]}List`].list = data;
				/* getarticlecontentbylocationAPI({
					location:location
				}).then( res => {
					this[`${this.list[index]}List`].location = location;
					this[`${this.list[index]}List`].list = res.data;
					this[`${this.list[index]}List`].list.map( v => {
						this.$set(v,'showDefault',false)
					})
					if(this.manageList.list[0]){
						this.manageImg = this.manageList.list[0].cover;
						this.manageId = this.manageList.list[0].bookId;	
					}
					uni.stopPullDownRefresh()
				}) */
			},
			//获取史料文献
			getHistory(){
				getHistoricalDocuments().then( res => {
					console.log(res.data)
					for(let key in res.data){
						/* if(key=='chList'){} */
						switch (key){
							case 'chList'://出版专业文库
							this.getArticle('出版专业文库',res.data[key],3)
							break;
							
							case 'gxList'://国学馆
							this.getArticle('国学馆',res.data[key],2)
							break;
							
							case 'scList'://史传馆
							this.getArticle('史传馆',res.data[key],1)
							break;
							
							case 'sjList'://中国书籍文库
							this.getArticle('中国书籍文库',res.data[key],4)
							break;
							
							case 'wxList'://文学馆
							this.getArticle('文学馆',res.data[key],0)
							break;
						}
					}
					/* res.data.map((val,index) => {
						console.log(2222,val,index)
						this.getArticle(val.location,index)
					}) */
					uni.stopPullDownRefresh()//关闭下拉刷新 
				})
			},
			//跳转到资源列表页
			toResourceList(val){
				uni.navigateTo({
					url:'/pages/home/literature?type='+val
				});
			},
			//跳转文章详情页
// 			toArticleDetails(item){
// 				uni.navigateTo({
// 					url:'articleDetails?id='+item.contentid
// 				})
// 			}
			
		},
		onLoad() {
			this.getHistory()
			this.getadSpace()
			this.imagePath = this.imgURL()
		},
		onPullDownRefresh() {
			this.getHistory()
			this.getadSpace();
		}
	}
</script>

<style lang="less" scoped>
@imgUrl:"http://122.14.50.6:8084/h5/img/";
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
.choice-header {
	width:750upx;
	position:fixed;
	z-index: 11;
	top:0;
	height:150upx;
	line-height:150upx;
	background:linear-gradient(40deg,rgba(41,100,160,1),rgba(38,89,142,1));
	font-size:36upx;
	display:flex;
	align-items: center;
	justify-content: center;
	.title{
		color:#fff;
		font-size:36upx;
		margin-top:50upx;
	}
}
.common-1,.common-2,.manage{
	margin-top:60upx;
	.title{
		display:flex;
		justify-content: space-between;
		align-items: center;
		
		.left{
			.border{
				font-size:26upx;
				margin-right:10upx;
				border-left:8upx solid #2964A0;
				vertical-align: 4upx;
			}
			.key{
				color:#27272B;
				font-size:36upx;
				font-weight: bold;
			}	
		}
		.right{
			font-size:24upx;
			color:#666;
		}
	}
	
}
.common-1,.common-2{
	.list{
		margin-top:30upx;
		padding:0 30upx;
		background:#fff;
		box-shadow:-1px 0px 8px 0px rgba(58,86,151,0.24);
		.item{
			display:flex;
			justify-content:flex-start;
			padding:30upx 0;
			border-top:1upx solid #D8D9DE;
		}
		.item:first-child{
			border-top:none;
		}
	}
}
.common-1{
	.list{
		.right{
			.title{
				width:450upx;
				font-size:32upx;
				line-height:32upx;
				color:#3D3D3D;
				font-weight: bold;
				padding-top: 16upx;
				text{
					.ellipsis;
				}
			}
			.name{
				// margin:20upx 0;
				// width:450upx;
				// padding:6upx 30upx;
				width:446upx;
				/* border:1upx solid rgba(76,86,121,1);
				border-radius:24upx;
				background:rgba(234,237,248,1); */
				height:48upx;
				line-height: 48upx;
				text-align:left;
				color:#666;
				font-size:24upx;
					.ellipsis;
				text{		
					width:470upx;
					font-size:24upx;
					color:#4C5679;
					.ellipsis;
				}				
			}			
		}
	}
}
.choice-main {
	margin-top:128upx;
	padding:0 30upx 20upx;
	background-image:url('@{imgUrl}bj.png');
	min-height:500upx;
	overflow:hidden;
	.common-1{
		.list{			
			.item{
				align-items:flex-start;
				.left{
					margin-right:30upx;
					image{
						width:142upx;
						height:205upx;
					}
				}
				.right{					
					.con{
						font-size:26upx;
						color:#666;
						margin:20upx 0;
						.line-clamp;
					}
				}
				
			} 
			
			
		}
	}
	.common-2{
		.item{
			align-items: center;
			justify-content: space-between;
			padding:40upx 0;
			.left{
				.title{
					width:600upx;
					font-size:32upx;
					color:#3D3D3D;
					font-weight: bold;
					margin-bottom:10upx;
					text{
						.ellipsis;
					}
					
				}
				.con{
					width:600upx;
					color:#666;
					font-size:26upx;
					text{
						.line-clamp;
					}
				}
			}
			.right{
				image{
					width:12upx;
					height:20upx;
				}
			}
		}
		
	}
	.image{
		margin-top:40upx;
		image{
			width:690upx;
			height:140upx;
		}
	}
	.manage{
		.list{
			margin-top:30upx;
			padding:40upx 30upx;
			background:#fff;
			box-shadow:-1px 0px 8px 0px rgba(58,86,151,0.24);
			display: flex;
			justify-content: space-between;
			.item{
				/* display: flex;
				flex-direction: column; */
				width: 163upx;
					image{
						width: 163upx;
						height: 224upx;
						box-shadow:2px 2px  6px 0px rgba(58,86,151,0.17);
					}
					text{
						.ellipsis;
					}
				
				
			}
			.title{
				width:180upx;
				margin-left: -2upx;
				font-size: 24upx !important;
			}
			
			}
		
		
	}
    .publication{
		margin-bottom: 30upx;
	}
}
.navigator-hover{background: none;opacity:1;}
</style>
