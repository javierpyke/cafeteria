<script setup lang="ts">
/* Componente Padre, permite el ingreso al sistema */
import { useAuthStore } from '../stores/authStore';
import { ref } from 'vue';

import Password from 'primevue/password';
import InputText from 'primevue/inputtext';

const store = useAuthStore()

const usuario = ref(null)
const password = ref(null)
const errorLogin = ref(false)
const errorMsg = ref('')

const entrar = async ()=>{
    /* Verifico que los datos sean correctos */
    const error = await store.login(usuario,password)
    /* Si hay algun error lo muestro debajo de los inputs */
    if(error){
        errorLogin.value = true
        errorMsg.value = error.error
        /* Limpio los datos de los inputs */
        usuario.value = null
        password.value = null
    }        
}    
</script>


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
                <v-btn style="margin:5px" color="success"  @click="entrar">Entrar</v-btn>
                <p style="color:rgb(212, 0, 0)" v-if="errorLogin">{{ errorMsg }}</p>
            </div>
            
        </div>
    </div>
    
    
 </template>
 
 <style scoped>


.caja {
    padding: 10px;
    border: 1px solid rgb(192, 192, 192);
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

  justify-content: center;
  padding: 50px;
  background-color: white;
  color: black;


}

.outer {
    border: solid 1px rgb(163, 163, 163);
}



 
 </style>