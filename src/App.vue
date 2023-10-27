

<template>
  <div v-if="isMounted">
    <div v-for="producto in carrito" :key="producto.id">
      <h1>{{ producto.producto +' '+producto.precio+' '+ producto.cantidad+' '+producto.cantidad * producto.precio}} <button type="button" @click="eliminarItem(producto)">X</button></h1>
    </div>
   
    <div v-for="producto in productos" :key="producto.id">
      <h1>{{ producto.producto +' '+producto.precio }} <button type="button" @click="agregarItem(producto)">agregar item</button> </h1>
    </div>
  </div>
  
    
    
    
  
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  // import Nt2 from './components/Nt2.vue';
  import axios from 'axios'
  
  const productos = ref([])
  const carrito = ref([])
  const isMounted = ref(false)
  
  onMounted(async ()=>{
     const resultado = await axios("https://www.mockachino.com/389d3235-ce76-44/productos")
     console.log(resultado.data.productos)
     productos.value = resultado.data.productos
     isMounted.value = true
  })
  
  
  
  const agregarItem = (producto)=>
  {
    console.log(carrito.value.indexOf(producto))
    if(carrito.value.indexOf(producto) != -1){
      carrito.value[carrito.value.indexOf(producto)].cantidad += 1
    } else {
      producto.cantidad = 1
      console.log(producto)
      carrito.value.push(producto)
    }
    
  }

  const eliminarItem = (producto)=>
  {
    console.log(carrito.value.indexOf(producto))
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