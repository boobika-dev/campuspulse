import Navbar from "../components/Navbar"

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between px-8 py-5 bg-white shadow-md">
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl">🎓</span>
          <span className="text-xl font-bold text-purple-700">CampusPulse</span>
        </a>
        <div className="flex items-center gap-6">
          <a href="/about" className="text-purple-600 font-bold text-sm">About</a>
          <a href="/contact" className="text-gray-500 hover:text-purple-600 text-sm font-medium">Contact</a>
          <a href="/login" className="text-gray-500 hover:text-purple-600 text-sm font-medium">Log in</a>
          <a href="/signup" className="bg-purple-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-purple-700">
            Sign up
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16">

        <div className="text-center mb-16">
          <span className="text-6xl mb-4 block">🎓</span>
          <h1 className="text-4xl font-black text-purple-700 mb-4">
            About CampusPulse
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            The one-stop platform for students of Kongu Engineering College 
            to discover and never miss any campus event.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <span className="text-4xl mb-4 block">🔍</span>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Discover</h3>
            <p className="text-gray-500 text-sm">
              Find hackathons, workshops, cultural events and sports 
              happening at your college — all in one feed.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <span className="text-4xl mb-4 block">🤖</span>
            <h3 className="text-lg font-bold text-gray-800 mb-2">AI Powered</h3>
            <p className="text-gray-500 text-sm">
              Upload any event poster and our AI instantly reads it 
              and creates a structured event — no manual typing needed.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <span className="text-4xl mb-4 block">👥</span>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Connect</h3>
            <p className="text-gray-500 text-sm">
              Register your interest, track deadlines and never 
              miss an event that matters to you.
            </p>
          </div>
        </div>

        <div className="bg-purple-700 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-black mb-2">
            Built for KEC Students 💜
          </h2>
          <p className="text-purple-200 mb-6">
            CampusPulse was built by a student, for students of 
            Kongu Engineering College, Erode. Every feature was 
            designed keeping first-year students in mind.
          </p>
          <a
            href="/signup"
            className="bg-yellow-400 text-purple-900 px-8 py-3 rounded-full font-black hover:bg-yellow-300"
          >
            Join CampusPulse 🚀
          </a>
        </div>

      </div>

      <footer className="text-center py-6 border-t border-gray-200">
        <p className="text-gray-400 text-sm">
          © 2026 CampusPulse — Kongu Engineering College, Erode
        </p>
      </footer>
    </div>
  )
}