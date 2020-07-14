<template>
	<view>
		<view class="view-header">
			<view style="width:40upx;height:38upx;padding-top:50upx;" @tap="returnPre">
				<image src="../../static/images/home/return2.png" ></image>
			</view>	
			<text class="title">意见反馈</text>
			<text class="title" @tap="submit">提交</text>
		</view>
		<view class="input">
			<textarea maxlength="-1" v-model="con"  placeholder="输入你的意见或建议，我们将不断改进" placeholder-style="color:#ABABB1;fontSize:30upx;"/>
		</view>		
		<promptBox :promptObj="promptObj"></promptBox>
	</view>
</template>

<script>
	import { feedBackAPI } from '../../api/info.js'
	export default {
		data() {
			return {
				con:'',
				showShare:false,
				promptObj:{},
				flag:false
			};
		},
		methods:{
			submit(){
				console.log(this.flag)
				if(this.flag){
					return;
				}
				if(this.con.replace(/\s*/g,'').length==0){
					uni.showToast({
						title:'请填写您的意见或建议',
						icon:'none'
					})
					return ;
				}
				this.flag = true;
				feedBackAPI({
					describe:this.con,
					memberid:this.userId
				}).then( res => {
					// console.log(res)
					if(res.data.status == 1){	
						this.promptObj = {
							isShow:true,
							title:'提交成功！'
						}
						this.flag = true;
						setTimeout(()=>{
							uni.switchTab({
								url: '/pages/my/my'
							})	
						},1000)
					}else {
						this.promptObj = {
							isShow:true,
							title:'提交失败，不可输入图片等哦~'
						}
						this.flag = false;
					}
				})
			},
			returnPre(){
				var pages = getCurrentPages();
				if(pages.length==1){
					history.back();
				}
				uni.navigateBack({
					delta: 1
				});
			},
		},
		computed:{
			userId(){
				return this.$store.getters.userId
			}
		}
	}
</script>

<style lang="less" scoped>
.view-header {
	width:690upx;
	position:fixed;
	top:0;
	height:150upx;
	background:linear-gradient(40deg,#6080CB,#4465B7);
	display:flex;
	justify-content: space-between;
	align-items: center;
	padding:0 30upx;
	z-index:9;
	image{
		width:23upx;
		height:38upx;
		z-index:1;
		margin-right:50upx;
	}
	.title {
		font-size:36upx;
		color:#FFFFFF;
	}
	.title{
		margin-top:50upx;
	}
}
.input{
	width:690upx;
	height:100%;
	margin-top:128upx;
	padding:30upx 30upx;
	textarea{
		width:100%;
		min-height:500upx;
		line-height:40upx;
		font-size:30upx;
	}
}
</style>
