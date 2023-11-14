<script setup>
import { ref } from 'vue'
import { useCarritoStore } from '../stores/carrito';
const carrito = useCarritoStore()
const { eliminarItem , agregarCantidad, eliminarCantidad } = carrito


defineProps({
    producto: Object,
})

</script>

<template>
    <td class="text-left">{{ producto.nombre }} </td>
    <td class="text-left">$ {{ producto.precio }} </td>
    <td class="text-left">x {{ producto.cantidad }} </td>
    <td class="text-left">$ {{ producto.cantidad * producto.precio}} </td>
    <td class="text-left"><v-btn icon="mdi-plus" density="compact" variant="tonal" @click="agregarCantidad(producto)"  >+</v-btn>
        <v-btn density="compact" variant="tonal" @click="eliminarCantidad(producto)" icon="$vuetify" >-</v-btn>
        <v-btn  color="error" density="compact" variant="tonal" @click="eliminarItem(producto)" icon="$vuetify" >X</v-btn>
    </td>
</template>

<style scoped>
</style>