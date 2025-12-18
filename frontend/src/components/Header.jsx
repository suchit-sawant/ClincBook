function Header({ activeTab, setActiveTab }) {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h2>🏥 MediCare</h2>
        </div>
        <nav className="nav">
          <a 
            href="#dashboard" 
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); setActiveTab('dashboard') }}
          >
            Dashboard
          </a>
          <a 
            href="#appointments" 
            className={activeTab === 'appointments' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); setActiveTab('appointments') }}
          >
            My Appointments
          </a>
          <a 
            href="#doctors" 
            className={activeTab === 'doctors' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); setActiveTab('doctors') }}
          >
            Find Doctors
          </a>
          <a 
            href="#profile" 
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); setActiveTab('profile') }}
          >
            Profile
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header