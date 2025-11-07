// src/pages/PostListPage.jsx
import { Link, useOutletContext } from "react-router-dom";
import { fakePosts } from "../data/fakePosts";

export default function PostListPage() {
  const { search } = useOutletContext();

  const filtered = fakePosts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">All Posts 📝</h1>

      {search && (
        <p className="text-gray-600">
          Showing results for: <b>{search}</b>
        </p>
      )}

      {/* Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <Link
            key={p._id}
            to={`/post/${p._id}`}
            className="p-4 bg-white rounded shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-gray-600 text-sm">{p.category.name}</p>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-500">No posts found.</p>
      )}

    </div>
  );
}
