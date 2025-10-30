// src/pages/CreateEditPostPage.jsx
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { useAuth } from '../context/AuthContext';
import { useApi } from '../hooks/useApi';
import { categoryService, postService } from '../services/api';

export default function CreateEditPostPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: post, execute: fetchPost } = useApi(() => postService.getPost(id));
  const { data: cats, execute: fetchCats } = useApi(categoryService.getAllCategories);

  useEffect(() => {
    fetchCats();
    if (isEdit) fetchPost();
  }, [isEdit, id, fetchPost, fetchCats]);

  if (isEdit && !post) return <p className="text-center">Loading...</p>;
  if (isEdit && post?.author?._id !== user?._id) return <p className="text-red-600">Not authorized</p>;

  const handleSuccess = () => navigate('/');

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Post' : 'Create New Post'}</h1>
      <PostForm
        post={isEdit ? post : null}
        categories={cats || []}
        onSuccess={handleSuccess}
        onCancel={() => navigate(-1)}
      />
    </div>
  );
}