<template>
	<view>
		<view class="alertBox" v-if="alertPayCont.show" @tap="cancel">
			<view class="main" @tap.stop="">
				<view class="top">
					<text>{{alertPayCont.title}}</text>
				</view>
				<view class="bottom">
					<view class="left" @tap="sure">
						<text>{{alertPayCont.confirmText || '确定'}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'alertBox',
		data() {
			return {
				
			};
		},
		methods:{
			sure(){
				if(typeof(this.alertPayCont.sure) == 'function'){
					this.alertPayCont.sure()
				}
			}
		},
		props:{
			alertPayCont:{
				type:Object
			}
		}
	}
</script>

<style lang="less" scoped>
.alertBox{
	width:100%;
	height:100%;
	position:fixed;
	top:0;
	z-index:999;
	background:rgba(0,0,0,0.2);
	display:flex;
	justify-content: center;
	align-items: center;
	.main{
		width:540upx;
		height:250upx;
		border-radius:30upx;
		background:#fff;
		.top{
			height:160upx;
			display:flex;
			justify-content: center;
			align-items: center;
			border-bottom:1upx solid #E0E1E8;
			color:#3D3D3D;
			font-size:30upx;
			font-weight:bold;
		}
		.bottom{
			display:flex;
			justify-content: space-between;
			align-items: center;
			
			.left{
				width:100%;
				height:46upx;
				line-height: 46upx;
				text-align: center;
				padding-top: 16upx;
				    color: #4C5679;
					font-size: 32upx;
			}
		}
	}
}
</style>
