<template>
	<view>
		<view class="msg-header">
			<view style="width:40upx;height:38upx;margin-top:50upx;" @tap="returnPre">
				<image src="../../static/images/home/return2.png" ></image>
			</view>	
			<text class="title">我的消息</text>
		</view>
		<view class="main">
			<view class="title">
				<text>{{details.title}}</text>
			</view>
			<view class="con">
				<text v-html="details.content"></text>
				<!-- {{details.content}} -->
				<!-- {{details.content}} -->
				<!-- <rich-text :nodes="details.content" v-if="details.content"></rich-text> -->
				<!-- <rich-text :nodes="details.content"></rich-text> -->
			</view>
		</view>
	</view>
</template>

<script>
	import { getMyMessageDetailAPI } from '../../api/info.js'
	export default {
		data() {
			return {
				details:{}
			};
		},
		methods:{
			getMsgDetails(id){
				getMyMessageDetailAPI({
					// memberid:this.userId,
					messageid:id
				}).then( res => {
					// console.log(res);
					this.details = res.data;
					if(/<img/g.test(this.details.content)){
						
					}else{
						this.details.content = this.details.content
						.replace(/<img/g,"<img style='width:100%'")
						.replace(/src="/g,'src="'+this.imgURL());
						console.log('详情',this.details.content
						.replace(/<img/g,"<img style='width:100%'"));
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
		onLoad(opt){
			this.getMsgDetails(opt.id)
		},
		computed:{
			userId(){
				return this.$store.getters.userId
			}
		}
	}
</script>

<style lang="less" scoped>
.msg-header {
	width:690upx;
	position:fixed;
	top:0;
	height:150upx;
	background:linear-gradient(40deg,#6080CB,#4465B7);
	display:flex;
	justify-content: flex-start;
	align-items: center;
	padding:0 30upx;
	z-index:9;
	image{
		width:23upx;
		height:38upx;
		z-index:1;
	}
	.title {
		display:inline-block;
		width:100%;
		margin-left:-23upx;
		text-align: center;
		font-size:36upx;
		color:#FFFFFF;
	}
	.title{
		margin-top:50upx;
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
	.title{
		padding:40upx 0;
		color:#3D3D3D;
		font-size:42upx;
		font-weight: bold;
		width:100%;
		text-align: center;
	}
	.con{
		color:#666666;
		font-size:30upx;
		line-height:48upx;
		word-wrap:break-word;
		width: 690upx;
		
	}
}
</style>
