import { useNavigate } from "react-router-dom"

export default function EventCard({ event }) {
  const navigate = useNavigate()
  const today = new Date()
  const deadline = new Date(event.deadline)
  const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))

  const categoryColors = {
    hackathon: "bg-purple-100 text-purple-700",
    workshop: "bg-blue-100 text-blue-700",
    cultural: "bg-red-100 text-red-700",
    sports: "bg-green-100 text-green-700",
    competition: "bg-orange-100 text-orange-700",
  }

  return (
    <div
      onClick={() => navigate(`/event/${event.id}`)}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer"
    >
      <img
        src={event.posterUrl}
        alt={event.title}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${categoryColors[event.category] || "bg-gray-100 text-gray-700"}`}>
            {event.category.toUpperCase()}
          </span>
          {daysLeft > 0 ? (
            <span className="text-xs text-orange-500 font-bold">
              {daysLeft} days left
            </span>
          ) : (
            <span className="text-xs text-red-500 font-bold">
              Closed
            </span>
          )}
        </div>

        <h2 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
          {event.title}
        </h2>

        <p className="text-sm text-purple-600 font-medium mb-2">
          {event.club}
        </p>

        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
          {event.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>📍 {event.venue}</span>
          <span>👥 {event.interestedCount} interested</span>
        </div>
      </div>
    </div>
  )
}