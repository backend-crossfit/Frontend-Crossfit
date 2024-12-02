<script setup>
import { ref } from 'vue';
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
            notificacionVisible.value = true;
            validacion.value = 'Usuario o contraseña incorrectos';
            setTimeout(() => {
                notificacionVisible.value = false;
            }, 4000);
            return;
        }
    } catch (error) {
        console.log(error);
        notificacionVisible.value = true;
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
                    <i style="color: #fdfefe ; font-size: 80px; margin-right: 20px;" class="bi bi-person-circle"
                        aria-controls="IngresarUser" data-bs-toggle="modal" data-bs-target="#IngresarUser"></i>
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
                                <a class="nav-link" style="color: #fdfefe; font-weight: bold;" href="#">Registrar
                                    Reto</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" style="color: #fdfefe; font-weight: bold;" href="#">Encuesta</a>
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
                                <a class="nav-link" style="color: #fdfefe; font-weight: bold;"
                                    @click="irTablaCliente()">Gestor Cliente</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" style="color: #fdfefe; font-weight: bold;" href="#">Ver Encuesta</a>
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
            <router-view />
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
                        <form>
                            <div class="form-group mb-3">
                                <label for="NombreUser" class="form-label d-flex justify-content-start"
                                    style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Nombres:</label>
                                <input type="text" class="form-control" id="NombreUser" required>
                            </div>
                            <div class="form-group mb-3">
                                <label for="ApellidosUser" class="form-label d-flex justify-content-start"
                                    style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Apellidos:</label>
                                <input type="number" class="form-control" id="ApellidosUser" required>
                            </div>
                            <div class="form-group mb-3">
                                <label for="TipoDocumento" class="form-label d-flex justify-content-start"
                                    style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Tipo de
                                    Documento:</label>
                                <input class="form-control" list="ListaTipoDocumento" id="TipoDocumento"
                                    placeholder="Seleccione el tipo de documento">
                                <datalist id="ListaTipoDocumento">
                                    <option value="Cédula de Ciudadanía"></option>
                                    <option value="Cédula de Extranjería"></option>
                                    <option value="Tarjeta de Identidad"></option>
                                    <option value="Pasaporte"></option>
                                </datalist>
                            </div>
                            <div class="form-group mb-3">
                                <label for="NumeroDocumento" class="form-label d-flex justify-content-start"
                                    style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Numero de
                                    Documento:</label>
                                <input type="number" class="form-control" id="NumeroDocumento" required>
                            </div>
                            <div class="form-group mb-3">
                                <label for="EdadUser" class="form-label d-flex justify-content-start"
                                    style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Edad:</label>
                                <input type="number" class="form-control" id="EdadUser" required>
                            </div>
                            <div class="form-group mb-3">
                                <label for="TipoSexo" class="form-label d-flex justify-content-start"
                                    style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Tipo de
                                    Sexo:</label>
                                <input class="form-control" list="ListaTipoSexo" id="TipoSexo"
                                    placeholder="Seleccione el tipo de Sexo">
                                <datalist id="ListaTipoSexo">
                                    <option value="Masculino"></option>
                                    <option value="Femenino"></option>
                                    <option value="No especifica"></option>
                                </datalist>
                            </div>
                            <div class="form-group mb-3">
                                <label for="Email" class="form-label d-flex justify-content-start"
                                    style="color: #fdfefe; font-size: smaller; font-weight: bold;">Correo
                                    Electronico:</label>
                                <input type="email" class="form-control" id="Email" placeholder="email@gmail.com"
                                    required>
                            </div>
                            <div class="form-group mb-3">
                                <label for="CodeVerificacion" class="form-label d-flex justify-content-start"
                                    style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Contraseña</label>
                                <input type="password" class="form-control" id="CodeVerificacion"
                                    placeholder="Ingrese una contraseña" required>
                            </div>
                            <div class="form-group mb-3">
                                <label for="CodeVerificacion" class="form-label d-flex justify-content-start"
                                    style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Codigo de
                                    Verificación:</label>
                                <input type="number" class="form-control" id="CodeVerificacion" required>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" required>
                                <label class="form-check-label" for="flexCheckDefault" style="color: #fdfefe;">Acepta
                                    las Politicas y
                                    tratamientos de datos</label>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer" style="background-color: #000000;">
                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#NotificacionRegistro"
                            style="background-color: #f8601d; color: #fdfefe; font-weight: bold;">Registrar</button>
                        <button type="submit" class="btn"
                            style="background-color: #f8601d; color: #fdfefe; font-weight: bold;"
                            data-bs-dismiss="modal">Salir</button>
                    </div>
                </div>
            </div>
        </div>
        <!--Modal de notificación de registro de usuario-->
        <div class="modal fade" id="NotificacionRegistro" data-bs-backdrop="static" data-bs-keyboard="false"
            tabindex="-1" role="directory" aria-labelledby="IngresoUser" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header" style="background-color: #000000;">
                        <h4 class="modal-title fs-5" id="IngresoUser" style="color: #fdfefe; font-weight: bold;">Mensaje
                            de Registro
                        </h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            style="background-color: white;"></button>
                    </div>
                    <div class="modal-body" style="background-color: #8c8888; text-align: justify;">
                        <p style="color: #fdfefe; font-weight: bold;">Se ha registrado satisfactoriamente; al correo
                            electronico
                            registrado llegara una notificación.</p>
                    </div>
                    <div class="modal-footer" style="background-color: #000000;">
                        <button type="submit" class="btn"
                            style="background-color: #f8601d; color: #fdfefe; font-weight: bold;">Aceptar</button>
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
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            style="background-color: white;"></button>
                    </div>
                    <div class="modal-body" style="background-color: #8c8888;">
                        <form>
                            <div class="form-group mb-3">
                                <label for="NumeroDocumento" class="form-label d-flex justify-content-start"
                                    style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Numero de
                                    Documento:</label>
                                <input type="number" class="form-control" id="NumeroDocumento" required>
                            </div>
                            <div class="form-group mb-3">
                                <label for="Email" class="form-label d-flex justify-content-start"
                                    style="color: #fdfefe; font-size: smaller; font-weight: bold;">Correo
                                    Electronico:</label>
                                <input type="email" class="form-control" id="Email" placeholder="email@gmail.com"
                                    required>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer" style="background-color: #000000;">
                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#NotificacionRecuperar"
                            style="background-color: #f8601d; color: #fdfefe; font-weight: bold;">Recuperar</button>
                        <button type="submit" class="btn"
                            style="background-color: #f8601d; color: #fdfefe; font-weight: bold;"
                            data-bs-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
        <!--Modal de notificación de envio-->
        <div class="modal fade" id="NotificacionRecuperar" data-bs-backdrop="static" data-bs-keyboard="false"
            tabindex="-1" role="directory" aria-labelledby="IngresoUser" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header" style="background-color: #000000;">
                        <h4 class="modal-title fs-5" id="IngresoUser" style="color: #fdfefe; font-weight: bold;">Mensaje
                            Recuperar
                            Contraseña</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            style="background-color: white;"></button>
                    </div>
                    <div class="modal-body" style="background-color: #8c8888; text-align: justify;">
                        <p style="color: #fdfefe; font-weight: bold;">Al correo registrado se envio información para
                            realizar la
                            recuperación de contraseña.</p>
                        <p style="color: #fdfefe; font-weight: bold;">Si en la bandeja de su correo no aparece, revise
                            el spam.</p>
                    </div>
                    <div class="modal-footer" style="background-color: #000000;">
                        <button type="submit" class="btn"
                            style="background-color: #f8601d; color: #fdfefe; font-weight: bold;">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="notificacionVisible" class="custom-notify alert alert-success alert-dismissible fade show"
            role="alert">
            {{ validacion }}
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
    background-color: #fa2424;
    color: white;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-size: 16px;
}

.custom-notify .close:hover {
    opacity: 1;
}
</style>