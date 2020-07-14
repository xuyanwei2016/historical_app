<template>
	<view style="height:100%;">
		<view class="content-header">
			<view class="left" @tap="returnPre" style="width:40upx;height:38upx;">
				<image src="../../static/images/home/return2.png" ></image>
			</view>
			<view class="right">
				<view class="font" @tap="showFont">
					<image src="../../static/images/books/A.png"></image>
				</view>
				<!-- 仅图书显示 书签-->
				<view class="mark" @tap="addMark" v-if="type=='book'">
					<image v-if="!isMark" src="../../static/images/books/mark2.png"></image>
					<image v-else src="../../static/images/books/marked.png"></image>
				</view>
				<!-- 仅图书显示 更多-->
				<view class="more" @tap="showMore" v-if="type=='book'">
					<image src="../../static/images/books/more.png" ></image>
				</view>
				<!-- 仅文章显示 分享 -->
				<view class="article-share" v-if="type=='article'">
					<image @tap="showShare=true" src="../../static/images/books/share1.png" style="width:33upx;height:38upx;"></image>
				</view>
			</view>
		</view>
		
		<view class="con-bgColor" :style="{background:bgColor[bgColorIndex-1]}"></view>
		<view><!-- :class="{isLock:isLock}"-->
			<view class="content-box" style="padding:0 30upx;margin-top:150upx;height:100%;margin-bottom:50upx;" >
				<scroll-view >
					<!-- <v-touch v-on:swipeleft="change"><text :style="{fontSize:fontSize[fontSizeIndex].size+'px'}">{{content}}</text></v-touch> -->
					<!-- <text>{{fontSize[fontSizeIndex]}}</text> -->
					<!-- <text >{{content}}</text> -->
					<rich-text :style="{fontSize:fontSize[fontSizeIndex-1].size+'px'}"  :nodes="content"></rich-text>
				</scroll-view>
			</view>
		</view>
		<view class="custom" :class="{init:showCustom}">
			<view class="mark" @tap="showCustom=false"></view>
			<view class="picker-content" >
				<view class="font-size font-style">
					<text class="title">字体大小</text>
					<view class="list">
						<text :class="{sizeActive:fontSizeIndex==index+1}" @tap="changeFontSizeIndex(index)" v-for="(item,index) in fontSize" :key="index">{{item.text}}</text>						
					</view>
				</view>
				<view class="bg-color font-style">
					<text class="title">背景颜色</text>
					<view class="list">
						<text :class="{bgColorActive:bgColorIndex==index+1}" @tap="changebgColorIndex(index)" v-for="(item,index) in bgColor" :key="index" :style="{background:item}"></text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="more-list" v-if="showMoreList">
			<view class="mark" @tap="showMoreList=false"></view>
			<view class="list">
				<view class="con">
					<view class="item" v-for="(item,index) in list" :key="index" @tap="toOthers(index)">
						<image :src="'../../static/images/books/'+item.icon+'.png'" ></image>
						<text>{{item.text}}</text>
					</view>
				</view>
				<view class="caret"></view>
			</view>
		</view>
		<view class="share" :class="{shareInit:showShare}">
			<view class="mark" @tap="showShare = false"></view>
			<view class="main">
				<view class="top">
					<view class="item" v-for="(item,index) in shareList" :key="index">
						<image :src="'../../static/images/books/'+item.icon+'.png'"></image>
						<view class="">
							<text>{{item.text}}</text>
						</view>
					</view>
				</view>
				<view class="bottom" @tap="showShare = false">
					<text>取消</text>
				</view>
			</view>			
		</view>
		<!-- <unishare :showShare="showShare"></unishare> -->
		<alertBox :alertOptions="alertOptions"></alertBox>
	</view>
</template>

