<template name="unishare">
	<view>
		<view class="share" :class="{shareInit:showShare}">
			<view class="mark" @tap="showShare = false"></view>
			<view class="main">
				<view class="top">
					<view class="item" v-for="(item,index) in shareList" :key="index">
						<image :src="'../../static/images/books/'+item.icon+'.png'"></image>
						<view class="">
							<text>{{item.text}}</text>
						</view>
					</view>
				</view>
				<view class="bottom" @tap="showShare = false">
					<text>取消</text>
				</view>
			</view>			
		</view>
	</view>
</template>

<script>
	export default {
		name:'unishare',
		data() {
			return {

			};
		},
		props:{
			showShare:{
				type:Boolean,
				required:true
			}
		}
	}
</script>

<style lang="less" scoped>
.share {
	position:fixed;
	bottom:0;
	width:750upx;
	height:0;
	.mark{
		width:750upx;
		height:100%;
		z-index:4;
		background:rgba(0,0,0,0.2);		
	}
	.main{
		width:100%;
		position:fixed;
		transition:all .3s linear;
		bottom:-1;
		height:0;
		.top{
			padding:60upx 30upx;
			background:#F0EFEF;
			height:166upx;
			display:flex;
			justify-content: space-between;
			align-items: center;
			.item{
				image{
					width:120upx;
					height:120upx;
				}
			}
		}
		.bottom{
			height:100upx;
			background:#fff;
			text-align: center;
			line-height:100upx;
			color:#36373B;
			font-size:32upx;
		}
	}
}
.shareInit{
	height:100%;
	.main{
		height:384upx;
		bottom:0;
	}
}
</style>
