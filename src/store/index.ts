import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase/app'
import capturoo from '@/capturoo-client'

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    account: null,
    bucket: null,
    buckets: [],
    webhooks: [],
    user: null
  },
  getters: {
    account(state) {
      return state.account
    },
    bucket(state) {
      return state.bucket
    },
    buckets(state) {
      return state.buckets
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
    setBucket(state, bucket) {
      state.bucket = bucket
    },
    setBuckets(state, buckets) {
      state.buckets = buckets
    },
    addBucket(state, bucket) {
      state.buckets.push(bucket)
    },
    setWebhooks(state, webhooks) {
      state.webhooks = webhooks
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
    async signOut({ commit, state }) {
      try {
        await firebase.auth().signOut()
        commit('resetState')
      } catch (err) {
        throw err
      }
    },
    async createBucket({ commit, state }, { bucketCode, bucketName }) {
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
    async getWebhooks({ commit }) {
      try {
        const webhooks = await capturoo.admin().getWebhooks()
        commit('setWebhooks', webhooks)
        return webhooks
      } catch (err) {
        throw err
      }
    },
    resetBucket({ commit }) {
      commit('setBucket', null)
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
