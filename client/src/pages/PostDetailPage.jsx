// src/pages/PostDetailPage.jsx
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useApi } from "../hooks/useApi";
import { postService } from "../services/api";

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    data: post,
    loading,
    error,
    execute: fetchPost,
  } = useApi(postService.getPost);

  // Fetch post on mount
  useEffect(() => {
    fetchPost(id);
  }, [id, fetchPost]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!post) return null;

  const isOwner = user?._id === post.author?._id;

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Back Link */}
      <Link to="/" className="text-indigo-600 hover:underline">
        ← Back to posts
      </Link>

      {/* Title + Meta */}
      <h1 className="text-4xl font-bold">{post.title}</h1>

      <div className="flex flex-wrap items-center gap-3 text-gray-600">
        {post.category?.name && (
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
            {post.category.name}
          </span>
        )}

        <span>•</span>

        <span>
          By <b>{post.author?.username || "Unknown"}</b>
        </span>

        <span>•</span>

        <span>
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt="Post cover"
          className="rounded-lg shadow w-full max-h-[400px] object-cover"
        />
      )}

      {/* Content */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Owner Actions */}
      {isOwner && (
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => navigate(`/edit/${post._id}`)}
            className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
          >
            Edit Post
          </button>

          <button
            onClick={async () => {
              if (!window.confirm("Delete this post?")) return;
              await postService.deletePost(post._id);
              navigate("/");
            }}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}

      {/* Comments Section Placeholder */}
      <div className="mt-10 p-5 rounded bg-white shadow">
        <h2 className="text-xl font-semibold mb-3">Comments</h2>

        <p className="text-gray-500 italic">
          Comments feature coming next…
        </p>
      </div>
    </div>
  );
}
