import { useAuth } from "../context/AuthContext"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"

export default function Navbar() {
  const { user } = useAuth()

  const handleLogout = async () => {
    await signOut(auth)
    window.location.href = "/login"
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl">🎓</span>
          <span className="text-xl font-bold text-purple-700">
            CampusPulse
          </span>
        </a>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <a
                href="/myevents"
                className="text-sm text-gray-600 font-medium hover:text-purple-600"
              >
                My Events
              </a>
              <a
                href="/addevent"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-purple-700"
              >
                + Add Event
              </a>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-red-500 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="text-sm text-purple-600 font-bold hover:underline"
              >
                Log in
              </a>
              <a
                href="/signup"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-purple-700"
              >
                Sign up
              </a>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}