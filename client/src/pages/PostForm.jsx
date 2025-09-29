import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { categoryService, postService } from "../services/api";

export default function PostForm() {
  const { id } = useParams(); // id of post for editing
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // fetch categories
    categoryService.getAllCategories().then(setCategories);

    // if editing, fetch post
    if (id) {
      postService.getPost(id).then((post) => {
        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category?._id || "");
        setPreview(post.featuredImage ? `http://localhost:5000${post.featuredImage}` : null);
      });
    }
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { title, content, category };
      let savedPost;

      if (id) savedPost = await postService.updatePost(id, data);
      else savedPost = await postService.createPost(data);

      if (image) {
        const formData = new FormData();
        formData.append("featuredImage", image);
        await postService.uploadImage(savedPost._id, formData);
      }

      navigate("/posts");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">{id ? "Edit" : "Create"} Post</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={6}
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-md"
          />
        )}
        <button
          type="submit"
          className="py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition"
        >
          {id ? "Update" : "Create"} Post
        </button>
      </form>
    </div>
  );
}
