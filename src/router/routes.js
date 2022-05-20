const routes = [
  {
    path: "/",
    component: () => import("layouts/BlueLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/avanzadas",
    component: () => import("layouts/BlueLayout.vue"),
    children: [
      { path: "", component: () => import("pages/PageAvanzadas.vue") },
    ],
  },
  {
    path: "/basicas",
    component: () => import("layouts/BlueLayout.vue"),
    children: [{ path: "", component: () => import("pages/PageBasicas.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
