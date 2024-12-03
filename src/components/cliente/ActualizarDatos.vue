<script setup>
import { ref, onMounted } from 'vue';
import { useStoreDatosAntropometricos } from "../../stores/datos_antropometricos.js";
import { useStorePerimetrosMusculares } from "../../stores/perimetros_musculares.js";
import { useStorePlieguesCutaneos } from "../../stores/pliegues_cutaneos.js";
import { useStoreUsuarios } from '../../stores/usuario.js';

const useDatosAntropometricos = useStoreDatosAntropometricos();
const usePerimetrosMusculares = useStorePerimetrosMusculares();
const usePlieguesCutaneos = useStorePlieguesCutaneos();
const useUsuario = useStoreUsuarios();

const data = ref([]);
const dataDA = ref({ estatura: '', peso: '', idUsuario: useUsuario.id });
const dataPC = ref({ biceps: '', triceps: '', escapula: '', abdomen: '', suprailiaco: '', pectoral: '', pierna: '', pantorrilla: '', idUsuario: useUsuario.id })
const dataPM = ref({ pectoral: '', hombro: '', cuello: '', biceps_relajado: '', biceps_contraido: '', abdomen: '', cintura: '', cadera: '', muslo_mayor: '', pantorrilla: '', idUsuario: useUsuario.id })
const loading = ref(false);
const password = ref('');
const notificacionCargando = ref(false);
const notificacionVisible = ref(false);
const notificacionValidacion = ref(false);
const mensajeCargando = ref('');
const mensajeValidacion = ref('');
const mensajeNotificacion = ref('');
const guardando = ref(false);
const guardandoDA = ref(false);
const guardandoPC = ref(false);
const guardandoPM = ref(false);

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

const guardarCambiosDatosAntropometricos = async () => {
    // Validar que no existan campos vacíos
    if (!dataDA.value.estatura ||
        !dataDA.value.peso) {
        notificacionValidacion.value = true;
        mensajeValidacion.value = "No se pueden enviar campos vacíos";
        setTimeout(() => {
            notificacionValidacion.value = false;
        }, 3000);
        return;
    }

    console.log(dataDA.value)

    // Mostrar notificación de carga
    notificacionCargando.value = true;
    mensajeCargando.value = 'Editando Datos Antropométricos...';
    guardandoDA.value = true;

    try {
        // Realizar la edición del usuario
        const response = await useDatosAntropometricos.crear(dataDA.value);

        if (useDatosAntropometricos.estatus === 200) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionVisible.value = true;
            mensajeNotificacion.value = 'Datos Antropométricos modificados con éxito';

            setTimeout(() => {
                notificacionVisible.value = false;
                mensajeNotificacion.value = '';
            }, 3000);
        } else {
            notificacionValidacion.value = true;
            mensajeValidacion.value = useDatosAntropometricos.validacion;
        }
    } catch (error) {
        notificacionValidacion.value = true;
        mensajeValidacion.value = "Error al editar datos antropometricos.";
        console.log(error);
    } finally {
        notificacionCargando.value = false;
        guardandoDA.value = false;
    }
};

const guardarCambiosPlieguesCutaneos = async () => {
    // Validar que no existan campos vacíos
    if (!dataPC.value.biceps ||
        !dataPC.value.triceps ||
        !dataPC.value.escapula ||
        !dataPC.value.abdomen ||
        !dataPC.value.suprailiaco ||
        !dataPC.value.pectoral ||
        !dataPC.value.pierna ||
        !dataPC.value.pantorrilla) {
        notificacionValidacion.value = true;
        mensajeValidacion.value = "No se pueden enviar campos vacíos";
        setTimeout(() => {
            notificacionValidacion.value = false;
        }, 3000);
        return;
    }

    // Mostrar notificación de carga
    notificacionCargando.value = true;
    mensajeCargando.value = 'Editando Datos Pliegues Cutáneos...';
    guardandoDA.value = true;

    try {
        // Realizar la edición del usuario
        const response = await usePlieguesCutaneos.crear(dataPC.value);

        if (usePlieguesCutaneos.estatus === 200) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionVisible.value = true;
            mensajeNotificacion.value = 'Datos Pliegues Cutáneos modificados con éxito';

            setTimeout(() => {
                notificacionVisible.value = false;
                mensajeNotificacion.value = '';
            }, 3000);
        } else {
            notificacionValidacion.value = true;
            mensajeValidacion.value = usePlieguesCutaneos.validacion;
        }
    } catch (error) {
        notificacionValidacion.value = true;
        mensajeValidacion.value = "Error al editar datos pliegues cutáneos.";
        console.log(error);
    } finally {
        notificacionCargando.value = false;
        guardandoDA.value = false;
    }
};

