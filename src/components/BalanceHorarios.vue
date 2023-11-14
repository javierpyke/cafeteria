<template>
    <!--<v-table>
      <thead>
        <tr>
          <th class="text-left">
            Horario
          </th>
          <th class="text-left">
            
          </th>
          <th class="text-left">
            Cantidad
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left">
            8 a 10 hs
          </td>
          <td class="text-left">
            8 a 10 hs
          </td>
          <td>
            {{(pedidos.filter((pedido) => rangoHorario(pedido.fecha,8,10))).length}}
          </td>
        </tr>
        <tr>
          <td class="text-left">
            10 a 12 hs
          </td>
          <td class="text-left">
            8 a 10 hs
          </td>
          <td>
            {{(pedidos.filter((pedido) => rangoHorario(pedido.fecha,10,12))).length}}
          </td>
        </tr>
        <tr>
          <td class="text-left">
            12 a 14 hs
          </td>
          <td class="text-left">
            8 a 10 hs
          </td>
          <td>
            {{(pedidos.filter((pedido) => rangoHorario(pedido.fecha,12,14))).length}}
          </td>
        </tr>
        <tr>
          <td class="text-left">
            14 a 16 hs
          </td>
          <td class="text-left">
            8 a 10 hs
          </td>
          <td>
            {{(pedidos.filter((pedido) => rangoHorario(pedido.fecha,14,16))).length}}
          </td>
        </tr>
        <tr>
          <td class="text-left">
            16 a 18 hs
          </td>
          <td class="text-left">
            8 a 10 hs
          </td>
          <td>
            {{(pedidos.filter((pedido) => rangoHorario(pedido.fecha,16,18))).length}}
          </td>
        </tr>
        <tr>
          <td class="text-left">
            18 a 20 hs
          </td>
          <td class="text-left">
            8 a 10 hs
          </td>
          <td>
            {{(pedidos.filter((pedido) => rangoHorario(pedido.fecha,18,20))).length}}
          </td>
        </tr>
      </tbody>
    </v-table>-->
    <RadarChart v-bind="radarChartProps" />

</template>

<script setup>
  import {useRouter} from 'vue-router'
  import { RadarChart, useRadarChart } from 'vue-chart-3';
  import { Chart, registerables } from "chart.js";
  const router = useRouter()

  
  const turnos = [8,9,10,11,12,13,14,15,16,17,18,19]

  function sacarData(pedidos){
    const data = turnos.map((turno) => ((pedidos.filter((pedido) => rangoHorario(pedido.fecha,turno))).length))
    return data
  }

  function rangoHorario(fecha, hora){
    if(getHorario(fecha) >= hora && getHorario(fecha) < (hora+1)){
      return true
    } else {
      return false
    }
  }
  
  const props = defineProps({
  pedidos: Array
})
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
      },
      title: {
        display: true,
        text: "Pedidos por horario",
      },
    },
    scales: {
        r: {
            angleLines: {
                display: false
            },
            suggestedMin: 50,
            suggestedMax: 100
        }
    }
}



const data = {
  labels: turnos,
  datasets: [
      {
        data: pedidosTurno,
        backgroundColor: ['#5fc0ee', '#32c4b0', '#fe7096', '#ffd37d']
      },
  ],
};

const { radarChartProps } = useRadarChart({
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