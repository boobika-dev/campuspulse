import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "../firebase"

const branches = ["IT", "AIDS", "AIML", "Chemical", "Mech", 
"Mechatronics", "Civil", "CSE", "Food Tech", "ECE", "EEE", "E&I"]

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"]

export default function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [branch, setBranch] = useState("")
  const [year, setYear] = useState("")
  const [skill, setSkill] = useState("")
  const [skills, setSkills] = useState([])
  const [error, setError] = useState("")

  const addSkill = () => {
    if (skill.trim() && !skills.includes(skill.trim())) {
      setSkills([...skills, skill.trim()])
      setSkill("")
    }
  }

  const removeSkill = (s) => {
    setSkills(skills.filter(sk => sk !== s))
  }

  const handleSignup = async () => {
    if (!name || !email || !password || !branch || !year) {
      setError("Please fill all fields")
      return
    }
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(db, "users", result.user.uid), {
        name, email, branch, year, skills,
        role: "student",
        createdAt: new Date()
      })
      window.location.href = "/home"
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        
        <h1 className="text-3xl font-bold text-purple-700 mb-2">
          CampusPulse
        </h1>
        <p className="text-gray-500 mb-6">Create your student profile</p>

        {error && (
          <p className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:border-purple-500"
        />

        <input
          type="email"
          placeholder="College Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:border-purple-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:border-purple-500"
        />

        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:border-purple-500"
        >
          <option value="">Select Branch</option>
          {branches.map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:border-purple-500"
        >
          <option value="">Select Year</option>
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Add a skill (e.g. Python)"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSkill()}
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={addSkill}
            className="bg-purple-600 text-white px-4 rounded-lg font-bold"
          >
            +
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map(s => (
            <span key={s} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              {s}
              <button onClick={() => removeSkill(s)} className="font-bold">×</button>
            </span>
          ))}
        </div>

        <button
          onClick={handleSignup}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-purple-700"
        >
          Create Account
        </button>

        <p className="text-center text-gray-500 mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 font-bold">Log in</a>
        </p>

      </div>
    </div>
  )
}