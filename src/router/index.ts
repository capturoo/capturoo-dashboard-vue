import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import SignInView from '@/views/auth/SignInView.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    components: {
      default: DashboardView
    },
    redirect: {
      name: 'buckets-overview'
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
        path: '',
        name: 'signin',
        components: {
          signin: () => import(/* webpackChunkName: "account-settings" */ '../views/auth/SignIn.vue')
        },
        meta: {
          isPublic: true
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

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some((record) => {
    return record && record.meta && record.meta.isPublic
  })

  // if an already signed-in user attempts to visit the signin route
  // redirect them to the home route
  if (to.name === 'signin' && store.getters.user) {
    next({ name: 'home' })
  }

  // if the route is public OR and the user is already authenticated
  // allow the user to go where they intend
  if (isPublic || store.getters.user) {
    return next()
  }

  // by default a user is sent to the signin page unless
  // they met the criteria above
  next('signin');
})

export default router
