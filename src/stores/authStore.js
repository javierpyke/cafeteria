import {defineStore} from 'pinia'
import {ref,computed} from 'vue'
import axios from 'axios'
import {useRouter} from 'vue-router'

export const useAuthStore = defineStore('auth',()=>{
const usuario = ref(null)
const router = useRouter()
const pathNivel1 = ['','login','tomarPedido']

    //es un action
    async function login(legajo,password){

        const response = await axios.get("http://localhost:8080/usuarios")
        
        const usuarios = response.data
        const user = parseInt(legajo.value)
        const usuarioBuscado = usuarios.filter((usuario) => usuario.legajo === user)[0]

        if(!usuarioBuscado || (usuarioBuscado.password !== password.value)){
          return {error:'Usuario o clave invalida'}
        
        }
        usuario.value = usuarioBuscado
        
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

  function canUserAccess(to){
    var autorizado = false

    if(usuario.value.nivel===0 || pathNivel1.indexOf(to.path.slice(1))!==-1){
      autorizado = true
    }

    return autorizado
  }

    return { login, hayUsuarioAutenticado, getNombreUsuario,getNivelDeUsuario,getTipoDeUsuario,cerrarSesion, canUserAccess}
})