import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase/app'
import "firebase/auth"
import capturoo from '@/capturoo-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    buckets: [],
    user: undefined
  },
  getters: {
    buckets(state) {
      return state.buckets
    },
    user(state) {
      return state.user
    }
  },
  mutations: {
    resetState: (state) => {
      state.user = undefined
    },
    setUser(state, user: firebase.User) {
      state.user = user
    },
    setBuckets(state, buckets) {
      state.buckets = buckets
    },
    addBucket(state, bucket) {
      state.buckets.push(bucket)
    },
    removeBucket(state, bucketId) {
      function arrayRemove(arr: any, value: string) {
        return arr.filter((ele: any) => {
          return ele.bucketId != value
        })
      }
      state.buckets = arrayRemove(state.buckets, bucketId)
    }
  },
  actions: {
    async signInWithEmailAndPassword({ commit, state }, { email, password }) {
      try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user
        commit('setUser', user);
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
    async getBuckets() {
      try {
        const buckets = await capturoo.admin().getBuckets()
        this.commit('setBuckets', buckets)
        return buckets
      } catch (err) {
        throw err
      }
    },
    async deleteBucket({ commit, state }, { bucketId }) {
      const results = state.buckets.filter(b => {
        return b.bucketId === bucketId
      })
      if (results.length === 1) {
        const bucket = results[0]
        await bucket.delete()
        commit('removeBucket', bucketId)
      }
    }
  }
})
