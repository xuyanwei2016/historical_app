<template>
	<view>
		<view class="shelfAlert" v-if="shelfAlertOptions.show" @tap="hide">
			<scroll-view class="main" scroll-y="true" @tap.stop="" @scrolltolower="loadMore">
				<view class="title">
					<text>收藏到书架</text>
				</view>
				<view class="list-main">
					<view class="add item" @tap="add">
						<image src="../../static/images/my/add.png"></image>
						<text>增加分类</text>
					</view>
					<view class="love item" @tap="addShelf(shelfList.like.id)">
						<image src="../../static/images/my/moren.png"></image>
						<text>我喜欢的图书</text>
					</view>
					<view class="others item" v-for="(item,index) in shelfList.rows" :key="index" @tap="addShelf(item.id)">
						<view class="image">
							<image src="../../static/images/my/icon1.png"></image>
						</view>						
						<text>{{item.title}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<addAlert :addOptions="addOptions" @addShelf="addShelf"></addAlert>
	</view>
</template>

<script>
	
	export default {
		name:'shelfAlert',
		data() {
			return {
				addOptions:{},
				list:[],
				likeid:'',
				page:1,
				pageCount:0
			};
		},
		props:{
			shelfAlertOptions:{
				type:Object
			}
		},
		methods:{
			add(){
				let that = this;
				this.page=1;
				if(typeof(this.shelfAlertOptions.hide) == 'function'){
					this.shelfAlertOptions.hide();
				}
				this.addOptions = {
					show:true,
					hide(){
						this.show = false;
						that.$store.commit('changePageScroll',false);
						that.getCurPage(true)
					},
					cancel(){
						this.show = false;
						that.shelfAlertOptions.showBox();
					},
					hideShelf(){
						that.shelfAlertOptions.hide()
					}
				}
				this.$store.commit('changePageScroll',true);
				this.getCurPage(false)
			},
			addShelf(id){
				let that = this;
				this.$emit('addBookShelf',id);
			},
			loadMore(){
				this.pageCount = Math.ceil(Number(this.$store.state.shelfList.total)/5);
				if(this.page>=this.pageCount) return ;
				this.page++;
				this.$store.dispatch('getShelfList',this.page);
			},
			hide(){
				this.shelfAlertOptions.hide()
			},
			getCurPage(bool){
				const pages = getCurrentPages();  
				const len = pages.length;
				const page = pages[len - 1]; 
				// #ifdef APP-PLUS
				const currentWebview = page.$getAppWebview();
				console.log(currentWebview)
				currentWebview.setStyle({  
				pullToRefresh: {  
					support: bool,
					style: plus.os.name === 'Android' ? 'circle' : 'default' 
				}  
				});
				// #endif
			},
			
		},
		onLoad(){
			
		},
		computed:{
			shelfList(){
				return this.$store.getters.getShelfList;
			}
		}
	}
</script>

<style lang="less" scoped>
//单行省略号
.ellipsis{
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.shelfAlert{
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
	.mark{
		width:750upx;
		height:100%;
		// z-index:9999;
		background:rgba(0,0,0,0.2);		
	}
	.main{
		width:630upx;
		padding:40upx 30upx 0;
		background:#fff;
		border-radius:30upx;
		box-shadow:0px 4px 20px 0px rgba(165,166,168,0.42);
		height:470upx;
		.title{
			color:#36373B;
			font-size:34upx;
			margin-bottom:20upx;
			font-weight:700;
		}
		.list-main{
			.item{
				display:flex;
				justify-content:flex-start;
				align-items:center;
				padding:30upx 0;
				image{
					width:62upx;
					height:62upx;
					border-radius:10upx;
					margin-right:20upx;
				}
				text{
					color:#3D3D3D;
					font-size:34upx;
					.ellipsis;
				}
			}
			.add{
				border-bottom:1upx solid #E0E1E8;
			}
			.others{
				border-top:1upx solid #E0E1E8;
				.image{
					width:62upx; 
					height:62upx;
					margin-right:20upx;
				}
			}
		}
	}
}
</style>
