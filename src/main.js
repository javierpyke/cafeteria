import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import {createRouter, createWebHashHistory } from 'vue-router'
import TomarPedido from './components/TomarPedido.vue'
import Balance from './components/Balance.vue'
import Pedidos from './components/Pedidos.vue'
import Productos from './components/Productos.vue'
import Combos from './components/Combos.vue'
import Login from './components/Login.vue'
import CanvasJSChart from '@canvasjs/vue-charts';
import PrimeVue from 'primevue/config';


const routes = [
    {
        path:'/',
        component: TomarPedido,
    },
    {
        path:'/pedidos',
        component:Pedidos,
    },
    {
        path:'/productos',
        component: Productos
    },
    {
        path:'/balance',
        component: Balance
    },
    {
        path:'/combos',
        component: Combos,
    },
    {
        path:'/login',
        component: Login
    }
]

const router = createRouter({
    routes,
    history:createWebHashHistory()
})

const vuetify = createVuetify({
  components,
  directives,
})

import {createPinia} from 'pinia'

const pinia = createPinia()



createApp(App)
.use(pinia)
.use(vuetify)
.use(router)
.use(CanvasJSChart)
.use(PrimeVue)
.mount('#app')
