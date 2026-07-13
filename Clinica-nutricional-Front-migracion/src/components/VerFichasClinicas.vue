<template>
  <div class="busqueda-container">
    <h2 class="section-title">Listado de Fichas</h2>
    <!-- Buscador -->
    <div class="search-box">
      <input
        type="text"
        class="search-input"
        v-model="busqueda"
        @input="filtrarFichas"
        placeholder="Buscar por nombre o RUT"
      />
    </div>

    <div v-if="loading" class="loading">Cargando fichas...</div>
    <div v-else-if="fichas.length === 0" class="no-results">
      No hay fichas registradas.
    </div>

    <div v-else-if="fichasFiltradas.length === 0" class="no-results">
      No se encontraron fichas para el criterio de búsqueda.
    </div>

    <div v-else class="fichas-grid">
      <div v-for="ficha in fichasFiltradas" :key="ficha.id" class="ficha-card">
        <h3 class="text-dark">
          {{ ficha.fkUsuario?.nombre || "Nombre no disponible" }}
        </h3>
        <p class="text-dark">
          <strong>RUT:</strong> {{ ficha.fkUsuario?.rut || "No disponible" }}
        </p>
        <p class="text-dark">
          <strong>Correo:</strong>
          {{ ficha.fkUsuario?.correo || "No disponible" }}
        </p>
        <p class="text-dark">
          <strong>Teléfono:</strong>
          {{ ficha.fkUsuario?.telefono || "No disponible" }}
        </p>
        <button @click="verDetalle(ficha)" class="action-button primary">
          Ver detalles
        </button>
      </div>
    </div>

    <!-- Modal detalle -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>
            Ficha de
            {{ fichaSeleccionada?.fkUsuario?.nombre || "No disponible" }}
          </h2>
          <button @click="closeModal" class="close-button">&times;</button>
        </div>

        <div class="modal-body">
          <!-- Datos Personales -->
          <div class="detalle-section">
            <h3>Datos Personales</h3>
            <p>
              RUT: {{ fichaSeleccionada?.fkUsuario?.rut || "No disponible" }}
            </p>
            <p>
              Edad:
              {{ calcularEdad(fichaSeleccionada?.fkUsuario?.fechaNacimiento) }}
            </p>
            <p>
              Sexo: {{ fichaSeleccionada?.fkUsuario?.sexo || "No disponible" }}
            </p>
            <p>
              Teléfono:
              {{ fichaSeleccionada?.fkUsuario?.telefono || "No disponible" }}
            </p>
            <p>
              Email:
              {{ fichaSeleccionada?.fkUsuario?.correo || "No disponible" }}
            </p>
          </div>

          <!-- Anamnesis Social -->
          <div class="detalle-section">
            <h3>Anamnesis Social</h3>
            <p>
              Asiste con:
              {{
                fichaSeleccionada?.fkAnamnesisSocial?.asisteCon ||
                "No disponible"
              }}
            </p>
            <p>
              Hijos:
              {{
                fichaSeleccionada?.fkAnamnesisSocial?.hijos || "No disponible"
              }}
            </p>
            <p>
              Vive con:
              {{
                fichaSeleccionada?.fkAnamnesisSocial?.viveCon || "No disponible"
              }}
            </p>
            <p>
              Ocupación:
              {{
                fichaSeleccionada?.fkAnamnesisSocial?.ocupacion ||
                "No disponible"
              }}
            </p>
            <p>
              Escolaridad:
              {{
                fichaSeleccionada?.fkAnamnesisSocial?.escolaridad ||
                "No disponible"
              }}
            </p>
            <p>
              Redes de apoyo:
              {{
                fichaSeleccionada?.fkAnamnesisSocial?.redesDeApoyo ||
                "No disponible"
              }}
            </p>
            <p>
              Servicios básicos:
              {{
                fichaSeleccionada?.fkAnamnesisSocial?.serviciosBasicos ||
                "No disponible"
              }}
            </p>
          </div>

          <!-- Anamnesis Clínica -->
          <div class="detalle-section">
            <h3>Anamnesis Clínica</h3>
            <p>
              Antecedente Familiar:
              {{
                fichaSeleccionada?.fkAnamnesisClinica?.antecedenteFamiliar ||
                "No disponible"
              }}
            </p>
            <p>
              Patología Base:
              {{
                fichaSeleccionada?.fkAnamnesisClinica?.patologiaBase ||
                "No disponible"
              }}
            </p>
            <p>
              Medicamentos:
              {{
                fichaSeleccionada?.fkAnamnesisClinica?.medicamento ||
                "No disponible"
              }}
            </p>
            <p>
              Cirugías:
              {{
                fichaSeleccionada?.fkAnamnesisClinica?.antecedenteQuirurgico ||
                fichaSeleccionada?.fkAnamnesisClinica?.anetecedenteQuirurgico ||
                "No disponible"
              }}
            </p>
            <p>
              Alergias:
              {{
                fichaSeleccionada?.fkAnamnesisClinica?.alergia ||
                "No disponible"
              }}
            </p>
          </div>

          <!-- Anamnesis Alimentaria -->
          <div class="detalle-section">
            <h3>Anamnesis Alimentaria</h3>
            <p>
              Alergia / Intolerancia:
              {{
                fichaSeleccionada?.fkAnamnesisAlimentaria
                  ?.alergiaIntolerancia || "No disponible"
              }}
            </p>
            <p>
              No le gusta:
              {{
                fichaSeleccionada?.fkAnamnesisAlimentaria?.alimentoNoGusta ||
                "No disponible"
              }}
            </p>
            <p>
              Preferencias:
              {{
                fichaSeleccionada?.fkAnamnesisAlimentaria
                  ?.alimentoPreferencia || "No disponible"
              }}
            </p>
            <p>
              Cocina en casa:
              {{
                fichaSeleccionada?.fkAnamnesisAlimentaria?.cocinaEnCasa ||
                "No disponible"
              }}
            </p>
            <p>
              Habitualmente come en:
              {{
                fichaSeleccionada?.fkAnamnesisAlimentaria
                  ?.habitualmenteComeEn || "No disponible"
              }}
            </p>
          </div>
          
          <!-- Antropometría -->
          <div
            class="detalle-section"
            v-if="fichaSeleccionada.antropometrias?.length"
          >
            <h3 class="text-dark">Historial Antropométrico</h3>
            <div
              v-for="(control, index) in fichaSeleccionada.antropometrias"
              :key="index"
              class="consulta-item"
            >
              <p class="text-dark">
                <strong>Peso:</strong> {{ control.peso }} kg
              </p>
              <p class="text-dark">
                <strong>Talla:</strong> {{ control.talla }} cm
              </p>
              <p class="text-dark"><strong>IMC:</strong> {{ control.imc }}</p>

              <h4 class="text-dark">Pliegues y Circunferencias</h4>

              <p class="text-dark">
                <strong>Circunferencia cintura:</strong>
                {{ control.tomasPliegues?.[0]?.circunferenciaCintura }}
              </p>
              <p class="text-dark">
                <strong>Circunferencia braquial:</strong>
                {{ control.tomasPliegues?.[0]?.circunferenciaBraquial }}
              </p>
              <p class="text-dark">
                <strong>Circunferencia cadera:</strong>
                {{ control.tomasPliegues?.[0]?.circunferenciaCadera }}
              </p>
              <p class="text-dark">
                <strong>Circunferencia pantorrilla:</strong>
                {{ control.tomasPliegues?.[0]?.circunferenciaPantorrilla }}
              </p>
              <p class="text-dark">
                <strong>Pliegue bicipital:</strong>
                {{ control.tomasPliegues?.[0]?.pliegueBicipital }}
              </p>
              <p class="text-dark">
                <strong>Pliegue tricipital:</strong>
                {{ control.tomasPliegues?.[0]?.pliegueTricipital }}
              </p>
              <p class="text-dark">
                <strong>Pliegue subescapular:</strong>
                {{ control.tomasPliegues?.[0]?.pliegueSubescapular }}
              </p>
              <p class="text-dark">
                <strong>Pliegue suprailiaco:</strong>
                {{ control.tomasPliegues?.[0]?.pliegueSuprailiaco }}
              </p>
              <p class="text-dark">
                <strong>Pliegue abdominal:</strong>
                {{ control.tomasPliegues?.[0]?.pliegueAbdominal }}
              </p>
              <p class="text-dark">
                <strong>Pliegue muslo:</strong>
                {{ control.tomasPliegues?.[0]?.pliegueMuslo }}
              </p>
              <p class="text-dark">
                <strong>Pliegue pantorrilla:</strong>
                {{ control.tomasPliegues?.[0]?.plieguePantorrilla }}
              </p>
            </div>
          </div>

          <div v-else class="detalle-section">
            <h3>Historial Antropometría</h3>
            <p>No existen registros antropométricos.</p>
          </div>

          <!-- Registro 24 Horas -->
          <div
            class="detalle-section"
            v-if="fichaSeleccionada.registros24h?.length"
          >
            <h3 class="text-dark">Historial Registro 24 Horas</h3>

            <div
              v-for="(registro, index) in fichaSeleccionada.registros24h"
              :key="index"
              class="consulta-item"
            >
              <p class="text-dark">
                <strong>Fecha de Registro:</strong> {{ registro.fechaCreacion }}
              </p>

              <div
                v-for="(comida, idx) in registro.rRegistro24hTipocomidas"
                :key="idx"
                class="detalle-comida"
              >
                <p class="text-dark">
                  <strong>Tipo de comida:</strong>
                  {{ comida.fkTipoComida?.tipoComida }}
                </p>
                <p class="text-dark">
                  <strong>Descripción:</strong> {{ comida.descripcion }}
                </p>
                <p class="text-dark">
                  <strong>Hora:</strong> {{ comida.hora }}
                </p>
              </div>

              <hr />
            </div>
          </div>

          <div v-else class="detalle-section">
            <h3>Historial Registro 24 Horas</h3>
            <p>No existen registros de 24 horas.</p>
          </div>

          <!-- Plan Nutricional -->
          <div
            class="detalle-section"
            v-if="fichaSeleccionada.planesNutricionales?.length"
          >
            <h3 class="text-dark">Historial Plan Nutricional</h3>

            <div
              v-for="(plan, index) in fichaSeleccionada.planesNutricionales"
              :key="plan.id"
              class="consulta-item"
            >
              <p class="text-dark">
                <strong>Fecha de Creación:</strong> {{ plan.fechaCreacion }}
              </p>
              <p class="text-dark">
                <strong>Objetivo del Plan:</strong> {{ plan.objetivoPlan }}
              </p>
              <p class="text-dark">
                <strong>Recomendación Inicial:</strong>
                {{ plan.recomendacionInicial }}
              </p>
              <p class="text-dark">
                <strong>Plan Alimentario:</strong> {{ plan.planAlimentario }}
              </p>
              <p class="text-dark">
                <strong>Diagnóstico Nutricional:</strong>
                {{ plan.diagnosticoNutricional }}
              </p>
            </div>
          </div>

          <div v-else class="detalle-section">
            <h3>Historial Plan Nutricional</h3>
            <p>No existen planes nutricionales registrados.</p>
          </div>

          <!-- Archivos adjuntos -->
          <div class="detalle-section">
            <h3>Archivos Adjuntos</h3>

            <div class="archivos-container">
              <div v-if="!fichaSeleccionada.examenes?.length" class="no-files">
                No hay archivos adjuntos.
              </div>

              <div v-else class="archivos-list">
                <div
                  v-for="(examen, index) in fichaSeleccionada.examenes"
                  :key="examen.id"
                  class="archivo-item"
                >
                  <div class="archivo-info">
                    <i class="fas fa-file-alt"></i>
                    <span class="archivo-nombre">{{
                      examen.nombreExamen
                    }}</span>
                    <span class="archivo-fecha">{{
                      examen.fechaEliminacion
                        ? examen.fechaEliminacion
                        : "Activo"
                    }}</span>
                  </div>

                  <div class="archivo-acciones">
                    <!-- Descargar archivo -->
                    <button
                      class="action-button small"
                      @click="descargarArchivo(examen.nombreArchivo)"
                    >
                      <i class="fas fa-download"></i>
                    </button>

                    <!-- Ver archivo en nueva pestaña -->
                    <button
                      class="action-button small"
                      @click="verArchivo(examen.nombreArchivo)"
                    >
                      <i class="fas fa-eye"></i>
                    </button>

                    <!--
          <button class="action-button small danger">
            <i class="fas fa-trash"></i>
          </button>
          -->
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Exportación de archivos -->
          <div class="detalle-section">
            <h3>Exportación de archivos</h3>
            <div class="botones-container">
              <button class="action-button primary" @click="exportarPlan">
                Exportar plan alimenticio
              </button>
            </div>
          </div>
          <!-- Sección gráfica -->
          <div
            v-if="fichaSeleccionada.antropometrias?.length"
            class="detalle-section"
          >
            <h3 class="text-dark">Gráfico de evolución</h3>
            <GraficaEvolucion :historial="fichaSeleccionada.antropometrias" />
          </div>
        </div>

        <div
          v-if="showExportModal"
          class="modal-overlay"
          @click.self="showExportModal = false"
        >
          <div class="modal-content">
            <h3 style="color: #2c3e50; margin-bottom: 20px">
              ¿Desea enviar el plan alimenticio al correo?
            </h3>

            <div class="form-group">
              <label class="form-label">Enviar por correo</label>
              <select v-model="enviarPorCorreo" class="form-input">
                <option :value="false">No, solo descargar</option>
                <option :value="true">Sí, enviar por correo</option>
              </select>
            </div>

            <div
              style="
                margin-top: 20px;
                display: flex;
                gap: 10px;
                justify-content: flex-end;
              "
            >
              <button
                class="action-button primary"
                @click="confirmarExportacion"
              >
                Confirmar Exportación
              </button>
              <button
                class="action-button cancel"
                @click="showExportModal = false"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <!-- Botones solo para Nutricionista -->
          <template v-if="userRole === 'Nutricionista'">
            <button @click="editarFicha" class="action-button secondary">
              Editar ficha
            </button>
            <button @click="eliminarFicha" class="action-button danger">
              Eliminar ficha
            </button>
            <button @click="abrirAntropometria" class="action-button control">
              Agregar Antropometría
            </button>
            <button @click="abrirRegistro24h" class="action-button history">
              Registro 24 Horas
            </button>
            <button @click="abrirPlanNutricional" class="action-button plan">
              Agregar Plan Nutricional
            </button>
            <button @click="subirExamen" class="action-button subir">
              Subir Examen
            </button>
            <input
              ref="inputFile"
              type="file"
              style="display: none"
              @change="manejarArchivoSeleccionado"
            />
          </template>

          <!-- Botón cerrar disponible para todos -->
          <button @click="closeModal" class="action-button cancel">
            Cerrar
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de antropometría -->
    <ControlPeriodico
      v-if="showAntropometria"
      :ficha-id="fichaSeleccionada.id"
      @control-guardado="actualizarControles"
      @cerrar="showAntropometria = false"
    />
    <Registro24Horas
      v-if="showRegistro24h"
      :ficha-id="fichaSeleccionada.id"
      @guardado="actualizarRegistros24h"
      @cerrar="showRegistro24h = false"
    />
    <PlanNutricional
      v-if="showPlanNutricional && fichaSeleccionada"
      :ficha-id="fichaSeleccionada.id"
      @cerrar="showPlanNutricional = false"
      @guardado="actualizarPlanes"
    />
  </div>
