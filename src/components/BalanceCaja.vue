<template>
  <div>
    <h3 style="width:100%;color:black;text-align:center">Caja del dia:</h3>
    <v-card color="#FFEBEE"
            theme="dark" width="150" height="100">
      <v-card-item>
        <v-card-title>$ {{dineroEnCaja[metodosDePago.indexOf('efectivo')]}}</v-card-title>
      </v-card-item>
      <v-card-text>
        <Efectivo />
      </v-card-text>
    </v-card>
    <v-card color="#E0F2F1" width="150" height="100">
      <v-card-item>
        <v-card-title>$ {{dineroEnCaja[metodosDePago.indexOf('debito')]}}</v-card-title>
      </v-card-item>

      <v-card-text>
        <Debito />
      </v-card-text>
    </v-card>
    <v-card color="#B3E5FC" width="150" height="100">
      <v-card-item>
        <v-card-title>$ {{dineroEnCaja[metodosDePago.indexOf('mp')]}}</v-card-title>
      </v-card-item>

      <v-card-text>
        <Mercadopago />
      </v-card-text>
    </v-card>
    <v-card color="#CFD8DC" width="150" height="100">
      <v-card-item>
        <v-card-title>$ {{dineroEnCaja[metodosDePago.indexOf("credito")]}}</v-card-title>
      </v-card-item>

      <v-card-text>
        <Credito />
      </v-card-text>
    </v-card>
  </div>

</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import Mercadopago from './Mercadopago.vue';
  import Efectivo from './Efectivo.vue';
  import Debito from './Debito.vue';
  import Credito from './Credito.vue';


  function total(productos){
    return productos.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0)
  }

  const props = defineProps({
    pedidos: Array,
})

  const dineroEnCaja = ref([])
  const isMounted = ref(false)

  const metodosDePago = ['efectivo','debito','mp','credito']

  function recorrerPedidos(pedidos){
    var dineroEnCajaAux = [0,0,0,0]
    pedidos.map((pedido) => {
      if(correspondeDia(new Date(pedido.fecha))){
        dineroEnCajaAux[metodosDePago.indexOf(pedido.formaDePago)] += total(pedido.productos)
      }
    })
    return dineroEnCajaAux
  }

  onMounted(async ()=>{
     dineroEnCaja.value = recorrerPedidos(props.pedidos)
     isMounted.value = true
  })

  function correspondeDia(fecha){
    const hoy = new Date()
    return ( mismoAnio(fecha,hoy) && mismoMes(fecha,hoy) && mismoDia(fecha,hoy))
  }

  function mismoAnio(fecha,hoy){
    return (fecha.getFullYear() === hoy.getFullYear())
  }

  function mismoMes(fecha,hoy){
    return (fecha.getMonth() === hoy.getMonth())
  }

  function mismoDia(fecha,hoy){
    return (fecha.getDate() === hoy.getDate())
  }

  
  </script>
  
  <style scoped>

  </style>