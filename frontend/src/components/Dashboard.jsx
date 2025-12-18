function Dashboard({ appointments }) {
  const upcomingAppointments = appointments.filter(apt => new Date(apt.date) >= new Date())
  const recentAppointments = appointments.slice(-3)

  return (
    <div className="dashboard">
      <section className="hero">
        <h1>Welcome to Your Dashboard</h1>
        <p>Manage your health appointments and medical records</p>
      </section>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h3>📅 Upcoming Appointments</h3>
          </div>
          <div className="card-content">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(apt => (
                <div key={apt.id} className="appointment-item">
                  <div className="appointment-info">
                    <h4>{apt.doctor}</h4>
                    <p>{apt.specialty}</p>
                    <p>{apt.date} at {apt.time}</p>
                  </div>
                  <span className={`status ${apt.status}`}>{apt.status}</span>
                </div>
              ))
            ) : (
              <p className="no-data">No upcoming appointments</p>
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>🏥 Quick Stats</h3>
          </div>
          <div className="card-content">
            <div className="stat-item">
              <span className="stat-number">{appointments.length}</span>
              <span className="stat-label">Total Appointments</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{upcomingAppointments.length}</span>
              <span className="stat-label">Upcoming</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{appointments.filter(a => a.status === 'confirmed').length}</span>
              <span className="stat-label">Confirmed</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>🩺 Recent Activity</h3>
          </div>
          <div className="card-content">
            {recentAppointments.map(apt => (
              <div key={apt.id} className="activity-item">
                <div className="activity-info">
                  <p>Appointment with {apt.doctor}</p>
                  <small>{apt.date}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>🔗 Quick Actions</h3>
          </div>
          <div className="card-content">
            <div className="quick-actions">
              <button className="action-btn">📋 View Medical Records</button>
              <button className="action-btn">💊 Prescription History</button>
              <button className="action-btn">📞 Contact Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard