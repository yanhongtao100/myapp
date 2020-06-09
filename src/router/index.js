import Vue from 'vue'
import VueRouter from 'vue-router'
import Visual from '../views/Visual.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/visual',
    name: 'Visual',
    component: Visual
  },
  {
    path: '/queryStat',
    name: 'QueryStat',
    component: () => import(/* webpackChunkName: "about" */ '../views/QueryStat.vue')
  },
  {
    path: '/sysreset',
    name: 'SysReset',
    component: () => import(/* webpackChunkName: "about" */ '../views/SysReset.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/changpassword',
    name: 'changPassword',
    component: () => import(/* webpackChunkName: "about" */ '../views/changPassword.vue')
  },
  {
    path: '/queryEvent',
    name: 'QueryEvent',
    component: () => import(/* webpackChunkName: "about" */ '../views/QueryEvent.vue')
  },
  {
    path: '/queryLine',
    name: 'QueryLine',
    component: () => import(/* webpackChunkName: "about" */ '../views/QueryLine.vue')
  },
  {
    path: '/querySection',
    name: 'QuerySection',
    component: () => import(/* webpackChunkName: "about" */ '../views/QuerySection.vue')
  },
  {
    path: '/queryWinding',
    name: 'QueryWinding',
    component: () => import(/* webpackChunkName: "about" */ '../views/QueryWinding.vue')
  },
  {
    path: '/setEcu',
    name: 'SetEcu',
    component: () => import(/* webpackChunkName: "about" */ '../views/SetEcu.vue')
  },
  {
    path: '/setRadar',
    name: 'SetRadar',
    component: () => import(/* webpackChunkName: "about" */ '../views/SetRadar.vue')
  },
  {
    path: '/setSection',
    name: 'SetSection',
    component: () => import(/* webpackChunkName: "about" */ '../views/SetSection.vue')
  },
  {
    path: '/setWinding',
    name: 'SetWinding',
    component: () => import(/* webpackChunkName: "about" */ '../views/SetWinding.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/', 
    redirect: '/login' 
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
