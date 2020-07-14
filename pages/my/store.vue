<template>
	<view class="uni-tab-bar">


		<view class="uni-navbar" :class="{'uni-navbar-fixed':true}">

			<view class="loginTop">
				<view class="loginBtn">
					<view class="loginBack" @tap="back">
						<image src="../../static/images/home/return2.png" style="width:22upx; height:38upx;"></image>
					</view>
					<view class="loginText">
						我的收藏
					</view>
					<view class="loginRegister" @tap="megBtn">
						{{isCheckBtn?'完成':'管理'}}
					</view>
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
		<!-- :current="tabIndex" -->
		<view  class="swiper-box" v-bind:style="[{'paddingBottom':megMarginBottom,height: scollHeight}]" :value="tabIndex">
			<!-- v-bind:style="{height: scollHeight}" -->
			<!-- <swiper-item v-for="(tab,index1) in tabBars" :key="index1"> -->
				<scroll-view class="list" scroll-y @scrolltolower="loadMore(tabIndex)">

					<!-- 图书 -->

					<block v-for="(newsitem,index2) in bookData" :key="index2" v-if="tabIndex==0">
						<view class="bookCss" @longpress="longClick(newsitem)">

							<view class="orderCont">
								<view class="alignItem" v-if="isCheckBtn&&tabIndex==0">
									<view class="checkAll" @tap="clickChang(newsitem)">
										<view class="noCheck" v-if="!newsitem.isChecked"></view>
										<image src="../../static/images/books/xuanze.png" mode="" style="height: 38upx; width: 38upx;" v-if="newsitem.isChecked"></image>
									</view>
								</view>

								<view class="bookInvalid" @tap="linkDetail('/pages/home/bookDetails?id=',newsitem.id,newsitem)">
									<image :src="imagePath+newsitem.cover" mode="" style="width: 160upx;height:220upx;" v-if="newsitem.cover"></image>
									<image src="../../static/images/article/default.png" mode="" style="width: 160upx;height:220upx;" v-if="!newsitem.cover||newsitem.cover==''"></image>
									<view class="upImg" v-if="newsitem.status==2">
										<image src="../../static/images/my/invalid1.png" style="width: 120upx;height:91upx;" mode=""></image>
									</view>

								</view>


								<view class="wordCon" v-bind:style="{width:megWidth[tabIndex]}" @tap="linkDetail('/pages/home/bookDetails?id=',newsitem.id,newsitem)">
									<view class="title">
										<!-- <navigator :url="'/pages/home/bookDetails?id='+newsitem.id" hover-class="none"> -->{{newsitem.name}}<!-- </navigator> -->
									</view>
									<view class="name" v-if="newsitem.author&&newsitem.author!=''">{{newsitem.author}}</view>
									<view class="price">￥<text>{{newsitem.beforePrice}}</text><text v-if="newsitem.afterPrice">.</text><text style="font-size: 28upx;">{{newsitem.afterPrice}}</text></view>
									<view class="introduce" v-if="newsitem.intro&&newsitem.intro!=''">{{filterTag(newsitem.intro)}}</view>
								</view>

							</view>

						</view>				
					
					</block>


					<!-- 文章 -->
					<block v-if="tabIndex==1" v-for="(newsitem,index3) in contentData" :key="index3">
						<view class="articleCss" @longpress="longClick(newsitem)">

							<view class="orderCont">
								<view class="alignItem" v-if="isCheckBtn&&tabIndex==1">
									<view class="checkAll" @tap="clickChang(newsitem)">
										<view class="noCheck" v-if="!newsitem.isChecked"></view>
										<image src="../../static/images/books/xuanze.png" mode="" style="height: 38upx; width: 38upx;" v-if="newsitem.isChecked"></image>
									</view>
								</view>
								<view class="wordCon" v-bind:style="{width:megWidth[tabIndex]}">
									<view class="title" @tap="linkDetail('/pages/home/articleDetails?id=',newsitem.contentid,newsitem)">

										<!-- <navigator :url="'/pages/home/articleDetails?id='+newsitem.contentid" hover-class="none"> -->{{newsitem.title}}<!-- </navigator> -->
									</view>

									<view class="introduce" v-if="newsitem.intro&&newsitem.intro!=''" @tap="linkDetail('/pages/home/articleDetails?id=',newsitem.contentid,newsitem)">{{newsitem.intro}}</view>
									<view class="price" @tap="linkDetail('/pages/home/articleDetails?id=',newsitem.contentid,newsitem)">￥<text>{{newsitem.beforePrice}}</text><text v-if="newsitem.afterPrice">.</text><text style="font-size: 28upx;">{{newsitem.afterPrice}}</text></view>
									<view class="name" v-if="newsitem.bookName&&newsitem.bookName!=''" @tap="linkBookDetail('/pages/home/bookDetails?id=',newsitem.bookid,newsitem)">
										《{{newsitem.bookName}}》<text>来源 &gt;</text>
									</view>
								</view>
								<view class="upImg" @tap="linkDetail('/pages/home/articleDetails?id=',newsitem.id,newsitem)"   v-if="newsitem.status==2">
									<image src="../../static/images/my/invalid2.png" style="width: 120upx;height:91upx;" mode=""></image>
								</view>

							</view>


						</view>
					</block>


					<!-- 图片 -->

					<block v-if="tabIndex==2" v-for="(newsitem,index4) in imageData" :key="index4">

						<view class="imagesCss" @longpress="longClick(newsitem)">

							<view class="orderCont">
								<view class="alignItem" v-if="isCheckBtn&&tabIndex==2">
									<view class="checkAll" @tap="clickChang(newsitem)">
										<view class="noCheck" v-if="!newsitem.isChecked"></view>
										<image src="../../static/images/books/xuanze.png" mode="" style="height: 38upx; width: 38upx;" v-if="newsitem.isChecked"></image>
									</view>
								</view>
								<view v-bind:style="{width:megWidth[tabIndex]}">
									<view class="radioImg" @tap="linkDetail('/pages/home/imgDetails?id=',newsitem.resourceid,newsitem)">
										<!-- <image src="../../static/images/books/header.jpg" mode=""></image> -->
										<!-- <view class="bookInvalid">
											<image :src="imagePath+newsitem.cover" mode="" style="width: 160upx;height:220upx;"></image>
											
											
										</view> -->
										<image :src="imagePath+newsitem.path" mode="" style="width: 100%;height:350upx; filter: blur(1.5px);"></image>
										<view class="upImg" v-if="newsitem.status==2||newsitem.status==4">
											<image src="../../static/images/my/invalid1.png" style="width: 120upx;height:91upx;" mode=""></image>
										</view>
									</view>
									<view class="wordCon">
										<view class="title" @tap="linkDetail('/pages/home/imgDetails?id=',newsitem.resourceid,newsitem)">
											<!-- <navigator :url="'/pages/home/imgDetails?id='+newsitem.resourceid" hover-class="none"> -->{{newsitem.resourceName}}<!-- </navigator> -->
										</view>

										<!-- <view class="introduce">就业是劳动力供给和需求的结果，我国供给规模超目前呈现出的酒也困挠问题从量上看是劳动力供给规模超越…</view> -->
										<view class="price" @tap="linkDetail('/pages/home/imgDetails?id=',newsitem.resourceid,newsitem)">￥<text>{{newsitem.beforePrice}}</text><text v-if="newsitem.afterPrice">.</text><text
											 style="font-size: 28upx;">{{newsitem.afterPrice}}</text></view>
										<view class="name" v-if="newsitem.bookName&&newsitem.bookName!=''" @tap="linkBookDetail('/pages/home/bookDetails?id=',newsitem.bookid,newsitem)">
											《{{newsitem.bookName}}》<text>来源 &gt;</text>
										</view>
									</view>

								</view>

							</view>

						</view>

					</block>


					<!-- 音频 -->
					<block v-if="tabIndex==3" v-for="(newsitem,index5) in autioData" :key="index5">

						<view class="radioCss" @longpress="longClick(newsitem)">

							<view class="orderCont">
								<view class="alignItem" v-if="isCheckBtn&&tabIndex==3">
									<view class="checkAll" @tap="clickChang(newsitem)">
										<view class="noCheck" v-if="!newsitem.isChecked"></view>
										<image src="../../static/images/books/xuanze.png" mode="" style="height: 38upx; width: 38upx;" v-if="newsitem.isChecked"></image>
									</view>
								</view>

								<view class="radioImg" @tap="linkDetail('/pages/home/audioDetails?id=',newsitem.resourceid,newsitem)">
									<image :src="imagePath+newsitem.cover" mode="" style="width: 146upx;height:146upx;" v-if="newsitem.cover"></image>
									<image src="../../static/images/audio/yinpin.png" mode="" style="width: 146upx;height:146upx;"  v-if="!newsitem.cover"></image>
									<view class="radioWord">{{newsitem.videoTime}}</view>
									<view class="upImg" v-if="newsitem.status==2||newsitem.status==4">
										<image src="../../static/images/my/invalid1.png" style="width: 120upx;height:91upx;" mode=""></image>
									</view>
								</view>

								<view class="wordCon" v-bind:style="{width:megWidth[tabIndex]}">
									<view class="title" @tap="linkDetail('/pages/home/audioDetails?id=',newsitem.resourceid,newsitem)">
										<!-- <navigator :url="'/pages/home/audioDetails?id='+newsitem.resourceid" hover-class="none"> -->{{newsitem.resourceName}}<!-- </navigator> -->
									</view>

									<view class="price" @tap="linkDetail('/pages/home/audioDetails?id=',newsitem.resourceid,newsitem)">￥<text>{{newsitem.beforePrice}}</text><text v-if="newsitem.afterPrice">.</text><text style="font-size: 28upx;">{{newsitem.afterPrice}}</text></view>
									<view class="name" v-if="newsitem.bookName&&newsitem.bookName!=''" @tap="linkBookDetail('/pages/home/bookDetails?id=',newsitem.bookid,newsitem)">
										《{{newsitem.bookName}}》<text>来源 &gt;</text>
									</view>
								</view>

							</view>

						</view>
					</block>


					<!-- 视频 -->

					<block v-if="tabIndex==4" v-for="(newsitem,index4) in videoData" :key="index4">

						<view class="imagesCss" @longpress="longClick(newsitem)">

							<view class="orderCont">
								<view class="alignItem" v-if="isCheckBtn&&tabIndex==4">
									<view class="checkAll" @tap="clickChang(newsitem)">
										<view class="noCheck" v-if="!newsitem.isChecked"></view>
										<image src="../../static/images/books/xuanze.png" mode="" style="height: 38upx; width: 38upx;" v-if="newsitem.isChecked"></image>
									</view>
								</view>

								<view v-bind:style="{width:megWidth[tabIndex]}">
									<view class="radioImg" @tap="linkDetail('/pages/home/videoDetails?id=',newsitem.resourceid,newsitem)">
										<!-- <image src="../../static/images/books/header.jpg" mode=""></image> -->
										<image :src="imagePath+newsitem.previewPath" mode="" style="width: 100%;height:350upx;"></image>
										<view class="radioWord">{{newsitem.videoTime}}</view>
										<view class="upImg" v-if="newsitem.status==2||newsitem.status==4">
											<image src="../../static/images/my/invalid1.png" style="width: 120upx;height:91upx;" mode=""></image>
										</view>
									</view>
									<view class="wordCon">
										<view class="title" @tap="linkDetail('/pages/home/videoDetails?id=',newsitem.resourceid,newsitem)">
											<!-- <navigator :url="'/pages/home/videoDetails?id='+newsitem.resourceid" v-if="tabIndex==4" hover-class="none"> -->{{newsitem.resourceName}}<!-- </navigator> -->
										</view>

										<!-- <view class="introduce">就业是劳动力供给和需求的结果，我国供给规模超目前呈现出的酒也困挠问题从量上看是劳动力供给规模超越…</view> -->
										<view class="price" @tap="linkDetail('/pages/home/videoDetails?id=',newsitem.resourceid,newsitem)">￥<text>{{newsitem.beforePrice}}</text><text v-if="newsitem.afterPrice">.</text><text
											 style="font-size: 28upx;">{{newsitem.afterPrice}}</text></view>
										<view class="name" v-if="newsitem.bookName&&newsitem.bookName!=''" @tap="linkBookDetail('/pages/home/bookDetails?id=',newsitem.bookid,newsitem)">
											《{{newsitem.bookName}}》<text>来源 &gt;</text>
										</view>
									</view>

								</view>

							</view>

						</view>

					</block>


					<!-- 其他 -->
					<block v-if="tabIndex==5" v-for="(newsitem,index6) in otherData" :key="index6">

						<view class="otherCss" @longpress="longClick(newsitem)">

							<view class="orderCont">
								<view class="alignItem" v-if="isCheckBtn&&tabIndex==5">
									<view class="checkAll" @tap="clickChang(newsitem)">
										<view class="noCheck" v-if="!newsitem.isChecked"></view>
										<image src="../../static/images/books/xuanze.png" mode="" style="height: 38upx; width: 38upx;" v-if="newsitem.isChecked"></image>
									</view>
								</view>

								<view class="radioImg" @tap="linkDetail('/pages/home/otherDetails?id=',newsitem.resourceid,newsitem)">
									<image :src="newsitem.picType" style="width: 112upx;height:142upx;"></image>
									<view class="upImg" v-if="newsitem.status==2||newsitem.status==4">
										<image src="../../static/images/my/invalid1.png" style="width: 120upx;height:91upx;" mode=""></image>
									</view>
									<!-- <image src="'../../static/images/home/ppt.png" mode="" style="width: 112upx;height:142upx;"></image> -->

								</view>



								<view class="wordCon" v-bind:style="{width:megWidth[tabIndex]}">
									<view class="title" @tap="linkDetail('/pages/home/otherDetails?id=',newsitem.resourceid,newsitem)">
										<!-- <navigator :url="'/pages/home/otherDetails?id='+newsitem.resourceid" hover-class="none"> -->{{newsitem.resourceName}}<!-- </navigator> -->
									</view>

									<view class="price" @tap="linkDetail('/pages/home/otherDetails?id=',newsitem.resourceid,newsitem)">￥<text>{{newsitem.beforePrice}}</text><text v-if="newsitem.afterPrice">.</text><text style="font-size: 28upx;">{{newsitem.afterPrice}}</text></view>
									<view class="name" v-if="newsitem.bookName&&newsitem.bookName!=''" @tap="linkBookDetail('/pages/home/bookDetails?id=',newsitem.bookid,newsitem)">
										《{{newsitem.bookName}}》<text>来源 &gt;</text>
									</view>
								</view>

							</view>

						</view>





					</block>

