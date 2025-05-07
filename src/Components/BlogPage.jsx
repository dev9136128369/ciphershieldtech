// import React, { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const BlogPage = () => {
//   const [posts, setPosts] = useState([]);
//   const [newPost, setNewPost] = useState({
//     title: '',
//     content: '',
//     category: 'general',
//     files: []
//   });
//   const [activePost, setActivePost] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   // File upload handling
//   const { getRootProps, getInputProps } = useDropzone({
//     accept: {
//       'application/pdf': ['.pdf'],
//       'image/*': ['.png', '.jpg', '.jpeg'],
//       'text/plain': ['.txt']
//     },
//     onDrop: acceptedFiles => {
//       if (activePost !== null) {
//         setPosts(posts.map(post => 
//           post.id === activePost 
//             ? {...post, files: [...post.files, ...acceptedFiles]} 
//             : post
//         ));
//       } else {
//         setNewPost({...newPost, files: [...newPost.files, ...acceptedFiles]});
//       }
//     }
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     try {
//       // Upload files first
//       const uploadedFiles = await Promise.all(
//         newPost.files.map(async (file) => {
//           const formData = new FormData();
//           formData.append('file', file);
//           const response = await axios.post('http://localhost:8000/api/upload', formData);
//           return response.data;
//         })
//       );
  
//       // Create post data with fallback category
//       const postData = {
//         title: newPost.title,
//         content: newPost.content,
//         category: newPost.category || 'general',
//         attachments: uploadedFiles.map(file => file.filePath)
//       };
      
//       console.log('Submitting post:', postData);
      
//       const response = await axios.post('http://localhost:8000/api/posts', postData);
//       console.log('Post created:', response.data);
      
//       // Only navigate if response is successful
//       if (response.status === 201) {
//         navigate(`/category/${postData.category}`);
//       }
      
//     } catch (error) {
//       console.error('Error creating post:', error.response?.data || error.message);
//       alert('Failed to create post. Please check console for details.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFileDownload = (fileUrl) => {
//     window.open(`http://localhost:8000${fileUrl}`, '_blank');
//   };

//   const handleFileDelete = (fileIndex) => {
//     setNewPost({
//       ...newPost,
//       files: newPost.files.filter((_, index) => index !== fileIndex)
//     });
//   };

//   return (
//     <>
//     <section className="innerBanner">
//         <img className="bannerImage" src="/Images/blogsBanner.jpg" alt="Power Plant Banner" />
//         <div className="bannerContent">
//         <h1>Blogs</h1>
//         </div>
//       </section>
//     <div className="blog-container">
//       <h1>My Blog
//       <span className="decorative-line1"></span>

//       </h1>
      
//       <form onSubmit={handleSubmit} className="post-form">
//         <div className="form-group">
//           <label>Title:</label>
//           <input
//             type="text"
//             value={newPost.title}
//             onChange={(e) => setNewPost({...newPost, title: e.target.value})}
//             required
//             placeholder='Blog Title....'
//           />
//         </div>
        
//         <div className="form-group">
//           <label>Category:</label>
//           <select
//             value={newPost.category}
//             onChange={(e) => setNewPost({...newPost, category: e.target.value})}
//             required
//           >
//             <option value="general">General</option>
//             <option value="technology">Technology</option>
//             <option value="business">Business</option>
//             <option value="education">Education</option>
//           </select>
//         </div>
        
//         <div className="form-group">
//           <label>Content:</label>
//           <textarea
//             value={newPost.content}
//             onChange={(e) => setNewPost({...newPost, content: e.target.value})}
//             required
//           />
//         </div>
        
//         <div {...getRootProps()} className="dropzone">
//           <input {...getInputProps()} />
//           <p>Drag & drop files here, or click to select files</p>
//           <p>(PDF, images, text files supported)</p>
//         </div>
        
//         {newPost.files.length > 0 && (
//           <div className="uploaded-files">
//             <h4>Files to upload:</h4>
//             <ul>
//               {newPost.files.map((file, index) => (
//                 <li key={index}>
//                   {file.name} ({Math.round(file.size/1)} GB)
//                   <button 
//                     type="button"
//                     onClick={() => handleFileDelete(index)}
//                   >
//                     Remove
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
        
//         <button 
//           type="submit" 
//           className="submit-btn"
//           disabled={isLoading}
//         >
//           {isLoading ? 'Creating...' : 'Create Post'}
//         </button>
//       </form>
//     </div>
//     </>
//   );
// };

// export default BlogPage;

// import React, { useContext, useEffect, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from './AuthContext'; // Verify this path is correct
// import LoginModal from './LoginModal';

// const BlogPage = () => {
//   // Get auth state from context
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // const { isAuthenticated, user, login } = useContext(AuthContext);
  
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [posts, setPosts] = useState([]);
//   const [categories] = useState(['general', 'technology', 'business', 'entertainment']);
//   const [newPost, setNewPost] = useState({
//     title: '',
//     content: '',
//     category: 'general',
//     files: []
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const authContext = useContext(AuthContext) || {
//     isAuthenticated: false,
//     user: null,
//     login: () => {}
//   };

//   useEffect(() => {
//     if (!isAuthenticated) {
//       setShowLoginModal(true);
//     } else {
//       fetchPosts();
//     }
//   }, [isAuthenticated]);

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/posts');
//       setPosts(response.data);
//     } catch (err) {
//       console.error('Failed to fetch posts:', err);
//       setError('Failed to load posts. Please try again later.');
//     }
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: {
//       'application/pdf': ['.pdf'],
//       'image/*': ['.png', '.jpg', '.jpeg'],
//       'text/plain': ['.txt']
//     },
//     maxFiles: 5,
//     maxSize: 5 * 1024 * 1024, // 5MB
//     onDrop: acceptedFiles => {
//       setNewPost(prev => ({
//         ...prev,
//         files: [...prev.files, ...acceptedFiles]
//       }));
//     },
//     onDropRejected: (rejectedFiles) => {
//       setError(`Some files were rejected. Only PDF, images, and text files up to 5MB are allowed.`);
//     }
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewPost(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const removeFile = (index) => {
//     setNewPost(prev => {
//       const newFiles = [...prev.files];
//       newFiles.splice(index, 1);
//       return {
//         ...prev,
//         files: newFiles
//       };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     if (!isAuthenticated) {
//       setShowLoginModal(true);
//       return;
//     }

//     if (!newPost.title.trim() || !newPost.content.trim()) {
//       setError('Title and content are required');
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       let uploadedFiles = [];
      
//       if (newPost.files.length > 0) {
//         uploadedFiles = await Promise.all(
//           newPost.files.map(async (file) => {
//             const formData = new FormData();
//             formData.append('file', file);
//             const response = await axios.post('http://localhost:8000/api/upload', formData, {
//               headers: {
//                 'Authorization': `Bearer ${localStorage.getItem('token')}`
//               }
//             });
//             return response.data;
//           })
//         );
//       }

//       const postData = {
//         title: newPost.title,
//         content: newPost.content,
//         category: newPost.category,
//         attachments: uploadedFiles.map(file => file.filePath)
//       };
      
//       const response = await axios.post('http://localhost:8000/api/posts', postData, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });
      
//       // Reset form and fetch updated posts
//       setNewPost({
//         title: '',
//         content: '',
//         category: 'general',
//         files: []
//       });
//       await fetchPosts();
      
//       // Navigate to the category page
//       navigate(`/category/${postData.category}`);
//     } catch (error) {
//       console.error('Error:', error);
//       setError(error.response?.data?.error || 'Failed to create post. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLoginSuccess = (userData) => {
//     login(userData); // Use the login function from context
//     setShowLoginModal(false);
//     fetchPosts();
//   };
  

//   if (!isAuthenticated) {
//     return (
//       <>
//         <section className="innerBanner">
//           <img className="bannerImage" src="/Images/blogsBanner.jpg" alt="Blog Banner" />
//           <div className="bannerContent">
//             <h1>Blogs</h1>
//           </div>
//         </section>
        
//         {showLoginModal && (
//           <LoginModal 
//             onClose={() => setShowLoginModal(false)} 
//             onLoginSuccess={handleLoginSuccess}
//           />
//         )}
        
//         <div className="restricted-message">
//           <h2>Please Login to Access Blog</h2>
//           <p>You need to be logged in to view and create blog posts.</p>
//           <button 
//             className="login-btn"
//             onClick={() => setShowLoginModal(true)}
//           >
//             Login
//           </button>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <section className="innerBanner">
//         <img className="bannerImage" src="/Images/blogsBanner.jpg" alt="Blog Banner" />
//         <div className="bannerContent">
//           <h1>Blogs</h1>
//           <p>Welcome back, {user?.name}</p>
//         </div>
//       </section>
      
//       <div className="blog-container">
//         <div className="blog-content">
//           <div className="create-post-section">
//             <h2>Create New Post</h2>
            
//             <form onSubmit={handleSubmit} className="post-form">
//               {error && <div className="error-message">{error}</div>}
              
//               <div className="form-group">
//                 <label htmlFor="title">Title</label>
//                 <input
//                   type="text"
//                   id="title"
//                   name="title"
//                   value={newPost.title}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label htmlFor="category">Category</label>
//                 <select
//                   id="category"
//                   name="category"
//                   value={newPost.category}
//                   onChange={handleInputChange}
//                 >
//                   {categories.map(category => (
//                     <option key={category} value={category}>
//                       {category.charAt(0).toUpperCase() + category.slice(1)}
//                     </option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="form-group">
//                 <label htmlFor="content">Content</label>
//                 <textarea
//                   id="content"
//                   name="content"
//                   value={newPost.content}
//                   onChange={handleInputChange}
//                   rows="6"
//                   required
//                 ></textarea>
//               </div>
              
//               <div className="form-group">
//                 <label>Attachments (optional)</label>
//                 <div {...getRootProps()} className="dropzone">
//                   <input {...getInputProps()} />
//                   <p>Drag & drop files here, or click to select files</p>
//                   <p className="dropzone-hint">(PDF, images, or text files up to 5MB)</p>
//                 </div>
                
//                 {newPost.files.length > 0 && (
//                   <div className="file-preview">
//                     <h4>Selected Files:</h4>
//                     <ul>
//                       {newPost.files.map((file, index) => (
//                         <li key={index}>
//                           {file.name} - {(file.size / 1024).toFixed(2)} KB
//                           <button 
//                             type="button" 
//                             onClick={() => removeFile(index)}
//                             className="remove-file-btn"
//                           >
//                             Remove
//                           </button>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
              
//               <button 
//                 type="submit" 
//                 className="submit-btn"
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Posting...' : 'Create Post'}
//               </button>
//             </form>
//           </div>
          
//           <div className="posts-section">
//             <h2>Recent Posts</h2>
//             {posts.length === 0 ? (
//               <p>No posts yet. Be the first to create one!</p>
//             ) : (
//               <div className="posts-list">
//                 {posts.slice(0, 5).map(post => (
//                   <div key={post.id} className="post-card">
//                     <h3>{post.title}</h3>
//                     <p className="post-meta">
//                       By {post.authorName} in {post.category} • {new Date(post.createdAt).toLocaleDateString()}
//                     </p>
//                     <p className="post-content-preview">
//                       {post.content.length > 150 
//                         ? `${post.content.substring(0, 150)}...` 
//                         : post.content}
//                     </p>
//                     <button 
//                       onClick={() => navigate(`/category/${post.category}`)}
//                       className="view-category-btn"
//                     >
//                       View all in {post.category}
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BlogPage;

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

      if (editingPostId) {
        await axios.put(`${apiBaseUrl}/api/posts/${editingPostId}`, postData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
      } else {
        await axios.post(`${apiBaseUrl}/api/posts`, postData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
      }

      setNewPost({ title: '', content: '', category: 'Products', files: [] });
      setEditingPostId(null);
      await fetchPosts();
      navigate(`/dashboard/${postData.category}`);
    } catch (error) {
      console.error('Submit error:', error);
      alert(error.response?.data?.error || 'Failed to create/update post.');
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
