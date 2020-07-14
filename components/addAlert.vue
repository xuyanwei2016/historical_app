<template>
	<view>
		<view class="add" v-if="addOptions.show" @tap="hide">
			<view class="main" @tap.stop="">
				<view class="main-top">
					<view class="title">
						<text>新建分类</text>
					</view>
					<textarea @input="count" v-model="title"  maxlength="20"  placeholder="请输入分类名称" placeholder-style="color:#ABABB1;fontSize:30upx;"/>
					<text class="count">{{length}}/20</text>
				</view>
				<view class="main-bottom">
					<view class="left" @tap="cancel">
						<text>取消</text>
					</view>
					<view class="right" @tap="submit">
						<text>提交</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { saveBookShelfNameAPI } from '../api/info.js'
	export default {
		name:'addAlert',
		data() {
			return {
				length:0,
				title:''
			};
		},
		props:{
			addOptions:{
				type:Object
			}
		},
		methods:{
			count(e){
				let value = e.detail.value.replace(/^\s* | \s*$/g,'');
				if(value && value.length>0){
					this.length = value.length
				}else {
					this.length = 0;
				}
			},
			submit(){
				if(this.length==0){
					uni.showToast({
						title:'内容不能为空！',
						icon:'none'
					})
					return;
				}
				saveBookShelfNameAPI({
					memberid:this.userId,
					title:this.title
				}).then( res => {
					if(res.data.status==1){
						this.addOptions.cancel();
						// this.$store.dispatch('getShelfList');
						this.title='';
						this.length=0;
						this.$emit('addShelf',res.data.uniqueValue.id)
						this.addOptions.hideShelf()
					}
				})
			},
			cancel(){
				this.addOptions.cancel();
				this.title='';
				this.length=0;
			},
			hide(){
				this.addOptions.hide()
			}
		},
		computed:{
			userId(){
				return this.$store.getters.userId;
			}
		}
	}
</script>

<style lang="less" scoped>
.add{
	position:fixed;
	// width:100%;
	height:100%;
	top:0;
	z-index:999;
	background:rgba(0,0,0,0.2);
	display:flex;
	justify-content: center;
	align-items: center;
	padding:0 30upx;
	.main{
		background:#fff;
		border-radius:30upx;
		box-shadow:0px 4px 20px 0px rgba(165,166,168,0.42);
		height:426upx;
		.main-top{
			padding:40upx 40upx 60upx;
			border-bottom:1upx solid #E0E1E8;
			position:relative;
			.title{
				color:#36373B;
				font-size:34upx;
				margin-bottom:20upx;
			}
			textarea{
				// width:100%;
				width:590upx;
				background:#F3F4F7;
				height:134upx;
				padding:20upx 0 0 20upx;
			}
			.count{
				position:absolute;
				bottom:60upx;
				right:50upx;
				color:#ABABB1;
				font-size:26upx;
			}
		}
		.main-bottom{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left,.right{
				text-align: center;
				height:88upx;
				line-height:88upx;
				color:#4C5679;
				font-size:32upx;
				width:344upx;
			}
			.left{
				border-right:1upx solid #E0E1E8;
			}
		}
		
	}
}
</style>
