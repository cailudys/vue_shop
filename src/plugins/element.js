import Vue from 'vue'
// 按需导入部件
import { Button, Form, FormItem, Input, Message } from 'element-ui'

// 注册成为全局可用的部件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message
