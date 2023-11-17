<template>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Caja
          </th>
          <th class="text-left">
            Cantidad
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left">
            Efectivo
          </td>
          <td>
            $ {{dineroEnCaja[metodosDePago.indexOf('efectivo')]}}
          </td>
        </tr>
        <tr>
          <td class="text-left">
            Debito
          </td>
          <td>
            $ {{dineroEnCaja[metodosDePago.indexOf('debito')]}}
          </td>
        </tr>
        <tr>
          <td class="text-left">
            Mercado Pago
          </td>
          <td>
            $ {{dineroEnCaja[metodosDePago.indexOf('mp')]}}
          </td>
        </tr>
        <tr>
          <td class="text-left">
            Credito
          </td>
          <td>
            $ {{dineroEnCaja[metodosDePago.indexOf("credito")]}}
          </td>
        </tr>
      </tbody>
    </v-table>
</template>

<script setup>
  import {useRouter} from 'vue-router'
  import { onMounted, ref } from 'vue';
  const router = useRouter()

  function totalCompras(pedidos){
    return pedidos.reduce((acumulador, pedido) => acumulador + total(pedido.productos), 0)
  }

  function total(productos){
    return productos.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0)
  }

  const props = defineProps({
    pedidos: Array,
})

  const dineroEnCaja = ref([])
  const isMounted = ref(false)

  const metodosDePago = ['efectivo','debito','mp','credito']

  function recorrerPedidos(pedidos){
    var dineroEnCajaAux = [0,0,0,0]
    pedidos.map((pedido) => {
      if(correspondeDia(new Date(pedido.fecha))){
        console.log(pedido.formaDePago)
        dineroEnCajaAux[metodosDePago.indexOf(pedido.formaDePago)] += total(pedido.productos)
      }
    })
    return dineroEnCajaAux
  }

  onMounted(async ()=>{
     dineroEnCaja.value = recorrerPedidos(props.pedidos)
     isMounted.value = true
  })

  function correspondeDia(fecha){
    const hoy = new Date()
    return ( mismoAnio(fecha,hoy) && mismoMes(fecha,hoy) && mismoDia(fecha,hoy))
  }

  function mismoAnio(fecha,hoy){
    return (fecha.getFullYear() === hoy.getFullYear())
  }

  function mismoMes(fecha,hoy){
    return (fecha.getMonth() === hoy.getMonth())
  }

  function mismoDia(fecha,hoy){
    return (fecha.getDate() === hoy.getDate())
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