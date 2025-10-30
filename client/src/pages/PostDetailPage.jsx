// src/pages/PostDetailPage.jsx
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import { useAuth } from '../context/AuthContext';
import { useApi } from '../hooks/useApi';
import { postService } from '../services/api';

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: post, loading, error, execute: fetch } = useApi(() => postService.getPost(id));

  useEffect(() => { fetch(); }, [id, fetch]);

  const deletePost = async () => {
    if (!confirm('Delete this post?')) return;
    await postService.deletePost(id);
    navigate('/');
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;
  if (!post) return <p className="text-center">Post not found.</p>;

  const isOwner = user && user._id === post.author?._id;

  return (
    <article className="max-w-4xl mx-auto">
      <Link to="/" className="inline-block mb-4 text-indigo-600 hover:underline">
        Back to posts
      </Link>

      {post.featuredImage && (
        <img src={post.featuredImage} alt="" className="w-full h-80 object-cover rounded mb-6" />
      )}

      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="flex gap-2 text-sm text-gray-600 mb-4">
        <span>{post.author?.username}</span>
        <span>•</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        {post.category && (
          <>
            <span>•</span>
            <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
              {post.category.name}
            </span>
          </>
        )}
      </div>

      <div className="prose max-w-none mb-8">{post.content}</div>

      {isOwner && (
        <div className="flex gap-3 mb-8">
          <Link
            to={`/edit/${post._id}`}
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
          >
            Edit
          </Link>
          <button
            onClick={deletePost}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}

      <CommentSection
        postId={post._id}
        initialComments={post.comments || []}
        onCommentAdded={(c) => {
          // optional: refetch post to get updated comment count
        }}
      />
    </article>
  );
}