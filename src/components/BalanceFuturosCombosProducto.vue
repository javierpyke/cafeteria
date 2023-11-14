<template>
    <p>{{ bebida.nombre }} - {{ bebida.cantidad }} - Combina con: {{ bebida.comidas[0].nombre }} - {{ bebida.comidas[0].cantidad }}
    </p>
  </template>

  <script setup >
  import {ref} from 'vue'
const props = defineProps({
    bebida: Object
  })



  const nombre = ref("")

</script>