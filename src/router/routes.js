const routes = [
  {
    path: "/",
    redirect: "/login", // Adicione esta linha para redirecionar de "/" para "/login"
  },
  {
    path: "/login",
    component: () => import("pages/LoginPage.vue"),
  },

  {
    path: "/chatother",
    component: () => import("components/otherchatpage.vue"),
  },

  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "home", component: () => import("pages/IndexPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
