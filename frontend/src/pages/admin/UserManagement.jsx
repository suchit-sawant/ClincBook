import { useState, useEffect } from 'react'
import { FaUser, FaUserMd, FaSearch, FaEdit, FaTrash, FaCheck } from 'react-icons/fa'
import axios from 'axios'
import { API_BASE_URL } from '../../constants/APIConstant'

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [userList, setUserList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_BASE_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUserList(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyDoctor = async (userId) => {
    if (confirm('Verify this doctor?')) {
      try {
        const token = localStorage.getItem('token')
        await axios.put(`${API_BASE_URL}/admin/users/${userId}/verify`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        })
        alert('Doctor verified successfully')
        fetchUsers()
      } catch (error) {
        alert('Failed to verify doctor')
      }
    }
  }

  const handleDeleteUser = async (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        const token = localStorage.getItem('token')
        await axios.delete(`${API_BASE_URL}/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        alert('User deleted successfully')
        fetchUsers()
      } catch (error) {
        alert('Failed to delete user')
      }
    }
  }

  const filteredUsers = userList.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    
    return matchesSearch && matchesRole
  })



  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        </div>

        
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Roles</option>
              <option value="ROLE_PATIENT">Patients</option>
              <option value="ROLE_DOCTOR">Doctors</option>
              <option value="ROLE_ADMIN">Admins</option>
            </select>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Total Users: {filteredUsers.length}</span>
            </div>
          </div>
        </div>

        
        <div className="card overflow-hidden">
          {loading ? (
            <p className="text-center py-8">Loading...</p>
          ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                          {user.image ? (
                            <img src={`data:image/jpeg;base64,${user.image}`} alt={user.firstName} className="w-full h-full object-cover" />
                          ) : user.role === 'ROLE_DOCTOR' ? (
                            <FaUserMd className="text-primary-500" />
                          ) : (
                            <FaUser className="text-primary-500" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'ROLE_ADMIN' ? 'bg-red-100 text-red-800' :
                        user.role === 'ROLE_DOCTOR' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {user.role.replace('ROLE_', '')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>{user.phone || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                      {user.role === 'ROLE_DOCTOR' && (
                        <div className="mt-1">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.isVerified ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {user.isVerified ? 'Verified' : 'Pending'}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete User"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-gray-800">{userList.filter(u => u.role === 'ROLE_PATIENT').length}</h3>
            <p className="text-gray-600">Total Patients</p>
          </div>
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-gray-800">{userList.filter(u => u.role === 'ROLE_DOCTOR').length}</h3>
            <p className="text-gray-600">Total Doctors</p>
          </div>
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-gray-800">{userList.filter(u => u.role === 'ROLE_ADMIN').length}</h3>
            <p className="text-gray-600">Administrators</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserManagement