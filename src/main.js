// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axios from 'axios'
import Es6Promise from 'es6-promise' //兼容安卓4.4以下依赖
import VConsole from 'vconsole';
import 'reset-css' //样式初始化
import './lib/css/public.css'
import './lib/js/setRem' //设置rem
Es6Promise.polyfill() //兼容安卓4.4以下
Vue.config.productionTip = false
Vue.prototype.$http = axios
import Cube from 'cube-ui'
Vue.use(Cube)
import utils from './lib/js/utils.js'
Vue.use(utils)
// const vConsole = new VConsole(); // 用于移动端联调，不使用的时候，可以将这句屏蔽掉；

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})