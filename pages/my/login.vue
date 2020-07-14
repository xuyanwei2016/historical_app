<template>
	<view class="loginCss"><!--   v-bind:style="{height:scrHeight+'px'}" -->
		<view class="loginTop">
			<view class="loginBtn">
				<view class="loginBack" @tap="back">
					<image src="../../static/images/home/return2.png" style="width:22upx; height:38upx;"></image>
				</view>
				<view class="loginText">
					登录
				</view>
				<view class="loginRegister" @tap="goRegister">
					注册
				</view>
			</view>
		</view>

		<!-- 用户登录 -->
		<view v-if="!loginWay">
			<view class="loginInput">
				<input class="itemInput" type="text" value="" v-model="userName" placeholder="请输入用户名" placeholder-style=" color:#ABABB1" @input="changBtn" id="userName"/>
				<input class="itemInput" password type="text" value="" v-model="userPass" placeholder="请输入密码" placeholder-style=" color:#ABABB1" @input="changBtn" id="userPass"/>
				
				<view class="forgetPass">
					<text @tap="linkForget">
						忘记密码
					</text>
				</view>
			</view>
			<view class="loginConfirm" @tap="loginBtn" v-bind:style="{background: loginBtnBg}">
				<text>登录</text>
			</view>
			<view class="anotherLogin">
				<text @tap="loginWay=1">手机号快捷登陆</text>
			</view>
		</view>


		<!-- 手机号登录 -->
		<view v-if="loginWay">

			<view class="loginInput">

				<input class="itemInput" type="number" value="" v-model="phoneName" placeholder="请输入手机号" maxlength="11"
				 placeholder-style=" color:#ABABB1" @input="changeColor"/>
				<view class="smsCode">

					<input class="smsCodeWord" type="text" value="" v-model="phoneCode" placeholder="请输入短信验证码" placeholder-style=" color:#ABABB1" @input="changePhoneBtn"/>
					<view class="smsCodeBtn">
						<view @tap="sendSmsCode" v-bind:style="{ color: activeColor}" v-if="!isSmsCode">
							发送验证码
						</view>
						<view style="color:#ABABB1" v-else>
							发送验证码{{seconds}}
						</view>
						<!-- 倒计时 -->
					</view>

					<!-- <button class="smsCodeBtn" type="primary"></button> -->
				</view>

				<view class="forgetPass">
					<text></text>
				</view>
			</view>
			<view class="loginConfirm" @tap="phoneLoginBtn" v-bind:style="{background: phoneLoginBtnBg}">
				<text>登录</text>
			</view>
			<view class="anotherLogin">
				<text @tap="loginWay=0">账号密码登录</text>
			</view>
		</view>



		<!-- 第三方登录 -->
		<view class="thirdLogin"><!--  v-bind:style="{top:tPaddingTop+'px'}" -->
			<view class="anotherLogin">
				其他方式登录
			</view>
			<view class="anotherImg">
				<image src="../../static/images/login/qq.png" style="width: 43upx; height:50upx"></image>
				<image src="../../static/images/login/weixin.png" style="width: 61upx; height:51upx"></image>
				<image src="../../static/images/login/weibo.png" style="width: 60upx; height:48upx"></image>

			</view>
		</view>




		<view v-show="showPopupMiddle" class="promptCont">
			<view class="promptContbg" @tap="showPopupMiddle=false">
			</view>
			<view class="delHistory">
				<view class="delHistoryCont">您没有绑定手机号，是否去绑定？</view>
				<view class="delHistoryBtn">
					<view class="cancelbtn" @tap="showPopupMiddle=false">取消</view>
					<view class="determinebtn" @tap="linkBtn">确定</view>
				</view>
			</view>
		</view>



		<promptBox :promptObj="promptObj"></promptBox>

	</view>
</template>

