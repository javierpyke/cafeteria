

<template>

    <div class="d-flex flex-column mb-6 bg-surface-variant">
      <BarraNavegacion />
      <v-sheet class="ma-2 pa-2">
        <router-view></router-view>
      </v-sheet>
    </div>
      

  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import axios from 'axios'
  import ListadoDeProductos from './components/ListadoDeProductos.vue';
  import Resumen from './components/Resumen.vue';
  import BarraNavegacion from './components/BarraNavegacion.vue';
  import { useCarritoStore } from './stores/carrito';
  import {useRouter} from 'vue-router'
  const router = useRouter()
  const carrito = useCarritoStore()
  const { agregarItem, productosEnCarrito } = carrito

  
  const productos = ref([])
  const isMounted = ref(false)
  
  onMounted(async ()=>{
     const resultado = await axios("https://www.mockachino.com/36f87b30-0846-40/productos")
     productos.value = resultado.data.productos
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