<template>
    <div style="width:70%;margin:auto" v-if="isMounted">
      <div style="margin-bottom:50px" class="d-flex flex-row">
        <BalanceMetodosDePago style="width:50%;margin-right:10px" :pedidos=pedidos2 />
        <BalanceCaja class="caja" :pedidos=pedidos2 />    
      </div>   
      <div class="d-flex flex-row">
        <BalanceCombos style="width:50%;margin-right:10px" :pedidos=pedidos2 />                
        <BalanceHorarios style="width:40%;" :pedidos=pedidos2 />
      </div>
      <BalanceFuturosCombos  :pedidos=pedidos2 />    

    </div>
    
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import axios from 'axios'
  import BalanceMetodosDePago from './BalanceMetodosDePago.vue';
  import BalanceCombos from './BalanceCombos.vue';
  import BalanceHorarios from './BalanceHorarios.vue';
  import BalanceCaja from './BalanceCaja.vue';
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

  .caja {
    width:40%;
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    justify-content: space-around;
    margin-top:50px;
  }
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