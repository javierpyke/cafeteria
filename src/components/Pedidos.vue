<script setup>
/* Componente Padre, muestra el listado de pedidos */
  import PedidoEnListado from './PedidoEnListado.vue';
  import { onMounted, ref } from 'vue';
  import axios from 'axios'
  
  const pedidos = ref([])
  const isMounted = ref(false)
  
  /* Obtengo los pedidos */
  onMounted(async ()=>{
    /* Obtengo los Pedidos ordenados del mas nuevo al mas viejo */
     const resultado = await axios("http://localhost:8080/ultimosPedidos")     
     pedidos.value = resultado.data
     isMounted.value = true
  })
   
  </script>

<template>
  <v-table v-if="isMounted" class="tabla">
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
        v-for="pedido in pedidos"
        :key="pedido.nroPedido"
      >
        <PedidoEnListado :pedido="pedido" />
      </tr>
    </tbody>
  </v-table>
</template>

  
  <style scoped>

  .tabla{
    width: 70%;
    margin: auto;
  }

  </style>