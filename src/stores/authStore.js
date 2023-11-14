import {defineStore} from 'pinia'
import {ref,computed} from 'vue'
import axios from 'axios'
import {useRouter} from 'vue-router'

export const useAuthStore = defineStore('auth',()=>{
const usuario = ref(null)
const router = useRouter()

    //es un action
    async function login(legajo,password){

        const response = await axios.get("https://www.mockachino.com/36f87b30-0846-40/usuarios")
        const usuarios = response.data.usuarios
        const user = parseInt(legajo.value)
        const usuarioBuscado = usuarios.filter((usuario) => usuario.legajo === user)[0]


        if(usuarioBuscado.password === password.value){

          usuario.value = usuarioBuscado
        
        }

        router.push("/")
        //
    }

    //es un getters
    const hayUsuarioAutenticado = computed(()=> usuario.value != null)

    function getNombreUsuario(){
        return `${usuario.value.nombre} ${usuario.value.apellido}`
    }

    function getNivelDeUsuario(){
      return usuario.value.nivel
  }

    function getTipoDeUsuario(){
      return usuario.value.nivel===0?"Administrador":"Vendedor"
  }

  function cerrarSesion(){
    usuario.value = null
    router.push("/login")
  }

    return { login, hayUsuarioAutenticado, getNombreUsuario,getNivelDeUsuario,getTipoDeUsuario,cerrarSesion }
})