export const API_BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    PATIENT_REGISTER: '/auth/patient/register',
    DOCTOR_REGISTER: '/auth/doctor/register',
  },
  DOCTORS: {
    GET_ALL: '/doctors',
    GET_BY_ID: '/doctors',
    GET_BY_SPECIALTY: '/doctors/specialty',
  },
  APPOINTMENTS: {
    BOOK: '/appointments',
    GET_BY_DOCTOR: '/appointments/doctor',
    GET_BY_PATIENT: '/appointments/patient',
    UPDATE_STATUS: '/appointments',
    CANCEL: '/appointments',
    COMPLETE: '/appointments',
  },
  PATIENTS: {
    GET_ALL: '/patients',
    GET_BY_ID: '/patients',
  }
};
