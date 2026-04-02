# SkillBridge - NGO & Volunteer Collaboration Platform

SkillBridge connects NGOs and volunteers through opportunities, applications, and messaging.

## Live Links

- Frontend (GitHub Pages):  
  https://shivareddy2005.github.io/communicate-with-NGO/
- Backend (Hugging Face Space):  
  https://shivareddy-03-communicate-with-ngo-backend.hf.space

---

## Features

### Volunteer
- Register/Login
- Browse opportunities
- Apply to opportunities
- Track application status
- Chat with NGOs

### NGO
- Register/Login
- Create/edit/delete opportunities
- View applicants
- Update applicant status (accept/reject)
- Chat with volunteers
- Team members and settings pages

---

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas
- **Deployment:**  
  - Frontend -> GitHub Pages  
  - Backend -> Hugging Face (Docker Space)

---

## Project Structure

```text
communicate-with-NGO/
├─ Frontend/
│  ├─ src/
│  └─ ...
├─ back-end/
│  ├─ config/
│  ├─ controllers/
│  ├─ middleware/
│  ├─ models/
│  ├─ routes/
│  └─ server.js
└─ .github/workflows/
   └─ deploy-frontend.yml


Local Setup
1) Clone
git clone https://github.com/SHIVAREDDY2005/communicate-with-NGO.git
cd communicate-with-NGO
2) Backend setup
cd back-end
npm install
Create back-end/.env:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
Run backend:

npm start
3) Frontend setup
cd ../Frontend
npm install
npm run dev
Environment Variables (Frontend)
Frontend supports:

VITE_API_BASE_URL
VITE_SOCKET_URL
If not set in production, it falls back to the deployed Hugging Face backend URL.

Deployments
Frontend (GitHub Pages)
Auto-deploy configured in:
.github/workflows/deploy-frontend.yml
Trigger: push to main (when frontend/workflow files change)
Backend (Hugging Face Docker Space)
Uses back-end/Dockerfile
Required Space Secrets:
MONGO_URI
JWT_SECRET
API Health Checks
GET / -> status response
GET /test -> Backend working
Notes
Do not commit secrets (.env, DB credentials, tokens).
If credentials were exposed, rotate them in MongoDB Atlas immediately.
Author
Shiva Reddy
GitHub: https://github.com/SHIVAREDDY2005

