import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const modelo = "usuario";

export const useStoreUsuarios = defineStore(
  modelo,
  () => {
    const validacion = ref("");
    const estatus = ref("");
    const token = ref("");
    const rol = ref("");
    const usuario = ref("");
    const nombre = ref("");
    const email = ref("");
    const id = ref("");
    const router = useRouter();
    const correoRecuperar = ref("");
    const codigoCorreo = ref("");

    function insertarToken() {
      axios.defaults.headers.common["x-token"] = token.value;
    }

    const getAll = async () => {
      try {
        insertarToken();
        const response = await axios.get(`${modelo}/all`);
        /* console.log(response); */
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.log(error);
        estatus.value = error.response.status;
      }
    };

    const getById = async (id) => {
      try {
        const response = await axios.get(`${modelo}/${id}`);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al obtener el usuario", error);
        estatus.value = error.response?.status || 500;
        validacion.value = error.response?.data?.error || "Error al obtener el registro";
      }
    };

    const getDatosCliente = async (idUsuario) => {
      try {
        insertarToken();
        const response = await axios.get(`${modelo}/datos-usuario/${idUsuario}`);
        /* console.log(response); */
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.log(error);
        estatus.value = error.response.status;
      }
    };

    const codigoRecuperar = async (correo) => {
      try {
        const response = await axios.get(
          `${modelo}/codigo-recuperar/${correo}`
        );
        email.value = correo;
        estatus.value = response.status;
        return response;
      } catch (error) {
        console.log(error);
        estatus.value = error.response.status;
        validacion.value = error.response.data.error;
      }
    };

    const confirmarCodigo = async (codigo) => {
      try {
        const response = await axios.get(
          `${modelo}/confirmar-codigo/${codigo}`
        );
        estatus.value = response.status;
        codigoCorreo.value = codigo;
        return response;
      } catch (error) {
        console.log(error);
        estatus.value = error.response.status;
        validacion.value = error.response.data.error;
      }
    };

    const nuevaPassword = async (data) => {
      try {
        const response = await axios.put(`${modelo}/nueva-password`, data);
        estatus.value = response.status;
        return response;
      } catch (error) {
        console.log(error);
        estatus.value = error.response.status;
        validacion.value = error.response.data.error;
      }
    };

    const login = async (data) => {
      try {
        const response = await axios.post(`${modelo}/login`, data);
        console.log("Hola soy login", response);
        console.log("id usuario", id.value)
        token.value = response.data.token;
        usuario.value = response.data.usuario;
        id.value = response.data.usuario._id;
        rol.value = response.data.usuario.rol;
        estatus.value = response.status;
        return response;
      } catch (error) {
        console.log(error);
        estatus.value = error.response.status;
        validacion.value = error.response.data.error;
        console.log("validar", validacion);
      }
    };

    const editar = async (id, data) => {
      try {
        insertarToken();
        const response = await axios.put(`${modelo}/editar/${id}`, data);
        /* console.log(response); */
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.log(error);
        estatus.value = error.response.status;
        validacion.value = error.response.data.error;
        if (error.message === "Network Error") {
          validacion.value = "Sin conexión, por favor intente recargar";
          console.log(validacion);
          return null;
        }
        if (
          error.response.data.error === "No hay token en la peticion" ||
          error.response.data.error === "Token no válido" ||
          error.response.data.error.name === "TokenExpiredError"
        ) {
          validacion.value = "Sin conexión, por favor intente recargar";
          console.log(validacion);
          router.push("/login");
          return null;
        }
        return error.response.data;
      }
    };

    const agregar = async (data) => {
      try {
        insertarToken();
        const response = await axios.post(`${modelo}/registro`, data);
         console.log(response); 
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.log(error);
        estatus.value = error.response.status;
        validacion.value = error.response.data.error;
        if (error.message === "Network Error") {
          validacion.value = "Sin conexión, por favor intente recargar";
          console.log(validacion);
          return null;
        }
        if (
          error.response.data.error === "No hay token en la peticion" ||
          error.response.data.error === "Token no válido" ||
          error.response.data.error.name === "TokenExpiredError"
        ) {
          validacion.value = "Sin conexión, por favor intente recargar";
          console.log(validacion);
          router.push("/home");
          return null;
        }
        return error.response.data;
      }
    };

    const activar = async (id) => {
      try {
        const response = await axios.put(`${modelo}/activar/${id}`);
        /* console.log(response); */
        return response.data;
      } catch (error) {
        console.log(error);
        estatus.value = error.response.status;
      }
    };

    const inactivar = async (id) => {
      try {
        const response = await axios.put(`${modelo}/inactivar/${id}`);
        /* console.log(response); */
        return response.data;
      } catch (error) {
        console.log(error);
        estatus.value = error.response.status;
      }
    };

    return {
      getAll,
      getById,
      getDatosCliente,
      login,
      agregar,
      editar,
      activar,
      inactivar,
      codigoRecuperar,
      confirmarCodigo,
      nuevaPassword,
      token,
      id,
      email,
      usuario,
      validacion,
      estatus,
      correoRecuperar,
      codigoCorreo,
      rol,
    };
  },
  {
    persist: true,
  }
);