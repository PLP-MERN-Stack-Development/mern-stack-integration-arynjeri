// src/pages/CreateEditPostPage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { categoryService, postService } from "../services/api";

export default function CreateEditPostPage() {
  const { id } = useParams(); // ID for edit mode
  const navigate = useNavigate();

  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);

  // ✅ Fetch categories
  const {
    data: categories,
    execute: fetchCategories,
  } = useApi(categoryService.getAllCategories);

  // ✅ Fetch post if editing
  const {
    data: post,
    execute: fetchPost,
  } = useApi(postService.getPost);

  useEffect(() => {
    fetchCategories();
    if (isEdit) fetchPost(id);
  }, [id, isEdit, fetchCategories, fetchPost]);

  // ✅ Populate form with existing post
  useEffect(() => {
    if (post && isEdit) {
      setForm({
        title: post.title,
        content: post.content,
        category: post.category?._id || "",
        image: post.image || "",
      });
    }
  }, [post, isEdit]);

  // ✅ Convert uploaded image to base64 (simple version)
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
    };

    try {
      if (isEdit) {
        await postService.updatePost(id, payload);
      } else {
        await postService.createPost(payload);
      }
      navigate("/");
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        {isEdit ? "Edit Post" : "Create New Post"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title */}
        <div>
          <label className="block font-semibold mb-2">Title</label>
          <input
            type="text"
            required
            className="w-full border p-2 rounded"
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold mb-2">Category</label>
          <select
            required
            className="w-full border p-2 rounded"
            value={form.category}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            <option value="">Select category</option>
            {(categories || []).map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Content */}
        <div>
          <label className="block font-semibold mb-2">Content</label>
          <textarea
            required
            rows={10}
            className="w-full border p-2 rounded"
            value={form.content}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, content: e.target.value }))
            }
          />
        </div>

        {/* Image */}
        <div>
          <label className="block font-semibold mb-2">Image (optional)</label>

          <input type="file" accept="image/*" onChange={handleImageUpload} />

          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              className="mt-4 max-h-52 rounded border"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          {isEdit ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
}
