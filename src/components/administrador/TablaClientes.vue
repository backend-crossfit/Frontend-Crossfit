<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStoreUsuarios } from '../../stores/usuario.js';

const useUsuario = useStoreUsuarios();
const router = useRouter();
const usuarios = ref([]);
const filter = ref('');

async function cambiarEstadoAdmin(usuario) {
    const usuariio = usuarios.value.find(usuariod => usuariod._id === usuario._id);
    if (!usuariio) return; // Validación por seguridad

    usuariio.loadingActInac = true; // Activamos el loading solo para este usuariio

    // Actualizamos el estado local inmediatamente para evitar el efecto "parpadeo"
    const estadoAnterior = usuariio.estado; // Guardamos el estado anterior en caso de error
    usuariio.estado = !usuariio.estado; // Cambiamos el estado localmente

    try {
        if (estadoAnterior) {
            // Si estaba activo, intentamos inactivarlo
            await useUsuario.inactivar(usuario._id);
        } else {
            // Si estaba inactivo, intentamos activarlo
            await useUsuario.activar(usuario._id);
        }
    } catch (error) {
        console.error("Error al cambiar el estado del administrador:", error);
        // Si hubo un error, revertimos el estado local
        usuariio.estado = estadoAnterior;
    } finally {
        usuariio.loadingActInac = false; // Desactivamos el loading
    }
}

async function getUsuario() {
    try {
        const response = await useUsuario.getAll();
        if (useUsuario.estatus === 200) {
            usuarios.value = response.filter(us => us.rol === 'Cliente').map(pe => ({
                ...pe, // Copiar todas las propiedades existentes
                loadingActInac: false // Agregar la propiedad adicional
            }));
            console.log(usuarios)
        }
    } catch (error) {
        console.log(error);
    }
}

const filtrarUsuarios = computed(() => {
    return usuarios.value.reverse().filter(usuario => {
        const documento = usuario.num_documento ? usuario.num_documento.toString().toLowerCase() : ''; // Validar y convertir
        const filterText = filter.value.toLowerCase();

        return (
            documento.includes(filterText)
        );
    });
});


function irInfoCliente(usuario) {
    const url = router.resolve({ path: '/datos-cliente', query: { id: usuario._id } }).href;
    window.open(url, '_blank');
}

onMounted(() => {
    getUsuario();
})
</script>

<template>
    <div
        style="background-color: #8c8888; min-height: 93.5vh; box-sizing: border-box; padding-top: 3rem; width: 100vw;">
        <div class="container">
            <p class="fs-2" style="color: #fdfefe; font-weight: bold; text-align: center;">Gestor de Usuario Clientes
            </p>
            <form class="d-flex mb-3" role="search">
                <input class="form-control me-2" type="search" placeholder="Buscar por número de documento"
                    v-model="filter" aria-label="Search">
                <button class="btn" type="submit"
                    style="background-color: #f8601d; color:#fdfefe; font-weight:bold">Buscar</button>
            </form>
            <div class="table-responsive">
                <table class="table table-dark table-striped table-hover">
                    <thead>
                        <tr style="text-align: center;">
                            <th scope="col" style="color: #fdfefe;">Nombre</th>
                            <th scope="col" style="color: #fdfefe;">Apellidos</th>
                            <th scope="col" style="color: #fdfefe;">Numero Documento</th>
                            <th scope="col" style="color: #fdfefe;">Estado</th>
                            <th scope="col" style="color: #fdfefe;">Acciones</th>
                            <th scope="col" style="color: #fdfefe;">Seleccione</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="usuario in filtrarUsuarios" :key="usuario._id" class="text-center">
                            <td style="color: #fdfefe;">{{ usuario.nombre }}</td>
                            <td style="color: #fdfefe;">{{ usuario.apellido }}</td>
                            <td style="color: #fdfefe;">{{ usuario.num_documento }}</td>
                            <td>
                                <button :class="['btn', usuario.estado ? 'btn-success' : 'btn-danger']"
                                    @click="cambiarEstadoAdmin(usuario)" style="margin-left: 10px; font-weight: bold;"
                                    :disabled="usuario.loadingActInac">
                                    <span v-if="usuario.loadingActInac" class="spinner-border spinner-border-sm"
                                        role="status" aria-hidden="true"></span>
                                    <span v-if="!usuario.loadingActInac"> {{ usuario.estado ? 'Activo' : 'Inactivo'
                                        }}</span>
                                </button>
                            </td>
                            <td><button type="button" class="btn btn-outline-info"><a
                                        @click="irInfoCliente(usuario)">Ver</a></button></td>
                            <td><button type="button" class="btn" style="background-color: #f8601d;"><input
                                        class="form-check-input" type="checkbox"></button></td>
                        </tr>
                    </tbody>
                </table>
                <button class="btn float-end" style="background-color: #f8601d; color: #fdfefe; font-weight: bold;">Exportar a Archivo</button>
            </div>
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