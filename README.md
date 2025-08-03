# 💬 Quick Chat

A real-time chat application built with React, Express, Socket.IO, and MongoDB. Features include user authentication, real-time messaging, online user tracking, and image sharing capabilities.



### 🖥️ Application Screenshots

<div align="center">

#### Login Page
<img src="https://github.com/user-attachments/assets/3a7f0c31-8bb1-4639-a94b-57a44ffa7339" alt="Login Page" width="800"/>

#### Chat Interface
<img src="https://github.com/user-attachments/assets/7f8a361d-4cd1-486d-956e-0daffd02b819" alt="Chat Interface" width="800"/>

#### Real-time Messaging
<img src="https://github.com/user-attachments/assets/222547c8-beec-4dbd-85d1-d6aadc8aa3ae" alt="Real-time Messaging" width="800"/>


<img src="https://github.com/user-attachments/assets/84185e29-2bab-4564-8e82-9a1f1eb88185" alt="User Management" width="800"/>

</div>

*Experience seamless real-time messaging with online user tracking and modern UI*

## ✨ Features

- 🔐 **User Authentication** - Secure JWT-based authentication system
- 💬 **Real-time Messaging** - Instant message delivery with Socket.IO
- 👥 **Online User Tracking** - See who's currently online in real-time
- 🖼️ **Image Sharing** - Upload and share images with Cloudinary integration
- 📱 **Responsive Design** - Works perfectly on web, mobile, and desktop
- 🔒 **Secure** - Protected routes and comprehensive data validation
- 🚀 **Scalable** - Built with modern full-stack practices
- 🎨 **Modern UI** - Clean and intuitive user interface

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js
- **Styling:** Tailwind CSS
- **Real-time:** Socket.IO Client
- **State Management:** React Hooks
- **Deployment:** Vercel

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Real-time:** Socket.IO
- **File Upload:** Cloudinary
- **Deployment:** Railway

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- npm or yarn
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anglczbla/chat-app-socketio.git
   git clone https://github.com/anglczbla/chatapp-backend.git
   cd chat-app-socketio
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the backend folder:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

4. **Start the application**
   ```bash
   # Start backend (from root directory)
   npm run server
   
   # Start frontend (in new terminal)
   npm run dev
   
   # Or start both concurrently
   npm start
   ```

## 📱 Related Repositories

- **Backend Repository:** [Quick Chat Backend](https://github.com/anglczbla/chatapp-backend.git)


<div align="center">

⭐ **Star this repository if you found it helpful!**

Made with ❤️ by [anglczbla](https://github.com/anglczbla)

</div>
