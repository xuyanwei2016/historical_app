<template>
	<view class="searh">
		<view class="uni-navbar-fixed">
			<view class="imgLeft" @tap="back">
				<image src="../../static/images/home/searchBack.png" mode="aspectFit" style="width:22upx; height:38upx;"></image>
			</view>
			<view class="input-view">

				<input confirm-type="search" @confirm="confirm" class="input" type="text" placeholder="请输入关键词" v-model="searchCont" style="background: #f6f6f6; border-radius: 32upx; height:64upx; padding:0 46upx 0 20upx;" />

				<image src="../../static/images/home/searchEmpty.png" style="width:30upx; height:30upx;" class="delImages" @tap="emptyInput"
				 v-show="searchCont!=''"></image>
			</view>
			<view class="searchSea" @tap="searchBtn">搜索</view>
		</view>




		<view class="searchCon">
			<view class="historyRec marTop" v-if="historyRecConAll.length>0">历史搜索
				<view @tap="showMiddlePopup">
					<uni-icons type="trash" size="22" color="#666666"></uni-icons>
				</view>
			</view>
			<view class="historyRecCon">
				<view class="countWord" v-for="(item,index) in historyRecConSix" :key="index" v-if="!historyRecCon" @tap="clickHotWord(item)">{{item}}</view>
				<view class="countWord" v-for="(item,index1) in historyRecConAll" :key="index1" v-if="historyRecCon" @tap="clickHotWord(item)">{{item}}</view>
			</view>





			<view class="searchArrow" @tap="moreBtn(1)" v-if="historyRecConAll&&historyRecConAll.length>10">
			
				<uni-icons type="arrowdown" size="30" color="#999" v-if="!isActive"></uni-icons>
				<uni-icons type="arrowup" size="30" color="#999" v-else></uni-icons>
			</view>


			<!-- 清空历史记录 -->
			<!-- <uni-popup :show="showPopupMiddle" :type="popType" v-on:hidePopup="hidePopup">
				<view class="delHistory">
					<view class="delHistoryCont">确认删除全部历史记录？</view>
					<view class="delHistoryBtn">
						<view class="cancelbtn" @tap="showPopupMiddle=false">取消</view>
						<view class="determinebtn" @tap="determineBtn">确定</view>
					</view>
				</view>
			</uni-popup> -->





			<view class="historyRec">热门搜索</view>
			<view class="searchHotCon">
			</view>

			<view class="historyRecCon">
				<view class="countWord" v-for="(item,index) in hotSearch" :key="index" @tap="clickHotWord(item)">{{item.word}}</view>

				<!-- arrowdown -->
			</view>
			<!-- <uni-icon type="arrowdown" size="22" color="#666666"></uni-icon> -->
			<!-- arrowdown -->
		</view>



		<view v-show="showPopupMiddle" class="promptCont">
			<view class="promptContbg" @tap="showPopupMiddle=false">
			</view>
			<view class="delHistory">
				<view class="delHistoryCont">确认删除全部历史记录？</view>
				<view class="delHistoryBtn">
					<view class="cancelbtn" @tap="showPopupMiddle=false">取消</view>
					<view class="determinebtn" @tap="determineBtn">确定</view>
				</view>
			</view>
		</view>





		<!-- 搜索框中有内容时的下拉框 -->

		<view class="inputChange" v-show="isShowInputChange">
			<view class="inputItem" v-for="(item,index) in associatedWords" :key="index" @tap="clickAssociatedWords(item.title)">
				<view class="inputItemWord">{{item.title}}</view>
				<image src="../../static/images/home/searchJt.png" alt="" style="width:23upx; height:23upx;"></image>
			</view>
		</view>





	</view>
</template>

