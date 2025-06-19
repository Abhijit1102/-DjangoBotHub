import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface HomeData {
  project: string
  status: string
  version: string
  description: string
  features: string[]
  api_endpoints: { [key: string]: string }
  developer_note: string
}

function Home() {
  const [data, setData] = useState<HomeData | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await axios.get<HomeData>('http://127.0.0.1:8000/api/v1/home/')
        setData(res.data)
      } catch (err) {
        console.error('Failed to fetch home data:', err)
      }
    }

    fetchHomeData()
  }, [])

  if (!data) {
    return <p className="text-center mt-10 text-gray-500">Loading home data...</p>
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] py-10 px-4">
      <section className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-800">{data.project}</h1>
          <div className="space-x-2">
            <button
              onClick={() => navigate('/signup')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            >
              Signup
            </button>
            <button
              onClick={() => navigate('/login')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
            >
              Login
            </button>
          </div>
        </div>

        <div className="text-gray-600">
          <p className="mb-1"><strong>Status:</strong> {data.status}</p>
          <p className="mb-1"><strong>Version:</strong> {data.version}</p>
          <p className="mt-4 text-gray-700 whitespace-pre-line">{data.description}</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">🚀 Features</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {data.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">🔗 API Endpoints</h2>
          <ul className="list-inside text-gray-700 space-y-1">
            {Object.entries(data.api_endpoints).map(([key, value]) => (
              <li key={key}>
                <span className="font-medium">{key}:</span> <code className="bg-gray-100 px-2 py-0.5 rounded">{value}</code>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">💡 Developer Note</h2>
          <p className="text-gray-700 whitespace-pre-line">{data.developer_note}</p>
        </div>
      </section>
    </main>
  )
}

export default Home
