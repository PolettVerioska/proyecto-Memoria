<template>
  <div class="modal-overlay" @click.self="cerrar">
    <div class="consulta-form modal-tamanio">
      <button class="btn-close" @click="cerrar">✖</button>
      
      <h2 class="form-title">
        {{ modo === 'crear' ? 'Agendar Nueva Cita' : 'Detalle de la Cita' }}
      </h2>

      <div v-if="modo === 'crear'" class="form-section">
        <h3 class="section-title">Datos de la Atención</h3>
        
        <div class="form-grid">
          <div class="form-group full-width">
            <label>RUT del Paciente (Sin puntos ni guion)</label>
            <input 
                type="number" 
                v-model="formularioCrear.rut" 
                class="form-input" 
                placeholder="Ej: 12345678" 
            />
          </div>
          
          <div class="form-group full-width">
            <label>Fecha y Hora</label>
            <input 
                type="datetime-local" 
                v-model="formularioCrear.fechaHora" 
                class="form-input" 
            />
          </div>
          
          <div class="form-group full-width">
            <label>Notas preliminares</label>
            <textarea 
                v-model="formularioCrear.notas" 
                class="form-textarea" 
                placeholder="Observaciones previas a la consulta...">
            </textarea>
          </div>
        </div>

        <button 
        class="submit-button" @click="guardarNuevaCita">Agendar Paciente</button>
      </div>

      <div v-else class="form-section">
        <h3 class="section-title">Información Registrada</h3>

        <div> class="form-grid">
          <div> class="form-group full-qidth">
            <label>Rut del Paciente</label>
            <input
              type="text"
              :value="datos.rut"
              class="form-input disabled"
              disabled
            />
          </div>
        </div>
        
        <div class="form-grid">
          <div class="form-group full-width">
            <label>Estado Actual</label>
            <input 
                type="text" 
                :value="datos.estado" 
                class="form-input disabled" 
                disabled />
          </div>
          
          <div class="form-group full-width">
            <label>Fecha y Hora</label>
            <input 
                type="text" 
                :value="formatearFecha(datos.fechaHora)" 
                class="form-input disabled" 
                disabled />
          </div>

          <div class="form-group full-width" v-if="datos.notas">
            <label>Notas</label>
            <textarea 
                class="form-textarea disabled" 
                disabled 
                :value="datos.notas">
            </textarea>
          </div>
        </div>

        <div class="acciones-cita" v-if="datos.estado === 'PENDIENTE' || datos.estado === 'REPROGRAMADA'">
          <button class="submit-button btn-success" @click="cambiarEstado('ASISTIO')">Iniciar Atención</button>
          <button class="submit-button btn-danger" @click="mostrarInputCancelacion = true">Cancelar Cita</button>
        </div>

        <div v-if="mostrarInputCancelacion" class="form-section mt-3">
          <h3 class="section-title" style="color: #e53e3e;">Confirmar Cancelación</h3>
          <div class="form-group">
            <label>Motivo de cancelación:</label>
            <input 
                type="text" 
                v-model="motivoCancelacion" 
                class="form-input" 
                placeholder="Ej: Paciente no se presentó" />
          </div>
          <button class="submit-button btn-danger" @click="confirmarCancelacion">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, watch } from 'vue';
import { agendaService } from '../services/AgendaService';

const props = defineProps({
  modo: { type: String, required: true },
  datos: { type: Object, default: () => ({}) }
});

const emit = defineEmits(['cerrar', 'recargar']);

const formularioCrear = ref({ rut: '', fechaHora: '', notas: '' });
const mostrarInputCancelacion = ref(false);
const motivoCancelacion = ref('');

watch(() => props.datos, (nuevosDatos) => {
  if (props.modo === 'crear' && nuevosDatos.fechaHoraInicial) {
    formularioCrear.value.fechaHora = nuevosDatos.fechaHoraInicial.substring(0, 16);
  }
}, { immediate: true });

