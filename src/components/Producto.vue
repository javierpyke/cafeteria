<script setup>
/* Componente Hijo de ListadoDeProductos, muestra los datos del Producto,
permite agregar o eliminar productos al carrito */
import { ref } from 'vue'
import { useCarritoStore } from '../stores/carrito';
const carrito = useCarritoStore()
const { agregarItem } = carrito

defineProps({
    producto: Object,
})

</script>

<template>
  <td class="text-left"> {{ producto.nombre }}</td>
  <td>$ {{ producto.precio }}</td>
  <td><v-btn  color="success" density="compact" variant="tonal" @click="agregarItem(producto)" icon="$vuetify" >+</v-btn></td>
</template>

<style scoped>
</style>