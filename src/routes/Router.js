import { createRouter, createWebHistory } from "vue-router";
import { useMainStore } from "@/stores/main";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/templates/Default.vue"),
    children: [
      {
        // Rotas de ponto
        path: "/",
        name: "Home",
        component: () => import("@/views/Home/PontoView.vue"),
      },
      {
        // Rotas de relatórios
        path: "/relatorios",
        name: "Relatorios",
        children: [
          {
            path: "/relatorios/lista",
            name: "Lista",
            component: () =>
              import("@/views/Relatorios/ListaRelatorioView.vue"),
          },
        ],
      },
      {
        //  Rotas de espelho
        path: "/espelho",
        name: "Espelho",
        component: () => import("@/views/Espelho/EspelhoPontoView.vue"),
      },
      {
        // Rotas de perfil
        path: "/perfil",
        name: "Perfil",
        children: [
          {
            path: "/perfil",
            name: "Perfil",
            component: () => import("@/views/Perfil/ConfiguracoesView.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const mainStore = useMainStore();
  if (to.path !== "/login") {
    mainStore.isAuth ? next() : next("/login");
  }else {
    next()
  }
})

export default router;
