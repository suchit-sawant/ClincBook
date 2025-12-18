import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import Landing from './pages/Landing'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import PatientDashboard from './pages/patient/PatientDashboard'
import FindDoctors from './pages/patient/FindDoctors'
import PatientAppointments from './pages/patient/PatientAppointments'
import DoctorDashboard from './pages/doctor/DoctorDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import PatientProfile from './pages/patient/PatientProfile'
import DoctorProfile from './pages/doctor/DoctorProfile'
import DoctorAppointments from './pages/doctor/DoctorAppointments'
import Patients from './pages/doctor/Patients'
import UserManagement from './pages/admin/UserManagement'
import DoctorManagement from './pages/admin/DoctorManagement'
import AdminAppointments from './pages/admin/AdminAppointments'
import AdminProfile from './pages/admin/AdminProfile'

function App() {
  return (
    <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
              <Route path="/patient/dashboard" element={<PrivateRoute><PatientDashboard /></PrivateRoute>} />
              <Route path="/patient/doctors" element={<PrivateRoute><FindDoctors /></PrivateRoute>} />
              <Route path="/patient/appointments" element={<PrivateRoute><PatientAppointments /></PrivateRoute>} />
              <Route path="/patient/profile" element={<PrivateRoute><PatientProfile /></PrivateRoute>} />
              <Route path="/doctor/dashboard" element={<PrivateRoute><DoctorDashboard /></PrivateRoute>} />
              <Route path="/doctor/appointments" element={<PrivateRoute><DoctorAppointments /></PrivateRoute>} />
              <Route path="/doctor/patients" element={<PrivateRoute><Patients /></PrivateRoute>} />
              <Route path="/doctor/profile" element={<PrivateRoute><DoctorProfile /></PrivateRoute>} />
              <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
              <Route path="/admin/users" element={<PrivateRoute><UserManagement /></PrivateRoute>} />
              <Route path="/admin/doctors" element={<PrivateRoute><DoctorManagement /></PrivateRoute>} />
              <Route path="/admin/appointments" element={<PrivateRoute><AdminAppointments /></PrivateRoute>} />
              <Route path="/admin/settings" element={<PrivateRoute><AdminProfile /></PrivateRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
  )
}

export default App