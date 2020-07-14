<template>
	<view class="bookshelf">
		<view class="uni-navbar" :class="{'uni-navbar-fixed':true}">

			<view class="loginTop">
				<view class="loginBtn">
					<view class="loginBack" @tap="back">
						<image src="../../static/images/home/return2.png" style="width:22upx; height:38upx;"></image>
					</view>
					<view class="loginText">
						我的书架
					</view>
					<view class="loginRegister" @tap="addType">
						+
					</view>
				</view>
			</view>



		</view>
<scroll-view scroll-y style="width: 750upx;">
		<view class="shelfCont">
			<!-- 我喜欢的书 -->
			
			<view class="shelfItem">
				<view class="shelfLeft" @tap="linkPage(likeShilf.id,likeShilf.title)">

					<image src="../../static/images/my/moren.png" mode="" style="width: 62upx; height: 62upx;"></image>
					<text>{{likeShilf.title}}</text>
				</view>
			</view>
			
				<view class="shelfItem" v-for="(item,index) in shelfList" :key="index" v-if="shelfList.length>0">
					<view class="shelfLeft" @tap="linkPage(item.id,item.title)">

						<image src="../../static/images/my/icon1.png" mode="" style="width: 62upx; height: 62upx;"></image>
						<text>{{item.title}}</text>
					</view>

					<view class="shelfRight" @tap="clickDrop(item)">
						...
					</view>
				</view>

			<!-- 正在加载中 -->
					<view class="loadingList" v-if="!isShowLoad" >
						<image src="../../static/images/home/loading.png" mode=""></image>
					</view>
					
					
					<!-- 暂无数据 -->
					<view class="noHave" v-if="dataTotal==-1&&isShowLoad">
						<image src="../../static/images/my/nohave.png" mode=""></image>
						<text>暂无书架</text>
			
					</view>
			<!-- <view class="shelfItem">
				<view class="shelfLeft">
					<image src="../../static/images/my/icon1.png" mode="" style="width: 62upx; height: 62upx;"></image>
					<text>资料汇编</text>
				</view>

				<view class="shelfRight">
					...
				</view>
			</view> -->

			<!-- <view style="height: 100upx; width:100%;text-align: center;color: #555555;" v-if="shelfList.length>0">
				{{loadingType==0?loadingText.contentdown:loadingType==1?loadingText.contentrefresh:loadingText.contentnomore}}
			</view> -->

			<view class="load-more" v-if="dataTotal>-1">
				<!-- 动图转 -->
				<view class="loading-img" v-show="loadingType === 1">
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
				<text class="loading-text" :style="{color:color}">{{loadingType==0?loadingText.contentdown:loadingType==1?loadingText.contentrefresh:loadingText.contentnomore}}</text>
			</view>






		</view>
		</scroll-view>
		
		

		<!-- + 修改 弹出框 -->
		<view v-show="showPopupMiddle" class="promptCont">
			<view class="promptContbg" @tap="showPopupMiddle=false">
			</view>
			<view class="newAdd">
				<view class="newAddCont">{{newAddTitle}}</view>
				<view class="newAddInput">
					<textarea value="" v-model="typeInput" placeholder="请输入分类名称" placeholder-style="color:#ABABB1" maxlength="20"
					 @input="newType" />
					<view class="newAddNum">
			{{typeInput.length}}/20
		</view>
				</view>
				<view class="newAddBtn">
					<view class="cancelbtn" @tap="showPopupMiddle=false">取消</view>
					<view class="determinebtn" @tap="determineBtn" :style="{color:okBtnColor}">确定</view>
				</view>
			</view>
		</view>




