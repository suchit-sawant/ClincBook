import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center">
          <FaHome className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
