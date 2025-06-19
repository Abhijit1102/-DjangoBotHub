import { useEffect, useState } from 'react'
import axios from 'axios'

function Profile() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('access')
        const res = await axios.get('http://127.0.0.1:8000/api/v1/profile/', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setMessage(res.data.message)
      } catch {
        setMessage('Unauthorized. Please login again.')
      }
    }

    fetchProfile()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h2 className="text-xl font-bold mb-2">Profile</h2>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Profile
