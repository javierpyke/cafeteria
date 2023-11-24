<template>
    <BarChart v-bind="barChartProps" />
</template>

<script setup>
  import {useRouter} from 'vue-router'
  import { BarChart, useBarChart } from 'vue-chart-3';
  import { Chart, registerables } from "chart.js";
  const router = useRouter()

  const props = defineProps({
  pedidos: Array
})
  const turnos = [8,9,10,11,12,13,14,15,16,17,18,19]

  /*function sacarData(pedidos){
    const data = turnos.map((turno) => ((pedidos.filter((pedido) => rangoHorario(pedido.fecha,turno))).length))
    return data
  }*/

  function sacarData(pedidos){
    var pedidosPorHorario = [0,0,0,0,0,0,0,0,0,0,0,0]
    pedidos.map((pedido) => {
      var hora = getHorario(pedido.fecha)
      if(turnos.indexOf(hora) !==-1){
        pedidosPorHorario[turnos.indexOf(hora)] +=1
      }
    })
    return pedidosPorHorario
  }

  function rangoHorario(fecha, hora){
    if(getHorario(fecha) >= hora && getHorario(fecha) < (hora+1)){
      return true
    } else {
      return false
    }
  }
  

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