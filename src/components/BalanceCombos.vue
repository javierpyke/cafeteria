<template>
  <DoughnutChart v-bind="doughnutChartProps" />
</template>

<script setup lang="ts">
  import { LineChart, useLineChart } from "vue-chart-3";
  import { DoughnutChart, useDoughnutChart } from 'vue-chart-3';
  import { Chart, registerables } from "chart.js";

  Chart.register(...registerables);

  const props = defineProps({
    pedidos: Array
  })

  const combos = ["Combo 1", "Combo 2", "Combo 3", "Combo 4"]

  function sacarProductos(pedido,productoNombre){
  const pro = pedido.productos.filter((producto) => producto.nombre === productoNombre)
  return pro.length
}

  function sacarData(pedidos){
    const data = combos.map((combo) => (pedidos.map((pedido) => sacarProductos(pedido,combo))).reduce((a, b) => a + b, 0))
    return data
  }

  const dataChar = sacarData(props.pedidos)

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