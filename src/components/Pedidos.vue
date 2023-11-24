<template>
  <v-table class="tabla">
    <thead>
      <tr>
        <th class="text-left">
          Nro de Pedido
        </th>
        <th class="text-left">
          Forma de Pago
        </th>
        <th class="text-right">
          Total
        </th>
        <th class="text-right">
          Fecha
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="pedido in pedidos2"
        :key="pedido.nroPedido"
      >
        <PedidoEnListado :pedido="pedido" />
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import axios from 'axios'
  import Mercadopago from './mercadopago.vue';
  import PedidoEnListado from './PedidoEnListado.vue';
  import { useCarritoStore } from '../stores/carrito';
  import {useRouter} from 'vue-router'
  const router = useRouter()
  const carrito = useCarritoStore()
  import pedidos2 from './pedidos.js';
  
  const pedidos = ref([])
  const isMounted = ref(false)
  
  onMounted(async ()=>{
     const resultado = await axios("http://localhost:8080/pedidos")
     pedidos.value = resultado.data.sort((a,b) => b.nroPedido-a.nroPedido)
     isMounted.value = true
  })
   
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

  .tabla{
    width: 70%;
    margin: auto;
  }

  body{
    background-color: white;
  }

  </style>