const cerrar = () => {
  mostrarInputCancelacion.value = false;
  motivoCancelacion.value = '';
  emit('cerrar');
};

const guardarNuevaCita = async () => {
  try {
    if (!formularioCrear.value.rut) {
      alert("Por favor, ingrese el RUT del paciente.");
      return;
    }

    const payload = {
      rut: Number(formularioCrear.value.rut),
      fechaHora: new Date(formularioCrear.value.fechaHora).toISOString(),
      notas: formularioCrear.value.notas
    };
    
    await agendaService.crearCita(payload);
    emit('recargar');
    cerrar();
  } catch (error) {
    const mensajeError = error.response?.data?.message || error.message;
    alert(`Error al agendar: ${mensajeError}`);
  }
};

const cambiarEstado = async (nuevoEstado) => {
  try {
    await agendaService.actualizarEstado(props.datos.id, nuevoEstado);
    emit('recargar');
    cerrar();
  } catch (error) {
    alert('Error al actualizar estado');
  }
};

const confirmarCancelacion = async () => {
  if (!motivoCancelacion.value) {
    alert('Debe ingresar un motivo de cancelación para continuar.');
    return;
  }
  try {
    await agendaService.actualizarEstado(props.datos.id, 'CANCELADA', motivoCancelacion.value);
    emit('recargar');
    cerrar();
  } catch (error) {
    alert('Error al cancelar');
  }
};

const formatearFecha = (fechaString) => {
  if (!fechaString) return '';
  return new Date(fechaString).toLocaleString('es-CL', {
    dateStyle: 'long',
    timeStyle: 'short'
  });
};
</script>


//Formato del estilo del modal y formulario de agenda de citas.
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

.full-width { grid-column: span 2; }

.form-input { 
    width: 100%; 
    padding: 0.75rem; 
    border: 1px solid #e2e8f0; 
    border-radius: 6px; 
    font-size: 1rem; 
}

.form-input:focus { 
    outline: none; 
    border-color: #b35fc3; 
    box-shadow: 0 0 0 3px rgba(179, 95, 195, 0.2); 
}

.form-input.disabled { 
    background-color: #f7fafc; 
    color: #4a5568; 
    cursor: not-allowed; 
}

.form-textarea { 
    width: 100%; 
    padding: 0.75rem; 
    border: 1px solid #e2e8f0; 
    border-radius: 6px; 
    font-size: 1rem; 
    min-height: 100px; 
    resize: vertical; 
}

.form-textarea:focus { 
    outline: none; 
    border-color: #b35fc3; 
    box-shadow: 0 0 0 3px rgba(179, 95, 195, 0.2); 
}

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
  .full-width { grid-column: span 1; }
  .form-title { font-size: 1.8rem; margin-bottom: 1.5rem; }
  .section-title { font-size: 1.1rem; }
  .submit-button { padding: 0.8rem; }
}


.modal-overlay { 
    position: fixed; 
    top: 0; 
    left: 0; 
    width: 100vw; 
    height: 100vh; 
    background: rgba(0,0,0,0.6); 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    z-index: 1000; 
}

.modal-tamanio { 
    max-width: 500px; 
    position: relative; 
} 

.btn-close { 
    position: absolute; 
    top: 20px; 
    right: 20px; 
    background: none; 
    border: none; 
    font-size: 1.5rem; 
    color: #a0aec0; 
    cursor: pointer; 
    transition: color 0.2s; 
}

.btn-close:hover { 
    color: #4a5568; 
}

.btn-success { 
    background-color: #48bb78; 
    margin-top: 0.5rem; 
}

.btn-success:hover { 
    background-color: #38a169; 
}

.btn-danger { 
    background-color: #f56565; 
    margin-top: 0.5rem; 
}

.btn-danger:hover { 
    background-color: #e53e3e; 
}

.mt-3 { 
    margin-top: 1.5rem; 
}

label { 
    font-weight: 600; 
    color: #4a5568; 
    font-size: 0.9rem; 
    margin-bottom: 0.3rem; 
    display: block; 
}
</style>