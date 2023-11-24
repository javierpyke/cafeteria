<script setup>
import { ref } from 'vue'
import { useCarritoStore } from '../stores/carrito';
const carrito = useCarritoStore()
const { eliminarItem , agregarCantidad, eliminarCantidad } = carrito
import Mercadopago from './mercadopago.vue';
import efectivo from './efectivo.vue';
import debito from './debito.vue';
import credito from './credito.vue';

defineProps({
    pedido: Object,
})

function getFormaDePago(formaDePago){
    if(formaDePago==='efectivo'){
        return efectivo
    } else if (formaDePago==='debito'){
        return debito
    } else if (formaDePago==='credito'){
        return credito
    } else if (formaDePago==='mp'){
        return Mercadopago
    }
}

const totalEnCarrito = (productos) =>
    {
        const valorInicial = 0;
        const total = productos.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), valorInicial);
        return total
    }

</script>

<template>
    <td class="text-left">
        {{pedido.nroPedido}}
    </td>
    <td>
        <component :is='getFormaDePago(pedido.formaDePago)' />
    </td>
    <td class="text-right">
        <v-chip variant="flat" color="green">
            $ {{ totalEnCarrito(pedido.productos) }}
        </v-chip>
    </td>
    <td class="text-right">
        {{ pedido.fecha }}
    </td>
</template>

<style scoped>


</style>