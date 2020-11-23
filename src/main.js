import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import VueAnime from 'vue-animejs';

axios.defaults.withCredentials = true;
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.component('v-chart', ECharts)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueCookies)
Vue.use(VueAnime)
Vue.prototype.$axios = axios
Vue.prototype.serverURL = 'http://127.0.0.1:5000/'


new Vue({
  render: h => h(App),
  router: router.router
}).$mount('#app')
