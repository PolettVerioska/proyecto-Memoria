<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <!-- Nutricionista -->
        <template v-if="userRole === 'Nutricionista'">
          <sidebar-link
            to="/admin/fichaclinica"
            name="Crear Ficha Clinica"
            icon="tim-icons icon-chart-pie-36"
          />
          <sidebar-link
            to="/admin/verfichasclinicas"
            name="Ver Fichas Clinicas"
            icon="tim-icons icon-atom"
          />
          <sidebar-link
            to="/admin/listaPacientes"
            name="Ver Pacientes"
            icon="tim-icons icon-single-02"
          />
          <sidebar-link
            to="/admin/verplannutrional"
            name="Planes Nutricionales"
            icon="tim-icons icon-notes"
          />
          <sidebar-link
            to="/admin/solicitudexamenes"
            name="Solicitar Examenes"
            icon="tim-icons icon-bullet-list-67"
          />
          <sidebar-link
            to="/admin/agenda"
            name="Agenda"
            icon="tim-icons icon-calendar-60"
          />
        </template> 

       <!--  Administrador -->
        <template v-else-if="userRole === 'Administrador'">
          <sidebar-link
            to="/admin/gestionusuarios"
            name="Gestión de usuarios"
            icon="tim-icons icon-pin"
          />
          <sidebar-link
            to="/admin/gestionroles"
            name="Gestión de Roles"
            icon="tim-icons icon-pin"
          />
          <sidebar-link
            to="/register"
            name="Registrar admin/nutri"
            icon="tim-icons icon-pin"
          />
        </template>

        <!-- Paciente -->
        <template v-else-if="userRole === 'Paciente'">
          <sidebar-link
            to="/admin/verfichasclinicas"
            name="Ver Fichas Clínicas"
            icon="tim-icons icon-atom"
          />
        </template>
      </template>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>
      <dashboard-content @click.native="toggleSidebar"></dashboard-content>
      <content-footer></content-footer>
    </div>
  </div>
</template>

<style lang="scss"></style>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";

export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
  },
  data() {
    return {
      userRole: null
    };
  },
  watch: {
    '$route'() {
      this.cargarRol();
    }
  },
  mounted() {
    this.cargarRol();
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    cargarRol() {
      const rolActivoStr = localStorage.getItem("rolActivo");
      
      if (!rolActivoStr) {
        this.userRole = null;
        return;
      }

      try {
        const rol = JSON.parse(rolActivoStr);
        this.userRole = rol.nombre ? rol.nombre : rolActivoStr;
      } catch (e) {
        this.userRole = rolActivoStr;
      }
    }
  }
};
</script>
