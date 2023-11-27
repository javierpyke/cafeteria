<script setup>
/* Componente de la Barra de Navegacion */
  import { useAuthStore } from '../stores/authStore'
  const store = useAuthStore() 
</script>

<template>

    <div class="navBarDatos" v-if="store.hayUsuarioAutenticado">
        <div>
            <img src="../images/coffeestore.png" />
        </div>
        <div class="navBar">
            Usuario: <b>{{ store.getNombreUsuario() }}</b>{{ store.getTipoDeUsuario()}}
                <v-btn-group  v-if="store.getNivelDeUsuario()===1">
                    <v-btn variant="tonal" router-link to="/">Tomar Pedido</v-btn>
                </v-btn-group>
                
                <v-btn-group v-if="store.getNivelDeUsuario()===0">
                    <v-btn variant="tonal" router-link to="/">Tomar Pedido</v-btn>
                    <v-btn variant="tonal" router-link to="/pedidos">Pedidos</v-btn>
                    <v-btn variant="tonal" router-link to="/combos">Combos</v-btn>
                    <v-btn variant="tonal" router-link to="/balance">Balance</v-btn>
                </v-btn-group>
            
        </div>
        <v-btn variant="outlined" @click="store.cerrarSesion()">Cerrar Sesion</v-btn>
    
</div>
</template>

<style scoped>
    .navBar {
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
        align-items: center;
    }
</style>