import { useState } from 'react'

function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+91 9876543210',
    dateOfBirth: '1990-05-15',
    gender: 'male',
    address: '123 Main Street, Mumbai, Maharashtra',
    emergencyContact: '+91 9876543211',
    bloodGroup: 'O+',
    allergies: 'None'
  })

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleSave = () => {
    setIsEditing(false)
    alert('Profile updated successfully!')
  }

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="profile-page">
      <section className="hero">
        <h1>My Profile</h1>
        <p>Manage your personal information and medical details</p>
      </section>

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Profile" />
            </div>
            <div className="profile-info">
              <h2>{profile.name}</h2>
              <p>{profile.email}</p>
              <button className="btn-secondary" onClick={handleEdit}>
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          <div className="profile-content">
            <div className="profile-section">
              <h3>Personal Information</h3>
              <div className="profile-grid">
                <div className="profile-field">
                  <label>Full Name</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={profile.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                  ) : (
                    <p>{profile.name}</p>
                  )}
                </div>
                
                <div className="profile-field">
                  <label>Email</label>
                  {isEditing ? (
                    <input 
                      type="email" 
                      value={profile.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                  ) : (
                    <p>{profile.email}</p>
                  )}
                </div>
                
                <div className="profile-field">
                  <label>Phone</label>
                  {isEditing ? (
                    <input 
                      type="tel" 
                      value={profile.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                    />
                  ) : (
                    <p>{profile.phone}</p>
                  )}
                </div>
                
                <div className="profile-field">
                  <label>Date of Birth</label>
                  {isEditing ? (
                    <input 
                      type="date" 
                      value={profile.dateOfBirth}
                      onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                    />
                  ) : (
                    <p>{profile.dateOfBirth}</p>
                  )}
                </div>
                
                <div className="profile-field">
                  <label>Gender</label>
                  {isEditing ? (
                    <select 
                      value={profile.gender}
                      onChange={(e) => handleChange('gender', e.target.value)}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <p>{profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)}</p>
                  )}
                </div>
                
                <div className="profile-field full-width">
                  <label>Address</label>
                  {isEditing ? (
                    <textarea 
                      value={profile.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      rows="2"
                    />
                  ) : (
                    <p>{profile.address}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3>Medical Information</h3>
              <div className="profile-grid">
                <div className="profile-field">
                  <label>Blood Group</label>
                  {isEditing ? (
                    <select 
                      value={profile.bloodGroup}
                      onChange={(e) => handleChange('bloodGroup', e.target.value)}
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  ) : (
                    <p>{profile.bloodGroup}</p>
                  )}
                </div>
                
                <div className="profile-field">
                  <label>Emergency Contact</label>
                  {isEditing ? (
                    <input 
                      type="tel" 
                      value={profile.emergencyContact}
                      onChange={(e) => handleChange('emergencyContact', e.target.value)}
                    />
                  ) : (
                    <p>{profile.emergencyContact}</p>
                  )}
                </div>
                
                <div className="profile-field full-width">
                  <label>Allergies</label>
                  {isEditing ? (
                    <textarea 
                      value={profile.allergies}
                      onChange={(e) => handleChange('allergies', e.target.value)}
                      rows="2"
                      placeholder="List any known allergies"
                    />
                  ) : (
                    <p>{profile.allergies}</p>
                  )}
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="profile-actions">
                <button className="btn-primary" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile