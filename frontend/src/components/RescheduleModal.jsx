import { useState } from 'react'

function RescheduleModal({ appointment, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    date: new Date(appointment.appointmentDateTime).toISOString().split('T')[0],
    time: new Date(appointment.appointmentDateTime).toTimeString().slice(0, 5)
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-xl flex justify-between items-center">
          <h3 className="text-2xl font-bold">Reschedule Appointment</h3>
          <button className="text-white hover:text-gray-200 text-3xl font-light transition-colors" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Doctor</label>
            <input type="text" value={`Dr. ${appointment.doctorName}`} readOnly className="input-field bg-gray-50" />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">New Date</label>
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">New Time</label>
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
          
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 btn-primary py-3">Reschedule</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RescheduleModal
