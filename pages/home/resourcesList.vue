<template>
	<view class="uni-tab-bar" style="height: 100%; width:100%">


		<view class="uni-navbar" :class="{'uni-navbar-fixed':true}">

			<view class="searchTop">
				<view class="imgLeft" @tap="back">
					<image src="../../static/images/home/return2.png" mode="aspectFit" style="width:22upx; height:38upx;"></image>
				</view>
				<view class="inputCont" @tap="searchBtn">
					<!-- <uni-icon type="search" size="22" color="#666666"></uni-icon> -->
					<input confirm-type="search" type="text" placeholder="请输入关键词" v-model="searchCont" style="background: #f6f6f6; border-radius: 32upx; height:64upx;padding:0 46upx 0 20upx;" />
					<!-- searchEmpty.png-->
					<image src="../../static/images/home/searchEmpty.png" mode="aspectFit" style="width:30upx; height:30upx;" class="delImages"
					 @tap="emptyInput" v-show="searchCont!=''"></image>
				</view>
				<view class="searchSea" @tap="searchBtn">搜索</view>
			</view>





			<view class="uni-tab-bar11">
				<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
					<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']"
					 :id="tab.id" :data-current="index" @click="tapTab(index)">
						<view class="wordCont" style="color:#fff">{{tab.name}}
							<text style="font-size: 26upx;">{{total[tab.id]||0}}</text>
						</view>
						<view :class="[tabIndex==index ? 'borderBtm' : '']"></view>
					</view>

				</scroll-view>


			</view>

			<!-- 排序 -->
			<view class="sortingBg">
				<view class="sorting">
				<view class="sortCondition" @tap="timeSort" v-if="tabIndex==0"><text>出版时间</text>
					<view class="sortBg">
						<image src="../../static/images/home/xiangshang.png" style="width:14upx; height:18upx;" v-if="sorting==1"></image>
						<image src="../../static/images/home/xiangxia.png" style="width:14upx; height:18upx;" v-if="sorting==2"></image>
					</view> 
				</view>				
				
				<view class="sortCondition" @tap="priceSort"><text>价格</text>
					<view class="sortBg">
						<image src="../../static/images/home/xiangshang.png" style="width:14upx; height:18upx;" v-if="sorting==3"></image>
						<image src="../../static/images/home/xiangxia.png" style="width:14upx; height:18upx;" v-if="sorting==4"></image>
					</view>

				</view>
				<view class="sortCondition" @tap="salesSort"><text>销量</text>
					<view class="sortBg">
						<image src="../../static/images/home/xiangshang.png" style="width:14upx; height:18upx;" v-if="sorting==5"></image>
						<image src="../../static/images/home/xiangxia.png" style="width:14upx; height:18upx;" v-if="sorting==6"></image>
					</view>
				</view>
				<view class="sortCondition" @tap="clickSort"><text>点击量</text>
					<view class="sortBg">
						<image src="../../static/images/home/xiangshang.png" style="width:14upx; height:18upx;" v-if="sorting==7"></image>
						<image src="../../static/images/home/xiangxia.png" style="width:14upx; height:18upx;" v-if="sorting==8"></image>
					</view>
				</view>
				<view class="screening" @click="showRightDrawer">筛选<image src="../../static/images/home/shaixuan.png" style="width:22upx; height:24upx; background: none;"></image>
				</view>
			</view>

			</view>
			
		</view>







	<view class="swiper-box" v-bind:style="{height: scollHeight}">
				<!-- v-bind:style="{height: scollHeight}" -->
					<scroll-view class="list" scroll-y :scroll-top="scrollTop"  @scrolltolower="loadMore(tabIndex)"  @scroll="scroll"><!--  @scrolltolower="loadMore(index1)" @scrolltoupper="scrollTop" -->
					<view id="bookId"><!--   v-bind:style="{marginTop:'-100px'}" -->
						<block v-for="(newsitem,index2) in bookData" :key="index2" v-if="tabIndex==0">
							<!-- 图书 -->
							<view class="bookCss">
								<navigator :url="'bookDetails?id='+newsitem.id"  hover-class="none">
								
								<!-- <image :src="imagePath+newsitem.cover" mode="" style="width: 160upx;height:220upx;" v-if="newsitem.cover"></image> -->
								<img width="350" height="339"  :src="imagePath+newsitem.cover" alt="" style="width: 160upx;height:220upx;"  v-if="newsitem.cover">
								<image src="../../static/images/article/default.png" mode="" style="width: 160upx;height:220upx;" v-if="!newsitem.cover||newsitem.cover==''"></image>
								</navigator>
	
	
								<view class="wordCon" @tap="linkHref('/pages/home/bookDetails?id=',newsitem.id)">
									<view class="title">
	
										<rich-text class="cssTit" :nodes="newsitem.title[0]"></rich-text>
									</view>
									<view class="name" v-if="newsitem.author&&newsitem.author!=''">{{newsitem.author}}</view>
									<view class="price">￥<text>{{newsitem.beforePrice}}</text><text v-if="newsitem.afterPrice">.</text><text style="font-size: 28upx;">{{newsitem.afterPrice}}</text></view>
									<view class="introduce" v-if="newsitem.content[0]&&newsitem.content[0]!=''">
										<!-- <navigator :url="'bookDetails?id='+newsitem.id"  hover-class="none"> --><rich-text :nodes="newsitem.content[0]" style="font-size: 14px!important;"></rich-text><!-- </navigator> -->
									</view>
								</view>
	
							</view>
	</block>
	
	
							<!-- 文章 -->
							<block v-if="tabIndex==1" v-for="(newsitem,index3) in contentData" :key="index3">
							<view class="articleCss">
								<view class="wordCon">
									<view class="title">
										<navigator :url="'articleDetails?id='+newsitem.id"  hover-class="none"><rich-text :nodes="newsitem.title[0]"></rich-text></navigator>
									</view>
	
									<view class="introduce" v-if="newsitem.content[0]&&newsitem.content[0]!=''" @tap="linkHref('/pages/home/articleDetails?id=',newsitem.id)"><rich-text :nodes="newsitem.content[0]"></rich-text></view>
									<view class="price" @tap="linkHref('/pages/home/articleDetails?id=',newsitem.id)">￥<text>{{newsitem.beforePrice}}</text><text v-if="newsitem.afterPrice">.</text><text style="font-size: 28upx;">{{newsitem.afterPrice}}</text></view>
									<view class="name" v-if="newsitem.bookname&&newsitem.bookname!=''" @tap="linkBookDetail('/pages/home/bookDetails?id=',newsitem.bookid,newsitem)">
										《{{newsitem.bookname}}》<text>来源 &gt;</text>
									</view>
								</view>
	
							</view>
	</block>


							<!-- 图片 -->
							<block v-if="tabIndex==2" v-for="(newsitem,index4) in imageData" :key="index4">
							<view class="imagesCss" v-if="tabIndex==2||tabIndex==4">
								<view class="radioImg">
									<navigator :url="'imgDetails?id='+newsitem.id" v-if="tabIndex==2"  hover-class="none"><image :src="imagePath+newsitem.path" mode="" style="width: 690upx;height:350upx; filter: blur(1.5px);" v-if="tabIndex==2"></image></navigator>
									<navigator :url="'videoDetails?id='+newsitem.id" v-if="tabIndex==4"  hover-class="none"><image :src="imagePath+newsitem.cover" mode=" widthFix" style="width: 690upx;height:350upx;" v-if="tabIndex==4"></image></navigator>
									<view class="radioWord" v-if="tabIndex==4">{{newsitem.videoTime}}</view>
								</view>
								<view class="wordCon">
									<view class="title">
										<navigator :url="'imgDetails?id='+newsitem.id" v-if="tabIndex==2"  hover-class="none"><rich-text :nodes="newsitem.title[0]"></rich-text></navigator>
										<navigator :url="'videoDetails?id='+newsitem.id" v-if="tabIndex==4"  hover-class="none"><rich-text :nodes="newsitem.title[0]"></rich-text></navigator>
									</view>
	
									<!-- <view class="introduce">就业是劳动力供给和需求的结果，我国供给规模超目前呈现出的酒也困挠问题从量上看是劳动力供给规模超越…</view> -->
									<view class="price" @tap="linkHref('/pages/home/imgDetails?id=',newsitem.id)">￥<text>{{newsitem.beforePrice}}</text><text v-if="newsitem.afterPrice">.</text><text style="font-size: 28upx;">{{newsitem.afterPrice}}</text></view>
									<view class="name" v-if="newsitem.bookname&&newsitem.bookname!=''" @tap="linkBookDetail('/pages/home/bookDetails?id=',newsitem.bookid,newsitem)">
										<!-- <navigator :url="'bookDetails?id='+newsitem.bookid"  hover-class="none"> -->《{{newsitem.bookname}}》<text>来源 &gt;</text><!-- </navigator> -->
									</view>
								</view>
	
							</view>
	</block>

	
							<!-- 音频 -->
							<block v-if="tabIndex==3" v-for="(newsitem,index5) in voiceData" :key="index5">
							<view class="radioCss">
								<view class="radioImg" @tap="linkHref('/pages/home/audioDetails?id=',newsitem.id)">
									<image :src="imagePath+newsitem.cover" mode="" style="width: 146upx;height:146upx;" v-if="newsitem.cover"></image>
									<image src="../../static/images/audio/yinpin.png" mode="" style="width: 146upx;height:146upx;"  v-if="!newsitem.cover"></image>
									<view class="radioWord">{{newsitem.videoTime}}</view>
								</view>
	
	
	
								<view class="wordCon">
									<view class="title">
										<navigator :url="'audioDetails?id='+newsitem.id"  hover-class="none"><rich-text :nodes="newsitem.title[0]"></rich-text></navigator>
									</view>
	
									<view class="price" @tap="linkHref('/pages/home/audioDetails?id=',newsitem.id)">￥<text>{{newsitem.beforePrice}}</text><text v-if="newsitem.afterPrice">.</text><text style="font-size: 28upx;">{{newsitem.afterPrice}}</text></view>
									<view class="name" v-if="newsitem.bookname&&newsitem.bookname!=''" @tap="linkBookDetail('/pages/home/bookDetails?id=',newsitem.bookid,newsitem)">
										<!-- <navigator :url="'bookDetails?id='+newsitem.bookid"  hover-class="none"> -->《{{newsitem.bookname}}》<text>来源 &gt;</text><!-- </navigator> -->
									</view>
								</view>
	
							</view>
	</block>


							<!-- 视频 -->
							<block v-if="tabIndex==4" v-for="(newsitem,index4) in videoData" :key="index4">
							<view class="imagesCss" v-if="tabIndex==2||tabIndex==4">
								<view class="radioImg">
									<navigator :url="'imgDetails?id='+newsitem.id" v-if="tabIndex==2"  hover-class="none"><image :src="imagePath+newsitem.path" mode="" style="width: 690upx;height:350upx; filter: blur(1.5px);" v-if="tabIndex==2"></image></navigator>
									<navigator :url="'videoDetails?id='+newsitem.id" v-if="tabIndex==4"  hover-class="none"><image :src="imagePath+newsitem.cover" mode="" style="width: 690upx;height:350upx;" v-if="tabIndex==4"></image></navigator>
									<view class="radioWord" v-if="tabIndex==4">{{newsitem.videoTime}}</view>
								</view>
								<view class="wordCon">
									<view class="title">
										<navigator :url="'imgDetails?id='+newsitem.id" v-if="tabIndex==2"  hover-class="none"><rich-text :nodes="newsitem.title[0]"></rich-text></navigator>
										<navigator :url="'videoDetails?id='+newsitem.id" v-if="tabIndex==4"  hover-class="none"><rich-text :nodes="newsitem.title[0]"></rich-text></navigator>
									</view>
	
									<!-- <view class="introduce">就业是劳动力供给和需求的结果，我国供给规模超目前呈现出的酒也困挠问题从量上看是劳动力供给规模超越…</view> -->
									<view class="price" @tap="linkHref('/pages/home/imgDetails?id=',newsitem.id)">￥<text>{{newsitem.beforePrice}}</text><text v-if="newsitem.afterPrice">.</text><text style="font-size: 28upx;">{{newsitem.afterPrice}}</text></view>
									<view class="name" v-if="newsitem.bookname&&newsitem.bookname!=''" @tap="linkBookDetail('/pages/home/bookDetails?id=',newsitem.bookid,newsitem)">
										<!-- <navigator :url="'bookDetails?id='+newsitem.bookid"  hover-class="none"> -->《{{newsitem.bookname}}》<text>来源 &gt;</text><!-- </navigator> -->
									</view>
								</view>
	
							</view>
	</block>

							<!-- 其他 -->
							
							<block v-if="tabIndex==5" v-for="(newsitem,index6) in otherData" :key="index6">
							<view class="otherCss" v-if="tabIndex==5">
								<view class="radioImg" @tap="linkHref('/pages/home/otherDetails?id=',newsitem.id)">
									<image :src="newsitem.picType" style="width: 112upx;height:142upx;"></image>
									<!-- <image src="'../../static/images/home/ppt.png" mode="" style="width: 112upx;height:142upx;"></image> -->
	
								</view>
	
	
	
								<view class="wordCon">
									<view class="title">
										<navigator :url="'otherDetails?id='+newsitem.id"  hover-class="none"><rich-text :nodes="newsitem.title[0]"></rich-text></navigator>
									</view>
	
									<view class="price" @tap="linkHref('/pages/home/otherDetails?id=',newsitem.id)">￥<text>{{newsitem.beforePrice}}</text><text v-if="newsitem.afterPrice">.</text><text style="font-size: 28upx;">{{newsitem.afterPrice}}</text></view>
									<view class="name" v-if="newsitem.bookname&&newsitem.bookname!=''" @tap="linkBookDetail('/pages/home/bookDetails?id=',newsitem.bookid,newsitem)">
										<!-- <navigator :url="'bookDetails?id='+newsitem.bookid"  hover-class="none"> -->《{{newsitem.bookname}}》<text>来源 &gt;</text><!-- </navigator> -->
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
						<view class="noHave" v-if="isShowHave">
							<image src="../../static/images/my/nohave.png" mode=""></image>
							<text>暂无数据</text>
	
						</view>
	
	
	
						<view class="load-more" v-if="dataType.length>0">
						
							<!-- 动图转 -->
							<view class="loading-img" v-show="loadingType === 1 ">
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
							<!-- 动图圈结束 -->
							<text class="loading-text" :style="{color:color}" v-if="dataType.length>0&&isShowLoad">{{loadingType === 0 ? loadingText.contentdown : (loadingType === 1 ? loadingText.contentrefresh : loadingText.contentnomore)}}</text>
						</view>
	
	
					</scroll-view>
				
				
			</view>
	
	
	



		

		<!-- 左侧隐藏 -->
		<uni-drawer :visible="rightDrawerVisible" mode="right" @close="closeRightDrawer">
			<view class="screenAll">

				<view class="screenTit">
					筛选
				</view>

				<!-- <view class="categorys">
					<view class="categoryItam" v-bind:style="[{color:currentCategory===index?'#3a5697':'#3D3D3D',fontWeight:currentCategory===index?'bold':'500'}]"
					 v-for="(item,index) in categorys" :key="index" @tap='onClickItem(index,item)'>{{item.classifyName}}</view>
				</view> -->
				<view class="categoryCont">
					<!-- 时间和范围 -->
					
					
					<!-- 专业分类 -->
					<view class="categoryContAll">
						
						<view v-for="(item,index) in categorys" :key="index" class="categoryContLfItem">
							<view class="categoryContLeft" v-bind:style="{background: currentCategoryChildren==index?'#F5F5F4':'none'}">
								<view class="parentName" @tap="onClickChildren(index,item)">{{item.classifyName}}</view>
							</view>
							
							
							
							<!-- 右侧 -->
							<view class="categoryContRight" v-if="currentCategoryChildren==index">

