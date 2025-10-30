// src/components/CommentSection.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { postService } from '../services/api';

export default function CommentSection({ postId, initialComments = [], onCommentAdded }) {
  const { user } = useAuth();
  const [comments, setComments] = useState(initialComments);
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setSending(true);

    // Optimistic update
    const optimistic = {
      _id: Date.now().toString(),
      content,
      author: { username: user.username },
      createdAt: new Date().toISOString(),
      __optimistic: true,
    };
    setComments((c) => [...c, optimistic]);
    setContent('');

    try {
      const real = await postService.addComment(postId, { content });
      setComments((c) => c.map((cm) => (cm._id === optimistic._id ? real : cm)));
      onCommentAdded?.(real);
    } catch {
      setComments((c) => c.filter((cm) => cm._id !== optimistic._id));
      alert('Comment failed');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4">Comments ({comments.length})</h3>

      {user ? (
        <form onSubmit={submit} className="mb-6">
          <textarea
            required
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-3 border rounded"
          />
          <button
            type="submit"
            disabled={sending}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {sending ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <p className="text-sm text-gray-600 mb-4">Log in to comment.</p>
      )}

      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c._id} className={`p-3 rounded ${c.__optimistic ? 'bg-gray-100' : 'bg-gray-50'}`}>
            <p className="font-medium">{c.author?.username || 'Anon'}</p>
            <p className="text-gray-700">{c.content}</p>
            <p className="text-xs text-gray-500">
              {new Date(c.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}