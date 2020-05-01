import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router'
import animated from 'animate.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'ant-design-vue/dist/antd.css'
import './assets/css/style.css'
Vue.config.productionTip = true
Vue.use(animated)
Vue.use(mavonEditor)
Vue.use(Antd)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
