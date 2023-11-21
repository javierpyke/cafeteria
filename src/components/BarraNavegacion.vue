<template>

        <div class="navBarDatos" v-if="store.hayUsuarioAutenticado">
            <div>
                <img src="../images/coffeestore.png" />
            </div>
            <div class="navBar">
                Usuario: {{ store.getNombreUsuario() }} - {{ store.getTipoDeUsuario()}}
                <v-btn-group class="botones">
                    <v-btn variant="tonal" ><router-link to="/">Tomar Pedido</router-link></v-btn>
                    <v-btn-group v-if="store.getNivelDeUsuario()===0">
                        <v-btn variant="tonal" to="/pedidos">Pedidos</v-btn>
                        <v-btn variant="tonal" ><router-link to="/productos">Productos</router-link></v-btn>
                        <v-btn variant="tonal" ><router-link to="/combos">Combos</router-link></v-btn>
                        <v-btn variant="tonal" ><router-link to="/balance">Balance</router-link></v-btn>
                    </v-btn-group>
                </v-btn-group>
            </div>
            <v-btn @click="store.cerrarSesion()">Cerrar Sesion</v-btn>
        
    </div>
</template>

<script setup>
  import { useAuthStore } from '../stores/authStore'
  const store = useAuthStore() 
</script>

<style scoped>
    .navBar {
        vertical-align:middle;
        background-color: burlywood;
        display: flex;
        flex-direction: column;
        padding: 1rem 0 0 0;
        text-align: center;     

    }
    .navBarDatos {
        background-color: burlywood;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        border-bottom: 5px solid black;
    }
    .botones {
        align-content: center;
    }
</style>