// 导入vue（单文件组件）包;import后面的名字是自定义的！
import Vue from 'vue'
// 导入App根组件()
import App from './App.vue'
// 导入路由组件
import router from '../src/router/index.js'
// 导入element-ui组件
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入输入框图标
import './assets/fonts/iconfont.css'
// 导入axios包
import axios from 'axios'
// 设置请求的根路径,路径地址是接口文档中给出的
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 把包挂载到Vue的原型对象上，这样的话每一个Vue组件都可以使用this直接访问到$http从而发起ajax请求。
Vue.prototype.$http = axios

// 下面这行代码的意思 是阻止显示生产模式的消息。如果没有这行代码，或者设置为true，控制台就会多出一段代码。
Vue.config.productionTip = false

new Vue({
  // 把路由挂载到vue实例上
  router,
  // 通过rander函数把App根组件渲染到页面上
  render: h => h(App)
  // 如果没有配置el属性，可以使用$mount("#app")手动挂载,让模板渲染到id=‘app’的元素上。
}).$mount('#app')
