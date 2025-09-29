import { createContext, useEffect, useState } from "react";
import { categoryService, postService } from "../services/api";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPostsAndCategories = async () => {
    setLoading(true);
    try {
      const postsData = await postService.getAllPosts();
      const categoriesData = await categoryService.getAllCategories();
      setPosts(postsData);
      setCategories(categoriesData);
    } catch (err) {
      console.error("Error fetching posts or categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostsAndCategories();
  }, []);

  return (
    <BlogContext.Provider
      value={{ posts, categories, loading, refresh: fetchPostsAndCategories }}
    >
      {children}
    </BlogContext.Provider>
  );
};
