import { useState, useEffect } from 'react'
import { FaCalendarAlt, FaClock, FaUser, FaUserMd, FaFilter } from 'react-icons/fa'
import axios from 'axios'
import { API_BASE_URL } from '../../constants/APIConstant'

const AdminAppointments = () => {
  const [appointmentList, setAppointmentList] = useState([])
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_BASE_URL}/admin/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAppointmentList(response.data)
    } catch (error) {
      console.error('Error fetching appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredAppointments = appointmentList.filter(apt => {
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter
    const aptDate = new Date(apt.appointmentDateTime).toISOString().split('T')[0]
    const matchesDate = !dateFilter || aptDate === dateFilter
    
    return matchesStatus && matchesDate
  })

  const getStatusColor = (status) => {
    switch(status) {
      case 'SCHEDULED': return 'bg-green-100 text-green-800'
      case 'COMPLETED': return 'bg-blue-100 text-blue-800'
      case 'CANCELLED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Appointment Monitoring</h1>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-gray-800">{appointmentList.length}</h3>
            <p className="text-gray-600">Total Appointments</p>
          </div>
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-gray-800">{appointmentList.filter(a => a.status === 'SCHEDULED').length}</h3>
            <p className="text-gray-600">Scheduled</p>
          </div>
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-gray-800">{appointmentList.filter(a => a.status === 'COMPLETED').length}</h3>
            <p className="text-gray-600">Completed</p>
          </div>
        </div>

        
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">All Status</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Date</label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="input-field"
              />
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => {
                  setStatusFilter('all')
                  setDateFilter('')
                }}
                className="btn-secondary flex items-center"
              >
                <FaFilter className="mr-2" />
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        
        {loading ? (
          <p className="text-center py-8">Loading...</p>
        ) : (
        <div className="space-y-4">
          {filteredAppointments.map(appointment => (
            <div key={appointment.id} className="card">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                      <FaUser className="text-primary-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{appointment.patientName}</h3>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center text-gray-600">
                      <FaUserMd className="mr-2 text-primary-500" />
                      <div>
                        <p className="font-medium">{appointment.doctorName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <FaCalendarAlt className="mr-2 text-secondary-500" />
                      <div>
                        <p className="font-medium">{new Date(appointment.appointmentDateTime).toLocaleDateString()}</p>
                        <p className="text-sm flex items-center">
                          <FaClock className="mr-1" />
                          {new Date(appointment.appointmentDateTime).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p><strong>Reason:</strong> {appointment.reason || 'N/A'}</p>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 md:ml-6">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                  <div className="mt-2 text-xs text-gray-500">
                    ID: {appointment.id}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No appointments found matching the selected filters.</p>
          </div>
        )}

        
        <div className="card mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Appointment Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Scheduled:</span>
              <span className="font-medium">{appointmentList.filter(a => a.status === 'SCHEDULED').length}</span>
            </div>
            <div className="flex justify-between">
              <span>Completed:</span>
              <span className="font-medium">{appointmentList.filter(a => a.status === 'COMPLETED').length}</span>
            </div>
            <div className="flex justify-between">
              <span>Cancelled:</span>
              <span className="font-medium">{appointmentList.filter(a => a.status === 'CANCELLED').length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminAppointments