

<template>

    <div class="d-flex flex-column mb-6">
      <BarraNavegacion />
      <div >
        <router-view></router-view>
      </div>
    </div>
      

  </template>
  
  <script setup>
  import BarraNavegacion from './components/BarraNavegacion.vue';
  import {useRouter} from 'vue-router'
  const router = useRouter()

  </script>
  
  <style scoped>
  </style>