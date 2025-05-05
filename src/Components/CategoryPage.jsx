import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const categories = ['general', 'technology', 'business', 'education'];
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const CategoryPage = () => {
  const [allPosts, setAllPosts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        setIsLoading(true);
        const result = {};

        for (const category of categories) {
          try {
            const response = await axios.get(`${apiBaseUrl}/api/posts/${category}`);
            result[category] = response.data || []; // Ensure we always have an array
          } catch (err) {
            console.error(`Error fetching ${category}:`, err);
            result[category] = [];
          }
        }

        setAllPosts(result);
      } catch (err) {
        setError('Failed to load posts. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllPosts();
  }, [apiBaseUrl]);

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await axios.delete(`${apiBaseUrl}/api/posts/${postId}`);
      if (response.data.success) {
        setAllPosts(prev => {
          const updated = { ...prev };
          for (const category in updated) {
            updated[category] = updated[category].filter(post => post.id !== postId);
          }
          return updated;
        });
        alert('Post deleted successfully');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Delete failed');
    }
  };

  const getFileNameFromPath = (filePath) => {
    if (!filePath) return 'Unknown file';
    try {
      return filePath.split('/').pop() || filePath;
    } catch {
      return filePath;
    }
  };

  if (isLoading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <>
      <section className="innerBanner">
        <img className="bannerImage" src="/Images/catagry.jpg" alt="Banner" />
        <div className="bannerContent">
          <h1>Category</h1>
        </div>
      </section>

      <div className="blog-container">
        <div className="category-header-wrapper">
          <h1 className="category-title">All Categories</h1>
          <button className="add-button" onClick={() => navigate('/BlogPage')}>+ Add</button>
        </div>

        {categories.map(category => (
          <section key={category} className="category-section">
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            {!allPosts[category] || allPosts[category].length === 0 ? (
              <p>No posts in this category</p>
            ) : (
              <div className="posts-grid">
                {allPosts[category].map(post => (
                  <article key={post.id || Math.random()} className="post-card">
                    <h3>{post.title || 'Untitled Post'}</h3>
                    <p className="post-meta">
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'No date'}
                    </p>
                    <p>{post.content || 'No content'}</p>

                    {post.attachments?.length > 0 && (
                      <ul>
                        {post.attachments.map((file, i) => (
                          <li key={i}>
                            {file ? (
                              <a href={`${apiBaseUrl}${file}`} target="_blank" rel="noopener noreferrer">
                                {getFileNameFromPath(file)}
                              </a>
                            ) : (
                              <span>Invalid file</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="post-actions">
                      <button onClick={() => navigate(`/edit-post/${post.id}`)}>Edit</button>
                      <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </>
  );
};

export default CategoryPage;