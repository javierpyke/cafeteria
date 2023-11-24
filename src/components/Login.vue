<template>   
    <div class="login">
        <div class="caja">
            <div class="imgagen">
                <div style="text-align: center;">
                    <img src="../images/coffeestore.png" />
                </div>
            </div>
            <div class="labels">
                <div style="margin-right: 10px;">
                    <div>Legajo:</div>
                    <div style="margin-top:5px">Password:</div> 
                </div>

                <div class="inputs">
                    <InputText class="outer" type="text" v-model="usuario" />
                    <Password style="margin-top:5px" class="outer" v-model="password" :feedback="false" />            
                </div>
            </div>
            <div style="text-align: center;">
                <v-btn style="margin-top:5px" color="success"  @click="entrar">Entrar</v-btn>
            </div>
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


.caja {
    padding: 10px;
    background-color: rgb(196, 196, 196);
    border: 1px solid black;
    border-radius: 10px;

}
 .inputs{
    display:flex;
    flex-direction: column;

 }

 .labels{
    display:flex;
    flex-direction: row;

 }
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