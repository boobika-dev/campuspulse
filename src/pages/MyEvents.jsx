import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from "../context/AuthContext"
import EventCard from "../components/EventCard"
import Navbar from "../components/Navbar"

export default function MyEvents() {
  const { user } = useAuth()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  if (!user) {
    window.location.href = "/login"
    return null
  }

  useEffect(() => {
    const getMyEvents = async () => {
      const q = query(
        collection(db, "events"),
        where("registeredUsers", "array-contains", user.uid)
      )
      const snapshot = await getDocs(q)
      const eventList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      eventList.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      setEvents(eventList)
      setLoading(false)
    }
    getMyEvents()
  }, [user])

  const today = new Date()

  const upcoming = events.filter(e => new Date(e.deadline) >= today)
  const past = events.filter(e => new Date(e.deadline) < today)

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            My Events 🎯
          </h1>
          <p className="text-gray-500">
            Events you've registered interest in
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">📭</p>
            <p className="text-gray-500 text-xl font-medium mb-2">
              You haven't registered for any events yet!
            </p>
            <p className="text-gray-400 mb-6">
              Explore events and click "I'm Interested" to save them here
            </p>
            <a
              href="/"
              className="bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700"
            >
              Explore Events
            </a>
          </div>
        ) : (
          <>
            {upcoming.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
                  🔥 Upcoming
                  <span className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full">
                    {upcoming.length}
                  </span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcoming.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}

            {past.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-400 mb-4 flex items-center gap-2">
                  ✅ Past Events
                  <span className="bg-gray-100 text-gray-500 text-sm px-3 py-1 rounded-full">
                    {past.length}
                  </span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60">
                  {past.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}