import { createRouter, createWebHistory } from "vue-router";
import Login from "@/components/pages/auth/Login.vue";
import { useAuthStore } from "@/stores/Index";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/translations",
      name: "translations",
      component: () => import("../components/pages/article/index.vue"),
      meta: { requiresAuth: true },
    },
  ],
});
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.name === "Login" && authStore.isAuthenticated) {
    return next("/translations");
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ path: "/" });
  }

  if (to.path === "/" && authStore.isAuthenticated) {
    return next("/translations");
  }

  next();
});
export default router;
