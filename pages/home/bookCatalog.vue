<template>
	<view>
		<view class="mark" v-if="currentType==1 && markList.length>0"></view>
		<view class="history-header">
			<view style="width:40upx;height:38upx;margin-top:50upx;" @tap="returnPre">
				<image src="../../static/images/home/return2.png" ></image>
			</view>	
			<text class="title" v-if="catalog">目录</text>
			<view class="marker" v-if="!catalog">
					<text @tap="currentType=index" :class="{active:currentType==index}" v-for="(item,index) in classfy" :key="index">{{item}}</text>	
			</view>
			<view style="width: 20upx;"></view>
		</view>
		<!-- 目录列表 -->
		<view class="catalog-list" v-if="currentType == 0">
			<view class="catalog-item" :class="{lighter:isShop !=1 && item.isPay==1}" v-for="(item,index) in chapterList" :key="index" @tap="toContent(item)">
				<text>{{item.chapterName}}</text>
				<uni-icons type="locked" color="#AEB0B8" v-if="isShop !=1 && item.isPay==1"></uni-icons>
			</view>
		</view>
		<!-- 书签列表 -->
		<view class="marker-list" v-if="currentType==1" >
			<view class="marker-padding">
				<view class="marker-item" v-if="markList.length>0" v-for="(item,index) in markList" :key="index" @tap="toContent(item)">
					<image src="../../static/images/books/mark.png" ></image>					
					<text v-if="item.intro" v-html="item.intro"></text>
					<text v-if="!item.intro && item.title" v-html="item.title"></text>
				</view>	
				<view class="empty" v-if="markList.length==0">
					<image src="../../static/images/empty/other.png" ></image>
					<text>什么也没有哦~</text>
				</view>
			</view>	
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icon.vue";
	import { getChapterListAPI, queryBookMarkByBookidAPI, getbookinfoAPI } from '../../api/resource.js'
	export default {
		data() {
			return {
				catalog:false,
				classfy:['目录','书签'],
				currentType:0,
				chapterList:[],
				markList:[],
				isShop:null,
				bookid:''
			};
		},
		// #ifdef APP-PLUS
		onBackPress(options) {
			if(options.from === 'navigateBack'){
				return false;
			}
			this.returnPre();
			return true;
		},
		// #endif
		methods:{
			returnPre(){
				let delta = this.getPage();
				var pages = getCurrentPages();
				if(pages.length==1){
					history.back();
				}
				uni.navigateBack({
					delta: 1
				});
// 				uni.navigateTo({
// 					url:'/pages/home/bookDetails?id='+this.chapterList[0].bookid
// 				})
				// this.getPage()
			},
			//获取到进入第一次进入详情页时的前一页路径
			getPage(){
				let pages = getCurrentPages();
				let routeArr = [];
				pages.map(v => {
					routeArr.push(v.route)
				});
				console.log(pages)
				console.log(routeArr)
				let i = routeArr.indexOf('pages/home/bookDetails');
				return  routeArr.length-1-i;
// 				console.log(i);
				
// 				console.log(routeArr[i-1]);
// 				return routeArr[i-1];
			},
			getChapterList(id){
				getChapterListAPI({
					bookid:id,
					memberid:this.userId,
				}).then( res => {
					this.chapterList = res.data;
				})
			},
			toContent(item){
				if(this.currentType==0){//在目录下点击的情况
					if(this.isShop!=1 && item.isPay ==1){
						uni.showToast({
							title:'请先购买',
							icon:'none'
						})
						return ;
					}
				}
				uni.navigateTo({
					url:`/pages/home/reader?type=book&markid=${item.markid}&isShop=${this.isShop}&bookid=${this.bookid}`
				})
			},
			getMarkList(id){
				queryBookMarkByBookidAPI({
					bookid:id,
					memberid:this.userId,
					page:1,
					rows:5
				}).then( res => {
					// console.log(res)
					this.markList = res.data.list;
				})
			},
			getIsShop(){
				let params = {
					bookid:this.bookid,
				}
				if(this.isOrg){
					params.orgId = this.userId
				}else {
					params.memberid = this.userId
				}
				getbookinfoAPI(params).then( res => {
					this.isShop = res.data.isShop;
				})
			}
		},
		onShow(){
			this.getIsShop()
		},
		onLoad(option) {
			this.isShop = option.isShop;
			this.catalog = option.type == 1 ? true :false;
			if(option.classfy ==0 || option.classfy ==1){
				this.currentType = option.classfy ;
			}else {
				this.currentType = 0;
			}
			// console.log(option.id)
			this.bookid = option.id;
			this.getChapterList(option.id)
			this.getMarkList(option.id)
		},
		components: {uniIcons},
		computed:{
			isLogin(){
				return this.$store.getters.isLogin
			},
			userId(){
				return this.$store.getters.userId
			}
		},
		
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
.mark{
	width:100%;
	height:100%;
	position:fixed;
	z-index:-4;
	background:#f5f5f4;
}
.history-header {
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
		z-index:5;
		// margin-top:60upx;
	}
	.title {
		display:inline-block;
		width:100%;
		margin-left:-23upx;
		text-align: center;
		font-size:36upx;
		color:#FFFFFF;
		margin-top:60upx;
	}
	.marker {
		width:100%;
		text-align:center;
		margin-top:60upx;
		text{
			padding:17upx 53upx;
			border:2upx solid #fff;
			color:#fff;
		}
		text:first-child{
			border-radius:10upx 0 0 10upx;
			border-right:none;
		}
		text:last-child{
			border-radius:0 10upx 10upx 0;
			border-left:none;
		}
		.active{
			background:#fff;
			color:#3a5697;
		}
		
	}
}
.catalog-list{
	margin-top:150upx;
	padding:0 30upx;
	.catalog-item{
		display:flex;
		justify-content: space-between;
		padding:30upx 0;
		border-top:2upx solid #E0E1E8;
		font-size:30upx;	
		color:#3D3D3D;
		text{
			width:580upx;
			.ellipsis;
		}
	}
	.lighter{
		color:#8E8F91;
	}
	.catalog-item:first-child{
		border-top:none;
	}
}
.marker-list{
	// background:#f5f5f4;
	margin-top:150upx;
	min-height:500upx;
	height:100%;
	.marker-padding{
		padding:0 30upx;
		background:#fff;
	}
	.marker-item {
		background:#fff;
		padding:30upx 0 40upx;
		position:relative;
		border-top:1upx solid #E0E1E8;
		image {
			width:25upx;
			height:32upx;
			position:absolute;
			top:0upx;
		}
		text {
			color:#555;
			font-size:32upx;
			.line-clamp;
			text-indent:64upx;
		}
	}
	.marker-item:first-child{
		border-top:none;
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
