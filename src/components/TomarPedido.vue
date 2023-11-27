<script setup>
/* Componente Padre, obtiene los datos de los productos y se los pasa a los componentes hijo
para ser mostrados  */
  import { useCarritoStore } from '../stores/carrito';
  import { useAuthStore } from '../stores/authStore';
  import { useRouter } from 'vue-router';
  import { onMounted, ref } from 'vue';
  import axios from 'axios'

  import ListadoDeProductos from './ListadoDeProductos.vue';
  import CombosListado from './CombosListado.vue'
  import Resumen from './Resumen.vue';

  const carrito = useCarritoStore()
  const store = useAuthStore()
  const router = useRouter()
  
  const isMounted = ref(false)  
  const productos = ref([])
  const combos = ref([])

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
     const resultadoProductos = await axios("http://localhost:8080/productos")
     const resultadoCombos = await axios("http://localhost:8080/combos")
     productos.value = resultadoProductos.data
     combos.value = resultadoCombos.data
    isMounted.value = true
  }) 
  
  </script>

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
  </style>