<template>
	<view class="loginCss">
		<view class="loginTop">
			<view class="loginBtn">
				<view class="loginBack" @tap="back">
					<image src="../../static/images/home/return2.png" style="width:22upx; height:38upx;"></image>
				</view>
				<view class="loginText">
					注册
				</view>
				<view class="loginRegister" @tap="goLogin">登录</view>
			</view>
			<view class="userType">
				<view class="perUser" @tap="changeTap(1)">
					个人用户
					<view class="triangle_border_up" v-if="loginWay==0"></view>
				</view>
				<view class="instiUsers" @tap="changeTap(2)">
					机构用户
					<view class="triangle_border_up" v-if="loginWay==1"></view>
				</view>
			</view>

		</view>

		<!-- 个人 -->
		<view v-if="!loginWay">
			<view class="loginInput">

				<input class="itemInput" type="text" value="" v-model="personalName" placeholder="用户名（4-16位英文、数字）"
				 placeholder-style=" color:#ABABB1" @input="changRegBtn" id="personalName" />
				<input class="itemInput" type="text" value="" v-model="personalPass" placeholder="密码（6-16位英文、数字）" password
				 placeholder-style=" color:#ABABB1" @input="changRegBtn" id="personalPass" />
				<input class="itemInput" type="text" value="" v-model="personalPhone" placeholder="绑定手机号" placeholder-style=" color:#ABABB1"
				 maxlength="11" @input="changeColor" id="personalPhone" />
				<view class="smsCode">

					<input class="smsCodeWord" type="text" value="" v-model="personalPCode" placeholder="请输入短信验证码" placeholder-style=" color:#ABABB1"
					 @input="changRegBtn" id="personalPCode" />
					<view class="smsCodeBtn">
						<view @tap="sendSmsCode" v-bind:style="{ color: activeColor}" v-if="!isSmsCode">
							发送验证码
						</view>
						<view style="color:#ABABB1" v-else>
							发送验证码{{seconds}}
						</view>
					</view>
				</view>
				<view class="forgetPass" @tap="clickGree(1)">

					<image src="../../static/images/login/noagree.png" style="width: 24upx; height: 24upx;" v-if="!isPAgreed"></image>
					<image src="../../static/images/login/agree.png" style="width: 24upx; height: 24upx;" v-else></image>
					我已认真阅读并同意<text @tap.stop="agreementBtn">《用户注册协议》</text>

				</view>
			</view>
			<view class="loginConfirm" @tap="registerBtn" v-bind:style="{background:regBtnBg}">
				<text>立即注册</text>
			</view>
			<!-- <view class="anotherLogin">
				<text @tap="loginWay=1">手机号快捷登陆</text>
			</view> -->
		</view>


		<!-- 机构 -->
		<view v-if="loginWay">

			<view class="loginInput">
				<input class="itemInput" type="text" value="" v-model="institutionsCode" placeholder="请输入机构码" placeholder-style=" color:#ABABB1"
				 @input="changRegInsBtn" id="institutionsCode" />
				<input class="itemInput" type="text" value="" v-model="institutionsUser" placeholder="用户名（4-16位英文、数字）"
				 placeholder-style=" color:#ABABB1" @input="changRegInsBtn" id="institutionsUser" />
				<input class="itemInput" type="text" password value="" v-model="institutionsPass" placeholder="密码（6-16位英文、数字）"
				 placeholder-style=" color:#ABABB1" @input="changRegInsBtn" id="institutionsPass" />
				<input class="itemInput" type="text" value="" v-model="institutionsPhone" placeholder="绑定手机号" placeholder-style=" color:#ABABB1"
				 maxlength="11" @input="changeColor" id="institutionsPhone" />
				<view class="smsCode">

					<input class="smsCodeWord" type="text" value="" v-model="institutionsPCode" placeholder="请输入短信验证码"
					 placeholder-style=" color:#ABABB1" @input="changRegInsBtn" id="institutionsPCode" />
					<view class="smsCodeBtn">
						<view @tap="sendSmsCode" v-bind:style="{ color: activeColor}" v-if="!isInsSmsCode">
							发送验证码
						</view>
						<view style="color:#ABABB1" v-else>
							发送验证码{{seconds}}
						</view>
					</view>
				</view>
				<view class="forgetPass" @tap="clickGree(2)">

					<image src="../../static/images/login/noagree.png" style="width: 24upx; height: 24upx;" v-if="!isIAgreed"></image>
					<image src="../../static/images/login/agree.png" style="width: 24upx; height: 24upx;" v-else></image>
					我已认真阅读并同意<text @tap.stop="agreementBtn">《用户注册协议》</text>

				</view>
			</view>
			<view class="loginConfirm2" @tap="registerBtn" v-bind:style="{background:regInsBg}">
				<text>立即注册</text>
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
		registerAPI
	} from "../../api/login.js";
	let timer = null;
	export default {
		data() {
			return {

				loginWay: 0,
				activeColor: '#ABABB1',
				promptObj: {

				},
				isPAgreed: false,
				isIAgreed: false,
				seconds: 60,
				personalName: '',
				personalPass: '',
				personalPhone: '',
				personalPCode: '',

				institutionsCode: '',
				institutionsUser: '',
				institutionsPass: '',
				institutionsPhone: '',
				institutionsPCode: '',

				isSendSmsCode: false,

				isSmsCode: false,
				isInsSmsCode: false,
				type: 1,

				regBtnBg: '#CCCCCC',
				regInsBg: '#CCCCCC',


				curPersonalName: '',
				curPersonalPass: '',
				curPersonalPCode: '',
				curPersonalPhone: '',

				curInsCode: '',
				curInsUser: '',
				curInsPass: '',
				curInsPhone: '',
				curInsPCode: '',

			};
		},
		methods: {
			/* 个人-改变注册按钮颜色 */
			changRegBtn(e) {
				console.log(e)
				if (e.detail.value == '') {
					this.regBtnBg = '#CCCCCC';
					return
				}
				if (e.currentTarget.id == 'personalName') {
					this.curPersonalName = e.detail.value;

				}
				if (e.currentTarget.id == 'personalPass') {
					this.curPersonalPass = e.detail.value;
				}
				if (e.currentTarget.id == 'personalPCode') {
					this.curPersonalPCode = e.detail.value;
				}
				if (this.curPersonalName == '' || this.curPersonalPass == '' || this.curPersonalPCode == '' || !this.isPAgreed ||
					this.curPersonalPhone == '') {
					this.regBtnBg = '#CCCCCC';
					return
				}

				this.regBtnBg = '#3D5696';
			},
			/* 机构-改变注册按钮颜色 */
			changRegInsBtn(e) {
				if (e.detail.value == '') {
					this.regInsBg = '#CCCCCC';
					return
				}
				if (e.currentTarget.id == 'institutionsCode') {
					this.curInsCode = e.detail.value;

				}
				if (e.currentTarget.id == 'institutionsUser') {
					this.curInsUser = e.detail.value;
				}
				if (e.currentTarget.id == 'institutionsPass') {
					this.curInsPass = e.detail.value;
				}
				if (e.currentTarget.id == 'institutionsPass') {
					this.curInsPCode = e.detail.value;
				}
				if (this.curInsCode == '' || this.curInsUser == '' || this.curInsPass == '' || !this.isIAgreed || this.curInsPCode ==
					'' || this.curInsPhone == '') {
					console.log('灰色的按钮')
					this.regInsBg = '#CCCCCC';
					return
				}

				this.regInsBg = '#3D5696';
			},
			back() {
				console.log(getCurrentPages(),'返回')
				uni.navigateBack({
					delta: 1
				})
			},
			/* 改变抬头 */
			changeTap(val) {
				let self = this;
				self.type = val;
				clearInterval(timer);
				self.loginWay == 0 ? self.loginWay = 1 : self.loginWay = 0;
				self.activeColor = '#ABABB1';
				self.isPAgreed = false;
				self.isIAgreed = false;
				self.seconds = 60;
				self.personalName = '';
				self.personalPass = '';
				self.personalPhone = '';
				self.personalPCode = '';

				self.institutionsCode = '';
				self.institutionsUser = '';
				self.institutionsPass = '';
				self.institutionsPhone = '';
				self.institutionsPCode = '';

				self.isSendSmsCode = false;

				self.isSmsCode = false;
				self.isInsSmsCode = false;
			},
			/* 改变颜色 */
			changeColor(e) {
				

				let inputVal = e.detail.value;
console.log(2222,e.detail.value)
				if (inputVal.length == 11) {
					this.activeColor = '#3d5696';
				} else {
					this.activeColor = '#ABABB1';
				}
				if (e.currentTarget.id == "personalPhone") { //个人
					this.curPersonalPhone = e.detail.value;
					console.log("个人")
					if (e.detail.value == '') {
						this.regBtnBg = '#CCCCCC';
						return
					}
					if (this.curPersonalName == '' || this.curPersonalPass == '' || this.curPersonalPCode == '' || !this.isPAgreed) {
						this.regBtnBg = '#CCCCCC';
						return
					}

					this.regBtnBg = '#3d5696';
				} else { //机构
					console.log("机构")
					this.curInsPhone = e.detail.value;
					if (e.detail.value == '') {
						this.regInsBg = '#CCCCCC';
						return
					}
					if (this.curInsCode == '' || this.curInsUser == '' || this.curInsPass == '' || !this.isIAgreed) {
						this.regInsBg = '#CCCCCC';
						return
					}
					this.regInsBg = '#3D5696';
				}
			},
			/* 发送短信验证码 */
			sendSmsCode() {
				let self = this;
				self.loginWay == 0 ? self.isSmsCode = true : self.isInsSmsCode = true;

				self.seconds = 60;
				let phoneNum = self.loginWay == 0 ? self.personalPhone : self.institutionsPhone;

				if (phoneNum.length == 11 && !self.isSendSmsCode) { //11位电话号
					self.isSendSmsCode = true;
					timer = setInterval(function() {
						console.log(self.seconds)
						if (self.seconds > 0) {
							self.seconds--

						} else {
							console.log("结束", self.loginWay)
							self.loginWay == 0 ? self.isSmsCode = false : self.isInsSmsCode = false;
							/* self.isInsSmsCode=false; */
							clearInterval(timer)

						}
					}, 1000)

					sendcodeAPI({
						phone: phoneNum
					}).then(res => {
						if (res.data.status == 0) {
							self.loginWay == 0 ? self.personalPCode = res.data.rdata : self.institutionsPCode = res.data.rdata;
						} else {
							self.promptObj = {
								isShow: true,
								title: res.data.info,
							}
						}
						self.isSendSmsCode = false;

					})
				} else {

					self.loginWay == 0 ? self.isSmsCode = false : self.isInsSmsCode = false;
				}
			},
			/* 注册 */
			registerBtn() {

				let usernamereg = /^[A-Za-z0-9]{4,16}$/;
				let passwordreg = /^[A-Za-z0-9]{6,16}$/;
				let phonereg = /^1[1-9][0-9]{9}$/;
				if (!this.loginWay) { //个人
					console.log('个人', this.personalName)
					if (!usernamereg.test(this.personalName)) { //个人用户名
						this.promptObj = {
							isShow: true,
							title: '请输入4-16位英文、数字的用户名',
						}
						return false;
					}
					if (!passwordreg.test(this.personalPass)) { //个人用户名
						this.promptObj = {
							isShow: true,
							title: '请输入6-16位英文、数字的密码格式',
						}
						return false;
					}
					if (!phonereg.test(this.personalPhone)) { //个人用户名
						this.promptObj = {
							isShow: true,
							title: '请输入正确的手机号',
						}
						return false;
					}
					if (this.personalPCode == '') { //个人验证码
						this.promptObj = {
							isShow: true,
							title: '请输入验证码',
						}
						return false;
					}
					if (!this.isPAgreed) {
						this.promptObj = {
							isShow: true,
							title: '请同意协议',
						}
						return false;
					}
					console.log("执行注册")
					let obj = {
						code: this.personalPCode,
						password: this.md5(this.personalPass),
						phone: this.personalPhone,
						type: this.type, //1普通用户 2机构用户
						username: this.personalName,
					}
					this.registerInterface(obj);

				} else { //机构
					if (this.institutionsCode == '') {
						this.promptObj = {
							isShow: true,
							title: '请输入机构码',
						}
						return false;
					}
					if (!usernamereg.test(this.institutionsUser)) { //机构用户名
						this.promptObj = {
							isShow: true,
							title: '请输入正确的用户名',
						}
						return false;
					}
					if (!passwordreg.test(this.institutionsPass)) { //机构密码
						this.promptObj = {
							isShow: true,
							title: '请输入正确的密码格式',
						}
						return false;
					}
					if (!phonereg.test(this.institutionsPhone)) { //机构电话
						this.promptObj = {
							isShow: true,
							title: '请输入正确的手机号',
						}
						return false;
					}
					if (this.institutionsPCode == '') { //机构验证码
						this.promptObj = {
							isShow: true,
							title: '请输入验证码',
						}
						return false;
					}
					if (!this.isIAgreed) {
						this.promptObj = {
							isShow: true,
							title: '请同意协议',
						}
						return false;
					}
					let objIns = {
						code: this.institutionsPCode,
						orgcode: this.institutionsCode,
						password: this.md5(this.institutionsPass),
						phone: this.institutionsPhone,
						type: this.type, //1普通用户 2机构用户
						username: this.institutionsUser,
					}
					this.registerInterface(objIns);

				}








			},
			/* 注册借口 */
			registerInterface(obj) {
				registerAPI(obj).then(res => {
					if (res.data.status == 1) {
						let userId = res.data.memberid ? res.data.memberid : res.data.uid;
						this.$store.commit('login', userId);
						let isOrg = res.data.memberid ? false : true;
						this.$store.commit('changeUserType', isOrg);

						uni.setStorageSync('userType', res.data.memberid ? 1 : 2);
						uni.setStorage({
							key: 'appToken',
							data: res.data.memberid ? res.data.memberid : res.data.uid,
							success: (res) => {
								this.promptObj = {
									isShow: true,
									title: '注册成功',
								}
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





			/* 点击协议 */
			clickGree(val) {
				this.loginWay == 0 ? this.isPAgreed = !this.isPAgreed : this.isIAgreed = !this.isIAgreed;
				if (val == 1) {
					if (this.curPersonalName == '' || this.curPersonalPass == '' || this.curPersonalPCode == '' || !this.isPAgreed ||
						this.curPersonalPhone == '') {
						this.regBtnBg = '#CCCCCC';
						return
					}

					this.regBtnBg = '#3D5696';
				} else {
					if (this.curInsCode == '' || this.curInsUser == '' || this.curInsPass == '' || !this.isIAgreed || this.curInsPCode ==
						'' || this.curInsPhone == '') {
						console.log('灰色的按钮')
						this.regInsBg = '#CCCCCC';
						return
					}

					this.regInsBg = '#3D5696';
				}




			},
			/* 用户协议 */
			agreementBtn() {
				uni.navigateTo({
					url: '/pages/my/agreement'
				})
			},
			goLogin(){
				var pages = getCurrentPages();
				console.log(2222,getCurrentPages())
				if(pages.length<2){
					uni.navigateTo({
					    url: '/pages/my/login'
					});
					return 
				}
				if(pages[pages.length-2].route=='pages/my/login'){
					uni.navigateBack({
					    delta: 1
					});
				}else{
					uni.navigateTo({
				    url: '/pages/my/login'
				});
				}
				
			},
		},
	}
</script>

<style lang="less">
	.triangle_border_up {
		width: 0;
		height: 0;
		border-width: 0 20upx 18upx;
		border-style: solid;
		border-color: transparent transparent #fff;
		margin: 0;
		position: relative;
		bottom: -2upx;
		margin-left: 40upx;
	}

	.loginCss {
		.loginTop {
			background:linear-gradient(40deg,#6080CB,#4465B7);
			height: 250upx;
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

			.userType {
				position: absolute;
				bottom: 0;
				margin: 0 130upx;
				width: 490upx;
				display: flex;
				justify-content: space-between;
				height: 70upx;

				font-family: PingFang-SC-Bold;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
				line-height: 40upx;

				.perUser {
					font-size: 30upx;
				}

				.instiUsers {
					font-size: 30upx;
				}
			}
		}

		.loginInput {
			padding: 272upx 30upx 0 30upx;

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
				height: 50upx;
				line-height: 50upx;
				padding-top: 15upx;
				display: flex;

				align-items: center;
				align-content: center;
				color: #898989;
				font-size: 26upx;

				image {
					margin-top: 4upx;
					margin-right: 10upx;
					display: block;
					float: left;
				}

				text {
					line-height: 40upx;
					font-size: 26upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: #4A9FFF;
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
					font-size: 30upx!important;
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
			/* background: #CCCCCC; */

			text {
				color: #fff;
				font-size: 34upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
			}
		}

		.loginConfirm2 {
			width: 690upx;
			height: 86upx;
			line-height: 86upx;
			text-align: center;
			margin: 132upx 30upx 0 30upx;
			/* background: #CCCCCC; */

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

	}
</style>