<script>
	import { getContentByMarkidAPI, addBookMarkAPI, deleteBookMarkAPI, getbookinfoAPI,getcontentinfoAPI } from '../../api/resource.js';
	// import {unishare} from '@/components/unishare.vue'
	export default {
		// components:{unishare},
		data() {
			return {
				fontSize:[{
					text:'小',
					size:18
				},{
					text:'中',
					size:22
				},{
					text:'大',
					size:24
				},
				],
				fontSizeIndex:1,
				bgColor:['#F1E5D1','#D8C38C','#C7DFC9','#E7F3FF'],
				bgColorIndex:null,
				showCustom:false,
				list:[{
					icon:'catalog',
					text:'目录'
				},{
					icon:'mark3',
					text:'书签'
				},{
					icon:'share',
					text:'分享'
				},],
				showMoreList:false,
				content:[],
				bookid:'',
				contentid:'',
				shareList:[{
					icon:'weixin',
					text:'微信好友'
				},{
					icon:'quan',
					text:'微信朋友圈'
				},{
					icon:'qq',
					text:'QQ好友'
				}
				],	
				showShare:false,
				type:'',
				isMark:false,
				isNextRead:'',
				nextMarkid:null,
				prevMarkid:null,
				next:false,
				pre:false,
				isShop:null,
				markid:'',
				// pullDowm:false,
				alertOptions:{},
				isLock:false,

			};
		},
		methods:{
			returnPre(){
				var pages = getCurrentPages();
				/* console.log('历史记录',history.back()) */
				if(pages.length>1){
					let fiestIndex=pages.findIndex((item,index)=>{
						return item.route=="pages/home/reader";
					})
					uni.navigateBack({
						delta: pages.length-Number(fiestIndex)-1
					});
				}else{
					history.back();
				}
				
				
			},
			toOthers(i){
				switch(i){
					case 0://点击目录时
						if(!this.isLogin){
							uni.navigateTo({
								url:`/pages/home/bookCatalog?type=1&id=${this.bookid}&isShop=${this.isShop}`
							});
						}else {
							uni.navigateTo({
								url:`/pages/home/bookCatalog?classfy=${i}&id=${this.bookid}&isShop=${this.isShop}`
							});
						}
						break;
					case 1://点击书签时
						if(this.isLogin){
							uni.navigateTo({
								url:`/pages/home/bookCatalog?classfy=${i}&id=${this.bookid}&isShop=${this.isShop}`
							});
							
						}else {
							uni.navigateTo({
								url:'/pages/my/login'
							})
						}
						break;
					case 2://点击分享时
						this.showShare = true;
				}
				this.showMoreList = false;
				
			},
			changeFontSizeIndex(i){
				this.fontSizeIndex =i+1;
				uni.setStorageSync('fontSizeIndex',i+1);
			},
			changebgColorIndex(i){
				this.bgColorIndex = i+1;
				uni.setStorageSync('bgColorIndex',i+1);
			},
			showFont(){
				this.showCustom = true;
			},
			addMark(){
				if(this.isLogin){
					if(this.isMark){
						deleteBookMarkAPI({
							contentid:this.contentid,
							memberid:this.userId
						}).then( res => {
							if(res.data.status==0){
								this.isMark=false;
								uni.showToast({
									title:'已取消书签',
									icon:'none'
								})
							}
						})
					}else {
						addBookMarkAPI({
							bookid:this.bookid,
							contentid:this.contentid,
							memberid:this.userId
						}).then( res => {
							if(res.data.status==0){
								this.isMark=true;
								uni.showToast({
									title:'已加入书签',
									icon:'none'
								})
							}
						})
					}
				}else {
					uni.navigateTo({
						url:'/pages/my/login'
					})
				}
				
			},
			getContent(id){
				console.log(id,this.userId)
				getContentByMarkidAPI({
					markid:id,
					memberid:this.userId,
				}).then( res => {
					setTimeout(function(){
						uni.hideLoading()
					},500)
					if(this.next){
						uni.pageScrollTo({
							scrollTop: 5,
							duration:1
							// duration:300
						})
					}
					this.content = res.data.content.text.replace(/src="/g,'src="'+this.imgURL()).replace(/<img /g,'<img style="width:100%;height:100%;"');
					this.bookid = res.data.book.id;
					this.contentid = res.data.content.contentid;
					this.isMark = res.data.hasMark==0 ? false : true;
					this.isNextRead = res.data.isNextRead;
					this.prevMarkid = res.data.prevMarkid ? res.data.prevMarkid : null;
					this.nextMarkid = res.data.nextMarkid ? res.data.nextMarkid : null;
					console.log(22222,this.nextMarkid)
				})
			},
			showMore(){
				this.showMoreList=true;
			},
			getIsShop(){
				let params={};
	
				if(this.type=="article"){
					 params= {
						contentid:this.bookid,
					}
				}else{
					params = {
						bookid:this.bookid,
					}
				}
				
				if(this.isOrg){
					params.orgId = this.userId
				}else {
					params.memberid = this.userId
				}
				if(this.type=="article"){
					getcontentinfoAPI(params).then( res => {
	
						this.isShop = res.data.isShop;
					})
				}else{
					getbookinfoAPI(params).then( res => {
					
					this.isShop = res.data.isShop;
				})
				}
				
			}
		},
		onShow(opt){
			this.getIsShop()			
		},
		onLoad(opt) {
			this.bookid = opt.bookid;
			this.isShop = opt.isShop;
			this.markid = opt.markid;
			this.getContent(opt.markid);
			this.type = opt.type;
			if(uni.getStorageSync('fontSizeIndex')>0 && uni.getStorageSync('fontSizeIndex')!=''){
				this.fontSizeIndex = uni.getStorageSync('fontSizeIndex');
			}else {
				this.fontSizeIndex = 2;
			}
			
				
				/* if(this.bgColorIndex){} */
			if( uni.getStorageSync('bgColorIndex')>0 && uni.getStorageSync('bgColorIndex')!=''){
				
				this.bgColorIndex = uni.getStorageSync('bgColorIndex')
			}else {
				this.bgColorIndex = 1;
			}
			// this.getSize()
		},
		
		// 下拉加载下一章
		onReachBottom(){
			// setTimeout(()=>{
				uni.showLoading()
				this.next = true;
				this.pre = false;
				if(!this.nextMarkid){
					uni.hideLoading()
					return ;
				}
				console.log(1111,(this.isNextRead==0 || this.isShop==1) , this.nextMarkid)
				if((this.isNextRead==0 || this.isShop==1) && this.nextMarkid){
					console.log(111111111,this.nextMarkid)
					this.getContent(this.nextMarkid);
					this.isLock = false;
				}else {
					uni.hideLoading()
					let that = this;
					this.isLock=true;
					this.alertOptions = {
						show:true,
						title:'请购买后查看',
						confirmText:'购买',
						cancelText:'取消',
						sure(){
							this.show = false;
							that.isLock = false;
							if(that.isLogin){
								uni.navigateTo({
									url:'/pages/cart/orders?ids='+that.bookid
								})								
							}else {
								uni.navigateTo({
									url:'/pages/my/login'
								})
							}							
						},
						cancel(){
							that.isLock = false;
							this.show = false;
						}
						
					}
				}	
			// },800)
		},
		computed:{
			isLogin(){
				return this.$store.getters.isLogin
			},
			userId(){
				return this.$store.getters.userId
			},
			isOrg(){
				return this.$store.getters.isOrg;
			},
		},
		onPageScroll(e) {
			
			if(e.scrollTop == 0 && !this.isLock){//达到顶部位置是，下拉加载上一章
				uni.showLoading()
				this.next = true;
				this.pre = false;
				if(this.prevMarkid){
					this.getContent(this.prevMarkid);
				}else {
					uni.hideLoading()
				}	
			}
		},
	
	}
</script>

<style lang="less" scoped>
// uni-page-body{
// 	height:100%;
// }
.content-header{
	height:150upx;
	display:flex;
	position:fixed;
	top:0;
	width:690upx;
	justify-content: space-between;
	align-items: center;
	padding:0 30upx;
	background:linear-gradient(40deg,#6080CB,#4465B7);
	z-index:5;
	.left{
		margin-top:50upx;
		height:38upx;
		image{
			width:22upx;
			height:38upx;
		}
	}
	.right{
		margin-top:50upx;
		height:38upx;
		display:flex;
		justify-content: flex-start;
		align-items: center;
		.font,.mark{
			width:32upx;
			height:38upx;
			image{
				width:32upx;
				height:38upx;
			}
		}
		.mark{
			margin:0 50upx 0 40upx;
			width:25upx;
			height:38upx;
			image{
				width:25upx;
				height:38upx;
			}
		}
		.more {
			width:50upx;
			height:38upx;
			display: flex;
			align-items: center;
			image{
				width:50upx;
				height:10upx;
				vertical-align: 26upx;
			}
		}
		.article-share{
			width:32upx;
			height:38upx;
			margin-left:40upx;
			image{
				width:32upx;
				height:38upx;
			}
		}
	}
}
.con-bgColor{
	position:fixed;
	top:0;
	z-index:-1;
	height:100%;
	width:100%;
}
.isLock{
	position:fixed;
	top:1;
	width:100%;
}
#content{
	margin-top:150upx;
	// background:#f1e5d1;
	// height:100%;
	// padding:0 30upx;
	text{
		font-size:36upx;
		color:#4A2C1D;
	}
}
.custom{
	position:fixed;
	bottom:0;
	width:750upx;
	height:0;
	.mark{
		width:750upx;
		height:100%;
		z-index:4;
	}
	.picker-content{
		position:fixed;
		bottom:-120upx;
		transition:all .3s linear;
		width:690upx;
		z-index:5;
		background:rgba(247,247,247,1);
		height:0;
		padding:30upx;
		.font-style{
			.title{
				color:#757575;
				font-size:30upx;
			}
			.list{
				margin-top:20upx;
				display:flex;
				justify-content: space-around;
				background:#fff;
				height:88upx;
				line-height:88upx;
				align-items: center;
			}
		}
		.font-size{
			.list{
				text{
					color:#3D3D3D;
					font-size:32upx;
				}
				.sizeActive{
					color:#75491C;
					font-weight: bold;
				}
			}
		}
		.bg-color{
			margin-top:20upx;
			.list{
				text{
					width:56upx;
					height:56upx;
					border-radius:50%;
				}
				.bgColorActive{
					border:2upx solid #75491C;
				}
			}
		}
	}
}
.init{
	height:100%;
	.picker-content{
		height:334upx;
		bottom:0;
	}
}
.more-list{
	position:fixed;
	bottom:0;
	width:750upx;
	height:100%;
	.mark{
		width:750upx;
		height:100%;
		z-index:4;
		background:rgba(0,0,0,0.2);
	}
	.list{
		position:fixed;
		top:140upx;
		right:10upx;
		background:#fff;
		width:268upx;
		height:362upx;
		.caret{
			border:20upx solid transparent;
			border-bottom-color:#fff;
			position:fixed;
			top:106upx;
			right:50upx;
		}
		.con{
			.item{
				padding:34upx 74upx;	
				display:flex;
				justify-content: space-between;
				align-items: center;
				border-bottom:1upx solid #E0E1E8;
				text{
					font-size:30upx;
					color:#3D3D3D;
				}
			}
			.item:first-child{
				image{
					width:40upx;
					height:30upx;
				}
			}
			.item:nth-child(2){
				image{
					width:28upx;
					height:38upx;
				}
			}
			.item:nth-child(3){
				border-bottom:none;
				image{
					width:33upx;
					height:38upx;
				}
			}
		}
	}
	
}
.share {
	position:fixed;
	bottom:0;
	width:750upx;
	height:0;
	.mark{
		width:750upx;
		height:100%;
		z-index:4;
		background:rgba(0,0,0,0.2);		
	}
	.main{
		width:100%;
		position:fixed;
		transition:all .3s linear;
		bottom:-1;
		height:0;
		.top{
			padding:60upx 30upx;
			background:#F0EFEF;
			height:166upx;
			display:flex;
			justify-content: space-between;
			align-items: center;
			.item{
				image{
					width:120upx;
					height:120upx;
				}
			}
		}
		.bottom{
			height:100upx;
			background:#fff;
			text-align: center;
			line-height:100upx;
			color:#36373B;
			font-size:32upx;
		}
	}
}
.shareInit{
	height:100%;
	.main{
		height:384upx;
		bottom:0;
	}
}
</style>