<!-- 正在加载中 -->
				<view class="loadingList" v-if="!isShowLoad" >
					<image src="../../static/images/home/loading.png" mode=""></image>
				</view>
					<!-- 暂无数据 -->
					<view class="noHave" v-if="isShowHave">
						<image src="../../static/images/my/nohave.png" mode=""></image>
						<text>暂无收藏</text>

					</view>


					<view class="load-more" v-if="dataType.length>0">

						<!-- <view class="loading-img" v-if="loadingType == 1 ">
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
						</view> -->
						<!-- 动图圈结束 -->
						<text class="loading-text" :style="{color:color}" v-if="dataType.length>0&&isShowLoad">{{loadingType == 0 ? loadingText.contentdown : (loadingType == 1 ? loadingText.contentrefresh : loadingText.contentnomore)}}</text>
					</view>




				</scroll-view>
			<!-- </swiper-item> -->
		</view>

		<view class="managementBox" v-if="isCheckBtn">
			<view class="checkAll" @tap="chackAllBtn">
				<view class="noCheck" v-if="!checkAll" style="margin-right: 10upx;"></view>
				<image src="../../static/images/books/xuanze.png" mode="" style="height: 38upx; width: 38upx;margin-right: 10upx;"
				 v-if="checkAll"></image>
				全选
			</view>
			<view class="deleteBtn" @tap="deleteBtn">
				删除
			</view>
		</view>

		<promptBox :promptObj="promptObj"></promptBox>
	</view>