const guardarCambiosPerimetrosMusculares = async () => {
    // Validar que no existan campos vacíos
    if (!dataPM.value.pectoral ||
        !dataPM.value.hombro ||
        !dataPM.value.cuello ||
        !dataPM.value.biceps_relajado ||
        !dataPM.value.biceps_contraido ||
        !dataPM.value.abdomen ||
        !dataPM.value.cintura ||
        !dataPM.value.cadera ||
        !dataPM.value.muslo_mayor ||
        !dataPM.value.pantorrilla) {
        notificacionValidacion.value = true;
        mensajeValidacion.value = "No se pueden enviar campos vacíos";
        setTimeout(() => {
            notificacionValidacion.value = false;
        }, 3000);
        return;
    }

    // Mostrar notificación de carga
    notificacionCargando.value = true;
    mensajeCargando.value = 'Editando Datos Perimetros Musculares...';
    guardandoPM.value = true;

    try {
        // Realizar la edición del usuario
        const response = await usePerimetrosMusculares.crear(dataPM.value);

        if (usePerimetrosMusculares.estatus === 200) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionVisible.value = true;
            mensajeNotificacion.value = 'Datos Perimetros Musculares modificados con éxito';

            setTimeout(() => {
                notificacionVisible.value = false;
                mensajeNotificacion.value = '';
            }, 3000);
        } else {
            notificacionValidacion.value = true;
            mensajeValidacion.value = usePerimetrosMusculares.validacion;
        }
    } catch (error) {
        notificacionValidacion.value = true;
        mensajeValidacion.value = "Error al editar datos perimetros musculares.";
        console.log(error);
    } finally {
        notificacionCargando.value = false;
        guardandoPM.value = false;
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


async function getUsuarioById() {
    loading.value = true;
    try {
        const response = await useUsuario.getById(useUsuario.id);
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

async function getDatoAntropometrico() {
    try {
        const response = await useDatosAntropometricos.getByIdUsuario(useUsuario.id);
        if (useDatosAntropometricos.estatus === 200 && response.length > 0) {
            dataDA.value = response[0];
            console.log("dato antropome", response)
        }
    } catch (error) {
        console.log(error);
    }
}

async function getPliegueCutaneo() {
    try {
        const response = await usePlieguesCutaneos.getByIdUsuario(useUsuario.id);
        if (usePlieguesCutaneos.estatus === 200 && response.length > 0) {
            dataPC.value = response[0];
            console.log("pliegue cutaneo", response)
        }
    } catch (error) {
        console.log(error);
    }
}

async function getPerimetroMuscular() {
    try {
        const response = await usePerimetrosMusculares.getByIdUsuario(useUsuario.id);
        if (usePerimetrosMusculares.estatus === 200 && response.length > 0) {
            dataPM.value = response[0];
            console.log("perimetro muscular", response)
        }
    } catch (error) {
        console.log(error);
    }
}

onMounted(() => {
    getUsuarioById();
    getDatoAntropometrico();
    getPliegueCutaneo();
    getPerimetroMuscular();
})

</script>

<template>
    <div style="background-color: #8c8888; min-height: 93.5vh; box-sizing: border-box; padding-top: 3rem; width: 100%;">
        <div class="container">
            <div class="row">
                <!--Formulario de los datos del deportista-->
                <div class="col-12 col-md-4">
                    <div class=" mb-3" style="text-align: center;">
                        <h4 style="font-weight: bold; color: #fdfefe;">Datos del Deportista</h4>
                    </div>
                    <form class="rows needs-validation" novalidate id="formularioReserva"
                        @submit.prevent="guardarCambios">
                        <div class="mb-3">
                            <label for="userNombre" style="font-weight: bold; color: #fdfefe;"
                                class="form-label">Nombres
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
                            <label for="UserNumDoc" style="font-weight: bold; color: #fdfefe;" class="form-label">Tipo
                                de
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
                            <label for="UserNumDoc" style="font-weight: bold; color: #fdfefe;" class="form-label">Numero
                                de
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
                            <label for="UserNumDoc" style="font-weight: bold; color: #fdfefe;" class="form-label">Tipo
                                de
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
                            <label for="UserTelefono" style="font-weight: bold; color: #fdfefe;"
                                class="form-label">Telefono
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
                            style="background-color: #f8601d; color: #fdfefe; border-radius: 4px; font-weight: bold;">
                            <span v-if="guardando" class="spinner-border spinner-border-sm" role="status"
                                aria-hidden="true"></span>
                            <span v-if="!guardando">Actualizar</span></button>
                    </form>
                </div>
                <!--Formulario de los datos generales-->
                <div class="col-12 col-md-4">
                    <div class=" mb-4" style="text-align: center;">
                        <h4 style="font-weight: bold; color: #fdfefe;">Datos Parte del Cuerpo</h4>
                    </div>
                    <form id="formularioUserDato2" @submit.prevent="guardarCambiosDatosAntropometricos">
                        <h5 class="mb-3" style="font-weight: bold; color: #000000;">Datos Antropométricos</h5>
                        <div class="form-group mb-3">
                            <label for="EstaturaUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Estatura (cm):</label>
                            <input type="number" v-model="dataDA.estatura" class="form-control" id="EstaturaUser"
                                required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="PesoUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Peso (kg):</label>
                            <input type="number" v-model="dataDA.peso" class="form-control" id="PesoUser" required>
                        </div>
                        <button type="sumbit" class="btn mb-3" :disabled="guardandoDA"
                            style="background-color: #f8601d; color: #fdfefe; border-radius: 4px; font-weight: bold;">
                            <span v-if="guardandoDA" class="spinner-border spinner-border-sm" role="status"
                                aria-hidden="true"></span>
                            <span v-if="!guardandoDA">Actualizar</span></button>
                    </form>

                    <form id="formularioUserDato2" @submit.prevent="guardarCambiosPlieguesCutaneos">
                        <h5 class="mt-1 mb-3" style="font-weight: bold; color: #000000;">Pliegues Cutáneos</h5>
                        <div class="form-group mb-3">
                            <label for="BicepsUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Biceps:</label>
                            <input type="number" v-model="dataPC.biceps" class="form-control" id="BicepsUser" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="TricepsUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Triceps:</label>
                            <input type="number" v-model="dataPC.triceps" class="form-control" id="TricepsUser"
                                required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="EscapulaUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Escapula:</label>
                            <input type="number" v-model="dataPC.escapula" class="form-control" id="EscapulaUser"
                                required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="AbdomenUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Abdomen:</label>
                            <input type="number" v-model="dataPC.abdomen" class="form-control" id="AbdomenUser"
                                required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="suprailiacoUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Suprailiaco:</label>
                            <input type="number" v-model="dataPC.suprailiaco" class="form-control" id="suprailiacoUser"
                                required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="PectoralUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Pectoral:</label>
                            <input type="number" v-model="dataPC.pectoral" class="form-control" id="PectoralUser"
                                required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="PiernaUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Pierna:</label>
                            <input type="number" v-model="dataPC.pierna" class="form-control" id="PiernaUser" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="PantorrillaUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Pantorrilla:</label>
                            <input type="number" v-model="dataPC.pantorrilla" class="form-control" id="PantorrillaUser"
                                required>
                        </div>

                        <button type="sumbit" class="btn mb-3" :disabled="guardandoPC"
                            style="background-color: #f8601d; color: #fdfefe; border-radius: 4px; font-weight: bold;">
                            <span v-if="guardandoPC" class="spinner-border spinner-border-sm" role="status"
                                aria-hidden="true"></span>
                            <span v-if="!guardandoPC">Actualizar</span></button>
                    </form>
                </div>
                <div class="col-12 col-md-4 mt-5">
                    <form id="formularioUserDato3" @submit.prevent="guardarCambiosPerimetrosMusculares">
                        <h5 class="mt-1 mb-3" style="font-weight: bold; color: #000000;">Perimetros Musculares</h5>
                        <div class="form-group mb-3">
                            <label for="PectoralUser2" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Pectoral:</label>
                            <input type="number" v-model="dataPM.pectoral" class="form-control" id="PectoralUser2" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="HombroUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Hombro:</label>
                            <input type="number" v-model="dataPM.hombro" class="form-control" id="HombroUser" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="CuelloUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Cuello:</label>
                            <input type="number" v-model="dataPM.cuello" class="form-control" id="CuelloUser" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="BicepsRelajadoUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Biceps Relajado:</label>
                            <input type="number" v-model="dataPM.biceps_relajado" class="form-control" id="BicepsRelajadoUser" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="BicepsContraidoUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Biceps
                                Contraido:</label>
                            <input type="number" v-model="dataPM.biceps_contraido" class="form-control" id="BicepsContraidoUser" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="AbdomenUser2" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Abdomen:</label>
                            <input type="number" v-model="dataPM.abdomen" class="form-control" id="AbdomenUser2" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="CinturaUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Cintura:</label>
                            <input type="number" v-model="dataPM.cintura" class="form-control" id="CinturaUser" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="CaderaUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Cadera:</label>
                            <input type="number" v-model="dataPM.cadera" class="form-control" id="caderaUser" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="MusloMayorUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Muslo Mayor:</label>
                            <input type="number" v-model="dataPM.muslo_mayor" class="form-control" id="MusloMayorUser" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="PantorrillaUser2" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Pantorrilla:</label>
                            <input type="number" v-model="dataPM.pantorrilla" class="form-control" id="PantorrillaUser2" required>
                        </div>
                        <button type="sumbit" class="btn mb-3" :disabled="guardandoPM"
                            style="background-color: #f8601d; color: #fdfefe; border-radius: 4px; font-weight: bold;">
                            <span v-if="guardandoPM" class="spinner-border spinner-border-sm" role="status"
                                aria-hidden="true"></span>
                            <span v-if="!guardandoPM">Actualizar</span></button>
                    </form>
                </div>
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