<script setup >
  /* Componente hijo de BalanceFuturosCombos, muestra la bebida con la cantidad de veces pedida
  junto a la comida mas pedida y su cantidad */
  import {ref,onMounted} from 'vue'

  const comida = ref({})

  onMounted(async ()=>{
    /* Ordena la comidas y me quedo con la mas pedida */
     comida.value = props.bebida.comidas.sort(ordenarProductos)[0]
  })


const props = defineProps({
    bebida: Object,
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

</script>

<template>
  <v-card
        class="mx-auto"
        width="200"
        color="#C5CAE9"
          theme="dark"
      >
        <v-card-item>
          <div>
            <div class="text-overline mb-1">
              Total: {{ bebida.cantidad }}
            </div>
            <div class="text-h6 mb-1">
              {{ bebida.nombre }}
            </div>
            <div class="text-caption">Combina con:</div>
            <div class="text-caption">{{ comida.nombre }}</div>
            <div class="text-caption">Total: {{  comida.cantidad }}</div>
          </div>
        </v-card-item>
      </v-card>
</template>