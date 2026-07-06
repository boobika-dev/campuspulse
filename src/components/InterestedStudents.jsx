import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"

export default function InterestedStudents({ registeredUsers, onClose }) {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStudents = async () => {
      if (!registeredUsers || registeredUsers.length === 0) {
        setLoading(false)
        return
      }

      const studentData = []
      for (const uid of registeredUsers) {
        try {
          const docSnap = await getDoc(doc(db, "users", uid))
          if (docSnap.exists()) {
            studentData.push({ id: uid, ...docSnap.data() })
          }
        } catch (err) {
          console.log("Error fetching student:", err)
        }
      }
      setStudents(studentData)
      setLoading(false)
    }

    fetchStudents()
  }, [registeredUsers])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-screen overflow-hidden">

        <div className="bg-purple-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-white font-bold text-xl">
            🙋 Interested Students
          </h2>
          <button
            onClick={onClose}
            className="text-white text-2xl font-bold hover:text-purple-200"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto max-h-96 p-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin text-4xl mb-2">🎓</div>
              <p className="text-gray-500">Loading students...</p>
            </div>
          ) : students.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-4xl mb-3">👥</p>
              <p className="text-gray-500 font-medium">
                No students yet!
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Be the first to click Interested
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {students.map(student => (
                <div key={student.id}
                  className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 hover:bg-purple-50 transition-all">

                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {student.name ? student.name.charAt(0).toUpperCase() : "?"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 truncate">
                      {student.name || "Unknown"}
                    </p>
                    <p className="text-sm text-purple-600 font-medium">
                      {student.branch} • {student.year}
                    </p>
                    {student.skills && student.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {student.skills.slice(0, 3).map(skill => (
                          <span key={skill}
                            className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">
                            {skill}
                          </span>
                        ))}
                        {student.skills.length > 3 && (
                          <span className="text-gray-400 text-xs">
                            +{student.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-3 border-t border-gray-100">
          <p className="text-center text-gray-400 text-sm">
            {students.length} student{students.length !== 1 ? "s" : ""} interested
          </p>
        </div>

      </div>
    </div>
  )
}