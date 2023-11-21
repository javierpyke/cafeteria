<template>   
    <div class="login">
        <div>
            <img src="../images/coffeestore.png" />
            <div class="password">Legajo: <InputText class="outer" type="text" v-model="usuario" /></div>
            <div class="password">Password: <Password class="outer" v-model="password" toggleMask :feedback="false" /></div>
            <v-btn variant="outlined" @click="entrar">Entrar</v-btn>
        </div>
    </div>
    
 </template>
 
 <script setup lang="ts">
 import { ref } from 'vue';
 import { useAuthStore } from '../stores/authStore';
 const store = useAuthStore()
 import axios from 'axios'
 import Password from 'primevue/password';
 import InputText from 'primevue/inputtext';

 
     const usuario = ref(null)
     const password = ref(null)
 
     const entrar = async ()=>{

    await store.login(usuario,password)
     }
 </script>
 
 <style scoped>
.password {
    margin: 10px;
}
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
  background-color: white;
  color: black;
  margin: auto;
}

.outer {
    border: solid 1px rgb(0, 0, 0);
}

.ancho {
    width: 500px;
}

.item {
    width: 400px;
    border: solid 1px red;
}

 
 </style>