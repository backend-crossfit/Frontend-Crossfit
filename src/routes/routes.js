import { createRouter, createWebHashHistory } from "vue-router";
import Nav from "../components/Nav.vue";
import Home from "../components/Home.vue";
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
    ],
  },
/*   { path: "/recuperar-contrasena", component: recuperarContra }, */
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
