<script setup>
/* Componente Hijo de Combos, muestra los datos del combo y permite su edicion */
  import { onMounted, ref } from 'vue';
  import axios from 'axios'

  const props = defineProps({
    combo: Object
  })

  function guardarCombo(combo){
    /* Guardo el combo con los nuevos valores */
    const nuevoCombo =
    {
      "nombre":combo.nombre,
      "tipo":combo.tipo,
      "precio":precio.value,
      "comida":comidaSelect.value,
      "bebida":bebidaSelect.value
    }
    fetch("http://localhost:8080/combo", {
          method: 'PUT',
          body: JSON.stringify(nuevoCombo),
          headers: {
              "Accept": "application/json",
              "Content-Type":"application/json"
          }
      })
  }
  
  const precio = ref(0)
  const comidas = ref([])
  const bebidas = ref([])
  const comidaSelect = ref({})
  const bebidaSelect = ref({})
  const isMounted = ref(false)
  
  onMounted(async ()=>{
    /* Obtengo los datos de los productos */
     const resultado = await axios("http://localhost:8080/productos")
     /* Obtengo las comidas */
     comidas.value = (resultado.data.filter((producto) => producto.tipo === 'comida'))
     /* Obtengo las bebidas */
     bebidas.value = (resultado.data.filter((producto) => producto.tipo === 'bebida'))
     /* Seteo la comida del combo */
     comidaSelect.value = props.combo.comida
     /* Seteo la bebida del combo */
     bebidaSelect.value = props.combo.bebida
     /* Seteo el precio del combo */
     precio.value = props.combo.precio
     isMounted.value = true
  })

  function itemProps (item) {
        return {
          title: item.nombre,
        }
      }
  
  </script>

<template>
  <td class="text-left">
    {{combo.nombre}}
  </td>
  <td>
    <v-select v-model="bebidaSelect" :items="bebidas" :item-props="itemProps" ></v-select>
  </td>
  <td class="text-right">
    <v-select v-model="comidaSelect" :items="comidas" :item-props="itemProps" ></v-select>
  </td>
  <td class="text-right">
    $ <input style="text-align: right;border: solid 1px black" type="number" v-model="precio" /> 
  </td>
  <td class="text-right">
    <v-btn density="compact" variant="tonal" color="success" @click="guardarCombo(combo)" >OK</v-btn>
  </td>
</template>