<template>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Caja
          </th>
          <th class="text-left">
            Cantidad
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left">
            Efectivo
          </td>
          <td>
            $ {{totalCompras((pedidos.filter((pedido) => pedido.formaDePago === "efectivo")))}}
          </td>
        </tr>
        <tr>
          <td class="text-left">
            Debito
          </td>
          <td>
            $ {{totalCompras((pedidos.filter((pedido) => pedido.formaDePago === "debito")))}}
          </td>
        </tr>
        <tr>
          <td class="text-left">
            Mercado Pago
          </td>
          <td>
            $ {{totalCompras((pedidos.filter((pedido) => pedido.formaDePago === "mp")))}}
          </td>
        </tr>
        <tr>
          <td class="text-left">
            Credito
          </td>
          <td>
            $ {{totalCompras((pedidos.filter((pedido) => pedido.formaDePago === "credito")))}}
          </td>
        </tr>
      </tbody>
    </v-table>
</template>

<script setup>
  import {useRouter} from 'vue-router'
  const router = useRouter()

  function totalCompras(pedidos){
    return pedidos.reduce((acumulador, pedido) => acumulador + total(pedido.productos), 0)
  }

  function total(productos){
    return productos.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0)
  }

  defineProps({
    pedidos: Array,
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
  </style>