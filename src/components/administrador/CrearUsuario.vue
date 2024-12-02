<script setup>
import { ref } from 'vue';
import { useStoreUsuarios } from '../../stores/usuario.js';

const useUsuario = useStoreUsuarios();
const nombre = ref('');
const apellido = ref('');
const tipo_documento = ref('');
const num_documento = ref('');
const edad = ref('');
const rol = ref('');
const tipo_sexo = ref('');
const correo = ref('');
const telefono = ref('');
const password = ref('');
const guardando = ref(false);
const data = ref([]);
const notificacionCargando = ref(false);
const notificacionVisible = ref(false);
const notificacionValidacion = ref(false);
const mensajeCargando = ref('');
const mensajeValidacion = ref('');
const mensajeNotificacion = ref('');

async function crearUsuario() {
    if (!validarContraseña()) {
        setTimeout(() => {
            notificacionValidacion.value = false;
            mensajeValidacion.value = '';
        }, 3000);
        return;
    }

    guardando.value = true;

    data.value = {
        nombre: nombre.value,
        apellido: apellido.value,
        tipo_documento: tipo_documento.value,
        num_documento: num_documento.value,
        edad: edad.value,
        rol: rol.value,
        tipo_sexo: tipo_sexo.value,
        correo: correo.value,
        telefono: telefono.value,
        password: password.value
    }

    try {
        // Llamada a la API para crear o actualizar el menú con los datos actuales
        const response = await useUsuario.agregar(data.value);

        if (useUsuario.estatus === 201) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionVisible.value = true;
            mensajeNotificacion.value = 'Usuario creado exitosamente';

            // Limpiar la imagen del array después de una actualización exitosa
            limpiar();
            setTimeout(() => {
                notificacionVisible.value = false;
                mensajeNotificacion.value = '';
            }, 4000);
        } else if (useUsuario.estatus === 400) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionValidacion.value = true;
            mensajeValidacion.value = useUsuario.validacion;
            setTimeout(() => {
                notificacionValidacion.value = false;
                mensajeValidacion.value = '';
            }, 3000);
        }
    } catch (error) {
        notificacionValidacion.value = true;
        mensajeValidacion.value = useUsuario.validacion;

        setTimeout(() => {
            notificacionValidacion.value = false;
            mensajeValidacion.value = '';
        }, 3000);
        console.log(error);
    } finally {
        guardando.value = false;
    }
}

function validarContraseña() {
    if (password.value.length < 8) {
        mensajeValidacion.value = 'La contraseña debe tener al menos 8 caracteres';
        notificacionValidacion.value = true;
        return false;
    }
    if (!/\d/.test(password.value)) {
        mensajeValidacion.value = 'La contraseña debe contener al menos un número';
        notificacionValidacion.value = true;
        return false;
    }
    if (!/[@#\/]/.test(password.value)) {
        mensajeValidacion.value = 'La contraseña debe contener al menos un carácter especial (@, #, /)';
        notificacionValidacion.value = true;
        return false;
    }

    if (!/[A-Z]/.test(password.value)) {
        mensajeValidacion.value = 'La contraseña debe contener al menos una letra mayúscula';
        notificacionValidacion.value = true;
        return false;
    }
    if (!/[a-z]/.test(password.value)) {
        mensajeValidacion.value = 'La contraseña debe contener al menos una letra minúscula';
        notificacionValidacion.value = true;
        return false;
    }
    notificacionValidacion.value = false; // No hay errores
    return true;
}

function limpiar() {
    nombre.value = '';
    apellido.value = '';
    tipo_documento.value = '';
    num_documento.value = '';
    edad.value = '';
    rol.value = '';
    tipo_sexo.value = '';
    correo.value = '';
    telefono.value = '';
    password.value = '';
    data.value = [];
}

</script>

<template>
    <div style="background-color: #8c8888; min-height: 93.5vh;">
        <div class="container d-flex justify-content-center align-items-center">
            <div class="col-md-6">
                <form class="rows needs-validation" novalidate id="formularioReserva" @submit.prevent="crearUsuario()">
                    <div class="col mt-5 mb-3" style="text-align: center;">
                        <h4 style="font-weight: bold; color: #fdfefe;">Crear Usuario Administrador</h4>
                    </div>
                    <div class="mb-3">
                        <label for="userNombre" style="font-weight: bold; color: #fdfefe;" class="form-label">Nombres
                            <span class="text-danger">*</span></label>
                        <input v-model="nombre" type="text" class="form-control" id="userNombre"
                            placeholder="Digite el nombre" required>
                    </div>
                    <div class="mb-3">
                        <label for="UserApellidos" style="font-weight: bold; color: #fdfefe;"
                            class="form-label">Apellidos <span class="text-danger">*</span></label>
                        <input v-model="apellido" type="text" class="form-control" id="UserApellidos"
                            placeholder="Digite los apellidos" required>
                    </div>
                    <div class="mb-3">
                        <label for="UserNumDoc" style="font-weight: bold; color: #fdfefe;" class="form-label">Tipo de
                            Documento <span class="text-danger">*</span></label>
                        <select v-model="tipo_documento" class="form-select"
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
                        <input v-model="num_documento" type="number" class="form-control" id="UserNumDoc"
                            placeholder="Digite el número del documento" required>
                    </div>
                    <div class="mb-3">
                        <label for="UserEmail" style="font-weight: bold; color: #fdfefe;" class="form-label">Correo
                            electronico <span class="text-danger">*</span></label>
                        <input v-model="correo" type="email" class="form-control" id="UserEmail"
                            aria-describedby="emailHelp" placeholder="Digite el correo electronico" required>
                    </div>
                    <div class="mb-3">
                        <label for="UserEmail" style="font-weight: bold; color: #fdfefe;" class="form-label">Edad
                            <span class="text-danger">*</span></label>
                        <input v-model="edad" type="number" class="form-control" id="UserEmail"
                            aria-describedby="emailHelp" placeholder="Digite la edad" required>
                    </div>
                    <div class="mb-3">
                        <label for="UserNumDoc" style="font-weight: bold; color: #fdfefe;" class="form-label">Tipo de
                            sexo <span class="text-danger">*</span></label>
                        <select v-model="tipo_sexo" class="form-select"
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
                        <select v-model="rol" class="form-select"
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
                        <input v-model="telefono" type="number" class="form-control" id="UserTelefono"
                            placeholder="Digite el numero telefónico del celular" required>
                    </div>
                    <div class="mb-3">
                        <label for="UserContraseña" style="font-weight: bold; color: #fdfefe;"
                            class="form-label">Contraseña</label>
                        <input v-model="password" type="password" class="form-control"
                            placeholder="Digite la contraseña" id="UserContraseña" required>
                    </div>
                    <button type="sumbit" class="btn mb-3" :disabled="guardando"
                        style="background-color: #f8601d; color: #fdfefe; border-radius: 4px; font-weight: bold;"> <span
                            v-if="guardando" class="spinner-border spinner-border-sm" role="status"
                            aria-hidden="true"></span>
                        <span v-if="!guardando">Crear</span></button>
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