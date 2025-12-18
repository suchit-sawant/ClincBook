import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../utils/logo.svg'

const Footer = () => {
  const { user, userRole } = useAuth()

  const getQuickLinks = () => {
    if (!user || !userRole) {
      return [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About Us' },
        { to: '/contact', label: 'Contact' },
        { to: '/login', label: 'Login' },
        { to: '/register', label: 'Register' }
      ]
    }

    if (userRole === 'ROLE_PATIENT') {
      return [
        { to: '/patient/dashboard', label: 'Dashboard' },
        { to: '/patient/doctors', label: 'Find Doctors' },
        { to: '/patient/appointments', label: 'Appointments' },
        { to: '/patient/profile', label: 'Profile' },
        { to: '/about', label: 'About Us' }
      ]
    }

    if (userRole === 'ROLE_DOCTOR') {
      return [
        { to: '/doctor/dashboard', label: 'Dashboard' },
        { to: '/doctor/appointments', label: 'Appointments' },
        { to: '/doctor/patients', label: 'Patients' },
        { to: '/doctor/profile', label: 'Profile' },
        { to: '/about', label: 'About Us' }
      ]
    }

    if (userRole === 'ROLE_ADMIN') {
      return [
        { to: '/admin/dashboard', label: 'Dashboard' },
        { to: '/admin/users', label: 'Users' },
        { to: '/admin/doctors', label: 'Doctors' },
        { to: '/admin/appointments', label: 'Appointments' },
        { to: '/admin/settings', label: 'Settings' }
      ]
    }

    return []
  }
  return (
    <footer className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="ClinicBook" className="h-8 w-8" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">ClinicBook</span>
            </div>
            <p className="text-gray-400">
              Your trusted healthcare partner providing quality medical services and connecting patients with the best doctors.
            </p>
            <div className="flex space-x-4">
              <FaFacebook className="text-gray-400 hover:text-primary-500 cursor-pointer" />
              <FaTwitter className="text-gray-400 hover:text-primary-500 cursor-pointer" />
              <FaInstagram className="text-gray-400 hover:text-primary-500 cursor-pointer" />
              <FaLinkedin className="text-gray-400 hover:text-primary-500 cursor-pointer" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Quick Links</h3>
            <ul className="space-y-2">
              {getQuickLinks().map((link, index) => (
                <li key={index}>
                  <Link to={link.to} className="text-gray-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Online Consultations</li>
              <li>Appointment Booking</li>
              <li>Medical Records</li>
              <li>Prescription Management</li>
              <li>Health Monitoring</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-primary-500" />
                <span className="text-gray-400">123 Medical Street, Mumbai, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-primary-500" />
                <span className="text-gray-400">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-primary-500" />
                <span className="text-gray-400">info@clinicbook.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 ClinicBook. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer