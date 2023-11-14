<template>
    CoffeeStore
    <div v-if="store.hayUsuarioAutenticado">
        <div>
            Usuario: {{ store.getNombreUsuario() }} - {{ store.getTipoDeUsuario()}} <v-btn @click="store.cerrarSesion()">Cerrar Sesion</v-btn>
        </div>
        <v-sheet class="ma-2 pa-2">
            <v-btn-group>
                <v-btn variant="tonal" ><router-link to="/">Tomar Pedido</router-link></v-btn>
                <v-btn-group v-if="store.getNivelDeUsuario()===0">
                    <v-btn variant="tonal" ><router-link to="/pedidos">Pedidos</router-link></v-btn>
                    <v-btn variant="tonal" ><router-link to="/productos">Productos</router-link></v-btn>
                    <v-btn variant="tonal" ><router-link to="/combos">Combos</router-link></v-btn>
                    <v-btn variant="tonal" ><router-link to="/balance">Balance</router-link></v-btn>
                </v-btn-group>
            </v-btn-group>
        </v-sheet>
    </div>
</template>

<script setup>
  import { useAuthStore } from '../stores/authStore'
  const store = useAuthStore()
    
  </script>