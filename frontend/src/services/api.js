import axios from 'axios';
import { API_BASE_URL } from '../constants/APIConstant';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth APIs
export const login = (credentials) => {
  return api.post('/users/signin', credentials);
};

export const registerPatient = (userData) => {
  return api.post('/patients/signup', userData);
};

export const registerDoctor = (userData) => {
  return api.post('/doctors/signup', userData);
};

// Doctor APIs
export const getAllDoctors = () => {
  return api.get('/doctors');
};

export const getDoctorById = (id) => {
  return api.get(`/doctors/${id}`);
};

export const getDoctorsBySpecialty = (specialty) => {
  return api.get(`/doctors/specialty/${specialty}`);
};

export const getDoctorPatients = (doctorId) => {
  return api.get(`/doctors/${doctorId}/patients`);
};

// Patient APIs
export const getPatientById = (id) => {
  return api.get(`/patients/${id}`);
};

export const getAllPatients = () => {
  return api.get('/patients');
};

export const updatePatient = (id, patientData) => {
  return api.put(`/patients/${id}`, patientData);
};

export const updateDoctor = (id, doctorData) => {
  return api.put(`/doctors/${id}`, doctorData);
};

// Appointment APIs
export const bookAppointment = (appointmentData) => {
  return api.post('/appointments', appointmentData);
};

export const getDoctorAppointments = (userId) => {
  return api.get(`/appointments/doctors/${userId}`);
};

export const getAllDoctorPatients = (doctorId) => {
  return getDoctorPatients(doctorId);
};

export const getPatientAppointments = (userId) => {
  return api.get(`/appointments/patients/${userId}/upcoming`);
};

export const updateAppointmentStatus = (appointmentId, status) => {
  return api.put(`/appointments/${appointmentId}/status`, status);
};

export const cancelAppointment = (appointmentId) => {
  return api.put(`/appointments/${appointmentId}/cancel`);
};

export const completeAppointment = (appointmentId) => {
  return api.put(`/appointments/${appointmentId}/complete`);
};

export const rescheduleAppointment = (appointmentId, appointmentData) => {
  return api.put(`/appointments/${appointmentId}/reschedule`, appointmentData);
};

export const rescheduleAppointmentService = async (appointmentId, appointmentData) => {
  return await rescheduleAppointment(appointmentId, appointmentData);
};

// Admin APIs
export const getAdminProfile = (userId) => {
  return api.get(`/admin/profile/${userId}`);
};

export const updateAdminProfile = (userId, adminData) => {
  return api.put(`/admin/users/${userId}`, adminData);
};

export const addDoctor = (doctorData) => {
  return api.post('/admin/doctors', doctorData);
};

export default api;