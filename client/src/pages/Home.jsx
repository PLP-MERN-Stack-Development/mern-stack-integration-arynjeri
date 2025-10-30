// src/pages/HomePage.jsx
import { useEffect, useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import Pagination from '../components/Pagination';
import PostList from '../components/PostList';
import SearchBar from '../components/SearchBar';
import { useApi } from '../hooks/useApi';
import { categoryService, postService } from '../services/api';

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(null);

  const { data: postsRes, loading, error, execute: fetchPosts } = useApi(postService.getAllPosts);
  const { data: cats, execute: fetchCats } = useApi(categoryService.getAllCategories);

  useEffect(() => { fetchCats(); }, [fetchCats]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPosts(page, 9, category, search);
    }, search ? 400 : 0);
    return () => clearTimeout(timer);
  }, [page, category, search, fetchPosts]);

  const totalPages = postsRes?.totalPages || 1;

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchBar value={search} onChange={setSearch} />
        {cats && <CategoryFilter categories={cats} selected={category} onSelect={setCategory} />}
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      <PostList posts={postsRes?.posts || []} />

      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  );
}