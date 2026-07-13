<template>
  <div class="consulta-container">
    <div class="consulta-form">
      <h2 class="form-title">Agenda Clínica</h2>
      
      <div class="calendar-wrapper">
        <FullCalendar :options="calendarOptions" />
      </div>
    </div>

    <ModalCita 
      v-if="modalVisible" 
      :modo="modalModo" 
      :datos="modalDatos" 
      @cerrar="modalVisible = false" 
      @recargar="cargarCitas" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import ModalCita from '../components/ModalCita.vue';
import { agendaService } from '../services/AgendaService.js';


const eventosCitas = ref([]);
const modalVisible = ref(false);
const modalModo = ref('crear');
const modalDatos = ref({});

const cargarCitas = async () => {
  try {
    const { data } = await agendaService.obtenerMisCitas();
    eventosCitas.value = data.map(cita => ({
      id: cita.id,
      title: `RUT: ${cita.rut}`, 
      start: cita.fechaHora,
      backgroundColor: obtenerColorPorEstado(cita.estado),
      borderColor: obtenerColorPorEstado(cita.estado),
      extendedProps: {
        rut: cita.rut,
        estado: cita.estado,
        notas: cita.notas,
        fechaHora: cita.fechaHora
      }
    }));
  } catch (error) {
    console.error("Error al cargar citas:", error);
  }
};

const obtenerColorPorEstado = (estado) => {
  const colores = {
    'PENDIENTE': '#b35fc3', // Usamos tu color morado para las citas pendientes
    'ASISTIO': '#48bb78',   
    'CANCELADA': '#f56565', 
    'REPROGRAMADA': '#ecc94b' 
  };
  return colores[estado] || '#b35fc3';
};

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'timeGridWeek',
  locales: [esLocale],
  locale: 'es',
  slotMinTime: '09:00:00',
  slotMaxTime: '18:00:00',
  allDaySlot: false,
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  events: eventosCitas,
  selectable: true,
  select: (info) => {
    modalModo.value = 'crear';
    modalDatos.value = { fechaHoraInicial: info.startStr };
    modalVisible.value = true;
  },
  eventClick: (info) => {
    modalModo.value = 'editar';
    modalDatos.value = {
      id: info.event.id,
      estado: info.event.extendedProps.estado,
      notas: info.event.extendedProps.notas,
      fechaHora: info.event.extendedProps.fechaHora
    };
    modalVisible.value = true;
  }
});

onMounted(() => {
  cargarCitas();
});
</script>

<style scoped>

:deep(.fc .fc-toolbar-title) {
  display: block !important;
  color: #5e5b5b !important;
  font-size: 1.5rem !important;
  font-weight: bold !important;
}

.consulta-container { 
    width: 100%; 
    padding: 2rem; 
    display: flex; 
    justify-content: center; 
}

.consulta-form { 
    width: 100%; 
    max-width: 1200px; 
    background: white; 
    border-radius: 8px; 
    padding: 2rem; 
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); 
}

.form-title { 
    color: #2c3e50; 
    text-align: center; 
    margin-bottom: 30px; font-size: 2rem; 
}

@media (max-width: 768px) {
  .consulta-container { padding: 1rem; }
  .consulta-form { padding: 1.5rem; box-shadow: none; }
  .form-title { font-size: 1.8rem; margin-bottom: 1.5rem; }
}

/* --- ESTILOS EXTRAS PARA EL CALENDARIO --- */
.calendar-wrapper {
  margin-top: 1rem;
}

::v-deep .fc .fc-button-primary {
  background-color: #b35fc3;
  border-color: #b35fc3;
}

::v-deep .fc .fc-button-primary:hover {
  background-color: #9e4fb0;
  border-color: #9e4fb0;
}

::v-deep .fc .fc-button-primary:not(:disabled):active,
::v-deep .fc .fc-button-primary:not(:disabled).fc-button-active {
  background-color: #8c429c;
  border-color: #8c429c;
}

::v-deep .fc .fc-event {
  cursor: pointer;
  transition: opacity 0.2s;
}

::v-deep .fc .fc-event:hover {
  opacity: 0.8;
}

</style>