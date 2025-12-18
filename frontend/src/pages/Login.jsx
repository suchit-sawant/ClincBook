import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { login as loginService } from '../services/authService'
import { useAuth } from '../context/AuthContext'
import { getPatientById } from '../services/api'
import { getDoctorById } from '../services/api'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'patient'
  })
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await loginService({
        email: formData.email,
        password: formData.password
      })
      
      const data = response.data
      const token = data.jwt
      
      // Decode JWT to get user info
      const payload = JSON.parse(atob(token.split('.')[1]))
      
      let userName = formData.email.split('@')[0]
      
      try {
        if (payload.role === 'ROLE_PATIENT') {
          const profileResponse = await getPatientById(payload.user_id)
          userName = profileResponse.data.userDetails.firstName
        } else if (payload.role === 'ROLE_DOCTOR') {
          const profileResponse = await getDoctorById(payload.user_id)
          userName = profileResponse.data.userDetails.firstName
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error)
      }
      
      const user = {
        id: payload.user_id,
        email: formData.email,
        name: userName,
        token: token
      }
      login(user, payload.role)
      
      switch(payload.role) {
        case 'ROLE_PATIENT':
          navigate('/patient/dashboard')
          break
        case 'ROLE_DOCTOR':
          navigate('/doctor/dashboard')
          break
        case 'ROLE_ADMIN':
          navigate('/admin/dashboard')
          break
        default:
          navigate('/')
      }
    } catch (error) {
      alert(error.response?.data?.message || error.message || 'Login failed')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-gray-600">
            Or{' '}
            <Link to="/register" className="text-primary-500 hover:text-primary-600">
              create a new account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Login as
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="input-field"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input-field pl-10 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-primary py-3 text-lg"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login