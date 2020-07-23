// 导入vue（单文件组件）包;import后面的名字是自定义的！
import Vue from 'vue'
// 导入APP根组件
import App from './App.vue'
// 导入路由组件
import router from './router'
// 导入element-ui组件
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  // 把路由挂载到vue实例上
  router,
  // 通过rander函数把App根组件渲染到页面上
  render: h => h(App)
}).$mount('#app')
