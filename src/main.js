import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { VDataTable } from 'vuetify/labs/VDataTable'
import '@/styles/variables.scss';


import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.css'



// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components ,
  directives,
})



createApp(App).use(router).use(vuetify).component('VDataTable', VDataTable).mount('#app')