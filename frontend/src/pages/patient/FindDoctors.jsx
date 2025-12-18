import { useState, useEffect } from 'react'
import { FaSearch, FaStar, FaMapMarkerAlt, FaCalendarPlus } from 'react-icons/fa'
import { getAllDoctors } from '../../services/doctorService'
import AppointmentModal from '../../components/AppointmentModal'

const FindDoctors = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDoctor, setSelectedDoctor] = useState(null)

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
    try {
      const response = await getAllDoctors()
      setDoctors(response.data)
    } catch (error) {
      console.error('Error fetching doctors:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = searchTerm === '' || 
      doctor.userDetails?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.userDetails?.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = specialty === '' || doctor.speciality === specialty
    return matchesSearch && matchesSpecialty
  })

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Find Doctors</h1>
        
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-4 top-4 text-blue-500" />
              <input
                type="text"
                placeholder="Search by doctor name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
            
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white"
            >
              <option value="">All Specialties</option>
              <option value="CARDIOLOGY">Cardiology</option>
              <option value="NEUROLOGY">Neurology</option>
              <option value="DERMATOLOGY">Dermatology</option>
              <option value="ORTHOPEDICS">Orthopedics</option>
              <option value="GYNAECOLOGY">Gynaecology</option>
            </select>
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-8">
              <p>Loading doctors...</p>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600 text-lg">No doctors found</p>
            </div>
          ) : (
            filteredDoctors.map(doctor => (
            <div key={doctor.doctorId} className="card hover:shadow-lg transition-shadow">
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-primary-100 rounded-full mx-auto mb-3 flex items-center justify-center overflow-hidden">
                  {doctor.userDetails?.image ? (
                    <img src={`data:image/jpeg;base64,${doctor.userDetails.image}`} alt={doctor.userDetails.firstName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl text-primary-500">👨‍⚕️</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{doctor.userDetails?.firstName} {doctor.userDetails?.lastName}</h3>
                <p className="text-primary-500 font-medium">{doctor.speciality}</p>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-gray-600">Experience: {doctor.experienceInYears} years</p>
                <p className="text-gray-600">Fees: ₹{doctor.fees}</p>
                <p className="text-sm text-gray-500">{doctor.qualifications}</p>
              </div>
              
              <button
                onClick={() => handleBookAppointment(doctor)}
                className="w-full btn-primary flex items-center justify-center"
              >
                <FaCalendarPlus className="mr-2" />
                Book Appointment
              </button>
            </div>
            ))
          )}
        </div>
        
        {selectedDoctor && (
          <AppointmentModal
            doctor={selectedDoctor}
            onClose={() => setSelectedDoctor(null)}
            onSubmit={() => fetchDoctors()}
          />
        )}
      </div>
    </div>
  )
}

export default FindDoctors
