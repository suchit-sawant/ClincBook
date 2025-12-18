import { useState, useEffect } from 'react'
import { FaCalendarAlt, FaClock, FaUser, FaCheck, FaTimes, FaEdit } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { getDoctorAppointments, completeAppointment, cancelAppointment, rescheduleAppointment } from '../../services/api'
import RescheduleModal from '../../components/RescheduleModal'

const DoctorAppointments = () => {
  const { user } = useAuth()
  const [appointmentList, setAppointmentList] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)

  useEffect(() => {
    if (user?.id) {
      loadAppointments()
    }
  }, [user])

  const loadAppointments = async () => {
    try {
      const response = await getDoctorAppointments(user.id)
      setAppointmentList(response.data)
    } catch (error) {
      console.error('Failed to load appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredAppointments = appointmentList.filter(apt => {
    if (filter === 'all') return true
    return apt.status === filter.toUpperCase()
  })

  const handleCompleteAppointment = async (id) => {
    if (confirm('Mark this appointment as completed?')) {
      try {
        await completeAppointment(id)
        alert('Appointment marked as completed')
        loadAppointments()
      } catch (error) {
        alert('Failed to complete appointment: ' + (error.response?.data?.message || error.message))
      }
    }
  }

  const handleCancelAppointment = async (id) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await cancelAppointment(id)
        alert('Appointment cancelled successfully')
        loadAppointments()
      } catch (error) {
        alert('Failed to cancel appointment: ' + (error.response?.data?.message || error.message))
      }
    }
  }

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment)
    setShowRescheduleModal(true)
  }

  const handleRescheduleSubmit = async (appointmentData) => {
    try {
      await rescheduleAppointment(selectedAppointment.id, appointmentData)
      alert('Appointment rescheduled successfully')
      setShowRescheduleModal(false)
      loadAppointments()
    } catch (error) {
      alert('Failed to reschedule: ' + (error.response?.data?.message || error.message))
    }
  }

  const canCompleteAppointment = (status) => {
    return status === 'SCHEDULED' || status === 'PENDING'
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Appointments</h1>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input-field w-auto"
          >
            <option value="all">All Appointments</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading appointments...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map(appointment => (
            <div key={appointment.id} className="card">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <FaUser className="text-primary-500 mr-2" />
                    <h3 className="text-xl font-bold text-gray-800">{appointment.patientName}</h3>
                    <span className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${
                      appointment.status === 'SCHEDULED' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-gray-600 mb-2">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2" />
                      <span>{new Date(appointment.appointmentDateTime).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-2" />
                      <span>{new Date(appointment.appointmentDateTime).toLocaleTimeString()}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-2">Reason: {appointment.reason || 'N/A'}</p>
                </div>
                
                {canCompleteAppointment(appointment.status) && (
                  <div className="flex space-x-2 mt-4 md:mt-0">
                    <button
                      onClick={() => handleCompleteAppointment(appointment.id)}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg flex items-center"
                      title="Mark as completed"
                    >
                      <FaCheck className="mr-2" />
                      Complete
                    </button>
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg flex items-center"
                      title="Cancel appointment"
                    >
                      <FaTimes className="mr-2" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
            ))}
          </div>
        )}

        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No appointments found.</p>
          </div>
        )}
      </div>

      {showRescheduleModal && (
        <RescheduleModal
          appointment={selectedAppointment}
          onClose={() => setShowRescheduleModal(false)}
          onReschedule={handleRescheduleSubmit}
        />
      )}
    </div>
  )
}

export default DoctorAppointments