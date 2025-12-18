import { useState, useEffect } from 'react'
import { FaUserMd, FaSearch, FaCheck, FaTimes, FaPlus } from 'react-icons/fa'
import axios from 'axios'
import { API_BASE_URL } from '../../constants/APIConstant'
import { addDoctor } from '../../services/api'

const DoctorManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [doctorList, setDoctorList] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    userDetails: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      dob: '',
      regAmount: 500
    },
    speciality: 'CARDIOLOGY',
    experienceInYears: 1,
    qualifications: '',
    fees: 500,
    address: ''
  })

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_BASE_URL}/admin/doctors`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setDoctorList(response.data)
    } catch (error) {
      console.error('Error fetching doctors:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredDoctors = doctorList.filter(doctor => {
    const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase()
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
                         doctor.speciality?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'verified' && doctor.isVerified) ||
                         (statusFilter === 'pending' && !doctor.isVerified)
    
    return matchesSearch && matchesStatus
  })

  const handleVerifyDoctor = async (doctorId) => {
    try {
      const token = localStorage.getItem('token')
      const doctor = doctorList.find(d => d.id === doctorId)
      await axios.put(`${API_BASE_URL}/admin/users/${doctor.userId}/verify`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert('Doctor verified successfully')
      fetchDoctors()
    } catch (error) {
      alert('Failed to verify doctor')
    }
  }

  const handleRejectDoctor = async (doctorId) => {
    if (confirm('Are you sure you want to reject this doctor?')) {
      try {
        const token = localStorage.getItem('token')
        const doctor = doctorList.find(d => d.id === doctorId)
        await axios.delete(`${API_BASE_URL}/admin/users/${doctor.userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        alert('Doctor rejected successfully')
        fetchDoctors()
      } catch (error) {
        alert('Failed to reject doctor')
      }
    }
  }

  const handleAddDoctor = async (e) => {
    e.preventDefault()
    try {
      const response = await addDoctor(formData)
      if (response.status === 201 || response.status === 200) {
        alert('Doctor added successfully')
        setShowModal(false)
        setFormData({
          userDetails: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: '',
            dob: '',
            regAmount: 500
          },
          speciality: 'CARDIOLOGY',
          experienceInYears: 1,
          qualifications: '',
          fees: 500,
          address: ''
        })
        fetchDoctors()
      }
    } catch (error) {
      console.error('Error adding doctor:', error)
      if (error.response?.status === 201 || error.response?.status === 200) {
        alert('Doctor added successfully')
        setShowModal(false)
        fetchDoctors()
      } else {
        alert('Failed to add doctor: ' + (error.response?.data?.message || error.message))
      }
    }
  }

  const handleInputChange = (field, value) => {
    if (field.startsWith('userDetails.')) {
      const userField = field.split('.')[1]
      setFormData(prev => ({
        ...prev,
        userDetails: { ...prev.userDetails, [userField]: value }
      }))
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Doctor Management</h1>
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center">
            <FaPlus className="mr-2" />
            Add New Doctor
          </button>
        </div>

        
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending Verification</option>
            </select>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Total Doctors: {filteredDoctors.length}</span>
            </div>
          </div>
        </div>

        
        {loading ? (
          <p className="text-center py-8">Loading...</p>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map(doctor => (
            <div key={doctor.id} className="card">
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-primary-100 rounded-full mx-auto mb-3 flex items-center justify-center overflow-hidden">
                  {doctor.image ? (
                    <img src={`data:image/jpeg;base64,${doctor.image}`} alt={doctor.firstName} className="w-full h-full object-cover" />
                  ) : (
                    <FaUserMd className="text-3xl text-primary-500" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{doctor.firstName} {doctor.lastName}</h3>
                <p className="text-primary-500 font-medium">{doctor.speciality}</p>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-gray-600"><strong>Experience:</strong> {doctor.experienceInYears} years</p>
                <p className="text-gray-600"><strong>Fees:</strong> ₹{doctor.fees}</p>
                <p className="text-gray-600"><strong>Qualifications:</strong> {doctor.qualifications}</p>
                <p className="text-gray-600"><strong>Email:</strong> {doctor.email}</p>
                <p className="text-gray-600"><strong>Phone:</strong> {doctor.phone}</p>
              </div>

              <div className="mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  doctor.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {doctor.isVerified ? 'Verified' : 'Pending Verification'}
                </span>
              </div>

              <div className="space-y-2">
                {!doctor.isVerified && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleVerifyDoctor(doctor.id)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                    >
                      <FaCheck className="mr-2" />
                      Verify
                    </button>
                    <button
                      onClick={() => handleRejectDoctor(doctor.id)}
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                    >
                      <FaTimes className="mr-2" />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        )}

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-gray-800">{doctorList.length}</h3>
            <p className="text-gray-600">Total Doctors</p>
          </div>
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-gray-800">{doctorList.filter(d => d.isVerified).length}</h3>
            <p className="text-gray-600">Verified</p>
          </div>
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-gray-800">{doctorList.filter(d => !d.isVerified).length}</h3>
            <p className="text-gray-600">Pending</p>
          </div>
        </div>
      </div>

      
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="modal-header">
              <h2>Add New Doctor</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleAddDoctor}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input type="text" required value={formData.userDetails.firstName} onChange={(e) => handleInputChange('userDetails.firstName', e.target.value)} className="input-field" placeholder="Enter first name" />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input type="text" required value={formData.userDetails.lastName} onChange={(e) => handleInputChange('userDetails.lastName', e.target.value)} className="input-field" placeholder="Enter last name" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" required value={formData.userDetails.email} onChange={(e) => handleInputChange('userDetails.email', e.target.value)} className="input-field" placeholder="Enter email" />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input type="tel" required value={formData.userDetails.phone} onChange={(e) => handleInputChange('userDetails.phone', e.target.value)} className="input-field" placeholder="Enter phone number" />
                </div>
                <div className="form-group">
                  <label>Address *</label>
                  <input type="text" required value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} className="input-field" placeholder="Enter address" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label>Date of Birth *</label>
                    <input type="date" required max={new Date().toISOString().split('T')[0]} value={formData.userDetails.dob} onChange={(e) => handleInputChange('userDetails.dob', e.target.value)} className="input-field" />
                  </div>
                  <div className="form-group">
                    <label>Registration Amount *</label>
                    <input type="number" required min="500" value={formData.userDetails.regAmount} onChange={(e) => handleInputChange('userDetails.regAmount', parseInt(e.target.value))} className="input-field" placeholder="Min 500" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Experience (Years) *</label>
                  <input type="number" required min="1" value={formData.experienceInYears} onChange={(e) => handleInputChange('experienceInYears', parseInt(e.target.value))} className="input-field" placeholder="Years of experience" />
                </div>
                <div className="form-group">
                  <label>Consultation Fees *</label>
                  <input type="number" required min="500" value={formData.fees} onChange={(e) => handleInputChange('fees', parseFloat(e.target.value))} className="input-field" placeholder="Consultation fees (min 500)" />
                </div>
                <div className="form-group">
                  <label>Qualifications *</label>
                  <input type="text" required value={formData.qualifications} onChange={(e) => handleInputChange('qualifications', e.target.value)} className="input-field" placeholder="e.g., MBBS, MD" />
                </div>
                <div className="form-group">
                  <label>Speciality *</label>
                  <select value={formData.speciality} onChange={(e) => handleInputChange('speciality', e.target.value)} className="input-field">
                    <option value="CARDIOLOGY">Cardiology</option>
                    <option value="ORTHOPEDICS">Orthopedics</option>
                    <option value="NEUROLOGY">Neurology</option>
                    <option value="GYNAECOLOGY">Gynaecology</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Password *</label>
                  <input type="password" required value={formData.userDetails.password} onChange={(e) => handleInputChange('userDetails.password', e.target.value)} className="input-field" placeholder="Create a password" />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Add Doctor</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default DoctorManagement