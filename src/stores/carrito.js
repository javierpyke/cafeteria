import { defineStore} from 'pinia'
import {ref} from 'vue'

export const useCarritoStore = defineStore("carrito",()=>{
    const carrito = ref([])

    //action
    function agregarItem(producto)
    {
      if(carrito.value.indexOf(producto) != -1){
        agregarCantidad(producto)
      } else {
        producto.cantidad = 1
        carrito.value.push(producto)
      }    
    }

    function agregarCantidad(producto){
        carrito.value[carrito.value.indexOf(producto)].cantidad += 1
    }

    function eliminarCantidad(producto){
        if(carrito.value[carrito.value.indexOf(producto)].cantidad === 1){
            eliminarItem(producto)
        } else {
            carrito.value[carrito.value.indexOf(producto)].cantidad -= 1
        }
    }

    function eliminarItem(producto)
    {
      carrito.value.splice(carrito.value.indexOf(producto), 1)
    }

    //getter
    const productosEnCarrito = () => carrito.value

    const borrarTodo = () => carrito.value = []

    const totalEnCarrito = () =>
    {
        const valorInicial = 0;
        const total = carrito.value.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), valorInicial);
        return total
    }
    //que exponemos
    return {borrarTodo,agregarItem,productosEnCarrito, eliminarItem,totalEnCarrito,agregarCantidad,eliminarCantidad}

})