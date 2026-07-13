import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import NotFound from "@/pages/NotFoundPage.vue";

// Importación directa para asegurar que el login se cargue inmediatamente
import LoginView from "@/pages/Login/LoginView.vue";
import RegisterView from "@/pages/Register/RegisterView.vue";
import ForgotPasswordView from "@/pages/ForgotPassword/ForgotPasswordView.vue";
import SeeUsersView from "../pages/SeeUsers/SeeUsersView.vue";
import FichaClinica from "../components/FichaClinica.vue";
import VerFichasClinicas from "../components/VerFichasClinicas.vue";
import SeleccionarRol from "../components/SeleccionarRol.vue";
import EvaluacionNutricional from "../components/EvaluacionNutricional.vue";
import ListaPacientes from "../components/ListaPacientes.vue";
import GestiondeUsuarios from "../components/GestiondeUsuarios.vue";
import GestiondeRoles from "../components/GestiondeRoles.vue";
import VerPlanNutricional from "../components/VerPlanNutricional.vue";
import ConsultarEstadoFicha from "../components/ConsultarEstadoFicha.vue";
import EditarPlan from "../components/EditarPlan.vue";
import SolicitudExamen from "../components/SolicitudExamen.vue";
import AgendaView from "../pages/AgendaView.vue";

// Lazy loading para las demás páginas
const Dashboard = () => import("@/pages/Dashboard.vue");
const Profile = () => import("@/pages/Profile.vue");
const Notifications = () => import("@/pages/Notifications.vue");
const Icons = () => import("@/pages/Icons.vue");
const Maps = () => import("@/pages/Maps.vue");
const Typography = () => import("@/pages/Typography.vue");
const TableList = () => import("@/pages/TableList.vue");

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: "/forgot-password",
    name: "forgotPassword",
    component: ForgotPasswordView,
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: { requiresAuth: true, role: "Administrador" },
  },
  
  {
    path: "/admin",
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "seleccionar-rol",
        name: "seleccionar-rol",
        component: SeleccionarRol,
      },
      {
        path: "SeeUsers",
        name: "See Users",
        component: SeeUsersView,
      },
      {
        path: "profile",
        name: "profile",
        component: Profile,
      },
      {
        path: "editar-plan/:id",
        name: "EditarPlanNutricional",
        component: EditarPlan,
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications,
      },
      {
        path: "icons",
        name: "icons",
        component: Icons,
      },
      {
        path: "maps",
        name: "maps",
        component: Maps,
      },
      {
        path: "typography",
        name: "typography",
        component: Typography,
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList,
      },
     
      {
        path: "fichaclinica",
        name: "ficha clinica",
        component: FichaClinica,
        meta: { requiresAuth: false },
      },
      {
        path: "verfichasclinicas",
        name: "ver fichas clinicas",
        component: VerFichasClinicas,
        meta: { requiresAuth: false },
      },
      {
        path: "evaluacionNutricional",
        name: "evaluacion Nutricional",
        component: EvaluacionNutricional,
        meta: { requiresAuth: false },
      },
      {
        path: "solicitudexamenes",
        name: "solicitud Examen",
        component: SolicitudExamen,
        meta: { requiresAuth: false },
      },
      {
        path: "agenda",
        name: "agenda",
        component: AgendaView,
        meta: { requiresAuth: false }, 
      },
      {
        path: "gestionusuarios",
        name: "gestion usuarios",
        component: GestiondeUsuarios,
        meta: { requiresAuth: false },
      },
      {
        path: "gestionroles",
        name: "gestion roles",
        component: GestiondeRoles,
        meta: { requiresAuth: false },
      },
      {
        path: "listaPacientes",
        name: "lista Pacientes",
        component: ListaPacientes,
        meta: { requiresAuth: false },
      },
      {
        path: "verplannutrional",
        name: "ver plan nutrional",
        component: VerPlanNutricional,
        meta: { requiresAuth: false },
      },
      {
        path: "ConsultarestadoFicha",
        name: "Consultar estado Ficha",
        component: ConsultarEstadoFicha,
        meta: { requiresAuth: false },
      },
      {
        path: "fichaclinica/:id/editar",
        name: "EditarFicha",
        component: FichaClinica,
        meta: { requiresAuth: false },
      },

      // Redirección para rutas no encontradas dentro del dashboard
      { path: "*", redirect: "/admin/dashboard" },
    ],
  },
  // {
  //   path: "*",
  //   redirect: "/login"
  // },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
