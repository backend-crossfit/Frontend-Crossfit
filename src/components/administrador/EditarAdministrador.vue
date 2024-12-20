<script setup>
import { ref, onMounted } from 'vue';
import { useStoreUsuarios } from '../../stores/usuario.js';
import { useRoute } from 'vue-router';

const useUsuario = useStoreUsuarios();
const route = useRoute();
const usuarioId = ref('');
const data = ref([]);
const loading = ref(false);
const password = ref('');
const notificacionCargando = ref(false);
const notificacionVisible = ref(false);
const notificacionValidacion = ref(false);
const mensajeCargando = ref('');
const mensajeValidacion = ref('');
const mensajeNotificacion = ref('');
const guardando = ref(false);

const guardarCambios = async () => {
    // Validar que no existan campos vacíos
    if (!data.value.nombre || 
        !data.value.apellido || 
        !data.value.tipo_documento || 
        !data.value.num_documento || 
        !data.value.edad || 
        !data.value.rol || 
        !data.value.tipo_sexo || 
        !data.value.correo || 
        !data.value.telefono) {
        notificacionValidacion.value = true;
        mensajeValidacion.value = "No se pueden enviar campos vacíos";
        setTimeout(() => {
            notificacionValidacion.value = false;
        }, 3000);
        return;
    }

    // Validar contraseña si se ha proporcionado
    if (password.value.trim() && !validarContraseña()) {
        setTimeout(() => {
            notificacionValidacion.value = false;
            mensajeValidacion.value = '';
        }, 3000);
        return;
    }

    // Asignar contraseña solo si se ha proporcionado
    if (password.value.trim()) {
        data.value.password = password.value;
    } else {
        // Si no se proporciona contraseña, eliminamos la propiedad del objeto
        delete data.value.password;
    }

    // Mostrar notificación de carga
    notificacionCargando.value = true;
    mensajeCargando.value = 'Editando usuario...';
    guardando.value = true;

    try {
        // Realizar la edición del usuario
        const response = await useUsuario.editar(data.value._id, data.value);

        if (useUsuario.estatus === 200) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionVisible.value = true;
            mensajeNotificacion.value = 'Usuario editado con éxito';

            setTimeout(() => {
                notificacionVisible.value = false;
                mensajeNotificacion.value = '';
            }, 3000);
        } else {
            notificacionValidacion.value = true;
            mensajeValidacion.value = useUsuario.validacion;
        }
    } catch (error) {
        notificacionValidacion.value = true;
        mensajeValidacion.value = "Error al editar usuario.";
        console.log(error);
    } finally {
        notificacionCargando.value = false;
        guardando.value = false;
    }
};



