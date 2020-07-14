<template>
	<view class="loginCss">
		<view class="loginTop">
			<view class="loginBtn">
				<view class="loginBack" @tap="back">
					<image src="../../static/images/home/return2.png" style="width:22upx; height:38upx;"></image>
				</view>
				<view class="loginText">
					忘记密码
				</view>
				<view class="loginRegister">
					<navigator url="register" hover-class="none"  v-if="changPage!=1">注册</navigator>

				</view>
			</view>
		</view>

		<view v-if="!changPage" class="backBG">

			<view class="loginInput">

				<input class="itemInput" type="number" value="" v-model="phoneName" placeholder="请输入手机号" maxlength="11"
				 placeholder-style=" color:#ABABB1" @input="changeColor" />
				<view class="smsCode">

					<input class="smsCodeWord" type="text" value="" v-model="phoneCode" placeholder="请输入短信验证码" placeholder-style=" color:#ABABB1" @input="changNext"/>
					<view class="smsCodeBtn">
						<view @tap="sendSmsCode" v-bind:style="{ color: activeColor}" v-if="!isSmsCode">
							发送验证码
						</view>
						<view style="color:#ABABB1" v-else>
							发送验证码{{seconds}}
						</view>
						<!-- 倒计时 -->
					</view>


				</view>

				<view class="forgetPass">
					<text></text>
				</view>
			</view>
			<view class="loginConfirm" @tap="phoneLoginBtn" v-bind:style="{background:nextBg}">
				<text>下一步</text>
			</view>

		</view>

		<view v-if="changPage">

			<view class="loginInput">

				<input class="itemInput"  type="text" value="" v-model="resetPass" placeholder="请设置新密码（6-16位英文、数字）" password
				 placeholder-style=" color:#ABABB1" @input="changFinish" id="resetPass"/>
				<input class="itemInput"  type="text" value="" v-model="secondPass" placeholder="再次输入新密码" password
				 placeholder-style=" color:#ABABB1" @input="changFinish" id="secondPass"/>

				<view class="forgetPass">
					<text></text>
				</view>
			</view>
			<view class="loginConfirm" @tap="completeBtn" v-bind:style="{background:finishBg}">
				<text>完成</text>
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
		updatePwdAPI,
		checkPhoneAndCodeAPI
	} from "../../api/login.js";
	export default {
		data() {
			return {
				phoneName: '',
				phoneCode: '',
				activeColor: '#ABABB1',
				promptObj: {

				},
				seconds: 60,
				isSmsCode: false,
				changPage: 0,
				resetPass: '',
				secondPass: '',
				
				nextBg:'#CCCCCC',
				finishBg:'#CCCCCC',
				
				curphoneName:'',
				curphoneCode:'',
				
				curresetPass:'',
				cursecondPass:'',
				timer:null,
				
			};
		},
		methods: {
			/* 改变完成的背景 */
			changFinish(e){
				if(e.currentTarget.id=="resetPass"){
					this.curresetPass=e.detail.value;
				}
				if(e.currentTarget.id=="secondPass"){
					this.cursecondPass=e.detail.value;
				}
				if(this.curresetPass==""||this.cursecondPass==""){
					console.log("nihao")
					this.finishBg="#CCCCCC";
					return
				}
				this.finishBg="#3D5696";
			},
			/* 改变下一步的背景 */
			changNext(e){
				this.curphoneName=e.detail.value;
				if(e.detail.value==''){
					this.nextBg="#CCCCCC";
					return
				}
				if(this.curphoneCode==''){
					this.nextBg="#CCCCCC";
					return
				}
				this.nextBg="#3D5696";
			},
			
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			/* 改变颜色 */
			changeColor(e) {
				if(e.detail.value==''){
					this.nextBg="#CCCCCC";
					return
				}

				let inputVal = e.detail.value;
				this.curphoneCode=e.detail.value;
				if (inputVal.length == 11) {
					this.activeColor = '#3D5696';
				} else {
					this.activeColor = '#ABABB1';
				}
				if(this.curphoneName==''){
					this.nextBg="#CCCCCC";
					return
				}
				this.nextBg="#3D5696";
			},
			/* 发送短信验证码 */
			sendSmsCode() {
				let self = this;
				self.isSmsCode = true;
				self.seconds = 60;
				if (this.phoneName.length == 11) { //11位电话号
					self.timer = setInterval(function() {
						console.log(self.seconds)
						if (self.seconds > 0) {
							self.seconds--

						} else {
							self.isSmsCode = false;
							clearInterval(self.timer)
						}
					}, 1000)
					sendcodeAPI({
						phone: self.phoneName
					}).then(res => {
						if (res.data.status==0) {
							this.phoneCode=res.data.rdata;
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


			/* 下一步 */
			phoneLoginBtn() {
				this.phoneName = this.phoneName.replace(/ /g, '');
				this.phoneCode = this.phoneCode.replace(/ /g, '')
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
				
				checkPhoneAndCodeAPI({
					code:this.phoneCode,
					phone:this.phoneName,
				}).then(res => {
					if(res.data.status==1){
						this.changPage = 1;
					}else{
						this.promptObj = {
							isShow: true,
							title: res.data.info,
						}
					}
					console.log('验证手机号验证码', res.data)
					
				})
			},
			/* 完成 */
			completeBtn() {
				let passwordreg = /^[A-Za-z0-9]{6,16}$/;
				if (!passwordreg.test(this.resetPass)) {
					this.promptObj = {
						isShow: true,
						title: '请输入正确的密码',
					}
					return false;
				}
				if (this.secondPass != this.resetPass) {
					this.promptObj = {
						isShow: true,
						title: '密码不一致',
					}
					return false;
				}
				updatePwdAPI({
					code: this.phoneCode,
					phone: this.phoneName,
					pwd: this.md5(this.resetPass),
					rePwd: this.md5(this.secondPass),
				}).then(res => {
					if (res.data.status == 1) {
						this.promptObj = {
							isShow: true,
							title: '重置密码成功',
						}
						uni.navigateBack({
							delta:1
						})
					} else {
						this.promptObj = {
							isShow: true,
							title: res.data.info,
						}
					}
					console.log('忘记密码', res.data)
				})

			},

		},
		onHide(){
			clearInterval(self.timer);
		},
	}
</script>

<style lang="less">
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
			background: #fff;

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
				text-align: right;

				text {
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
