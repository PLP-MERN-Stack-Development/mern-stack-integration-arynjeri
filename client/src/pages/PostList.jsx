import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";

export default function PostList() {
  const { posts, categories, loading } = useContext(BlogContext);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  if (loading) return <p className="text-center mt-8">Loading posts...</p>;

  const filteredPosts = posts
    .filter((post) => post.title.toLowerCase().includes(search.toLowerCase()))
    .filter((post) => !categoryFilter || post.category?._id === categoryFilter);

  return (
    <div className="max-w-5xl mx-auto p-6 mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog Posts</h1>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <Link
            key={post._id}
            to={`/posts/${post._id}`}
            className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition transform hover:scale-105"
          >
            {post.featuredImage && (
              <img
                src={`http://localhost:5000${post.featuredImage}`}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-gray-600 mt-2">{post.content.substring(0, 80)}...</p>
              <small className="text-gray-400">Category: {post.category?.name}</small>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
