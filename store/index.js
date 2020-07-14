import Vue from 'vue'
import Vuex from 'vuex'
import {
	selectAllBookShelfListAPI,
	getMessageAPI
} from '../api/info.js'
import {
	updateBalanceAPI
} from '../api/info.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		appToken: '',
		//是否已读我的信息
		isReadMsg: false,
		userId: uni.getStorageSync('appToken')||'',
		isLogin: uni.getStorageSync('appToken') ? true : false,
		shelfList: {
			like: {},
			rows: [],
			total: 0
		},
		isOrg: uni.getStorageSync('userType') == 2 ? true : false,
		isLock: false,
		isCart: false,
		isPayId: '',
		isPayStatus: false,
		balanceMoney: 0,
		bookTop:0,

	},
	mutations: {
		/* 图书距离 */
		bookTopF(state,n){
			state.bookTop=n;
		},
		//从订单回退到购物车页面
		changeIsCart(state, bool) {
			state.isCart = bool;
		},
		// 修改我的消息是否已读
		changeMsg(state, bool) {
			state.isReadMsg = bool;
		},
		//登录
		login(state, userId) {
			state.isLogin = true;
			state.userId = userId;
		},
		//退出
		logout(state) {
			state.isLogin = false;
			state.userId = null;
		},
		//设置我的书架列表
		setShelfList(state, list) {
			state.shelfList.like = list.like;
			state.shelfList.total = list.total;
			state.shelfList.rows = list.rows;
		},
		// 拼接我的书架列表
		concatShelfList(state, list) {
			state.shelfList.like = list.like;
			state.shelfList.total = list.total;
			state.shelfList.rows = state.shelfList.rows.concat(list.rows);
		},
		// 修改用户类型
		changeUserType(state, bool) {
			state.isOrg = bool;
		},
		//修改页面滑动
		changePageScroll(state, bool) {
			state.isLock = bool;
		},
		//修改购买状态
		changeBuyStatus(state, n) {
			state.isPayId = n.id;
			state.isPayStatus = n.isPayStatus;

		},
		/* 充值 */
		balanceFn(state, n) {
			state.balanceMoney = n
		},
	},
	getters: {
		isCart(state) {
			return state.isCart;
		},
		getToken(state) {
			return uni.getStorageSync('appToken');
		},
		getUserType(state) {
			return uni.getStorageSync('userType');
		},
		getIsReadMsg(state) {
			return state.isReadMsg;
		},
		isLogin(state) {
			return state.isLogin;
		},
		userId(state) {
			return state.userId;
		},
		isOrg(state) {
			return state.isOrg;
		},
		getShelfList(state) {
			return state.shelfList
		},
		getIsLock(state) {
			return state.isLock
		},
	},
	actions: {
		getShelfList({
			commit,
			state
		}, page = 1) {
			selectAllBookShelfListAPI({
				memberid: state.userId,
				page: page,
				rows: 5
			}).then(res => {
				if (page == 1) {
					commit('setShelfList', res.data.page)
				} else {
					commit('concatShelfList', res.data.page)
				}
			})
		},

	},
	computed: {
		volumeValue() {
			return this.$store.getters.getVolumeVal
		}
	}
})

export default store
