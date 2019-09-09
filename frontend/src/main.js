import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'
import Vuelidate from 'vuelidate'

import VueHtmlToPaper from 'vue-html-to-paper'
const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://cdn.jsdelivr.net/npm/quasar@^1.1.0/dist/quasar.min.css'
  ]
}
// or, using the defaults with no stylesheet
Vue.use(VueHtmlToPaper, options)

Vue.config.productionTip = true

Vue.use(Vuelidate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

