<template>
	<view>
		<view class="mark"></view>
		<view class="comment-header">
			<view class="returnImg" @tap="returnPre">
				<image src="../../static/images/home/return2.png"></image>
			</view>
			
			<text class="title">用户协议</text>
		</view>
		<view class="contCss"  v-bind:style="{height:sreenHei+'px'}">
			<!-- <scroll-view scroll-y="true" class="scroll-Y">
				<view id="demo1" class="scroll-view-item uni-bg-red">A</view>
				<view id="demo2" class="scroll-view-item uni-bg-green">B</view>
				<view id="demo3" class="scroll-view-item uni-bg-blue">C</view>
			</scroll-view> -->
			
				<scroll-view scroll-y class="list">
				<view class="book-comment">
					<view style="margin-top:128upx;">
						<text>欢迎您使用新闻出版业学术文化知识库平台！</text>
					</view>
					<view>
						<text>为了更好地使用本平台的服务，请您阅读并遵守《新闻出版业学术文化知识库用户注册协议》（以下简称“本协议”）。您使用本平台的服务即视为您已阅读并同意本协议的约束。</text>
					</view>
					<view>
						<text>1.您在使用本平台的服务时需要注册一个帐号。我们特别提醒您应妥善保管您的帐号和密码。当您使用完毕后，应安全退出。因您保管不善可能导致遭受盗号或密码失窃，责任由您自行承担。</text>
					</view>
					<view>
						<text>2.您在注册帐号或使用本服务的过程中，可能需要填写一些必要的信息。若国家法律法规有特殊规定的，您需要填写真实的身份信息。若您填写的信息不完整，则无法使用本服务或在使用过程中受到限制。一般情况下，您可随时浏览、修改自己提交的信息，但出于安全性和身份识别（如号码申诉服务）的考虑，您可能无法修改注册时提供的初始注册信息及其他验证信息。</text>
					</view>
					
					<view>
						<text>3.我们不会将您的个人信息转移或披露给任何非关联的第三方，除非：（1）相关法律法规或法院、政府机关要求；（2）为完成合并、分立、收购或资产转让而转移；（3）为提供您要求的服务所必需。</text>
					</view>
					
					
					<view>
						<text>4.您同意本服务仅为您个人使用。您依本协议条款所取得的权利不可转让。</text>
					</view>
					
					
					<view>
						<text>5.您不得使用未经我们授权的插件、外挂或第三方工具对本协议项下的服务进行干扰、破坏、修改或施加其他影响。</text>
					</view>
					
					
					<view>
						<text>6.您理解并同意，我们的服务是按照现有技术和条件所能达到的现状提供的。我们会尽最大努力向您提供服务，确保服务的连贯性和安全性；但我们不能随时预见和防范法律、技术以及其他风险，包括但不限于不可抗力、病毒、木马、黑客攻击、系统不稳定、第三方服务瑕疵、政府行为等原因可能导致的服务中断、数据丢失以及其他的损失和风险。出现上述情况时，我们将努力在第一时间与相关单位配合，及时进行修复，但是由此给您造成的损失我们在法律允许的范围内免责。</text>
					</view>
					
					
					<view>
						<text>7.您应当理解，您使用我们的服务需自行准备与相关服务有关的终端设备（如电脑、调制解调器等装置），并承担所需的费用（如电话费、上网费等费用）。您理解并同意，您使用本服务时会耗用您的终端设备和带宽等资源。</text>
					</view>
					
					
					<view>
						<text>8.您同意我们可以在提供服务的过程中自行或由第三方广告商向您发送广告、推广或宣传信息（包括商业与非商业信息），其方式和范围可不经向您特别通知而变更。</text>
					</view>
					
					
					<view>
						<text>9.我们依照法律的规定对广告商履行相关义务，您应当自行判断广告信息的真实性并为自己的判断行为负责，除法律明确规定外，您因依该广告信息进行的交易或前述广告商提供的内容而遭受的损失或损害，我们不承担责任。</text>
					</view>
					
					
					<view>
						<text>10.	我们的部分服务是以收费方式提供的，如您使用收费服务，请遵守相关的协议。我们可能根据实际需要对收费服务的收费标准、方式进行修改和变更，也可能会对部分免费服务开始收费。</text>
					</view>
					
					<view>
						<text>11.	本站所有信息及资料（包括但不限于文字、图片、音频视频、附件等）属版权所有或已或得版权所有者授权。除新闻、消息、图书封面、图书简介等公开信息以外，不得以任何形式进行转载，允许转载的内容需标明出处。凡侵犯本社版权等知识产权的，本社必依法追究其法律责任。</text>
					</view>
					
					
					<view>
						<text>12.	您在使用本服务时须遵守法律法规，不得利用本服务从事违法违规行为，包括但不限于：（1）发布、传送、传播、储存危害国家安全统一、破坏社会稳定、违反公序良俗、侮辱、诽谤、淫秽、暴力以及任何违反国家法律法规的内容；（2）发布、传送、传播、储存侵害他人知识产权、商业秘密等合法权利的内容；（3）恶意虚构事实、隐瞒真相以误导、欺骗他人；（4）发布、传送、传播广告信息及垃圾信息；（5）其他法律法规禁止的行为。如果您违反了本条约定，相关国家机关或机构可能会对您提起诉讼、罚款或采取其他制裁措施，并要求我们给予协助。造成损害的，您应依法予以赔偿，我们不承担任何责任。</text>
					</view>
					
					
					<view>
						<text>13.	如果我们发现或收到他人举报您发布的信息违反本协议，我们有权进行独立判断并采取技术手段予以删除、屏蔽或断开链接。同时，我们有权视用户的行为性质，采取包括但不限于暂停或终止服务，限制、冻结或终止账号使用，追究法律责任等措施。</text>
					</view>
					
					
					<view>
						<text>14.	您违反本协议导致任何第三方损害的，您应当独立承担责任；我们因此遭受损失的，您也应当一并赔偿。您在使用本服务过程中应当遵守当地相关的法律法规，并尊重当地的道德和风俗习惯。如果您的行为违反了当地法律法规或道德风俗，您应当为此独立承担责任。</text>
					</view>
					
					
					<view>
						<text>15.	您通过本服务发送或传播的内容（包括但不限于网页、文字、图片、音频、视频、图表等）均由您自行承担责任。如果收到权利人通知，主张您发送或传播的内容侵犯其相关权利的，您同意我们有权进行独立判断并采取删除、屏蔽或断开链接等措施。</text>
					</view>
					
					<view>
						<text>16.	我们有权在必要时修改本协议条款。您可以在相关服务页面查阅最新版本的协议条款。本协议条款变更后，如果您继续使用我们提供的软件或服务，即视为您已接受修改后的协议。如果您不接受修改后的协议，应当停止使用我们提供的软件或服务。</text>
					</view>
					
					
					<view>
						<text>17.	我们可能会对服务内容进行变更，也可能会中断、中止或终止服务。您理解并同意，我们有权自主决定经营策略。在我们发生合并、分立、收购、资产转让时，我们可向第三方转让本服务下相关资产；我们也可在单方通知您后，将本协议下部分或全部服务转交由第三方运营或履行。具体受让主体以我们通知的为准。</text>
					</view>
					
					
					<view>
						<text>18.	如发生下列任何一种情形，我们有权不经通知而中断或终止向您提供的服务：（1）根据法律规定您应提交真实信息，而您提供的个人资料不真实、或与注册时信息不一致又未能提供合理证明；（2）您违反相关法律法规或本协议的约定；（3）按照法律规定或主管部门的要求；（4）出于安全的原因或其他必要的情形。</text>
					</view>
					
					<view>
						<text>19.	您有责任自行备份存储在本服务中的数据。如果您的服务被终止，我们可以从服务器上永久地删除您的数据,但法律法规另有规定的除外。服务终止后，我们没有义务向您返还数据。</text>
					</view>
					
					<view>
						<text>20.	本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律法规。本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。</text>
					</view>
					
					<view>
						<text>如果您对本协议或本服务有意见或建议，可与我们联系（dp@chinabp.com.cn），我们会给予您必要的帮助。</text>
					</view>
					
					<view style="text-align: right;">
						中国书籍出版社有限公司
					</view>
					
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				sreenHei:0,
			};
		},
		methods:{
			
			returnPre(){
				var pages = getCurrentPages();
				if(pages.length==1){
					history.back();
				}
				uni.navigateBack({
					delta:1
				})
			}
		},
		onLoad() {
			console.log(uni.getSystemInfoSync().screenHeight)
			this.sreenHei=uni.getSystemInfoSync().screenHeight
		},
	}
</script>

<style lang="less" scoped>

.line-clamp{
	text-overflow: -o-ellipsis-lastline;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
}

//单行省略号
.ellipsis{
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.mark{
	width:100%;
	height:100%;
	position:fixed;
	z-index:-4;
	background:#FFFFFF;
}
.comment-header {
	width:700upx;
	position:fixed;
	top:0;
	height:128upx;
	background:linear-gradient(40deg,#6080CB,#4465B7);
	display:flex;
	justify-content: flex-start;
	align-items: center;
	padding:22upx 30upx 0 20upx;
	z-index: 11;
	.returnImg{
		width:40upx;
		text-align: center;
		display:block;
		image{
			width:23upx;
			height:38upx;
			z-index:1;
		}
		
	}
	
	.title {
		display:inline-block;
		width:100%;
		margin-left:-23upx;
		text-align: center;
		font-size:36upx;
		color:#FFFFFF;
	}
	image,.title{
		margin-top:30upx;
	}
}
.contCss{
	/* width:750upx; */
	/* height: 100%; */
	
	background: #ccc;
	.list{
		width: 750upx;
		background: #f5f5f4;
		height: auto;
		overflow: scroll;
		.book-comment{
			padding:40upx 20upx 30upx 20px;
			/* min-height:500upx; */
			background:#FFFFFF;
			height: auto;
			/* margin-bottom:20upx; */
			
			view{
				display: block;
				height: auto;
				text-indent:60upx;
				margin-top: 20upx;
				text{
					font-size:32upx;
					line-height: 40upx;
					
				}
			}
			
			
			
			
			}
		
		
	}
}
</style>