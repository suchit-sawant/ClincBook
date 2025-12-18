function MyAppointments({ appointments, setAppointments }) {
  const handleCancelAppointment = (id) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(appointments.filter(apt => apt.id !== id))
    }
  }

  const handleReschedule = (id) => {
    alert('Reschedule functionality would open a date/time picker')
  }

  return (
    <div className="appointments-page">
      <section className="hero">
        <h1>My Appointments</h1>
        <p>View and manage your scheduled appointments</p>
      </section>

      <div className="appointments-container">
        {appointments.length > 0 ? (
          <div className="appointments-list">
            {appointments.map(appointment => (
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-details">
                  <div className="appointment-main">
                    <h3>{appointment.doctor}</h3>
                    <p className="specialty">{appointment.specialty}</p>
                    <div className="appointment-datetime">
                      <span className="date">📅 {appointment.date}</span>
                      <span className="time">🕐 {appointment.time}</span>
                    </div>
                  </div>
                  <div className="appointment-status">
                    <span className={`status-badge ${appointment.status}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="appointment-actions">
                  <button 
                    className="btn-secondary"
                    onClick={() => handleReschedule(appointment.id)}
                  >
                    Reschedule
                  </button>
                  <button 
                    className="btn-danger"
                    onClick={() => handleCancelAppointment(appointment.id)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-appointments">
            <div className="no-appointments-content">
              <h3>No appointments scheduled</h3>
              <p>You don't have any appointments yet. Book your first appointment with our doctors.</p>
              <button className="btn-primary">Find a Doctor</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyAppointments