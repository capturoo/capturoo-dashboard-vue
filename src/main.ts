import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import * as firebase from 'firebase/app';
import "firebase/auth";

// init firebase
import firebaseConfig from '../config.js'
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.commit('setUser', user)
  } else {
    store.commit('setUser', undefined)
  }
  new Vue({
    store,
    router,
    vuetify,
    render: h => h(App),
  }).$mount('#app')
})
