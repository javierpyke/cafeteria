<template>
    <td class="text-left">
      {{combo.nombre}}
    </td>
    <td>
      <v-select v-model="bebidaSelect" :items="bebidas" :item-props="itemProps" ></v-select>
    </td>
    <td class="text-right">
      <v-select v-model="commidaSelect" :items="comidas" :item-props="itemProps" ></v-select>
    </td>
    <td class="text-right">
      $ <input type="number" v-model="precio" /> 
    </td>
    <td class="text-right">
      <v-btn density="compact" variant="tonal" @click="guardarCombo(combo)" >OK</v-btn>
    </td>
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
  const props = defineProps({
    combo: Object
  })

  function guardarCombo(combo){



    const nuevoCombo =
    {
      "nombre":combo.nombre,
      "precio":precio.value,
      "comida":commidaSelect.value,
      "bebida":bebidaSelect.value
    }
    fetch("http://localhost:8080/combo", {
          method: 'PUT',
          body: JSON.stringify(nuevoCombo),
          headers: {
              "Accept": "application/json",
              "Content-Type":"application/json"
          }
      })
  }
  
  const precio = ref(0)
  const comidas = ref([])
  const bebidas = ref([])
  const commidaSelect = ref({})
  const bebidaSelect = ref({})
  const isMounted = ref(false)
  
  onMounted(async ()=>{
     const resultado = await axios("https://www.mockachino.com/36f87b30-0846-40/productos")
     comidas.value = (resultado.data.productos.filter((producto) => producto.tipo === 'comida'))
     bebidas.value = (resultado.data.productos.filter((producto) => producto.tipo === 'bebida'))
     commidaSelect.value = props.combo.comida
     bebidaSelect.value = props.combo.bebida
     precio.value = props.combo.precio
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