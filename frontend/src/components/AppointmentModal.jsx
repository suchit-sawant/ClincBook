import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { bookAppointment } from '../services/appointmentService'

function AppointmentModal({ doctor, onClose, onSubmit }) {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    reason: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const appointmentData = {
        patientId: user.id,
        doctorId: doctor.doctorId,
        appointmentDateTime: `${formData.date}T${formData.time}:00`,
        reason: formData.reason
      }
      await bookAppointment(appointmentData)
      alert('Appointment booked successfully!')
      onClose()
      if (onSubmit) onSubmit(formData)
    } catch (error) {
      alert('Failed to book appointment: ' + (error.response?.data?.message || error.message))
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-xl flex justify-between items-center">
          <h3 className="text-2xl font-bold">Book Appointment</h3>
          <button className="text-white hover:text-gray-200 text-3xl font-light transition-colors" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Doctor</label>
            <input type="text" value={`${doctor.userDetails?.firstName} ${doctor.userDetails?.lastName}`} readOnly className="input-field bg-gray-50" />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
            <select
              value={formData.time}
              onChange={(e) => handleChange('time', e.target.value)}
              required
              className="input-field"
            >
              <option value="">Select Time</option>
              <option value="09:00">09:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="14:00">02:00 PM</option>
              <option value="15:00">03:00 PM</option>
              <option value="16:00">04:00 PM</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for visit</label>
            <textarea
              value={formData.reason}
              onChange={(e) => handleChange('reason', e.target.value)}
              rows="3"
              placeholder="Brief description of your concern"
              className="input-field resize-none"
            />
          </div>
          
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 btn-primary py-3">Book Appointment</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AppointmentModal