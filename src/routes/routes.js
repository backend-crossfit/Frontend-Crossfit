import { createRouter, createWebHashHistory } from "vue-router";
import Nav from "../components/Nav.vue";
import Home from "../components/Home.vue";
import Inicio from "../components/Inicio.vue";
import CrearUsuario from "../components/administrador/CrearUsuario.vue";
import TablaAdministradores from "../components/administrador/TablaAdministradores.vue";
import EditarAdministrador from "../components/administrador/EditarAdministrador.vue";
import TablaClientes from "../components/administrador/TablaClientes.vue";
import DatosCliente from "../components/administrador/DatosCliente.vue";
import ActualizarDatos from "../components/cliente/ActualizarDatos.vue";
/* import recuperarContra from "../components/recuperarContraseña/RecuperarContrasena.vue"; */

const routes = [
  {
    path: "/",
    component: Nav,
    children: [
      { path: "", redirect: "/home" },
      {
        path: "/home",
        component: Home,
      },
      {
        path: "/inicio",
        component: Inicio,
      },
      {
        path: "/crear-usuario",
        component: CrearUsuario,
      },
      {
        path: "/tabla-administrador",
        component: TablaAdministradores,
      },
      {
        path: "/editar-admin",
        component: EditarAdministrador,
      },
      {
        path: "/tabla-cliente",
        component: TablaClientes,
      },
      {
        path: "/datos-cliente",
        component: DatosCliente,
      },
      {
        path: "/actualizar-datos",
        component: ActualizarDatos,
      },
    ],
  },
/*   { path: "/recuperar-contrasena", component: recuperarContra }, */
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
