<template>
  <div>
    <div class="consulta-container no-print">
      <div class="consulta-form">
        <h2 class="form-title">Generar Solicitud de Exámenes</h2>
        
        <div class="form-section">
          <h3 class="section-title">Seleccione los exámenes requeridos para el paciente</h3>
          
          <div class="form-grid">
            <div 
              v-for="item in catalogoExamenes" 
              :key="item.id" 
              class="form-group checkbox-wrapper"
            >
              <input 
                type="checkbox" 
                :id="'ex-' + item.id" 
                :value="item" 
                v-model="examenesSeleccionados" 
                class="custom-checkbox"
              />
              <label :for="'ex-' + item.id" class="checkbox-label">
                {{ item.nombreExamen }}
              </label>
            </div>
          </div>

          <div class="form-group mt-4 p-3 border rounded" v-if="seleccionoOtro">
            <label class="checkbox-label fw-bold" style="color: #b35fc3;">
              Especifique el examen adicional
            </label>
            <textarea
              v-model="examenManualTexto"
              class="form-control mt-2"
              rows="2"
              style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #ccc; color: #222a42; background-color: #ffffff;"
              placeholder="Escriba aquí los exámenes adicionales..."
            ></textarea>
          </div>
        </div>

        <button @click="guardarEImprimir" class="submit-button">
          Guardar e Imprimir Solicitud
        </button>
      </div>
    </div>

    <section class="documento-impresion print-only">
      <header class="header-impresion">
        <h1 class="titulo-clinica">Clínica Nutricional</h1>
        <div class="datos-paciente">
          <p><strong>Paciente:</strong> <span class="linea-llenado"></span></p>
          <p><strong>RUT:</strong> <span class="linea-llenado"></span></p>
          <p><strong>Fecha:</strong> {{ fechaActual }}</p>
        </div>
      </header>

      <div class="cuerpo-impresion">
        <h2>Orden de Exámenes</h2>
        <p>Se solicita amablemente la realización de los siguientes exámenes para evaluación nutricional:</p>
        <ul class="lista-examenes">
          <li v-for="seleccion in examenesSeleccionados" :key="seleccion.id">
            {{ seleccion.nombreExamen && seleccion.nombreExamen.toUpperCase() === 'OTRO' ? examenManualTexto : seleccion.nombreExamen }}
          </li>
        </ul>
      </div>

      <footer class="footer-impresion">
        <div class="linea-firma"></div>
        <p>Firma y Timbre Profesional Nutricionista</p>
      </footer>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SolicitudExamen',
  data() {
    return {
      catalogoExamenes: [],
      examenesSeleccionados: [],
      fechaActual: new Date().toLocaleDateString('es-CL'),
      idFichaActiva: 1,
      examenManualTexto: ""
    };
  },
  computed: {
    seleccionoOtro() {
      return this.examenesSeleccionados.some(
        item => item.nombreExamen && item.nombreExamen.toUpperCase() === 'OTRO'
      );
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/solicitud_examen');
      this.catalogoExamenes = response.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async guardarEImprimir() {
      if (this.examenesSeleccionados.length === 0) {
        alert('Debe seleccionar al menos un examen.');
        return;
      }

      if (this.seleccionoOtro && !this.examenManualTexto.trim()) {
        alert('Por favor, especifique el nombre del examen en el recuadro de texto.');
        return;
      }

      try {
        const examenesModificados = this.examenesSeleccionados.map(item => {
          if (item.nombreExamen && item.nombreExamen.toUpperCase() === 'OTRO') {
            return {
              id: item.id,
              nombreExamen: this.examenManualTexto.trim()
            };
          }
          return item;
        });

        const payload = {
          fkFicha_id: this.idFichaActiva,
          solicitud_examen_ids: examenesModificados.map(item => item.id)
        };

        await axios.post('http://localhost:8000/api/v1/solicitud_examen', payload);
        window.print();
      } catch (error) {
        console.error(error);
        alert('Ocurrió un error al guardar los exámenes.');
      }
    }
  }
};
</script>

<style scoped>
.consulta-container {
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
}
.consulta-form {
  width: 100%;
  max-width: 1000px;
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
.form-title {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
}
.form-section { margin-bottom: 2rem; }
.section-title {
  color: #4a5568;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.5rem;
}
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
.form-group { margin-bottom: 0.5rem; }
.submit-button {
  width: 100%;
  padding: 1rem;
  background-color: #b35fc3;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1.5rem;
}
.submit-button:hover {
  background-color: #9e4fb0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .consulta-container { padding: 1rem; }
  .consulta-form { padding: 1.5rem; box-shadow: none; }
  .form-grid { grid-template-columns: 1fr; }
  .form-title { font-size: 1.8rem; margin-bottom: 1.5rem; }
  .section-title { font-size: 1.1rem; }
  .submit-button { padding: 0.8rem; }
}

.checkbox-wrapper { display: flex; align-items: center; }
.custom-checkbox { width: 1.2rem; height: 1.2rem; cursor: pointer; accent-color: #b35fc3; }
.checkbox-label { margin-left: 0.8rem; cursor: pointer; color: #4a5568; font-size: 0.95rem; }

.print-only { display: none; }
</style>

<style>
@media print {
  .sidebar, 
  .navbar, 
  .main-panel .navbar,
  .footer,
  .consulta-container,
  .no-print,
  #sidebar,
  #navbar {
    display: none !important;
  }
  
  html, body, .wrapper, .main-panel, #app {
    background-color: #ffffff !important;
    background: white !important;
    box-shadow: none !important;
    transform: none !important;
    overflow: visible !important;
    display: block !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .print-only,
  .documento-impresion {
    display: block !important;
    position: relative !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  
  @page { margin: 2cm; size: letter portrait; }

  .header-impresion {
    text-align: center;
    border-bottom: 2px solid #000000;
    margin-bottom: 70px;
    padding-bottom: 50px;
  }
  
  .titulo-clinica { font-size: 24px; font-weight: bold; text-transform: uppercase; margin-bottom: 10px; color: #000000 !important; }
  
  .datos-paciente { 
    display: flex; 
    justify-content: space-between; 
    font-size: 14px; 
    color: #000000 !important; 
  }

  .linea-llenado {
    display: inline-block;
    width: 180px;
    border-bottom: 1px solid #000000;
    margin-left: 5px;
    vertical-align: bottom;
    height: 15px;
  }
  
  .cuerpo-impresion h2 { font-size: 18px; margin-bottom: 10px; text-decoration: underline; color: #000000 !important; }
  .cuerpo-impresion p { color: #000000 !important; opacity: 1 !important; font-weight: 600 !important;}
  
  .lista-examenes { margin-top: 20px; line-height: 1.8; color: #000000 !important; }
  .lista-examenes li { color: #000000 !important; font-weight: 500; }
  
  .footer-impresion { margin-top: 150px; text-align: center; color: #000000 !important; }
  .linea-firma { width: 250px; border-top: 1px solid #000000; margin: 0 auto 10px auto; }
}
</style>