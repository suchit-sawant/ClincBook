import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for contacting us! We will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200" 
            alt="Contact" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Contact Us</h1>
          <p className="text-xl text-blue-100">We're here to help you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Get In Touch</h2>
            <p className="text-gray-600 mb-8">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="icon-box-blue">
                  <FaMapMarkerAlt className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-800">Address</h3>
                  <p className="text-gray-600">123 Medical Street, Mumbai, Maharashtra 400001, India</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="icon-box-cyan">
                  <FaPhone className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-800">Phone</h3>
                  <p className="text-gray-600">+91 98765 43210</p>
                  <p className="text-gray-600">+91 98765 43211</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="icon-box-green">
                  <FaEnvelope className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-800">Email</h3>
                  <p className="text-gray-600">info@clinicbook.com</p>
                  <p className="text-gray-600">support@clinicbook.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="icon-box-blue">
                  <FaClock className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-800">Working Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Saturday: 9:00 AM - 2:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="input-field"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="input-field"
                  placeholder="Your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="input-field"
                  placeholder="Subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows="5"
                  className="input-field"
                  placeholder="Your message"
                />
              </div>

              <button type="submit" className="w-full btn-primary py-3">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
