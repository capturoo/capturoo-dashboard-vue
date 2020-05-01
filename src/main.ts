import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import * as firebase from 'firebase/app'
import "firebase/auth"
import capturoo from './capturoo-client'

(async () => {
  function hostnameToEndpoint() {
    const hostmap = {
      'localhost': 'http://localhost:8080',
      'dashboard-staging.capturoo.com': 'https://api-staging.capturoo.com',
      'dashboard.caputroo.com': 'https://api.capturoo.com'
    }
    const hostname = window.location.hostname
    if (hostname in hostmap) {
      return hostmap[hostname]
    }
    return hostmap['localhost']
  }

  try {
    // init capturoo
    await capturoo.initializeApp({
      endpoint: hostnameToEndpoint(),
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
