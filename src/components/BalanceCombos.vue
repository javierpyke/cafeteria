<template>
  <DoughnutChart v-bind="doughnutChartProps" />
</template>

<script setup lang="ts">
  import { DoughnutChart, useDoughnutChart } from 'vue-chart-3';
  import { onMounted, ref } from 'vue';

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


  const dataChar = recorrerPedidos(props.pedidos)

  const data = {
    labels: combos,
    datasets: [
        {
          data: dataChar,
          backgroundColor: ['#FFCCBC', '#C5E1A5', '#80DEEA', '#7986CB']
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
  </style>