</template>

<script>
import axios from "axios";
import ControlPeriodico from "./ControlPeriodico.vue";
import Registro24Horas from "./Registro24hHoras.vue";
import PlanNutricional from "./PlanNutricional.vue";
import GraficaEvolucion from "./GraficaEvolucion.vue";

export default {
  data() {
    return {
      fichas: [],
      fichasFiltradas: [], // NUEVO: lista filtrada
      busqueda: "", // NUEVO: input del filtro
      loading: false,
      showModal: false,
      fichaSeleccionada: null,
      showAntropometria: false,
      nuevoControl: { peso: null, altura: null },
      archivos: [],
      showRegistro24h: false,
      showPlanNutricional: false,
      showExportModal: false,
      enviarPorCorreo: false,
    };
  },
  components: {
    ControlPeriodico,
    Registro24Horas,
    PlanNutricional,
    GraficaEvolucion,
  },
  mounted() {
    this.obtenerFichas();
  },
  computed: {
    userRole() {
      return this.getUserRole();
    },
  },
  methods: {
    getRutFromToken() {
      const token = this.getToken();
      if (!token) return null;

      const payload = token.split(".")[1];
      const base = decodeURIComponent(
        Array.prototype.map
          .call(atob(payload), function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const parsed = JSON.parse(base);
      return parsed.rut || null;
    },

    getToken() {
      return localStorage.getItem("token") || "";
    },

    getUserRole() {
      const token = this.getToken();
      if (!token) return null;

      const payload = token.split(".")[1];
      const base = decodeURIComponent(
        Array.prototype.map
          .call(atob(payload), function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const parsed = JSON.parse(base);
      return parsed.rols?.[0]?.rol || null;
    },

    abrirPlanNutricional() {
      this.showPlanNutricional = true;
    },
    actualizarPlanes() {},
    descargarArchivo(nombreArchivo) {
      const url = `${process.env.VUE_APP_API_URL}/file-manager/${nombreArchivo}`;
      const link = document.createElement("a");
      link.href = url;
      link.download = nombreArchivo;
      link.click();
    },

    verArchivo(nombreArchivo) {
      const url = `${process.env.VUE_APP_API_URL}/file-manager/${nombreArchivo}`;
      window.open(url, "_blank");
    },
    subirExamen() {
      this.$refs.inputFile.click();
    },
    async manejarArchivoSeleccionado(event) {
      const archivo = event.target.files[0];
      if (!archivo) {
        alert("Debe seleccionar un archivo.");
        return;
      }

      const formData = new FormData();
      formData.append("file", archivo);

      try {
        const responseUpload = await axios.post(
          `${process.env.VUE_APP_API_URL}/file-manager`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        const fileName = responseUpload.data.fileName;
        console.log("Archivo subido:", fileName);

        const payloadExamen = {
          nombreExamen: archivo.name,
          nombreArchivo: fileName,
          fkFicha_id: this.fichaSeleccionada.id 
        };

        const resexamen = await axios.post(
          `${process.env.VUE_APP_API_URL}/examen`,
          payloadExamen
        );
        console.log("Archivo subido:", resexamen);

        alert("Examen registrado correctamente");
        if(!this.fichaSeleccionada.examenes){
          this.$set(this.fichaSeleccionada, "examenes", []);
        }
        this.fichaSeleccionada.examenes.push(resexamen.data);
      } catch (error) {
        console.error("Error al subir examen:", error);
        alert("Ocurrió un error al subir el examen.");
      }
    },
    abrirRegistro24h() {
      this.showRegistro24h = true;
    },
    async obtenerFichas() {
      this.loading = true;
      try {
        const res = await axios.get(`${process.env.VUE_APP_API_URL}/ficha`);
        let todasFichas = res.data;

        if (this.userRole === "Paciente") {
          const rutPaciente = this.getRutFromToken();

          todasFichas = todasFichas.filter(
            (ficha) => ficha.fkUsuario?.rut == rutPaciente
          );
        }

        this.fichas = todasFichas;
        this.filtrarFichas();
      } catch (err) {
        console.error("Error al obtener fichas:", err);
      } finally {
        this.loading = false;
      }
    },

    filtrarFichas() {
      const termino = this.busqueda.toLowerCase();
      this.fichasFiltradas = this.fichas.filter((ficha) => {
        const nombre = ficha.fkUsuario?.nombre?.toLowerCase() || "";
        const rut = ficha.fkUsuario?.rut?.toString().toLowerCase() || "";
        return nombre.includes(termino) || rut.includes(termino);
      });
    },
    verDetalle(ficha) {
      this.fichaSeleccionada = ficha;
      this.showModal = true;

      this.archivos = [
        {
          nombre: "Analisis_sangre.pdf",
          tipo: "pdf",
          fecha: "14-05-2023",
          tamano: "240 KB",
        },
        {
          nombre: "Receta_medica.docx",
          tipo: "docx",
          fecha: "19-06-2023",
          tamano: "500 KB",
        },
        {
          nombre: "Foto_progreso.jpg",
          tipo: "image",
          fecha: "09-07-2023",
          tamano: "1000 KB",
        },
      ];
    },
    closeModal() {
      this.showModal = false;
    },
    calcularEdad(fechaNacimiento) {
      if (!fechaNacimiento) return "No disponible";
      const nacimiento = new Date(fechaNacimiento);
      const hoy = new Date();
      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const m = hoy.getMonth() - nacimiento.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
      }
      return edad;
    },
    editarFicha() {
      this.closeModal();
      const rut = this.fichaSeleccionada.fkUsuario?.rut;
      if (!rut) return alert("No se puede redirigir sin RUT del paciente");

      this.$router.push({
        name: "EditarFicha",
        params: { id: rut },
      });
    },
    eliminarFicha() {
      alert("Lógica para eliminar ficha (aún no implementado)");
    },
    abrirAntropometria() {
      this.showAntropometria = true;
      console.log(this.fichaSeleccionada.id);
    },
    actualizarControles(nuevoControl) {
      if (!this.fichaSeleccionada.antropometrias) {
        this.fichaSeleccionada.antropometrias = [];
      }
      this.fichaSeleccionada.antropometrias.push(nuevoControl);
      this.showAntropometria = false;
    },
    closeAntropometria() {
      this.showAntropometria = false;
    },
    guardarAntropometria() {
      console.log("Guardar antropometría:", this.nuevoControl);
      this.closeAntropometria();
      alert("Antropometría guardada (simulado)");
    },
    exportarPlan() {
      this.enviarPorCorreo = false;
      this.showExportModal = true;
    },
    exportarFicha() {
      const rut = this.fichaSeleccionada?.fkUsuario?.rut;
      if (!rut) return alert("RUT no disponible");
      alert(`Se exportará ficha completa para RUT: ${rut}`);
    },
    async confirmarExportacion() {
      if (!this.fichaSeleccionada.planesNutricionales?.length) {
        alert("No existe plan nutricional registrado.");
        return;
      }

      const planNutricionalId =
        this.fichaSeleccionada.planesNutricionales[0].id;

      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/pdf-manager/plan-nutricional/${planNutricionalId}?email=${this.enviarPorCorreo}`,
          {
            responseType: "blob",
          }
        );

        // Si no envía por email, descargamos el PDF
        if (!this.enviarPorCorreo) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "PlanNutricional.pdf");
          document.body.appendChild(link);
          link.click();
        }

        alert("Exportación realizada correctamente");
      } catch (err) {
        console.error("Error exportando plan nutricional", err);
        alert("Ocurrió un error al exportar.");
      } finally {
        this.showExportModal = false;
      }
    },

    getFileIcon(tipo) {
      if (tipo === "pdf") return "fas fa-file-pdf";
      if (tipo === "docx") return "fas fa-file-word";
      if (tipo === "image") return "fas fa-file-image";
      return "fas fa-file";
    },
  },
};
</script>

<style scoped>
.busqueda-container {
  width: 100%;
  padding: 2rem;
  background-color: #f9fafc;
}

.search-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.section-title {
  color: #2c3e50;
  font-size: 1.8rem;
  margin: 0;
}

.botones-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

@media (max-width: 768px) {
  .botones-container {
    flex-direction: column;
  }
}

.search-box {
  display: flex;
  gap: 0.5rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: #b35fc3;
  box-shadow: 0 0 0 3px rgba(179, 95, 195, 0.2);
}

.search-button {
  background-color: #b35fc3;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-button:hover {
  background-color: #9e4fb0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.filters-section {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 500;
  color: #4a5568;
}

.filter-select {
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background-color: white;
}

.results-title {
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 1rem;
}

.fichas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.ficha-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.ficha-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.ficha-card.inactivo {
  opacity: 0.7;
  border-left: 4px solid #cbd5e0;
}

.ficha-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.ficha-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #2c3e50;
}

.estado-badge {
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  border-radius: 50px;
  font-weight: 600;
}

.estado-badge.activo {
  background-color: #c6f6d5;
  color: #276749;
}

.estado-badge.inactivo {
  background-color: #e2e8f0;
  color: #4a5568;
}

.ficha-info {
  margin-bottom: 1rem;
}

.ficha-info p {
  margin: 0.25rem 0;
  color: #4a5568;
}

.ficha-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.action-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.action-button.view {
  background-color: #e2e8f0;
  color: #2c3e50;
}

.action-button.view:hover {
  background-color: #cbd5e0;
}

.action-button.primary {
  background-color: #b35fc3;
  color: white;
}

.action-button.primary:hover {
  background-color: #9e4fb0;
}

.action-button.secondary {
  background-color: #4299e1;
  color: white;
}

.action-button.secondary:hover {
  background-color: #3182ce;
}

.action-button.danger {
  background-color: rgb(255, 89, 89);
  color: white;
}

.action-button.danger:hover {
  background-color: rgb(135, 0, 0);
}

.action-button.history {
  background-color: rgb(200, 0, 255);
  color: white;
}

.action-button.history:hover {
  background-color: rgb(124, 0, 128);
}

.action-button.control {
  background-color: rgb(200, 0, 255);
  color: white;
}

.action-button.control:hover {
  background-color: rgb(124, 0, 128);
}

.action-button.plan {
  background-color: rgb(200, 0, 255);
  color: white;
}

.action-button.plan:hover {
  background-color: rgb(124, 0, 128);
}

.action-button.subir {
  background-color: rgb(200, 0, 255);
  color: white;
}

.action-button.subir:hover {
  background-color: rgb(124, 0, 128);
}

.action-button.cancel {
  background-color: #bfdbff;
  color: #4a5568;
}

.action-button.cancel:hover {
  background-color: #cbd5e0;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pagination-button {
  padding: 0.5rem 1rem;
  background-color: #e2e8f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination-button:hover:not(:disabled) {
  background-color: #cbd5e0;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  color: #4a5568;
}

.loading,
.no-results {
  text-align: center;
  padding: 2rem;
  color: #4a5568;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #4a5568;
}

.modal-body {
  padding: 1.5rem;
}

.detalle-section {
  margin-bottom: 2rem;
}

.detalle-section h3 {
  color: #4a5568;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.detalle-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.consulta-item {
  background-color: #f7fafc;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.consulta-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.consulta-header h4 {
  margin: 0;
  color: #2c3e50;
  font-size: 1rem;
}

.consulta-tag {
  background-color: #ebf4ff;
  color: #4299e1;
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  border-radius: 50px;
}

.consulta-datos {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.consulta-datos p {
  margin: 0;
}

.consulta-notas p {
  margin: 0.5rem 0;
}

.no-data {
  color: #718096;
  font-style: italic;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

/* Estilos para la nueva sección de archivos */
.archivos-container {
  background-color: #f7fafc;
  border-radius: 8px;
  padding: 1.5rem;
}

.subir-archivo {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.upload-button {
  padding: 0.75rem 1.5rem;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  align-self: flex-start;
}

.upload-button:hover {
  background-color: #3182ce;
}

.upload-button i {
  margin-right: 0.5rem;
}

.upload-hint {
  font-size: 0.85rem;
  color: #718096;
}

.loading-files,
.no-files {
  text-align: center;
  padding: 1rem;
  color: #718096;
}

.archivos-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.archivo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 6px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.archivo-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  min-width: 0;
}

.archivo-info i {
  font-size: 1.25rem;
  color: #4a5568;
  min-width: 24px;
}

.archivo-nombre {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #2c3e50;
}

.archivo-fecha,
.archivo-tamano {
  font-size: 0.85rem;
  color: #718096;
  white-space: nowrap;
  margin-left: 1rem;
}

.archivo-acciones {
  display: flex;
  gap: 0.5rem;
}

.action-button.small {
  padding: 0.5rem;
  min-width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-button.small i {
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .busqueda-container {
    padding: 1rem;
  }

  .search-box {
    flex-direction: column;
  }

  .filters-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-group {
    width: 100%;
  }

  .filter-select {
    width: 100%;
  }

  .fichas-grid {
    grid-template-columns: 1fr;
  }

  .detalle-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    width: 95%;
    max-height: 95vh;
  }

  .modal-footer {
    flex-wrap: wrap;
  }

  .action-button {
    flex: 1;
    text-align: center;
  }

  .archivo-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .archivo-fecha,
  .archivo-tamano {
    margin-left: 0;
  }

  .archivo-item {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .archivo-acciones {
    justify-content: flex-end;
  }
}
select.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  background-color: #f7fafc;
  color: #2c3e50;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%234a5568' class='bi bi-caret-down-fill' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14l-4.796-5.481c-.566-.648-.106-1.659.753-1.659h9.592c.86 0 1.32 1.011.753 1.659l-4.796 5.481a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
}
</style>
