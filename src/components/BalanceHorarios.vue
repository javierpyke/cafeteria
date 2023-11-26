<template>
    <BarChart v-bind="barChartProps" />
</template>

<script setup>
  import { BarChart, useBarChart } from 'vue-chart-3';
  import { Chart, registerables } from "chart.js";

  const props = defineProps({
  pedidos: Array
})
  /* Armo array con los turnos */
  const turnos = [8,9,10,11,12,13,14,15,16,17,18,19]


  function sacarData(pedidos){
    var pedidosPorHorario = [0,0,0,0,0,0,0,0,0,0,0,0]
    /* Recorro los pedidos */
    pedidos.map((pedido) => {
      /* Saco la hora del pedido */
      var hora = getHorario(pedido.fecha)
      /* Saco el indice del array turnos con la hora del pedido*/
      if(turnos.indexOf(hora) !==-1){
        /* sumo 1 en pedidosPorHorario en la posicion que le corresponde al turno */
        pedidosPorHorario[turnos.indexOf(hora)] +=1
      }
    })
    /* Retorno el array */
    return pedidosPorHorario
  }
 

    /* Extraigo la informacion */
  const pedidosTurno = sacarData(props.pedidos)


  function getHorario(string){
    return new Date(string).getHours()
  }


Chart.register(...registerables);



const options = {
    plugins: {
      legend: {
        display: true,
        position: "top",
      }
}
}


const data = {
  labels: turnos,
  datasets: [
      {
        data: pedidosTurno,
        label:"Pedidos por horario",
        backgroundColor: ['#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9',
                          '#C5CAE9', '#BBDEFB', '#B2DFDB', '#FFE0B2',
                          '#FFCCBC', '#FFECB3', '#DCEDC8', '#B3E5FC']
      },
  ],
};

const { barChartProps } = useBarChart({
  chartData: data,
  options
});
</script>

  
  <style scoped>
  </style>