<template>
  <div class="gestion-container">
    <div class="gestion-content">
      <div v-if="mostrarNotificacion" class="notificacion" :class="tipoNotificacion">
        {{ mensajeNotificacion }}
      </div>

      <h1 class="form-title">Gestión de Usuarios y Roles</h1>

      <!-- Buscador -->
      <div class="form-section">
        <h2 class="section-title">Buscar usuario</h2>
        <div class="form-group">
          <label class="form-label">Ingrese nombre o RUT</label>
          <input 
            v-model="busqueda" 
            placeholder="Ej: Ana o 19.753.159-8" 
            class="form-input"
            @input="filtrarUsuarios"
          >
        </div>
      </div>

      <!-- Cargando -->
      <div v-if="cargando" class="loading-state">
        <p>Cargando usuarios...</p>
      </div>

      <!-- Sin resultados -->
      <div v-else-if="usuariosFiltrados.length === 0" class="empty-state">
        <p>No se encontraron usuarios</p>
      </div>

      <!-- Lista de usuarios -->
      <div v-else class="roles-list">
        <div v-for="usuario in usuariosFiltrados" :key="usuario.id" class="role-card">
          <div class="role-info">
            <h3>{{ usuario.nombre }}</h3>
            <p><strong>RUT:</strong> {{ usuario.rut }}</p>
            <p><strong>Correo:</strong> {{ usuario.correo }}</p>
            <p><strong>Rol actual:</strong> {{ usuario.rolActivo || 'Sin rol' }}</p>

            <!-- Select de nuevo rol -->
            <select
              v-model="rolesSeleccionados[usuario.id]"
              class="form-input"
              style="margin-top: 1rem;"
            >
              <option disabled value="">Seleccione nuevo rol</option>
              <option v-for="rol in rolesDisponibles" :key="rol.id" :value="rol.rol">
                {{ rol.rol }}
              </option>
            </select>

            <!-- Botón para guardar cambio -->
            <button
              class="submit-button"
              style="margin-top: 0.5rem"
              @click="guardarRolDirecto(usuario)"
              :disabled="!rolesSeleccionados[usuario.id] || rolesSeleccionados[usuario.id] === usuario.rolActivo"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios"

