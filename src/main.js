import Vue from 'vue'
import App from './App.vue'

import './styles/quasar.styl'
import 'quasar-extras/material-icons'
import Quasar from 'quasar'
import store from './store'
import Vuelidate from 'vuelidate'

Vue.use(Quasar, {
	config: {}
})
Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
	render: h => h(App),
	store
}).$mount('#app')
