<template>
	<CanvasJSChart :options="options"/>
</template>

<script setup lang="ts">

  const props = defineProps({
    pedidos: Array
  })

const fechaActual = new Date()

const mesActual =  fechaActual.getMonth()
const anioActual = fechaActual.getFullYear()

const formasDePago = ['efectivo','debito','mp','credito']

const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']


const mesesAct = cortarMeses(meses)

/* Funcion que devuelve los ultimos 4 meses.
En caso de principio de año devuelve los primeros meses */
function cortarMeses(meses){
  var inicio = (mesActual-3)<0?0:(mesActual-3)

  return meses.slice(inicio, mesActual+1)
}

/* Crea objeto para cargar informacion segun los meses para pasar al grafico */
function crearArregloMeses () {
    return mesesAct.map((mes,i) => {
        var arreglo = {y:0, label:mes,x:i}
        return arreglo
    })
}


/* Crea objeto para cargar informacion segun las formas de pago para pasar al grafico */
function crearArregloFDP () {
     return formasDePago.map((fdp) => {
        var arreglo = {formaDePago:fdp, meses:crearArregloMeses()}
        return arreglo
    })
}

/* Devuelve el total de plata de los productos */
function totalProductos(productos){
    return productos.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0)
  }


function recorrerPedidos(pedidos){
    var total = crearArregloFDP()
    /* Recorro los pedidos */
    pedidos.map((pedido) => {
        /* Obtengo la fecha del pedido*/
        var fechaPedido = new Date(pedido.fecha)
        /* Obtengo el año */
        var anioPedido = fechaPedido.getFullYear()
        if(anioPedido === anioActual){
            /* Obtengo el indice segun la forma de pago del pedido */
            var formaDePagoIndice = formasDePago.indexOf(pedido.formaDePago)
            /* Obtengo el indice segun el mes del pedido */
            var mesInidice = mesesAct.indexOf(meses[new Date(pedido.fecha).getMonth()])
            if( mesInidice != -1){
              /* Sumo 1 en el arreglo segun la forma de pago y el mes */
              total[formaDePagoIndice].meses[mesInidice].y += totalProductos(pedido.productos)
            }
        }
        
    })
    return total
}

const resultados = recorrerPedidos(props.pedidos)

  const colores = ["#EF9A9A", "#80CBC4", "#81D4FA", "#90A4AE"]


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

  </style>