<view class="noser" v-if="item.children&&item.children.length<=1">
	<image src="../../static/images/home/noser.png" mode=""></image>
</view>


								<view class="childrenCont" >
									<scroll-view class="categorylist" scroll-y style="height:1000upx;">
										<!-- <view class="listItem" @click="tapCategory()">不限</view> -->
										<view class="listItem" v-for="(val,index2) in item.children" :key="index2" :id="index2" :data-current="index2" v-if="val.classifyName!='不限'">
											<view  @click="open(val)" v-bind:style="{color:val.isOpen?'#3a5697':'#3D3D3D'}" class="classifyName">{{val.classifyName}}
											<uni-icons :type="val.isOpen?'arrowup':'arrowdown'" size="18"/>
											</view>
											<!-- 二级 -->
											<view class="small" v-if="val.isOpen">
		<view class="secondWord" v-for="(it,ind) in val.children">
			<view class="secondLevel" @click="tapCategory(it,val,2)">
				<text  v-bind:style="{color:it.checked?'#3a5697':'#3D3D3D'}">{{it.classifyName}}</text>
				<!-- <uni-icon :type="val.checked?'arrowup':'arrowdown'" size="18"/> -->
				<view v-if="it.children&&it.children.length>1" class="uni-icon" :class="['uni-icon-arrowup']" style="color:#3A5697;font-size: 32upx; padding-top: 30upx; padding-left: 4upx; "></view>
			</view>
			
			
			
			
			<!-- 三级 -->
			
			<view class="threeLevel" v-if="it.isOpen">
				
			<view class="threeWord" v-for="(itC,ind) in it.children" @click="tapCategory(itC,it,3)" v-bind:style="{color:itC.checked?'#3a5697':'#3D3D3D'}" v-if="it.children&&it.children.length>1">
				<text>{{itC.classifyName}}</text>
				<!-- <uni-icon :type="val.checked?'arrowup':'arrowdown'" size="18"/> -->
				<!-- <view v-if="it.children&&it.children.length>1" class="uni-icon" :class="['uni-icon-arrowup']" style="color:#3A5697;font-size: 32upx; padding-top: 30upx; padding-left: 4upx; "></view> -->
				
			</view>	
								</view>
			
			
			
			
		</view>										
											</view>
											<!-- <view class="wordCont" style="color:#76491D">{{tab.name}}<text class="delBtn" @tap="deleteBtn">×</text></view> -->

										</view>

									</scroll-view>
								</view>
							</view>
						</view>

					</view>

				</view>





