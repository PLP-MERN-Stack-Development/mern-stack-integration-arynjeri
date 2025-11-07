// src/App.jsx
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";


import DashboardLayout from "./layout/DashboardLayout";
import CreateEditPostPage from "./pages/CreateEditPostPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostListPage from "./pages/PostListPage";

import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
return (
<Routes>
{/* Public */}
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />


{/* Private Dashboard */}
<Route
path="/"
element={
<ProtectedRoute>
<DashboardLayout />
</ProtectedRoute>
}
>
<Route index element={<PostListPage />} />
<Route path="post/:id" element={<PostDetailPage />} />
<Route path="create" element={<CreateEditPostPage />} />
<Route path="edit/:id" element={<CreateEditPostPage />} />
</Route>
</Routes>
);
}