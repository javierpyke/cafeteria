<template>
    <v-card class="tarjeta" width="200">
        <template v-slot:title>
        {{ producto.nombre }}
        </template>

        <template v-slot:text>
        $ {{ producto.precio}} <v-btn
            class="ms-2"
            variant="outlined"
            size="small"
            @click="agregarItem(producto)"
            >
            AGREGAR
            </v-btn>
    </template>
</v-card>
</template>

<script setup>
import { useCarritoStore } from '../stores/carrito';
const carrito = useCarritoStore()
const { agregarItem } = carrito

defineProps({
    producto: Object,
})

</script>

<style>

</style>