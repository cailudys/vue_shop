import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'

// 使用Vue.use()注册插件。作用？把vue-router注册到vue中。
Vue.use(VueRouter)

const routes = [
  // 此路由用于重定向，当访问路径为/时，重定向到/login路径。
  { path: '/', redirect: '/login' },
  // 此路由代表访问/login路径时，会使用Login对应的组件渲染。
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

// 暴露router接口，这样main.js中的vue实例就可以访问到router路由对象
export default router
