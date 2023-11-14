import { defineStore} from 'pinia'
import {ref} from 'vue'

export const usePedidosStore = defineStore("pedidos",()=>{
    const pedidos = ref([])

    //action
    function agregarPedido(pedido)
    {
      pedidos.value.push(pedido)  
    }

    function eliminarPedido(pedido)
    {
      pedidos.value.splice(pedidos.value.indexOf(pedido), 1)
    }

    //getter
    const pedidosListado = () => pedidos.value

    //que exponemos
    return {agregarPedido, eliminarPedido,pedidosListado}

})