</template>
<script>
	import uniIcon from "@/components/uni-icon.vue";
	import {
		getFavoritesPageAPI,
		getFavoritesCountAPI,
		deleteFavoritesAPI
	} from '../../api/my.js';
	export default {
		components: {
			uniIcon
		},
		data() {
			return {
				color: "#777777",
				imagePath: '',
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				scrollLeft: 0,
				isClickChange: false,
				tabIndex: 0,

				bookData: [],

				contentData: [],

				imageData: [],

				autioData: [],

				videoData: [],

				otherData: [],

				tabBars: [{
					name: '图书 ',
					id: 'book'
				}, {
					name: '文章 ',
					id: 'content'
				}, {
					name: '图片 ',
					id: 'image'
				}, {
					name: '音频 ',
					id: 'autio'
				}, {
					name: '视频 ',
					id: 'video'
				}, {
					name: '其它 ',
					id: 'other'
				}],

				deviceWidth: 0, //设备宽度
				scollHeight: 0,
				rightDrawerVisible: false,
				currentCategory: 0,
				currentCategoryChildren: 1,
				categoryContLeft: [],
				searchCont: '',
				selectedMsg: [], //显示在筛选下面的已选
				total: {bookTotal:0,contentTotal:0,imageTotal:0,autioTotal:0,videoTotal:0,otherTotal:0},
				sorting: 2,
				tagsList: '',
				classifyList: '',
				classifyAndtags: [],
				isCheckBtn: false,
				megWidth: ['500', '690', '690', '520', '690', '545'],
				changWidth: [{
					w1: '500',
					w2: '430'
				}, {
					w1: '690',
					w2: '620'
				}, {
					w1: '690',
					w2: '620'
				}, {
					w1: '520',
					w2: '450'
				}, {
					w1: '690',
					w2: '620'
				}, {
					w1: '545',
					w2: '475'
				}],
				checkAll: false,
				megMarginBottom: '0upx',
				promptObj: {},
				pages: 1,
				dataPage: {
					book: 1,
					content: 1,
					image: 1,
					autio: 1,
					video: 1,
					other: 1
				},
				dataType: [],
				loadingType: 0,
				userType: null,
				
				hateChang:0,
				
				isShowLoad:false,
				isShowHave:false,

			}
		},
		onLoad: function(option) {
			this.isShowLoad=false;
			this.userType = uni.getStorageSync('userType');
			this.imagePath = this.imgURL().slice(0, this.imgURL().length - 1)
			this.getMyPurchaseCount();

		},
		/* 下拉刷新 */
		onPullDownRefresh() {
			this.loadingType=1;
			this.isShowLoad=false;
			this.dataPage[this.tabBars[this.tabIndex].id] = 1;
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
			/* this.changeTab() */
			this.getMyPurchaseCount();
			/* setTimeout(function () {
			
		}, 1000); */
		},
		methods: {
			filterTag(str){
				return str = str.replace(/<\/?[^>]*>/g,'');
			},
			/* 长安删除 */
			longClick(item) {
				let self = this;
				self.isCheckBtn = true;
				let itemChange = this.tabBars[this.tabIndex].id;

				if (this.isCheckBtn) {
					let curWidth = uni.getSystemInfoSync().screenWidth * (this.changWidth[this.tabIndex].w2) / 750;
					let curMarginBottom = uni.getSystemInfoSync().screenWidth * 90 / 750;
					this.megWidth[this.tabIndex] = curWidth + 'px';
					this.megMarginBottom = curMarginBottom + 'px';
				} else {
					let curWidthClose = uni.getSystemInfoSync().screenWidth * (this.changWidth[this.tabIndex].w1) / 750;
					this.megWidth[this.tabIndex] = curWidthClose + 'px';
					this.megMarginBottom = '0px';
				}


				this.clickChang(item);
				console.log('长安', item)

			},



			/* 获取类别后面的总数 */
			getMyPurchaseCount() {
				
				let obj = {};
				if (this.userType == 1) { //普通用户
					obj.memberid = this.$store.state.userId;

				} else { //机构用户
					obj.orgId = this.$store.state.userId;

				}
				getFavoritesCountAPI(obj).then(res => {
					let totalType = res.data.uniqueValue;
					this.total = { //res.data.uniqueValue
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
				
				let itemIndex11 = this.tabIndex;
				this.tabIndex == 4 ? itemIndex11 = 3 : this.tabIndex == 3 ? itemIndex11 = 4 : true;
				let objMsg = {};
				if (this.userType == 1) { //普通用户
					objMsg.memberid = this.$store.state.userId;
					objMsg.objectType = itemIndex11 + 1;
					objMsg.page = this.dataPage[this.tabBars[this.tabIndex].id];
					objMsg.rows = 10;
				} else { //机构用户
					objMsg.orgId = this.$store.state.userId;
					objMsg.objectType = itemIndex11 + 1;
					objMsg.page = this.dataPage[this.tabBars[this.tabIndex].id];
					objMsg.rows = 10;
				}

				getFavoritesPageAPI(objMsg).then(res => {
					this.isShowLoad=true;
					
					let itemClass = {};
					itemClass.data = res.data.page.rows;
					/* let saleAry=res.data.page.rows;
					
					saleAry.map(val=>{
						if(val.isPay){
							this.$set(val, 'salePri', val.isPay);
						}else{
							
							let itemSale=(val.price+'').indexOf(".");
							if(itemSale>=0){//有
								this.$set(val, 'salePri', val.price);
							}else{
								this.$set(val, 'salePri', val.price+'.00');
							}
						}
					}) */

					itemClass.data.map((item, index) => {
						
						if (item.isPay) { //有折扣价
							let ispayString = item.isPay;
							if (ispayString.indexOf('.') >= 0) {
								return item.beforePrice = ispayString.split('.')[0], item.afterPrice = ispayString.split('.')[1];
							} else {
								return item.beforePrice = ispayString;
							}
						} else {
							let itemString = typeof item.price == 'number' ? item.price + '' : item.price;

							if (itemString.indexOf('.') >= 0) {
								return item.beforePrice = itemString.split('.')[0], item.afterPrice = itemString.split('.')[1];
							} else {
								return item.beforePrice = itemString;
							}
						}
					})





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
					if(this.dataType.length==0){
						this.isShowHave=true;
					}
					/* this.loadingType = 0; */
					if (this.dataType.length >= this.total[itemId + 'Total'] || this.total[itemId + 'Total'] <= 10) {//没有更多了
						this.loadingType = 2;

					} else {
						this.loadingType = 0;
					}
					
					if (this.tabIndex == 5) {
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
							datas[k].videoTime = datas[k].videoTime.replace(/分/g, ':').replace(/秒/, '');
						}

					}
					
uni.stopPullDownRefresh();
				})
				let aaa = uni.getSystemInfoSync().screenWidth * 212 / 750
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


			loadMore(e) {

				let valId = null;
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
					}, 800);
				}
			},
			/* 添加数据 */
			addData(e) {
				this.dataPage[e]++;
				this.getclassify();

			},
			/* 左右滑动 */
			
			async changeTab(e) {
				
				/* this.tabIndex = e.detail.current; */
				console.log("左右滑动",e)
				/* this.pages = 1; */
				let curWidth = uni.getSystemInfoSync().screenWidth * (this.changWidth[this.tabIndex].w1) / 750;
				this.megWidth[this.tabIndex] = curWidth + 'px';
				this.megMarginBottom = '0px';

				let index = e.detail.current;
				/* this.loadingType = 0; */

				if (this.isClickChange) {
					/* this.tabIndex = index; */
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
					this.hateChang=0;
				}
				if (width < tabBarScrollLeft) {
					this.scrollLeft = width;
					this.hateChang=0;
				}
				this.isClickChange = false;
				this.isCheckBtn = false;
				this.tabIndex = index; //一旦访问data就会出问题
				/* if(!this.hateChang){
					this.tabIndex = index;
				}else{
					this.tabIndex=this.tabIndex;
				} */
				let itemSlide = this.tabBars[index].id;
				let valData = this.itemMsg();
				if (valData.length > 0) {
					return
				}
				this.getclassify();

			},
			getElSize(id) { //得到元素的size

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
				if(!this.isShowLoad){return false}
				let self=this;
				this.isShowLoad=false;
				this.$forceUpdate()
				/* this.pages = 1; */
				let itemSlide = this.tabBars[index].id;
				
				
				if (this.tabIndex === index) {
					self.isShowLoad=true;
					return false;
					} else {
						let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
						console.log('4444', tabBarScrollLeft)
						this.scrollLeft = tabBarScrollLeft;
						this.isCheckBtn = false;
						this.isClickChange = true;
						this.tabIndex = index; //一旦访问data就会出问题
						let valData = this.itemMsg();
						if (this.dataType.length >= this.total[itemSlide + 'Total'] || this.total[itemSlide + 'Total'] <= 10) {//没有更多了
						self.loadingType = 2;
				
						} else {
						self.loadingType = 0;
						}
				
						if (valData.length > 0) {
							this.isShowLoad=true;
							return
						}
						this.getclassify(); 
				
						}
				
				

				this.megMarginBottom = '0px';
				let curWidth = uni.getSystemInfoSync().screenWidth * (this.changWidth[this.tabIndex].w1) / 750;
				this.megWidth[this.tabIndex] = curWidth + 'px';


				
			},
			/* 管理按钮 */
			megBtn() {
				console.log("管理",this.bookData)
				let itemChange = this.tabBars[this.tabIndex].id;
				this.isCheckBtn = !this.isCheckBtn;

				if (this.isCheckBtn) {
					let curWidth = uni.getSystemInfoSync().screenWidth * (this.changWidth[this.tabIndex].w2) / 750;
					let curMarginBottom = uni.getSystemInfoSync().screenWidth * 90 / 750;
					this.megWidth[this.tabIndex] = curWidth + 'px';
					this.megMarginBottom = curMarginBottom + 'px';
				} else {
					let curWidthClose = uni.getSystemInfoSync().screenWidth * (this.changWidth[this.tabIndex].w1) / 750;
					this.megWidth[this.tabIndex] = curWidthClose + 'px';
					this.megMarginBottom = '0px';
				}
				
				this.bookData.map((val,index)=>{
					
					return val.isChecked=false;
				})
				
				
				
				
				this.checkAll=false;
				
				
				
				


			},
			/* 点击勾选 */
			clickChang(val) {
				this.$forceUpdate()
				let valData = this.itemMsg();
				let itemChange = this.tabBars[this.tabIndex].id;
				val.isChecked = !val.isChecked;


				this.checkAll = valData.every(function(item) {
					return item.isChecked
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

			/* 全选按钮 */
			chackAllBtn() {
				let self = this;


				let valData = this.itemMsg();

				//let itemChangeAll = this.tabBars[this.tabIndex].id;
				self.checkAll = !self.checkAll;
				valData.map(function(val) {
					return val.isChecked = self.checkAll;
				})

			},
			/* 删除 */
			deleteBtn() {
				let ids = '';
				let valData = this.itemMsg();
				let itemDelete = this.tabBars[this.tabIndex].id;
				valData.map(function(val) {
					if (val.isChecked) {
						return ids = ids + val.objectid + ',';
					}

				})
				if (ids == '') {
					uni.showToast({
						title: '请至少选择一种资源',
						icon: 'none'
					})
					return
				} else {
					let objDele = {};
					if (this.userType == 1) { //普通用户
						objDele.memberid = this.$store.state.userId;
						objDele.ids = ids;
					} else { //机构用户
						objDele.orgId = this.$store.state.userId;
						objDele.ids = ids;

					}

					deleteFavoritesAPI(objDele).then(res => {
						if (res.data.status == 1) {
							this.promptObj = {
								isShow: true,
								title: '删除成功',
							}
						} else {
							this.promptObj = {
								isShow: true,
								title: res.data.info,
							}
						}
						this.dataPage[itemDelete] = 1;

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

					})
				}

			},
			/* 跳转详情页 */
			linkDetail(str, id, val) {
				
				if (val.status == 2 || val.status == 4) {
					uni.navigateTo({
						url: '/pages/my/invalid?type=' + this.tabIndex
					})
				} else {
					uni.navigateTo({
						url: str + id
					})
				}

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

<style lang="less" scoped>
	@imgUrl: "http://114.118.7.81:8081/";

	uni-page-body,
	uni-page-refresh {
		display: block;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
	}


	.uni-tab-bar {
		background: #f5f5f4;

		/* .resourcesAll{
	background: #e5b268;
	position: fixed;
	padding-top:40upx;
	z-index: 11; */
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
					width: 80upx;
					text-align: right;
					font-size: 32upx;
					height: 38upx;
					line-height: 38upx;
				}
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


		.swiper-box {
			padding-top: 236upx;
			background: #f5f5f4;
			height: 100%;
			overflow: hidden;

			.list {
				width: 750upx;
				background: #f5f5f4;



				/* 图书样式 */
				.bookCss {
					margin: 0upx 30upx;
					padding-top: 30upx;
					height: 260upx;
					border-bottom: 1upx solid #E0E1E8;

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

						/* align-items: center; */
						.bookInvalid {
							width: 160upx;
							height: 220upx;
							position: relative;
							z-index: 11;

							.upImg {
								position: absolute;
								width: 160upx;
								height: 220upx;
								background: rgba(0, 0, 0, 0.5);
								display: flex;
								justify-content: center;
								align-items: center;
								top: 0;
								left: 0;
							}
						}
					}

					image {
						width: 160upx;
						height: 220upx;

					}

					.wordCon {
						width: 500upx;
						height: auto;
						margin-left: 10upx;

						.title {
							color: #3D3D3D;
							font-size: 34upx;
							font-family: PingFang-SC-Bold;
							font-weight: bold;
							height: 60upx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;


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
					width:690upx;
					margin: 0upx 30upx;
					padding-top: 30upx;
					padding-bottom: 30upx;
					height: auto;
					border-bottom: 1upx solid #E0E1E8;

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
						display: flex;
						justify-content: space-between;
						/* align-items: center; */
						position: relative;
						z-index: 11;
						.upImg {
							position: absolute;
							right: 0;
							top: 20upx;
							z-index: -1;
							opacity: 0.5;
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
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;

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

								navigator {
									float: left;
								}

								text {
									color: #4C5679;
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

				}

				/* 图片样式 */
				.imagesCss {
					margin: 0upx 30upx;
					padding-top: 30upx;
					height: 530upx;
					border-bottom: 1upx solid #E0E1E8;

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
						display: flex;
						justify-content: space-between;
						/* align-items: center; */
					}

					.radioImg {
						width: 100%;
						height: 350upx;
						overflow: hidden;
						border-radius: 4upx;
						position: relative;

						image {
							width: 100%;
							/* height: 350upx; */

						}

						.upImg {
							position: absolute;
							width: 100%;
							height: 350upx;
							background: rgba(0, 0, 0, 0.5);
							display: flex;
							justify-content: center;
							align-items: center;
							top: 0;
							left: 0;
							z-index: 11;

						}


						.radioWord {
							position: absolute;
							z-index: 10;
							bottom: 20upx;
							right: 20upx;
							height: 24upx;
							line-height: 24upx;
							color: #fff;
						}
					}



					.wordCon {
						width:100%;
						height: auto;

						.title {
							color: #3D3D3D;
							font-size: 34upx;
							font-family: PingFang-SC-Bold;
							font-weight: bold;
							height: 60upx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
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

							navigator {
								float: left;
							}

							text {
								color: #4C5679;
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
					margin: 0upx 30upx;
					padding-top: 30upx;
					height: 180upx;
					border-bottom: 1upx solid #E0E1E8;


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
						/* align-items: center; */
					}

					.radioImg {
						width: 146upx;
						height: 146upx;
						background-image:url('@{imgUrl}yinpin.png');
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

						.upImg {
							position: absolute;
							width: 146upx;
							height: 146upx;
							background: rgba(0, 0, 0, 0.5);
							display: flex;
							justify-content: center;
							align-items: center;
							top: 0;
							left: 0;
							z-index: 11;

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
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
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

							navigator {
								float: left;
							}

							text {
								color: #4C5679;
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

					height: 180upx;
					border-bottom: 1upx solid #E0E1E8;
					overflow: hidden;
					margin: 0upx 30upx;
					padding-top: 30upx;


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
						/* align-items: center; */
					}

					.radioImg {
						width: 112upx;
						height: 142upx;
						border-radius: 6upx;
						text-align: right;
						position: relative;

						.radioWord {
							margin-top: 110upx;
							margin-right: 10upx;
							color: #fff;
							font-size: 20upx;
						}

						.upImg {
							position: absolute;
							width: 112upx;
							height: 142upx;
							background: rgba(0, 0, 0, 0.5);
							display: flex;
							justify-content: center;
							align-items: center;
							top: 0;
							left: 0;
							z-index: 11;

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
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
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

							navigator {
								float: left;
							}

							text {
								color: #4C5679;
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

		.managementBox {
			position: fixed;
			bottom: 0;
			left: 0;
			height: 90upx;
			width: 720upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #fff;
			border-top: 1upx solid #E0E1E8;
			padding-left: 30upx;

			.deleteBtn {
				width: 158upx;
				height: 60upx;
				background: #3a5697;
				line-height: 60upx;
				text-align: center;
				margin-right: 30upx;
				color: #fff;
				font-size: 26upx;
			}
		}

		.alignItem {
			width: 34upx;
			height: auto;
			display: flex;
			align-items: center;
		}

		.checkAll {
			font-size: 24upx;
			color: #585858;
			height: 100%;
			display: flex;
			align-items: center;

			.noCheck {
				height: 34upx;
				width: 34upx;
				border: 2upx solid rgba(195, 195, 195, 1);
				border-radius: 50%;
				margin-right: 0upx;
			}

			image {
				margin-right: 0upx;
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
