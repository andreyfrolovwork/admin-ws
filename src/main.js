import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'

import i18n from '@/libs/i18n'
import router from './router'
import store from './store'
import App from './App.vue'

// Global Components
import './global-components'

// 3rd party plugins
import '@axios'
/*import '@/libs/acl'*/
import '@/libs/portal-vue'
import '@/libs/clipboard'
import '@/libs/toastification'
import '@/libs/sweet-alerts'
import '@/libs/vue-select'
import '@/libs/tour'

// Axios Mock Adapter
import '@/@fake-db/db'

import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyCvZW7leaE5cas7YTo8WRgRUQaeZjVIdb8',
  authDomain: 'vuexy-4739b.firebaseapp.com',
  projectId: 'vuexy-4739b',
  storageBucket: 'vuexy-4739b.appspot.com',
  messagingSenderId: '983180512682',
  appId: '1:983180512682:web:767e784fa14ebc3106afd3',
}

const app = initializeApp(firebaseConfig)

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)

// Feather font icon - For form-wizard
// * Shall remove it if not using font-icons of feather-icons - For form-wizard
require('@core/assets/fonts/feather/iconfont.css') // For form-wizard

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