<!-- 删除按钮弹出框 -->
<view v-show="deletePopup" class="deletePopup">
				<view class="deletePopupbg" @tap="deletePopup=false">
				</view>
				<view class="delHistory">
					<view class="delHistoryCont">确认删除当前分类？</view>
					<view class="delHistoryBtn">
						<view class="cancelbtn" @tap="deletePopup=false">取消</view>
						<view class="determinebtn" @tap="confirmBtn">确定</view>
					</view>
				</view>
			</view>




		<view class="DropDown" v-show="isShowDrop">
			<view class="DropDownBg" @tap="isShowDrop=false">

			</view>
			<view class="DownCont" @tap="isShowDrop=true">
				<view class="resetType" @tap.stop="resetType">
					<image src="../../static/images/my/xiugai.png" mode="" style="width: 44upx; height: 44upx;"></image>
					<text class="borderBot">修改分类</text>
				</view>
				<view class="resetType" @tap.stop="deleteType">
					<image src="../../static/images/my/sc.png" mode="" style="width: 44upx; height: 44upx;"></image>
					<text>删除</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		selectAllBookShelfListAPI,
		saveBookShelfNameAPI,
		updateBookShelfNameAPI,
		deleteBookShelfNameAPI
	} from '../../api/my.js';
	export default {
		data() {
			return {
				isCheckBtn: false,
				checkAll: false,
				isShowDrop: false,
				showPopupMiddle: false,
				typeInput:'',
				shelfList:[],
				newAddTitle:'新建分类',
				resetId:'',
				deletePopup:false,
				pages:1,
				dataTotal:0,
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loadingType:0,
				likeShilf:{},
				color: "#777777",
				resetName:'',
				okBtnColor:'#ABABB1',//#4C5679
				isShowLoad:false,
			};
		},
		onLoad() {
			this.isShowLoad=false;
			this.getBookShelf();
		},
		/* onPageScroll(e) {
			console.log("11111111",e)
		}, */
		methods: {
			back() {
				var pages = getCurrentPages();
				if(pages.length==1){
					history.back();
				}
				uni.navigateBack({
					delta: 1
				})
			},
			/* 新建按钮换颜色 */
			newType(e){
				console.log(e.detail.value)
				let itemVal=e.detail.value;
				if(itemVal.length>0){
					this.okBtnColor='#4C5679';
				}else{
					this.okBtnColor='#ABABB1';
				}
			},
			/* 获取我的书架 */
			getBookShelf() {
				selectAllBookShelfListAPI({
					memberid:this.$store.state.userId,
					page:this.pages,
					rows:10,
				}).then(res => {
					this.isShowLoad=true;
					this.dataTotal = res.data.page.total-1;
					this.likeShilf=res.data.page.like;
					if(res.data.page.total>1){
						
						this.shelfList.push(...res.data.page.rows);
						if(this.dataTotal>this.shelfList.length){
							this.loadingType=0;
						}else{
							this.loadingType=2;
						}
					
					}else{
						this.loadingType=2;
					}
					
				})
				uni.stopPullDownRefresh();
			},
			clickDrop(val){
				console.log(val)
				this.isShowDrop=!this.isShowDrop;
				this.resetId=val.id;
				this.resetName=val.title;
			},
			/* 新添分类 */
			addType(){
				this.typeInput='';
				this.newAddTitle='新添分类';
				this.showPopupMiddle=!this.showPopupMiddle;
				this.okBtnColor='#ABABB1';
			},
			/* 修改分类 */
			resetType(){
				let self=this;
				self.typeInput=this.resetName;
				self.newAddTitle='修改分类';
				self.showPopupMiddle=true;
				self.isShowDrop=false;
			},
			/* 删除分类 */
			deleteType(){
				this.deletePopup=true;
				this.isShowDrop=false;
			},
			/* 删除框确定按钮 */
			confirmBtn(){
				deleteBookShelfNameAPI({
					memberid:this.$store.state.userId,
					id:this.resetId,
				}).then(res=>{
					if(res.data.status==1){
						this.isShowLoad=false;
						this.deletePopup=false;
						this.pages=1;
						this.shelfList=[];
						this.getBookShelf();
					}
				})
				
				
			},
			/* 新添 修改 确定 */
			determineBtn(){
				
				this.pages=1;
				let reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
				let okCont=reg.test(this.typeInput)
				if(this.typeInput==''){
					return
				}
				if(okCont){
					
				if(this.newAddTitle=='新添分类'){
					this.shelfList=[];
					//新添 this.getBookShelf();
					saveBookShelfNameAPI({
						memberid:this.$store.state.userId,
						title:this.typeInput,
					}).then(res=>{
						if(res.data.status==1){
							this.isShowLoad=false;
							this.showPopupMiddle=false;
							this.getBookShelf();
						}
					})
				}else{
					this.shelfList=[];
					updateBookShelfNameAPI({
						memberid:this.$store.state.userId,
						id:this.resetId,
						title:this.typeInput,
					}).then(res=>{
						if(res.data.status==1){
							this.isShowLoad=false;
							this.showPopupMiddle=false;
							this.getBookShelf();
						}
						
					})
					
				}
				
				}else{
					uni.showToast({
						title: '请输入中文、英文、数字',
						icon:"none"
					})
				}
				
			},
			
/* 页面跳转列表 */
linkPage(id,title){
	uni.navigateTo({
		url: 'likeBook?id=' + id+'&title='+title
	})
},

		},
		
		/* 下拉刷新 */
		onPullDownRefresh(){
			this.pages=1;
			this.loadingType=0;
			this.shelfList=[];
			this.getBookShelf();
		},
		
		//上拉加载更多
				onReachBottom() {
					 if(this.dataTotal>this.shelfList.length){
						 this.loadingType=1;
						 this.pages++;
						 setTimeout(()=>{
							this.getBookShelf(); 
						 },300)
						 
					 }else{
				this.loadingType=2;
			}
					/* if (this.commentsTotal > this.commentList.length) {
						this.loadingType=1;
						this.getCommentsList(this.detailsId)
					}else{
						this.loadingType=2;
					} */
		
				}
	}
