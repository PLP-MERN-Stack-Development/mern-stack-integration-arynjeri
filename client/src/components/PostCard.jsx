// src/components/PostCard.jsx
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <article className="bg-white rounded-lg shadow hover:shadow-lg transition p-5">
      {post.featuredImage && (
        <img src={post.featuredImage} alt="" className="w-full h-48 object-cover rounded mb-3" />
      )}
      <Link to={`/posts/${post._id}`} className="block">
        <h2 className="text-xl font-semibold text-indigo-600 hover:underline">{post.title}</h2>
      </Link>
      <p className="text-gray-600 mt-1 line-clamp-2">{post.content}</p>
      <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
        <span>{post.author?.username || 'Anon'}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      {post.category && (
        <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded mt-2">
          {post.category.name}
        </span>
      )}
    </article>
  );
}