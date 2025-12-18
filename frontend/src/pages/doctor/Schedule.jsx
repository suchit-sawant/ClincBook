import { useState } from 'react'
import { FaClock, FaPlus, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa'

const Schedule = () => {
  const [availability, setAvailability] = useState({
    monday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
    tuesday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
    wednesday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
    thursday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
    friday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
    saturday: ['09:00', '10:00', '11:00'],
    sunday: []
  })
  
  const [isAvailable, setIsAvailable] = useState(true)
  const [newTimeSlot, setNewTimeSlot] = useState('')
  const [selectedDay, setSelectedDay] = useState('monday')

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ]

  const addTimeSlot = () => {
    if (newTimeSlot && !availability[selectedDay].includes(newTimeSlot)) {
      setAvailability(prev => ({
        ...prev,
        [selectedDay]: [...prev[selectedDay], newTimeSlot].sort()
      }))
      setNewTimeSlot('')
    }
  }

  const removeTimeSlot = (day, time) => {
    setAvailability(prev => ({
      ...prev,
      [day]: prev[day].filter(slot => slot !== time)
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Schedule Management</h1>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Available for appointments:</span>
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {isAvailable ? <FaToggleOn className="text-2xl" /> : <FaToggleOff className="text-2xl" />}
              <span>{isAvailable ? 'Available' : 'Unavailable'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Weekly Schedule</h2>
            
            <div className="space-y-4">
              {Object.entries(availability).map(([day, slots]) => (
                <div key={day} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3 capitalize">{day}</h3>
                  
                  {slots.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {slots.map(slot => (
                        <div key={slot} className="flex items-center bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                          <FaClock className="mr-2" />
                          <span>{slot}</span>
                          <button
                            onClick={() => removeTimeSlot(day, slot)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No slots available</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Add Time Slots</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Day</label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="input-field"
                >
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                <select
                  value={newTimeSlot}
                  onChange={(e) => setNewTimeSlot(e.target.value)}
                  className="input-field"
                >
                  <option value="">Choose time slot</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time} disabled={availability[selectedDay].includes(time)}>
                      {time} {availability[selectedDay].includes(time) ? '(Already added)' : ''}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={addTimeSlot}
                disabled={!newTimeSlot}
                className="w-full btn-primary flex items-center justify-center disabled:opacity-50"
              >
                <FaPlus className="mr-2" />
                Add Time Slot
              </button>
            </div>

            
            <div className="mt-8">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    const workingDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
                    const workingHours = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
                    const newSchedule = {}
                    Object.keys(availability).forEach(day => {
                      newSchedule[day] = workingDays.includes(day) ? workingHours : []
                    })
                    setAvailability(newSchedule)
                  }}
                  className="w-full btn-secondary"
                >
                  Set Standard Working Hours
                </button>
                
                <button
                  onClick={() => {
                    const clearSchedule = {}
                    Object.keys(availability).forEach(day => {
                      clearSchedule[day] = []
                    })
                    setAvailability(clearSchedule)
                  }}
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Clear All Slots
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Schedule