import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null) // 'patient', 'doctor', 'admin'

  // Initialize auth state from localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedRole = localStorage.getItem('userRole')
    
    if (storedUser && storedRole) {
      setUser(JSON.parse(storedUser))
      setUserRole(storedRole)
    }
  }, [])

  const login = (userData, role) => {
    setUser(userData)
    setUserRole(role)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('userRole', role)
    if (userData.token) {
      localStorage.setItem('token', userData.token)
    }
  }

  const logout = () => {
    setUser(null)
    setUserRole(null)
    localStorage.removeItem('user')
    localStorage.removeItem('userRole')
    localStorage.removeItem('token')
  }

  const value = {
    user,
    userRole,
    login,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}