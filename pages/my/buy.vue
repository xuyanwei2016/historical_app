<template>
	<view class="uni-tab-bar" style="height: 100%;">
		<!-- 横向导航 -->
		<view class="uni-navbar" :class="{'uni-navbar-fixed':true}">

			<view class="loginTop">
				<view class="loginBtn">
					<view class="loginBack" @tap="back">
						<image src="../../static/images/home/return2.png" style="width:22upx; height:38upx;"></image>
					</view>
					<view class="loginText">
						我的购买
					</view>
					<view class="loginRegister"></view>
				</view>
			</view>


			<view class="uni-tab-bar11">
				<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
					<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']"
					 :id="tab.id" :data-current="index" @tap="tapTab(index)">
						<view class="wordCont" style="color:#fff">{{tab.name}}
							<text style="font-size: 26upx;">{{total[tab.id+'Total']}}</text>
						</view>
						<view :class="[tabIndex==index ? 'borderBtm' : '']"></view>
					</view>

				</scroll-view>


			</view>



		</view>








		<!-- 列表数据 -->
		<view class="swiper-box" v-bind:style="{height: scollHeight}">

			<!-- <swiper-item v-for="(tab,index1) in tabBars" :key="index1"> -->
			<scroll-view class="list" scroll-y @scrolltolower="loadMore(tabIndex)">
				<!-- @scrolltoupper="scrollTop" @scroll="scroll"  @scroll="scroll"-->
				<view>
					<!--  @touchstart="touchStar" @touchend="touchEnd" @touchmove="touchMove" -->
					<!-- 图书 -->
					<block v-for="(newsitem,index2) in bookData" :key="index2" v-if="tabIndex==0">

						<view class="bookCss">
							<view class="orderTime">
								付款时间：{{newsitem.buyTime}}
							</view>
							<view class="orderCont" @tap="linkHref('/pages/home/bookDetails?id=',newsitem.id)">
								<image src="../../static/images/article/default.png" mode="" style="width: 125upx;height:172upx;" v-if="!newsitem.cover||newsitem.cover==''"></image>

								<image :src="imagePath+newsitem.cover" mode="" style="width: 125upx;height:172upx;" v-if="newsitem.cover"></image>


								<view class="wordCon">
									<view class="title">
										<navigator :url="'/pages/home/bookDetails?id='+newsitem.id" hover-class="none">{{newsitem.name}}</navigator>
									</view>
									<view class="name" v-if="newsitem.author&&newsitem.author!=''">{{newsitem.author}}</view>
									<!-- <view class="price">￥<text>{{newsitem.price}}</text></view> -->
									<view class="introduce" v-if="newsitem.intro&&newsitem.intro!=''">{{newsitem.intro}}</view>
								</view>

							</view>

						</view>

					</block>


					<!-- 文章 -->
					<block v-if="tabIndex==1" v-for="(newsitem,index3) in contentData" :key="index3">
						<view class="articleCss">
							<view class="orderTime">
								付款时间：{{newsitem.buyTime}}
							</view>
							<view class="orderCont">
								<view class="wordCon">
									<view class="title">
										<navigator :url="'/pages/home/articleDetails?id='+newsitem.contentid" hover-class="none">{{newsitem.title}}</navigator>
									</view>

									<view class="introduce" v-if="newsitem.intro&&newsitem.intro!=''" @tap="linkHref('/pages/home/articleDetails?id=',newsitem.contentid)">{{newsitem.intro}}</view>
									<!-- <view class="price">￥<text>{{newsitem.price}}</text></view> -->
									<view class="name" v-if="newsitem.bookName" @tap="linkBookDetail('/pages/home/bookDetails?id=',newsitem.bookid,newsitem)">
										<!-- <navigator :url="'/pages/home/bookDetails?id='+newsitem.bookid" hover-class="none"> -->《{{newsitem.bookName}}》<text>来源
											&gt;</text><!-- </navigator> -->
									</view>
								</view>

							</view>

						</view>
					</block>


					<!-- 图片 -->
					<block v-if="tabIndex==2" v-for="(newsitem,index4) in imageData" :key="index4">

						<view class="imagesCss">
							<view class="orderTime">
								付款时间：{{newsitem.buyTime}}
							</view>
							<view class="orderCont">
								<view class="radioImg">
									<image :src="imagePath+newsitem.path" mode="" style="width: 690upx;height:350upx;" v-if="tabIndex==2" @tap="linkHref('/pages/home/imgDetails?id=',newsitem.resourceid)"></image>
								</view>
								<view class="wordCon">
									<view class="title">
										<navigator :url="'/pages/home/imgDetails?id='+newsitem.resourceid" v-if="tabIndex==2" hover-class="none">{{newsitem.resourceName}}</navigator>
									</view>

									<!-- <view class="introduce">就业是劳动力供给和需求的结果，我国供给规模超目前呈现出的酒也困挠问题从量上看是劳动力供给规模超越…</view> -->
									<!-- <view class="price">￥<text>{{newsitem.price}}</text></view> -->
									<view class="name" v-if="newsitem.bookName" @tap="linkBookDetail('/pages/home/bookDetails?id=',newsitem.bookid,newsitem)">
										<!-- <navigator :url="'/pages/home/bookDetails?id='+newsitem.bookid" hover-class="none"> -->《{{newsitem.bookName}}》<text>来源
											&gt;</text><!-- </navigator> -->
									</view>
								</view>

							</view>

						</view>
					</block>



					<!-- 音频 -->
					<block v-if="tabIndex==3" v-for="(newsitem,index5) in autioData" :key="index5">

						<view class="radioCss">
							<view class="orderTime">
								付款时间：{{newsitem.buyTime}}
							</view>
							<view class="orderCont">
								<view class="radioImg" @tap="linkHref('/pages/home/audioDetails?id=',newsitem.resourceid)">
									<image :src="imagePath+newsitem.cover" mode="" style="width: 146upx;height:146upx;" v-if="newsitem.cover"></image>
									<image src="../../static/images/audio/yinpin.png" mode="" style="width: 146upx;height:146upx;"  v-if="!newsitem.cover"></image>

									<view class="radioWord">{{newsitem.videoTime}}</view>
								</view>

								<view class="wordCon">
									<view class="title">
										<navigator :url="'/pages/home/audioDetails?id='+newsitem.resourceid" hover-class="none">{{newsitem.resourceName}}</navigator>
									</view>
									<view class="name" v-if="newsitem.bookName" @tap="linkBookDetail('/pages/home/bookDetails?id=',newsitem.bookid,newsitem)">
										<!-- <navigator :url="'/pages/home/bookDetails?id='+newsitem.bookid" hover-class="none"> -->《{{newsitem.bookName}}》<text>来源
											&gt;</text><!-- </navigator> -->
									</view>
								</view>

							</view>

						</view>
					</block>

					<!-- 视频 -->

					<block v-if="tabIndex==4" v-for="(newsitem,index4) in videoData" :key="index4">

						<view class="imagesCss">
							<view class="orderTime">
								付款时间：{{newsitem.buyTime}}
							</view>
							<view class="orderCont">
								<view class="radioImg">

									<image :src="imagePath+newsitem.previewPath" mode="" style="width: 690upx;height:350upx;" @tap="linkHref('/pages/home/videoDetails?id=',newsitem.resourceid)"></image>
									<view class="radioWord" @tap="linkHref('/pages/home/videoDetails?id=',newsitem.resourceid)">{{newsitem.videoTime}}</view>
								</view>
								<view class="wordCon">
									<view class="title">

										<navigator :url="'/pages/home/videoDetails?id='+newsitem.resourceid" hover-class="none">{{newsitem.resourceName}}</navigator>
									</view>

									<!-- <view class="introduce">就业是劳动力供给和需求的结果，我国供给规模超目前呈现出的酒也困挠问题从量上看是劳动力供给规模超越…</view> -->
									<!-- <view class="price">￥<text>{{newsitem.price}}</text></view> -->
									<view class="name" v-if="newsitem.bookName" @tap="linkBookDetail('/pages/home/bookDetails?id=',newsitem.bookid,newsitem)">
										<!-- <navigator :url="'/pages/home/bookDetails?id='+newsitem.bookid" hover-class="none"> -->《{{newsitem.bookName}}》<text>来源
											&gt;</text><!-- </navigator> -->
									</view>
								</view>

							</view>

						</view>
					</block>

					<!-- 其他 -->
					<block v-if="tabIndex==5" v-for="(newsitem,index6) in otherData" :key="index6">
						<view class="otherCss">
							<view class="orderTime">
								付款时间：{{newsitem.buyTime}}
							</view>
							<view class="orderCont">
								<view class="radioImg" @tap="linkHref('/pages/home/otherDetails?id=',newsitem.resourceid)">
									<image :src="newsitem.picType" style="width: 112upx;height:142upx;"></image>
									<!-- <image src="'../../static/images/home/ppt.png" mode="" style="width: 112upx;height:142upx;"></image> -->

								</view>



								<view class="wordCon">
									<view class="title">
										<navigator :url="'/pages/home/otherDetails?id='+newsitem.resourceid" hover-class="none">{{newsitem.resourceName}}</navigator>
									</view>

									<!-- <view class="price">￥<text>{{newsitem.price}}</text></view> -->
									<view class="name" v-if="newsitem.bookName" @tap="linkBookDetail('/pages/home/bookDetails?id=',newsitem.bookid,newsitem)">
										<!-- <navigator :url="'/pages/home/bookDetails?id='+newsitem.bookid" hover-class="none"> -->《{{newsitem.bookName}}》<text>来源
											&gt;</text><!-- </navigator> -->
									</view>
								</view>

							</view>

						</view>

					</block>


				</view>
				<!-- 正在加载中 -->
				<view class="loadingList" v-if="!isShowLoad" >
					<image src="../../static/images/home/loading.png" mode=""></image>
				</view>

				<!-- 暂无数据 -->
				<view class="noHave" v-if="dataType.length==0&&isShowLoad">
					<image src="../../static/images/my/nohave.png" mode=""></image>
					<text>暂无购买</text>

				</view>



				<view class="load-more" v-if="dataType.length>0">
					<!-- 动图转 -->
					<!-- <view class="loading-img" v-show="loadingType == 1 ">
						<view class="load1">
							<view :style="{background:color}"></view>
							<view :style="{background:color}"></view>
							<view :style="{background:color}"></view>
							<view :style="{background:color}"></view>
						</view>
						<view class="load2">
							<view :style="{background:color}"></view>
							<view :style="{background:color}"></view>
							<view :style="{background:color}"></view>
							<view :style="{background:color}"></view>
						</view>
						<view class="load3">
							<view :style="{background:color}"></view>
							<view :style="{background:color}"></view>
							<view :style="{background:color}"></view>
							<view :style="{background:color}"></view>
						</view>
					</view>
					 --><!-- 动图圈结束 -->
					<text class="loading-text" :style="{color:color}">{{loadingType == 0 ? loadingText.contentdown : (loadingType == 1 ? loadingText.contentrefresh : loadingText.contentnomore)}}</text>
				</view>

			</scroll-view>
			<!-- </swiper-item> -->
		</view>
	</view>
