<script setup>
/* Componente Hijo de Pedidos, muestro la informacion del Pedido */
  import Mercadopago from './Mercadopago.vue';
  import Efectivo from './Efectivo.vue';
  import Debito from './Debito.vue';
  import Credito from './Credito.vue';

defineProps({
    pedido: Object,
})

/* Segun una forma de pago en String devuelve un Componente Vue */
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
/* Devuelve el total de valor de un pedido */
const totalEnPedido = (productos) =>
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
            $ {{ totalEnPedido(pedido.productos) }}
        </v-chip>
    </td>
    <td class="text-right">
        {{ pedido.fecha }}
    </td>
</template>

<style scoped>


</style>