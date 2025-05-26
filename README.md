# Corsa - Course Selling Platform

<!-- ![Corsa Logo](./client/src/assets/logo.svg) -->

Corsa is a modern web application for selling and managing online courses. Built with the MERN stack (MongoDB, Express.js, React, Node.js), it provides a seamless experience for both course creators and students.

## Features

### For Course Creators
- Course creation and management

### For Students
- Browse course catalog
- Purchase and enroll in courses

## Tech Stack

### Frontend
- React.js with Vite
- Modern JavaScript (ES6+)
- Tailwind for styling
- React Router for navigation

### Backend
- Node.js
- Express.js framework
- MongoDB database
- JWT for authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/SoumyadipDutta1004/Corsa.git
cd Corsa
```

2. Install dependencies for both frontend and backend
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Set up environment variables
```bash
# In the server directory, create a .env file with:
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

# In the client directory, create a .env file with:
VITE_APP_API_URL=http://localhost:3000/api/v1
```

4. Start the development servers
```bash
# Start backend server (from server directory)
npm run dev

# Start frontend development server (from client directory)
npm run dev
```

## Project Structure

```
corsa/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   └── App.jsx        # Main React component
│   └── package.json
└── server/                # Backend Node.js application
    ├── src/
    │   ├── config/        # Configuration files
    │   ├── controllers/   # Request handlers
    │   ├── models/        # Database models
    │   ├── routes/        # API routes
    │   └── index.js       # Entry point
    └── package.json
```