<script>
	import uniNavBar from '../../components/uni-nav-bar.vue';
	/* import uniIcon from '../../components/uni-icon.vue'; */
	import uniIcons from '@/components/uni-icon';
	import uniPopup from '../../components/uni-popup.vue';
	import {
		searchlistAPI,
		gethotsearchwordAPI,
		tiplistAPI
	} from '../../api/home.js';
	/* 	import {
			resourse
		} from '../../common/imgUrl.js'; */
	export default {
		components: {
			uniNavBar,
			uniIcons,
			uniPopup
		},
		data() {
			return {
				historyRecCon: false,
				historyRecConAll: [],
				isActive: false,
				searchCont: '',
				hotSearch: [],
				showPopupMiddle: false,
				isShowInputChange: false,
				associatedWords: [],
				popType: 'middle',
				searchType: 0,
				historyRecConSix: [],

			}
		},
		onLoad: function(option) {
			
			if (!option.type || option.type == 'undefined') {
				this.searchType = 0;
			} else {
				this.searchType = option.type;
			}

			this.gethotsearchword();
			this.getStorage();
		},

		methods: {
			//统一的关闭popup方法
			hidePopup: function() {
				this.showPopupMiddle = false;
			},
			//展示居中 popup
			showMiddlePopup() {

				this.hidePopup();
				this.popType = 'middle';
				this.showPopupMiddle = true;
				

			},

			back() {
				console.log(getCurrentPages());
				let pages = getCurrentPages();
				if(pages.length>3){
					let page=pages[pages.length-3];
				console.log(page.route)
				if(page.route=='pages/home/search'){
					uni.switchTab({
						url:"/pages/home/home"
					})
				}else{
					uni.navigateBack({
						delta: 1
					})
				}
				}else{
					uni.navigateBack({
						delta: 1
					})
				}
				
				
			},
			/* 
			scan() {

				uni.showToast({
					title: '扫码'
				})
			}, */
			/* 搜索输入框中改变的时候 */
			searchInput(e) {
				console.log("测试",e.detail.value,this.searchCont)
				if (e.detail.value == '') {
					console.log("空的时候")
					this.isShowInputChange = false;
				} else {
					console.log("不为空的时候")
					this.isShowInputChange = true;
					tiplistAPI({
						guanjianzi:e.detail.value
					}).then(res=>{
						console.log("关联词",res.data)
						this.associatedWords=res.data.tipList;
					})
				}
				this.isShowInputChange = true;
				console.log('搜索输入框改变的时候')
			},
			/* 清空input输入框 */
			emptyInput() {
				this.searchCont = '';
				this.isShowInputChange = false;
			},
			/* 搜索按钮 */
			searchBtn() {
				this.historyRecCon = false;
				this.isActive = false;
				this.searchCont=this.searchCont.replace(/(^\s*)|(\s*$)/g,""); 
				if (this.searchCont == '') {
					this.getStorage();
					uni.navigateTo({
						url: 'resourcesList?type=' + this.searchType + '&searchVal=' + this.searchCont
					});
				} else {
					this.setStorage();

					this.isShowInputChange = false;
					/* if (!this.isActive) {
						this.historyRecConAll.unshift(this.searchCont)
					} */
					uni.navigateTo({
						url: 'resourcesList?type=' + this.searchType + '&searchVal=' + this.searchCont
					});

				}
			},
			/* 弹出框中确认按钮清空历史记录 */
			determineBtn() {
				this.showPopupMiddle = false;
				this.historyRecConSix = [];
				this.historyRecConAll = [];
				this.clearStorage();
			},
			/* 键盘上完成的事件 */
			confirm() {
				this.searchBtn();
				console.log('搜索')
				/* uni.showToast({
					title: '搜索'
				}) */
			},
			/* 历史搜索中的更多 */
			moreBtn(num) {
				/* let surAry = ['重点史料0', '重点史料1', '重点史料2', '重点史料3', '重点史料4', '重点史料5', '重点史料6', '重点史料7', '重点史料8', '重点史料9', '重点史料10',
					'重点史料11', '重点史料12'
				]; */
				if (num == 1) {
					console.log(this.isActive)
					if (this.isActive == true) { //收起
						this.historyRecCon = false;
						this.isActive = false;
					} else { //展开
						this.historyRecCon = true;
						this.isActive = true;
					}
				}

			},
			/* 点击关联词 */
			clickAssociatedWords(val) {
				this.searchCont = val;
				this.isShowInputChange = false;
				this.searchBtn();
			},
			/* 存到本地搜索记录 */

			setStorage: function() {
				/* if(this.searchCont==this.historyRecConAll[0]){
					console.log("相等")
				}else{
					
				} */
				let self = this;
				let isSame = this.historyRecConAll.every(val => {
					return val != this.searchCont;
				})


				if (!isSame) { //有相同的
					this.historyRecConAll.map((item, index) => {
						console.log('相同的', item, index)
						if (this.searchCont == item) {
							this.historyRecConAll.splice(index, 1)
						}
						return this.historyRecConAll
					})
				}

				this.historyRecConAll.unshift(this.searchCont);
				var data = JSON.stringify(this.historyRecConAll);
				var key = 'historyRecord';

				if (key.length === 0) {
					/* uni.showModal({
						title: '保存数据失败',
						content: 'key 不能为空',
						showCancel: false
					}) */
				} else {
					uni.setStorage({
						key: key,
						data: data,
						success: (res) => {
							this.getStorage();

						},
					})
				}
			},
			/* 获取storage */
			getStorage: function() {
				var key = 'historyRecord',
					data = '';
				this.historyRecConSix = [];
				if (key.length === 0) {
					/* uni.showModal({
						title: '读取数据失败',
						content: "key 不能为空",
						showCancel:false
					}) */
				} else {
					uni.getStorage({
						key: key,
						success: (res) => {

							let surAry = JSON.parse(res.data);

							surAry.map((val, index) => {
								
								if (val.length > 22) {
									val = val.slice(0, 22) + '...'
									surAry[index] = val;
									return surAry
								} else {
									return surAry
								}

							})


							console.log("1111")


							this.historyRecConAll = surAry;
							if (surAry.length > 10) {
								console.log("2222")
								for (let j = 0; j < 10; j++) {
									this.historyRecConSix.push(this.historyRecConAll[j])
								}
								this.historyRecCon = false;
								if (surAry.length > 20) {
									this.historyRecConAll = this.historyRecConAll.splice(0, 20);
								}

							} else {
								console.log("2121212121")
								this.historyRecCon = true;

							}
						}
					})
				}
			},
			/* 获取热词 */
			gethotsearchword() {
				gethotsearchwordAPI().then(res => {
					this.hotSearch = res.data.rows
				})
				/* gethotsearchwordAPI({
					success: (res) => {
						this.hotSearch = res.data.rows
						console.log('热刺', res.data)
					}
				}) */
			},
			/* 点击热门词 */
			clickHotWord(val) {

				this.searchCont = val.word ? val.word : val;
				this.searchBtn();
			},
			/* 清空storage */
			clearStorage: function() {
				uni.removeStorageSync('historyRecord')
				/* this.key = '',
					this.data = ''
				uni.showModal({
					title: '清除数据成功',
					content: ' ',
					showCancel: false
				}) */
			}
		},

		onPullDownRefresh() {
			console.log('onPullDownRefresh')
			setTimeout(function() {
				uni.stopPullDownRefresh()
				console.log('stopPullDownRefresh')
			}, 1000)
		}
	}
