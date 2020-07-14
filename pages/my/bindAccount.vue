<template>
	<view class="loginCss">
		<view class="loginTop">
			<view class="loginBtn">
				<view class="loginBack" @tap="back">
					<image src="../../static/images/home/return2.png" style="width:22upx; height:38upx;"></image>
				</view>
				<view class="loginText">
					{{titleCont}}
				</view>
				<view class="loginRegister">


				</view>
			</view>
		</view>
		<view class="bindWord">
			绑定账号后，您可以一键登录~
		</view>
		<!-- 用户登录 -->
		<view v-if="loginWay==2">
			<view class="loginInput">

				<input class="itemInput borderBtn" type="text" value="" v-model="userName" placeholder="请输入用户名" placeholder-style=" color:#ABABB1" />
				<input class="itemInput" password type="text" value="" v-model="userPass" placeholder="请输入密码" placeholder-style=" color:#ABABB1" />

			</view>
			<view class="forgetPass">
				<text>没有账号？<navigator url="register" hover-class="none">注册</navigator></text>
			</view>
			<view class="loginConfirm bgColorPass">
				<text @tap="loginBtn">绑定</text>
			</view>
			<!-- <view class="anotherLogin">
				<text @tap="loginWay=1">手机号快捷登陆</text>
			</view> -->
		</view>


		<!-- 手机号绑定 -->
		<view v-if="loginWay==1">

			<view class="loginInput">

				<input class="itemInput borderBtn" type="number" value="" v-model="phoneName" placeholder="请输入手机号" maxlength="11"
				 placeholder-style=" color:#ABABB1" @input="changeColor" />
				<view class="smsCode">

					<input class="smsCodeWord" type="text" value="" v-model="phoneCode" placeholder="请输入短信验证码" placeholder-style=" color:#ABABB1"  @input="inputCode"/>
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


			</view>
			<view class="forgetPass">
				<text v-if="loginWay!=1">没有账号？<navigator url="register" hover-class="none">注册</navigator></text>
			</view>
			<view class="loginConfirm" v-bind:style="{background:btnBg}">
				<text @tap="phoneLoginBtn">绑定</text>
			</view>
			<view class="anotherLogin" v-if="loginWay!=1">
				<text>账号密码登录</text>
			</view>
		</view>



		<!-- 提示框 -->

		<promptBox :promptObj="promptObj"></promptBox>

	</view>
</template>

<script>
	import {
		sendcodeAPI
	} from "../../api/my.js";
	import {
		savePhoneAPI
	} from "../../api/login.js";
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
				titleCont: '',
				tips: '',
				userType: '',
				curphoneCode:'',
				curphoneName:'',
				btnBg:'#cccccc',

			};
		},
		onLoad(opt) {
			console.log("url", opt)
			this.loginWay = opt.type;
			this.userType = opt.userType;
			if (opt.type == 1) { //登录跳过来的绑定账号
				this.titleCont = '绑定手机号';
				this.tips = '绑定手机号后，您可以使用手机号登录哦~';
			} else {
				this.titleCont = '绑定账号';
				this.tips = '绑定账号后，您可以一键登录~';
			}
		},
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
			/* 改变颜色 */
			changeColor(e) {
				console.log(e.detail.value)
				let inputVal = e.detail.value;
				this.curphoneName = e.detail.value;
				if (inputVal.length == 11) {
					this.activeColor = '#e0b27c';
				} else {
					this.activeColor = '#ABABB1';
				}
				if(e.detail.value==''){
					this.btnBg='#CCCCCC';
					return
				}else{
					if(this.curphoneCode!=''){
						this.btnBg='#e0b27c';
					}else{
						return
					}
					
				}
			},
			inputCode(e){
				this.curphoneCode = e.detail.value;
				if(e.detail.value==''){
					this.btnBg='#CCCCCC';
					return
				}
				if(this.curphoneName==''){
					this.btnBg='#CCCCCC';
					return
				}
				this.btnBg='#e0b27c';
			},
			/* 发送短信验证码 */
			sendSmsCode() {
				let self = this;
				self.isSmsCode = true;
				self.seconds = 60;
				if (this.phoneName.length == 11) { //11位电话号
					let timer = setInterval(function() {
						console.log(self.seconds)
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

				/* loginAPI({
					password: this.userPass,
					type: loginType,
					usernameOrPhone: this.userName,
				}).then(res => {
					console.log("登录", res.data)
					this.promptObj = {
						isShow: true,
						title: res.data.info,
					}
				}) */

			},
			/* 电话登录 */
			phoneLoginBtn() {
				this.phoneName = this.phoneName.replace(/ /g, '');
				console.log("11111111",this.$store.getters.getToken)
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
				/* 登录用户没有绑定手机号 */
				savePhoneAPI({
					code: this.phoneCode,
					phone: this.phoneName,
					type: this.userType, //1: 普通用户 2: 机构用户
					userid:this.$store.state.userId,
				}).then(res => {
					if(res.data.status==1){
						uni.switchTab({
							url: '/pages/home/home'
						})
					}else{
						this.promptObj = {
							isShow: true,
							title: res.data.info,
						}
					}
					console.log("登录", res.data)
					/* this.promptObj = {
						isShow: true,
						title: res.data.info,
					} */
				})

			},
		},
	}
</script>

<style lang="less">
	uni-page-body,
	uni-page-refresh {
		display: block;
		box-sizing: border-box;
		width: 100%;
		height: 100% !important;
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
		height: 100%;
		width: 100%;
		display: block;
		background: #f5f5f4;

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
					width: 10upx;
					text-align: right;
					font-size: 32upx;
					height: 38upx;
					line-height: 38upx;
				}
			}
		}

		.bindWord {
			padding: 150upx 30upx 0 30upx;
			height: 88upx;
			line-height: 88upx;
			font-size: 28upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(61, 61, 61, 1);
		}

		.forgetPass {
			width: 720upx;
			height: 40upx;
			text-align: right;
			padding-right: 30upx;
			padding-top: 10upx;

			text {
				line-height: 40upx;
				font-size: 26upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: #666666;

				navigator {
					color: #4A9FFF;
					display: inline;
				}
			}
		}


		.loginInput {
			padding: 0upx 30upx 0 30upx;
			background: #ffffff;
			border-top: 1upx solid #E0E1E8;
			border-bottom: 1upx solid #E0E1E8;

			.itemInput {
				padding-top: 30upx;
				color: #3D3D3D;
				line-height: 40upx;
				font-size: 30upx;
				height: 40upx;
				padding-bottom: 36upx;

			}

			.borderBtn {
				border-bottom: 1upx solid #E0E1E8;
			}

			.smsCode {
				width: 100%;
				margin-top: 30upx;
				color: #3D3D3D;
				line-height: 40upx;
				font-size: 30upx;
				height: 53upx;
				padding-bottom: 36upx;


				.smsCodeWord {
					width: 250upx;
					float: left;
					display: block;
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

		.bgColorCode {
			background: #ccc;
		}

		.bgColorPass {
			background: #3d5696;
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

		.thirdLogin {
			position: fixed;
			height: 200upx;
			width: 100%;
			bottom: 0;
			left: 0;
			border-top: 1upx solid #E0E1E8;

			.anotherLogin {
				position: absolute;
				top: -20upx;
				height: 40upx;
				line-height: 40upx;
				left: 260upx;
				width: 230upx;
				text-align: center;
				background: #fff;
				color: #ABABB1;
				font-size: 26upx;
			}

			.anotherImg {

				display: flex;
				justify-content: space-between;
				margin: 85upx 160upx 0upx;

			}
		}

	}
</style>
