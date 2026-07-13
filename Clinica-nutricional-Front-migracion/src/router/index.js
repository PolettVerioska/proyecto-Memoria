import VueRouter from "vue-router";
import routes from "./routes";
import AuthService from "@/services/AuthService";

const router = new VueRouter({
  routes,
  linkExactActiveClass: "active",
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  const token = AuthService.getToken();

  if (to.path === "/login" && token) {
    return next("/admin/dashboard");
  }

  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    return next("/login");
  }

  if (token) {
    const rolActivoStr = localStorage.getItem("rolActivo");
    let userRole = null;

    if (rolActivoStr) {
      try {
        const rolObj = JSON.parse(rolActivoStr);
        userRole = rolObj.nombre ? rolObj.nombre : rolActivoStr;
      } catch (e) {
        userRole = rolActivoStr;
      }
    }

    console.log("Rol detectado:", userRole);

    if (to.path === "/register" && userRole !== "Administrador") {
      return next("/admin/dashboard");
    }
  }

  next();
});

export default router;