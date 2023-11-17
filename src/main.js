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
import { useAuthStore } from './stores/authStore';
import {createPinia} from 'pinia'

const pinia = createPinia()

const vuetify = createVuetify({
    components,
    directives,
  })

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




createApp(App)
.use(pinia)
.use(vuetify)
.use(router)
.use(CanvasJSChart)
.use(PrimeVue)
.mount('#app')

const store = useAuthStore()

router.beforeEach(async (to, from) => {
    console.log(to.path!=='/login')
    if(to.path!=='/login'){
        console.log('bbbbbbbbbbbbbbbbbbbbbbbb')
        if(!store.hayUsuarioAutenticado){
            return '/login'
        } else if (!store.canUserAccess(to)){
            console.log('aaaaaaaaaaaaaaaaaa')
            return '/tomarPedido'
        }
    }
  })