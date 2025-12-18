import { login as apiLogin, registerPatient, registerDoctor } from './api'

export const login = async (credentials) => {
  return await apiLogin(credentials)
}

export const register = async (userData) => {
  const role = userData.userDetails?.role
  const response = role === 'ROLE_DOCTOR' 
    ? await registerDoctor(userData) 
    : await registerPatient(userData)
  return response
}