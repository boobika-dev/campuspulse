export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-800 flex flex-col">

      <nav className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🎓</span>
          <span className="text-white text-xl font-bold">CampusPulse</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="/about" className="text-purple-200 hover:text-white text-sm font-medium">About</a>
          <a href="/contact" className="text-purple-200 hover:text-white text-sm font-medium">Contact</a>
          <a href="/login" className="text-purple-200 hover:text-white text-sm font-medium">Log in</a>
          <a href="/signup" className="bg-white text-purple-700 px-5 py-2 rounded-full text-sm font-bold hover:bg-purple-100">
            Sign up
          </a>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">

        <div className="mb-6">
          <span className="text-8xl">🎓</span>
        </div>

        <h1 className="text-6xl font-black text-white mb-4 leading-tight">
          Campus<span className="text-yellow-400">Pulse</span>
        </h1>

        <p className="text-purple-200 text-lg font-medium mb-2 tracking-widest uppercase">
          Kongu Engineering College
        </p>

        <div className="w-24 h-1 bg-yellow-400 rounded-full mb-6"></div>

        <p className="text-purple-100 text-xl max-w-xl mb-10 leading-relaxed">
          Discover hackathons, workshops, cultural fests and more — 
          all happening at your campus, all in one place.
        </p>

        <div className="flex gap-4 mb-16">
          <a
            href="/signup"
            className="bg-yellow-400 text-purple-900 px-8 py-3 rounded-full font-black text-lg hover:bg-yellow-300 transition-all hover:scale-105 shadow-lg"
          >
            Get Started 🚀
          </a>
          <a
            href="/login"
            className="border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-purple-700 transition-all"
          >
            Log in
          </a>
        </div>

        <div className="flex gap-12 text-center">
          <div>
            <p className="text-4xl font-black text-yellow-400">50+</p>
            <p className="text-purple-200 text-sm">Events Listed</p>
          </div>
          <div>
            <p className="text-4xl font-black text-yellow-400">12+</p>
            <p className="text-purple-200 text-sm">Clubs & Orgs</p>
          </div>
          <div>
            <p className="text-4xl font-black text-yellow-400">1000+</p>
            <p className="text-purple-200 text-sm">Students</p>
          </div>
        </div>

      </div>

      <footer className="text-center py-6 border-t border-purple-600">
        <p className="text-purple-300 text-sm">
          © 2026 CampusPulse — Kongu Engineering College, Erode
        </p>
        <p className="text-purple-400 text-xs mt-1">
          Built with ❤️ for KEC students
        </p>
      </footer>

    </div>
  )
}