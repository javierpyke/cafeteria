<template>
  <div v-for="bebida in bebidasArray" :key="bebida.id">
    <BalanceFuturosCombosProducto :bebida=bebida />
  </div>

</template>

<script setup>

  import { ref, onMounted } from 'vue'
  import  axios  from 'axios'
import BalanceFuturosCombosProducto from "./BalanceFuturosCombosProducto.vue"


  const props = defineProps({
    pedidos: Array
  })

  const combos = ["Combo 1", "Combo 2", "Combo 3", "Combo 4"]

  function sacarProductos(pedido,productoNombre){
  const pro = pedido.productos.filter((producto) => producto.nombre === productoNombre)
  return pro.length
}

  function sacarData(pedidos){
    const data = combos.map((combo) => (pedidos.map((pedido) => sacarProductos(pedido,combo))).reduce((a, b) => a + b, 0))
    return data
  }

  const dataChar = sacarData(props.pedidos)


  const isMounted = ref(false)
  const bebidas = ref ([])

  onMounted(async ()=>{
    const resultado = await axios("https://www.mockachino.com/36f87b30-0846-40/productos")
    bebidas.value = (resultado.data.productos).filter((pro) => pro.tipo === 'bebida')
    isMounted.value = true

    /*props.pedidos.map((ped) => {
      contarProductos(ped.productos)     

    })*/
  })

  var bebidasArray = []


  function contarProductosEnPedidos(pedidos){
    pedidos.map((ped) => contarProductos(ped.productos))
  
  }    

  function contarProductos(productos){

    let comidas = []
    let bebidas = []

   
    productos.map((pro) => {
     
      if(pro.tipo === 'bebida'){
       
        let beb = {}
        beb = {nombre: pro.nombre,cantidad:pro.cantidad}
        bebidas.push(beb)
      } else if(pro.tipo === 'comida'){

        let com = {}
        com = {nombre: pro.nombre,cantidad:pro.cantidad}

        comidas.push(com)
       

      }

    })
    

    console.log(bebidas)
    bebidas.map((beb) => {
     
      var bebidaEnArray = bebidasArray.filter((bebidaEnArray) => bebidaEnArray.nombre === beb.nombre)

      console.log(beb)
      if(bebidaEnArray.length === 0){
        beb["comidas"] = [...comidas]
        bebidasArray.push(beb)
      } else {
        bebidaEnArray[0].cantidad += beb.cantidad
        comidas.map((com) => {
          var comidaEnArray = bebidaEnArray[0].comidas.filter((comidaEnArray) => com.nombre === comidaEnArray.nombre)
          if(comidaEnArray.length === 0){
            
            bebidaEnArray[0].comidas.push(com)
          } else {
            comidaEnArray[0].cantidad += com.cantidad
          }
        })
      }
    
    })
    
  }

  const pedidos2 = props.pedidos.slice(1,4)


  //contarProductosEnPedidos(props.pedidos)
  contarProductosEnPedidos(props.pedidos.slice(1,4))


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