// src/components/PostList.jsx
import PostCard from './PostCard';

export default function PostList({ posts }) {
  if (!posts?.length) return <p className="text-center text-gray-500">No posts found.</p>;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <PostCard key={p._id} post={p} />
      ))}
    </div>
  );
}