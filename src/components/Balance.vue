<template>
    <div v-if="isMounted">
      <BalanceMetodosDePago :pedidos=pedidos2 />     
      <div class="d-flex flex-row mb-6">
        <BalanceCombos :pedidos=pedidos2 />
                
        <BalanceHorarios :pedidos=pedidos2 />
      </div>
      <BalanceCaja :pedidos=pedidos2 />  
      <BalanceFuturosCombos :pedidos=pedidos2 />    

    </div>
    
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import axios from 'axios'
  import BalanceMetodosDePago from './BalanceMetodosDePago.vue';
  import BalanceHorarios from './BalanceHorarios.vue';
  import BalanceCaja from './BalanceCaja.vue';
  import BalanceCombos from './BalanceCombos.vue';
  import BalanceFuturosCombos from './BalanceFuturosCombos.vue';
  import {useRouter} from 'vue-router'
  const router = useRouter()

  import pedidos2 from './pedidos.js';
    
  const pedidos = ref([])
  const isMounted = ref(false)

  function pedidosDelDia(pedidos){
    return pedidos.filter((pedido) => correspondeDia(pedido.fecha))
  }

  function pedidosDeEsteMes(pedidos){
    return pedidos.filter((pedido) => correspondeMes(pedido.fecha))
  }

  function pedidosDeEsteAnio(pedidos){
    return pedidos.filter((pedido) => mismoAnio(new Date(pedido.fecha),new Date()))
  }

  function correspondeDia(fecha){
    const date = new Date(fecha)
    const hoy = new Date()
    return ( mismoAnio(date,hoy) && mismoMes(date,hoy) && mismoDia(date,hoy))
  }

  function correspondeMes(fecha){
    const date = new Date(fecha)
    const hoy = new Date()
    return ( mismoAnio(date,hoy) && mismoMes(date,hoy))
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
  
  onMounted(async ()=>{
     //const resultado = await axios("http://localhost:8080/pedidos")
     //pedidos.value = resultado.data
     isMounted.value = true
  })

  
  </script>
  
  <style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
  </style>