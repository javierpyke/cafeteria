<template>
  <div style="text-align:center;margin-top:50px;" v-if="isMounted">
    <v-card 
          class="mx-auto"
          max-width="75%"
         
          color="#BBDEFB"
            theme="dark"
        >
    <h3 style="color:black;margin-top:10px">Bebidas mas pedidas junto a la comida mas pedida</h3>
    <v-container class="caja">
      <div v-for="bebida in bebidas" :key="bebida.id">
        <BalanceFuturosCombosProducto :bebida=bebida />
      </div>
    </v-container>
    </v-card>
  </div>

</template>

<script setup>

  import { ref, onMounted } from 'vue'
  import BalanceFuturosCombosProducto from "./BalanceFuturosCombosProducto.vue"


  const props = defineProps({
    pedidos: Array
  })

  const combos = ["Combo 1", "Combo 2", "Combo 3", "Combo 4"]

  const isMounted = ref(false)
  const bebidas = ref ([])

  onMounted(async ()=>{
    /* Cuenta la cantidad de bebidas con sus respectivas comidas las ordena de mayor a menor
    y me quedo con las 3 mas pedidas */
    bebidas.value = contarProductosEnPedidos(props.pedidos).sort(ordenarProductos).slice(0,3)
    isMounted.value = true
  })
  
function ordenarProductos(producto1,producto2){
  if (producto1.cantidad > producto2.cantidad) {
    return -1;
  }
  if (producto1.cantidad < producto2.cantidad) {
    return 1;
  }
  return 0;
}

function contarProductosEnPedidos(pedidos){
  // Creo una lista vacia donde voy a guardar las bebidas con sus respectivas comidas
  let bebidasArray = []
  // Recorro la lista de pedidos y paso los productos de cada pedido a contarProductos
  const red = pedidos.map((ped) => contarProductos(ped.productos))

  // Recorro el listado obtenido por contarProductos
  red.map((r) => {
      // Recorro las bebidas y las agrego a la lista bebidasArray
      r.bebidas.map((beb) => agregarBebidaAListado(beb,r.comidas,bebidasArray))
  }) 
  return bebidasArray   
}   

function contarProductos(productos){
    // Creo dos arreglos vacios
    var bebidas = []
    var comidas = []

    // Recorro los productos del pedido
    productos.map((pro) => {
        // Creo un nuevo producto solo con la información que necesito del producto original
        var productoNuevo = {nombre:pro.nombre,cantidad:pro.cantidad}
        // Dependiendo que tipo de producto es, se agrega al arreglo correspondiente
        if(pro.tipo === 'bebida'){
            bebidas.push(productoNuevo)
        } else if (pro.tipo === 'comida'){
            comidas.push(productoNuevo)
        }
    })
  // Devuelvo el un objeto que tiene las listas
  return {bebidas,comidas}
} 

function agregarBebidaAListado(beb,comidas,bebidasArray){
  // Busco si la bebida ya se encuentra en bebidasArray
  var bebidaBuscada = bebidasArray.find((bebA) => bebA.nombre === beb.nombre)
  if(!bebidaBuscada){
    // Si no esta, agrego una copia
    bebidasArray.push(crearBebidaNueva(beb,comidas))
  } else {
    // Si esta, sumo la cantidad
    bebidaBuscada.cantidad += beb.cantidad
    // Recorro las comidas que fueron pedidas junto a la bebida para sumarlas a las ya existentes
    comidas.map((com) => agregarComidaABebida(bebidaBuscada,com) )    
  }
}

function crearBebidaNueva(beb,comidas){
  return {
    nombre:beb.nombre,
    cantidad:beb.cantidad,
    // Uso Object.assing para crear una copia del producto,
    // ya que el mismo producto puede estar en varias bebidas
    // con diferentes cantidades
    comidas:(comidas.map((com) => Object.assign({}, com)))
  }
}

function agregarComidaABebida(bebidaBuscada,com){
  // Busco si la comida ya se encuentra en la bebida
  var comidaBuscada = bebidaBuscada.comidas.find((comA) => comA.nombre === com.nombre)
  if(!comidaBuscada){
    // Si no esta agrego una copia del producto
    bebidaBuscada.comidas.push(Object.assign({}, com))
  } else {
    // Si esta sumo las cantidades
    comidaBuscada.cantidad += com.cantidad
  }  
}
</script>
  
  <style scoped>
    .caja {
    width:100%;
    display:flex;
    flex-direction:row;

    justify-content: space-around;
  }
  </style>