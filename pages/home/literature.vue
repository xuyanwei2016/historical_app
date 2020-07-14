<template>
	<view>
		<!-- 文学 -->
		<view class="uni-navbar" :style="{background: curTypeBg[curType]}">
			<view class="book-header">
				<view class="left" @tap="returnPre">
					<image src="../../static/images/home/return2.png"></image>
				</view>
				<view class="center">
					<text>{{routerData[curType]}}</text>
				</view>
				<view style="width: 80upx;"></view>
			</view>

			<view :class="[classTwo==true ? 'hideTwo' : '']"  class="uni-tab-bar11" >
				<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
					<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '',tabCssA==2?'tabCss':'']"
					 :id="tab.id" :data-current="index" @click="tapTab(index)" >
						<view class="wordCont" style="color:#fff" >{{tab.name}}
						</view>
						<view :class="[tabIndex==index ? 'borderBtm' : '',]"></view>
					</view>

				</scroll-view>


			</view>

		</view>

		<!-- 图书列表 -->
		<view id="bookId" v-if='bookData.length!=0'>
			<!--   v-bind:style="{marginTop:'-100px'}" -->
			<block v-for="(newsitem,index2) in bookData" :key="index2" >
				<!-- 图书 -->
				<view class="bookCss" >
					<navigator :url="'bookDetails?id='+newsitem.id" hover-class="none">

						<!-- <image :src="imagePath+newsitem.cover" mode="" style="width: 160upx;height:220upx;" v-if="newsitem.cover"></image> -->
						<img width="350" height="339" :src="imagePath+newsitem.cover" alt="" style="width: 160upx;height:220upx;" v-if="newsitem.cover">
						<image src="../../static/images/article/default.png" mode="" style="width: 160upx;height:220upx;" v-if="!newsitem.cover||newsitem.cover==''"></image>
					</navigator>
					<view class="wordCon" @tap="linkHref('/pages/home/bookDetails?id=',newsitem.id)">
						<view class="title">
							<rich-text class="cssTit" :nodes="newsitem.name"></rich-text>
						</view>
						<view class="name" v-if="newsitem.author&&newsitem.author!=''">{{newsitem.author}}</view>
						<view class="price">￥<text>{{newsitem.beforePrice}}</text><text v-if="newsitem.afterPrice">.</text><text style="font-size: 28upx;">{{newsitem.price}}</text></view>
						<view class="introduce" v-if="newsitem.intro&&newsitem.intro!=''">
							<!-- <navigator :url="'bookDetails?id='+newsitem.id"  hover-class="none"> -->
							<rich-text :nodes="newsitem.intro"></rich-text>
						</view>
					</view>
				</view>
			</block>
			<text class="loading-text">
			{{loadingType === 0 ? contentText.contentdown : (loadingType === 1 ? contentText.contentrefresh : contentText.contentnomore)}}</text>
		</view>
		<view v-else class='fail'>
			<image src="../../static/images/my/zawwluo.png" alt=""></image>
			<p>数据加载失败~~ 请检查网络</p>
		</view>
	</view>

</template>

