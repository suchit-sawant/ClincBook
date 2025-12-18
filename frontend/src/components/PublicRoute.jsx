import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PublicRoute = ({ children }) => {
  const { user, userRole } = useAuth()
  
  if (user && userRole) {
    if (userRole === 'ROLE_ADMIN') return <Navigate to="/admin/dashboard" replace />
    if (userRole === 'ROLE_DOCTOR') return <Navigate to="/doctor/dashboard" replace />
    if (userRole === 'ROLE_PATIENT') return <Navigate to="/patient/dashboard" replace />
  }
  
  return children
}

export default PublicRoute
