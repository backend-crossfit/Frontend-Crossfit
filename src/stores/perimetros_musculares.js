import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";

const modelo = "perimetros-musculares";

export const useStorePerimetrosMusculares = defineStore(
  modelo,
  () => {
    const registros = ref([]);
    const registroSeleccionado = ref(null);
    const estatus = ref("");
    const validacion = ref("");

    // Obtener todos los registros de perímetros musculares
    const getAll = async () => {
      try {
        const response = await axios.get(`${modelo}/all`);
        registros.value = response.data;
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al obtener los registros de perímetros musculares:", error);
        estatus.value = error.response?.status || 500;
        validacion.value = error.response?.data?.error || "Error al obtener los registros";
      }
    };

    // Obtener un registro de perímetros musculares por ID
    const getById = async (id) => {
      try {
        const response = await axios.get(`${modelo}/${id}`);
        registroSeleccionado.value = response.data;
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al obtener un registro de perímetros musculares por ID:", error);
        estatus.value = error.response?.status || 500;
        validacion.value = error.response?.data?.error || "Error al obtener el registro";
      }
    };

    const getByIdUsuario = async (id) => {
      try {
        const response = await axios.get(`${modelo}/por-usuario/${id}`);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al obtener perimetros musculares por ID:", error);
        estatus.value = error.response?.status || 500;
        validacion.value = error.response?.data?.error || "Error al obtener los datos";
      }
    };

    // Crear un nuevo registro de perímetros musculares
    const crear = async (data) => {
      try {
        const response = await axios.post(`${modelo}/crear`, data);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al crear un registro de perímetros musculares:", error);
        estatus.value = error.response?.status || 500;
        validacion.value = error.response?.data?.error || "Error al crear el registro";
      }
    };

    // Actualizar un registro de perímetros musculares
    const editar = async (id, data) => {
      try {
        const response = await axios.put(`${modelo}/editar/${id}`, data);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al actualizar un registro de perímetros musculares:", error);
        estatus.value = error.response?.status || 500;
        validacion.value = error.response?.data?.error || "Error al actualizar el registro";
      }
    };

    // Inactivar un registro de perímetros musculares
    const inactivar = async (id) => {
      try {
        const response = await axios.put(`${modelo}/inactivar/${id}`);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al inactivar un registro de perímetros musculares:", error);
        estatus.value = error.response?.status || 500;
        validacion.value = error.response?.data?.error || "Error al inactivar el registro";
      }
    };

    // Activar un registro de perímetros musculares
    const activar = async (id) => {
      try {
        const response = await axios.put(`${modelo}/activar/${id}`);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al activar un registro de perímetros musculares:", error);
        estatus.value = error.response?.status || 500;
        validacion.value = error.response?.data?.error || "Error al activar el registro";
      }
    };

    return {
      registros,
      registroSeleccionado,
      estatus,
      validacion,
      getAll,
      getById,
      getByIdUsuario,
      crear,
      editar,
      inactivar,
      activar,
    };
  },
  {
    persist: true, // Guardar los datos localmente para persistencia
  }
);
