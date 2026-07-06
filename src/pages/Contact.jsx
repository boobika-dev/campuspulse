export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between px-8 py-5 bg-white shadow-md">
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl">🎓</span>
          <span className="text-xl font-bold text-purple-700">CampusPulse</span>
        </a>
        <div className="flex items-center gap-6">
          <a href="/about" className="text-gray-500 hover:text-purple-600 text-sm font-medium">About</a>
          <a href="/contact" className="text-purple-600 font-bold text-sm">Contact</a>
          <a href="/login" className="text-gray-500 hover:text-purple-600 text-sm font-medium">Log in</a>
          <a href="/signup" className="bg-purple-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-purple-700">
            Sign up
          </a>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-16">

        <div className="text-center mb-12">
          <span className="text-6xl mb-4 block">📬</span>
          <h1 className="text-4xl font-black text-purple-700 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-500 text-lg">
            Have a question or want to list your club's events? 
            We'd love to hear from you!
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

          <div className="space-y-4">

            <div>
              <label className="text-sm font-bold text-gray-600 mb-1 block">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Boobika"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600 mb-1 block">
                Your Email
              </label>
              <input
                type="email"
                placeholder="your@kongu.edu"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600 mb-1 block">
                Subject
              </label>
              <input
                type="text"
                placeholder="e.g. Want to list our club events"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600 mb-1 block">
                Message
              </label>
              <textarea
                placeholder="Write your message here..."
                rows={5}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-purple-500"
              />
            </div>

            <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-purple-700">
              Send Message 📬
            </button>

          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4">
            <span className="text-3xl">📍</span>
            <div>
              <p className="font-bold text-gray-700">Location</p>
              <p className="text-gray-500 text-sm">
                Kongu Engineering College, Perundurai, Erode — 638060
              </p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4">
            <span className="text-3xl">✉️</span>
            <div>
              <p className="font-bold text-gray-700">Email</p>
              <p className="text-gray-500 text-sm">campuspulse@kongu.edu</p>
            </div>
          </div>
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