import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase/app';
import "firebase/auth";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: undefined
  },
  getters: {
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
    }
  }
})
