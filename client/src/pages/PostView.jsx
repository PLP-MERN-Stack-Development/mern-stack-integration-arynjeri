import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postService } from "../services/api";

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postService.getPost(id);
        setPost(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center mt-8">Loading post...</p>;
  if (!post) return <p className="text-center mt-8">Post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8">
      <h1 className="text-3xl font-bold mb-4 text-center">{post.title}</h1>
      {post.featuredImage && (
        <img
          src={`http://localhost:5000${post.featuredImage}`}
          alt={post.title}
          className="w-full max-h-96 object-cover rounded-lg mb-4"
        />
      )}
      <p className="text-gray-800 leading-relaxed mb-4">{post.content}</p>
      <small className="text-gray-500">Category: {post.category?.name}</small>
    </div>
  );
}
