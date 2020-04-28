import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import SignInView from '@/views/auth/SignInView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    components: {
      default: DashboardView
    },
    children: [
      {
        path: 'buckets',
        name: 'buckets-overview',
        components: {
          dashboard: () => import(/* webpackChunkName: "bucket" */ '../views/buckets/Buckets.vue')
        }
      },
      {
        path: 'buckets/:bucketId',
        name: 'view-bucket',
        components: {
          dashboard: () => import(/* webpackChunkName: "view-bucket" */ '@/views/buckets/BucketDetails.vue')
        }
      },
      {
        path: 'buckets/create',
        name: 'create-bucket',
        components: {
          dashboard: () => import(/* webpackChunkName: "create-bucket" */ '../views/buckets/CreateBucket.vue')
        }
      },
      {
        path: 'webhooks',
        name: 'webhooks-overview',
        components: {
          dashboard: () => import(/* webpackChunkName: "webhooks-overview" */ '@/views/webhooks/WebhooksOverview.vue'),
        }
      },
      {
        path: 'webhooks/create',
        name: 'create-webhook',
        components: {
          dashboard: () => import(/* webpackChunkName: "create-webhook" */ '@/views/webhooks/CreateWebhook.vue')
        }
      },
      {
        path: 'webhooks/:webhookId',
        name: 'edit-webhook',
        components: {
          dashboard: () => import(/* webpackChunkName: "edit-webhook" */ '@/views/webhooks/EditWebhook.vue')
        }
      },
      {
        path: 'webhooks/:webhookId',
        name: 'view-webhook',
        components: {
          dashboard: () => import(/* webpackChunkName: "view-webhook" */ '../views/webhooks/ViewWebhook.vue')
        }
      },
      {
        path: 'account-settings',
        name: 'account-settings',
        components: {
          dashboard: () => import(/* webpackChunkName: "account-settings" */ '../views/account/AccountSettings.vue')
        }
      }
    ]
  },
  {
    path: '/signin',
    components: {
      default: SignInView
    },
    children: [
      {
        path: '/',
        name: 'signin-route',
        components: {
          signin: () => import(/* webpackChunkName: "account-settings" */ '../views/auth/SignIn.vue')
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
