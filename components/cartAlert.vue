<template>
	<view>
		<view class="cartAlert" v-if="alertOptions.show" @tap="hide">
			<view class="main" @tap.stop="">
				<view class="store" @tap="store">
					<text>移入收藏</text>
				</view>
				<view class="del" @tap="del">
					<text>删除</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'cartAlert',
		data() {
			return {
				
			};
		},
		methods:{
			store(){
				if(typeof(this.alertOptions.store) == 'function'){
					this.alertOptions.store()
				}
			},
			del(){
				if(typeof(this.alertOptions.del) == 'function'){
					this.alertOptions.del()
				}
			},
			hide(){
				this.alertOptions.hide()
			}
		},
		props:{
			alertOptions:{
				type:Object
			}
		}
	}
</script>

<style lang="less" scoped>
.cartAlert{
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
		width:480upx;
		height:180upx;
		background:#fff;
		box-shadow:0px 4px 20px 0px rgba(165,166,168,0.42);
		.store,.del{
			height:90upx;
			line-height:90upx;
			padding-left:60upx;
			color:#3D3D3D;
			font-size:32upx;
		}
		.del{
			color:#D61F1F;
			border-top:1upx solid #C9CACA;
		}
	}
}
</style>
