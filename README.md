# Aikyam

# 🌱 Green Track - Sustainable Living Tracker

**Green Track** is a platform dedicated to promoting sustainability and helping individuals track their environmental impact. Our mission is to **empower communities** to take meaningful steps toward a greener future. 🌍✨  

---

## 🚀 Features

✅ **User Authentication (Signup/Login)** - Secure authentication with JWT and bcrypt.  
✅ **Log My Trip** - Track your trips and measure their carbon footprint.  
✅ **Carbon Education Hub** - Learn about carbon emissions and how to reduce them.  
✅ **Your Environmental Impact** - Visualize and track your eco-friendly activities.  
✅ **Community Engagement** - Connect with like-minded individuals.  
✅ **Achievements & Rewards** - Earn achievements for sustainable actions.  

---

## 🏗️ Tech Stack

- **Frontend:** React + TypeScript + Vite + Tailwind CSS  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB (MongoDB Compass)  
- **Authentication:** JWT + bcrypt  
- **API Calls:** Fetch API  

---

## 📂 Folder Structure

GreenTrack/ │── backend/ # Express.js Backend │ ├── models/ # Mongoose models (User, Trip) │ ├── routes/ # API routes (Auth, Trips) │ ├── server.js # Main server file │── frontend/ # React + TypeScript Frontend │ ├── src/ │ │ ├── components/ # Reusable components │ │ ├── pages/ # Pages (Dashboard, Login, Signup) │ │ ├── App.tsx # Main App component │── .env # Environment variables │── package.json # Dependencies │── README.md # Project Documentation


---

## 🛠️ Installation & Setup

### **1️⃣ Clone the Repository**
git clone https://github.com/your-repo/green-track.git
cd green-track


2️⃣ Backend Setup
cd backend
npm install

Create a .env file in the backend folder:
MONGO_URI=mongodb://localhost:27017/greenTrackDB
JWT_SECRET=your_jwt_secret

Start the backend:
npm start

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Open http://localhost:5173 in your browser.

🔥 API Endpoints
Authentication
Method	Endpoint	           Description
POST	  /api/auth/signup	   Register a new user
POST	  /api/auth/login	     User login

Trips
Method	Endpoint	              Description
POST	  /api/trips/log-trip	    Store trip details in MongoDB
GET	    /api/trips	            Fetch all logged trips

👥 Team Members
Name	      Role	                    LinkedIn
Member 1	  Full-Stack Developer	    LinkedIn
Member 2	  Frontend Developer	      LinkedIn
Member 3	  Backend Developer	        LinkedIn
Member 4	  UI/UX Designer	          LinkedIn

📸 Screenshots
Homepage

Log My Trip

Dashboard


🛠️ Future Enhancements
🔹 Add Google OAuth for authentication.
🔹 Implement real-time leaderboards for sustainability efforts.
🔹 Introduce gamification elements (badges, points, etc.).


📜 License
This project is open-source under the MIT License.

🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the repository.
Create a new branch (feature-branch).
Commit your changes (git commit -m "Added new feature").
Push and open a pull request.

📬 Contact
For any queries, reach out to us at greentrack@gmail.com or via LinkedIn.

🌿 Let's build a sustainable future together! 🚀


---

### ✅ **Why This README?**
✔️ **Well-structured** - Covers everything from features to installation.  
✔️ **Professional Look** - Includes API details, folder structure, and contribution guidelines.  
✔️ **Team Credits** - A section to showcase the team with LinkedIn links.  
✔️ **Future Enhancements** - Shows the vision for the project.  

This README will make your project look **professional** and **developer-friendly**! 🚀 Let me know if you need any modifications! 😊
