import { Link } from 'react-router-dom'
import { FaUserMd, FaCalendarCheck, FaShieldAlt, FaClock, FaUsers, FaStar } from 'react-icons/fa'

const Landing = () => {
  return (
    <div className="min-h-screen">
      
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15}}></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Your Health, Our Priority
          </h1>
          <p className="text-2xl mb-10 max-w-3xl mx-auto drop-shadow-md">
            Connect with qualified doctors, book appointments instantly, and manage your healthcare journey with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register" className="btn-primary text-lg">
              Get Started
            </Link>
            <Link to="/login" className="bg-white bg-opacity-20 backdrop-blur-sm border-2 border-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg">
              Login
            </Link>
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose ClincBook?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive healthcare solutions with cutting-edge technology and experienced professionals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform">
                <FaUserMd className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Expert Doctors</h3>
              <p className="text-gray-600">Connect with certified and experienced healthcare professionals.</p>
            </div>
            
            <div className="card text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform">
                <FaCalendarCheck className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Easy Booking</h3>
              <p className="text-gray-600">Book appointments instantly with our user-friendly platform.</p>
            </div>
            
            <div className="card text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform">
                <FaShieldAlt className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Secure & Private</h3>
              <p className="text-gray-600">Your medical data is protected with enterprise-grade security.</p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <FaUsers className="text-4xl text-primary-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-800">10,000+</div>
              <div className="text-gray-600">Happy Patients</div>
            </div>
            <div>
              <FaUserMd className="text-4xl text-secondary-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-800">500+</div>
              <div className="text-gray-600">Expert Doctors</div>
            </div>
            <div>
              <FaCalendarCheck className="text-4xl text-accent-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-800">50,000+</div>
              <div className="text-gray-600">Appointments</div>
            </div>
            <div>
              <FaStar className="text-4xl text-yellow-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-800">4.9</div>
              <div className="text-gray-600">Rating</div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1}}></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">Join thousands of patients who trust ClinicBook for their healthcare needs.</p>
          <Link to="/register" className="btn-primary text-lg inline-block">
            Register Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Landing