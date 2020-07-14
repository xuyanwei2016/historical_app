<template>
	<view>
		<view class="mark"></view>
		<view class="comment-header">
		<view class="returnImg"  @tap="returnPre">
			<image src="../../static/images/home/return2.png"></image>
		</view>
			
			<text class="title">{{title}}</text>
		</view>
		<view class="book-comment">
			<image src="../../static/images/empty/other.png" style="width:411upx; height: 326upx;" mode=""></image>
			<text>
				您查看的商品已经下架或被删除
			</text>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
			};
		},
		methods: {

			returnPre() {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		onLoad(opt) {
			let itemType = opt.type;

			switch (itemType) {
				case '0':
					this.title = '图书详情';
					break;
				case '1':
					this.title = '文章详情';
					break;
				case '2':
					this.title = '图片详情';
					break;
				case '3':
					this.title = '视频详情';
					break;
				case '4':
					this.title = '音频详情';
					break;
				case '5':
					this.title = '其他详情';
					break;
			}
		},
	}
</script>

<style lang="less" scoped>
	.line-clamp {
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	//单行省略号
	.ellipsis {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.mark {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: -4;
		background: #FFFFFF;
	}

	.comment-header {
		width: 710upx;
		position: fixed;
		top: 0;
		height: 128upx;
		background:linear-gradient(40deg,#6080CB,#4465B7);
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 22upx 30upx 0 10upx;
		.returnImg{
			width: 43upx;
			height: 38upx;
			text-align:right;
			padding-top: 30upx;
			image {
				width: 23upx;
				height: 38upx;
				z-index: 1;
			}
		}
		

		.title {
			display: inline-block;
			width: 100%;
			margin-left: -23upx;
			text-align: center;
			font-size: 36upx;
			color: #FFFFFF;
		}

		.title {
			margin-top: 30upx;
		}
	}

	.book-comment {
		width: 100%;
		height: 100%;
		display: flex;
		/* justify-content: center; */
		align-items: center;
		flex-direction: column;
		padding-top: 340upx;

		text {
			width: 100%;
			text-align: center;
			color: #999999;
			font-size: 32upx;
			padding-top: 30upx;
		}

	}
</style>