</template>
<script>
	import uniIcon from "@/components/uni-icon.vue";
	import {
		getMyPurchaseAPI,
		getMyPurchaseCountAPI
	} from '../../api/my.js';
	export default {
		components: {
			uniIcon
		},
		data() {
			return {
				color: "#777777",
				showImage: true,
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				scrollLeft: 0,
				isClickChange: false,
				tabIndex: 0,
				newsitems: {
					book: {
						loadingType: 0,
						data: [],
					},
					content: {
						loadingType: 0,
						data: [],
					},
					image: {
						loadingType: 0,
						data: [],
					},
					autio: {
						loadingType: 0,
						data: [],
					},
					video: {
						loadingType: 0,
						data: [],
					},


					other: {
						loadingType: 0,
						data: [],
					}
				},

				bookData: [],
				contentData: [],
				imageData: [],
				autioData: [],
				videoData: [],
				otherData: [],


				tabBars: [{
					name: '图书 ',
					id: 'book',
					heightNum: 101
				}, {
					name: '文章 ',
					id: 'content',
					heightNum: 342
				}, {
					name: '图片 ',
					id: 'image',
					heightNum: 592
				}, {
					name: '音频 ',
					id: 'autio',
					heightNum: 312,
				}, {
					name: '视频 ',
					id: 'video',
					heightNum: 592
				}, {
					name: '其它 ',
					id: 'other',
					heightNum: 292
				}],
				scollHeight: 0,
				deviceWidth: 0, //设备宽度
				dataPage: {
					book: 1,
					content: 1,
					image: 1,
					autio: 1,
					video: 1,
					other: 1
				},
				total: [],
				imagePath: '',

				startPx: 0,
				endPx: 0,

				scrollTopBo: true,
				aaaa: 0,
				dataType: [],
				loadingType: 0,
				userType: null,
				
				isShowLoad:false,

			}
		},
		onLoad: function() {
			this.isShowLoad=false;
			this.imagePath = this.imgURL().slice(0, this.imgURL().length - 1)
			/* this.getclassify(); */
			this.getMyPurchaseCount();

		},
		/* onPageScroll(e) {
			console.log("11111111",e)
		}, */
		/* watch: {
			startPx(newValue, oldValue) {
				console.log("监听事件")
				this.getCurPage(false)
			}
		}, */
		/* 下拉刷新 */
		onPullDownRefresh() {
			/* this.$forceUpdate(); */
			this.loadingType=1;
			this.isShowLoad=false;
			let itemId = this.tabBars[this.tabIndex].id;
			/* this.newsitems[itemId].data = []; */
			this.dataPage[itemId] = 1;
			if (this.tabIndex == 0) {
				this.bookData = [];
			} else if (this.tabIndex == 1) {
				this.contentData = [];
			} else if (this.tabIndex == 2) {
				this.imageData = [];
			} else if (this.tabIndex == 3) {
				this.autioData = [];
			} else if (this.tabIndex == 4) {
				this.videoData = [];
			} else if (this.tabIndex == 5) {
				this.otherData = [];
			}
			this.getMyPurchaseCount();
		},

		methods: {
			/* getCurPage(bool){
				const pages = getCurrentPages();  
				const len = pages.length;
				const page = pages[len - 1]; 
				// #ifdef APP-PLUS
				const currentWebview = page.$getAppWebview();
				console.log(currentWebview)
				currentWebview.setStyle({  
				  pullToRefresh: {  
					support: bool,
					style: plus.os.name === 'Android' ? 'circle' : 'default' 
				  }  
				});
				// #endif
			}, */
			/* 获取类别后面的总数 */
			getMyPurchaseCount() {
				getMyPurchaseCountAPI({
					memberid: this.$store.state.userId,
				}).then(res => {
					let totalType = res.data.uniqueValue;
					this.total = {
						bookTotal: totalType.bookTotal ? totalType.bookTotal : 0,
						contentTotal: totalType.contentTotal ? totalType.contentTotal : 0,
						imageTotal: totalType.imageTotal ? totalType.imageTotal : 0,
						autioTotal: totalType.autioTotal ? totalType.autioTotal : 0,
						videoTotal: totalType.videoTotal ? totalType.videoTotal : 0,
						otherTotal: totalType.otherTotal ? totalType.otherTotal : 0,
					};
					this.getclassify();
				})
			},
			/* 获取页面列表数据 */
			getclassify() {

				/* if(val==1){
					this.scrollTopBo=true;
				}else{
					this.scrollTopBo=false;
				} */

				let itemIndex11 = this.tabIndex;

				this.tabIndex == 4 ? itemIndex11 = 3 : this.tabIndex == 3 ? itemIndex11 = 4 : true;


				//this.newsitems[this.tabBars[this.tabIndex].id].loadingType = 1;
				getMyPurchaseAPI({
					memberid: this.$store.state.userId,
					objectType: itemIndex11 + 1,
					page: this.dataPage[this.tabBars[this.tabIndex].id],
					rows: 10,

				}).then(res => {
					this.isShowLoad=true;
					uni.stopPullDownRefresh();

					let itemClass = {};
					itemClass.data = res.data.page.rows;
					itemClass.loadingType = 0;
					let itemId = this.tabBars[this.tabIndex].id;
					let datas = [];

					if (this.tabIndex == 0) {
						this.bookData.push(...res.data.page.rows);
						this.dataType = this.bookData;
					} else if (this.tabIndex == 1) {
						this.contentData.push(...res.data.page.rows);
						this.dataType = this.contentData;
					} else if (this.tabIndex == 2) {
						this.imageData.push(...res.data.page.rows);
						this.dataType = this.imageData;
					} else if (this.tabIndex == 3) {
						this.autioData.push(...res.data.page.rows);
						datas = this.autioData;
						this.dataType = this.autioData;
					} else if (this.tabIndex == 4) {
						this.videoData.push(...res.data.page.rows);
						datas = this.videoData;
						this.dataType = this.videoData;
					} else if (this.tabIndex == 5) {
						this.otherData.push(...res.data.page.rows);
						this.dataType = this.otherData;
					}

					/* this.$forceUpdate(); */
					//this.newsitems[itemId].data = this.newsitems[itemId].data.concat(itemClass.data);
					//this.$set(this.newsitems[itemId],"data",this.newsitems[itemId].data)
					//this.newsitems[itemId].loadingType = 0;

					//console.log(this.newsitems[itemId], this.newsitems[itemId].data);

					if (this.dataType.length >= this.total[itemId + 'Total'] || this.total[itemId + 'Total'] <= 10) { //没有更多了
						this.loadingType = 2;

					} else {
						this.loadingType = 0;
					}


					//let datas = this.newsitems[itemId].data;
					if (this.tabIndex == 5) {
						console.log(datas)
						for (let k = 0; k < this.otherData.length; k++) {

							let itemType = this.otherData[k].resourceName.substr(-4).toLocaleLowerCase();


							if (itemType == 'xlsx' || itemType == '.xls') {
								this.otherData[k].picType = '../../static/images/home/excel.png';
							} else if (itemType == 'docx' || itemType == '.doc') {
								this.otherData[k].picType = '../../static/images/home/word.png';
							} else if (itemType == '.pdf') {
								this.otherData[k].picType = '../../static/images/home/pdf.png';
							} else if (itemType == '.ppt') {
								this.otherData[k].picType = '../../static/images/home/ppt.png';
							} else if (itemType == '.zip') {
								this.otherData[k].picType = '../../static/images/home/zip.png';
							} else if (itemType == '.rar') {
								this.otherData[k].picType = '../../static/images/home/rar.png';
							} else {
								this.otherData[k].picType = '../../static/images/home/default.png';
							}
						}
					}

					if (this.tabIndex == 3 || this.tabIndex == 4) {

						for (let k = 0; k < datas.length; k++) {
							console.log('时间', datas[k])
							datas[k].videoTime = datas[k].videoTime.replace(/分/g, ':').replace(/秒/, '');
						}

					}

				})
				console.log("下拉刷新时--获取数据", this.newsitems)
				let aaa = uni.getSystemInfoSync().screenWidth * 212 / 750;
				this.scollHeight = uni.getSystemInfoSync().screenHeight - aaa + 'px';


			},

			back() {
				var pages = getCurrentPages();
				if(pages.length==1){
					history.back();
				}
				uni.navigateBack({
					delta: 1
				})
			},

			itemMsg() {
				let itemData = null;
				if (this.tabIndex == 0) {
					itemData = this.bookData;
					this.dataType = this.bookData;
				} else if (this.tabIndex == 1) {
					itemData = this.contentData;
					this.dataType = this.contentData;
				} else if (this.tabIndex == 2) {
					itemData = this.imageData;
					this.dataType = this.imageData;
				} else if (this.tabIndex == 3) {
					itemData = this.autioData;
					this.dataType = this.autioData;
				} else if (this.tabIndex == 4) {
					itemData = this.videoData;
					this.dataType = this.videoData;
				} else if (this.tabIndex == 5) {
					itemData = this.otherData;
					this.dataType = this.otherData;
				}
				return itemData
			},

			loadMore(e) {
				let valId = e;
				let valData = this.itemMsg();

				this.tabIndex == 0 ? valId = 'book' : this.tabIndex == 1 ? valId = 'content' : this.tabIndex == 2 ? valId = 'image' :
					this.tabIndex == 3 ? valId = 'autio' : this.tabIndex == 4 ?
					valId = 'video' : valId = 'other';

				if (valData.length >= this.total[valId + 'Total']) {

					this.loadingType = 2;
					return
				}


				if (this.loadingType != 1) {
					this.$forceUpdate()

					this.loadingType = 1;
					setTimeout(() => {
						this.addData(valId);
					}, 1200);
				}

			},
			/* 添加数据 */
			addData(e) {

				this.dataPage[e]++;
				this.getclassify();

			},
			async changeTab(e) {
				this.isShowLoad=false;
				//this.pages = 1;
				let index = e.detail.current;
				console.log("改变", e.detail.current)
				if (this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}


				let tabBar = await this.getElSize("tab-bar"),
					tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0;

				for (let i = 0; i < index; i++) {
					let result = await this.getElSize(this.tabBars[i].id);
					width += result.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth,
					nowElement = await this.getElSize(this.tabBars[index].id),
					nowWidth = nowElement.width;
				if (width + nowWidth - tabBarScrollLeft > winWidth) {
					this.scrollLeft = width + nowWidth - winWidth;
				}
				if (width < tabBarScrollLeft) {
					this.scrollLeft = width;
				}
				this.isClickChange = false;
				this.tabIndex = index; //一旦访问data就会出问题

				let itemSlide = this.tabBars[index].id;
				let valData = this.itemMsg();

				console.log('changge改变', this.newsitems[itemSlide].data.length)
				/* if (this.newsitems[itemSlide].data.length > 0) {
					return
				} */
				if (valData.length > 0) {
					return
				}
				this.getclassify();
			},
			getElSize(id) { //得到元素的size
				console.log(id)
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select('#' + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
			async tapTab(index) { //点击tab-bar
			let self=this;
			if(!this.isShowLoad){return false}
				let itemSlide = this.tabBars[index].id;
				self.isShowLoad=false;
				this.$forceUpdate()
				//this.pages = 1;
				
				if (this.tabIndex === index) {
					self.isShowLoad=true;
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}
				let tabBar = await this.getElSize("tab-bar"),
					tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
				this.scrollLeft = tabBarScrollLeft;
				this.isClickChange = true;
				this.tabIndex = index;

				let valData = this.itemMsg();
				//let itemClick = this.tabBars[index].id;

				if (this.dataType.length >= this.total[itemSlide + 'Total'] || this.total[itemSlide + 'Total'] <= 10) { //没有更多了
					self.loadingType = 2;

				} else {
					self.loadingType = 0;
				}

				if (valData.length > 0) {
					self.isShowLoad=true;
					return
				}
				//console.log('点击tab', this.newsitems[itemClick])
				this.getclassify();

			},
			/* 跳转链接 */
			linkHref(link, id) {
				uni.navigateTo({
					url: link + id
				})
			},


			linkBookDetail(str, id, val) {
				if (val.bookStatus == 0 || val.bookStatus == 2) {
					uni.navigateTo({
						url: '/pages/my/invalid?type=0'
					})
				} else {
					uni.navigateTo({
						url: str + id
					})
				}
			},

		}
	}
</script>

<style lang="less">
	@imgUrl: "http://114.118.7.81:8081/";

	uni-page-body,
	uni-page-refresh {
		display: block;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
	}


	.swiper-box {
		padding-top: 206upx;
		height: 100%;
		overflow: hidden;

		.list {
			width: 750upx;
			background: #f5f5f4;



			/* 图书样式 */
			.bookCss {
				margin-top: 30upx;
				padding: 30upx 30upx 0 30upx;
				height: 270upx;
				border-bottom: 1upx solid #E0E1E8;
				border-top: 1upx solid #E0E1E8;
				background: #fff;

				.orderTime {
					width: 100%;
					height: 30upx;
					line-height: 30upx;
					font-size: 26upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(102, 102, 102, 1);
					margin-bottom: 30upx;
				}

				.orderCont {
					width: 100%;
					display: flex;
					justify-content: space-between;
				}

				image {
					width: 125upx;
					height: 172upx;
				}

				.wordCon {
					width: 534upx;
					height: auto;

					.title {
						color: #3D3D3D;
						font-size: 34upx;
						font-family: PingFang-SC-Bold;
						font-weight: bold;
						height: 60upx;

						navigator {
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}


					}

					.name {
						height: 42upx;
						font-size: 24upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(142, 143, 145, 1);
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.price {
						height: 50upx;
						line-height: 50upx;
						font-size: 28upx;
						font-family: PingFang-SC-Bold;
						font-weight: bold;
						color: rgba(214, 31, 31, 1);

						text {
							font-size: 36upx;
						}
					}

					.introduce {
						height: 75upx;
						font-size: 26upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(85, 85, 85, 1);
						line-height: 38upx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
				}
			}

			/* 文章样式 */
			.articleCss {
				margin-top: 30upx;
				padding: 30upx 30upx 0 30upx;
				background: #fff;
				height: 280upx;
				border-bottom: 1upx solid #E0E1E8;
				border-top: 1upx solid #E0E1E8;

				.orderTime {
					width: 100%;
					height: 30upx;
					line-height: 30upx;
					font-size: 26upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(102, 102, 102, 1);
					margin-bottom: 10upx;
				}

				.orderCont {
					width: 100%;

				}

				.wordCon {
					width: 100%;
					height: auto;

					.title {
						color: #3D3D3D;
						font-size: 34upx;
						font-family: PingFang-SC-Bold;
						font-weight: bold;
						height: 70upx;

						navigator {
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}

					.name {
						height: 42upx;
						font-size: 24upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(142, 143, 145, 1);
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						margin-top: 6upx;

						text {
							color: #4C5679;
						}

						navigator {
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;

							text {
								color: #4C5679;
							}
						}


					}

					.price {
						height: 60upx;
						line-height: 60upx;
						font-size: 28upx;
						font-family: PingFang-SC-Bold;
						font-weight: bold;
						color: rgba(214, 31, 31, 1);

						text {
							font-size: 36upx;
						}
					}

					.introduce {
						height: 90upx;

						font-size: 26upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(85, 85, 85, 1);
						line-height: 45upx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
				}
			}

			/* 图片样式 */
			.imagesCss {
				margin-top: 30upx;
				padding: 30upx 30upx 0 30upx;
				height: 530upx;
				border-bottom: 1upx solid #E0E1E8;
				border-top: 1upx solid #E0E1E8;
				background: #fff;

				.orderTime {
					width: 100%;
					height: 30upx;
					line-height: 30upx;
					font-size: 26upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(102, 102, 102, 1);
					margin-bottom: 20upx;
				}

				.orderCont {
					width: 100%;

				}

				.radioImg {
					height: 350upx;
					position: relative;

					image {
						height: 350upx;
						border-radius: 3upx;
					}

					.radioWord {
						position: absolute;
						bottom: 20upx;
						right: 20upx;
						height: 24upx;
						line-height: 24upx;
						color: #fff;
					}
				}



				.wordCon {
					width: 100%;
					height: auto;

					.title {
						color: #3D3D3D;
						font-size: 34upx;
						font-family: PingFang-SC-Bold;
						font-weight: bold;
						height: 60upx;

						navigator {
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}

					.name {
						height: 42upx;
						font-size: 24upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(142, 143, 145, 1);
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;

						text {
							color: #4C5679;
						}

						navigator {
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;

							text {
								color: #4C5679;
							}
						}
					}

					.price {
						height: 60upx;
						line-height: 60upx;
						font-size: 28upx;
						font-family: PingFang-SC-Bold;
						font-weight: bold;
						color: rgba(214, 31, 31, 1);

						text {
							font-size: 36upx;
						}
					}

					.introduce {
						height: 75upx;
						font-size: 26upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(85, 85, 85, 1);
						line-height: 38upx;
						overflow: hidden;
					}
				}
			}

			/* 音频样式 */
			.radioCss {
				margin-top: 30upx;
				padding: 30upx 30upx 0 30upx;
				height: 250upx;

				border-bottom: 1upx solid #E0E1E8;
				border-top: 1upx solid #E0E1E8;
				background: #fff;
				overflow: hidden;

				.orderTime {
					width: 100%;
					height: 30upx;
					line-height: 30upx;
					font-size: 26upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(102, 102, 102, 1);
					margin-bottom: 40upx;
				}

				.orderCont {
					width: 100%;


					display: flex;
					justify-content: space-between;
				}

				.radioImg {
					width: 146upx;
					height: 146upx;
					background-image:url('@{imgUrl}yinpin.png');
					/* background-size: 100% 100%; */
					background-size: cover;
					border-radius: 6upx;
					text-align: right;
					position: relative;
					.radioWord {
						position: absolute;
						top: 110upx;
						right: 10upx;
						color: #fff;
						font-size: 20upx;
						z-index: 10;
					}
				}


				.wordCon {
					width: 520upx;
					height: auto;

					.title {
						color: #3D3D3D;
						font-size: 34upx;
						font-family: PingFang-SC-Bold;
						font-weight: bold;
						height: 60upx;

						navigator {
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}

					.name {
						height: 42upx;
						font-size: 24upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(142, 143, 145, 1);
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;

						text {
							color: #4C5679;
						}

						navigator {
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;

							text {
								color: #4C5679;
							}
						}
					}

					.price {
						height: 50upx;
						line-height: 50upx;
						font-size: 28upx;
						font-family: PingFang-SC-Bold;
						font-weight: bold;
						color: rgba(214, 31, 31, 1);

						text {
							font-size: 36upx;
						}
					}

					.introduce {
						height: 65upx;
						font-size: 26upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(85, 85, 85, 1);
						line-height: 38upx;
					}
				}
			}

			/* 其他样式 */
			.otherCss {
				margin-top: 30upx;
				height: 230upx;
				border-bottom: 1upx solid #E0E1E8;
				overflow: hidden;
				padding: 30upx 30upx 0 30upx;
				border-bottom: 1upx solid #E0E1E8;
				border-top: 1upx solid #E0E1E8;
				background: #fff;

				.orderTime {
					width: 100%;
					height: 30upx;
					line-height: 30upx;
					font-size: 26upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(102, 102, 102, 1);
					margin-bottom: 30upx;
				}

				.orderCont {
					width: 100%;
					display: flex;
					justify-content: space-between;
				}

				.radioImg {
					width: 112upx;
					height: 142upx;
					border-radius: 6upx;
					text-align: right;

					.radioWord {
						margin-top: 110upx;
						margin-right: 10upx;
						color: #fff;
						font-size: 20upx;
					}
				}


				.wordCon {
					width: 545upx;
					height: auto;

					.title {
						color: #3D3D3D;
						font-size: 34upx;
						font-family: PingFang-SC-Bold;
						font-weight: bold;
						height: 60upx;

						navigator {
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}

					.name {
						height: 42upx;
						font-size: 24upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(142, 143, 145, 1);

						text {
							color: #4C5679;
						}

						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;

						navigator {
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;

							text {
								color: #4C5679;
							}
						}

					}

					.price {
						height: 50upx;
						line-height: 50upx;
						font-size: 28upx;
						font-family: PingFang-SC-Bold;
						font-weight: bold;
						color: rgba(214, 31, 31, 1);

						text {
							font-size: 36upx;
						}
					}

					.introduce {
						height: 65upx;
						font-size: 26upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(85, 85, 85, 1);
						line-height: 38upx;
					}
				}
			}


		}

	}

	.uni-navbar {
		display: block;
		position: relative;
		width: 100%;
		background:linear-gradient(40deg,#6080CB,#4465B7);
		overflow: hidden;
		height: 236upx;

	}


	.uni-navbar.uni-navbar-fixed {
		position: fixed;
		z-index: 100;
	}

	.loginTop {
		width: 750upx;
		height: 60upx;
		margin-top: 72upx;

		.loginBtn {
			padding: 0upx 30upx 0 20upx;
			height: 38upx;
			font-size: 36upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			display: flex;
			justify-content: space-between;
			align-items: center;

			.loginBack {
				float: left;
				width: 40upx;
				height: 38upx;
				line-height: 38upx;
				text-align: center;
				display: block;
			}

			.loginText {
				font-size: 36upx;
				height: 38upx;
				line-height: 38upx;
			}

			.loginRegister {
				float: right;
				width: 5upx;
				text-align: right;
				font-size: 32upx;
				height: 38upx;
				line-height: 38upx;
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











	.uni-tab-bar11 {
		height: 100upx;
		overflow: hidden;

		.uni-swiper-tab {
			line-height: 100upx;
			height: 140upx;

			.swiper-tab-list {
				width: auto !important;
				padding: 0 40upx;
				color: #fff !important;
				font-size: 30upx;
				opacity: 0.6;

				.wordCont {
					color: #fff;
					margin-bottom: 4upx;

				}
			}

			.active {
				width: auto !important;
				padding: 0 20upx;
				color: #fff;
				font-size: 36upx;
				opacity: 1;
				font-weight: bold;
			}

			.borderBtm {
				height: 8upx;
				background: #fff;
				border-radius: 4upx;
			}


		}
	}












	/* 图书样式 */
	.bookCss {
		margin-top: 30upx;
		padding: 30upx 30upx 0 30upx;
		height: 270upx;
		border-bottom: 1upx solid #E0E1E8;
		border-top: 1upx solid #E0E1E8;
		background: #fff;

		.orderTime {
			width: 100%;
			height: 30upx;
			line-height: 30upx;
			font-size: 26upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(102, 102, 102, 1);
			margin-bottom: 30upx;
		}

		.orderCont {
			width: 100%;
			display: flex;
			justify-content: space-between;
		}

		image {
			width: 125upx;
			height: 172upx;
		}

		.wordCon {
			width: 534upx;
			height: auto;

			.title {
				color: #3D3D3D;
				font-size: 34upx;
				font-family: PingFang-SC-Bold;
				font-weight: bold;
				height: 60upx;

				navigator {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}


			}

			.name {
				height: 42upx;
				font-size: 24upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(142, 143, 145, 1);
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.price {
				height: 50upx;
				line-height: 50upx;
				font-size: 28upx;
				font-family: PingFang-SC-Bold;
				font-weight: bold;
				color: rgba(214, 31, 31, 1);

				text {
					font-size: 36upx;
				}
			}

			.introduce {
				height: 75upx;
				font-size: 26upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(85, 85, 85, 1);
				line-height: 38upx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}
		}
	}















	/* #ifdef MP-ALIPAY */
	.swiper-tab-list {
		display: inline-block;
	}

	/* #endif */
	/* 	.uni-scroll-view {
		position: relative;
		-webkit-overflow-scrolling: touch;
		width: 100%;
		height: 100%;
		max-height: inherit;
		padding-bottom: 50upx;
	} */

	.load-more {
		display: flex;
		flex-direction: row;
		padding: 20upx 0;
		height: 80upx;
		align-items: center;
		justify-content: center;
	}

	.loading-img {
		height: 24px;
		width: 24px;
		margin-right: 10px;
	}

	.loading-text {
		font-size: 28upx;
		color: #777777;
	}

	.loading-img>view {
		position: absolute;
	}

	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px;
	}

	.load2 {
		transform: rotate(30deg);
	}

	.load3 {
		transform: rotate(60deg);
	}

	.loading-img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #777;
		position: absolute;
		opacity: 0.2;
		transform-origin: 50%;
		-webkit-animation: load 1.56s ease infinite;
	}

	.loading-img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px;
	}

	.loading-img>view view:nth-child(2) {
		-webkit-transform: rotate(180deg);
		top: 11px;
		right: 0px;
	}

	.loading-img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px;
	}

	.loading-img>view view:nth-child(4) {
		top: 11px;
		left: 0px;
	}

	.load1 view:nth-child(1) {
		animation-delay: 0s;
	}

	.load2 view:nth-child(1) {
		animation-delay: 0.13s;
	}

	.load3 view:nth-child(1) {
		animation-delay: 0.26s;
	}

	.load1 view:nth-child(2) {
		animation-delay: 0.39s;
	}

	.load2 view:nth-child(2) {
		animation-delay: 0.52s;
	}

	.load3 view:nth-child(2) {
		animation-delay: 0.65s;
	}

	.load1 view:nth-child(3) {
		animation-delay: 0.78s;
	}

	.load2 view:nth-child(3) {
		animation-delay: 0.91s;
	}

	.load3 view:nth-child(3) {
		animation-delay: 1.04s;
	}

	.load1 view:nth-child(4) {
		animation-delay: 1.17s;
	}

	.load2 view:nth-child(4) {
		animation-delay: 1.30s;
	}

	.load3 view:nth-child(4) {
		animation-delay: 1.43s;
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0.2;
		}
	}
</style>
