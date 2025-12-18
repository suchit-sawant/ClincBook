import { getAllDoctors as apiGetAllDoctors, getDoctorAppointments as apiGetDoctorAppointments, getDoctorById as apiGetDoctorById, getDoctorsBySpecialty as apiGetDoctorsBySpecialty } from './api'

export const getAllDoctors = async () => {
  return await apiGetAllDoctors()
}

export const getDoctorById = async (id) => {
  return await apiGetDoctorById(id)
}

export const getDoctorsBySpecialty = async (specialty) => {
  return await apiGetDoctorsBySpecialty(specialty)
}

export const getDoctorAppointments = async (id) => {
  return await apiGetDoctorAppointments(id)
}