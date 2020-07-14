<template>
	<view>
		<view class="cart-header" :class="{cartHeader:cartList.length<=0}">
			<text></text>
			<text class="title">购物车</text>
			<text v-if="cartList.length>0" class="manage" @tap="showBottom=!showBottom">{{ showBottom ? '管理' : '完成'}}</text>
		</view>
		<view class="mark"></view>
		<view class="main" v-if="cartList.length>0">
			<view class="main-item" v-for="(item,index) in cartList" :key="index">
				<!-- 图书列表 -->
				<view class="book-list" v-if="item.resourceType == 1">
					<view class="item" @longtap="changeStatus(item)">
						<view class="icon" @tap="changeChecked(item)">
							<view class="default-icon" v-if="!item.checked"  :style="{opacity:item.status!=1?'0.3':1}">
								
							</view>
							<view class="checked-icon" v-if="item.checked">
								<image src="../../static/images/books/xuanze.png"></image>
							</view>
						</view>
						<view @tap="toDetails('bookDetails',item.id,item.status,item)"  class="left">
							<image v-if="item.cover && !item.showDefault" :src="imagePath+item.cover" @error="item.showDefault=true"></image>
							<image v-if="!item.cover || item.showDefault" src="../../static/images/article/default.png"></image>
							<view class="upImg" v-if="item.status!=1">
								<image src="../../static/images/my/invalid1.png" style="width: 120upx;height:91upx;" mode=""></image>
							</view>
						</view>
						<view @tap="toDetails('bookDetails',item.id,item.status,item)" class="right">
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
							<view class="publish" v-if="item.publishDate">
								<text>出版时间&nbsp;:&nbsp;{{item.publishDate}}</text>
							</view>
						</view>
					</view>
				</view>
				
				<!-- 其他列表 -->
				<view class="other-list" v-if="item.resourceType == 6">
					<view class="item" @longtap="changeStatus(item)">
						<view class="icon" @tap="changeChecked(item)">
							<view class="default-icon" v-if="!item.checked">
								
							</view>
							<view class="checked-icon" v-if="item.checked">
								<image src="../../static/images/books/xuanze.png" ></image>
							</view>
						</view>
						<view class="left" @tap="toDetails('otherDetails',item.resourceid,item.status,item)">
							<!-- <image :src="otherPathList[index]" mode=""></image> -->
							<image v-if="item.otherType ==1" src="../../static/images/home/excel.png" ></image>
							<image v-if="item.otherType ==2" src="../../static/images/home/word.png"></image>
							<image v-if="item.otherType ==3" src="../../static/images/home/ppt.png"></image>
							<image v-if="item.otherType ==4" src="../../static/images/home/pdf.png"></image>
							<image v-if="item.otherType ==5" src="../../static/images/home/rar.png"></image>
							<image v-if="item.otherType ==6" src="../../static/images/home/default.png"></image>
							<view class="upImg" v-if="item.status!=1">
								<image src="../../static/images/my/invalid1.png" style="width: 120upx;height:91upx;" mode=""></image>
							</view>
						</view>
						<view class="right" @tap="toDetails('otherDetails',item.resourceid,item.status,item)">
							<view class="title" >
								<text>{{item.resourceName}}</text>
							</view>
							<view class="price">
								<text>￥</text>
								<text class="big"> {{item.before}}</text>
								<text v-if="item.after" style="fontSize:28upx;">.{{item.after}}</text>
								<!-- <text class="big">{{item.isPay || item.price}}</text> -->
							</view>
							<view class="origin" v-if="item.bookName" @tap.stop="toDetails('bookDetails',item.bookid,item.bookStatus,item)">
								<text>《{{item.bookName}}》</text>&nbsp;&nbsp;
								<text class="from">来源 &gt;</text>
							</view>
						</view>
					</view>
				</view>
				
				<!-- 图片列表-->
				<view class="img-list" v-if="item.resourceType == 3">
					<view class="item" @longtap="changeStatus(item)">
						<view class="icon" @tap="changeChecked(item)">
							<view class="default-icon" v-if="!item.checked">
								
							</view>
							<view class="checked-icon" v-if="item.checked">
								<image src="../../static/images/books/xuanze.png" ></image>
							</view>
						</view>
						<view class="left" @tap="toDetails('imgDetails',item.resourceid,item.status,item)">
							<image :src="imagePath+item.path"></image>
							<view class="upImg" v-if="item.status!=1">
								<image src="../../static/images/my/invalid1.png" style="width: 120upx;height:91upx;" mode=""></image>
							</view>
						</view>
						<view class="right"  @tap="toDetails('imgDetails',item.resourceid,item.status,item)">
							<view class="title">
								<text>{{item.resourceName}}</text>
							</view>
							<view class="price">
								<text>￥</text>
								<text class="big"> {{item.before}}</text>
								<text v-if="item.after" style="fontSize:28upx;">.{{item.after}}</text>
								<!-- <text class="big">{{item.isPay || item.price}}</text> -->
							</view>
							<view class="origin"  @tap.stop="toDetails('bookDetails',item.bookid,item.bookStatus,item)" v-if="item.bookName">
								<text>《{{item.bookName}}》</text>&nbsp;&nbsp;
								<text class="from">来源 &gt;</text>
							</view>
						</view>
					</view>
				</view>
				
				<!-- 音频列表 -->
				<view class="audio-list" v-if="item.resourceType == 5">
					<view class="item" @longtap="changeStatus(item)">
						<view class="icon" @tap="changeChecked(item)">
							<view class="default-icon" v-if="!item.checked">
								
							</view>
							<view class="checked-icon" v-if="item.checked">
								<image src="../../static/images/books/xuanze.png" ></image>
							</view>
						</view>
						<view class="left"  @tap="toDetails('audioDetails',item.resourceid,item.status,item)">
							<image src="../../static/images/audio/yinpin.png" mode=""></image>
							<text class="time">{{item.videoTime}}</text>
							<view class="upImg" v-if="item.status!=1">
								<image src="../../static/images/my/invalid1.png" style="width: 120upx;height:91upx;" mode=""></image>
							</view>
						</view>
						<view class="right" @tap="toDetails('audioDetails',item.resourceid,item.status,item)">
							<view class="title">
								<text>{{item.resourceName}}</text>
							</view>
							<view class="price">
								<text>￥</text>
								<text class="big"> {{item.before}}</text>
								<text v-if="item.after" style="fontSize:28upx;">.{{item.after}}</text>
								<!-- <text class="big">{{item.isPay || item.price}}</text> -->
							</view>
							<view v-if="item.bookName" class="origin" @tap.stop="toDetails('bookDetails',item.bookid,item.bookStatus,item)">
								<text>《{{item.bookName}}》</text>&nbsp;&nbsp;
								<text class="from">来源 &gt;</text>
							</view>
						</view>
					</view>
				</view>
				
				<!-- 视频列表 -->
				<view class="video-list" v-if="item.resourceType == 4">
					<view class="item" @longtap="changeStatus(item)">
						<view class="icon" @tap="changeChecked(item)">
							<view class="default-icon" v-if="!item.checked"></view>
							<view class="checked-icon" v-if="item.checked">
								<image src="../../static/images/books/xuanze.png" ></image>
							</view>
						</view>
						<view class="left" @tap="toDetails('videoDetails',item.resourceid,item.status,item)">
							<image v-if="item.previewPath" :src="imagePath+item.previewPath"></image>
							<image v-else src="../../static/images/audio/yinpin.png" ></image>
							<text class="time">{{item.videoTime}}</text>
							<view class="upImg" v-if="item.status!=1">
								<image src="../../static/images/my/invalid1.png" style="width: 120upx;height:91upx;" mode=""></image>
							</view>
						</view>
						<view class="right" @tap="toDetails('videoDetails',item.resourceid,item.status,item)">
							<view class="title" :url="'/pages/home/videoDetails?id='+item.resourceid">
								<text>{{item.resourceName}}</text>
							</view>
							<view class="price">
								<text>￥</text>
								<text class="big"> {{item.before}}</text>
								<text v-if="item.after" style="fontSize:28upx;">.{{item.after}}</text>
								<!-- <text class="big">{{item.isPay || item.price}}</text> -->
							</view>
							<view class="origin" v-if="item.bookName" @tap.stop="toDetails('bookDetails',item.bookid,item.bookStatus,item)">
								<text>《{{item.bookName}}》</text>&nbsp;&nbsp;
								<text class="from">来源 &gt;</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 文章列表 -->
				<view class="article-list" v-if="item.resourceType == 2">
					<view class="item" @longtap="changeStatus(item)">
						<view class="left">
							<view class="icon" @tap="changeChecked(item)">
								<view class="default-icon" v-if="!item.checked">
									
								</view>
								<view class="checked-icon" v-if="item.checked">
									<image src="../../static/images/books/xuanze.png" ></image>
								</view>
							</view>
						</view>
						<view class="right"  @tap="toDetails('articleDetails',item.contentid,item.status,item)">
							<view class="title">
								<text>{{item.title}}</text>
							</view>
							<view class="price">
								<text>￥</text>
								<text class="big"> {{item.before}}</text>
								<text v-if="item.after" style="fontSize:28upx;">.{{item.after}}</text>
							</view>
							<view v-if="item.bookName" class="origin" @tap.stop="toDetails('bookDetails',item.bookid,item.bookStatus,item)">
								<text>《{{item.bookName}}》</text>&nbsp;&nbsp;
								<text class="from">来源 &gt;</text>
							</view>
						</view>
					</view>
					<view class="upImg" v-if="item.status!=1" @tap="toDetails('articleDetails',item.contentid,item.status,item)">
						<image src="../../static/images/my/invalid1.png" style="width: 120upx;height:91upx;" mode=""></image>
					</view>
				</view>			
			</view>
		</view>
		
