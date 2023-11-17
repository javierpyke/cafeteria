<template>
  <DoughnutChart v-bind="doughnutChartProps" />
</template>

<script setup lang="ts">
  import { LineChart, useLineChart } from "vue-chart-3";
  import { DoughnutChart, useDoughnutChart } from 'vue-chart-3';
  import { Chart, registerables } from "chart.js";
  import { onMounted, ref } from 'vue';

  Chart.register(...registerables);

  const props = defineProps({
    pedidos: Array
  })

  const isMounted = ref(false)

  

  function recorrerPedidos(pedidos){
    var cantidadDeCombosAux = [0,0,0,0]
    pedidos.map((pedido) => {
      pedido.productos.map((producto) => {
        if(combos.indexOf(producto.nombre) !== -1){
          cantidadDeCombosAux[combos.indexOf(producto.nombre)] +=1
        }
      })      
    })
    return cantidadDeCombosAux
  }

 


  const combos = ["Combo 1", "Combo 2", "Combo 3", "Combo 4"]


  onMounted(async ()=>{
    isMounted.value = true
  })

  const dataChar = recorrerPedidos(props.pedidos)

  const data = {
    labels: combos,
    datasets: [
        {
          data: dataChar,
          backgroundColor: ['#5fc0ee', '#32c4b0', '#fe7096', '#ffd37d']
        },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Cantidad de Combos Pedidos",
      }
    }
}

  const { doughnutChartProps } = useDoughnutChart({
    chartData: data,
    options
  });
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