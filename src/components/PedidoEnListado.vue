<script setup>
  import Mercadopago from './Mercadopago.vue';
  import Efectivo from './Efectivo.vue';
  import Debito from './Debito.vue';
  import Credito from './Credito.vue';

defineProps({
    pedido: Object,
})

function getFormaDePago(formaDePago){
    if(formaDePago==='efectivo'){
        return Efectivo
    } else if (formaDePago==='debito'){
        return Debito
    } else if (formaDePago==='credito'){
        return Credito
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