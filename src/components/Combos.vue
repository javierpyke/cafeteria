<script setup>
/* Componente Padre, obtengo los datos de los combos
y se lo paso al componente hijo Combo */
  import { onMounted, ref } from 'vue';
  import Combo from './Combo.vue';
  import axios from 'axios'
  
  const combos = ref([])
  const isMounted = ref(false)
  
  onMounted(async ()=>{
    /* Obtengo los combos */
     const resultado = await axios("http://localhost:8080/combos")
     combos.value = resultado.data
     isMounted.value = true
  })
</script>

<template>
  <div style="width: 75%;margin:auto" v-if="isMounted">
    <v-table>
      <thead>
        <tr>
          <th style="width: 10%;" class="text-left">
            Combo
          </th>
          <th style="width: 30%;" class="text-left">
            Bebida
          </th>
          <th style="width: 35%;" class="text-left">
            Comida
          </th>
          <th style="width: 25%;" class="text-center">
            Precio
          </th>
          <th style="width: 10%;" class="text-right">

          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="combo in combos"
          :key="combo.id"
        >
          <Combo :combo="combo" />
        </tr>
      </tbody>
    </v-table>
  </div>
</template>