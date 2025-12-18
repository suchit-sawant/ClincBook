import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import logo from '../utils/logo.svg'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { user, userRole, logout, isAuthenticated } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const getNavLinks = () => {
    if (!isAuthenticated) {
      return [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
      ]
    }

    switch (userRole?.toUpperCase()) {
      case 'ROLE_PATIENT':
        return [
          { name: 'Dashboard', path: '/patient/dashboard' },
          { name: 'Find Doctors', path: '/patient/doctors' },
          { name: 'Appointments', path: '/patient/appointments' },
          { name: 'Profile', path: '/patient/profile' },
        ]
      case 'ROLE_DOCTOR':
        return [
          { name: 'Dashboard', path: '/doctor/dashboard' },
          { name: 'Appointments', path: '/doctor/appointments' },
          { name: 'Patients', path: '/doctor/patients' },
          { name: 'Profile', path: '/doctor/profile' },
        ]
      case 'ROLE_ADMIN':
        return [
          { name: 'Dashboard', path: '/admin/dashboard' },
          { name: 'Users', path: '/admin/users' },
          { name: 'Doctors', path: '/admin/doctors' },
          { name: 'Appointments', path: '/admin/appointments' },
          { name: 'Profile', path: '/admin/settings' },
        ]
      default:
        return []
    }
  }

  return (
    <nav className="bg-gradient-to-r from-white via-blue-50 to-white shadow-lg sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-24">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="ClinicBook" className="h-12 w-12" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">ClinicBook</span>
          </Link>

          <div className="hidden md:flex items-center flex-1 justify-center space-x-8">
            {getNavLinks().map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-600 hover:text-primary-500 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
            
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600">
                  Welcome, {user?.name || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-500"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-600 ml-auto"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t">
            {getNavLinks().map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block py-2 text-gray-600 hover:text-primary-500"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 text-red-500"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col space-y-2 mt-4">
                <Link to="/login" className="btn-secondary text-center">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-center">
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar