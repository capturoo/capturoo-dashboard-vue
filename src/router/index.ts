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
    component: () => import(/* webpackChunkName: "bucket" */ '../views/buckets/Buckets.vue')
  },
  {
    path: '/buckets/create',
    name: 'create-bucket',
    component: () => import(/* webpackChunkName: "create-bucket" */ '../views/buckets/CreateBucket.vue')
  },
  {
    path: '/buckets/:bucketId',
    name: 'view-bucket',
    component: () => import(/* webpackChunkName: "view-bucket" */ '@/views/buckets/BucketDetails.vue')
  },
  {
    path: '/webhooks',
    name: 'webhooks-overview',
    component: () => import(/* webpackChunkName: "webhooks-overview" */ '@/views/webhooks/WebhooksOverview.vue')
  },
  {
    path: '/webhooks/create',
    name: 'create-webhook',
    component: () => import(/* webpackChunkName: "create-webhook" */ '@/views/webhooks/CreateWebhook.vue')
  },
  {
    path: '/webhooks/:webhookId',
    name: 'edit-webhook',
    component: () => import(/* webpackChunkName: "edit-webhook" */ '@/views/webhooks/EditWebhook.vue')
  },
  {
    path: '/webhooks/:webhookId',
    name: 'view-webhook',
    component: () => import(/* webpackChunkName: "view-webhook" */ '../views/webhooks/ViewWebhook.vue')
  },
  {
    path: '/account-settings',
    name: 'account-settings',
    component: () => import(/* webpackChunkName: "account-settings" */ '../views/account/AccountSettings.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