function validarContraseña() {
  if (password.value.trim() && password.value.length < 8) {
    mensajeValidacion.value = 'La contraseña debe tener al menos 8 caracteres';
    notificacionValidacion.value = true;
    return false;
  }
  if (password.value.trim() && !/\d/.test(password.value)) {
    mensajeValidacion.value = 'La contraseña debe contener al menos un número';
    notificacionValidacion.value = true;
    return false;
  }
  if (password.value.trim() && !/[@#\/]/.test(password.value)) {
    mensajeValidacion.value = 'La contraseña debe contener al menos un carácter especial (@, #, /)';
    notificacionValidacion.value = true;
    return false;
  }

  if (password.value.trim() && !/[A-Z]/.test(password.value)) {
    mensajeValidacion.value = 'La contraseña debe contener al menos una letra mayúscula';
    notificacionValidacion.value = true;
    return false;
  }
  if (password.value.trim() && !/[a-z]/.test(password.value)) {
    mensajeValidacion.value = 'La contraseña debe contener al menos una letra minúscula';
    notificacionValidacion.value = true;
    return false;
  }
  notificacionValidacion.value = false; // No hay errores
  return true;
}


async function getUsuarioById(id) {
    loading.value = true;
    try {
        const response = await useUsuario.getById(id);
        if (useUsuario.estatus === 200) {
            data.value = response;
        }
        console.log("usuario", response)
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

onMounted(async () => {
    const id = route.query.id;
    if (id) {
        usuarioId.value = id;
        await getUsuarioById(id);;
    }
})
</script>

<template>
    <div style="background-color: #8c8888; min-height: 93.5vh;">
        <div class="container d-flex justify-content-center align-items-center">
            <div class="col-md-6">
                <form class="rows needs-validation" novalidate id="formularioReserva" @submit.prevent="guardarCambios">
                    <div class="col mt-5 mb-3" style="text-align: center;">
                        <h4 style="font-weight: bold; color: #fdfefe;">Editar Usuario Administrador</h4>
                    </div>
                    <div class="mb-3">
                        <label for="userNombre" style="font-weight: bold; color: #fdfefe;" class="form-label">Nombres
                            <span class="text-danger">*</span></label>
                        <input v-model="data.nombre" type="text" class="form-control" id="userNombre"
                            placeholder="Digite el nombre" required>
                    </div>
                    <div class="mb-3">
                        <label for="UserApellidos" style="font-weight: bold; color: #fdfefe;"
                            class="form-label">Apellidos <span class="text-danger">*</span></label>
                        <input v-model="data.apellido" type="text" class="form-control" id="UserApellidos"
                            placeholder="Digite los apellidos" required>
                    </div>
                    <div class="mb-3">
                        <label for="UserNumDoc" style="font-weight: bold; color: #fdfefe;" class="form-label">Tipo de
                            Documento <span class="text-danger">*</span></label>
                        <select v-model="data.tipo_documento" class="form-select"
                            style="border-color:#734a4a; color: #000000; font-weight:bold; border-color: #734a4a;"
                            aria-label="Default select example" required>
                            <option value="" disabled selected>Seleccione un tipo de documento...
                            </option>
                            <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                            <option value="Cédula de Extrajenría">Cédula de Extranjería</option>
                            <option value="Pasaporte">Pasaporte</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="UserNumDoc" style="font-weight: bold; color: #fdfefe;" class="form-label">Numero de
                            Documento <span class="text-danger">*</span></label>
                        <input v-model="data.num_documento" type="number" class="form-control" id="UserNumDoc"
                            placeholder="Digite el número del documento" required>
                    </div>
                    <div class="mb-3">
                        <label for="UserEmail" style="font-weight: bold; color: #fdfefe;" class="form-label">Correo
                            electronico <span class="text-danger">*</span></label>
                        <input v-model="data.correo" type="email" class="form-control" id="UserEmail"
                            aria-describedby="emailHelp" placeholder="Digite el correo electronico" required>
                    </div>
                    <div class="mb-3">
                        <label for="UserEmail" style="font-weight: bold; color: #fdfefe;" class="form-label">Edad
                            <span class="text-danger">*</span></label>
                        <input v-model="data.edad" type="number" class="form-control" id="UserEmail"
                            aria-describedby="emailHelp" placeholder="Digite la edad" required>
                    </div>
                    <div class="mb-3">
                        <label for="UserNumDoc" style="font-weight: bold; color: #fdfefe;" class="form-label">Tipo de
                            sexo <span class="text-danger">*</span></label>
                        <select v-model="data.tipo_sexo" class="form-select"
                            style="border-color:#734a4a; color: #000000; font-weight:bold; border-color: #734a4a;"
                            aria-label="Default select example" required>
                            <option value="" disabled selected>Seleccione una opción...
                            </option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="No especifica">No especifica</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="UserRol" style="font-weight: bold; color: #fdfefe;" class="form-label">Rol del
                            Usuario <span class="text-danger">*</span></label>
                        <select v-model="data.rol" class="form-select"
                            style="border-color:#734a4a; color: #000000; font-weight:bold; border-color: #734a4a;"
                            aria-label="Default select example" required>
                            <option value="" disabled selected>Seleccione un rol para el usuario...
                            </option>
                            <option value="Cliente">Cliente</option>
                            <option value="Administrador">Administrador</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="UserTelefono" style="font-weight: bold; color: #fdfefe;" class="form-label">Telefono
                            <span class="text-danger">*</span></label>
                        <input v-model="data.telefono" type="number" class="form-control" id="UserTelefono"
                            placeholder="Digite el numero telefónico del celular" required>
                    </div>
                    <div class="mb-3">
                        <label for="UserContraseña" style="font-weight: bold; color: #fdfefe;"
                            class="form-label">Contraseña</label>
                        <input v-model="password" type="password" class="form-control"
                            placeholder="Cambiar contraseña..." id="UserContraseña" required>
                    </div>
                    <button type="sumbit" class="btn mb-3" :disabled="guardando"
                        style="background-color: #f8601d; color: #fdfefe; border-radius: 4px; font-weight: bold;"> <span
                            v-if="guardando" class="spinner-border spinner-border-sm" role="status"
                            aria-hidden="true"></span>
                        <span v-if="!guardando">Actualizar</span></button>
                </form>
            </div>
        </div>
        <div v-if="notificacionVisible" class="custom-notify alert alert-success alert-dismissible fade show"
            role="alert">
            {{ mensajeNotificacion }}
        </div>
        <div v-if="notificacionValidacion" class="custom-notify alert alert-danger alert-dismissible fade show"
            role="alert">
            {{ mensajeValidacion }}
        </div>
        <div v-if="notificacionCargando" class="custom-notify alert alert-info alert-dismissible fade show"
            role="alert">
            {{ mensajeCargando }}
        </div>
    </div>
</template>

<style scoped>
.custom-notify {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    width: 300px;
    text-align: center;
    padding: 15px;
    color: rgb(0, 0, 0);
    font-weight: bold;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-size: 16px;
}

.custom-notify .close:hover {
    opacity: 1;
}
</style>