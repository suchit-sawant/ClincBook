function DoctorCard({ doctor, onBookAppointment }) {
  return (
    <div className="doctor-card">
      <div className="doctor-image">
        <img src={doctor.image} alt={doctor.name} />
      </div>
      <div className="doctor-info">
        <h3>{doctor.name}</h3>
        <p className="specialty">{doctor.specialty.charAt(0).toUpperCase() + doctor.specialty.slice(1)}</p>
        <p className="experience">Experience: {doctor.experience}</p>
        <p className="location">📍 {doctor.location.charAt(0).toUpperCase() + doctor.location.slice(1)}</p>
        <div className="rating">
          <span>⭐ {doctor.rating}</span>
        </div>
        <button 
          className="btn-book"
          onClick={() => onBookAppointment(doctor)}
        >
          Book Appointment
        </button>
      </div>
    </div>
  )
}

function DoctorGrid({ doctors, onBookAppointment }) {
  return (
    <section className="doctors-section">
      <div className="doctors-grid">
        {doctors.length > 0 ? (
          doctors.map(doctor => (
            <DoctorCard 
              key={doctor.id} 
              doctor={doctor} 
              onBookAppointment={onBookAppointment}
            />
          ))
        ) : (
          <div className="no-results">
            <p>No doctors found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default DoctorGrid