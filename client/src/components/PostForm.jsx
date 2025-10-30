// src/components/PostForm.jsx
import { useState } from 'react';
import { uploadImage } from '../utils/fileUpload';

export default function PostForm({ post, categories, onSuccess, onCancel }) {
  const isEdit = !!post;
  const [form, setForm] = useState({
    title: post?.title || '',
    content: post?.content || '',
    category: post?.category?._id || '',
    featuredImage: post?.featuredImage || '',
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);   // <-- Cloudinary / your own endpoint
      setForm((f) => ({ ...f, featuredImage: url }));
    } catch (err) {
      setError('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isEdit) {
        await postService.updatePost(post._id, form);
      } else {
        await postService.createPost(form);
      }
      onSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5 max-w-2xl mx-auto">
      {error && <p className="text-red-600">{error}</p>}

      <div>
        <label className="block font-medium">Title</label>
        <input
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Content (Markdown supported)</label>
        <textarea
          required
          rows={8}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Category</label>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="">Select…</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium">Featured Image</label>
        <input type="file" accept="image/*" onChange={handleImage} disabled={uploading} />
        {uploading && <p className="text-sm text-indigo-600">Uploading…</p>}
        {form.featuredImage && (
          <img src={form.featuredImage} alt="preview" className="mt-2 h-40 object-cover rounded" />
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={uploading}
          className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700"
        >
          {isEdit ? 'Update' : 'Create'} Post
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-5 py-2 border rounded">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}