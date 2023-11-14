<template>
	<CanvasJSChart :options="options"/>
</template>

<script setup lang="ts">

  const props = defineProps({
    pedidos: Array
  })

  function totalCompras(pedidos){
    return pedidos.reduce((acumulador, pedido) => acumulador + total(pedido.productos), 0)
  }

  function total(productos){
    return productos.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0)
  }

  const fechaActual = new Date()

  const mesActual =  fechaActual.getMonth()
  const anioActual = fechaActual.getFullYear()

  const formasDePago = ['efectivo','debito','mp','credito']

  const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']


  const mesesAct = cortarMeses(meses)

  function cortarMeses(meses){
    var inicio = (mesActual-3)<0?0:(mesActual-3)

    return meses.slice(inicio, mesActual+1)
  }

  
  function pedidosPorFormaDePago(pedidos){
    var r = formasDePago.map((fdp) => pedidosPorMes(pedidos.filter((p) => p.formaDePago === fdp ),fdp))
    return r
  }

  function pedidosPorMes(pedidosPorFP,fdp){
    var r = mesesAct.map((mes,x) => {
      var resultado = {y:0,label:''}
      resultado.y = totalCompras(pedidosPorFP.filter((p) => new Date(p.fecha).getMonth() === x))
      resultado.label = mes
      return resultado
    })
    var rr = {formaDePago:fdp,meses:r}
    return rr
  }

  const resultados = pedidosPorFormaDePago(props.pedidos)


  const colores = ["#FFD700", "#FFA07A", "#90EE90", "#D2B48C", "#B0C4DE", "#FFB6C1"]


  const dataG = resultados.map((res,x) => {
    return {
            type: "stackedColumn",
            showInLegend: true,
            name: res.formaDePago,
            color: colores[x],
            dataPoints: res.meses
          }
        })

  const options = {
        animationEnabled: true,
        title:{
		  text: "Total recaudado por Metodo de Pago en los últimos meses"
        },
        data: dataG,
        
      }

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