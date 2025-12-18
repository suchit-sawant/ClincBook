import { FaHospital, FaUserMd, FaAward, FaHeart } from 'react-icons/fa'

const About = () => {
  return (
    <div className="min-h-screen">
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15}}></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-lg">About ClinicBook</h1>
          <p className="text-2xl drop-shadow-md">Your trusted healthcare partner</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="card group hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              At ClinicBook, we are committed to providing accessible, quality healthcare services to everyone. 
              Our platform connects patients with experienced doctors, making healthcare simple and convenient.
            </p>
            <p className="text-gray-600">
              We believe in leveraging technology to improve healthcare delivery and patient outcomes.
            </p>
          </div>
          <div className="card group hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Our Vision</h2>
            <p className="text-gray-600 mb-4">
              To become the leading healthcare platform that transforms how people access medical care, 
              making quality healthcare available to all.
            </p>
            <p className="text-gray-600">
              We envision a future where healthcare is personalized, preventive, and accessible to everyone.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="stat-card text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaHospital className="text-3xl text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">500+</h3>
            <p className="text-gray-600 font-semibold">Hospitals</p>
          </div>
          <div className="stat-card text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaUserMd className="text-3xl text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">1000+</h3>
            <p className="text-gray-600 font-semibold">Doctors</p>
          </div>
          <div className="stat-card text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaAward className="text-3xl text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">50+</h3>
            <p className="text-gray-600 font-semibold">Awards</p>
          </div>
          <div className="stat-card text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaHeart className="text-3xl text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">10000+</h3>
            <p className="text-gray-600 font-semibold">Happy Patients</p>
          </div>
        </div>

        <div className="card">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform">
                <FaUserMd className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Expert Doctors</h3>
              <p className="text-gray-600">Access to qualified and experienced medical professionals</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform">
                <FaHospital className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Easy Booking</h3>
              <p className="text-gray-600">Simple and quick appointment scheduling system</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform">
                <FaHeart className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support for your needs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
