import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif

var APITOKEN = 'myuniapp';
Vue.prototype.apiServer = 'http://127.0.0.1/api.php?token=' + APITOKEN + '&action=';

Vue.prototype.checkLogin = function(backpage) { //添加全局变量
	var UID = uni.getStorageSync('UID'); //用户ID
	if (UID == '') {
		console.log("没登陆")
		uni.redirectTo({
			url: '/pages/login/login?backpage=' + backpage //该页面必须存在于pages.json
		});
		return false;
	} else {
		console.log("已登陆")
		return UID;
	}
}

