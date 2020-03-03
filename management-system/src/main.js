import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

// 导入 element-ui 插件配置
import '@/utils/element-ui'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
