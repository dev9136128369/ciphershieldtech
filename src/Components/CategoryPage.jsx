import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const categories = ['general', 'technology', 'business', 'education'];

const CategoryPage = () => {
  const [allPosts, setAllPosts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch all posts
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const result = {};
        for (const category of categories) {
          try {
            const response = await axios.get(`http://localhost:8000/api/posts/${category}`);
            result[category] = response.data;
          } catch (err) {
            console.error(`Error fetching ${category} posts:`, err);
            result[category] = [];
          }
        }
        setAllPosts(result);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllPosts();
  }, []);

  // Delete post handler
  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8000/api/posts/${postId}`);
      
      if (response.data.success) {
        // Update UI by removing the deleted post
        setAllPosts(prevPosts => {
          const updatedPosts = { ...prevPosts };
          for (const category in updatedPosts) {
            updatedPosts[category] = updatedPosts[category].filter(post => post.id !== postId);
          }
          return updatedPosts;
        });
        
        alert(response.data.message || 'Post deleted successfully');
      } else {
        throw new Error(response.data.error || 'Failed to delete post');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert(err.response?.data?.error || err.message || 'Failed to delete post');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button 
          className="retry-btn"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
 <section className="innerBanner">
        <img className="bannerImage" src="/Images/catagry.jpg" alt="Power Plant Banner" />
        <div className="bannerContent">
        <h1>Category</h1>
        </div>
      </section>

    <div className="blog-container">
    <div className="category-header-wrapper">
  <h1 className="category-title">All Categories
  <span className="decorative-line1"></span>

  </h1>
  <button className="add-button" onClick={() => navigate('/BlogPage')}>
    + Add
  </button>
</div>

      {categories.map(category => (
        <section key={category} className="category-section">
          <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
          
          {allPosts[category]?.length === 0 ? (
            <p className="no-posts">No posts in this category</p>
          ) : (
            <div className="posts-grid">
              {allPosts[category]?.map(post => (
                <article key={post.id} className="post-card">
                  <div className="post-header">
                    <h3>{post.title}</h3>
                    <span className="post-meta">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="post-content">{post.content}</p>
                  
                  {post.attachments?.length > 0 && (
                    <div className="post-attachments">
                      <h4>Attachments:</h4>
                      <ul>
                        {post.attachments.map((file, index) => (
                          <li key={index}>
                            <button 
                              className="download-btn"
                              onClick={() => window.open(`http://localhost:8000${file}`, '_blank')}
                            >
                              {file.split('/').pop()}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="post-actions">
                    <button 
                      className="edit-btn"
                      onClick={() => navigate(`/edit-post/${post.id}`)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </button>
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