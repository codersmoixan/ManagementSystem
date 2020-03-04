import Vue from 'vue'
import Router from 'vue-router'

import {Message} from 'element-ui'
Vue.prototype.$message = Message

// 员工管理
import { UserList } from './user'
// 权限管理
import { Power, RoleList } from './power'

// 登录界面
const Login = () => import('@/views/login/Login.vue')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/user', redirect: '/user/list' },
    { path: '/user/list', component: UserList },
    { path: '/power', redirect: '/power/role' },
    { path: '/power/role', component: RoleList },
    { path: '/power/manage', component: Power }
  ]
})


/**
 * 登录拦截
 */
router.beforeEach((to, from, next) => {
  // 获取 token 值
  const token = window.sessionStorage.getItem('token')
  // 判断本地是否保存服务器传来的 token 值
  if(token) {
    // 确认登录，判断是否登录之后强行修改地址栏的url到登录界面，如果已经登录则提示用户已经登录
    if(to.path === '/login') {
      Vue.prototype.$message.success('您已登录！')
      return next('/user/list')
    }
  }else {
    if(to.path === '/login') {
      return next()
    }
  }
  // 2. 如果token值强制跳转到登录页
  if(!token) return next('/login')
  next()
})

export default router