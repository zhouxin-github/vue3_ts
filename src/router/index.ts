import { nextTick } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: 'goods',
    children: [
      {
        path: 'goods',
        name: 'goods',
        meta: {
          isShow: true,
          title: '商品列表'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/Goods.vue')
      },
      {
        path: 'user',
        name: 'user',
        meta: {
          isShow: true,
          title: '用户列表'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')
      },
      {
        path: 'role',
        name: 'role',
        meta: {
          isShow: true,
          title: '角色列表'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/Role.vue')
      },
      {
        path: 'authority',
        name: 'authority',
        meta: {
          isShow: false,
          title: '权限列表'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/Authority.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{
  const token:string | null = localStorage.getItem('token');
  if(!token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router
