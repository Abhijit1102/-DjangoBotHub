import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/v1/sign-up/', {
        username,
        password,
        email,
      })
      setMessage(res.data.message)
      // Redirect to login page after successful signup
      setTimeout(() => navigate('/login'), 1500)
    } catch (err: any) {
      setMessage(err.response?.data?.error || 'Signup failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80 space-y-4">
        <h2 className="text-xl font-bold text-center">Sign Up</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Register
        </button>

        {message && (
          <p className="text-sm text-center text-gray-600">{message}</p>
        )}
      </form>
    </div>
  )
}

export default Signup