<view class="categoryChange">
					<view class="changeLeft">已选({{selectedMsg.length}})</view>

					<view class="changeRight">


						<view>
							<scroll-view class="uni-swiper-tab" scroll-x>
								<view v-for="(tab,index) in selectedMsg" :key="tab.classifyid" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']"
								 :id="tab.classifyid" :data-current="index">
									<view class="wordCont" style="color:#3A5697">{{tab.classifyName}}<text class="delBtn" @tap="deleteBtn(tab)">×</text></view>

								</view>

							</scroll-view>


						</view>



					</view>
				</view>

				<view class="categoryButton">
					<view class="resetBtn" @tap="resetBtn">重置</view>
					<view class="okBtn" @tap="determineBtn">确定</view>
				</view>






			</view>
		</uni-drawer>


	</view>
</template>
<script>
	import uniIcons from "@/components/uni-icon.vue";
	import uniLoadMore from '@/components/uni-load-more.vue';
	import uniDrawer from '@/components/uni-drawer.vue';
	import {
		searchlistAPI,
		getclassifyAPI,

	} from '../../api/home.js';
	export default {
		components: {
			uniIcons,
			uniLoadMore,
			uniDrawer
		},
		data() {
			return {

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
					voice: {
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
				data0: {
					"datetime": "40分钟前",
					"article_type": 0,
					"title": "uni-app行业峰会频频亮相，开发者反响热烈!",
					"source": "DCloud",
					"comment_count": 639
				},
				data1: {
					"datetime": "一天前",
					"article_type": 1,
					"title": "DCloud完成B2轮融资，uni-app震撼发布!",
					"image_url": "",
					"source": "DCloud",
					"comment_count": 11395
				},
				data2: {
					"datetime": "一天前",
					"article_type": 2,
					"title": "中国技术界小奇迹：HBuilder开发者突破200万",
					"image_url": "",
					"source": "DCloud",
					"comment_count": 11395
				},
				data4: {
					"datetime": "2小时前",
					"article_type": 4,
					"title": "uni-app 支持原生小程序自定义组件，更开放、更自由",
					"image_url": "",
					"source": "DCloud",
					"comment_count": 69
				},
				data3: {
					"article_type": 3,
					"image_list": [{
						"url": "",
						"width": 563,
						"height": 316
					}, {
						"url": "",
						"width": 641,
						"height": 360
					}, {
						"url": "",
						"width": 640,
						"height": 360
					}],
					"datetime": "5分钟前",
					"title": "uni-app 支持使用 npm 安装第三方包，生态更趋丰富",
					"source": "DCloud",
					"comment_count": 11
				},
				tabBars: [{
					name: '图书 ',
					id: 'book',
					heightNum: 281
				}, {
					name: '文章 ',
					id: 'content',
					heightNum: 281
				}, {
					name: '图片 ',
					id: 'image',
					heightNum: 566
				}, {
					name: '音频 ',
					id: 'voice',
					heightNum: 211,
				}, {
					name: '视频 ',
					id: 'video',
					heightNum: 566
				}, {
					name: '其它 ',
					id: 'other',
					heightNum: 203
				}],
				categorys: [{
					classifyName:'',
					children:[],
				}],

				deviceWidth: 0, //设备宽度
				scollHeight: 0,
				scollViewHeight: 0,
				rightDrawerVisible: false,
				currentCategory: 0,
				currentCategoryChildren: 0,
				categoryContLeft: [],
				searchCont: '',
				searchContC: '',
				selectedMsg: [], //显示在筛选下面的已选
				total: [],
				sorting: null,
				tagsList: '',
				tagsNew: '',
				classifyList: '',
				classifyAndtags: [],
				pageNum: 1,
				dataPage: {
					book: 1,
					content: 1,
					image: 1,
					voice: 1,
					video: 1,
					other: 1
				},
				imagePath: '',
				color: "#777777",
				scrollToppx:0,
				
				changTopStart:0,
				changTopEnd:0,
				
				curEnd:false,
				oneChangStart:0,
				
				bookData: [],
				contentData: [],
				imageData: [],
				voiceData: [],
				videoData: [],
				otherData: [],
				
				isShowLoad:false,
				isShowHave:false,
				
				dataType:[],
				loadingType: 0,
				scrollTop:this.$store.state.bookTop,
			}
		},
		onShow(){
			/* console.log("12222333", document.querySelector('#bookId'))
			uni.createSelectorQuery().selectViewport().scrollOffset(res => {
  console.log("竖直滚动位置" + res.scrollTop);
}).exec(); */
			/* uni.createSelectorQuery().select('#bookId').boundingClientRect(function(e){
                console.log(e)
                uni.pageScrollTo({
                    scrollTop: e.top,
                    duration: 800
                });
            }).exec() */

			/* document.body.scrollTop='1000px' */
			/* document.documentElement.scrollTop = this.scrollToppx; */
			let e={
				detail:{
					scrollTop:this.$store.state.bookTop+1
				}
			}
			this.scroll(e)
			this.scrollTop=this.$store.state.bookTop;
			/* this.getclassify(); */
			
			/* document.getElementById('bookId').scrollTop=this.scrollToppx+'px' */
			/* this.scroll() */
			/* uni.pageScrollTo({
			    scrollTop:this.scrollToppx,
			    duration: 300
			}); */
		},

		onLoad: function(option) {/* &inputVal=' + this.searchCont */
		
		this.isShowLoad=false;
			this.imagePath = this.imgURL().slice(0, this.imgURL().length - 1);
			
			
			this.gettag();
			if (!option.type || option.type == 'undefined') {
				this.tabIndex = 0;
				if (!option.inputVal || option.inputVal == 'undefined') {
					this.searchContC = '';
				}
				if(!option.searchVal||option.searchVal==''){
					this.searchCont = '';
					
				}

			} else {
				if (!option.inputVal || option.inputVal == 'undefined') {
					this.searchContC = '';
					this.tabIndex = Number(option.type);
				} else {
					this.searchContC = option.inputVal;
					this.tabIndex = Number(option.type);
					
				}
				if(!option.searchVal||option.searchVal==''){
					this.searchCont = '';
					this.tabIndex = Number(option.type);
					
				} else {
					this.searchCont = option.searchVal;
					this.tabIndex = Number(option.type);
					
				}
				

			}
			if(!option.inputVal||option.inputVal==''){
				this.getclassify();
			}

			

		},

		
		methods: {
			scroll(e){
					/* this.scrollToppx=e.detail.scrollTop; */
					this.$store.commit("bookTopF",e.detail.scrollTop)
			},
			
			
			
			
			
			/* 获取页面列表数据 */
			getList(){
				let self=this;
				let itemIndex11 = this.tabIndex;
				this.tabIndex == 4 ? itemIndex11 = 3 : this.tabIndex == 3 ? itemIndex11 = 4 : true;
				let objData={};
				if(this.sorting){
					objData={
					category: itemIndex11 + 1,
					classifyCodes: this.classifyList,
					guanjianzi: this.searchCont,
					pageNum: this.dataPage[this.tabBars[this.tabIndex].id],
					tagCodes: this.tagsList,
					tagNew: this.tagsNew,
					timeSort: this.sorting
					}
				}else{
						objData={
						category: itemIndex11 + 1,
						classifyCodes: this.classifyList,
						guanjianzi: this.searchCont,
						pageNum: this.dataPage[this.tabBars[this.tabIndex].id],
						tagCodes: this.tagsList,
						tagNew: this.tagsNew,
					}
				}
				return new Promise(function(resolve){
					searchlistAPI(objData).then(res => {
						self.isShowLoad=true;
						uni.stopPullDownRefresh();
						self.total = res.data.resTypeMap;
						let itemClass = {
							data: [],
							loadingType: 0,
						};
						itemClass.data = res.data.reslist;
						itemClass.data.map((item,index)=>{
							if(item.isPay){//有折扣价
							let ispayString=item.isPay;
								if(ispayString.indexOf('.')>=0){
									return item.beforePrice=ispayString.split('.')[0],item.afterPrice=ispayString.split('.')[1];
								}else{
									return item.beforePrice=ispayString;
								}
							}else{
								let itemString=typeof item.price=='number'?item.price+'':item.price;
								
								if(itemString.indexOf('.')>=0){
									return item.beforePrice=itemString.split('.')[0],item.afterPrice=itemString.split('.')[1];
								}else{
									return item.beforePrice=itemString;
								}
							}
						})
						
						resolve(res.data.reslist);
						})
				    /* setTimeout(function(){
				      console.log('执行结束');
				      let result = 6;
				      resolve(result);
				    },100); */
				  });
			},
			getclassify(num) {
				let itemIndex11 = this.tabIndex;
				this.tabIndex == 4 ? itemIndex11 = 3 : this.tabIndex == 3 ? itemIndex11 = 4 : true;

				this.getList().then(res=>{
					let itemId = this.tabBars[this.tabIndex].id;
					let datas = [];
					if (this.tabIndex == 0) {
						num==1?this.bookData=[]:true;
						this.bookData.push(...res);
						this.dataType = this.bookData;
					} else if (this.tabIndex == 1) {
						num==1?this.contentData=[]:true;
						this.contentData.push(...res);
						this.dataType = this.contentData;
					} else if (this.tabIndex == 2) {
						num==1?this.imageData=[]:true;
						this.imageData.push(...res);
						this.dataType = this.imageData;
					} else if (this.tabIndex == 3) {
						num==1?this.voiceData=[]:true;
						this.voiceData.push(...res);
						datas = this.voiceData;
						this.dataType = this.voiceData;
					} else if (this.tabIndex == 4) {
						num==1?this.videoData=[]:true;
						this.videoData.push(...res);
						datas = this.videoData;
						this.dataType = this.videoData;
					} else if (this.tabIndex == 5) {
						num==1?this.otherData=[]:true;
						this.otherData.push(...res);
						this.dataType = this.otherData;
					}
					if(this.dataType.length==0){
						this.isShowHave=true;
					}else{
						this.isShowHave=false;
					}
					
					if (this.dataType.length >= this.total[itemId] || this.dataType.length <= 10) {
						this.loadingType = 2;
					}else{
						this.loadingType = 0;
					}
					
					
					
					if (this.tabIndex == 5) {
						for (let k = 0; k < this.otherData.length; k++) {
					
							let itemType = this.otherData[k].title[0].substr(-4).toLocaleLowerCase();
					
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
					
					
					if (this.tabIndex == 3 || this.tabIndex == 4) { //视频、音频
					
						for (let k = 0; k < datas.length; k++) {
							/* datas[k].videoTime = datas[k].videoTime.replace(/分/g, ':').replace(/秒/, ''); */
							datas[k].videoTime=datas[k].videoTime.replace(/秒/, '');
							datas[k].videoTime=datas[k].videoTime.split('分');
							datas[k].videoTime[0]=datas[k].videoTime[0]>9?datas[k].videoTime[0]:datas[k].videoTime[0]==0?'0':'0'+datas[k].videoTime[0];
							datas[k].videoTime[1]=datas[k].videoTime[1]>9?datas[k].videoTime[1]:'0'+datas[k].videoTime[1];
					datas[k].videoTime=datas[k].videoTime[0]+':'+datas[k].videoTime[1];		
							
							
							
						}
					
					}
					this.scollHeight=uni.getSystemInfoSync().screenHeight+'px';
					
					
				})

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
					itemData = this.voiceData;
					this.dataType = this.voiceData;
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

				let valId = null;
				let valData = this.itemMsg();
				this.tabIndex == 0 ? valId = 'book' : this.tabIndex == 1 ? valId = 'content' : this.tabIndex == 2 ? valId = 'image' :
					this.tabIndex == 3 ? valId = 'voice' : this.tabIndex == 4 ?
					valId = 'video' : valId = 'other';
				
				if (valData.length >= this.total[valId]) {
				
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
			addData(e) {
				this.dataPage[e]++;
				this.getclassify();
			},
			/* 左右滑动 */
			async changeTab(e) {
				this.isShowLoad=false;
				this.sorting = null;
				/*this.pageNum = 1; */
				let index = e.detail.current;

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
				if (this.newsitems[itemSlide].data.length > 0) {
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
				self.isShowLoad=false;
				this.sorting = null;
				this.scrollToppx=0;
				if (this.tabIndex === index) {
					self.isShowLoad=true;
					return false;
				} else {
					let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;

					self.tabIndex = index;
					let valData = self.itemMsg();
					let itemClick = this.tabBars[index].id;
					if (this.dataType.length >= this.total[itemClick] || this.dataType.length <= 10) {//没有更多了
						self.loadingType = 2;
				
						} else {
						self.loadingType = 0;
						}
					
					if (valData.length > 0) {
						self.isShowLoad=true;
						return
					}
					
					self.getclassify(1);
					

				}
			},

			/* 打开左侧显示栏 */
			showRightDrawer() {
				this.rightDrawerVisible = true;
				/* if(this.selectedMsg.length>0){
					
				}else{ */
					/* this.onClickItem(this.currentCategory,this.categorys[this.currentCategory]) */
				/* } */
				
			},
			/* 关闭左侧显示栏 */
			closeRightDrawer() {
				this.rightDrawerVisible = false;
			},
			item1() {
				this.rightDrawerVisible = false;
				uni.showToast({
					title: 'item1'
				});
			},
			item2() {
				this.rightDrawerVisible = false;
				uni.showToast({
					title: 'item2'
				});
			},

			/* 筛选中横hang选择 */
			onClickItem(index,item) {
				
				if (this.currentCategory !== index) {
					this.currentCategory = index;
					this.currentCategoryChildren = 1;
				}
				
				/* if(item.children[1].children[0]){} */
				/* if(item.children[1].children[0].checked){
					return
				} */
				/* this.tapCategory(item.children[1].children[0]) */
				
				
			},

			/* 筛选中竖行选择 */
			onClickChildren(index,val) {
				console.log("!!!!",index)
				
				if (this.currentCategoryChildren !== index) {
					this.currentCategoryChildren = index;
				}
				
				for(let i=0;i<val.children.length;i++){
					for(let j=0;j<this.selectedMsg.length;j++){
						if(val.children[i].classifyid==this.selectedMsg[j].classifyid){
							return
						}
					}
					
				}			
				
				
				
				/* this.tapCategory(val.children[0]) */
			},
			/* 删除 */
			deleteBtn(val) {

				for (let i = 0; i < this.selectedMsg.length; i++) {
					if (val.classifyid == this.selectedMsg[i].classifyid) {
						this.selectedMsg.splice(i, 1);
						if (val.classifyCode.length == 6) { //说明当前的这个是二级
							if (val.type == 2) {
								val.checked = false;
							} else {
								val.checked = false;
								/* val.checked = false; */
							}

						} else if (val.classifyCode.length == 3) { //说明当前的这个是二级
							val.children[0].checked = false;
						} else {
							val.checked = false;
							/* val.checked = false; */
						}
					}
				}
			},
			/* 清空input输入框 */
			emptyInput() {
				this.searchCont = '';

			},
			/* 顶部搜索按钮 */
			searchBtn() {
				uni.navigateTo({
					url: '/pages/home/search?type=' + this.tabIndex
				})
			},
			/* 筛选中树形结构数据 */
			gettag(num) {
				this.categorys=[];
				getclassifyAPI().then(res => {
					if(res.data.length>0){
						res.data.forEach(item=>{
							if(item.classifyCode!=''){
								this.categorys.push(item)
								
							}
						})
					}
					/* let aa={
						classifyName:'专业分类',
						children:res.data
					}
					this.categorys.push(aa); */
					/* this.categorys[2].classifyName = '专业分类';
					this.categorys[2].children = res.data; */
					/* console.log(this.categorys) */
					console.log(this.searchContC)
					console.log(55555,this.categorys)
					if(this.searchContC&&this.searchContC!=''){
						for(let i=0;i<this.categorys[2].children.length;i++){
							if(this.categorys[2].children[i].classifyName==this.searchContC){
								
								this.currentCategoryChildren=i;
								
								this.tapCategory(this.categorys[2].children[i].children[0])
								
							}
						}
					}
					
				})
				

			},
			/* 出版时间 */
			timeSort(){
				this.isShowLoad=false;
				this.sorting == 1 ? this.sorting = 2 : this.sorting = 1;
				let itemPir = this.tabBars[this.tabIndex].id;
				/* this.newsitems[itemPir].data = []; */
				this.loadingType = 0;
				this.dataPage[itemPir] = 1;
				if (this.tabIndex == 0) {
					this.bookData = [];
				} else if (this.tabIndex == 1) {
					this.contentData = [];
				} else if (this.tabIndex == 2) {
					this.imageData = [];
				} else if (this.tabIndex == 3) {
					this.voiceData = [];
				} else if (this.tabIndex == 4) {
					this.videoData = [];
				} else if (this.tabIndex == 5) {
					this.otherData = [];
				}
				
				this.getclassify();
			},
			/* 价格排序 */
			priceSort() { //1.出版时间 升序 * 2.出版时间 倒序 * 3.价格 升序 * 4.价格 降序 * 5.销量 升序 * 6.销量 降序 * 7.点击量 升序 * 8.点击量 降序 * 默认按上传时间倒序
			this.isShowLoad=false;
				this.sorting == 3 ? this.sorting = 4 : this.sorting = 3;

				let itemPir = this.tabBars[this.tabIndex].id;
				/* let valData = this.itemMsg(); */
				/* this.newsitems[itemPir].data = []; */
				this.loadingType = 0;
				this.dataPage[itemPir] = 1;
				
				if (this.tabIndex == 0) {
					this.bookData = [];
				} else if (this.tabIndex == 1) {
					this.contentData = [];
				} else if (this.tabIndex == 2) {
					this.imageData = [];
				} else if (this.tabIndex == 3) {
					this.voiceData = [];
				} else if (this.tabIndex == 4) {
					this.videoData = [];
				} else if (this.tabIndex == 5) {
					this.otherData = [];
				}
				
				this.getclassify();

			},
			/* 销量排序 */
			salesSort() {
				this.isShowLoad=false;
				let itemSale = this.tabBars[this.tabIndex].id;
				//this.newsitems[itemSale].data = [];
				this.loadingType = 0;
				this.dataPage[itemSale] = 1;
				this.sorting == 5 ? this.sorting = 6 : this.sorting = 5;
				if (this.tabIndex == 0) {
					this.bookData = [];
				} else if (this.tabIndex == 1) {
					this.contentData = [];
				} else if (this.tabIndex == 2) {
					this.imageData = [];
				} else if (this.tabIndex == 3) {
					this.voiceData = [];
				} else if (this.tabIndex == 4) {
					this.videoData = [];
				} else if (this.tabIndex == 5) {
					this.otherData = [];
				}
				this.getclassify();
			},
			/* 点击量排序 */
			clickSort() {
				this.isShowLoad=false;
				let itemClick = this.tabBars[this.tabIndex].id;
				//this.newsitems[itemClick].data = [];
				this.loadingType = 0;
				this.dataPage[itemClick] = 1;
				this.sorting == 7 ? this.sorting = 8 : this.sorting = 7;
				if (this.tabIndex == 0) {
					this.bookData = [];
				} else if (this.tabIndex == 1) {
					this.contentData = [];
				} else if (this.tabIndex == 2) {
					this.imageData = [];
				} else if (this.tabIndex == 3) {
					this.voiceData = [];
				} else if (this.tabIndex == 4) {
					this.videoData = [];
				} else if (this.tabIndex == 5) {
					this.otherData = [];
				}
				this.getclassify();
			},
			/* 筛选中重置按钮 */
			resetBtn() {
				if (this.selectedMsg.length > 0) {
					for (let i = 0; i < this.categorys.length; i++) {
						let item = this.categorys[i].children;
						for (let j = 0; j < item.length; j++) {
							item[j].checked = null;
							let itemChild = item[j].children;						
							for (let k = 0; k < itemChild.length; k++) {
								itemChild[k].checked = null;
								let itemThree = itemChild[k].children;
								for (let x = 0; x < itemThree.length; x++) {
									
									itemThree[x].checked = null;
									
								}
							}
						}
					}
					this.selectedMsg = [];
					this.dataPage = {
						book: 1,
						content: 1,
						image: 1,
						voice: 1,
						video: 1,
						other: 1
					};
					this.classifyList = '';
					this.tagsList = '';
					/* this.searchCont = ''; */
					this.tagsNew='';
					this.sorting = 2;
					if (this.tabIndex == 0) {
						this.bookData = [];
					} else if (this.tabIndex == 1) {
						this.contentData = [];
					} else if (this.tabIndex == 2) {
						this.imageData = [];
					} else if (this.tabIndex == 3) {
						this.voiceData = [];
					} else if (this.tabIndex == 4) {
						this.videoData = [];
					} else if (this.tabIndex == 5) {
						this.otherData = [];
					}
					this.getclassify();
					/* this.gettag(); */
				}

			},
			/* 筛选中确定按钮 */
			determineBtn() {
				this.isShowLoad=false;
				this.classifyList = '';
				this.tagsList = '';
				this.tagsNew='';
				if(this.selectedMsg.length > 0) {
					for (var i = 0; i < this.selectedMsg.length; i++) {
						/* if(this.classifyAndtags.length>0){
for (var j = 0; j < this.classifyAndtags.length; j++) {
							if (this.selectedMsg[i].classifyid == this.classifyAndtags[j].data.classifyid) {
								console.log("1111111111111111111111",this.selectedMsg[i].type)
								if (this.classifyAndtags[j].type == 1&&this.selectedMsg[i].type == 1) { //专业分类
								
									this.classifyList = this.classifyList + this.selectedMsg[i].classifyCode + ',';
								} else if(this.selectedMsg[i].type == 3&&this.classifyAndtags[j].type != 1){ //时间 和 出版范围
									this.tagsNew = this.tagsNew + this.selectedMsg[i].classifyCode + ',';
								}else if(this.classifyAndtags[j].type != 1){
									this.tagsList = this.tagsList + this.selectedMsg[i].classifyCode + ',';
								}
							}else{
								 if(this.selectedMsg[i].type == 3){ //时间 和 出版范围
									this.tagsNew = this.tagsNew + this.selectedMsg[i].classifyCode + ',';
								}else{
									this.tagsList = this.tagsList + this.selectedMsg[i].classifyCode + ',';
								}
								
							}

						}
						} else*/ if(this.selectedMsg[i].type == 3){ //出版范围
									this.tagsNew = this.tagsNew + this.selectedMsg[i].classifyCode;
									}else if(this.selectedMsg[i].type == 2){//时间
										
									this.tagsList = this.tagsList + this.selectedMsg[i].classifyCode;
								} else{
									this.classifyList = this.classifyList + this.selectedMsg[i].classifyCode + ',';
								}
						
					}
					console.log(33333,this.dataPage[this.tabBars[this.tabIndex].id])
				}

				//this.newsitems[this.tabBars[this.tabIndex].id].data = [];
	
				this.bookData = [];
				this.contentData = [];
				this.imageData = [];
				this.voiceData = [];
				this.videoData = [];
				this.otherData = [];
				this.dataPage[this.tabBars[this.tabIndex].id]=1;

				this.getclassify();
				
				this.rightDrawerVisible = false; //隐藏左侧筛选
			},
			/* 点击系列和人物 */
			open(item){
				this.$set(item,'isOpen',!item.isOpen);
			},
			/* 点击系列和人物下面的三级 */
			tapCategory(val,valPre,num){
				if(num==2&&val.checked&&!val.isOpen){
					this.$set(val,'isOpen',!val.isOpen);
					return
					}
				this.$set(val,'isOpen',!val.isOpen);

				val.checked=!val.checked;
				if(!val.checked){//取消
					this.selectedMsg.forEach((item,index)=>{
						if(item.classifyCode==val.classifyCode){
							this.selectedMsg.splice(index,1)
						}
					})
				}else{//选择
				if(val.classifyName=='不限'){
					valPre.children.forEach((itemC,indexC)=>{
						/* if(itemC.classifyName!='不限'){
							console.log('属于一类',val)
							itemC.checked=false;
							} */
						for(let i=0;i<this.selectedMsg.length;i++){
							
							let str=this.selectedMsg[i].classifyCode.substring(0,itemC.classifyCode.length>6?itemC.classifyCode.length-3:itemC.classifyCode);
							
							console.log(22222,str,itemC.classifyCode)
							if(str==val.classifyCode){
								this.$set(this.selectedMsg[i],'checked',false);
								this.selectedMsg.splice(i,1);
								i--
							}
						}
					})
				}else{
					valPre.children.forEach((itemC,indexC)=>{
						if(itemC.classifyName=='不限'){
							itemC.checked=false;
							for(let i=0;i<this.selectedMsg.length;i++){
								if(this.selectedMsg[i].classifyCode==itemC.classifyCode){
									this.selectedMsg.splice(i,1);
									i--
								}
							}
							}
						
					})
				}
				if(num==3){//点击3取消2
					valPre.checked=false;
					this.selectedMsg.forEach((item,index)=>{
						if(item.classifyCode==valPre.classifyCode){
							this.selectedMsg.splice(index,1)
						}
					})
				}else if(num==2){
					
					val.children.forEach((itM,indM)=>{
						itM.checked=false;
						for(let i=0;i<this.selectedMsg.length;i++){
							if(this.selectedMsg[i].classifyCode==itM.classifyCode){
								this.selectedMsg.splice(i,1);
								i--
							}
						}
					})
				}
					this.selectedMsg.push(val);
				}
			},
			
			 /* 跳转链接*/
			 linkHref(val,id){
				 if(this.tabIndex==2){
					 uni.navigateTo({
					 url:"/pages/home/imgDetails?id="+id
					 })
				 }else if(this.tabIndex==4){
					 uni.navigateTo({
					 url:"/pages/home/videoDetails?id="+id
					 })
				 }else{
					uni.navigateTo({
				 	url:val+id
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
			
		},
		watch:{
			currentCategoryChildren(n,o){
				let self=this;
				if(n!=o){
					this.categorys[o].children.forEach((item,index)=>{
						if(item.classifyName!='不限'){
							self.$set(item,'checked',false)
							item.children.forEach(itC=>{
								self.$set(itC,'checked',false);
								itC.children.forEach(itCC=>{

									self.$set(itCC,'checked',false);
								})
							})
							
						}
					})
				}

			},
		},


		/* 下拉刷新 */
		onPullDownRefresh() {
			console.log('下拉刷新')
			let itemId = this.tabBars[this.tabIndex].id;
			this.dataPage[itemId] = 1;
			this.dataType=[];
			this.isShowLoad=false;
			/* this.newsitems[itemId].loadingType = 0;
			this.newsitems[itemId].data = []; */
			this.dataPage[itemId] = 1;
			if (this.tabIndex == 0) {
				this.bookData = [];
			} else if (this.tabIndex == 1) {
				this.contentData = [];
			} else if (this.tabIndex == 2) {
				this.imageData = [];
			} else if (this.tabIndex == 3) {
				this.voiceData = [];
			} else if (this.tabIndex == 4) {
				this.videoData = [];
			} else if (this.tabIndex == 5) {
				this.otherData = [];
			}
			this.getclassify();
		},
	}
</script>

<style lang="less" scoped>
	@imgUrl: "http://122.14.50.6:8084/";

	uni-page-body,
	uni-page-refresh {
		display: block;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
	}

	/* width: 750upx; */

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
		padding-top: 66upx;
		overflow: hidden;

	}


	.uni-navbar.uni-navbar-fixed {
		position: fixed;
		z-index: 100;
	}



	.searchTop {
		width: 710upx;
		height: 64upx;
		line-height: 64upx;
		padding: 20upx 30upx 0 10upx;
		display: flex;
		justify-content: space-between;
		

		.imgLeft {
			width: 42upx;
			hieght: 38upx;
			padding-top: 12upx;
			margin-right: 6px;
			display: block;
			text-align:right;
			image{}
		}

		.inputCont {
			width: 570upx;
			height: 64upx;
			position: relative;

			input {
				margin: 0;
				padding: 0;
				font-size: 28upx;
			}
			.uni-input-input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
			      font-size: 24upx;
				  color:#007AFF;
			    }
			    .uni-input-input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
			      font-size: 24upx;
				  color:#007AFF;
			    }
			    .uni-input-input::-moz-placeholder { /* Mozilla Firefox 19+ */
			      font-size: 24upx;
				  color:#007AFF;
			    }
			    .uni-input-input:-ms-input-placeholder { /* Internet Explorer 10-11 */
			      font-size: 24upx;
				  color:#007AFF;
			    }
			image {
				position: absolute;
				top: 17upx;
				right: 17upx;
			}
		}

		.searchSea {
			width: 70upx;
			font-size: 30upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			line-height: 30upx;
			line-height: 64upx;
			height: 64upx;
			float: right;
			display: block;
			text-align: right;
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
	
	.sortingBg{ width:100%;height: 87upx;border-bottom: 1upx solid rgba(224, 225, 232, 1);background: #fff;}
	.sorting {
		padding: 0 10upx 0 30upx;
		height: 87upx;
		width: 710upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #fff;
		font-size: 26upx;

		.sortCondition {
			font-size: 28upx;
			color: #666;
			width: auto;
			display: block;
			flex-direction: row;
			box-sizing: initial;
			

			text {
				float: left;
				display: block;
				font-size: 26upx;
			}

			.sortBg {
				/* float: left; */
				/* display: block; */
				background: url('../../static/images/home/kaobei.png');
				width: 14upx;
				height: 18upx;
				background-size: 100% 100%;
				float: left;

				image {
					display: block;
				}

				margin-top:18upx;
				margin-left:10upx;


			}
		}

		.screening {
			width: 20%;
			float: right;
			text-align: center;
			/* padding-left: 2%; */
			border-left: 1px solid #E0E1E8;
			color: #666;

			image {
				width: 44upx;
				height: 48upx;
				margin-left: 6upx;
			}
			
		}
	}


	.swiper-box {
		
		height: 100%;
		overflow: hidden;
		padding-top:330upx;

		.list {
			width: 750upx;
			height: 100%;

			/* 图书样式 */
			.bookCss {
				margin: 30upx 30upx 0 30upx;
				height: 250upx;
				display: flex;
				justify-content: space-between;
				border-bottom: 1upx solid #E0E1E8;

				image {
					width: 160upx;
					height: 220upx;
				}

				.wordCon {
					width: 500upx;
					height: auto;

					.title {
						color: #3D3D3D;
						font-size: 34upx;
						font-family: PingFang-SC-Bold;
						font-weight: bold;
						height: 60upx;
						
						
							rich-text{
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 1;
							}
							/* rich-text{
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							} */
								/* div{
									width: 500upx;
									white-space: nowrap;
									overflow: hidden;
									text-overflow: ellipsis;
								} */
							
							
						
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
						div{
							span{
								font-size: 14px!important;
							}
						}
					}
				}
			}

			/* 文章样式 */
			.articleCss {
				margin: 30upx 30upx 0 30upx;
				height: 250upx;
				border-bottom: 1upx solid #E0E1E8;

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
							rich-text{
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 1;
							}
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

						/* navigator{
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							
						} */
							text {
							color: #4C5679;
						}
					}

					.price {
						height: 50upx;
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

			/* 图片样式 */
			.imagesCss {
				margin: 30upx 30upx 0 30upx;
				height: 535upx;
				border-bottom: 1upx solid #E0E1E8;

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
						width: 100%;
						color: #3D3D3D;
						font-size: 34upx;
						font-family: PingFang-SC-Bold;
						font-weight: bold;
						height: 60upx;

						navigator {
							rich-text{
								
								word-break:break-all;
								 display:-webkit-box;
								 -webkit-line-clamp:1;
								 -webkit-box-orient:vertical;
								 overflow:hidden;
							}
						}
					}

					.name {
						/* width: 690upx; */
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
						navigator{
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							
						}
					}

					.price {
						height: 60upx;
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
				margin: 30upx 30upx 0 30upx;
				height: 180upx;
				display: flex;
				justify-content: space-between;
				border-bottom: 1upx solid #E0E1E8;
				overflow: hidden;

				.radioImg {
					width: 146upx;
					height: 146upx;
					background-image:url('@{imgUrl}yinpin.png');
					background-size: 100% 100%;
					border-radius: 6upx;
					text-align: right;
					position: relative;
					.radioWord {
						/* margin-top: 110upx;
						margin-right: 10upx; */
						color: #fff;
						font-size: 20upx;
						position: absolute;
						z-index: 1;
						right:10upx;
						bottom:2upx;
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
							rich-text{
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 1;
							}
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
						navigator{
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							
						}
					}

					.price {
						height: 50upx;
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
				margin: 30upx 30upx 0 30upx;
				height: 172upx;
				display: flex;
				justify-content: space-between;
				border-bottom: 1upx solid #E0E1E8;
				overflow: hidden;

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
							rich-text{
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 1;
							}
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

						navigator{
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							
						}
					}

					.price {
						height: 50upx;
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

	/* 右侧隐藏 */
	.screenAll {
		padding-top: 60upx;

		.screenTit {
			width: 100%;
			text-align: center;
			border-bottom: 1upx solid #E0E1E8;
			color: #2B2121;
			font-size: 36upx;
			height: 34upx;
			line-height: 34upx;
			padding-bottom: 35upx;
		}

		.categorys {
			overflow: hidden;
			border-bottom: 1upx solid #E0E1E8;

			.categoryItam {
				width: 33%;
				height: 48upx;
				line-height: 48upx;
				float: left;
				text-align: center;
				font-size: 28upx;
				color: #3D3D3D;
				margin: 15upx 0upx;
			}
		}

		.categorys .categoryItam:nth-child(2) {
			border-left: 1upx solid #E0E1E8;
			border-right: 1upx solid #E0E1E8;
		}

		.categoryCont {
			width: 100%;

			.categoryContAll {
				position: relative;
				/* 分类样式 */
				.categoryContItem{
					width:90%;
					padding-left: 30upx;
					height: 87upx;
					
					color: #3D3D3D;
					font-size: 32upx;
					.categoryContLeft{
						display: flex;
						justify-content: space-between;
						
						.parentName{
							line-height: 87upx;
						}
					}
				}

				.categoryContLfItem {

					display: flex;
					justify-content: space-between;

					.categoryContLeft {
						/* position: absolute;
							left:0; */

						width: 266upx;
						float: left;
						height: 100%;

						.parentName {
							padding-left: 30upx;
							height: 87upx;
							line-height: 87upx;
							color: #3D3D3D;
							font-size: 32upx;
						}
					}



					.categoryContRight {
						position: absolute;
						right: 0;
						top: 0;
						min-height: 1400upx;
						bottom: 0;

						width: 332upx !important;
						background: #F5F5F4;
						padding-left: 20upx;
						.noser{
							width: 100%;
							height: 100%;
							display: flex;
							justify-content:center;
							padding-top: 80upx;
							image{
								width: 288upx;
								height: 256upx;
							}
						}
						.childrenCont {

							.categorylist {
								.listItem {
									.classifyName{
										font-size: 32upx;
										font-weight: bold;
										line-height: 87upx;
										color: #3D3D3D;
									}
									.small{
										.secondWord{
											width:100%;
											.secondLevel{
												width:100%;
												display: flex;
												justify-content: flex-start;
												line-height: 87upx;
												color: #3D3D3D;
												font-size: 32upx;
												text{
													display: block;
													max-width: 290upx;
													white-space: nowrap;
													overflow: hidden;
													text-overflow: ellipsis;
												}
												
											}
											.threeLevel{
												width: 100%;
												
												.threeWord{
													line-height: 87upx;
													color: #3D3D3D;
													font-size: 32upx;
													padding-left: 18upx;
													text{
														display: block;
														width: 100%;
														white-space: nowrap;
														overflow: hidden;
														text-overflow: ellipsis;
													}
												}
											}
											
										}
									}
								}
							}
						}
					}
				}

				.categoryContLfItemHover {
					font-size: 32px;
					font-family: PingFang-SC-Bold;
					font-weight: bold;
					color: rgba(118, 73, 29, 1);
				}

			}

		}
	}


	.categoryChange {
		width: 100%;
		height: 99upx;
		line-height: 99px;
		border-top: 1upx solid #E0E1E8;
		position: absolute;
		background: #fff;
		bottom: 91upx;

		.changeLeft {
			float: left;
			height: 50upx;
			line-height: 50upx;
			margin-top: 24upx;
			font-size: 30upx;
			color: #3D3D3D;
			width: 150upx;
			text-align: center;
			border-right: 1upx solid #E0E1E8;

			text {
				color: #3a5697;
			}
		}

		.changeRight {
			width: 436upx;
			height: 90upx;
			float: right;
			.swiper-tab-list {
				width: auto !important;
				margin-right: 20upx;
				padding: 0 30upx;
				background: #EFF0F7;
				height: 64upx;
				line-height: 64upx;
				border-radius: 32upx;

				.wordCont {
					height: 64upx;
					line-height: 64upx;

					.delBtn {
						font-size: 28upx;
						margin-top: 20upx;
						padding-left: 10upx;
					}
				}

			}

			/* height:99px; */
			.changItemAll {
				height: 90upx;
				width: 1200upx;

				.changeItem {
					height: 90upx;
					line-height: 90upx;
					padding-right: 16upx;
					float: left;
					display: block;
				}
			}


		}
	}

	.categoryButton {
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-between;

		.resetBtn {
			width: 50%;
			height: 91upx;
			background: rgba(247, 248, 250, 1);
			text-align: center;
			line-height: 91upx;
			color: #666;
			font-size: 30upx;
		}

		.okBtn {
			width: 50%;
			height: 91upx;
			background: #3a5697;
			text-align: center;
			line-height: 91upx;
			color: #fff;
			font-size: 30upx;
		}

	}
	/* 正在加载中 */
	.loadingList{
		width:100%;
		height:1000upx;
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
			width: 422upx;
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
