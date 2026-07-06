import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"
import EventCard from "../components/EventCard"
import Navbar from "../components/Navbar"

const categories = ["All", "hackathon", "workshop", "cultural", "sports", "competition"]

export default function Home() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [dateFilter, setDateFilter] = useState("all")

  useEffect(() => {
    const getEvents = async () => {
      const snapshot = await getDocs(collection(db, "events"))
      const eventList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setEvents(eventList)
      setLoading(false)
    }
    getEvents()
  }, [])

  const today = new Date()
  const nextWeek = new Date()
  nextWeek.setDate(today.getDate() + 7)

  const thisWeekEvents = events.filter(event => {
    const deadline = new Date(event.deadline)
    return deadline >= today && deadline <= nextWeek
  })

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory
    const eventDeadline = new Date(event.deadline)
    const daysLeft = Math.ceil((eventDeadline - today) / (1000 * 60 * 60 * 24))

    const matchesDate =
      dateFilter === "all" ? true :
      dateFilter === "today" ? daysLeft === 0 :
      dateFilter === "week" ? daysLeft <= 7 && daysLeft >= 0 : true

    return matchesSearch && matchesCategory && matchesDate
  })

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin text-5xl mb-4">🎓</div>
            <p className="text-purple-600 text-xl font-bold">Loading events...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-gradient-to-r from-purple-700 to-purple-500 text-white py-12 px-4 text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome to CampusPulse 🎓</h1>
        <p className="text-purple-200 text-lg">
          Discover events, hackathons and workshops at your college
        </p>
        <div className="mt-6 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="🔍 Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 rounded-xl text-gray-800 text-base focus:outline-none shadow-lg"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">

        {thisWeekEvents.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
              🔥 Happening This Week
              <span className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">
                {thisWeekEvents.length} events
              </span>
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {thisWeekEvents.map(event => (
                <div key={event.id} className="min-w-72">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-purple-600 text-white shadow-md scale-105"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-purple-400"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          {[
            { label: "All Upcoming", value: "all" },
            { label: "Today", value: "today" },
            { label: "This Week", value: "week" },
          ].map(d => (
            <button
              key={d.value}
              onClick={() => setDateFilter(d.value)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                dateFilter === d.value
                  ? "bg-teal-500 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-teal-400"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-700">
            {selectedCategory === "All" ? "All Events" : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) + "s"}
            <span className="ml-2 bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full">
              {filteredEvents.length}
            </span>
          </h2>
          {(search || selectedCategory !== "All" || dateFilter !== "all") && (
            <button
              onClick={() => { setSearch(""); setSelectedCategory("All"); setDateFilter("all") }}
              className="text-sm text-red-400 hover:text-red-600 font-medium"
            >
              Clear filters ✕
            </button>
          )}
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🔍</p>
            <p className="text-gray-500 text-xl font-medium">
              No events match your filters
            </p>
            <button
              onClick={() => { setSearch(""); setSelectedCategory("All"); setDateFilter("all") }}
              className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-purple-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}