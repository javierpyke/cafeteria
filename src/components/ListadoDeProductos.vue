<script setup>
  import { useCarritoStore } from '../stores/carrito';
  import Producto from './Producto.vue';

defineProps({
    titulo: String,
    productos: Array
})

</script>

<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          {{titulo}}
        </th>
        <th class="text-left">
          Precio
        </th>
        <th class="text-left">
          
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="producto in productos"
        :key="producto.id"
      >
        <Producto :producto=producto></Producto>
      </tr>
    </tbody>
  </v-table>
</template>

<style scoped>
</style>