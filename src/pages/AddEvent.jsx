import { useState } from "react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from "../context/AuthContext"
import Navbar from "../components/Navbar"

const categories = ["hackathon", "workshop", "cultural", "sports", "competition"]
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY
export default function AddEvent() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [club, setClub] = useState("")
  const [category, setCategory] = useState("")
  const [venue, setVenue] = useState("")
  const [mode, setMode] = useState("offline")
  const [eligibility, setEligibility] = useState("")
  const [startDate, setStartDate] = useState("")
  const [deadline, setDeadline] = useState("")
  const [tag, setTag] = useState("")
  const [tags, setTags] = useState([])

  if (!user) {
    window.location.href = "/login"
    return null
  }

  const handlePosterUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setAiLoading(true)
    setError("")

    try {
      const base64 = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result.split(",")[1])
        reader.readAsDataURL(file)
      })

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: `Look at this event poster image and extract the details. Return ONLY a JSON object with these exact fields, no other text:
{
  "title": "event name",
  "description": "event description",
  "club": "organizing club or department",
  "category": "one of: hackathon, workshop, cultural, sports, competition",
  "venue": "location or venue",
  "eligibility": "who can participate",
  "startDate": "YYYY-MM-DD format",
  "deadline": "YYYY-MM-DD format",
  "tags": ["tag1", "tag2"]
}
If any field is not visible in the poster, use an empty string.`
                  },
                  {
                    type: "image_url",
                    image_url: {
                      url: `data:${file.type};base64,${base64}`
                    }
                  }
                ]
              }
            ],
            max_tokens: 1000
          })
        }
      )

      const data = await response.json()
      console.log("Groq response:", data)

      if (!data.choices || !data.choices[0]) {
        throw new Error("No response from AI")
      }

      const text = data.choices[0].message.content
      const clean = text.replace(/```json|```/g, "").trim()
      const parsed = JSON.parse(clean)

      if (parsed.title) setTitle(parsed.title)
      if (parsed.description) setDescription(parsed.description)
      if (parsed.club) setClub(parsed.club)
      if (parsed.category) setCategory(parsed.category)
      if (parsed.venue) setVenue(parsed.venue)
      if (parsed.eligibility) setEligibility(parsed.eligibility)
      if (parsed.startDate) setStartDate(parsed.startDate)
      if (parsed.deadline) setDeadline(parsed.deadline)
      if (parsed.tags) setTags(parsed.tags)

    } catch (err) {
      console.log("Full error:", err)
      setError("Couldn't read this poster — please fill the form manually.")
    }

    setAiLoading(false)
  }

  const addTag = () => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()])
      setTag("")
    }
  }

  const removeTag = (t) => {
    setTags(tags.filter(tg => tg !== t))
  }

  const handleSubmit = async () => {
    if (!title || !description || !club || !category || !venue || !startDate || !deadline) {
      setError("Please fill all required fields")
      return
    }

    setLoading(true)
    setError("")

    try {
      const posterUrl = `https://placehold.co/400x200/6D28D9/white?text=${encodeURIComponent(title)}`

      const docRef = await addDoc(collection(db, "events"), {
        title, description, club, category, venue, mode,
        eligibility, startDate, deadline, tags, posterUrl,
        interestedCount: 0, registeredUsers: [],
        verified: false, createdBy: user.uid,
        createdAt: serverTimestamp()
      })

      setSuccess(true)
      setTimeout(() => {
        window.location.href = `/event/${docRef.id}`
      }, 1500)

    } catch (err) {
      setError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <a href="/home" className="text-purple-600 font-medium hover:underline mb-6 block">
          ← Back to Events
        </a>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-purple-700 mb-2">
            Add New Event
          </h1>
          <p className="text-gray-500 mb-6">
            Fill in the details or upload a poster to auto-fill!
          </p>

          {error && (
            <p className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</p>
          )}

          {success && (
            <p className="bg-green-100 text-green-600 p-3 rounded-lg mb-4 text-sm font-bold">
              ✅ Event created successfully! Redirecting...
            </p>
          )}

          <div className="bg-purple-50 border-2 border-dashed border-purple-300 rounded-xl p-6 mb-6 text-center">
            <p className="text-2xl mb-2">🤖</p>
            <p className="font-bold text-purple-700 mb-1">AI Poster Parser</p>
            <p className="text-sm text-gray-500 mb-4">
              Upload an event poster and AI will auto-fill the form!
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handlePosterUpload}
              className="hidden"
              id="posterInput"
            />
            <label
              htmlFor="posterInput"
              className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold cursor-pointer hover:bg-purple-700"
            >
              {aiLoading ? "🤖 Reading poster..." : "Upload Poster 📸"}
            </label>
            {aiLoading && (
              <p className="text-purple-600 text-sm mt-3 animate-pulse">
                AI is reading your poster...
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-gray-600 mb-1 block">Event Title *</label>
              <input type="text" placeholder="e.g. CodeSprint 2026" value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-purple-500" />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600 mb-1 block">Description *</label>
              <textarea placeholder="Describe your event..." value={description}
                onChange={(e) => setDescription(e.target.value)} rows={4}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-purple-500" />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600 mb-1 block">Club / Organization *</label>
              <input type="text" placeholder="e.g. Computer Science Association" value={club}
                onChange={(e) => setClub(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-purple-500" />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600 mb-1 block">Category *</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-purple-500">
                <option value="">Select Category</option>
                {categories.map(c => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600 mb-1 block">Venue *</label>
              <input type="text" placeholder="e.g. Main Auditorium" value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-purple-500" />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600 mb-1 block">Mode</label>
              <select value={mode} onChange={(e) => setMode(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-purple-500">
                <option value="offline">Offline</option>
                <option value="online">Online</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600 mb-1 block">Eligibility</label>
              <input type="text" placeholder="e.g. All branches, 2nd year and above" value={eligibility}
                onChange={(e) => setEligibility(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-purple-500" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-gray-600 mb-1 block">Event Date *</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-600 mb-1 block">Deadline *</label>
                <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-purple-500" />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600 mb-1 block">Tags</label>
              <div className="flex gap-2 mb-2">
                <input type="text" placeholder="Add a tag" value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTag()}
                  className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-purple-500" />
                <button onClick={addTag} className="bg-purple-600 text-white px-4 rounded-lg font-bold">+</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map(t => (
                  <span key={t} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    {t} <button onClick={() => removeTag(t)} className="font-bold">×</button>
                  </span>
                ))}
              </div>
            </div>

            <button onClick={handleSubmit} disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-purple-700 disabled:opacity-50">
              {loading ? "Creating Event..." : "Create Event 🎉"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}