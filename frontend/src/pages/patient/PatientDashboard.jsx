import { useState, useEffect } from 'react'
import { FaCalendarCheck, FaUserMd, FaClock } from 'react-icons/fa'
import { getPatientAppointments } from '../../services/api'
import { useAuth } from '../../context/AuthContext'

const PatientDashboard = () => {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getPatientAppointments(user.id)
        setAppointments(response.data.slice(0, 3))
      } catch (error) {
        console.error('Error fetching appointments:', error)
      } finally {
        setLoading(false)
      }
    }
    if (user?.id) fetchAppointments()
  }, [user])
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Patient Dashboard</h1>
        
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <FaCalendarCheck className="text-3xl text-primary-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">{appointments.length}</h3>
            <p className="text-gray-600">Recent Appointments</p>
          </div>
          
          <div className="card text-center">
            <FaUserMd className="text-3xl text-secondary-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">{appointments.filter(a => a.status === 'SCHEDULED').length}</h3>
            <p className="text-gray-600">Scheduled</p>
          </div>
          
          <div className="card text-center">
            <FaClock className="text-3xl text-accent-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">{appointments.filter(a => a.status === 'COMPLETED').length}</h3>
            <p className="text-gray-600">Completed</p>
          </div>
        </div>

        
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Appointments</h2>
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : appointments.length === 0 ? (
            <p className="text-gray-600">No appointments found</p>
          ) : (
            <div className="space-y-4">
              {appointments.map(apt => (
                <div key={apt.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">Dr. {apt.doctorName || 'N/A'}</h3>
                    <p className="text-sm text-gray-600">{apt.speciality || 'General'}</p>
                    <p className="text-sm text-primary-500">{new Date(apt.appointmentDateTime).toLocaleString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    apt.status === 'SCHEDULED' ? 'bg-green-100 text-green-800' : 
                    apt.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {apt.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard