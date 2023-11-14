<template>
  <div v-if="store.hayUsuarioAutenticado">
    <div class="d-flex flex-row mb-6 bg-surface-variant" v-if="isMounted">
        <v-sheet class="ma-2 pa-2">
            <table>
            <tr>
              <th><ListadoDeProductos titulo="Combos" :productos=combos></ListadoDeProductos></th>
                <th><ListadoDeProductos titulo="Bebidas" :productos=bebidas(productos)></ListadoDeProductos></th>
                <th><ListadoDeProductos titulo="Comidas" :productos=comidas(productos)></ListadoDeProductos></th>
            </tr>
            </table>
        </v-sheet>
        <v-sheet class="ma-2 pa-2">
            <Resumen></Resumen>
        </v-sheet>
    </div>
  </div>
  <div v-if="!store.hayUsuarioAutenticado">
    <h3>POR FAVOR INGRESE AL SISTEMA</h3>
    <Login />
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import axios from 'axios'
  import ListadoDeProductos from './ListadoDeProductos.vue';
  import Resumen from './Resumen.vue';
  import { useCarritoStore } from '../stores/carrito';
  import {useRouter} from 'vue-router'
  const router = useRouter()
  const carrito = useCarritoStore()
  const { agregarItem, productosEnCarrito } = carrito
  import { useAuthStore } from '../stores/authStore'
  import Login from "./Login.vue"
  const store = useAuthStore()
  
  const productos = ref([])
  const combos = ref([])
  const isMounted = ref(false)

  function bebidas(productos){
    return productosPorTipo(productos,"bebida")
  }

  function comidas(productos){
    return productosPorTipo(productos,"comida")
  }

  function productosPorTipo(productos,tipo){
    return productos.filter((producto) => producto.tipo === tipo)
  }
  
  onMounted(async ()=>{
    if(!store.hayUsuarioAutenticado){
      router.push("/login")
    }
     const resultado = await axios("http://localhost:8080/productos")
     productos.value = resultado.data
     const resultado2 = await axios("http://localhost:8080/combos")
     combos.value = resultado2.data
     isMounted.value = true
  })
   
  const eliminarItem = (producto)=>
  {
    carrito.value.splice(carrito.value.indexOf(producto), 1)
    
  }
  
  </script>
  
  <style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
  </style>