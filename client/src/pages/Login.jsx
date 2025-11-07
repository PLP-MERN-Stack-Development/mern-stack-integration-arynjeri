// src/pages/LoginPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Login() {
const [creds, setCreds] = useState({ email: "", password: "" });
const [loading, setLoading] = useState(false);
const { login } = useAuth();
const navigate = useNavigate();


const submit = async (e) => {
e.preventDefault();
setLoading(true);
try {
await login(creds);
navigate("/");
} finally {
setLoading(false);
}
};


return (
<div className="flex items-center justify-center h-screen bg-gray-100">
<div className="bg-white p-8 rounded shadow-md w-full max-w-md">
<h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
<form onSubmit={submit} className="space-y-4">
<input
type="email"
required
placeholder="Email"
value={creds.email}
onChange={(e) => setCreds({ ...creds, email: e.target.value })}
className="w-full p-2 border rounded"
/>
<input
type="password"
required
placeholder="Password"
value={creds.password}
onChange={(e) => setCreds({ ...creds, password: e.target.value })}
className="w-full p-2 border rounded"
/>
<button
type="submit"
disabled={loading}
className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
>
{loading ? "Logging in..." : "Login"}
</button>
</form>
<p className="mt-4 text-center">
No account? <Link to="/register" className="text-indigo-600">Register</Link>
</p>
</div>
</div>
);
}