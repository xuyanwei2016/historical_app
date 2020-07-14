<template>
	<view class="promotBox" v-if="promptObj.isShow">
		<view class="promotCont">
			<view class="promotTitle">{{promptObj.title}}</view>
		</view>
	</view>

</template>
<script>
	export default {
		name: "promptBox",
		props: {
			promptObj: {
				type: Object,

			}
		},
		data() {
			return {

			}
		},
		methods: {

		},
		watch: {
    promptObj(newName, oldName) {
      let self=this;
	  let timer = setTimeout(function() {
	  	self.promptObj.isShow = false
	  }, 2000);
	  deep:true
    }
  }
		/* onLoad: function() {
			console.log("tanchuk")
			if (this.promptObj.isShow) {
				let timer = setTimeout(function() {
					this.promptObj.isShow = false
				}, 2000)
			}

		} */
	}
</script>
<style lang="less">
	.promotBox {
		width: 100%;
		height: 100%;
		/* background: rgba(0, 0, 0, 0.3); */
		position: fixed;
		z-index: 2222;
		top: 0;
		left: 0;

		.promotCont {

			height: auto;
			display: flex;
			justify-content: center;
			padding: 10px 20px;
			margin-top: 478upx;

			.promotTitle {
				display: inline-block;
				vertical-align: middle;
				color: #fff;
				background-color: rgba(17, 17, 17, .7);
				padding: 10px 20px;
				border-radius: 5px;
				font-size: 13px;
				text-align: center;

				word-break: break-all;
				white-space: normal;
			}

		}
	}
</style>
