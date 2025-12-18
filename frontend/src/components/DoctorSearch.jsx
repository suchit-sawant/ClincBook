import { useState } from 'react'

function DoctorSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [location, setLocation] = useState('')

  const handleInputChange = (field, value) => {
    if (field === 'search') setSearchTerm(value)
    if (field === 'specialty') setSpecialty(value)
    if (field === 'location') setLocation(value)
    
    onSearch(
      field === 'search' ? value : searchTerm,
      field === 'specialty' ? value : specialty,
      field === 'location' ? value : location
    )
  }

  return (
    <section className="search-section">
      <div className="search-container">
        <div className="search-filters">
          <div className="filter-group">
            <input
              type="text"
              placeholder="Search by doctor name or specialty"
              value={searchTerm}
              onChange={(e) => handleInputChange('search', e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <select 
            value={specialty} 
            onChange={(e) => handleInputChange('specialty', e.target.value)}
          >
            <option value="">All Specialties</option>
            <option value="cardiology">Cardiology</option>
            <option value="dermatology">Dermatology</option>
            <option value="neurology">Neurology</option>
            <option value="orthopedics">Orthopedics</option>
            <option value="pediatrics">Pediatrics</option>
            <option value="psychiatry">Psychiatry</option>
          </select>
          
          <select 
            value={location} 
            onChange={(e) => handleInputChange('location', e.target.value)}
          >
            <option value="">All Locations</option>
            <option value="mumbai">Mumbai</option>
            <option value="pune">Pune</option>
            <option value="delhi">Delhi</option>
          </select>
        </div>
      </div>
    </section>
  )
}

export default DoctorSearch