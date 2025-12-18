import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa'
import { register } from '../services/authService'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'ROLE_PATIENT',
    address: '',
    dob: '',
    gender: 'MALE',
    bloodGroup: 'A_POSITIVE',
    familyHistory: '',
    experienceInYears: '',
    fees: '',
    qualifications: '',
    speciality: 'CARDIOLOGY',
    regAmount: 500
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validateField = (name, value, allValues = formData) => {
    let error = ''
    switch (name) {
      case 'name':
        if (!value) error = 'Name is required'
        else if (value.length < 2) error = 'Name must be at least 2 characters'
        else if (!/^[a-zA-Z\s]+$/.test(value)) error = 'Name should contain only letters and spaces'
        break
      case 'email':
        if (!value) error = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(value)) error = 'Email is invalid'
        break
      case 'phone':
        if (!value) error = 'Phone is required'
        else if (!/^[+]?[0-9\s-()]{10,15}$/.test(value)) error = 'Phone number is invalid'
        break
      case 'password':
        if (!value) error = 'Password is required'
        else if (value.length < 6) error = 'Password must be at least 6 characters'
        else if (!/(?=.*[0-9])/.test(value)) error = 'Password must contain a number'
        else if (!/(?=.*[a-z])/.test(value)) error = 'Password must contain a lowercase letter'
        else if (!/(?=.*[A-Z])/.test(value)) error = 'Password must contain an uppercase letter'
        break
      case 'confirmPassword':
        if (!value) error = 'Please confirm your password'
        else if (value !== allValues.password) error = 'Passwords do not match'
        break
      default:
        break
    }
    return error
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleKeyUp = (e) => {
    const { name, value } = e.target
    const nextForm = { ...formData, [name]: value }
    setTouched(prev => ({ ...prev, [name]: true }))
    
    const error = validateField(name, value, nextForm)
    setErrors(prev => ({ ...prev, [name]: error || undefined }))

    if (name === 'password' || name === 'confirmPassword') {
      const confirmError = nextForm.confirmPassword !== nextForm.password ? 'Passwords do not match' : ''
      setErrors(prev => ({ ...prev, confirmPassword: confirmError || undefined }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const hasErrors = Object.values(errors).some(error => error)
    if (hasErrors) {
      alert('Please fix the highlighted errors')
      return
    }
    
    setSubmitting(true)
    try {
      const { confirmPassword, ...data } = formData
      
      const registrationData = {
        userDetails: {
          firstName: data.name.split(' ')[0],
          lastName: data.name.split(' ').slice(1).join(' ') || data.name.split(' ')[0],
          email: data.email,
          password: data.password,
          phone: data.phone,
          dob: data.dob,
          regAmount: data.regAmount,
          role: data.role
        },
        address: data.address
      }
      
      if (data.role === 'ROLE_PATIENT') {
        registrationData.gender = data.gender
        registrationData.bloodGroup = data.bloodGroup
        registrationData.familyHistory = data.familyHistory
      } else if (data.role === 'ROLE_DOCTOR') {
        registrationData.experienceInYears = parseInt(data.experienceInYears)
        registrationData.fees = parseFloat(data.fees)
        registrationData.qualifications = data.qualifications
        registrationData.speciality = data.speciality
      }
      
      const response = await register(registrationData)
      alert(response.data.message || 'Registration successful! Please login.')
      navigate('/login')
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-500 hover:text-primary-600">
              Sign in here
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Register as
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="input-field"
              >
                <option value="ROLE_PATIENT">Patient</option>
                <option value="ROLE_DOCTOR">Doctor</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onKeyUp={handleKeyUp}
                  required
                  className={`input-field pl-10 ${touched.name && errors.name ? 'border-red-500' : touched.name && !errors.name ? 'border-green-500' : ''}`}
                  placeholder="Enter your full name"
                />
                {touched.name && errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onKeyUp={handleKeyUp}
                  required
                  className={`input-field pl-10 ${touched.email && errors.email ? 'border-red-500' : touched.email && !errors.email ? 'border-green-500' : ''}`}
                  placeholder="Enter your email"
                />
                {touched.email && errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onKeyUp={handleKeyUp}
                  required
                  className={`input-field pl-10 ${touched.phone && errors.phone ? 'border-red-500' : touched.phone && !errors.phone ? 'border-green-500' : ''}`}
                  placeholder="Enter your phone number"
                />
                {touched.phone && errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Enter your address"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                max={new Date().toISOString().split('T')[0]}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registration Amount
              </label>
              <input
                type="number"
                name="regAmount"
                value={formData.regAmount}
                onChange={handleChange}
                required
                min="500"
                className="input-field"
                placeholder="Registration amount (min 500)"
              />
            </div>
            
            {formData.role === 'ROLE_PATIENT' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Group
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="A_POSITIVE">A+</option>
                    <option value="B_POSITIVE">B+</option>
                    <option value="O_POSITIVE">O+</option>
                    <option value="AB_POSITIVE">AB+</option>
                    <option value="A_NEGATIVE">A-</option>
                    <option value="B_NEGATIVE">B-</option>
                    <option value="O_NEGATIVE">O-</option>
                    <option value="AB_NEGATIVE">AB-</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Family History
                  </label>
                  <textarea
                    name="familyHistory"
                    value={formData.familyHistory}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Enter family medical history"
                    rows="3"
                  />
                </div>
              </>
            )}
            
            {formData.role === 'ROLE_DOCTOR' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    name="experienceInYears"
                    value={formData.experienceInYears}
                    onChange={handleChange}
                    required
                    min="1"
                    className="input-field"
                    placeholder="Years of experience"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consultation Fees
                  </label>
                  <input
                    type="number"
                    name="fees"
                    value={formData.fees}
                    onChange={handleChange}
                    required
                    min="500"
                    className="input-field"
                    placeholder="Consultation fees (min 500)"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qualifications
                  </label>
                  <input
                    type="text"
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="e.g., MBBS, MD"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Speciality
                  </label>
                  <select
                    name="speciality"
                    value={formData.speciality}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="CARDIOLOGY">Cardiology</option>
                    <option value="ORTHOPEDICS">Orthopedics</option>
                    <option value="NEUROLOGY">Neurology</option>
                    <option value="GYNAECOLOGY">Gynaecology</option>
                  </select>
                </div>
              </>
            )}
            
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
                  onKeyUp={handleKeyUp}
                  required
                  className={`input-field pl-10 pr-10 ${touched.password && errors.password ? 'border-red-500' : touched.password && !errors.password ? 'border-green-500' : ''}`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {touched.password && errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onKeyUp={handleKeyUp}
                  required
                  className={`input-field pl-10 pr-10 ${touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : touched.confirmPassword && !errors.confirmPassword ? 'border-green-500' : ''}`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              required
              className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              I agree to the{' '}
              <Link to="/terms" className="text-primary-500 hover:text-primary-600">
                Terms and Conditions
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-primary-500 hover:text-primary-600">
                Privacy Policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full btn-primary py-3 text-lg disabled:opacity-50"
          >
            {submitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register