<!-- 正在加载中 -->
				<view class="loadingList" v-if="!isShowLoad" >
					<image src="../../static/images/home/loading.png" mode=""></image>
				</view>
		
		<view class="empty"  v-if="cartList.length==0&&isShowLoad">
			<image src="../../static/images/empty/cart.png" ></image>
			<text>请选择商品</text>
		</view>
		<view class="bottom" v-if="cartList.length>0">	
			<view class="left"  @tap="changeAllChecked">
				<view class="icon">
					<view class="default-icon" v-if="!checkAll">
						
					</view>
					<view class="checked-icon" v-if="checkAll">
						<image src="../../static/images/books/xuanze.png" ></image>
						
					</view>
					<text class="all">全选</text>
				</view>
			</view>
			<view class="right"  v-if="showBottom">
				<view class="price">
					<text class="sum">合计:</text>
					<text>￥{{totalPrice || 0}}</text>
				</view>
				<view class="submit" @tap="sureOrder">
					<text>结算({{num}})</text>
				</view>
			</view>
			<view class="right" v-else>
				<view class="store" @tap="addStore">
					<text>移入收藏</text>
				</view>
				<view class="del" @tap="deleteShop">
					<text>删除</text>
				</view>
			</view>
		</view>
		<cartAlert :alertOptions="alertOptions"></cartAlert>
	</view>
