import { useEffect, useState } from "react";
import { authService, postService } from "../services/api";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const user = authService.getCurrentUser();

  const fetchComments = async () => {
    const post = await postService.getPost(postId);
    setComments(post.comments || []);
  };

  useEffect(() => { fetchComments(); }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Login to comment.");
    await postService.addComment(postId, { content, author: user.username });
    setContent("");
    fetchComments();
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Comments</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "15px" }}>
        {comments.map(c => (
          <div key={c._id} style={{ padding: "10px", borderRadius: "5px", border: "1px solid #eee", background: "#fafafa" }}>
            <strong>{c.author}</strong>: {c.content}
          </div>
        ))}
      </div>

      {user && (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            rows={3}
            required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", resize: "vertical" }}
          />
          <button type="submit" style={{ padding: "8px", borderRadius: "5px", border: "none", background: "#2196F3", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>
            Add Comment
          </button>
        </form>
      )}
    </div>
  );
}