<script>

	import {
		sendcodeAPI
	} from "../../api/my.js";
	import {
		loginAPI,
		loginByPhoneAPI
	} from "../../api/login.js";
	import {
		loginToken
	} from 'vuex'
	export default {
		data() {
			return {
				userName: '',
				userPass: '',
				phoneName: '',
				phoneCode: '',
				loginWay: 0,
				activeColor: '#ABABB1',
				promptObj: {

				},
				seconds: 60,
				isSmsCode: false,
				isthirdLogin: true,
				isAnima: false,
				showPopupMiddle: false,
				tPaddingTop:0,
				loginBtnBg:'#CCCCCC',
				phoneLoginBtnBg:'#CCCCCC',
				curUserName:'',
				curUserPass:'',
				curPhoneName:'',
				curPhonePass:'',
				
				scrHeight:0,
				
				aaa:"1111",
				bbb:null,
			};
		},
		onLoad() {
			let curHeight=uni.getSystemInfoSync().screenHeight * 180 / 1334;
			this.scrHeight=uni.getSystemInfoSync().screenHeight;
			this.tPaddingTop=this.scrHeight-curHeight;
		},
		
		
		
		

		methods: {
			
			changBtn(e){
				
				if(e.currentTarget.id=='userName'){
					this.curUserName=e.detail.value;
					
				}
				if(e.currentTarget.id=='userPass'){
					this.curUserPass=e.detail.value;
					
				}
				if(e.detail.value==''){
					this.loginBtnBg='#CCCCCC';
					return
				}
				if(this.curUserName==''){
					this.loginBtnBg='#CCCCCC';
					return
				}
				if(this.curUserPass==''){
					this.loginBtnBg='#CCCCCC';
					return
				}
				this.loginBtnBg='#3D5696';
			},
			
			changePhoneBtn(e){
				this.curPhonePass=e.detail.value;
				if(e.detail.value==''){
					this.phoneLoginBtnBg='#CCCCCC';
					return
				}
				if(this.curPhoneName==''){
					this.phoneLoginBtnBg='#CCCCCC';
					return
				}
				this.phoneLoginBtnBg='#3D5696';
			},
			
			back() {
				console.log(getCurrentPages(),'返回')
				var pages = getCurrentPages();
				var len = pages.length;
				var page = pages[len-2];
				 
				if(page.route=='pages/cart/cart'){
					uni.switchTab({
						url:'/pages/my/my'
					})
				}else if(page.route=='pages/my/change'){
					uni.switchTab({
						url:'/pages/my/my'
					})
				}else {
					uni.navigateBack({
						delta: 1
					})
				}
			}, 
			/* 改变颜色 */
			changeColor(e) {
				
				let inputVal = e.detail.value;
				this.curPhoneName= e.detail.value;
				if (inputVal.length == 11) {
					this.activeColor = '#e0b27c';
				} else {
					this.activeColor = '#ABABB1';
				}
				if(e.detail.value==''){
					this.phoneLoginBtnBg='#CCCCCC';
					return
				}else{
					if(this.curPhonePass!=''){
						this.phoneLoginBtnBg='#3D5696';
					}else{
						return
					}
					
				}
			},
			/* 发送短信验证码 */
			sendSmsCode() {
				let self = this;
				self.isSmsCode = true;
				self.seconds = 60;
				if (this.phoneName.length == 11) { //11位电话号
					let timer = setInterval(function() {
						if (self.seconds > 0) {
							self.seconds--

						} else {
							self.isSmsCode = false;
							clearInterval(timer)

						}
					}, 1000)
					sendcodeAPI({
						phone: self.phoneName
					}).then(res => {
						if (res.data.status == 0) {
							this.phoneCode = res.data.rdata;
						} else {
							this.promptObj = {
								isShow: true,
								title: res.data.info,
							}
						}


					})
				} else {
					self.isSmsCode = false;
				}
			},
			/* 用户登录 */
			loginBtn() {
				/* ([\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}) 用户名 */
				let reg = /^(^1[3-9]\d{9})$/;
				this.userName = this.userName.replace(/ /g, '');
				/* this.userPass=this.userPass.replace(/ /g,''); */
				if (this.userName == '') {
					this.promptObj = {
						isShow: true,
						title: '请输入用户名',
					}
					return false;
				}
				if (this.userPass == '') {
					this.promptObj = {
						isShow: true,
						title: '请输入密码',
					}
					return false;
				}
				let loginType = 1;
				if (reg.exec(this.userName)) { //手机号登录
					
					loginType = 2;
					/* this.userName='16601115626';
					this.userPass="111111"; */

				} else { //用户名登录
					loginType = 1;
					/* this.userName='renaoyang';
					this.userPass="111111"; */
				}
				loginAPI({
					password: this.md5(this.userPass),
					type: loginType,
					usernameOrPhone: this.userName,
				}).then(res => {
					
					let num = res.data.memberid ? 1 : 2;
					if ((res.data.status == 1 && res.data.phone == 1)||(res.data.status == 1 && !res.data.phone)) { //登录成功
						let userId = res.data.memberid ? res.data.memberid : res.data.uid;
						this.$store.commit('login', userId);
						let isOrg = res.data.memberid ? false : true;
						this.$store.commit('changeUserType', isOrg);
						
						uni.setStorageSync('userType', res.data.memberid ? 1 : 2);
						uni.setStorage({
							key: 'appToken',
							data: res.data.memberid ? res.data.memberid : res.data.uid,
							success: (res) => {
								var pages = getCurrentPages();
								var len = pages.length;
								var page = pages[len-2];
								// console.log(page.route)
								this.promptObj = {
									isShow: true,
									title: '登录成功',
								}
								if(pages.length==1){
									uni.switchTab({
										url: '/pages/home/home'
									})
									return
								}
								
								if(page.route&&page.route=='pages/my/my'){//第一次登录跳转到首页
									uni.switchTab({
										url: '/pages/home/home'
									})
								}else if(page.route&&page.route=='pages/my/change'){//第一次登录跳转到首页
									uni.switchTab({
										url: '/pages/home/home'
									})
								}else {//其他页面跳转的登录后退
									uni.navigateBack({
										delta:1
									})
								}
							},

						})
					} else if (res.data.status == 1 && res.data.phone == 0) {
						let userId = res.data.memberid ? res.data.memberid : res.data.uid;
						this.$store.commit('login', userId);
						let isOrg = res.data.memberid ? false : true;
						this.$store.commit('changeUserType', isOrg);
						uni.setStorageSync('userType', res.data.memberid ? 1 : 2);
						uni.setStorage({
							key: 'appToken',
							data: res.data.memberid ? res.data.memberid : res.data.uid,
							success: (res) => {
								uni.navigateTo({
									url: '/pages/my/bindAccount?type=1&userType=' + num
								})
							},

						})





						/* uni.setStorage({
							key: 'appToken',
							data: res.data.memberid ? res.data.memberid : res.data.uid,
							success: (res) => {
								uni.navigateTo({
									url: '/pages/my/bindAccount?type=1&userType=' + num
								})
							},

						}) */

					} else {
						this.promptObj = {
							isShow: true,
							title: res.data.info,
						}
					}

				})

			},
			/* 电话登录 */
			phoneLoginBtn() {
				this.phoneName = this.phoneName.replace(/ /g, '');

				if (this.phoneName == '') {
					this.promptObj = {
						isShow: true,
						title: '请输入手机号',
					}
					return false;
				}
				if (this.phoneCode == '') {
					this.promptObj = {
						isShow: true,
						title: '请输入验证码',
					}
					return false;
				}

				loginByPhoneAPI({
					phone: this.phoneName,
					code: this.phoneCode
				}).then(res => {
					if (res.data.status == 1) {
						this.promptObj = {
							isShow: true,
							title: '登录成功',
						};
						let userId = res.data.memberid ? res.data.memberid : res.data.uid;
						this.$store.commit('login', userId);
						let isOrg = res.data.memberid ? false : true;
						this.$store.commit('changeUserType', isOrg);
						uni.setStorageSync('userType', res.data.memberid ? 1 : 2);
						uni.setStorage({
							key: 'appToken',
							data: res.data.memberid ? res.data.memberid : res.data.uid,
							success: (res) => {
							
								uni.switchTab({
									url: '/pages/home/home'
								})
							},

						})
					} else {
						this.promptObj = {
							isShow: true,
							title: res.data.info,
						}
					}

				})

			},
			/* 忘记密码 */
			linkForget() {
				uni.navigateTo({
					url: 'forgetPass'
				})
			},
			/* 跳转到绑定手机号 */
			linkBtn() {
				/* uni.switchTab({
					url: '/pages/home/home'
				}) */
			},
			goRegister(){
				var pages = getCurrentPages();
				if(pages.length<2){
					uni.navigateTo({
					    url: '/pages/my/register'
					});
					return 
				}
				if(pages[pages.length-2]=='pages/my/register'){
					uni.navigateBack({
					    delta: 1
					});
				}else{
					uni.navigateTo({
					    url: '/pages/my/register'
					});
				}
			},
			

		},
		
		onBackPress(options) {
			let self=this;
			self.aaa=2222;
			this.bbb=getCurrentPages();
            if (options.from === 'navigateBack') {  
                return false;  
            }  
            this.back();  
            return true;  
			/* uni.showToast({
				title: '搜索'
			}) */
			/* uni.switchTab({
				url: '/pages/home/home'
			}) */
			/* plus.key.addEventListener( backbutton, back); */
			/* uni.navigateTo({
    url: 'forgetPass'
}); */
		},
	}
