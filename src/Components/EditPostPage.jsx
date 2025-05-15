// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const EditPostPage = () => {
//   const { postId } = useParams();
//   const [post, setPost] = useState(null);
//   const [error, setError] = useState(null);
//   const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const res = await axios.get(`${apiBaseUrl}/api/posts/id/${postId}`);
//         setPost(res.data.post);
//       } catch (err) {
//         setError('Failed to fetch post');
//       }
//     };

//     fetchPost();
//   }, [postId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log(post);
//       await axios.put(`${apiBaseUrl}/api/posts/${postId}`, post, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       navigate('/');
//     } catch (err) {
//       alert('Failed to update post');
//     }
//   };

//   const handleChange = (e) => {
//     setPost({ ...post, [e.target.name]: e.target.value });
//   };

//   if (error) return <p>{error}</p>;
//   if (!post) return <p>Loading...</p>;

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow rounded">
//       <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="title"
//           value={post.title}
//           onChange={handleChange}
//           className="w-full p-2 border mb-4"
//           placeholder="Title"
//         />
//         <textarea
//           name="content"
//           value={post.content}
//           onChange={handleChange}
//           className="w-full p-2 border mb-4"
//           placeholder="Content"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Update
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditPostPage;











//sagar


// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const EditPostPage = () => {
//   const { postId } = useParams();
//   const [post, setPost] = useState({
//     title: '',
//     content: '',
//     category: '',
//   });
//   const [error, setError] = useState(null);
//   const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const res = await axios.get(`${apiBaseUrl}/api/posts/id/${postId}`);
//         console.log(res);
//         setPost(res.data.post);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to fetch post');
//       }
//     };

//     fetchPost();
//   }, [postId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`${apiBaseUrl}/api/posts/id/${postId}`, post
//       //   , {
//       //   headers: {
//       //     Authorization: `Bearer ${localStorage.getItem('token')}`,
//       //   },
//       // }
//     );
//       navigate('/'); // or redirect to /ManagePostsPage if needed
//     } catch (err) {
//       console.error(err);
//       alert('Failed to update post');
//     }
//   };

//   const handleChange = (e) => {
//     setPost({ ...post, [e.target.name]: e.target.value });
//   };

//   if (error) return <p>{error}</p>;
//   if (!post) return <p>Loading...</p>;

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow rounded">
//       <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="title"
//           value={post.title}
//           onChange={handleChange}
//           className="w-full p-2 border mb-4"
//           placeholder="Title"
//         />
//         <textarea
//           name="content"
//           value={post.content}
//           onChange={handleChange}
//           className="w-full p-2 border mb-4"
//           placeholder="Content"
//         />
//         <select
//           name="category"
//           value={post.category}
//           onChange={handleChange}
//           className="w-full p-2 border mb-4"
//         >
//           <option value="">Select category</option>
//           <option value="Products">Products</option>
//           <option value="Services">Services</option>
//         </select>

//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//           Update
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditPostPage;


