</script>

<style lang="less">
	.searh {

		width: 750upx;

		.uni-navbar-fixed {
			position: fixed;
			z-index: 2;
			/* display: block; */

			background: #fff;


			width: 690upx;
			height: 64upx;
			line-height: 64upx;
			padding: 72upx 30upx 15upx 30upx;
			display: flex;
			justify-content: space-between;
			border-bottom: 1upx solid rgba(224, 225, 232, 1);

			.imgLeft {
				width: 22upx;
				hieght: 38upx;
				padding-top: 12upx;

				img {

					width: 22upx;
					height: 38upx;
				}
			}

			.input-view {
				width: 572upx;
				height: 64upx;
				position: relative;

				.input {
					margin: 0;
					padding: 0;
					font-size: 28upx;
				}

				.delImages {
					width: 30upx;
					height: 30upx;
					margin-right: 16upx;
					border-radius: 15upx;
					position: absolute;
					top: 17upx;
					right: 17upx;
					z-index: 11;
				}
			}

			.searchSea {
				width: 62upx;
				font-size: 30upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: #666;
				line-height: 30upx;
				line-height: 64upx;
				height: 64upx;
			}

		}


		.searchCon {
			padding: 172upx 30upx 0 30upx;
			/* margin-top: 150upx; */

			/* display: flex; */
			/* justify-content: flex-end; */
			.historyRec {
				display: flex;
				justify-content: space-between;
				width: 100%;
				margin-bottom: 30upx;
				font-size: 28upx;
				font-family: PingFang-SC-Bold;
				font-weight: bold;
				color: rgba(61, 61, 61, 1);
				display: flex;
				align-content: center;
				align-items: center;

				.marTop {
					margin-top: 50upx;
				}

			}

			.historyRecCon {
				font-size: 28upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(85, 85, 85, 1);

				.countWord {
					padding: 10upx 20upx;
					background: rgba(249, 249, 248, 1);
					display: inline-block;
					margin-right: 10upx;
					margin-bottom: 10upx;
					font-size: 28upx;

				}

			}

			.searchArrow {
				display: flex;
				align-items: center;
				justify-content: center;
				align-content: center;
				width: 100%;

				.dh {
					transform-origin: 50%;
					-webkit-animation: load 0.1s linear 0s;
					animation-fill-mode: forwards;
					/*动画播放完毕时停止，不回到初始状态*/
					-webkit-animation-fill-mode: forwards;
				}
			}

		}

		.promptCont {
			position: relative;
			width: 100%;
			top: 0;
			left: 0;
			height: 100%;

			.promptContbg {
				position: fixed;
				width: 100%;
				height: 100%;
				background: #000;
				opacity: 0.4;
				top: 0;
				left: 0;
				z-index: 2;
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
				z-index: 11;

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


		.inputChange {
			width: 100%;
			background: #fff;
			height: 100%;
			overflow-y: scroll;
			position: fixed;
			top: 130upx;

			.inputItem {
				display: flex;
				justify-content: space-between;
				align-content: center;
				align-items: center;
				margin: 0 30upx;
				border-bottom: 1upx solid #E0E1E8;
				height: 90upx;

				.inputItemWord {
					font-size: 30upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(61, 61, 61, 1);
				}

				image {
					padding-right: 7upx;
				}
			}
		}
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1;
		}

		100% {
			transform: rotate(180deg);
			transform-origin: 50% 50%;
		}
	}
</style>
