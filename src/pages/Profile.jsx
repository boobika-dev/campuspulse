import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from "../context/AuthContext"
import Navbar from "../components/Navbar"

export default function Profile() {
  const { id } = useParams()
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      const docSnap = await getDoc(doc(db, "users", id))
      if (docSnap.exists()) {
        setProfile({ id: docSnap.id, ...docSnap.data() })
      }
      setLoading(false)
    }
    fetchProfile()
  }, [id])

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin text-5xl">🎓</div>
        </div>
      </>
    )
  }

  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-500 text-xl">Profile not found!</p>
        </div>
      </>
    )
  }

  const isOwnProfile = user && user.uid === id

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8">

        <a href="/home" className="text-purple-600 font-medium hover:underline mb-6 block">
          ← Back to Events
        </a>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="bg-gradient-to-r from-purple-700 to-purple-500 h-32"></div>

          <div className="px-6 pb-6">

            <div className="flex items-end justify-between -mt-12 mb-4">
              <div className="w-24 h-24 rounded-full bg-purple-600 border-4 border-white flex items-center justify-center text-white font-bold text-4xl shadow-lg">
                {profile.name ? profile.name.charAt(0).toUpperCase() : "?"}
              </div>
              {isOwnProfile && (
                <span className="bg-purple-100 text-purple-700 text-sm font-bold px-4 py-2 rounded-full">
                  Your Profile
                </span>
              )}
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              {profile.name}
            </h1>
            <p className="text-purple-600 font-medium mb-1">
              {profile.branch} • {profile.year}
            </p>
            <p className="text-gray-400 text-sm mb-6">
              {profile.email}
            </p>

            {profile.skills && profile.skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-700 mb-3">
                  🛠️ Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map(skill => (
                    <span key={skill}
                      className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-50 rounded-xl p-4">
              <h2 className="text-lg font-bold text-gray-700 mb-3">
                📋 Details
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Branch</span>
                  <span className="font-medium text-gray-700">{profile.branch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Year</span>
                  <span className="font-medium text-gray-700">{profile.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Role</span>
                  <span className="font-medium text-gray-700 capitalize">{profile.role || "Student"}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}