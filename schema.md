# CampusPulse Database Schema

## users collection
- name (string)
- email (string)
- branch (string)
- year (string)
- skills (array)
- role (string) — "student" or "admin"
- createdAt (timestamp)

## events collection
- title (string)
- description (string)
- club (string)
- category (string) — "hackathon", "workshop", "cultural", "sports", "competition"
- venue (string)
- mode (string) — "online" or "offline"
- eligibility (string)
- deadline (string) — "YYYY-MM-DD"
- startDate (string) — "YYYY-MM-DD"
- posterUrl (string)
- interestedCount (number)
- registeredUsers (array of user UIDs)
- tags (array of strings)
- verified (boolean)
- createdBy (string)