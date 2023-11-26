<script setup>
  import {ref} from 'vue'
  import { useCarritoStore } from '../stores/carrito';
  import ProductoEnCarrito from './ProductoEnCarrito.vue';
  const carrito = useCarritoStore()
  import {useRouter} from 'vue-router'
  const router = useRouter()
  const { productosEnCarrito,totalEnCarrito } = carrito


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
  <h2>Resumen</h2>
  <div class="resumen">
      <h2>TOTAL: $ {{ totalEnCarrito() }}</h2>
      <p class="resumen">Forma de pago:</p>
      <div>

      <input type="radio" id="efectivo" value="efectivo" v-model="formaDePago">
      <label class="label" for="efectivo">Efectivo</label>

      <input type="radio" id="debito" value="debito" v-model="formaDePago">
      <label class="label" for="debito">Debito</label>

      <input type="radio" id="mp" value="mp" v-model="formaDePago">
      <label class="label" for="mp">MercadoPago</label>

      <input type="radio" id="credito" value="credito" v-model="formaDePago">
      <label class="label" for="credito">Credito</label>
    
    </div>
    <v-btn  color="success" @click="confirmarPedido
    ">CONFIRMAR</v-btn>
  </div>  
    <v-table class="resumen">
      <thead>
        <tr>
          <th class="col1">
            Producto
          </th>
          <th class="col2">
            Precio Un
          </th>
          <th class="col3">
            Cant
          </th>
          <th class="col4">
            Total
          </th>
          <th class="col5">
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productosEnCarrito()" :key="producto.id"        >
          <ProductoEnCarrito :producto=producto></ProductoEnCarrito>
        </tr>
      </tbody>
    </v-table>
    
</template>

<style scoped>
.col1 {
  width: 25%;
}

.col2 {
  width: 20%;
}

.col3 {
  width: 1%;
}

.col4 {
  width: 25%;
}

.col5 {
  width: 30%;
}
  .label {
    margin: 5px;
  }

  h2, h3 {
    color: black;
    text-align: center;

  }

  .resumen {
    color:black;
    font-size: 11px;
    text-align: center;
  }

</style>