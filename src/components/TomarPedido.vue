<template>
  <div>
    <div v-if="isMounted" class="principal">
      <div class="listado">
        <div class="combos" >
          <div v-for="combo in combos" :key="combo.id">
            <CombosListado :combo=combo></CombosListado>
          </div>
        </div>
        <div class="listadoProductos">
          <ListadoDeProductos titulo="Bebidas" :productos=bebidas(productos)></ListadoDeProductos>
          <ListadoDeProductos titulo="Comidas" :productos=comidas(productos)></ListadoDeProductos>
        </div>
        </div>
      <div class="resumen">
        <Resumen></Resumen>
      </div>
      
    </div>
  </div>
</template>

<script setup>
  import CombosListado from './CombosListado.vue'
  import ProductoListado from './ProductoListado.vue'
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
     /*const resultado = await axios("http://localhost:8080/productos")
     productos.value = resultado.data
     const resultado2 = await axios("http://localhost:8080/combos")
     combos.value = resultado2.data*/

     
     const resultado = await axios("https://www.mockachino.com/36f87b30-0846-40/productos")
     productos.value = resultado.data.productos
     combos.value = resultado.data.combos
     isMounted.value = true
  })
   
  const eliminarItem = (producto)=>
  {
    carrito.value.splice(carrito.value.indexOf(producto), 1)
    
  }
  
  </script>
  
  <style scoped>
  .listadoProductos {
    display: flex;
    flex-direction: row;

  }
  .tarjeta {
    margin: 5px;
    background-color: rgb(230, 212, 189);
  }
  .combos {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .listado {
    display: flex;
    flex-direction: column;
    width: 70%;
  }
  .principal {
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: white ;
  }

  .resumen{
    width: 30%;
  }
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