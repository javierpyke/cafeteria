<template>
   <DoughnutChart v-bind="doughnutChartProps" /> 
</template>

<script setup lang="ts">
  import { DoughnutChart, useDoughnutChart } from 'vue-chart-3';

  const props = defineProps({
    pedidos: Array,
    combos: Array
  })


  /* Funcion que devuelve true o false si dos combos tienen la misma comida o bebida" */
  function mismoCombo(combo1,combo2){
    return( combo1.bebida.nombre === combo2.bebida.nombre && combo1.comida.nombre === combo2.comida.nombre)
  }

  /* Funcion que devuelve el indice en la lista combos de un combo pasado por parametro.
  Chequea que el combo tenga el mismo nombre, la misma comida y la misma bebida
  Si no esta devuelve -1 */
  function indiceCombo(combo){
    let indice = -1
    for (var i = 0; i < props.combos.length; i++) {
      let comboAct = props.combos[i]
      if(combo.nombre === comboAct.nombre && mismoCombo(combo,comboAct)){
        return i
      }
    }
  return indice
}

  /* Devuelve un array con la cantidad de combos segun los pedidos pasados por parametros */
  /* [cantidad Combo 1, Cantidad Combo 2,cantidad Combo 3, Cantidad Combo 4] */
  function recorrerPedidos(pedidos){
    console.log(props.combos)
    
    /* Inicio un array donde guardare las cantidad de combos pedidos */
    /* [cantidad Combo 1, Cantidad Combo 2,cantidad Combo 3, Cantidad Combo 4] */
    var cantidadDeCombosAux = [0,0,0,0]
    /* Recorro los pedidos */
    pedidos.map((pedido) => {
      /* Recorro los productos */
      pedido.productos.map((producto) => {
        /* Reviso si el producto es algun combo */
        if(producto.tipo === "combo" )
        {
          /* Busco cual es el indice que le corresponde al combo segun el array de combos */

          let indice = indiceCombo(producto)
          if(indice !== -1){
            cantidadDeCombosAux[indice] +=1              
          }
        }
      })      
    })
    /* Retorno el array */
    return cantidadDeCombosAux
  }

  const dataChar = recorrerPedidos(props.pedidos)
 
  const data = {
    labels: ["Combo 1","Combo 2","Combo 3","Combo 4"],
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