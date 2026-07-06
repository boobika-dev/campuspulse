import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, increment } from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from "../context/AuthContext"
import Navbar from "../components/Navbar"
import InterestedStudents from "../components/InterestedStudents"

export default function EventDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState("")
  const [interested, setInterested] = useState(false)
  const [count, setCount] = useState(0)
  const [registeredUsers, setRegisteredUsers] = useState([])
  const [showStudents, setShowStudents] = useState(false)

  useEffect(() => {
    const getEvent = async () => {
      const docRef = doc(db, "events", id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = { id: docSnap.id, ...docSnap.data() }
        setEvent(data)
        setCount(data.interestedCount || 0)
        setRegisteredUsers(data.registeredUsers || [])
        if (user && data.registeredUsers?.includes(user.uid)) {
          setInterested(true)
        }
      }
      setLoading(false)
    }
    getEvent()
  }, [id, user])

  useEffect(() => {
    if (!event) return
    const timer = setInterval(() => {
      const now = new Date()
      const deadline = new Date(event.deadline)
      const diff = deadline - now

      if (diff <= 0) {
        setTimeLeft("Registration Closed")
        clearInterval(timer)
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    }, 1000)

    return () => clearInterval(timer)
  }, [event])

  const handleInterested = async () => {
    if (!user) {
      window.location.href = "/login"
      return
    }

    const docRef = doc(db, "events", id)

    if (interested) {
      await updateDoc(docRef, {
        registeredUsers: arrayRemove(user.uid),
        interestedCount: increment(-1)
      })
      setInterested(false)
      setCount(prev => prev - 1)
      setRegisteredUsers(prev => prev.filter(uid => uid !== user.uid))
    } else {
      await updateDoc(docRef, {
        registeredUsers: arrayUnion(user.uid),
        interestedCount: increment(1)
      })
      setInterested(true)
      setCount(prev => prev + 1)
      setRegisteredUsers(prev => [...prev, user.uid])
    }
  }

  const categoryColors = {
    hackathon: "bg-purple-100 text-purple-700",
    workshop: "bg-blue-100 text-blue-700",
    cultural: "bg-red-100 text-red-700",
    sports: "bg-green-100 text-green-700",
    competition: "bg-orange-100 text-orange-700",
  }

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

  if (!event) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-500 text-xl">Event not found!</p>
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {showStudents && (
        <InterestedStudents
          registeredUsers={registeredUsers}
          onClose={() => setShowStudents(false)}
        />
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">

        <a href="/home" className="text-purple-600 font-medium hover:underline mb-6 block">
          ← Back to Events
        </a>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <img
            src={event.posterUrl}
            alt={event.title}
            className="w-full h-64 object-cover"
          />

          <div className="p-6">

            <div className="flex items-center gap-3 mb-4">
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${categoryColors[event.category] || "bg-gray-100 text-gray-700"}`}>
                {event.category.toUpperCase()}
              </span>
              <span className="text-sm text-gray-500">
                {event.mode === "online" ? "🌐 Online" : "📍 " + event.venue}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {event.title}
            </h1>

            <p className="text-purple-600 font-semibold text-lg mb-4">
              {event.club}
            </p>

            <div className={`rounded-xl p-4 mb-6 text-center ${timeLeft === "Registration Closed" ? "bg-red-50" : "bg-purple-50"}`}>
              <p className="text-sm text-gray-500 mb-1">Registration Deadline</p>
              <p className={`text-3xl font-bold ${timeLeft === "Registration Closed" ? "text-red-500" : "text-purple-700"}`}>
                {timeLeft || "Calculating..."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Event Date</p>
                <p className="font-bold text-gray-700">{event.startDate}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Deadline</p>
                <p className="font-bold text-gray-700">{event.deadline}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Venue</p>
                <p className="font-bold text-gray-700">{event.venue}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Eligibility</p>
                <p className="font-bold text-gray-700">{event.eligibility}</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-700 mb-2">
                About this Event
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {event.description}
              </p>
            </div>

            {event.tags && event.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {event.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowStudents(true)}
                className="text-purple-600 font-bold text-sm hover:underline cursor-pointer bg-purple-50 px-4 py-2 rounded-lg hover:bg-purple-100 transition-all"
              >
                👥 {count} people interested →
              </button>
              <button
                onClick={handleInterested}
                className={`px-8 py-3 rounded-xl font-bold text-lg transition-all hover:scale-105 ${
                  interested
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                {interested ? "Interested ✓" : "I'm Interested! 🙋"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}