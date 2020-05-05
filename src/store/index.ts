import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase/app'
import capturoo from '@/capturoo-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    account: null,
    bucketContext: null,
    bucket: null,
    buckets: [],
    dialogBuckets: [],
    webhook: null,
    webhooks: [],
    user: null
  },
  getters: {
    account(state) {
      return state.account
    },
    bucketContext(state) {
      return state.bucketContext
    },
    bucket(state) {
      return state.bucket
    },
    buckets(state) {
      return state.buckets
    },
    dialogBuckets(state) {
      return state.dialogBuckets
    },
    webhook(state) {
      return state.webhook
    },
    webhooks(state) {
      return state.webhooks
    },
    user(state) {
      return state.user
    }
  },
  mutations: {
    resetState: (state) => {
      state.user = undefined
    },
    setAccount(state, account) {
      state.account = account
    },
    setUser(state, user: firebase.User) {
      state.user = user
    },
    setBucketContext(state, bucket) {
      state.bucketContext = bucket
    },
    setBucket(state, bucket) {
      state.bucket = bucket
    },
    setBuckets(state, buckets) {
      state.buckets = buckets
    },
    resetBuckets(state) {
      state.buckets = null
    },
    addBucket(state, bucket) {
      state.buckets.push(bucket)
    },
    setDialogBuckets(state, buckets) {
      state.dialogBuckets = buckets
    },
    setWebhook(state, webhook) {
      state.webhook = webhook
    },
    setWebhooks(state, webhooks) {
      state.webhooks = webhooks
    },
    addWebhook(state, webhook) {
      state.webhook = webhook
    },
    removeBucket(state, bucketId) {
      function arrayRemove(arr: any, value: string) {
        return arr.filter((ele: any) => {
          return ele.bucketId != value
        })
      }
      state.buckets = arrayRemove(state.buckets, bucketId)
    },
    removeWebhook(state, webhookId) {
      function arrayRemove(arr: any, value: string) {
        return arr.filter((ele: any) => {
          return ele.webhookId != value
        })
      }
      state.webhooks = arrayRemove(state.webhooks, webhookId)
    }
  },
  actions: {
    async createAccount({ commit, state }, { firstname, lastname, email, password }) {
      try {
        const account = await capturoo.admin().signUp(firstname, lastname, email, password)
        commit('setAccount', account);
        return account
      } catch (err) {
        throw err
      }
    },
    async getAccount({ commit, state }) {
      try {
        const account = await capturoo.admin().getAccount()
        commit('setAccount', account)
        return account
      } catch (err) {
        throw err
      }
    },
    async signInWithEmailAndPassword({ commit, state }, { email, password }) {
      try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user
        commit('setUser', user);
      } catch (err) {
        throw err
      }
    },
    async sendPasswordResetEmail({ commit, state }, { email }) {
      try {
        await firebase.auth().sendPasswordResetEmail(email)
      } catch (err) {
        throw err
      }
    },
    async signOut({ commit }) {
      try {
        await firebase.auth().signOut()
        commit('resetState')
      } catch (err) {
        throw err
      }
    },
    setBucketContext({ commit }, { bucket }) {
      try {
        commit('setBucketContext', bucket)
      } catch (err) {
        throw err
      }
    },
    async createBucket({ commit }, { bucketCode, bucketName }) {
      try {
        const bucket = await capturoo.admin().createBucket(bucketCode, bucketName)
        commit('addBucket', bucket)
        return bucket
      } catch (err) {
        throw err
      }
    },
    async getBucket({ commit }, { bucketId }) {
      try {
        const bucket = await capturoo.admin().getBucket(bucketId)
        commit('setBucket', bucket)
        return bucket
      } catch (err) {
        throw err
      }
    },
    async getBuckets({ commit }) {
      try {
        const buckets = await capturoo.admin().getBuckets()
        commit('setBuckets', buckets)
        return buckets
      } catch (err) {
        throw err
      }
    },
    async getDialogBuckets({ commit }) {
      try {
        const buckets = await capturoo.admin().getBuckets()
        commit('setDialogBuckets', buckets)
        return buckets
      } catch (err) {
        throw err
      }
    },
    async getWebhook({ commit }, { webhookId }) {
      try {
        const webhook = await capturoo.admin().getWebhook(webhookId)
        commit('setWebhook', webhook)
        return webhook
      } catch (err) {
        throw err
      }
    },
    async getWebhooks({ commit }) {
      try {
        const webhooks = await capturoo.admin().getWebhooks()
        commit('setWebhooks', webhooks)
        return webhooks
      } catch (err) {
        throw err
      }
    },
    async createWebhook({ commit }, { webhookCode, url, events, enabled }) {
      try {
        const webhook = await capturoo.admin().createWebhook(webhookCode, url, events, enabled)
        commit('addWebhook', webhook)
        return webhook
      } catch (err) {
        throw err
      }
    },
    resetBucket({ commit }) {
      commit('setBucket', null)
    },
    resetBuckets({ commit }) {
      commit('setBuckets', [])
    },
    resetDialogBuckets({ commit }) {
      commit('setDialogBuckets', [])
    },
    resetWebhook({ commit }) {
      commit('setWebhook', null)
    },
    async deleteBucket({ commit, state }, { bucketId }) {
      const results = state.buckets.filter(v => v.bucketId === bucketId)
      if (results.length === 1) {
        const bucket = results[0]
        await bucket.delete()
        commit('removeBucket', bucketId)
      }
    },
    async deleteWebhook({ commit, state }, { webhookId }) {
      const results = state.webhooks.filter(v => v.webhookId === webhookId)
      if (results.length === 1) {
        const webhook = results[0]
        await webhook.delete()
        commit('removeWebhook', webhookId)
      }
    }
  }
})
