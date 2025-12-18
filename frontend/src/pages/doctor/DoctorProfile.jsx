import { useState, useEffect } from 'react'
import { FaUserMd, FaEdit, FaSave, FaCamera } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { getDoctorById, updateDoctor } from '../../services/api'

const DoctorProfile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getDoctorById(user.id)
        setProfile(response.data)
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setLoading(false)
      }
    }
    if (user?.id) {
      fetchProfile()
    }
  }, [user])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    try {
      const updateData = { ...profile }
      if (imageFile) {
        const reader = new FileReader()
        reader.onloadend = async () => {
          updateData.userDetails.image = reader.result.split(',')[1]
          await updateDoctor(user.id, updateData)
          alert('Profile updated successfully!')
          setIsEditing(false)
          setImageFile(null)
        }
        reader.readAsDataURL(imageFile)
      } else {
        await updateDoctor(user.id, updateData)
        alert('Profile updated successfully!')
        setIsEditing(false)
      }
    } catch (error) {
      alert('Failed to update profile: ' + (error.response?.data?.message || error.message))
    }
  }

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <p>Profile not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Doctor Profile</h1>
          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="btn-primary flex items-center"
          >
            {isEditing ? <FaSave className="mr-2" /> : <FaEdit className="mr-2" />}
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <div className="card">
          <div className="flex items-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mr-6 overflow-hidden">
                {imagePreview || profile.userDetails?.image ? (
                  <img src={imagePreview || `data:image/jpeg;base64,${profile.userDetails?.image}`} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <FaUserMd className="text-4xl text-primary-500" />
                )}
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-6 bg-primary-500 text-white p-2 rounded-full cursor-pointer hover:bg-primary-600">
                  <FaCamera />
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{profile.userDetails?.firstName} {profile.userDetails?.lastName}</h2>
              <p className="text-primary-500 font-medium">{profile.speciality}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.userDetails?.firstName}
                  onChange={(e) => handleChange('userDetails', {...profile.userDetails, firstName: e.target.value})}
                  className="input-field"
                />
              ) : (
                <p className="text-gray-800 py-2">{profile.userDetails?.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.userDetails?.lastName}
                  onChange={(e) => handleChange('userDetails', {...profile.userDetails, lastName: e.target.value})}
                  className="input-field"
                />
              ) : (
                <p className="text-gray-800 py-2">{profile.userDetails?.lastName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <p className="text-gray-800 py-2">{profile.userDetails?.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profile.userDetails?.phone}
                  onChange={(e) => handleChange('userDetails', {...profile.userDetails, phone: e.target.value})}
                  className="input-field"
                />
              ) : (
                <p className="text-gray-800 py-2">{profile.userDetails?.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              <p className="text-gray-800 py-2">{new Date(profile.userDetails?.dob).toLocaleDateString()}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Speciality</label>
              {isEditing ? (
                <select
                  value={profile.speciality}
                  onChange={(e) => handleChange('speciality', e.target.value)}
                  className="input-field"
                >
                  <option value="CARDIOLOGY">Cardiology</option>
                  <option value="ORTHOPEDICS">Orthopedics</option>
                  <option value="NEUROLOGY">Neurology</option>
                  <option value="GYNAECOLOGY">Gynaecology</option>
                </select>
              ) : (
                <p className="text-gray-800 py-2">{profile.speciality}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
              {isEditing ? (
                <input
                  type="number"
                  value={profile.experienceInYears}
                  onChange={(e) => handleChange('experienceInYears', parseInt(e.target.value))}
                  className="input-field"
                  min="1"
                />
              ) : (
                <p className="text-gray-800 py-2">{profile.experienceInYears} years</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Fees</label>
              {isEditing ? (
                <input
                  type="number"
                  value={profile.fees}
                  onChange={(e) => handleChange('fees', parseInt(e.target.value))}
                  className="input-field"
                  min="500"
                />
              ) : (
                <p className="text-gray-800 py-2">₹{profile.fees}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Registration Amount</label>
              <p className="text-gray-800 py-2">₹{profile.userDetails?.regAmount}</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Qualifications</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.qualifications}
                  onChange={(e) => handleChange('qualifications', e.target.value)}
                  className="input-field"
                />
              ) : (
                <p className="text-gray-800 py-2">{profile.qualifications}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              {isEditing ? (
                <textarea
                  value={profile.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="input-field"
                  rows="2"
                />
              ) : (
                <p className="text-gray-800 py-2">{profile.address}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile