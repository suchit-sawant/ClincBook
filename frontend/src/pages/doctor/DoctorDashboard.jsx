import { useState, useEffect } from 'react'
import { FaCalendarCheck, FaUsers, FaDollarSign, FaClock, FaCheck } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { getDoctorPatients, getDoctorAppointments } from '../../services/api'

const DoctorDashboard = () => {
  const { user } = useAuth()
  const [patients, setPatients] = useState([])
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsRes, appointmentsRes] = await Promise.all([
          getDoctorPatients(user.id),
          getDoctorAppointments(user.id)
        ])
        setPatients(patientsRes.data)
        setAppointments(appointmentsRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    if (user?.id) fetchData()
  }, [user])

  const upcomingCount = appointments.filter(apt => apt.status === 'SCHEDULED').length
  const completedCount = appointments.filter(apt => apt.status === 'COMPLETED').length
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const todayAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.appointmentDateTime)
    return aptDate >= today && aptDate < tomorrow && apt.status === 'SCHEDULED'
  }).sort((a, b) => new Date(a.appointmentDateTime) - new Date(b.appointmentDateTime))

  const recentPatients = patients.slice(-3).reverse()

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Doctor Dashboard</h1>
        
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <FaCalendarCheck className="text-3xl text-blue-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">{upcomingCount}</h3>
            <p className="text-gray-600">Upcoming Appointments</p>
          </div>
          <div className="card text-center">
            <FaCheck className="text-3xl text-green-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">{completedCount}</h3>
            <p className="text-gray-600">Completed Appointments</p>
          </div>
          <div className="card text-center">
            <FaUsers className="text-3xl text-purple-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">{patients.length}</h3>
            <p className="text-gray-600">Total Patients</p>
          </div>
        </div>

        
        <div className="card mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Today's Appointments</h2>
          {loading ? (
            <p className="text-gray-500 text-center py-8">Loading...</p>
          ) : todayAppointments.length > 0 ? (
            <div className="space-y-4">
              {todayAppointments.map(apt => (
                <div key={apt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaCalendarCheck className="text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{apt.patientName}</p>
                      <p className="text-sm text-gray-600">{new Date(apt.appointmentDateTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">{apt.reason || 'No reason provided'}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No appointments scheduled for today</p>
          )}
        </div>

        
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Patients</h2>
          {loading ? (
            <p className="text-gray-500 text-center py-8">Loading...</p>
          ) : recentPatients.length > 0 ? (
            <div className="space-y-4">
              {recentPatients.map(patient => (
                <div key={patient.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <FaUsers className="text-primary-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{patient.userDetails?.firstName} {patient.userDetails?.lastName}</p>
                    <p className="text-sm text-gray-600">{patient.gender} - {patient.bloodGroup?.replace('_', ' ')}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No patients yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard