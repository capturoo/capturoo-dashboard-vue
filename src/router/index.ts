import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/buckets',
    name: 'buckets-overview',
    component: () => import(/* webpackChunkName: "buckets" */ '../views/buckets/Buckets.vue')
  },
  {
    path: '/buckets/create',
    name: 'create-bucket',
    component: () => import(/* webpackChunkName: "create-bucket" */ '../views/buckets/CreateBucket.vue')
  },
  {
    path: '/buckets/:bucketId',
    name: 'view-bucket',
    component: () => import(/* webpackChunkName: "view-bucket" */ '../views/buckets/BucketDetails.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
