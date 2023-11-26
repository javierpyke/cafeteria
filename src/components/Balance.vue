<template>
    <div style="width:70%;margin:auto" v-if="isMounted">
      <div style="margin-bottom:50px" class="d-flex flex-row">
        <BalanceMetodosDePago style="width:50%;margin-right:10px" :pedidos=pedidos />
        <BalanceCaja class="caja" :pedidos=pedidos />    
      </div>   
      <div class="d-flex flex-row">
        <BalanceCombos style="width:50%;margin-right:10px" :pedidos=pedidos :combos=combos />                
        <BalanceHorarios style="width:40%;" :pedidos=pedidos />
      </div>
      <BalanceFuturosCombos  :pedidos=pedidos />    

    </div>
    
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import axios from 'axios'
  
  import BalanceMetodosDePago from './BalanceMetodosDePago.vue';
  import BalanceFuturosCombos from './BalanceFuturosCombos.vue';
  import BalanceHorarios from './BalanceHorarios.vue';
  import BalanceCombos from './BalanceCombos.vue';
  import BalanceCaja from './BalanceCaja.vue';
    
  const pedidos = ref([])
  const combos = ref([])
  const isMounted = ref(false)

  onMounted(async ()=>{
    /* Obtengo la informacion de los pedidos*/
     const resultado = await axios("http://localhost:8080/pedidos")
     pedidos.value = resultado.data
     const resultadoCombos = await axios("http://localhost:8080/combos")
     combos.value = resultadoCombos.data
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
  </style>