<template>
	<view style="height: 100%;">
		<view class="phone-header">
		<view class="returnImg" @tap="returnPre">
			<image src="../../static/images/home/return2.png"></image>
		</view>
			
			<text class="title">{{ type=='phone' ? '更换手机号' : '修改密码'}}</text>
			<view style="width: 40upx;"></view>
		</view>
		<view class="mark"></view>

		<view v-if="!changPage" style="height: 100%; overflow: hidden;">

			<view class="loginInput">

				<input class="itemInput" type="number" value="" v-model="phoneName" :placeholder="type=='phone'?'请输入新手机号':'请输入手机号'"
				 maxlength="11" placeholder-style=" color:#ABABB1" @input="changeColor" />
				<view class="smsCode">

					<input class="smsCodeWord" type="text" value="" v-model="phoneCode" placeholder="请输入短信验证码" placeholder-style=" color:#ABABB1"
					 @input="changeBg" />
					<view class="smsCodeBtn">
						<view @tap="sendSmsCode" v-bind:style="{ color: activeColor}" v-if="!isSmsCode">
							发送验证码
						</view>
						<view style="color:#3A5697" v-else>
							发送验证码{{seconds}}
						</view>
						<!-- 倒计时 -->
					</view>


				</view>


			</view>

			<view class="loginConfirm" :style="{background:completeBg}" @tap="resetPhone" v-if="type=='phone'">
				<text>完成</text>
			</view>
			<view class="loginConfirm" :style="{background:completeBg}" @tap="phoneLoginBtn" v-if="type=='pwd'">
				<text>下一步</text>
			</view>

		</view>

		<view v-if="changPage">

			<view class="loginInput">
				<input class="itemInput" type="text" value="" v-model="resetPass" placeholder="请设置新密码（6-16位英文、数字）" password
				 placeholder-style=" color:#ABABB1" @input="resetNewp" />
				<input class="itemInput" type="text" value="" v-model="secondPass" placeholder="再次输入新密码" password placeholder-style=" color:#ABABB1"
				 @input="proNewp" />
			</view>
			<view class="loginConfirm" v-bind:style="{background:twoPassBg}" @tap="completeBtn">
				<text>完成</text>
			</view>

		</view>




		<promptBox :promptObj="promptObj"></promptBox>

	</view>
</template>

