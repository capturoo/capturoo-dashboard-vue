import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import * as firebase from 'firebase/app'
import capturoo from './capturoo-client'

import "firebase/auth"

(async () => {
  // init capturoo
  try {
    await capturoo.initializeApp({
      endpoint: 'http://localhost:8080',
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
        console.log(capturoo.admin())
        try {
          const nb = await capturoo.admin().createBucket('a-new-bucket-code', 'Amazing bucket name')
          console.log(nb)

        } catch (err) {
          console.error(err)
        }
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
