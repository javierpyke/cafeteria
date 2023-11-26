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

  /* Funcion que devuelve el precio total de una lista de productos */
  function total(productos){
    return productos.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0)
  }

  /* Props con pedidos */
  const props = defineProps({
    pedidos: Array,
})

  /* Creo una referencia a un array vacio donde voy a guardar los diferentes totales segun el metodo de pago */
  /* [total efectivo, total debito, total mp, total credito] */
  const dineroEnCaja = ref([])
  const isMounted = ref(false)

  const metodosDePago = ['efectivo','debito','mp','credito']

  /* Devuelve un array con los totales por metodo de pago */
  /*[total efectivo, total debito, total mp, total credito]*/
  function recorrerPedidos(pedidos){
    var dineroEnCajaAux = [0,0,0,0]
    /* Recorro los pedidos */
    pedidos.map((pedido) => {
      /* Si el pedido es del dia de hoy */
      if(correspondeDia(new Date(pedido.fecha))){
        /* Sumo el total del pedido en la posicion segun metodo de pago*/
        dineroEnCajaAux[metodosDePago.indexOf(pedido.formaDePago)] += total(pedido.productos)
      }
    })
    /* retorno el array */
    return dineroEnCajaAux
  }

  onMounted(async ()=>{
    /* Llamo a la funcion recorrerPedidos y guardo el resultado en la referencia de dineroEnCaja */
     dineroEnCaja.value = recorrerPedidos(props.pedidos)
     isMounted.value = true
  })

  /* Devuelve true o false segun si la fecha pasada por parametro es hoy */
  function correspondeDia(fecha){
    const hoy = new Date()
    return ( mismoAnio(fecha,hoy) && mismoMes(fecha,hoy) && mismoDia(fecha,hoy))
  }

   /* Devuelve true o false segun si la fecha pasada por parametro es de este año */
  function mismoAnio(fecha,hoy){
    return (fecha.getFullYear() === hoy.getFullYear())
  }

     /* Devuelve true o false segun si la fecha pasada por parametro es de este mes */
  function mismoMes(fecha,hoy){
    return (fecha.getMonth() === hoy.getMonth())
  }

     /* Devuelve true o false segun si la fecha pasada por parametro es de este dia de la semana */
  function mismoDia(fecha,hoy){
    return (fecha.getDate() === hoy.getDate())
  }

  
  </script>
  
  <style scoped>

  </style>