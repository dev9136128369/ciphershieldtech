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








//ss


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditPostPage.css'; // import the CSS

const EditPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  const [post, setPost] = useState({
    title: '',
    content: '',
    category: '',
    attachments: [],
  });

  const [attachment, setAttachment] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/api/posts/id/${postId}`);
        setPost(res.data.post);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch post');
      }
    };
    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', post.title);
      formData.append('content', post.content);
      formData.append('category', post.category);
      if (attachment) {
        formData.append('attachment', attachment);
      }

      await axios.put(`${apiBaseUrl}/api/posts/id/${postId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to update post');
    }
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  if (error) return <p className="error-message">{error}</p>;
  if (!post) return <p className="loading-message">Loading...</p>;

  return (
    <div className="edit-container">
      <div className="edit-box">
        <h2 className="edit-title">Edit Blog Post</h2>

        <form onSubmit={handleSubmit} className="edit-form">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            placeholder="Enter post title"
          />

          <label>Content</label>
          <textarea
            name="content"
            value={post.content}
            onChange={handleChange}
            placeholder="Write your content here..."
          ></textarea>

          <label>Category</label>
          <select name="category" value={post.category} onChange={handleChange}>
            <option value="">Select category</option>
            <option value="Products">Products</option>
            <option value="Services">Services</option>
          </select>

          {post.attachments && post.attachments.length > 0 && (
            <div className="preview-image">
              <p>Current Image:</p>
              <img src={`${apiBaseUrl}${post.attachments[0]}`} alt="attachment" />
            </div>
          )}

          <label>Upload New Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />

          <button type="submit">Update Post</button>
        </form>
      </div>
    </div>
  );
};

export default EditPostPage;
