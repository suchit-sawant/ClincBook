import { useState, useEffect } from 'react'
import { FaUser, FaEdit, FaSave, FaCamera } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { getAdminProfile, updateAdminProfile } from '../../services/api'

const AdminProfile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    role: '',
    image: ''
  })
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    if (user?.id) {
      fetchAdminProfile()
    }
  }, [user])

  const fetchAdminProfile = async () => {
    try {
      const response = await getAdminProfile(user.id)
      setProfile(response.data)
    } catch (error) {
      console.error('Error fetching admin profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      const updateData = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
        image: profile.image
      }
      console.log('Sending update with image length:', profile.image?.length)
      await updateAdminProfile(user.id, updateData)
      setIsEditing(false)
      setImagePreview(null)
      alert('Profile updated successfully!')
      fetchAdminProfile()
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile')
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]
        setProfile(prev => ({ ...prev, image: base64String }))
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  if (!user || loading) {
    return <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Profile</h1>
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
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mr-6 overflow-hidden">
                {imagePreview || profile.image ? (
                  <img src={imagePreview || `data:image/jpeg;base64,${profile.image}`} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <FaUser className="text-4xl text-red-500" />
                )}
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-4 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                  <FaCamera />
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{profile.firstName} {profile.lastName}</h2>
              <p className="text-red-500 font-medium">System Administrator</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className="input-field"
                />
              ) : (
                <p className="text-gray-800 py-2">{profile.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="input-field"
                />
              ) : (
                <p className="text-gray-800 py-2">{profile.lastName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <p className="text-gray-800 py-2">{profile.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="input-field"
                />
              ) : (
                <p className="text-gray-800 py-2">{profile.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              <p className="text-gray-800 py-2">{profile.dob || 'N/A'}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <p className="text-gray-800 py-2">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile