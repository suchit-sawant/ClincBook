import { useState } from 'react'
import { FaCog, FaSave, FaBell, FaLock, FaDollarSign, FaEnvelope } from 'react-icons/fa'

const Settings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'MediCare',
    siteDescription: 'Your trusted healthcare partner',
    maintenanceMode: false,
    
    // Appointment Settings
    maxAppointmentsPerDay: 20,
    appointmentDuration: 30,
    advanceBookingDays: 30,
    cancellationHours: 2,
    
    // Payment Settings
    platformFee: 5,
    doctorCommission: 85,
    paymentMethods: {
      card: true,
      upi: true,
      cash: true
    },
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    
    // Security Settings
    passwordMinLength: 8,
    sessionTimeout: 30,
    twoFactorAuth: false,
    
    // Email Settings
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUser: 'admin@medicare.com',
    smtpPassword: '••••••••'
  })

  const handleSave = () => {
    alert('Settings saved successfully!')
  }

  const handleChange = (section, field, value) => {
    if (section) {
      setSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }))
    } else {
      setSettings(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">System Settings</h1>
          <button onClick={handleSave} className="btn-primary flex items-center">
            <FaSave className="mr-2" />
            Save Changes
          </button>
        </div>

        <div className="space-y-8">
          
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FaCog className="mr-3 text-primary-500" />
              General Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleChange(null, 'siteName', e.target.value)}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                <input
                  type="text"
                  value={settings.siteDescription}
                  onChange={(e) => handleChange(null, 'siteDescription', e.target.value)}
                  className="input-field"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) => handleChange(null, 'maintenanceMode', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Enable Maintenance Mode</span>
                </label>
              </div>
            </div>
          </div>

          
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Appointment Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Appointments Per Day</label>
                <input
                  type="number"
                  value={settings.maxAppointmentsPerDay}
                  onChange={(e) => handleChange(null, 'maxAppointmentsPerDay', parseInt(e.target.value))}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Duration (minutes)</label>
                <input
                  type="number"
                  value={settings.appointmentDuration}
                  onChange={(e) => handleChange(null, 'appointmentDuration', parseInt(e.target.value))}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Advance Booking Days</label>
                <input
                  type="number"
                  value={settings.advanceBookingDays}
                  onChange={(e) => handleChange(null, 'advanceBookingDays', parseInt(e.target.value))}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cancellation Hours Before</label>
                <input
                  type="number"
                  value={settings.cancellationHours}
                  onChange={(e) => handleChange(null, 'cancellationHours', parseInt(e.target.value))}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FaDollarSign className="mr-3 text-green-500" />
              Payment Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Platform Fee (%)</label>
                <input
                  type="number"
                  value={settings.platformFee}
                  onChange={(e) => handleChange(null, 'platformFee', parseInt(e.target.value))}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Commission (%)</label>
                <input
                  type="number"
                  value={settings.doctorCommission}
                  onChange={(e) => handleChange(null, 'doctorCommission', parseInt(e.target.value))}
                  className="input-field"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Methods</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.paymentMethods.card}
                      onChange={(e) => handleChange('paymentMethods', 'card', e.target.checked)}
                      className="mr-2"
                    />
                    <span>Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.paymentMethods.upi}
                      onChange={(e) => handleChange('paymentMethods', 'upi', e.target.checked)}
                      className="mr-2"
                    />
                    <span>UPI</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.paymentMethods.cash}
                      onChange={(e) => handleChange('paymentMethods', 'cash', e.target.checked)}
                      className="mr-2"
                    />
                    <span>Cash Payment</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FaBell className="mr-3 text-yellow-500" />
              Notification Settings
            </h2>
            
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleChange(null, 'emailNotifications', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Enable Email Notifications</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={(e) => handleChange(null, 'smsNotifications', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Enable SMS Notifications</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.appointmentReminders}
                  onChange={(e) => handleChange(null, 'appointmentReminders', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Send Appointment Reminders</span>
              </label>
            </div>
          </div>

          
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FaLock className="mr-3 text-red-500" />
              Security Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Password Length</label>
                <input
                  type="number"
                  value={settings.passwordMinLength}
                  onChange={(e) => handleChange(null, 'passwordMinLength', parseInt(e.target.value))}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                <input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleChange(null, 'sessionTimeout', parseInt(e.target.value))}
                  className="input-field"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.twoFactorAuth}
                    onChange={(e) => handleChange(null, 'twoFactorAuth', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Enable Two-Factor Authentication</span>
                </label>
              </div>
            </div>
          </div>

          
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FaEnvelope className="mr-3 text-blue-500" />
              Email Configuration
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                <input
                  type="text"
                  value={settings.smtpHost}
                  onChange={(e) => handleChange(null, 'smtpHost', e.target.value)}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                <input
                  type="number"
                  value={settings.smtpPort}
                  onChange={(e) => handleChange(null, 'smtpPort', parseInt(e.target.value))}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
                <input
                  type="email"
                  value={settings.smtpUser}
                  onChange={(e) => handleChange(null, 'smtpUser', e.target.value)}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
                <input
                  type="password"
                  value={settings.smtpPassword}
                  onChange={(e) => handleChange(null, 'smtpPassword', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings