<template>
  <div v-if="isMounted">
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Combo
          </th>
          <th class="text-left">
            Bebida
          </th>
          <th class="text-right">
            Comida
          </th>
          <th class="text-right">
            Precio
          </th>
          <th class="text-right">

          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="combo in combos"
          :key="combo.id"
        >
          <Combo :combo="combo" />
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import axios from 'axios'
  import ListadoDeProductos from './ListadoDeProductos.vue';
  import Combo from './Combo.vue';
  import { useCarritoStore } from '../stores/carrito';
  import {useRouter} from 'vue-router'
  const router = useRouter()
  const carrito = useCarritoStore()
  const { agregarItem, productosEnCarrito } = carrito

  
  const combos = ref([])
  const isMounted = ref(false)
  
  onMounted(async ()=>{
     const resultado = await axios("http://localhost:8080/combos")
     combos.value = resultado.data
     isMounted.value = true
  })

  function itemProps (item) {
        return {
          title: item.nombre,
        }
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