</script>

<style lang="less">
	uni-page-body,
	uni-page-refresh {
		display: block;
		box-sizing: border-box;
		width: 750upx;
		height: 100%;
	}

	page {
		-webkit-user-select: none;
		user-select: none;
		width: 100%;
		height: 100%;
		overflow-x: hidden;

	}

	uni-toast .uni-sample-toast {
		position: fixed;
		z-index: 999;
		top: 39% !important;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		text-align: center;
		max-width: 80%;
	}

	.loginCss {
		position: relative;
		width: 750upx;
		height: 100%;
		top: 0;
		left: 0;
		overflow: hidden;

		.loginTop {
			background:linear-gradient(40deg,#6080CB,#4465B7);
			height: 128upx;
			width: 750upx;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 11;
			padding-top: 22upx;

			.loginBtn {
				padding: 69upx 30upx 0 20upx;
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

		.loginInput {
			padding: 150upx 30upx 0 30upx;

			.itemInput {
				margin-top: 30upx;
				color: #3D3D3D;
				line-height: 40upx;
				font-size: 30upx;
				height: 40upx;
				padding-bottom: 36upx;
				border-bottom: 1upx solid #E0E1E8;
			}

			.forgetPass {
				width: 100%;
				height: 40upx;
				padding-top: 10upx;
				text-align: right;

				text {
					display: block;
					width: 100%;
					height: 40upx;
					line-height: 40upx;
					font-size: 26upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(74, 159, 255, 1);
				}
			}

			.smsCode {
				width: 100%;
				margin-top: 30upx;
				color: #3D3D3D;
				line-height: 40upx;
				font-size: 30upx;
				height: 54upx;
				padding-bottom: 36upx;
				border-bottom: 1upx solid #E0E1E8;


				.smsCodeWord {
					width: 250upx;
					float: left;
					display: block;
					font-size: 30upx !important;
				}

				.smsCodeBtn {
					float: right;
					width: 224upx;
					border-left: 1upx solid #E0E1E8;
					background: none;
					font-size: 30upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(171, 171, 177, 1);
					text-align: center;
					padding-bottom: 0upx;
				}

			}
		}

		.loginConfirm {
			width: 690upx;
			height: 86upx;
			line-height: 86upx;
			text-align: center;
			margin: 250upx 30upx 0 30upx;
			

			text {
				color: #fff;
				font-size: 34upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
			}
		}

		.anotherLogin {
			width: 100%;
			text-align: center;
			height: 84upx;
			line-height: 84upx;
			color: #4A9FFF;
			font-size: 26upx;
		}

		.anima {
			animation: load 0.5s ease 1;
			-webkit-animation: load 0.5s ease 1;

		}

		.thirdLogin {
			/* position: absolute; */
			/* height: auto; */
			width: 750upx;
			height: 160upx;
			margin-top: 300upx;
			/* bottom: 80upx; */
			/* left: 0; */
			opacity: 1;
			border-top: 1upx solid #E0E1E8;


			.anotherLogin {
				/* position: absolute; */
				margin-top: -20upx;
				height: 40upx;
				line-height: 40upx;
				margin-left: 260upx;
				width: 230upx;
				text-align: center;
				background: #fff;
				color: #ABABB1;
				font-size: 26upx;
			}

			.anotherImg {

				display: flex;
				justify-content: space-between;
				margin: 70upx 160upx 0upx;

			}
		}

	}

	@-webkit-keyframes load {
		0% {
			opacity: 0;
		}

		50% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes load {
		0% {
			opacity: 0;
		}

		50% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	@-moz-keyframes load {
		0% {
			opacity: 0;
		}

		50% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	@-o-keyframes load {
		0% {
			opacity: 0;
		}

		50% {
			opacity: 0;
		}

		100% {
			opacity: 1;
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
</style>
