import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";

const modelo = "datos-antropometricos";

export const useStoreDatosAntropometricos = defineStore(
  modelo,
  () => {
    const datos = ref([]);
    const datoSeleccionado = ref(null);
    const estatus = ref("");
    const validacion = ref("");

    // Obtener todos los datos antropométricos
    const getAll = async () => {
      try {
        const response = await axios.get(`${modelo}/all`);
        datos.value = response.data;
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al obtener los datos antropométricos:", error);
        estatus.value = error.response?.status || 500;
        validacion.value = error.response?.data?.error || "Error al obtener los datos";
      }
    };

    // Obtener datos antropométricos por ID
    const getById = async (id) => {
      try {
        const response = await axios.get(`${modelo}/${id}`);
        datoSeleccionado.value = response.data;
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al obtener datos antropométricos por ID:", error);
        estatus.value = error.response?.status || 500;
        validacion.value = error.response?.data?.error || "Error al obtener los datos";
      }
    };

    // Crear un nuevo registro de datos antropométricos
    const crear = async (data) => {
      try {
        const response = await axios.post(`${modelo}/crear`, data);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al crear datos antropométricos:", error);
        estatus.value = error.response?.status || 500;
        validacion.value = error.response?.data?.error || "Error al crear los datos";
      }
    };

    // Actualizar un registro de datos antropométricos
    const editar = async (id, data) => {
      try {
        const response = await axios.put(`${modelo}/editar/${id}`, data);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al actualizar datos antropométricos:", error);
        estatus.value = error.response?.status || 500;
        validacion.value = error.response?.data?.error || "Error al actualizar los datos";
      }
    };

    // Inactivar un registro de datos antropométricos
    const inactivar = async (id) => {
      try {
        const response = await axios.put(`${modelo}/inactivar/${id}`);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al inactivar datos antropométricos:", error);
        estatus.value = error.response?.status || 500;
        validacion.value = error.response?.data?.error || "Error al inactivar los datos";
      }
    };

    // Activar un registro de datos antropométricos
    const activar = async (id) => {
      try {
        const response = await axios.put(`${modelo}/activar/${id}`);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al activar datos antropométricos:", error);
        estatus.value = error.response?.status || 500;
        validacion.value = error.response?.data?.error || "Error al activar los datos";
      }
    };

    return {
      datos,
      datoSeleccionado,
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
    persist: true, // Para mantener los datos en almacenamiento local
  }
);
