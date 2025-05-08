import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginModal from './LoginModal';

const BlogPage = () => {
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'Products',
    files: []
  });
  const [editingPostId, setEditingPostId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get(`${apiBaseUrl}/api/auth/check`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          setIsAuthenticated(true);
          setUser(response.data.user);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/api/posts`);
      setPosts(response.data.posts);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    checkAuth();
    fetchPosts();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'text/plain': ['.txt']
    },
    maxFiles: 5,
    onDrop: acceptedFiles => {
      if (!isAuthenticated) {
        setShowLoginModal(true);
        return;
      }
      setNewPost(prev => ({
        ...prev,
        files: [...prev.files, ...acceptedFiles]
      }));
    }
  });

  const handleLogin = async (token, userData) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setUser(userData);
    setShowLoginModal(false);
    await checkAuth();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    setIsLoading(true);
    try {
      const uploadedFiles = [];
      for (const file of newPost.files) {
        if (file instanceof File) {
          const formData = new FormData();
          formData.append('file', file);
          const uploadRes = await axios.post(`${apiBaseUrl}/api/upload`, formData, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'multipart/form-data'
            }
          });
          uploadedFiles.push(uploadRes.data.filePath);
        } else {
          uploadedFiles.push(file);
        }
      }

      const postData = {
        title: newPost.title,
        content: newPost.content,
        category: newPost.category,
        attachments: uploadedFiles
      };

      let response;
      if (editingPostId) {
        response = await axios.put(`${apiBaseUrl}/api/posts/${editingPostId}`, postData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
      } else {
        response = await axios.post(`${apiBaseUrl}/api/posts`, postData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
      }

      if (response.data.success) {
        setNewPost({ title: '', content: '', category: 'Products', files: [] });
        setEditingPostId(null);
        await fetchPosts();
        navigate(`/dashboard/${postData.category}`);
      } else {
        alert(response.data.error || 'Failed to create/update post.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      if (error.response) {
        alert(error.response.data?.error || 'Failed to create/update post.');
      } else {
        alert('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
};


  const handleFileDelete = (index) => {
    setNewPost(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleEdit = (post) => {
    setEditingPostId(post._id);
    setNewPost({
      title: post.title,
      content: post.content,
      category: post.category,
      files: post.attachments || []
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <section className="innerBanner">
        <img className="bannerImage" src="/Images/blogsBanner.jpg" alt="Blog Banner" />
        <div className="bannerContent">
          <h1>Products</h1>
        </div>
      </section>

      <div className="blog-container">
        <div className="auth-status">
          {isAuthenticated ? (
            <div className="user-info">
              <span>Welcome, {user?.name} ({user?.email})</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <button onClick={() => setShowLoginModal(true)} className="login-btn">
              Login to Create Posts
            </button>
          )}
        </div>

        <h1>My Products And Services <span className="decorative-line4"></span></h1>

        <form onSubmit={handleSubmit} className="post-form" id="postForm">
          <div className="form-group">
            <label>Products Title:</label>
            <input
              type="text"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              required
              placeholder="Blog Title..."
              disabled={!isAuthenticated}
            />
          </div>

          <div className="form-group">
            <label>Products Category:</label>
            <select
              value={newPost.category}
              onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
              required
              disabled={!isAuthenticated}
            >
              <option value="Products">Products</option>
              <option value="Services">Services</option>
            </select>
          </div>

          <div className="form-group">
            <label>Products Content:</label>
            <textarea
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              required
              disabled={!isAuthenticated}
            />
          </div>

          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag & drop files here, or click to select files (PDF, images, text)</p>
          </div>

          {newPost.files.length > 0 && (
            <div className="uploaded-files">
              <h4>Attached Files:</h4>
              <ul>
                {newPost.files.map((file, index) => (
                  <li key={index}>
                    {typeof file === 'string' ? file.split('/').pop() : file.name} ({typeof file === 'string' ? 'Uploaded' : Math.round(file.size / 1024) + ' KB'})
                    <button type="button" onClick={() => handleFileDelete(index)} disabled={!isAuthenticated}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={isLoading || !isAuthenticated}>
            {isLoading
              ? (editingPostId ? 'Updating...' : 'Creating...')
              : (editingPostId ? 'Update Post' : 'Create Post')}
          </button>
        </form>

        <hr />
        <h2 className="text-xl font-semibold mb-4">Your Posts:</h2>
        <div className="posts-grid1">
          {posts.map(post => (
            <div key={post._id} className="post-card1">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-category">{post.category}</p>
              <button className="edit-button" onClick={() => handleEdit(post)}>
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>

      <LoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </>
  );
};

export default BlogPage;