export default {
  name: 'GestionRoles',
  data() {
    return {
      busqueda: '',
      cargando: false,
      usuarios: [],
      usuariosFiltrados: [],
      mostrarNotificacion: false,
      mensajeNotificacion: '',
      tipoNotificacion: 'info',
      timeoutNotificacion: null,

      rolesDisponibles: [
        { id: 1, rol: 'Administrador' },
        { id: 2, rol: 'Nutricionista' },
        { id: 3, rol: 'Asistente' }
      ],

      rolesSeleccionados: {} // { [usuario.id]: 'NuevoRol' }
    }
  },
  created() {
    this.cargarUsuarios()
  },
  methods: {
    async cargarUsuarios() {
      this.cargando = true
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/usuario`)
        this.usuarios = response.data.map(u => {
          // Buscar el primer rol activo (sin fechaEliminacion)
          const rolActivo = (u.rRolUsuario || []).find(r => !r.fechaEliminacion && !r.fecha_Eliminacion )
          const rol = rolActivo?.fkRol?.rol || 'Sin rol'
          const idRelacionRol = rolActivo?.id || null

          return {
            id: u.id,
            rut: u.rut,
            nombre: u.nombre,
            correo: u.correo,
            rolActivo: rol,
            idRelacionRol
          }
        })

        this.usuariosFiltrados = [...this.usuarios]

        // Inicializar selects
        const nuevosRolesSeleccionados = {};
        this.usuarios.forEach(u => {
          nuevosRolesSeleccionados[u.id] = '';
        });
        this.rolesSeleccionados = nuevosRolesSeleccionados;
      } catch (error) {
          console.error("Error al cargar usuarios:", error)
          this.mostrarNotificacionTemporal("Error al cargar usuarios", "error")
        } finally {
          this.cargando = false
        }
    },

    filtrarUsuarios() {
      const termino = this.busqueda.toLowerCase()
      this.usuariosFiltrados = this.usuarios.filter(u =>
        u.nombre.toLowerCase().includes(termino) ||
        u.rut.toString().includes(this.busqueda)
      )
    },

    async guardarRolDirecto(usuario) {
      try {
        const nuevoRol = this.rolesSeleccionados[usuario.id]

        if (!nuevoRol || nuevoRol === usuario.rolActivo) {
          this.mostrarNotificacionTemporal("Seleccione un rol distinto", "info")
          return
        }

        // Eliminar rol actual si existe
        if (usuario.idRelacionRol) {
          await axios.patch(`${process.env.VUE_APP_API_URL}/r-rol-usuario/${usuario.idRelacionRol}`, {
            estado: "eliminar"
          })
        }

        const rolEncontrado = this.rolesDisponibles.find(r => r.rol === nuevoRol)
        if (!rolEncontrado) {
          this.mostrarNotificacionTemporal("Rol seleccionado inválido", "error")
          return
        }

        // Asignar nuevo rol
        await axios.post(`${process.env.VUE_APP_API_URL}/r-rol-usuario`, {
          fkUsuario_id: usuario.id,
          fkRol_id: rolEncontrado.id
        })

        this.mostrarNotificacionTemporal("Rol actualizado correctamente", "exito")

        // Recargar usuarios y limpiar select
        await this.cargarUsuarios()
        this.$set(this.rolesSeleccionados, usuario.id, '')
      } catch (error) {
        console.error("Error al actualizar rol:", error.response?.data || error)
        this.mostrarNotificacionTemporal("Error al actualizar rol", "error")
      }
    },

    mostrarNotificacionTemporal(mensaje, tipo = 'info', duracion = 3000) {
      if (this.timeoutNotificacion) clearTimeout(this.timeoutNotificacion)
      this.mostrarNotificacion = true
      this.mensajeNotificacion = mensaje
      this.tipoNotificacion = tipo
      this.timeoutNotificacion = setTimeout(() => {
        this.mostrarNotificacion = false
      }, duracion)
    }
  }
}
</script>




<style scoped>
.gestion-container {
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.gestion-content {
  width: 100%;
  max-width: 1000px;
  background: #1a202c;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.form-title {
  color: #f9fafb;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
}

.section-title,
.form-label {
  font-size: 1.2rem;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 0.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #4a5568;
  border-radius: 6px;
  font-size: 1rem;
  background-color: #2d3748;
  color: #f9fafb;
}

.loading-state,
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #cbd5e0;
}

.roles-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.role-card {
  background: #2d3748;
  border: 1px solid #4a5568;
  border-radius: 8px;
  padding: 1.5rem;
  color: #edf2f7;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: 0.3s;
}

.role-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
}

.role-info h3 {
  margin: 0 0 1rem 0;
  color: #f9fafb;
  font-size: 1.1rem;
  font-weight: 600;
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #b35fc3;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 1rem;
}

.submit-button:hover {
  background-color: #9e4fb0;
  transform: translateY(-2px);
}
.role-info select {
  margin-bottom: 0.5rem;
}


.cancel-button {
  padding: 0.75rem;
  background-color: #718096;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #4a5568;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #2d3748;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  color: #fff;
}

.modal h2 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.modal-actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
}

.notificacion {
  position: fixed;
  top: 60px;
  right: 20px;
  padding: 15px 25px;
  border-radius: 5px;
  color: white;
  font-weight: 500;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  animation: slideIn 0.5s, fadeOut 0.5s 2.5s forwards;
}

.notificacion.info {
  background-color: #4299e1;
}

.notificacion.exito {
  background-color: #48bb78;
}

.notificacion.error {
  background-color: #f56565;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
