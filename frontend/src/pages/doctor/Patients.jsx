import { useState, useEffect } from 'react'
import { FaUser, FaSearch, FaEye } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { getDoctorPatients } from '../../services/api'

const Patients = () => {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getDoctorPatients(user.id)
        setPatients(response.data)
      } catch (error) {
        console.error('Error fetching patients:', error)
      } finally {
        setLoading(false)
      }
    }
    if (user?.id) fetchPatients()
  }, [user])

  const filteredPatients = patients.filter(patient =>
    patient.userDetails?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.userDetails?.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.userDetails?.phone.includes(searchTerm)
  )



  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Patient Records</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1">
            <div className="card">
              <div className="mb-4">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {loading ? (
                  <p className="text-gray-500 text-center py-8">Loading...</p>
                ) : filteredPatients.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No patients found</p>
                ) : filteredPatients.map(patient => (
                  <div
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedPatient?.id === patient.id
                        ? 'bg-primary-100 border-primary-300'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                        <FaUser className="text-primary-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{patient.userDetails?.firstName} {patient.userDetails?.lastName}</h3>
                        <p className="text-sm text-gray-600">{patient.userDetails?.phone}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          
          <div className="lg:col-span-2">
            {selectedPatient ? (
              <div className="space-y-6">
                
                <div className="card">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <FaUser className="mr-3 text-primary-500" />
                    Patient Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="text-gray-800">{selectedPatient.userDetails?.firstName} {selectedPatient.userDetails?.lastName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="text-gray-800">{selectedPatient.userDetails?.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Gender</label>
                      <p className="text-gray-800">{selectedPatient.gender}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                      <p className="text-gray-800">{selectedPatient.bloodGroup?.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="text-gray-800">{selectedPatient.userDetails?.phone}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <p className="text-gray-800">{selectedPatient.address}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Family History</label>
                      <p className="text-gray-800">{selectedPatient.familyHistory}</p>
                    </div>
                  </div>
                </div>


              </div>
            ) : (
              <div className="card text-center py-12">
                <FaEye className="text-4xl text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Select a patient to view their records</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Patients