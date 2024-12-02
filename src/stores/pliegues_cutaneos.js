import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";

const modelo = "pliegues-cutaneos";

export const useStorePlieguesCutaneos = defineStore(
  modelo,
  () => {
    const registros = ref([]);
    const registroSeleccionado = ref(null);
    const estatus = ref("");
    const validacion = ref("");

    // Obtener todos los registros de pliegues cutáneos
    const getAll = async () => {
      try {
        const response = await axios.get(`${modelo}/all`);
        registros.value = response.data;
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al obtener los registros de pliegues cutáneos:", error);
        estatus.value = error.response?.status || 500;
        validacion.value = error.response?.data?.error || "Error al obtener los registros";
      }
    };

    // Obtener un registro de pliegues cutáneos por ID
    const getById = async (id) => {
      try {
        const response = await axios.get(`${modelo}/${id}`);
        registroSeleccionado.value = response.data;
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al obtener un registro de pliegues cutáneos por ID:", error);
        estatus.value = error.response?.status || 500;
        validacion.value = error.response?.data?.error || "Error al obtener el registro";
      }
    };

    // Crear un nuevo registro de pliegues cutáneos
    const crear = async (data) => {
      try {
        const response = await axios.post(`${modelo}/crear`, data);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al crear un registro de pliegues cutáneos:", error);
        estatus.value = error.response?.status || 500;
        validacion.value = error.response?.data?.error || "Error al crear el registro";
      }
    };

    // Actualizar un registro de pliegues cutáneos
    const editar = async (id, data) => {
      try {
        const response = await axios.put(`${modelo}/editar/${id}`, data);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al actualizar un registro de pliegues cutáneos:", error);
        estatus.value = error.response?.status || 500;
        validacion.value = error.response?.data?.error || "Error al actualizar el registro";
      }
    };

    // Inactivar un registro de pliegues cutáneos
    const inactivar = async (id) => {
      try {
        const response = await axios.put(`${modelo}/inactivar/${id}`);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al inactivar un registro de pliegues cutáneos:", error);
        estatus.value = error.response?.status || 500;
        validacion.value = error.response?.data?.error || "Error al inactivar el registro";
      }
    };

    // Activar un registro de pliegues cutáneos
    const activar = async (id) => {
      try {
        const response = await axios.put(`${modelo}/activar/${id}`);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al activar un registro de pliegues cutáneos:", error);
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
