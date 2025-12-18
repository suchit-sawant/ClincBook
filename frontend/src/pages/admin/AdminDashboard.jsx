import { useState, useEffect } from 'react'
import { FaUsers, FaUserMd, FaCalendarCheck } from 'react-icons/fa'
import axios from 'axios'
import { API_BASE_URL } from '../../constants/APIConstant'

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalDoctors: 0, totalPatients: 0, totalAppointments: 0 })
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const statsRes = await axios.get(`${API_BASE_URL}/admin/stats`, { 
          headers: { Authorization: `Bearer ${token}` } 
        })
        setStats(statsRes.data)
        
        try {
          const appointmentsRes = await axios.get(`${API_BASE_URL}/admin/appointments`, { 
            headers: { Authorization: `Bearer ${token}` } 
          })
          setAppointments(appointmentsRes.data)
        } catch (aptError) {
          console.error('Error fetching appointments:', aptError)
          setAppointments([])
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const recentAppointments = appointments.slice(0, 5)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
        
        
        {loading ? (
          <p className="text-center py-8">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card text-center">
              <FaUsers className="text-3xl text-primary-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalUsers}</h3>
              <p className="text-gray-600">Total Users</p>
            </div>
            
            <div className="card text-center">
              <FaUserMd className="text-3xl text-secondary-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalDoctors}</h3>
              <p className="text-gray-600">Doctors</p>
            </div>
            
            <div className="card text-center">
              <FaCalendarCheck className="text-3xl text-accent-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalAppointments}</h3>
              <p className="text-gray-600">Appointments</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Appointments</h2>
            {recentAppointments.length > 0 ? (
              <div className="space-y-4">
                {recentAppointments.map(apt => (
                  <div key={apt.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-800">{apt.patientName}</h3>
                      <p className="text-sm text-gray-600">{apt.doctorName}</p>
                      <p className="text-sm text-primary-500">{new Date(apt.appointmentDateTime).toLocaleString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      apt.status === 'SCHEDULED' ? 'bg-green-100 text-green-800' :
                      apt.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No appointments yet</p>
            )}
          </div>

          
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-4">System Overview</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Active Doctors</span>
                <span className="font-semibold text-gray-800">{stats.totalDoctors}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Registered Patients</span>
                <span className="font-semibold text-gray-800">{stats.totalPatients}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Total Appointments</span>
                <span className="font-semibold text-gray-800">{stats.totalAppointments}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Total Users</span>
                <span className="font-semibold text-gray-800">{stats.totalUsers}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard