import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import * as firebase from 'firebase/app'
import "firebase/auth"
import capturoo from './capturoo-client'

(async () => {
  try {
    // init capturoo
    await capturoo.initializeApp({
      endpoint: 'http://localhost:8080',
      //endpoint: 'https://api-staging.capturoo.com',
      debug: false
    })
    const firebaseConfig = await capturoo.admin().getFirebaseConfig()
    firebase.initializeApp(firebaseConfig)

    Vue.config.productionTip = false

    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        store.commit('setUser', user)
        const idTokenResult = await user.getIdTokenResult()
        capturoo.admin().setJWT(idTokenResult.token)
        capturoo.admin().setClaims(idTokenResult.claims)
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
  } catch (err) {
    console.error(err)
  }
})()
