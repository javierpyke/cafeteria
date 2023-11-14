<script setup>
  import {ref} from 'vue'
  import { useCarritoStore } from '../stores/carrito';
  import ProductoEnCarrito from './ProductoEnCarrito.vue';
  const carrito = useCarritoStore()
  const { agregarItem, eliminarItem, productosEnCarrito,totalEnCarrito,borrarTodo } = carrito


defineProps({
    producto: Object,
})

function diaDeHoy(){
  const fecha = new Date()
  const fech = fecha.toISOString()
  const dia = fech.substr(8,2)
  const mes = fech.substr(5,2)
  const anio = fech.substr(0,4)
  const hora = fech.substr(11,8)

  return `${mes}/${dia}/${anio} ${hora}`
}


function confirmarPedido(){
  const fecha = diaDeHoy()
  const pedido = {
    productos:productosEnCarrito(),
    fecha:fecha,
    formaDePago:formaDePago.value
  }

  guardarTodo(pedido)
}

function actualizar(){
  carrito.borrarTodo()
  router.push("/")
}


function guardarTodo(pedido){
      fetch("http://localhost:8080/pedido", {
          method: 'POST',
          body: JSON.stringify(pedido),
          headers: {
              "Accept": "application/json",
              "Content-Type":"application/json"
          }
      })
          .then(res => res.json())
      actualizar()
  }


const formaDePago = ref('efectivo')

</script>

<template>
  <h5>Resumen</h5>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Producto
          </th>
          <th class="text-left">
            Precio Un
          </th>
          <th class="text-left">
            Cant
          </th>
          <th class="text-left">
            Total
          </th>
          <th class="text-left">
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productosEnCarrito()" :key="producto.id"        >
          <ProductoEnCarrito :producto=producto></ProductoEnCarrito>
        </tr>
      </tbody>
    </v-table>

    <h3>TOTAL: $ {{ totalEnCarrito() }}</h3>
    <p>Forma de pago: {{ formaDePago }}</p>
    <v-radio-group v-model="formaDePago"
      inline
    >
      <v-radio
        label="Efectivo"
        value="efectivo"
      ></v-radio>
      <v-radio
        label="Debito"
        value="debito"
      ></v-radio>
      <v-radio
        label="MercadoPago"
        value="mp"
      ></v-radio>
      <v-radio
        label="Credito"
        value="credito"
      ></v-radio>
    </v-radio-group>

    <v-btn color="success" @click="confirmarPedido
    ">CONFIRMAR</v-btn>
</template>

<style scoped>
</style>