//ss2

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({
    title: '',
    content: '',
    category: '',
    image: null
  });
  const [previewImage, setPreviewImage] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  const navigate = useNavigate();

  useEffect(() => {
  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${apiBaseUrl}/api/posts/id/${postId}`);
      setPost({
        title: res.data.post.title,
        content: res.data.post.content,
        category: res.data.post.category,
        image: null // We don't need to set the File object here
      });
      
      // Check for attachments array and use the first item
      if (res.data.post.attachments && res.data.post.attachments.length > 0) {
        setPreviewImage(`${apiBaseUrl}${res.data.post.attachments[0]}`);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch post');
    } finally {
      setIsLoading(false);
    }
  };

  fetchPost();
}, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('title', post.title);
      formData.append('content', post.content);
      formData.append('category', post.category);
      if (post.image instanceof File) {
        formData.append('image', post.image);
      }

      await axios.put(`${apiBaseUrl}/api/posts/id/${postId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate('/'); // or redirect to /ManagePostsPage if needed
    } catch (err) {
      console.error(err);
      alert('Failed to update post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPost({ ...post, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  if (error) return <div className="error-message">{error}</div>;
  if (isLoading) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="edit-post-container">
      <div className="edit-post-card">
        <h2 className="edit-post-title">Edit Post</h2>
        <form onSubmit={handleSubmit} className="edit-post-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter post title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content" className="form-label">Content</label>
            <textarea
              id="content"
              name="content"
              value={post.content}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Enter post content"
              rows="6"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              id="category"
              name="category"
              value={post.category}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select category</option>
              <option value="Products">Products</option>
              <option value="Services">Services</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label">Post Image</label>
            {previewImage && (
              <div className="image-preview-container">
                <img 
                  src={previewImage} 
                  alt="Post preview" 
                  className="image-preview"
                />
              </div>
            )}
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="form-file-input"
              accept="image/*"
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPostPage;

// CSS Styles
const styles = `
  .edit-post-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  .edit-post-card {
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 2rem;
  }

  .edit-post-title {
    font-size: 1.8rem;
    color: #2d3748;
    margin-bottom: 1.5rem;
    text-align: center;
    font-weight: 600;
  }

  .edit-post-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-label {
    font-size: 1rem;
    color: #4a5568;
    font-weight: 500;
  }

  .form-input,
  .form-textarea,
  .form-select {
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  .form-input:focus,
  .form-textarea:focus,
  .form-select:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }

  .form-textarea {
    min-height: 150px;
    resize: vertical;
  }

  .form-file-input {
    padding: 0.5rem;
    border: 1px dashed #cbd5e0;
    border-radius: 6px;
    background: #f7fafc;
  }

  .image-preview-container {
    margin: 1rem 0;
    display: flex;
    justify-content: center;
  }

  .image-preview {
    max-width: 100%;
    max-height: 300px;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
  }

  .submit-button {
    background-color: #4299e1;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 1rem;
  }

  .submit-button:hover {
    background-color: #3182ce;
  }

  .submit-button:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }

  .loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    font-size: 1.2rem;
    color: #4a5568;
  }

  .error-message {
    color: #e53e3e;
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;
  }
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);













//ss


// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// // import './EditPostPage.css'; // import the CSS

// const EditPostPage = () => {
//   const { postId } = useParams();
//   const navigate = useNavigate();
//   const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

//   const [post, setPost] = useState({
//     title: '',
//     content: '',
//     category: '',
//     attachments: [],
//   });

//   const [attachment, setAttachment] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const res = await axios.get(`${apiBaseUrl}/api/posts/id/${postId}`);
//         setPost(res.data.post);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to fetch post');
//       }
//     };
//     fetchPost();
//   }, [postId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append('title', post.title);
//       formData.append('content', post.content);
//       formData.append('category', post.category);
//       if (attachment) {
//         formData.append('attachment', attachment);
//       }

//       await axios.put(`${apiBaseUrl}/api/posts/id/${postId}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       navigate('/');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to update post');
//     }
//   };

//   const handleChange = (e) => {
//     setPost({ ...post, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setAttachment(e.target.files[0]);
//   };

//   if (error) return <p className="error-message">{error}</p>;
//   if (!post) return <p className="loading-message">Loading...</p>;

//   return (
//     <div className="edit-container">
//       <div className="edit-box">
//         <h2 className="edit-title">Edit Blog Post</h2>

//         <form onSubmit={handleSubmit} className="edit-form">
//           <label>Title</label>
//           <input
//             type="text"
//             name="title"
//             value={post.title}
//             onChange={handleChange}
//             placeholder="Enter post title"
//           />

//           <label>Content</label>
//           <textarea
//             name="content"
//             value={post.content}
//             onChange={handleChange}
//             placeholder="Write your content here..."
//           ></textarea>

//           <label>Category</label>
//           <select name="category" value={post.category} onChange={handleChange}>
//             <option value="">Select category</option>
//             <option value="Products">Products</option>
//             <option value="Services">Services</option>
//           </select>

//           {post.attachments && post.attachments.length > 0 && (
//             <div className="preview-image">
//               <p>Current Image:</p>
//               <img src={`${apiBaseUrl}${post.attachments[0]}`} alt="attachment" />
//             </div>
//           )}

//           <label>Upload New Image</label>
//           <input type="file" accept="image/*" onChange={handleFileChange} />

//           <button type="submit">Update Post</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditPostPage;
