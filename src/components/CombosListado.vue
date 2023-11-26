<template>
    <v-card class="tarjeta" width="200">
        <template v-slot:title>
        {{ combo.nombre }}
        </template>

        <template v-slot:subtitle>
        {{ combo.bebida.nombre}} & <br>
        {{ combo.comida.nombre}}
        </template>

        <template v-slot:text>
        $ {{ combo.precio}} <v-btn
            class="ms-2"
            variant="outlined"
            size="small"
            @click="agregarItem(combo)"
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
    combo: Object,
})

</script>

<style>

</style>