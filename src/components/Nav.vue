<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStoreUsuarios } from '../stores/usuario.js';

const router = useRouter();
const useUsuario = useStoreUsuarios();
const cedula = ref('');
const contrasena = ref('');
const loading = ref(false);
const notificacionVisible = ref(false);
const validacion = ref('');
const mostrarModalLogin = ref(false);
const nombre = ref('');
const apellido = ref('');
const tipo_documento = ref('');
const num_documento = ref('');
const edad = ref('');
const rol = ref('Cliente');
const tipo_sexo = ref('');
const correo = ref('');
const telefono = ref('');
const password = ref('');
const guardando = ref(false);
const data = ref([]);
const notificacionCargando = ref(false);
const notificacionValidacion = ref(false);
const mensajeCargando = ref('');
const mensajeValidacion = ref('');
const mensajeNotificacion = ref('');

// Recuperar Contraseña
const correoRecuperar = ref('');
const email = useUsuario.email;
const codigo = ref('');
const loadingCorreo = ref(false);
const loadVerificar = ref(false);
const primeraParte = ref(true);
const segundaParte = ref(false);
const terceraParte = ref(false);
const mostrarNuevaPassword = ref(false);
const mostrarConfirmarCon = ref(false);
const checkPassword = ref("");
const loadNuevaPass = ref(false);
const showOne = ref(true);
const showTwo = ref(false);
const dataRecuperar = ref({
    correo: useUsuario.email,
    codigo: useUsuario.codigoCorreo,
    password: ""
});

function correoValido() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(correoRecuperar.value);
}

function validarCorreo() {
    if (correoRecuperar.value.trim() === '' || !correoValido()) {
        notificacionValidacion.value = true;
        mensajeValidacion.value = 'Por favor ingrese un correo electrónico válido';
        setTimeout(() => {
            notificacionValidacion.value = false;
            mensajeValidacion.value = '';
        }, 3000);
        return false;
    }
    return true;
}

function validarCampo() {
    if (!validarCorreo()) {
        return;
    }
    enviarCodigo();
}

async function enviarCodigo() {
    loadingCorreo.value = true;
    try {
        const response = await useUsuario.codigoRecuperar(correoRecuperar.value);


        if (useUsuario.estatus === 400 || useUsuario.estatus === 404 || useUsuario.estatus === 500) {
            notificacionValidacion.value = true;
            mensajeValidacion.value = useUsuario.validacion;
            setTimeout(() => {
                notificacionValidacion.value = false;
                mensajeValidacion.value = '';
            }, 3000);
        } else if (useUsuario.estatus === 200) {
            useUsuario.correoRecuperar = correoRecuperar.value;
            primeraParte.value = false;
            segundaParte.value = true;
        } else {
            notificacionValidacion.value = true;
            mensajeValidacion.value = useUsuario.validacion;
            setTimeout(() => {
                notificacionValidacion.value = false;
                mensajeValidacion.value = '';
            }, 3000);
        }
    } catch (error) {
        console.log(error);
    } finally {
        loadingCorreo.value = false;
    }
}

async function confirmarCodigo() {
    try {
        loadVerificar.value = true;
        const response = await useUsuario.confirmarCodigo(codigo.value);

        if (useUsuario.estatus === 200) {
            segundaParte.value = false;
            terceraParte.value = true;
        } else if (useUsuario.estatus == 400 || useUsuario.estatus === 404 || useUsuario.estatus === 500) {
            notificacionValidacion.value = true;
            mensajeValidacion.value = useUsuario.validacion;
            setTimeout(() => {
                notificacionValidacion.value = false;
                mensajeValidacion.value = '';
            }, 3000);
            return;
        } else {
            return;
        }
    } catch (error) {
        console.log(error);
    } finally {
        loadVerificar.value = false;
    }
}

async function nuevaPassword() {
    try {
        loadNuevaPass.value = true;

        const response = await useUsuario.nuevaPassword(dataRecuperar.value);

        if (!response) return;

        if (useUsuario.estatus == 200) {
            showOne.value = false;
            showTwo.value = true;
        } else if (useUsuario.estatus === 400 || useUsuario.estatus === 404 || useUsuario.estatus === 500) {
            notificacionValidacion.value = true;
            mensajeValidacion.value = useUsuario.validacion;
            setTimeout(() => {
                notificacionValidacion.value = false;
                mensajeValidacion.value = '';
            }, 3000);
        }
    } catch (error) {
        console.log(error);
    } finally {
        loadNuevaPass.value = false;
    }
}

