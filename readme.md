# 🏏 IPL Live Scoreboard Dashboard

A full-stack web application that displays live scores, completed match scorecards, and upcoming fixtures for the Indian Premier League (IPL). This project is built with the MERN stack (MongoDB, Express.js, React, Node.js) and provides a dynamic and interactive user experience.

---

## ✨ Key Features

- **Live Match Tracking:** View real-time scores for ongoing matches, including current batsmen and bowler stats.
- **Detailed Scorecards:** Access full scorecards for completed matches, showing individual batting and bowling performances for both innings.
- **Upcoming Fixtures:** See a list of all scheduled future matches.
- **Dynamic Updates:** Features an API endpoint to simulate live score updates for demonstration purposes.
- **Responsive Design:** A clean and modern UI that works on various devices.

---

## 🛠️ Technologies Used

- **Frontend:** React, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Deployment:** Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)
- **Additional Tools:** CORS, Dotenv, Nodemon

---

## 📂 Project Structure

```
ipl-dashboard/
├── backend/
│   ├── server.js
│   ├── models/
│   │   └── Match.js
│   ├── routes/
│   │   └── matches.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   │   ├── MatchCard.js
│   │   │   └── Dashboard.js
│   │   └── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Setup and Installation

Follow these steps to get the project running on your local machine.

### **Prerequisites**

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account)
- [Git](https://git-scm.com/)

### **Installation**

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/ipl-dashboard.git](https://github.com/your-username/ipl-dashboard.git)
    cd ipl-dashboard
    ```
2.  **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    ```
3.  **Install frontend dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

### **Environment Setup**

1.  Create a `.env` file in the `backend/` directory.
2.  Add your MongoDB connection string and a port number:

    ```env
    MONGODB_URI=your_mongodb_connection_string
    PORT=5000
    ```

### **Running the Application**

1.  **Start the backend server** (from the `backend/` directory):

    ```bash
    npm run start
    ```

    The server will be running on `http://localhost:5000`.

2.  **Start the frontend development server** (from the `frontend/` directory in a new terminal):
    ```bash
    npm start
    ```
    The React application will open in your browser at `http://localhost:3000`.

---

## ⚙️ API Endpoints

The backend provides the following endpoints:

| Method | Endpoint                  | Description                                       |
| :----- | :------------------------ | :------------------------------------------------ |
| `GET`  | `/api/matches`            | Get all matches.                                  |
| `GET`  | `/api/matches/live`       | Get only live matches.                            |
| `POST` | `/api/matches/seed`       | Seed the database with sample match data.         |
| `POST` | `/api/matches/:id/update` | Update a live match with new score/wicket events. |
