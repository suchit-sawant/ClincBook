import { useState, useEffect } from 'react'
import { FaCalendarAlt, FaClock, FaEdit, FaTrash } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { getPatientAppointments, cancelAppointment, rescheduleAppointment } from '../../services/appointmentService'
import RescheduleModal from '../../components/RescheduleModal'

const PatientAppointments = () => {
  const { user } = useAuth()
  const [appointmentList, setAppointmentList] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [selectedAppointment, setSelectedAppointment] = useState(null)

  useEffect(() => {
    if (user?.id) {
      loadAppointments()
    }
  }, [user])

  const loadAppointments = async () => {
    try {
      const response = await getPatientAppointments(user.id)
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

  const handleCancel = async (id) => {
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

  const handleRescheduleSubmit = async (formData) => {
    try {
      const appointmentData = {
        patientId: user.id,
        doctorId: selectedAppointment.doctorId,
        appointmentDateTime: `${formData.date}T${formData.time}:00`,
        reason: selectedAppointment.reason
      }
      await rescheduleAppointment(selectedAppointment.id, appointmentData)
      alert('Appointment rescheduled successfully')
      setSelectedAppointment(null)
      loadAppointments()
    } catch (error) {
      alert('Failed to reschedule: ' + (error.response?.data?.message || error.message))
    }
  }

  const canCancelAppointment = (status) => {
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
                    <h3 className="text-xl font-bold text-gray-800 mr-4">Dr. {appointment.doctorName}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      appointment.status === 'SCHEDULED' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                  
                  <p className="text-primary-500 font-medium mb-2">{appointment.speciality}</p>
                  
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
                  
                  <p className="text-gray-600 mb-2">Reason: {appointment.reason}</p>
                  <p className="text-gray-800 font-medium">Fees: ₹{appointment.fees}</p>
                </div>
                
                <div className="flex space-x-2 mt-4 md:mt-0">
                  {canCancelAppointment(appointment.status) && (
                    <>
                      <button
                        onClick={() => setSelectedAppointment(appointment)}
                        className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-md hover:shadow-lg flex items-center"
                      >
                        <FaEdit className="mr-2" />
                        Reschedule
                      </button>
                      <button
                        onClick={() => handleCancel(appointment.id)}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg flex items-center"
                      >
                        <FaTrash className="mr-2" />
                        Cancel
                      </button>
                    </>
                  )}
                </div>
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

        {selectedAppointment && (
          <RescheduleModal
            appointment={selectedAppointment}
            onClose={() => setSelectedAppointment(null)}
            onSubmit={handleRescheduleSubmit}
          />
        )}
      </div>
    </div>
  )
}

export default PatientAppointments