// Validaciones
const vali = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

function cerrarNotificacion() {
    setTimeout(() => {
        notificacionValidacion.value = false;
        mensajeValidacion.value = '';
    }, 3000);
}


function validarContrasena() {
    if (dataRecuperar.value.password.length < 8) {
        mensajeValidacion.value = 'La contraseña debe tener al menos 8 caracteres';
        notificacionValidacion.value = true;
        cerrarNotificacion();
        return false;
    }
    if (!/\d/.test(dataRecuperar.value.password)) {
        mensajeValidacion.value = 'La contraseña debe contener al menos un número';
        notificacionValidacion.value = true;
        cerrarNotificacion();
        return false;
    }
    if (!/[@#\/]/.test(dataRecuperar.value.password)) {
        mensajeValidacion.value = 'La contraseña debe contener al menos un carácter especial (@, #, /)';
        notificacionValidacion.value = true;
        return false;
    }
    if (!/[A-Z]/.test(dataRecuperar.value.password)) { // Verifica que haya al menos una letra mayúscula
        mensajeValidacion.value = 'La contraseña debe contener al menos una letra mayúscula';
        notificacionValidacion.value = true;
        cerrarNotificacion();
        return false;
    }
    if (!/[a-z]/.test(dataRecuperar.value.password)) { // Verifica que haya al menos una letra minúscula
        mensajeValidacion.value = 'La contraseña debe contener al menos una letra minúscula';
        notificacionValidacion.value = true;
        cerrarNotificacion();
        return false;
    }
    if (dataRecuperar.value.password !== checkPassword.value) {
        mensajeValidacion.value = 'Las contraseñas deben coincidir';
        notificacionValidacion.value = true;
        cerrarNotificacion();
        return false;
    }
    notificacionValidacion.value = false; // No hay errores
    cerrarNotificacion();
    nuevaPassword();
    return true;
}

const togglePasswordVisibility = (field) => {
    if (field === 'newPassword') {
        mostrarNuevaPassword.value = !mostrarNuevaPassword.value;
    } else if (field === 'confirmPassword') {
        mostrarConfirmarCon.value = !mostrarConfirmarCon.value;
    }
};

// Validaciones
function validarCampos() {
    if (codigo.value === null || codigo.value === "") {
        notificacionValidacion.value = true;
        mensajeValidacion.value = 'Por favor digite el código';
        setTimeout(() => {
            notificacionValidacion.value = false;
            mensajeValidacion.value = '';
        }, 3000);
        return;
    }
    confirmarCodigo();
}

//Registro usuario
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
            mostrarModalLogin.value = false;
            const modalElement = document.getElementById('RegistraseUser');
            const bsModal = bootstrap.Modal.getInstance(modalElement);
            if (bsModal) bsModal.hide();

            // Limpiar la imagen del array después de una actualización exitosa
            limpiarRegistro();
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

const login = async () => {
    loading.value = true;
    const data = {
        num_documento: cedula.value,
        password: contrasena.value,
    };

    try {
        const response = await useUsuario.login(data);

        if (useUsuario.estatus === 200) {
            console.log(response);
            mostrarModalLogin.value = false;
            const modalElement = document.getElementById('IngresarUser');
            const bsModal = bootstrap.Modal.getInstance(modalElement);
            if (bsModal) bsModal.hide();
            limpiar();
            Ingresar();

        } else if (useUsuario.estatus === 400 || useUsuario.estatus === 401 || useUsuario.estatus === 404 || useUsuario.estatus === 500) {
            notificacionValidacion.value = true;
            validacion.value = 'Usuario o contraseña incorrectos';
            setTimeout(() => {
                notificacionVisible.value = false;
            }, 4000);
            return;
        }
    } catch (error) {
        console.log(error);
        notificacionValidacion.value = true;
        validacion.value = 'Usuario o contraseña incorrectos';
        setTimeout(() => {
            notificacionVisible.value = false;
        }, 9000);
        return;
    } finally {
        loading.value = false;
    }
};

function limpiar() {
    cedula.value = '';
    contrasena.value = '';
}

function Ingresar() {
    router.push('/inicio')
}

function irCrearUsuario() {
    router.push('/crear-usuario')
}

function irTablaAdministrador() {
    router.push('/tabla-administrador')
}

function irTablaCliente() {
    router.push('/tabla-cliente')
}

function irActualizarDatos() {
    router.push('/actualizar-datos')
}

function logOut() {
    useUsuario.token = '';
    useUsuario.usuario = '';
    useUsuario.rol = '';
    useUsuario.id = '';
    router.push("/home")
}

function limpiarRegistro() {
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

function home() {
    primeraParte.value = true;
    segundaParte.value = false;
    terceraParte.value = false;
    correoRecuperar.value = '';
    codigo.value = '';
    const modalElement = document.getElementById('RecuperarContraseña');
    const bsModal = bootstrap.Modal.getInstance(modalElement);
    if (bsModal) bsModal.hide();
}

</script>

<template>
    <div class="app-container">
        <!-- Barra de navegación fija -->
        <nav v-if="!useUsuario.token" class="navbar fixed-top" style="background-color: #000000;">
            <div class="container-fluid">
                <a class="navbar-brand">
                    <img src="../assets/logo_2.png" alt="Logo" width="600" height="100"
                        class="d-inline-block align-text-top" />
                </a>
                <form class="d-flex">
                    <i style="cursor: pointer;color: #fdfefe ; font-size: 80px; margin-right: 20px;"
                        class="bi bi-person-circle" aria-controls="IngresarUser" data-bs-toggle="modal"
                        data-bs-target="#IngresarUser"></i>
                </form>
            </div>
        </nav>

        <nav v-if="useUsuario.rol === 'Cliente'" class="navbar fixed-top" style="background-color: #000000;">
            <div class="container-fluid">
                <!--Icono de navegación del menu-->
                <button class="navbar-toggler" type="button" style="background-color: #f8601d;"
                    data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <!--Letrero en marquesina-->
                <div class="navbar-nav ms-auto">
                    <marquee behavior="scroll" direction="left"
                        style="color: #fdfefe; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; font-size: xx-large;">
                        ¡Bienvenidos a nuestro crossfit! Trainers Col Socorro
                    </marquee>
                </div>
                <!--Menu desplegable-->
                <div class="offcanvas offcanvas-start" style="background-color: #000000; color: #fdfefe;" tabindex="-1"
                    id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <!--Encabezado del menu-->
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title mx-auto" id="offcanvasNavbarLabel"><img src="../assets/logo_3.png"
                                @click="Ingresar()" style="cursor: pointer;" data-bs-dismiss="offcanvas"
                                aria-label="Close" alt="Trainerscol"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <!--Cuerpo del menu-->
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page"
                                    style="cursor: pointer; color: #fdfefe; font-weight: bold;"
                                    @click="irActualizarDatos()">Actualizar
                                    Datos</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link"
                                    style="cursor: pointer; color: #fdfefe; font-weight: bold;">Registrar
                                    Reto</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link"
                                    style="cursor: pointer; color: #fdfefe; font-weight: bold;">Encuesta</a>
                            </li>
                            <div style=" border: 1px solid #f8601d;"></div>
                            <li class="nav-item">
                                <span class="nav-link" style="color: #fdfefe; font-weight: bold;">Redes Sociales</span>
                                <a style="color: #fdfefe; font-size: 30px;" href="https://www.facebook.com/Trainerscol/"
                                    target="_blank"><i class="bi bi-facebook" style="color: #f8601d;"></i></a>
                                <a style="color: #fdfefe; font-size: 30px;margin: 0 10px;"
                                    href="https://www.instagram.com/trainerscolsoc?igshid=1tt2rd726w4dz"
                                    target="_blank"><i class="bi bi-instagram" style="color: #f8601d;"></i></a>
                                <a style="color: #fdfefe; font-size: 30px;"
                                    href="https://www.youtube.com/channel/UCSlxXNEJxW1c1gtZ8Y-4QRA" target="_blank"><i
                                        class="bi bi-youtube" style="color: #f8601d;"></i></a>
                            </li>
                            <li class="nav-item">
                                <span class="nav-link" style="color: #fdfefe; font-weight: bold;">WhatSapp</span>
                                <a style="color: #fdfefe; font-size: 30px; text-decoration: none;"
                                    href="https://wa.me/3012756264" target="_blank" class="whatsapp-button"><i
                                        class="bi bi-whatsapp" style="color: #f8601d;"></i></a>
                            </li>
                            <li class="nav-item">
                                <span class="nav-link" style="color: #fdfefe; font-weight: bold;">Contáctenos</span>
                                <p style="color: #fdfefe; font-size: 15px;"><i class="bi bi-telephone-fill"
                                        style="color: #f8601d;"></i> 310 3660846</p>
                                <p style="color: #fdfefe; font-size: 15px;"><i class="bi bi-envelope-at-fill"
                                        style="color: #f8601d;"></i> trainerscolsoc@gmail.com</p>
                            </li>
                            <li class="nav-item">
                                <span class="nav-link" style="color: #fdfefe; font-weight: bold;">Pagina Web</span>
                                <a style="color: #fdfefe; font-size: 30px; text-decoration: none;"
                                    href="https://trainerscol.com/" target="_blank"><i class="bi bi-globe"
                                        style="color: #f8601d;"></i></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" style="color: #fdfefe; font-weight: bold; cursor: pointer;"
                                    @click="logOut()">
                                    <i class="bi bi-box-arrow-right" style="color: #f8601d;"></i> Cerrar Sesión
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

        <nav v-if="useUsuario.rol === 'Administrador'" class="navbar fixed-top" style="background-color: #000000;">
            <div class="container-fluid">
                <!--Icono de navegación del menu-->
                <button class="navbar-toggler" type="button" style="background-color: #f8601d;"
                    data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <!--Letrero en marquesina-->
                <div class="navbar-nav ms-auto">
                    <marquee behavior="scroll" direction="left"
                        style="color: #fdfefe; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; font-size: xx-large;">
                        ¡Bienvenidos a nuestro crossfit! Trainers Col Socorro
                    </marquee>
                </div>
                <!--Menu desplegable-->
                <div class="offcanvas offcanvas-start" style="background-color: #000000; color: #fdfefe;" tabindex="-1"
                    id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <!--Encabezado del menu-->
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title mx-auto" id="offcanvasNavbarLabel"><img src="../assets/logo_3.png"
                                data-bs-dismiss="offcanvas" aria-label="Close" @click="Ingresar()" alt="trainerscol">
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <!--Cuerpo del menu-->
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item dropdown">
                                <a class="nav-link active dropdown-toggle" aria-current="page" data-bs-toggle="dropdown"
                                    aria-expanded="false" style="color: #fdfefe; font-weight: bold;" href="#">Usuario
                                    Administrador</a>
                                <ul class="dropdown-menu" style="background-color: #000000;">
                                    <li><a class="dropdown-item"
                                            style="cursor: pointer; color: #c8cbcb; font-weight: bold"
                                            @click="irCrearUsuario()">Crear Usuario</a></li>
                                    <li><a class="dropdown-item"
                                            style="cursor: pointer; color: #c8cbcb; font-weight: bold"
                                            @click="irTablaAdministrador()">Gestión Usuario</a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" style="cursor: pointer; color: #fdfefe; font-weight: bold;"
                                    @click="irTablaCliente()">Gestor Cliente</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" style="cursor: pointer; color: #fdfefe; font-weight: bold;">Ver
                                    Encuesta</a>
                            </li>
                            <div style=" border: 1px solid #f8601d;"></div>
                            <li class="nav-item gap-5">
                                <span class="nav-link" style="color: #fdfefe; font-weight: bold;">Redes Sociales</span>
                                <a style="color: #fdfefe; font-size: 30px;" href="https://www.facebook.com/Trainerscol/"
                                    target="_blank"><i class="bi bi-facebook" style="color: #f8601d;"></i></a>
                                <a style="color: #fdfefe; font-size: 30px; margin: 0 10px;"
                                    href="https://www.instagram.com/trainerscolsoc?igshid=1tt2rd726w4dz"
                                    target="_blank"><i class="bi bi-instagram" style="color: #f8601d;"></i></a>
                                <a style="color: #fdfefe; font-size: 30px;"
                                    href="https://www.youtube.com/channel/UCSlxXNEJxW1c1gtZ8Y-4QRA" target="_blank"><i
                                        class="bi bi-youtube" style="color: #f8601d;"></i></a>
                            </li>
                            <li class="nav-item">
                                <span class="nav-link" style="color: #fdfefe; font-weight: bold;">WhatSapp</span>
                                <a style="color: #fdfefe; font-size: 30px; text-decoration: none;"
                                    href="https://wa.me/3012756264" target="_blank" class="whatsapp-button"><i
                                        class="bi bi-whatsapp" style="color: #f8601d;"></i></a>
                            </li>
                            <li class="nav-item">
                                <span class="nav-link" style="color: #fdfefe; font-weight: bold;">Contáctenos</span>
                                <p style="color: #fdfefe; font-size: 15px;"><i class="bi bi-telephone-fill"
                                        style="color: #f8601d;"></i> 310 3660846</p>
                                <p style="color: #fdfefe; font-size: 15px;"><i class="bi bi-envelope-at-fill"
                                        style="color: #f8601d;"></i> trainerscolsoc@gmail.com</p>
                            </li>
                            <li class="nav-item">
                                <span class="nav-link" style="color: #fdfefe; font-weight: bold;">Pagina Web</span>
                                <a style="color: #fdfefe; font-size: 30px; text-decoration: none;"
                                    href="https://trainerscol.com/" target="_blank"><i class="bi bi-globe"
                                        style="color: #f8601d;"></i></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" style="color: #fdfefe; font-weight: bold; cursor: pointer;"
                                    @click="logOut()">
                                    <i class="bi bi-box-arrow-right" style="color: #f8601d;"></i> Cerrar Sesión
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Contenedor del contenido principal -->
        <main class="content">
            <router-view></router-view>
        </main>
        <!-- Footer -->
        <footer v-if="!useUsuario.token" class="footer">
            <div class="container p-3">
                <form class="row">
                    <div class="col-lg-4 col-md-12 mb-0">
                        <h6 style="color: #fdfefe; font-weight: bold; margin: 5px;">Siganos en Nuestra Redes</h6>
                        <div
                            style="display: flex; justify-content: center; align-items: center; height: 100px; gap: 10px;">
                            <a style="color: #fdfefe; font-size: 30px;" href="https://www.facebook.com/Trainerscol/"
                                target="_blank">
                                <i class="bi bi-facebook" style="color: #f8601d;"></i>
                            </a>
                            <a style="color: #fdfefe; font-size: 30px;"
                                href="https://www.instagram.com/trainerscolsoc?igshid=1tt2rd726w4dz" target="_blank">
                                <i class="bi bi-instagram" style="color: #f8601d;"></i>
                            </a>
                            <a style="color: #fdfefe; font-size: 30px;"
                                href="https://www.youtube.com/channel/UCSlxXNEJxW1c1gtZ8Y-4QRA" target="_blank">
                                <i class="bi bi-youtube" style="color: #f8601d;"></i>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-12 mb-md-0">
                        <p style="color: #fdfefe; font-size: 15px; font-weight: bolder;">
                            <i class="bi bi-geo-alt-fill" style="color: #f8601d;"></i>
                            Calle 12 N° 10 - 48, Socorro, Santander, Colombia
                        </p>
                        <p style="color: #fdfefe; font-size: 15px; text-decoration: none;">
                            <i class="bi bi-globe" style="color: #f8601d;">
                                <a href="https://trainerscol.com/" target="_blank"
                                    style="color: #fdfefe; font-weight: bold;">
                                    https://trainerscol.com
                                </a>
                            </i>
                        </p>
                        <p
                            style="color: #fdfefe; display: flex; justify-content: center; align-items: center; font-size: smaller; font-weight: bolder;">
                            © 2024 Copyright: Trainers Col Socorro
                        </p>
                    </div>
                    <div class="col-lg-4 col-md-12 mb-0">
                        <h6 style="color: #fdfefe; font-weight: bold; margin: 5px;">Contacto</h6>
                        <p style="color: #fdfefe; font-size: 15px;">
                            <i class="bi bi-telephone-fill" style="color: #f8601d;"></i>
                            310 3660846
                        </p>
                        <p style="color: #fdfefe; font-size: 15px;">
                            <i class="bi bi-envelope-at-fill" style="color: #f8601d;"></i>
                            trainerscolsoc@gmail.com
                        </p>
                    </div>
                </form>
            </div>
        </footer>

        <!--Modal para Ingreso del usuario-->
        <div class="modal fade" id="IngresarUser" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            role="directory" aria-labelledby="IngresoUser" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header" style="background-color: #000000;">
                        <h4 class="modal-title fs-5" id="IngresoUser" style="color: #fdfefe; font-weight: bold;">Iniciar
                            Sesión</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            style="background-color: white;"></button>
                    </div>
                    <div class="modal-body" style="background-color: #8c8888;">
                        <form @submit.prevent="login">
                            <div class="form-group mb-3">
                                <label for="nombreUsuario" class="form-label d-flex justify-content-start"
                                    style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Usuario:</label>
                                <input type="number" v-model="cedula" class="form-control" id="nombreUsuario"
                                    maxlength="20" required>
                            </div>
                            <div class="form-group mb-3">
                                <label for="Contraseña" class="form-label d-flex justify-content-start"
                                    style="color: #fdfefe; font-size: smaller; font-weight: bold;">Contraseña:</label>
                                <input type="password" v-model="contrasena" class="form-control" id="Contraseña"
                                    maxlength="20" required>
                            </div>
                            <div>
                                <a data-bs-toggle="modal" data-bs-target="#RegistraseUser"
                                    style="font-size: small; color: #fdfefe; font-weight: bold; text-decoration: none;"
                                    href="#">Registrase</a>
                            </div>
                            <div>
                                <a data-bs-toggle="modal" data-bs-target="#RecuperarContraseña"
                                    style="font-size: small; color: #fdfefe; font-weight: bold; text-decoration: none;"
                                    href="#">Recuperar
                                    Contraseña</a>
                            </div>

                            <div class="modal-footer" style="background-color: #000000;">
                                <button type="submit" class="btn"
                                    style="background-color: #f8601d; color: #fdfefe; font-weight: bold;">Ingresar</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
        <!--Modal Registrar Usuario-->
        <div class="modal fade" id="RegistraseUser" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            role="directory" aria-labelledby="IngresoUser" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header" style="background-color: #000000;">
                        <h4 class="modal-title fs-5" id="IngresoUser" style="color: #fdfefe; font-weight: bold;">
                            Registrate</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            style="background-color: white;"></button>
                    </div>
                    <div class="modal-body" style="background-color: #8c8888;">
                        <form @submit.prevent="crearUsuario">
                            <div class="mb-3">
                                <label for="userNombre" style="font-weight: bold; color: #fdfefe;"
                                    class="form-label">Nombres
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
                                <label for="UserNumDoc" style="font-weight: bold; color: #fdfefe;"
                                    class="form-label">Tipo de
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
                                <label for="UserNumDoc" style="font-weight: bold; color: #fdfefe;"
                                    class="form-label">Numero de
                                    Documento <span class="text-danger">*</span></label>
                                <input v-model="num_documento" type="number" class="form-control" id="UserNumDoc"
                                    placeholder="Digite el número del documento" required>
                            </div>
                            <div class="mb-3">
                                <label for="UserEmail" style="font-weight: bold; color: #fdfefe;"
                                    class="form-label">Correo
                                    electronico <span class="text-danger">*</span></label>
                                <input v-model="correo" type="email" class="form-control" id="UserEmail"
                                    aria-describedby="emailHelp" placeholder="Digite el correo electronico" required>
                            </div>
                            <div class="mb-3">
                                <label for="UserEmail" style="font-weight: bold; color: #fdfefe;"
                                    class="form-label">Edad
                                    <span class="text-danger">*</span></label>
                                <input v-model="edad" type="number" class="form-control" id="UserEmail"
                                    aria-describedby="emailHelp" placeholder="Digite la edad" required>
                            </div>
                            <div class="mb-3">
                                <label for="UserNumDoc" style="font-weight: bold; color: #fdfefe;"
                                    class="form-label">Tipo de
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
                                <label for="UserTelefono" style="font-weight: bold; color: #fdfefe;"
                                    class="form-label">Telefono
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
                            <div class="modal-footer" style="background-color: #000000;">
                                <button type="sumbit" class="btn mb-3" :disabled="guardando"
                                    style="background-color: #f8601d; color: #fdfefe; border-radius: 4px; font-weight: bold;">
                                    <span v-if="guardando" class="spinner-border spinner-border-sm" role="status"
                                        aria-hidden="true"></span>
                                    <span v-if="!guardando">Registrar</span></button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
        <!--Modal Recuperar Contraseña-->
        <div class="modal fade" id="RecuperarContraseña" data-bs-backdrop="static" data-bs-keyboard="false"
            tabindex="-1" role="directory" aria-labelledby="IngresoUser" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header" style="background-color: #000000;">
                        <h4 class="modal-title fs-5" id="IngresoUser" style="color: #fdfefe; font-weight: bold;">
                            Recuperar
                            Contraseña</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="home()"
                            style="background-color: white;"></button>
                    </div>
                    <div class="modal-body" style="background-color: #8c8888;">
                        <form v-if="primeraParte" @submit.prevent="validarCampo">
                            <div class="form-group mb-3">
                                <label for="Email" class="form-label d-flex justify-content-start"
                                    style="color: #fdfefe; font-size: smaller; font-weight: bold;">Correo
                                    Electronico:</label>
                                <input type="email" v-model="correoRecuperar" class="form-control" id="Email"
                                    placeholder="email@gmail.com" required>
                            </div>
                            <div class="modal-footer d-flex justify-content-center" style="background-color: #000000;">
                                <button type="submit" class="btn" :disabled="loadingCorreo"
                                    style="background-color: #f8601d; color: #fdfefe; font-weight: bold;"> <span
                                        v-if="loadingCorreo" class="spinner-border spinner-border-sm" role="status"
                                        aria-hidden="true"></span>
                                    <span v-if="!loadingCorreo">Recuperar</span></button>
                            </div>
                        </form>
                        <form v-if="segundaParte" @submit.prevent="validarCampos">
                            <div class="form-group mb-3">
                                <label for="Email" class="form-label d-flex justify-content-center fs-5 "
                                    style="color: #fdfefe; font-size: smaller; font-weight: bold;">Verificar
                                    código</label>
                                <p class="text-center fw-bold" style="color: black;">Por favor, digite el código de
                                    verificación enviado a {{ email }}
                                </p>
                                <input type="number" v-model="codigo" class="form-control" id="Email"
                                    placeholder="Digite el código..." required>
                            </div>
                            <div class="modal-footer d-flex justify-content-center" style="background-color: #000000;">
                                <button type="submit" class="btn" :disabled="loadVerificar"
                                    style="background-color: #f8601d; color: #fdfefe; font-weight: bold;"> <span
                                        v-if="loadVerificar" class="spinner-border spinner-border-sm" role="status"
                                        aria-hidden="true"></span>
                                    <span v-if="!loadVerificar">Enviar</span></button>
                            </div>
                        </form>
                        <div v-if="terceraParte">
                            <section class="container" v-if="showOne">
                                <form class="form" @submit.prevent="validarContrasena">
                                    <div class="form-group">
                                        <label class="text-bold text-h6 mb-3 fw-bold" for="password">Por favor, ingrese
                                            la nueva contraseña</label>
                                        <div class="input-wrapper">
                                            <div class="input-group">
                                                <input :type="mostrarNuevaPassword ? 'text' : 'password'" id="password"
                                                    class="form-control" v-model="dataRecuperar.password"
                                                    placeholder="Nueva contraseña..." />
                                                <button class="btn-outline-secondary" id="btn" type="button"
                                                    @click="togglePasswordVisibility('newPassword')">
                                                    <i
                                                        :class="mostrarNuevaPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                                                </button>
                                            </div>
                                        </div>

                                        <label class="text-bold text-h6 mt-4 mb-2 fw-bold"
                                            for="confirm-password">Confirmar contraseña</label>
                                        <div class="input-wrapper">
                                            <div class="input-group mb-3">
                                                <input :type="mostrarConfirmarCon ? 'text' : 'password'"
                                                    id="confirm-password" class="form-control" v-model="checkPassword"
                                                    placeholder="Confirmar contraseña..." />
                                                <button class="btn-outline-secondary" id="btns" type="button"
                                                    @click="togglePasswordVisibility('confirmPassword')">
                                                    <i
                                                        :class="mostrarConfirmarCon ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-center">
                                            <button value="Enviar" type="submit" class="btn" :disabled="loadNuevaPass"
                                                style="background-color: #f8601d; color: #fdfefe; font-weight: bold;">
                                                <span v-if="loadNuevaPass" class="spinner-border spinner-border-sm"
                                                    role="status" aria-hidden="true"></span>
                                                <span v-if="!loadNuevaPass"> Cambiar contraseña
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </section>

                            <section v-if="showTwo" id="second"
                                style="background-color: white; padding: 10px; border-radius: 5px;">
                                <article id="stext">
                                    <div id="stext11">
                                        <p class="text-center fs-4 fw-bold" id="smessage" style="color: #f8601d;">¡La
                                            contraseña ha sido cambiada
                                            exitosamente!</p>
                                        <div id="stext2">
                                            <p class="text-center" id="smessage2">Ahora puede ingresar al sistema</p>
                                            <div class="text-center">
                                                <button type="submit" class="btn" @click="home"
                                                    style="background-color: #f8601d; color: #fdfefe; font-weight: bold;">Ir
                                                    al inicio</button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </section>
                        </div>
                    </div>

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
/* Estilo para los botones fijos */
.social-buttons {
    position: fixed;
    top: 50%;
    /* Centrado vertical */
    /*left: 50%; /* Centrado horizontal */
    right: 10px;
    /* Distancia desde el lado derecho */
    transform: translatey(-50%);
    /* Ajusta la posición para que quede centrado */
    z-index: 1050;
    /* Asegura que estén encima de otros elementos */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.social-buttons img {
    margin-bottom: 10px;
    /* Espaciado entre botones */
    color: white;
    text-align: center;
    width: 50px;
    height: 50px;
    line-height: 50px;
    /* Centra el ícono verticalmente */
    border-radius: 50%;
    /* Hace que el botón sea circular */
}

/* Colores personalizados */
.social-buttons .facebook {
    background-color: #3b5998;
    /* Color de Facebook */
}

.social-buttons .instagram {
    background-color: #e1306c;
    /* Color de Instagram */
}

.social-buttons .youtube {
    background-color: #943126;
    /* Color de youtube */
}

.social-buttons .whatsapp {
    background-color: #186a3b;
    /* Color de whatsapp */
}

.social-buttons a:hover {
    opacity: 0.8;
    /* Efecto hover */
}

/* Ajuste para pantallas pequeñas */
@media (max-width: 576px) {
    .social-buttons {
        top: auto;
        /* Mueve los botones al fondo */
        bottom: 10px;
        /* Posición desde la parte inferior */
        right: 10px;
        flex-direction: row;
        /* Coloca los botones en fila horizontal */
        justify-content: center;
    }

    .social-buttons a {
        margin: 0 5px;
        /* Espaciado horizontal entre botones */
    }
}

.full-screen-img {
    width: 100%;
    /* Ocupa todo el ancho */
    height: calc(1100px - 62px);
    /* Ocupa todo el alto del viewport */
    object-fit: cover;
    /* Ajusta la imagen sin distorsionar proporciones */
}

.content {
    margin-top: 62px;
    /* Igual a la altura de la barra */
}

.app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    /* Asegura que el contenedor ocupe toda la pantalla */
}

.content {
    flex: 1;
    /* Permite que el contenido ocupe el espacio disponible */
    margin-top: 62px;
    /* Altura de la barra de navegación */
}

.footer {
    background-color: #000000;
    color: white;
    text-align: center;
    padding: 20px;
    font-size: 14px;
}

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