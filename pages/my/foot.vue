<template>
	<view>
		<view class="footprint-header">
			<view style="width:40upx;height:38upx;padding-top:50upx;" @tap="returnPre">
				<image src="../../static/images/home/return2.png" ></image>
			</view>	
			<text class="title">我的足迹</text>
			<text v-if="footmarkList.length>0" class="manage" @tap="manageFootmark">{{ !showBottom ? '管理' : '完成'}}</text>
			<text v-if="footmarkList.length<=0" class="manage2"></text>
		</view>
		<view class="mark"></view>
		<view class="main">
			<view class="list" scroll-y="true" @scrolltolower="lower">
				<view class="item" v-for="(item,index) in footmarkList" :key="index">
					<view class="date">
						<text>{{item.createTime}}</text>
					</view>
					<view class="resource-item" v-for="(item2,index2) in item.resourceInfo" :key="item2.res.id || item2.res.contentid || item2.res.resourceid"  @longpress="longtap(item2.res)">
						<!-- 图书列表 -->
						<view class="item-main" v-if="item2.res.resourceType==1">
							<view class="left" v-if="showBottom" @tap="changeChecked(item2.res)">
								<view class="default-icon" v-if="!item2.res.checked"></view>
								<view class="checked-icon" v-else>
									<image src="../../static/images/books/xuanze.png"></image>
								</view>
							</view>
							<view class="right" :class="{right2:showBottom}">
								<view class="book-item" @tap="toDetails('bookDetails',item2.res.resourceId,item2.res.status,0)">
									<view class="book-image">
										<image v-if="item2.res.cover && !item2.res.showDefault" :src="imagePath+item2.res.cover" @error="item2.res.showDefault=true"></image>
										<image v-if="!item2.res.cover || item2.res.showDefault" src="../../static/images/article/default.png"></image>
									</view>
									<view class="book-text">
										<view class="title">
											<text>{{item2.res.resourceName}}</text>
										</view>
										<view class="author" v-if="item2.res.author">
											<text>{{item2.res.author}}</text>
										</view>
										<view class="price">
											<text>￥</text>
											<text class="big"> {{item2.res.before}}</text>
											<text v-if="item2.res.after" style="fontSize:28upx;">.{{item2.res.after}}</text>
										</view>
										<view class="con" v-if="item2.res.intro">
											<text>{{filterTag(item2.res.intro)}}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 文章列表 -->
						<view class="item-main" v-if="item2.res.resourceType==2">
							<view class="left" v-if="showBottom" @tap="changeChecked(item2.res)">
								<view class="default-icon" v-if="!item2.res.checked"></view>
								<view class="checked-icon" v-else>
									<image src="../../static/images/books/xuanze.png"></image>
								</view>
							</view>
							<view class="right" :class="{right2:showBottom}">
								<view class="article-item" @tap="toDetails('articleDetails',item2.res.resourceId,item2.res.status,1)">
									<view class="title">
										<text>{{item2.res.resourceName}}</text>
									</view>
									<view class="con">
										<text>{{filterTag(item2.res.intro)}}</text>
									</view>
									<view class="price">
										<text>￥</text>
										<text class="big"> {{item2.res.before}}</text>
										<text v-if="item2.res.after" style="fontSize:28upx;">.{{item2.res.after}}</text>
									</view>
									<view class="origin" v-if="item2.res.fromBookName" @tap.stop="toDetails('bookDetails',item2.res.fromBookId,item2.res.bookStatus,0)">
										<text>《{{item2.res.fromBookName}}》</text>&nbsp;&nbsp;
										<text class="from">来源 &gt;</text>
									</view>
								</view>
							</view>
						</view>
						<!-- 音频列表 -->
						<view class="item-main" v-if="item2.res.resourceType==5">
							<view class="left" v-if="showBottom" @tap="changeChecked(item2.res)">
								<view class="default-icon" v-if="!item2.res.checked"></view>
								<view class="checked-icon" v-else>
									<image src="../../static/images/books/xuanze.png"></image>
								</view>
							</view>
							<view class="right" :class="{right2:showBottom}">
								<view class="audio-item">
									<view class="left" @tap="toDetails('audioDetails',item2.res.resourceId,item2.res.status,3)">
										<image src="../../static/images/audio/yinpin.png" mode=""></image>
										<text class="time">{{item2.res.videoTime}}</text>
									</view>
									<view class="right" @tap="toDetails('audioDetails',item2.res.resourceId,item2.res.status,3)">
										<view class="title" >
											<text>{{item2.res.resourceName}}</text>
										</view>
										<view class="price">
											<text>￥</text>
											<text class="big"> {{item2.res.before}}</text>
											<text v-if="item2.res.after" style="fontSize:28upx;">.{{item2.res.after}}</text>
										</view>
										<view class="origin" v-if="item2.res.fromBookName" @tap.stop="toDetails('bookDetails',item2.res.fromBookId,item2.res.bookStatus,0)">
											<text>《{{item2.res.fromBookName}}》</text>&nbsp;&nbsp;
											<text class="from">来源 &gt;</text>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 模板 -->
						<!-- <view class="item-main">
							<view class="left" v-if="showBottom">
								<view class="default-icon" v-if="true"></view>
								<view class="checked-icon" v-else>
									<image src="../../static/images/books/xuanze.png" ></image>
								</view>
							</view>
							<view class="right" :class="{right2:showBottom}">
							</view>
						</view> -->
						<!-- 图片列表 -->
						<view class="item-main" v-if="item2.res.resourceType==3">
							<view class="left" v-if="showBottom" @tap="changeChecked(item2.res)">
								<view class="default-icon" v-if="!item2.res.checked"></view>
								<view class="checked-icon" v-else>
									<image src="../../static/images/books/xuanze.png"></image>
								</view>
							</view>
							<view class="right" :class="{right2:showBottom}">
								<view class="img-item">
									<view @tap="toDetails('imgDetails',item2.res.resourceId,item2.res.status,2)">
										<image :src="imagePath+item2.res.cover"></image>
									</view>
									<view class="img-con" @tap="toDetails('imgDetails',item2.res.resourceId,item2.res.status,2)">
										<view class="title" >
											<text>{{item2.res.resourceName}}</text>
										</view>
										<view class="price">
											<text>￥</text>
											<text class="big"> {{item2.res.before}}</text>
											<text v-if="item2.res.after" style="fontSize:28upx;">.{{item2.res.after}}</text>
										</view>
										<view class="origin" v-if="item2.res.fromBookName" @tap.stop="toDetails('bookDetails',item2.res.fromBookId,item2.res.bookStatus,0)">
											<text>《{{item2.res.fromBookName}}》</text>&nbsp;&nbsp;
											<text class="from">来源 &gt;</text>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 其他列表 -->
						<view class="item-main" v-if="item2.res.resourceType==6">
							<view class="left" v-if="showBottom" @tap="changeChecked(item2.res)">
								<view class="default-icon" v-if="!item2.res.checked"></view>
								<view class="checked-icon" v-else>
									<image src="../../static/images/books/xuanze.png"></image>
								</view>
							</view>
							<view class="right" :class="{right2:showBottom}">
								<view class="other-item">
									<view class="left"  @tap="toDetails('otherDetails',item2.res.resourceId,item2.res.status,5)">
										<image v-if="item2.res.otherType ==1" src="../../static/images/home/excel.png"></image>
										<image v-if="item2.res.otherType ==2" src="../../static/images/home/word.png"></image>
										<image v-if="item2.res.otherType ==3" src="../../static/images/home/ppt.png"></image>
										<image v-if="item2.res.otherType ==4" src="../../static/images/home/pdf.png"></image>
										<image v-if="item2.res.otherType ==5" src="../../static/images/home/rar.png"></image>
										<image v-if="item2.res.otherType ==6" src="../../static/images/home/default.png"></image>
									</view>
									<view class="right" @tap="toDetails('otherDetails',item2.res.resourceId,item2.res.status,5)">
										<view class="title">
											<text>{{item2.res.resourceName}}</text>
										</view>
										<view class="price">
											<text>￥</text>
											<text class="big"> {{item2.res.before}}</text>
											<text v-if="item2.res.after" style="fontSize:28upx;">.{{item2.res.after}}</text>
										</view>
										<view class="origin" v-if="item2.res.fromBookName" @tap.stop="toDetails('bookDetails',item2.res.fromBookId,item2.res.bookStatus,5)">
											<text>《{{item2.res.fromBookName}}》</text>&nbsp;&nbsp;
											<text class="from">来源 &gt;</text>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 视频列表 -->
						<view class="item-main" v-if="item2.res.resourceType==4">
							<view class="left" v-if="showBottom" @tap="changeChecked(item2.res)">
								<view class="default-icon" v-if="!item2.res.checked"></view>
								<view class="checked-icon" v-else>
									<image src="../../static/images/books/xuanze.png"></image>
								</view>
							</view>
							<view class="right" :class="{right2:showBottom}">
								<view class="video-item">
									<view class="video-top" @tap="toDetails('videoDetails',item2.res.resourceId,item2.res.status,4)">
										<image :src="imagePath+item2.res.cover"></image>
										<!-- <image v-else src="../../static/images/audio/yinpin.png"></image> -->
										<text class="time">{{item2.res.videoTime}}</text>
									</view>
									<view class="video-con">
										<view class="title" @tap="toDetails('videoDetails',item2.res.resourceId,item2.res.status,4)">
											<text>{{item2.res.resourceName}}</text>
										</view>
										<view class="price">
											<text>￥</text>
											<text class="big"> {{item2.res.before}}</text>
											<text v-if="item2.res.after" style="fontSize:28upx;">.{{item2.res.after}}</text>
										</view>
										<view class="origin" v-if="item2.res.fromBookName" @tap="toDetails('bookDetails',item2.res.fromBookId,item2.res.bookStatus,0)">
											<text>《{{item2.res.fromBookName}}》</text>&nbsp;&nbsp;
											<text class="from">来源 &gt;</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 正在加载中 -->
				<view class="loadingList" v-if="!isShowLoad&&footmarkList.length==0" >
					<image src="../../static/images/home/loading.png" mode=""></image>
				</view>
				<!-- 暂无数据 -->
				<view class="noHave" v-if="footmarkList.length==0&&isShowLoad">
					<image src="../../static/images/my/nohave.png" mode=""></image>
					<text>暂无足迹</text>
				</view>
				<view style="height: 60upx; width:100%;text-align: center;color: #555555;" :class="{item2:showBottom}" v-if="footmarkList.length>0"><!--  v-if="len>=rows" -->
					{{loadingType==0?loadingText.contentdown:loadingType==1?loadingText.contentrefresh:loadingText.contentnomore}}
				</view>
			</view>
		</view>
		
		<view class="bottom" v-if="showBottom && footmarkList.length>0" >
			<view class="left">
				<view class="icon" @tap="changeAllChecked">
					<view class="default-icon" v-if="!checkAll"></view>
					<view class="checked-icon" v-if="checkAll">
						<image src="../../static/images/books/xuanze.png"></image>
					</view>
					<text class="all">全选</text>
				</view>
			</view>
			<view class="right">
				<view class="del" @tap="deleteFootmark">
					<text>删除</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		getFootmarkAPI,
		deleteFootmarkAPI
	} from '../../api/info.js'
	export default {
		data() {
			return {
				showBottom: false,
				checkAll: false,
				footmarkList: [],
				page: 1,
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loadingType: 0,
				dataTotal: 0,
				sum: 0,
				pullDown: false,
				rows:6,
				imagePath:'',
				len:0,
				isShowLoad:false,
			};
		},
		methods: {
			filterTag(str){
				return str = str.replace(/<\/?[^>]*>/g,'');
			},
			returnPre() {
				var pages = getCurrentPages();
				if(pages.length==1){
					history.back();
				}
				uni.navigateBack({
					delta: 1
				});
			},
			//获取我的足迹
			getFootmarkList() {
				this.isShowLoad=false;
				getFootmarkAPI({
					memberid: this.userId,
					page: this.page,
					rows: this.rows
				}).then(res => {
					this.isShowLoad=true;
					this.dataTotal = res.data.page.total;
					if (res.data.page.total > 0) {
						if (this.page == 1) {
							this.footmarkList = res.data.page.rows;
						} else {
							res.data.page.rows.map(v1 => {
								let time = v1.createTime.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1年$2月$3日');
								let last = this.footmarkList[this.footmarkList.length - 1];
								if (last.createTime == time) {
									last.resourceInfo.push(...v1.resourceInfo);
								} else {
									this.footmarkList.push(v1)
								}
							})
						}
						if (this.dataTotal <= this.footmarkList.length) {
							this.loadingType = 2;
						} else {
							this.loadingType = 0;
						}
					} else {
						this.footmarkList = [];
						this.loadingType = null;
					}
					if(this.footmarkList.length<=6){
						this.loadingType=2;
					}
					this.len = 0;
					this.footmarkList.map(v => {
						v.createTime = v.createTime.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1年$2月$3日');
						v.resourceInfo.map(val => {
							if (val.res.resourceType == 2 && val.res.bookName) { //文章图书名称显示23个字
								val.res.bookName = val.res.bookName.length > 23 ? val.res.bookName.slice(0, 23) + '...' : val.res.bookName;
							}
							if (val.res.resourceType == 6) { //其他类型
								var type = val.res.cover.slice(val.res.cover.lastIndexOf('.') + 1);
								switch (type) {
									case 'xls':
									case 'xlsx':
										val.res.otherType = 1;
										break;
									case 'doc':
									case 'docx':
										val.res.otherType = 2;
										break;
									case 'ppt':
									case 'pptx':
										val.res.otherType = 3;
										break;
									case 'pdf':
										val.res.otherType = 4;
										break;
									case 'rar':
										val.res.otherType = 5;
										break;
									default:
										val.res.otherType = 6;
								}
							}
							if (val.res.resourceType == 4 || val.res.resourceType == 5) { //视频、音频
								if(val.res.videoTime){
									val.res.videoTime = val.res.videoTime.replace(/分/g, ':').replace(/秒/, '');
								}
							}
							this.$set(val.res,'showDefault',false);
							if(val.res.isPay){
								// isPay为string类型
								this.splitPrice(val.res.isPay,val.res);
							}else {
								// price字段为number类型
								this.splitPrice(val.res.price+'',val.res)
							}
							return val;
						})
						this.len += v.resourceInfo.length;
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
			//单选
			changeChecked(item) {
				item.checked = !item.checked;
				this.checkAll = this.footmarkList.every(v => {
					return v.resourceInfo.every(val => val.res.checked);
				})
			},
			//全选
			changeAllChecked() {
				this.checkAll = !this.checkAll;
				this.footmarkList.map(v => {
					v.resourceInfo.map(val => {
						val.res.checked = this.checkAll;
					})
				})
			},
			//批量删除
			deleteFootmark() {
				this.isShowLoad=false;
				var bool = this.footmarkList.every(v => {
					return v.resourceInfo.every(val => !val.res.checked);
				})
				if (bool) {
					uni.showToast({
						title: '请至少选择一种资源',
						icon: 'none'
					})
					return
				}
				var ids = [];
				this.footmarkList.map(v => {
					v.resourceInfo.map(val => {
						if (val.res.checked) {
							ids.push(val.res.resourceId);
						}
					});
				})
				// console.log(...ids)
				ids = ids.toString();
				deleteFootmarkAPI({
					memberid: this.userId,
					ids: ids
				}).then(res => {
					// console.log(res)
					if (res.data.status == 1) { //删除成功
						this.page=1;
						this.checkAll = false;
						this.getFootmarkList();
						uni.showToast({
							title:'删除成功！',
							icon:'none'
						})
					}
				})
			},
			//点击管理，将所有选中改为非选中
			manageFootmark() {
				this.showBottom = !this.showBottom;
				if(this.showBottom){
					this.footmarkList.map(v => {
						v.resourceInfo.map(val => {
							val.res.checked = false;
						})
					})
					this.checkAll = false;
				}
			},
			//长按
			longtap(item){
				item.checked = true;
				this.showBottom = true;
			},
			toDetails(url,id,status,type){
				if(status != 1){//商品下架或删除
					//跳转到失效页面
					uni.navigateTo({
						url: '/pages/my/invalid?type='+type
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
			this.getFootmarkList();
			this.imagePath = this.imgURL()
		},
		onPullDownRefresh() {
			this.isShowLoad=false;
			this.page = 1;
			this.pullDown = true;
			this.getFootmarkList()
		},
		onReachBottom() {
			this.isShowLoad=false;
			this.sum = 0;
			this.footmarkList.map(v => {
				this.sum += v.resourceInfo.length;
				return this.sum
			})
			console.log(this.sum,'加起来',this.footmarkList.length)
			if (this.dataTotal > this.sum) {
				this.loadingType = 1;
				this.page++;
				this.getFootmarkList();
			} else {
				this.loadingType = 2;
				this.isShowLoad=true;
			}
		},
		computed:{
			userId(){
				return this.$store.getters.userId;
			}
		}
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

	.footprint-header {
		width: 690upx;
		position: fixed;
		top: 0;
		height: 150upx;
		background:linear-gradient(40deg,#6080CB,#4465B7);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30upx;
		font-size: 36upx;
		color: #FFFFFF;
		z-index: 5;

		.title {
			margin-top: 50upx;
		}

		.manage {
			display: block;
			margin-top: 50upx;
			height: 48upx;
			line-height: 48upx;
		}
		.manage2{
			display: block;
			margin-top: 50upx;
			height: 48upx;
			line-height: 48upx;
			width:72upx;
		}
		image {
			width: 22upx;
			height: 38upx;
			/* margin-right: 50upx; */
			// margin-top: 50upx;
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

		.list {
			.item {
				padding: 30upx 30upx;
				margin-bottom: 20upx;
				background: #fff;
				.date {
					color: #666666;
					font-size: 26upx;
					// margin-bottom:38upx;
				}
				.resource-item {
					border-bottom: 1upx solid #E0E1E8;
				}
				.item-main {
					width: 100%;
					display: flex;
					border-top: 1upx solid #E0E1E8;
					justify-content: space-between;
					align-items: center;
					.left {
						width: 10%;
						.default-icon {
							width: 34upx;
							height: 34upx;
							border: 2upx solid #C3C3C3;
							border-radius: 50%;
						}
						.checked-icon {
							width: 34upx;
							height: 34upx;
							image {
								width: 34upx;
								height: 34upx;
							}
						}
					}
					.right {
						width: 100%;
						.book-item {
							padding: 30upx 0;
							display: flex;
							justify-content: flex-start;
							align-items: center;
							.book-image {
								width: 160upx;
								height: 220upx;
								margin-right: 30upx;
								image {
									width: 160upx;
									height: 220upx;
								}
							}
							.book-text {
								// height:206upx;
								width: 72%;
								height:220upx;
								display:flex;
								flex-direction: column;
								align-items: flex-start;
								justify-content: flex-start;
								.title {
									width: 100%;
									color: #3D3D3D;
									font-size: 34upx;
									font-weight: bold;
									line-height: 34upx;
									// margin-top:10upx;
									.ellipsis;
								}
								.author {
									color: #8E8F91;
									font-size: 24upx;
									// margin-top: 10upx;
									margin-top: 10upx;
								}
								.price {
									color: #D61F1F;
									font-weight: bold;
									font-size: 36upx;
									line-height: 36upx;
									margin-top: 10upx;
									.small {
										font-size: 28upx;
									}
								}
								.con {
									color: #666666;
									font-size: 26upx;
									line-height: 36upx;
									margin-top:20upx;
									.line-clamp
								}
							}
						}
						.article-item {
							padding: 30upx 0;
							.title {
								color: #3D3D3D;
								font-size: 34upx;
								font-weight: bold;
								width: 100%;
								.ellipsis
							}
							.con {
								color: #8E8F91;
								font-size: 26upx;
								.line-clamp
							}
							.price {
								color: #D61F1F;
								font-size: 28upx;
								font-weight: bold;
								.big {
									font-size: 36upx;
								}
							}
							.origin {
								color: #8E8F91;
								font-size: 24upx;
								.from {
									color: #4C5679;
								}
							}
						}
						.audio-item {
							display: flex;
							justify-content: flex-start;
							padding: 30upx 0;
							.left {
								position: relative;
								width: 142upx;
								height: 142upx;
								margin-right: 40upx;
								.time {
									position: absolute;
									right: 10upx;
									bottom: 16upx;
									color: #fff;
									height: 20upx;
									font-size: 20upx;
								}
								image {
									width: 142upx;
									height: 142upx;
									border-radius: 10upx;
								}
							}
							.right {
								width:72%;
								.title {
									color: #3D3D3D;
									width:100%;
									font-size: 34upx;
									font-weight: bold;
									height: 40upx;
									line-height: 40upx;
									.ellipsis
								}
								.price {
									color: #D61F1F;
									font-size: 28upx;
									font-weight: bold;
									.big {
										font-size: 36upx;
									}
								}
								.origin {
									color: #8E8F91;
									font-size: 24upx;
									width: 430upx;
									.ellipsis;
									.from {
										color: #4C5679;
									}
								}
							}
						}
						.img-item {
							padding: 30upx 0;
							image {
								width: 100%;
								height: 350upx;
								border-radius: 8upx;
								filter:blur(4upx);//设置图片模糊距离
							}
							.img-con {
								.title {
									color: #3D3D3D;
									font-size: 34upx;
									font-weight: bold;
									width: 100%;
									height: 40upx;
									line-height: 40upx;
									.ellipsis
								}
								.price {
									color: #D61F1F;
									font-size: 28upx;
									font-weight: bold;
									.big {
										font-size: 36upx;
									}
								}
								.origin {
									color: #8E8F91;
									font-size: 24upx;
									width: 100%;
									.ellipsis;
									.from {
										color: #4C5679;
									}
								}
							}
						}
						.other-item {
							display: flex;
							justify-content: flex-start;
							padding: 30upx 0;
							.left {
								width: 112upx;
								height: 142upx;
								margin-right: 40upx;
								image {
									width: 112upx;
									height: 142upx;
								}
							}
							.right {
								width:78%;
								.title {
									color: #3D3D3D;
									font-size: 34upx;
									font-weight: bold;
									width: 100%;
									.ellipsis
								}
								.price {
									color: #D61F1F;
									font-size: 28upx;
									font-weight: bold;
									line-height: 40upx;
									.big {
										font-size: 36upx;
									}
								}
								.origin {
									color: #8E8F91;
									font-size: 24upx;
									width: 430upx;
									.ellipsis;
									.from {
										color: #4C5679;
									}
								}
							}
						}
						.video-item {
							padding: 30upx 0;
							.video-top {
								width: 100%;
								height: 350upx;
								position: relative;
								margin-bottom:20upx;
								image {
									width: 100%;
									height: 350upx;
									border-radius: 8upx;
								}
								.time {
									position: absolute;
									bottom: 20upx;
									right: 10upx;
									color: #fff;
									font-size: 24upx;
								}
							}
							.video-con {
								.title {
									color: #3D3D3D;
									font-size: 34upx;
									font-weight: bold;
									width: 100%;
									height: 40upx;
									line-height: 40upx;
									.ellipsis
								}
								.price {
									color: #D61F1F;
									font-size: 28upx;
									font-weight: bold;

									.big {
										font-size: 36upx;
									}
								}
								.origin {
									color: #8E8F91;
									font-size: 24upx;
									width: 100%;
									.ellipsis;
									.from {
										color: #4C5679;
									}
								}
							}
						}
					}
					.right2 {
						width: 90%;
// 						.book-item {
// 							.book-text {
// 								width: 450upx;
// 								.title{
// 									width: 450upx;
// 								}
// 							}
// 						}
					}
				}
				.item-main:first-child {
					border-top: none;
				}
			}

			// 		.item2:last-child{
			// 			margin-bottom:100upx;
			// 		}
		}
		.item2 {
			margin-bottom: 100upx;
		}
	}
	.bottom {
		position: fixed;
		// bottom:100upx;//web端
		bottom: 0; //手机端
		width: 100%;
		height: 90upx;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top:1upx solid #E0E1E8;
		.left {
			margin-left: 30upx;
			.icon {
				margin-right: 30upx;
				display: flex;
				align-items: center;
				.default-icon {
					width: 34upx;
					height: 34upx;
					border: 2upx solid #C3C3C3;
					border-radius: 50%;
				}
				.checked-icon {
					width: 38upx;
					height: 38upx;
					image {
						width: 38upx;
						height: 38upx;
					}
				}
				.all {
					font-size: 24upx;
					color: #585858;
					margin-left: 10upx;
				}
			}
		}
		.right {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.del {
				width: 158upx;
				height: 60upx;
				border: 1upx solid #3A5697;
				font-size: 26upx;
				color: #3A5697;
				text-align: center;
				line-height: 60upx;
				color: #fff;
				background: #3A5697;
				margin: 0 30upx 0 20upx;
			}
		}
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
		/* 正在加载中 */
		.loadingList{
			width:100%;
			padding-top: 600upx;
			text-align: center;
			height:600upx;
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
</style>
