import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Landing from "./pages/Landing"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import EventDetail from "./pages/EventDetail"
import AddEvent from "./pages/AddEvent"
import MyEvents from "./pages/MyEvents"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Profile from "./pages/Profile"

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/addevent" element={<AddEvent />} />
          <Route path="/myevents" element={<MyEvents />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}