<script>
	import {
		sendcodeAPI,
		changePwdAPI,
		updatePhoneBySecureAPI
	} from "../../api/my.js";
	import {
		getinfoAPI
	} from '../../api/info.js'
	export default {
		data() {
			return {
				type: '',
				changPage: false,
				phoneName: '',
				phoneCode: '',
				isSmsCode: false,
				activeColor: '#ABABB1',
				seconds: 60,
				promptObj: {},
				resetPass: '',
				secondPass: '',
				infoPhone: '',
				completeBg: '#CCCCCC',
				twoPassBg: '#CCCCCC',

				curresetPass: '',
				cursecondPass: '',
			};
		},
		methods: {
			returnPre() {
				var pages = getCurrentPages();
				if(pages.length==1){
					history.back();
				}
				/* console.log(getCurrentPages(),this.$store.state.userId)
				if(!this.$store.state.userId&&this.type=="pwd"){
					uni.switchTab({
						url:"my"
					})
				}else{ */
					uni.navigateBack({
						delta: 1
					});
				/* } */
				
			},
			/* 改变颜色 */
			changeColor(e) {

				let inputVal = e.detail.value;
				this.phoneName = e.detail.value;

				if (inputVal.length == 11) {
					this.activeColor = '#3A5697';
				} else {
					this.activeColor = '#ABABB1';
				}
				if (e.detail.value == '') {
					this.completeBg = '#CCCCCC';
					return
				}
				if (this.phoneCode != '') {
					this.completeBg = '#3A5697';
				} else {
					this.completeBg = '#CCCCCC';
				}
			},
			/* 改变按钮背景色 */
			changeBg(e) {
				let inputCode = e.detail.value;
				this.phoneCode = e.detail.value;
				if (e.detail.value == '') {
					this.completeBg = '#CCCCCC';
					return
				}
				if (this.phoneName != '') {
					this.completeBg = '#3A5697';
				} else {
					this.completeBg = '#CCCCCC';
				}
				console.log(this.phoneName)
			},
			/* 新密码 */
			resetNewp(e) {

				let resetPass = e.detail.value;
				this.curresetPass = e.detail.value;
				if (e.detail.value == '') {
					this.twoPassBg = '#CCCCCC';
					return
				}
				/* if (!passwordreg.test(this.resetPass)) { */
				if (this.cursecondPass != '') {
					this.twoPassBg = '#3A5697';
				} else {
					this.twoPassBg = '#CCCCCC';
				}
			},
			/* 确认密码 */
			proNewp(e) {

				let proPass = e.detail.value;
				/* let passwordreg = /^[A-Za-z0-9]{6,16}$/; */
				this.cursecondPass = e.detail.value;
				if (e.detail.value == '') {
					this.twoPassBg = '#CCCCCC';
					return
				}
				if (this.curresetPass != '') {
					this.twoPassBg = '#3A5697';
				} else {
					this.twoPassBg = '#CCCCCC';
				}
			},
			/* 发送短信验证码 */
			sendSmsCode() {
				let self = this;
				/*  this.infoPhone == this.phoneName */
				if (this.phoneName.length == 11 && this.type == 'phone') { //11位电话号
					self.isSmsCode = true;
					self.seconds = 60;
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
				} else if (this.phoneName.length == 11 && this.type == 'pwd' && this.infoPhone == this.phoneName) {
					self.isSmsCode = true;
					self.seconds = 60;
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
							this.phoneCode = res.data.rdata;
						} else {
							this.promptObj = {
								isShow: true,
								title: res.data.info,
							}
						}


					})
				} else if (this.phoneName.length == 11 && this.infoPhone != this.phoneName) {
					this.promptObj = {
						isShow: true,
						title: '请确认手机号与绑定手机号一致',
					}
				} else {
					self.isSmsCode = false;
				}
			},
			/* 下一步 */
			phoneLoginBtn() {
				this.phoneName = this.phoneName.replace(/^ $/g, '');
				this.phoneCode = this.phoneCode.replace(/ /g, '');

				if (this.phoneName.length == 11 && this.infoPhone != this.phoneName) {
					this.promptObj = {
						isShow: true,
						title: '请确认手机号与绑定手机号一致',
					}
					return false;
				}
				if (this.phoneName == ''||this.phoneName.length!=11) {
					/* this.promptObj = {
						isShow: true,
						title: '请输入手机号',
					} */
					return false;
				}
				if (this.phoneCode == '') {
					/* this.promptObj = {
						isShow: true,
						title: '请输入验证码',
					} */
					return false;
				}

				this.changPage = true;
				console.log('111111', this.resetPass, this.secondPass)
			},

			/* 更改密码 完成 */
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
				changePwdAPI({
					code: this.phoneCode,
					memberid: this.$store.state.userId,
					phone: this.phoneName,
					pwd: this.md5(this.resetPass),
					rePwd: this.md5(this.secondPass),
				}).then(res => {
					if (res.data.status == 1) {
						this.promptObj = {
							isShow: true,
							title: '修改成功',
						}
						this.$store.commit('logout');
						uni.removeStorage({
							key:'appToken',
							
						});
						
						uni.navigateTo({
							url: '/pages/my/login'
						})

					} else {
						this.promptObj = {
							isShow: true,
							title: res.data.info,
						}
					}
				})

			},
			/* 修改手机号 */
			resetPhone() {
				
				this.phoneCode = this.phoneCode.replace(/ /g, '');
				
				if (this.phoneName == ''||this.phoneName.length!=11) {
					return false;
				}
				if (this.phoneCode == '') {
					return false;
				}
				updatePhoneBySecureAPI({
					code: this.phoneCode,
					memberid: this.$store.state.userId,
					phone: this.phoneName,
				}).then(res => {
					if (res.data.status == 1) {
						this.promptObj = {
							isShow: true,
							title: '修改手机号成功',
						}
						uni.switchTab({
							url: '/pages/my/my'
						});
						/* this.promptObj = {
							isShow: true,
							title: '修改成功',
						} */
					} else {
						this.promptObj = {
							isShow: true,
							title: res.data.info,
						}
					}
				})
			},


		},
		onLoad(opt) {
			this.type = opt.type;
			getinfoAPI({
				userid: this.$store.state.userId
			}).then(res => {
				this.infoPhone = res.data.uniqueValue.phone;

			})
		}
	}
</script>

<style lang="less" scoped>
	.phone-header {
		width: 710upx;
		position: fixed;
		top: 0;
		height: 150upx;
		background:linear-gradient(40deg,#6080CB,#4465B7);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 22upx 30upx 0 10upx;
		z-index: 9;
		.returnImg{
			width: 43upx;
			height: 38upx;
			text-align: right;
			display: block;
			padding-top: 30upx;
		}
		image {
			width: 23upx;
			height: 38upx;
			z-index: 1;
		}

		
		.title {
			margin-top: 30upx;
		}

		.title {
			display: inline-block;
			/* width: 100%; */
			/* margin-left: -23upx; */
			text-align: center;
			font-size: 36upx;
			color: #FFFFFF;
		}
	}

	.mark {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: -4;
		background: #f5f5f4;
		overflow: hidden;
	}




	.loginInput {
		padding: 172upx 30upx 0 30upx;
		background: #fff;
		border-bottom: 1upx solid #E0E1E8;

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
			padding-bottom: 26upx;


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
</style>