</script>

<style lang="less" scoped>
	@imgUrl: "http://114.118.7.81:8081/";
	.shelfCont::-webkit-scrollbar:horizontal {
	height: 0px;
	}
	
	.shelfCont::-webkit-scrollbar{display:none; width:0; height: 0;}
	uni-page-body,
	uni-page-refresh {
		display: block;
		box-sizing: border-box;
		width: 100%;
	}

	.bookshelf {
		width: 750upx;
		height: 100%;
		background: #f5f5f4;

		.uni-navbar {
			display: block;
			position: relative;
			width: 100%;
			background:linear-gradient(40deg,#6080CB,#4465B7);
			overflow: hidden;
			height: 150upx;

		}


		.uni-navbar.uni-navbar-fixed {
			position: fixed;
			z-index: 99;
		}

		.loginTop {
			width: 750upx;
			height: 60upx;
			margin-top: 82upx;

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
					font-size: 44upx;
					height: 38upx;
					line-height: 38upx;
					margin-top: -10upx;
				}
			}
		}

		/* 书架内容 */
		.shelfCont {
			width: 690upx;
			padding: 149upx 30upx 0 30upx;
			background: #fff;
			/* border-bottom: 1upx solid #E0E1E8; */

			.shelfItem {
				width: 100%;
				height: 123upx;
				border-bottom: 1upx solid #E0E1E8;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.shelfLeft {
					width:650upx;
					display: flex;
					align-items: center;
					text {
						font-size: 34upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(61, 61, 61, 1);
						line-height: 40upx;
						padding-left: 20upx;
					}
				}

				.shelfRight {
					color: #AEB0B8
				}

			}
		}

		/* + */
		.promptCont {
			position: relative;

			.promptContbg {
				position: fixed;
				width: 100%;
				height: 100%;
				background: #000;
				opacity: 0.4;
				top: 0;
				left: 0;
				z-index: 1111;
			}

			.newAdd {
				position: fixed;
				top: 300upx;
				left: 30upx;
				width: 690upx;
				height: 385upx;
				background: rgba(255, 255, 255, 1);
				box-shadow: 0upx 4upx 20upx 0upx rgba(165, 166, 168, 0.42);
				border-radius: 30upx;
				opacity: 1;
				z-index: 1112;

				.newAddCont {
					
					font-size: 34upx;
					font-family: PingFang-SC-Bold;
					font-weight: bold;
					color: rgba(61, 61, 61, 1);
					line-height: 44upx;
					/* margin-bottom: 57upx; */
					opacity: 1;
					text-align: left;
					margin-top: 40upx;
					margin-left: 40upx;
				}

.newAddInput{
	width: 610upx;
	height: 134upx;
	margin-top: 30upx;
	position: relative;
	textarea{
		width: 570upx;
		height:94upx;
		margin-left: 40upx;
		background: #F3F4F7;
		font-size: 30upx;
		line-height: 30upx;
		padding: 20upx;
	}
	.newAddNum{
		position: absolute;
		bottom:4upx;
		right: -24upx;
		color: #ABABB1;
		font-size:26upx;
		
	}
}
				.newAddBtn {
					opacity: 1;
					width: 100%;
					position: absolute;
					/* display: flex;
							justify-content: space-between; */
					height: 88upx;
					font-size: 32upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					
					text-align: center;
					left: 0;
					bottom: 0;
					border-top: 1upx #E0E1E8 solid;

					.cancelbtn {
						opacity: 1;
						font-size: 32upx;
						border-right: 1upx #E0E1E8 solid;
						width: 49%;
						float: left;
						height: 88upx;
						line-height: 88upx;
						color: rgba(76, 86, 121, 1);
					}

					.determinebtn {
						opacity: 1;
						font-size: 32upx;
						width: 50%;
						float: right;
						height: 88upx;
						line-height: 88upx;
					}
				}

			}


		}
		
		/* 删除分类 */
		.deletePopup {
			position: relative;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
						
		
						.deletePopupbg {
							position: fixed;
							width: 100%;
							height: 100%;
							background: #000;
							opacity: 0.4;
							top: 0;
							left: 0;
							z-index: 110;
						}
		
						.delHistory {
							position: fixed;
							top: 400upx;
							left: 105upx;
							width: 540upx;
							height: 250upx;
							background: rgba(255, 255, 255, 1);
							box-shadow: 0upx 4upx 20upx 0upx rgba(165, 166, 168, 0.42);
							border-radius: 30upx;
							opacity: 1;
							z-index: 111;
		
							.delHistoryCont {
								/* width: 314upx; */
								width: 100%;
								height: auto;
								font-size: 30upx;
								font-family: PingFang-SC-Bold;
								font-weight: bold;
								color: rgba(61, 61, 61, 1);
								line-height: 44upx;
								/* margin-bottom: 57upx; */
								opacity: 1;
								text-align: center;
								margin-top: 70upx;
							}
		
							.delHistoryBtn {
								opacity: 1;
								width: 100%;
								position: absolute;
								/* display: flex;
									justify-content: space-between; */
								height: 88upx;
								font-size: 32upx;
								font-family: PingFang-SC-Medium;
								font-weight: 500;
								color: rgba(76, 86, 121, 1);
								text-align: center;
								left: 0;
								bottom: 0;
								border-top: 1upx #E0E1E8 solid;
		
								.cancelbtn {
									opacity: 1;
									font-size: 32upx;
									border-right: 1upx #E0E1E8 solid;
									width: 49%;
									float: left;
									height: 88upx;
									line-height: 88upx;
								}
		
								.determinebtn {
									opacity: 1;
									font-size: 32upx;
									width: 50%;
									float: right;
									height: 88upx;
									line-height: 88upx;
								}
							}
		
						}
		
		
					}
				
		


		.DropDown {
			position: fixed;
			width: 100%;
			height: 100%;
left: 0;
				top: 0;
				z-index: 1111;
			.DropDownBg {
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, 0.3);
				
				z-index: 2222;
				left: 0;
				top: 0;
			}

			.DownCont {
				background: #fff;
				width: 100%;
				height: 225upx;
				position: absolute;
				bottom: 0;
				z-index: 2333;
				left: 0;

				.resetType {
					height: 112upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 30upx;

					text {
						width: 620upx;
						height: 100%;
						display: flex;
						align-items: center;
						font-size: 34upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(54, 55, 59, 1);
					}

					.borderBot {
						border-bottom: 1upx solid #E0E1E8;
					}
				}
			}

		}
	}
	
		/* 正在加载中 */
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