</template>

<script>
	import uniIcon from '../../components/uni-icon.vue';
	import { getShopCarAPI, confirmOrderAPI, deleteShopAPI ,addShopCarAPI , saveFavoritesAPI } from '../../api/cart.js'
	// import { addFavoritesAPI ,addBatchFavoritesAPI} from '../../api/resource.js'
	import { saveBatchFavoritesAPI} from '../../api/cart.js'
	export default {
		components:{ uniIcon },
		data() {
			return {
				checkAll:false,
				checkList:[],
				showBottom:true,
				cartList:[],
				checkedList:[],
				totalPrice:0,
				num:0,
				otherPathList:[],
				alertOptions:{},
				imagePath:'',
				ids:'',
				isShowLoad:false,
			};
		},
		methods:{
			//获取购物车列表
			getCartList(){
				if(this.isLogin){
					getShopCarAPI({
						memberid:this.userId
					}).then( res => {
						this.isShowLoad=true;
						this.cartList = res.data.rows;
						this.cartList = this.cartList.map( v => {
							this.$set(v,'showDefault',false);
							if(v.publishDate) v.publishDate = v.publishDate.split(' ')[0];
							if(v.bookName && v.resourceType !==5){ 
								v.bookName = v.bookName.length>13 ? v.bookName.slice(0,13)+'...' : v.bookName;
							}else if(v.bookName && v.resourceType==5){
								v.bookName = v.bookName.length>10 ? v.bookName.slice(0,10)+'...' : v.bookName;
							}
							if(v.resourceType == 6){//其他类型
								var type = v.path.slice(v.path.lastIndexOf('.')+1);
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
							if(v.resourceType==4 || v.resourceType==5){//视频、音频
								if(v.videoTime){
									v.videoTime = v.videoTime.replace(/分/g,':').replace(/秒/,'');
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
				}
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
			changeChecked(item){
				if(item.status != 1){//已失效或删除
					return;
				}
				item.checked = !item.checked;
				this.checkAll = this.cartList.every(v => v.checked);
				this.totalPrice = 0;
				this.num = 0;
				this.cartList.map(v => {
					if(v.checked){
						if(v.isPay){
							this.totalPrice += Number(Number(v.isPay).toFixed(2));
						}else {
							this.totalPrice += Number(v.price.toFixed(2));
						}
						this.num++;
					}					
				})
				this.totalPrice = this.totalPrice.toFixed(2);
			},
			//全选
			changeAllChecked(){
				this.checkAll = !this.checkAll;
				this.totalPrice = 0;
				this.num = 0;
				this.cartList.map(v => {
					if(v.status != 1){//已失效或删除
						return;
					}
					v.checked=this.checkAll;
					if(this.checkAll ){
						if(v.isPay){
							this.totalPrice += Number(Number(v.isPay).toFixed(2));
						}else {
							this.totalPrice += Number(v.price.toFixed(2));
						}
						this.num = this.cartList.length;
					}else {
						this.totalPrice = 0;
						this.num = 0;
					}
					return v;
				})
				this.totalPrice = this.totalPrice.toFixed(2);
			},
			//结算
			sureOrder(){
				if(this.num == 0){
					uni.showToast({
						title:'请至少选择一种商品',
						icon:'none'
					})
					return 
				}
				var ids =[];
				this.cartList.map(v => {
					if(v.checked){
						switch(v.resourceType){
							case 1:
								ids.push(v.id);
								break;
							case 2:
								ids.push(v.contentid);
								break;
							default:
								ids.push(v.resourceid);							
						}					
					}
				});
				ids = ids.toString();
				uni.navigateTo({
					url:`/pages/cart/orders?ids=${ids}`
				})
// 				this.num = 0;
// 				this.totalPrice = 0;
// 				this.checkAll =false;
			},
			//删除购物车中商品
			deleteShop(){
				if(this.num == 0){
					uni.showToast({
						title:'请至少选择一种商品',
						icon:'none'
					})
					return ;
				}
				var ids =[]
				this.cartList.map(v => {
					if(v.checked){	
						switch(v.resourceType){
							case 1:
								ids.push(v.id);
								break;
							case 2:
								ids.push(v.contentid);
								break;
							default:
								ids.push(v.resourceid);							
						}
					}
				});
				ids = ids.toString();
				// console.log(ids)
				deleteShopAPI({
					memberid:this.userId,
					objectids:ids
				}).then( res => {
					// console.log(res)
					if(res.data.status ==1){
						this.getCartList();
						uni.showToast({
							title:'删除成功！',
							icon:'none'
						})
						this.num = 0;
						this.totalPrice = 0;
						this.checkAll =false;
					}
				})
			},
			//批量加入收藏
			addStore(){
				if(this.num == 0){
					uni.showToast({
						title:'请至少选择一种商品',
						icon:'none'
					})
					return ;
				}
				var list=[];
				this.cartList.map( v => {
					let obj={}
					if(v.checked){
						switch(v.resourceType){
							case 1:
								obj.objectid=v.id;
								break;
							case 2:
								obj.objectid = v.contentid;
								break;
							default:
								obj.objectid=v.resourceid;							
						}
						obj.objectType = v.resourceType;
						list.push(obj)
					}
					
				})
				list = JSON.stringify(list);
				let params={
					str:list,
					memberid:this.userId
				}
				saveBatchFavoritesAPI(params).then( res => {
					if(res.data.status==1){
						uni.showToast({
							title:'成功移入收藏夹',
							icon:'none'
						})
						this.getCartList()
						this.checkAll = false;
						this.num = 0;
						this.totalPrice = 0;
					}
				})
			},
			changeStatus(item){
				if(item.status != 1){//已下架或删除
					return;
				}
				let _this = this;
				let params = {
					objectType:item.resourceType
				}
				switch(item.resourceType){
					case 1://图书
						params.objectid = item.id;
						break;
					case 2:
						params.objectid = item.contentid;
						break;
					default:
						params.objectid = item.resourceid
				}
				params.memberid=this.userId
				this.alertOptions = {
					show:true,
					//移入收藏
					store(){
						if(item.isFavorites==1){
							uni.showToast({
								title:'不能重复添加！',
								icon:'none'
							})
							this.show = false;
							return ;
						}
						saveFavoritesAPI(params).then( res => {
							// console.log(res)
							if(res.data.status==1){
								this.show = false;
								uni.showToast({
									title:'成功移入收藏夹',
									icon:'none'
								})
								_this.getCartList()
							}
						})
					},
					del(){
						deleteShopAPI({
							memberid:_this.userId,
							objectids:params.objectid
						}).then( res => {
							// console.log(res);
							if(res.data.status==1){
								this.show = false;
								uni.showToast({
									title:'删除成功！',
									icon:'none'
								})
								_this.getCartList()
							}
						})
					},
					hide(){
						this.show = false;
					}
				}
			},
			//跳转到详情页面
			toDetails(url,id,status,item){
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
		onLoad(opt) {
			this.cartList=[];
			this.isShowLoad=false;
			if(this.isLogin){
				this.getCartList();
			}else {
				uni.navigateTo({
					url:'/pages/my/login'
				})
			}
			
			this.imagePath = this.imgURL();
			if(opt){
				this.ids=opt.ids;
				this.totalPrice = opt.total;
			}
		},
		onShow(opt) {
			this.cartList=[];
			if(!this.isCart){
				this.getCartList();
				this.checkAll = false;
				this.num = 0;
				this.totalPrice = 0;
			}
			if(!this.isLogin){
				uni.navigateTo({
					url:'/pages/my/login',
					
				})
			}
		},
		onPullDownRefresh() {
			this.getCartList();
			this.checkAll = false;
			this.num = 0;
			this.totalPrice = 0;
		},
		computed:{
			userId(){
				return this.$store.getters.userId
			},
			isLogin(){
				return this.$store.getters.isLogin
			},
			isOrg(){
				return this.$store.getters.isOrg;
			},
			isCart(){
				return this.$store.getters.isCart;
			}
		},
		watch:{
			userId(){},
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
uni-checkbox .uni-checkbox-input{
	border-radius:50% !important;
}
.cart-header {
	width:690upx;
	position:fixed;
	top:0;
	height:150upx;
	background:linear-gradient(40deg,#6080CB,#4465B7);
	display:flex;
	justify-content:flex-end;
	align-items: center;
	padding:0 30upx;
	font-size:36upx;
	color:#FFFFFF;	
	z-index:5;
	.title{
		margin-right:220upx;
		margin-top:50upx;
	}
	.manage{
		display:block;
		margin-top:50upx;
		height:48upx;
		line-height:48upx;
	}
}
.cartHeader{
	justify-content:center;
	.title{
		margin-right:0;
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
		}
		.icon{
			margin-right:30upx;
			display:flex;
			align-items: center;
			.default-icon{
				width:34upx;
				height:34upx;
				border:2upx solid #C3C3C3;
				border-radius:50%;
			}
			.checked-icon{
				width:38upx;
				height:38upx;
				image{
					width:38upx;
					height:38upx;
				}
			}
		}
		.left{
			position:relative;
			image{
				width:154upx;
				height:210upx;
				margin-right:40upx;
			}
			.upImg {
				position: absolute;
				width:154upx;
				height:210upx;
				background: rgba(0, 0, 0, 0.5);
				display: flex;
				justify-content: center;
				align-items: center;
				top: 0;
				left: 0;
				image{
					margin:0;
				}
			}
			
		}
		.right{
			.title{
				color:#3D3D3D;
				font-size:34upx;
				font-weight: bold;
				width:430upx;
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
				width:430upx;
				.ellipsis
			}
		}
	}
	.other-list,.img-list,.audio-list,.video-list{
		.left{
			.upImg,image{
				width:112upx;
				height:142upx;				
			}
		}
		.right{
			.origin{
				color:#8E8F91;
				font-size:24upx;
				width:430upx;
				.ellipsis;
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
			.upImg,image{
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
				bottom:12upx;
				color:#fff;
				font-size:20upx;
			}
		}
	}
	.article-list{
		position:relative;
		.upImg{
			position:absolute;
			right:0;
			top:40upx;
		}
		.item{
			padding:30upx 0;
			// border-top:1upx solid #E0E1E8;
			display:flex;
			justify-content: flex-start;
			align-items: center;
			position:relative;
			
			.left{
				.icon{
					margin-right:30upx;
					display:flex;
					align-items: center;
					.default-icon{
						width:34upx;
						height:34upx;
						border:2upx solid #C3C3C3;
						border-radius:50%;
					}
					.checked-icon{
						width:38upx;
						height:38upx;
						image{
							width:38upx;
							height:38upx;
						}
					}
				}
			}
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
	bottom:100upx;//web端
	// bottom:0;//手机端
	width:100%;
	height:90upx;
	background:#fff;
	display:flex;
	justify-content: space-between;
	align-items: center;
	.left{
		margin-left:30upx;
		.icon{
			margin-right:30upx;
			display:flex;
			align-items: center;
			.default-icon{
				width:34upx;
				height:34upx;
				border:2upx solid #C3C3C3;
				border-radius:50%;
			}
			.checked-icon{
				width:38upx;
				height:38upx;
				image{
					width:38upx;
					height:38upx;
				}
			}
			.all{
				font-size:24upx;
				color:#585858;
				margin-left:10upx;
			}
		}
	}
	.right{
		display:flex;
		justify-content: flex-end;
		align-items: center;
		.submit{
			width:214upx;
			height:90upx;
			text-align: center;
			line-height: 90upx;
			color:#fff;
			background:#3A5697;
			font-size: 30upx;
			margin-left:36upx;
		}
		.price{
			color:#D61F1F;
			font-size:28upx;
			font-weight: bold;
			.sum{
				color:#3D3D3D;
				font-weight:normal;
			}
			.big{
				font-size:32upx;
			}
		}
		.del,.store{
			width:158upx;
			height:60upx;
			border:1upx solid  #3A5697;
			font-size:26upx;
			color:#3A5697;
			text-align: center;
			line-height: 60upx;
		}
		.del{
			color:#fff;
			background:#3A5697;
			margin:0 30upx 0 20upx;
		}
	}
		
}

	/* 正在加载 */
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
		margin-bottom:60upx;
	}
}
</style>