<script>
	import {getSpecialAPI,getBookLibraryTwoAPI,getBookDetailsAPI} from "@/api/resource.js"
	import uniLoadMore from '../../components/uni-load-more.vue';
	
	export default {
		components: {uniLoadMore},
		data() {
			return {
				scrollLeft: 0,
				tabBars: [
					
				],
				routerData: [],
				tabIndex: 0,
				bookData: [],
				// page_content:10,
				imagePath: '', 
				curType: 0,
				curTypeBg: [
					'linear-gradient(40deg,#6080CB 0%,#2964A0 100%)',
					'linear-gradient(40deg,#A27445 0%,#9D6A36 100%)',
					'linear-gradient(40deg,#5A5E92 0%,#55598B 100%)',
					'linear-gradient(40deg,#D19855 0%,#C68A44 100%)',
					'linear-gradient(40deg,#BC7670 0%,#B66D67 100%)',

				],
				specialData:[],
				classifyCode:null,
				titleData:[],
				bookType:null,
				loadingType:0,
				contentText:{
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: ""
				},
				bookList:null,
				tabCssA:0,
				page:1,
				rowsA:10,
				classTwo:false,
				level:1,
			}
		},
		onLoad: function(option) {
			this.curType = this.$route.query.type;
			this.imagePath = this.imgURL().slice(0, this.imgURL().length - 1);
			uni.showNavigationBarLoading();
			getSpecialAPI().then(res=>{
				if( res.data != undefined ){
					uni.hideNavigationBarLoading();
					this.specialData = res.data.specialTopicList
					for( let i=0; i<res.data.specialTopicList.length; i++ ){
						this.routerData.push(res.data.specialTopicList[i].name)
						this.titleData.push(res.data.specialTopicList[i].classifyCode)
					}
				}
				this.topicTwoList();
			});
		},
		// 下拉刷新
		onPullDownRefresh() {
			if( this.level == 1){
				for( let j=0; j<this.tabBars.length; j++ ){
					this.bookDetailsList(this.tabBars[this.tabIndex].code)
				}
			}else{
				this.bookDetailsList(this.bookType)
			}
		},
		// 上拉加载
		onReachBottom(){
			this.page++;
			if (this.loadingType != 0) {
				return false;
			}
			this.loadingType = 1;
			uni.showNavigationBarLoading();//显示加载动画
			if( this.classTwo ){
				getBookDetailsAPI({classifyCode:this.specialData[this.curType].classifyCode,page:this.page,rows:this.rowsA,}).then(res=>{
					if( res.data != undefined ){
						this.bookData = this.bookData.concat(res.data);//将数据拼接在一起
						this.loadingType = 0;//
						uni.hideNavigationBarLoading();//关闭加载动画
						if (res.data.length == 0) {//没有数据
							this.loadingType = 2;
							uni.hideNavigationBarLoading();//关闭加载动画
							return false;
						}
					}
				})
			}else{
				getBookDetailsAPI({classifyCode:this.tabBars[this.tabIndex].code,page:this.page,rows:this.rowsA,}).then(res=>{
					if( res.data != undefined ){
						this.bookData = this.bookData.concat(res.data);//将数据拼接在一起
						this.loadingType = 0;//
						uni.hideNavigationBarLoading();//关闭加载动画
						if (res.data.length == 0) {//没有数据
							this.loadingType = 2;
							uni.hideNavigationBarLoading();//关闭加载动画
							return false;
						}
					}
				})
			}
		},
		methods: {
			returnPre() {
				uni.navigateBack({
					delta: 1,
				});
			},
			async tapTab(index) { //点击tab-bar
				this.tabIndex = index;
				this.bookData = [];
				this.page = 1;
				this.rowsA = 10;
				for( let j=0; j<this.tabBars.length; j++ ){
					this.bookDetailsList(this.tabBars[this.tabIndex].code)
					return
				}
			},
			/* 跳转链接*/
			linkHref(val, id) {
				if (this.tabIndex == 2) {
					uni.navigateTo({
						url: "/pages/home/imgDetails?id=" + id,
					})
				} else if (this.tabIndex == 4) {
					uni.navigateTo({
						url: "/pages/home/videoDetails?id=" + id,
					})
				} else {
					uni.navigateTo({
						url: val + id
					})
				}

			},
			// 获取专题下的二级分类
			topicTwoList(){
				let titleType = this.$route.query.type
					let td = this.titleData
					for(let k=0; k<td.length;k++){
						this.bookType = td[titleType]
					}	
					getBookLibraryTwoAPI(this.bookType).then(res=>{
						if( res.data != undefined ){
							let variable = res.data.classifyCodeMap
							if(JSON.stringify(variable)==='{}'){ //判断没有二级分类
								this.level = 2
								this.bookDetailsList(this.bookType)
								this.classTwo = true
							}else{
								this.level = 1
								this.classTwo = false
								for(var i in variable){
									var temp = {name:'',code:''};
									temp.name = i
									temp.code = variable[i]
									this.tabBars.push(temp)
								} 
								if(this.tabBars.length == '2'){
									this.tabCssA = 2
								}
								for( let j=0; j<this.tabBars.length; j++ ){
									this.bookDetailsList(this.tabBars[this.tabIndex].code)
									return
								}
							}
						}
					})
			},
			// 获取二级分类图书详情
			bookDetailsList(str){
				uni.showLoading({
				    title: '加载中'
				});
				uni.showNavigationBarLoading();//加载动画
				getBookDetailsAPI({classifyCode:str,page:1,rows:this.rowsA,}).then(res=>{
					if( res.data != undefined ){
						uni.hideLoading();
						this.bookList = res.data
						if( this.bookList.length < this.rowsA ){
							this.rowsA = this.bookList.length
							this.loadingType = 2
						}else{
							this.rowsA = 10
							this.loadingType = 0
						}
						for( var i=0; i<this.rowsA; i++ ){
							this.bookData.push(this.bookList[i])
						}
						this.bookData = res.data
						uni.hideNavigationBarLoading();//关闭加载动画
						uni.stopPullDownRefresh();//得到数据后停止下拉刷新
					}
				})
			}
		},
		
	}
</script>

<style lang="less" scoped>
	.uni-navbar {
		display: block;
		position: relative;
		width: 100%;
		padding-top: 0upx;
		height: auto;
		overflow: hidden;

		.book-header {
			width: 710upx;
			height: 128upx;
			/* background: rgba(176, 124, 65, 0.6); */
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0upx 30upx 0 10upx;

			.left {
				width: 43upx;
				height: 38upx;
				text-align: right;
			}

			.left image {
				width: 23upx;
				height: 38upx;
			}

			.center {
				font-size: 36upx;
				color: #FFFFFF;
				margin-left: 60upx;
				margin-top: 20upx;
			}

			.left,
			.right {
				margin-top: 30upx;
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
					padding: 0 30upx;
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
					opacity: 1;
					font-weight: bold;

					.wordCont {
						font-size: 36upx;
						color: #fff;
						margin-bottom: 4upx;

					}
				}
				.tabCss{
					width:44% !important;
				}

				.borderBtm {
					height: 8upx;
					width:60upx;
					background: #fff;
					border-radius: 4upx;
					margin:auto;
				}
			}
		}
		.hideTwo{
			display:none;
		}
	}
	.fail{
		text-align: center;
		image{
			width:400upx;
			height:350upx;
			margin:200upx auto 60upx auto;
		}
		p{
			font-size:36upx;
			color:#ccc;
		}
	}
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


				rich-text {
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
				height: 38upx;
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
				line-height:50upx;
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
	.loading-text{
		height: 80upx;
		line-height: 80upx;
		font-size: 30upx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
</style>
