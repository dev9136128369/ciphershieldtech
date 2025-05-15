import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BlogPage = () => {
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'Products',
    files: []
  });
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_BASE_URL = 'http://localhost:8000/api';

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_BASE_URL}/articles`);
      setPosts(response.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setError(err.response?.data?.message || 'Failed to load posts');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'text/plain': ['.txt']
    },
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      setNewPost((prev) => ({
        ...prev,
        files: [...prev.files, ...acceptedFiles]
      }));
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) {
      setError('Title and content are required.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', newPost.title);
      formData.append('content', newPost.content);
      formData.append('category', newPost.category);

      newPost.files.forEach((file) => {
        formData.append('files', file);
      });

      await axios.post(`${API_BASE_URL}/articles`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setNewPost({ title: '', content: '', category: 'Products', files: [] });
      await fetchPosts();
    } catch (error) {
      console.error('Submit error:', error);
      setError(error.response?.data?.message || 'Failed to submit post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileDelete = (index) => {
    setNewPost((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`${API_BASE_URL}/articles/${id}`);
        await fetchPosts();
      } catch (error) {
        console.error('Delete error:', error);
        setError('Failed to delete post');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-post/${id}`);
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
        {error && <div className="error-message">{error}</div>}

        <h1>My Products And Services <span className="decorative-line4"></span></h1>

        <form onSubmit={handleSubmit} className="post-form" encType="multipart/form-data">
          <div className="form-group">
            <label>Products Title:</label>
            <input
              type="text"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              required
              placeholder="Enter product title"
            />
          </div>

          <div className="form-group">
            <label>Products Category:</label>
            <select
              value={newPost.category}
              onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
              required
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
              placeholder="Describe your product or service"
            />
          </div>

          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>📎 Drag & drop files here, or click to select (PDF, images, TXT)</p>
          </div>

          {newPost.files.length > 0 && (
            <div className="uploaded-files">
              <h4>Attached Files:</h4>
              <ul>
                {newPost.files.map((file, index) => (
                  <li key={index}>
                    {file.name} ({Math.round(file.size / 1024)} KB)
                    <button 
                      type="button" 
                      onClick={() => handleFileDelete(index)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Post'}
          </button>
        </form>

        <hr />
        <h2>Your Products:</h2>
        {isLoading ? (
          <div className="loading">Loading products...</div>
        ) : posts.length === 0 ? (
          <div className="no-posts">No products found</div>
        ) : (
          <div className="posts-grid">
            {posts.map(post => (
              <div key={post._id} className="post-card">
                <h3>{post.title}</h3>
                <p className="category">{post.category}</p>
                <p className="content">{post.content}</p>

                {post.attachments?.length > 0 && (
                  <div className="attachments">
                    <h4>Attachments:</h4>
                    <ul>
                      {post.attachments.map((file, index) => (
                        <li key={index}>
                          <a
                            href={`http://localhost:8000${file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            File {index + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="card-footer">
                  <button
                    onClick={() => handleEdit(post._id)}
                    className="action-btn edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="action-btn delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BlogPage;













































// import React, { useState, useEffect } from 'react';
// import { useDropzone } from 'react-dropzone';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const BlogPage = () => {
//   const [newPost, setNewPost] = useState({
//     title: '',
//     content: '',
//     category: 'Products',
//     files: []
//   });
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   // API configuration - ensure this matches your backend
//   const API_BASE_URL = 'http://localhost:8000/api';

//   const fetchPosts = async () => {
//   try {
//     setIsLoading(true);
//     const response = await axios.get(`${API_BASE_URL}/articles`);
//     const data = response.data;

//     // Ensure it's an array
//     if (Array.isArray(data)) {
//       setPosts(data);
//     } else if (Array.isArray(data.posts)) {
//       setPosts(data.posts);
//     } else {
//       console.error("Unexpected response structure:", data);
//       setPosts([]); // or handle accordingly
//     }
//   } catch (err) {
//     console.error("Failed to fetch posts:", err);
//     setError(err.response?.data?.message || 'Failed to load posts');
//   } finally {
//     setIsLoading(false);
//   }
// };


//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: {
//       'application/pdf': ['.pdf'],
//       'image/*': ['.png', '.jpg', '.jpeg'],
//       'text/plain': ['.txt']
//     },
//     maxFiles: 5,
//     onDrop: acceptedFiles => {
//       setNewPost(prev => ({
//         ...prev,
//         files: [...prev.files, ...acceptedFiles]
//       }));
//     }
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       const formData = new FormData();
//       formData.append('title', newPost.title);
//       formData.append('content', newPost.content);
//       formData.append('category', newPost.category);
      
//       // Append each file
//       newPost.files.forEach((file) => {
//         formData.append('files', file);
//       });

//       const response = await axios.post(`${API_BASE_URL}/articles`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       // Reset form and refresh posts
//       setNewPost({ title: '', content: '', category: 'Products', files: [] });
//       await fetchPosts();
//     } catch (error) {
//       console.error('Submit error:', error);
//       setError(error.response?.data?.message || error.message || 'Failed to submit post');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFileDelete = (index) => {
//     setNewPost(prev => ({
//       ...prev,
//       files: prev.files.filter((_, i) => i !== index)
//     }));
//   };

//   return (
//     <>
//       <section className="innerBanner">
//         <img className="bannerImage" src="/Images/blogsBanner.jpg" alt="Blog Banner" />
//         <div className="bannerContent">
//           <h1>Products</h1>
//         </div>
//       </section>

//       <div className="blog-container">
//         {error && <div className="error-message">{error}</div>}

//         <h1>My Products And Services <span className="decorative-line4"></span></h1>

//         <form onSubmit={handleSubmit} className="post-form" id="postForm">
//           <div className="form-group">
//             <label>Products Title:</label>
//             <input
//               type="text"
//               value={newPost.title}
//               onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
//               required
//               placeholder="Enter product title"
//             />
//           </div>

//           <div className="form-group">
//             <label>Products Category:</label>
//             <select
//               value={newPost.category}
//               onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
//               required
//             >
//               <option value="Products">Products</option>
//               <option value="Services">Services</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Products Content:</label>
//             <textarea
//               value={newPost.content}
//               onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
//               required
//               placeholder="Describe your product or service"
//             />
//           </div>

//           <div {...getRootProps()} className="dropzone">
//             <input {...getInputProps()} />
//             <p>Drag & drop files here, or click to select files (PDF, images, text)</p>
//           </div>

//           {newPost.files.length > 0 && (
//             <div className="uploaded-files">
//               <h4>Attached Files:</h4>
//               <ul>
//                 {newPost.files.map((file, index) => (
//                   <li key={index}>
//                     {file.name} ({Math.round(file.size / 1024)} KB)
//                     <button 
//                       type="button" 
//                       onClick={() => handleFileDelete(index)}
//                       className="remove-btn"
//                     >
//                       Remove
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           <button 
//             type="submit" 
//             className="submit-btn" 
//             disabled={isLoading}
//           >
//             {isLoading ? 'Submitting...' : 'Submit Post'}
//           </button>
//         </form>

//         <hr />
//         <h2>Your Products:</h2>
//         {isLoading ? (
//           <div className="loading">Loading products...</div>
//         ) : posts.length === 0 ? (
//           <div className="no-posts">No products found</div>
//         ) : (
//           <div className="posts-grid">
//             {posts.map(post => (
//               <div key={post.id} className="post-card">
//                 <h3>{post.title}</h3>
//                 <p className="category">{post.category}</p>
//                 <p className="content">{post.content}</p>
//               </div>
              
//             ))}
//              <div className="card-footer">
//                     <button
//                       onClick={() => handleEdit(post._id)} // Updated to use _id
//                       className="action-btn edit-btn"
//                     >
//                       <i className="fas fa-edit"></i> Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(post._id)} // Updated to use _id
//                       className="action-btn delete-btn"
//                     >
//                       <i className="fas fa-trash"></i> Delete
//                     </button>
//                   </div>
//           </div>
          
//         )}
//       </div>
//     </>
//   );
// };

// export default BlogPage;