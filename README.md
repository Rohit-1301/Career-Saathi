# Career Saathi 🚀

> **Your AI-Powered Career Guidance Platform**

Career Saathi is a comprehensive web application designed to provide personalized career guidance and educational recommendations using AI and Firebase technology. Built with modern web technologies, it offers secure user authentication, profile management, and intelligent career insights.

![Career Saathi Banner](https://via.placeholder.com/1200x400/4f46e5/ffffff?text=Career+Saathi+-+AI+Career+Guidance)

## ✨ Features

### 🔐 **Secure Authentication System**
- Firebase Authentication with email/password
- Email verification workflow
- Protected routes and user sessions
- Password strength validation
- Admin user management system

### 👤 **User Profile Management**
- Comprehensive student profiles with educational background
- Skills and interests tracking
- Career goals and aspirations management
- Real-time profile synchronization with Firestore
- Progress tracking and profile completion status

### 🤖 **AI-Powered Career Guidance**
- Personalized career recommendations
- Skills gap analysis
- Learning roadmap generation
- Industry trend insights
- Career path predictions

### 📊 **Dashboard & Analytics**
- Interactive user dashboard
- Progress visualization
- Career assessment tools
- Learning progress tracking
- Achievement badges and milestones

### 🎨 **Modern UI/UX**
- Responsive design with Tailwind CSS
- Modern component library with shadcn/ui
- Dark/light theme support
- Mobile-first approach
- Smooth animations and transitions

## 🛠️ Tech Stack

### **Frontend**
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for component library
- **React Router** for navigation
- **Lucide React** for icons

### **Backend**
- **Node.js** with Express.js
- **Firebase Admin SDK** for server-side operations
- **ES6 Modules** with modern JavaScript
- **CORS** enabled for cross-origin requests

### **Database & Authentication**
- **Firebase Authentication** for user management
- **Cloud Firestore** for data storage
- **Firebase Security Rules** for data protection
- **Real-time data synchronization**

### **Development Tools**
- **ESLint** for code linting
- **TypeScript** for type safety
- **Git** for version control
- **Firebase CLI** for deployment

## 📁 Project Structure

```
Career-Saathi/
├── 📁 backend/                    # Express.js API server
│   ├── 📁 src/
│   │   ├── 📁 config/             # Firebase configuration
│   │   ├── 📁 controllers/        # Route controllers
│   │   ├── 📁 middleware/         # Authentication middleware
│   │   ├── 📁 routes/             # API routes
│   │   ├── 📁 services/           # Business logic
│   │   └── 📁 utils/              # Utility functions
│   └── 📄 index.js                # Server entry point
├── 📁 frontend/                   # React TypeScript app
│   ├── 📁 src/
│   │   ├── 📁 components/         # Reusable UI components
│   │   ├── 📁 contexts/           # React contexts
│   │   ├── 📁 pages/              # Route components
│   │   ├── 📁 services/           # API services
│   │   ├── 📁 hooks/              # Custom React hooks
│   │   └── 📁 lib/                # Utility libraries
│   ├── 📄 package.json
│   └── 📄 vite.config.ts
├── 📄 firebase.json               # Firebase configuration
├── 📄 firestore.rules            # Firestore security rules
├── 📄 package.json               # Root dependencies
└── 📄 README.md                  # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase project with Authentication and Firestore enabled

### 1. Clone the Repository
```bash
git clone https://github.com/Rohit-1301/Career-Saathi.git
cd Career-Saathi
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Download service account key to `backend/serviceAccountKey.json`
5. Copy Firebase config to `frontend/src/firebase.ts`

### 4. Environment Configuration
Create `.env` files:

**Backend** (`backend/.env`):
```env
PORT=3000
NODE_ENV=development
```

**Frontend** (`frontend/.env`):
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 5. Run the Application
```bash
# Start backend (from root directory)
npm run start:backend

# Start frontend (from root directory)  
npm run start:frontend

# Or run both concurrently
npm run dev
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - User login (client-side)

### User Profile Endpoints
- `GET /api/users/profile` - Get current user's profile
- `PUT /api/users/profile` - Update current user's profile
- `GET /api/users/profile/:uid` - Get specific user's profile
- `DELETE /api/users/profile/:uid` - Delete user account
- `GET /api/users/all` - Get all users (admin only)

For detailed API documentation, see [FIREBASE_INTEGRATION.md](./FIREBASE_INTEGRATION.md)

## 🔧 Development

### Running Tests
```bash
# Run frontend tests
cd frontend && npm test

# Run backend tests
cd backend && npm test
```

### Building for Production
```bash
# Build frontend
cd frontend && npm run build

# Build backend
cd backend && npm run build
```

### Code Quality
```bash
# Lint code
npm run lint

# Format code
npm run format
```

## 🚦 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Heroku)
```bash
cd backend
npm start
# Deploy backend directory
```

### Firebase Hosting
```bash
firebase deploy
```

## 🔒 Security Features

- **Firebase Authentication** with email verification
- **Firestore Security Rules** for data protection
- **Input validation** and sanitization
- **CORS** configuration
- **Environment variables** for sensitive data
- **Admin privilege management**

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rohit Gupta**
- GitHub: [@Rohit-1301](https://github.com/Rohit-1301)
- LinkedIn: [Rohit Gupta](https://linkedin.com/in/rohit-gupta)

## 🙏 Acknowledgments

- Firebase for backend infrastructure
- React team for the amazing framework
- shadcn/ui for beautiful components
- Tailwind CSS for styling system
- Vercel for hosting platform

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/Rohit-1301/Career-Saathi?style=social)
![GitHub forks](https://img.shields.io/github/forks/Rohit-1301/Career-Saathi?style=social)
![GitHub issues](https://img.shields.io/github/issues/Rohit-1301/Career-Saathi)
![GitHub license](https://img.shields.io/github/license/Rohit-1301/Career-Saathi)

---

<div align="center">
  <p>Built with ❤️ for students seeking career guidance</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>