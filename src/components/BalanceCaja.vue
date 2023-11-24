<template>
  <div>
    <h3 style="width:100%;color:black;text-align:center">Caja del dia:</h3>
    <v-card color="#FFEBEE"
            theme="dark" width="150" height="100">
      <v-card-item>
        <v-card-title>$ {{dineroEnCaja[metodosDePago.indexOf('efectivo')]}}</v-card-title>
      </v-card-item>

      <v-card-text>
        <efectivo />
      </v-card-text>
    </v-card>
    <v-card color="#E0F2F1" width="150" height="100">
      <v-card-item>
        <v-card-title>$ {{dineroEnCaja[metodosDePago.indexOf('debito')]}}</v-card-title>
      </v-card-item>

      <v-card-text>
        <debito />
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
        <credito />
      </v-card-text>
    </v-card>
  </div>

</template>

<script setup>
  import {useRouter} from 'vue-router'
  import { onMounted, ref } from 'vue';
  import Mercadopago from './mercadopago.vue';
  import efectivo from './efectivo.vue';
  import debito from './debito.vue';
  import credito from './credito.vue';
  const router = useRouter()

  function totalCompras(pedidos){
    return pedidos.reduce((acumulador, pedido) => acumulador + total(pedido.productos), 0)
  }

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
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }

  .caja2 {
    width:40%;
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    justify-content: space-around;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
  </style>