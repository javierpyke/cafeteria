

<template>

    <div class="d-flex flex-column mb-6 bg-surface-variant">
      <BarraNavegacion />
      <div >
        <router-view></router-view>
      </div>
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
  </style>