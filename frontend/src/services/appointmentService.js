import { 
  bookAppointment as apiBookAppointment, 
  getDoctorAppointments as apiGetDoctorAppointments, 
  getPatientAppointments as apiGetPatientAppointments, 
  updateAppointmentStatus as apiUpdateAppointmentStatus,
  cancelAppointment as apiCancelAppointment,
  completeAppointment as apiCompleteAppointment,
  rescheduleAppointment as apiRescheduleAppointment
} from './api'

export const bookAppointment = async (appointmentData) => {
  return await apiBookAppointment(appointmentData)
}

export const getDoctorAppointments = async (doctorId) => {
  return await apiGetDoctorAppointments(doctorId)
}

export const getPatientAppointments = async (patientId) => {
  return await apiGetPatientAppointments(patientId)
}

export const updateAppointmentStatus = async (appointmentId, status) => {
  return await apiUpdateAppointmentStatus(appointmentId, status)
}

export const cancelAppointment = async (appointmentId) => {
  return await apiCancelAppointment(appointmentId)
}

export const completeAppointment = async (appointmentId) => {
  return await apiCompleteAppointment(appointmentId)
}

export const rescheduleAppointment = async (appointmentId, appointmentData) => {
  return await apiRescheduleAppointment(appointmentId, appointmentData)
}
