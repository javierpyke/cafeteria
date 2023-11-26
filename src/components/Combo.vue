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

<script setup>
  import { onMounted, ref } from 'vue';
  import axios from 'axios'

  const props = defineProps({
    combo: Object
  })

  function guardarCombo(combo){
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
     const resultado = await axios("http://localhost:8080/productos")
     comidas.value = (resultado.data.filter((producto) => producto.tipo === 'comida'))
     bebidas.value = (resultado.data.filter((producto) => producto.tipo === 'bebida'))
     comidaSelect.value = props.combo.comida
     bebidaSelect.value = props.combo.bebida
     precio.value = props.combo.precio
     isMounted.value = true
  })

  function itemProps (item) {
        return {
          title: item.nombre,
        }
      }
  
  </script>
  
  <style scoped>
  </style>