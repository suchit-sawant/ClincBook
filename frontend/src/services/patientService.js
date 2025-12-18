import { getPatientById as apiGetPatientById, getAllPatients as apiGetAllPatients } from './api'

export const getAllPatients = async () => {
  return await apiGetAllPatients()
}

export const getPatientById = async (id) => {
  return await apiGetPatientById(id)
}