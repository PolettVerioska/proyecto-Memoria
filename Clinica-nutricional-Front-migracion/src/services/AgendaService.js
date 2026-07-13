import axios from 'axios';
import AuthService from './AuthService'; // Importamos el servicio de autenticación

// Asegurarse de que esta URL coincida con el puerto del backend NestJS
const API_URL = 'http://localhost:8000/api/v1/admin/agenda'; 

// Función auxiliar para generar las cabeceras con el token de seguridad
const getAuthHeaders = () => {
  const token = AuthService.getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const agendaService = {
  obtenerMisCitas() {
    return axios.get(`${API_URL}/mis-citas`, getAuthHeaders());
  },
  
  crearCita(datos) {
    return axios.post(API_URL, datos, getAuthHeaders());
  },
  
  actualizarEstado(id, estado, motivoCancelacion = null) {
    const payload = { estado, motivoCancelacion };
    return axios.patch(`${API_URL}/${id}/estado`, payload, getAuthHeaders());
  },
  
  reprogramarCita(id, nuevaFechaHora) {
    const payload = { nuevaFechaHora };
    return axios.patch(`${API_URL}/${id}/reprogramar`, payload, getAuthHeaders());
  }
};