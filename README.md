# MERN Stack Blog Platform

A full-featured blog platform built with the MERN (MongoDB, Express.js, React.js, Node.js) stack, featuring user authentication, post management, category filtering, and file uploads.

## 🌐 Live Demo

- Frontend: [Add your frontend deployment link here]
- Backend API: [Add your backend API link here]

## ✨ Key Features

- 🔐 User Authentication System
  - Secure registration and login
  - Protected routes for authenticated users
  - JWT-based authentication
- 📝 Blog Post Management
  - Create, read, update, and delete posts
  - Rich text editing capabilities
  - Image upload support
- 🏷️ Category System
  - Filter posts by categories
  - Category management
- 🔍 Search Functionality
  - Search posts by title or content
- 📱 Responsive Design
  - Mobile-friendly interface
  - Consistent user experience across devices
- ⚡ Performance Optimized
  - Fast page loading
  - Efficient data fetching

## 🏗️ Project Structure

```
├── client/                 # Frontend directory
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── CategoryFilter.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── PostForm.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/       # Context providers
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/         # Custom React hooks
│   │   │   └── useApi.js
│   │   ├── layout/        # Layout components
│   │   │   └── DashboardLayout.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── CreateEditPostPage.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── PostDetailPage.jsx
│   │   │   ├── PostListPage.jsx
│   │   │   └── Register.jsx
│   │   ├── services/      # API services
│   │   │   └── api.js
│   │   └── utils/         # Utility functions
│   │       └── fileUpload.js
│   └── vite.config.js     # Vite configuration
├── server/                # Backend directory
│   ├── config/           # Configuration
│   │   └── db.js        # Database configuration
│   ├── middleware/      # Custom middleware
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/          # MongoDB models
│   │   ├── Category.js
│   │   ├── Post.js
│   │   └── User.js
│   ├── routes/          # API routes
│   │   ├── auth.js
│   │   ├── categories.js
│   │   ├── posts.js
│   │   └── upload.js
│   └── server.js        # Main server file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation & Setup

1. Clone the repository
```bash
git clone [repository-url]
cd mern-stack-blog
```

2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file with the following variables
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_key
# PORT=5000

# Start the server
npm start
```

3. Frontend Setup
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file
# VITE_API_URL=http://localhost:5000/api

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints

#### `POST /api/auth/register`
- Register a new user
- Body: `{ username, email, password }`

#### `POST /api/auth/login`
- Login user
- Body: `{ email, password }`
- Returns: JWT token

### Posts Endpoints

#### `GET /api/posts`
- Get all posts
- Query params:
  - `page`: Page number
  - `limit`: Posts per page
  - `category`: Filter by category
  - `search`: Search term

#### `GET /api/posts/:id`
- Get single post by ID

#### `POST /api/posts`
- Create new post
- Requires authentication
- Body: `{ title, content, category, image }`

#### `PUT /api/posts/:id`
- Update post
- Requires authentication
- Body: `{ title, content, category, image }`

#### `DELETE /api/posts/:id`
- Delete post
- Requires authentication

### Categories Endpoints

#### `GET /api/categories`
- Get all categories

#### `POST /api/categories`
- Create new category
- Requires authentication
- Body: `{ name }`

### File Upload

#### `POST /api/upload`
- Upload file
- Requires authentication
- Form data: `file`

## 🔧 Tech Stack

### Frontend
- React 18 with Vite
- React Router v6
- Context API for state management
- Axios for API requests
- Modern CSS with Flexbox/Grid

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Express Middleware
- File Upload handling

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)