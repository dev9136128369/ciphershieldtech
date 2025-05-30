




// BlogDetail.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// const BlogDetail = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Helper to get full image URL
//   const getProperImageUrl = (url) => {
//     if (!url) return '';
//     if (url.startsWith('http') || url.startsWith('blob:')) return url;
//     if (url.startsWith('/uploads')) return `${apiBaseUrl}${url}`;
//     return `${apiBaseUrl}/uploads/${url}`;
//   };

//   // Generate slug for matching
//   const generateSlug = (title = '') =>
//     title
//       .toLowerCase()
//       .replace(/[^\w\s-]/g, '')
//       .replace(/\s+/g, '-')
//       .replace(/--+/g, '-')
//       .trim();

//   useEffect(() => {
//     const fetchPostBySlug = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${apiBaseUrl}/Components/Blog/blogpost`);
//         const posts = response.data || [];
//         // Find post matching slug
//         const matchedPost = posts.find(p => generateSlug(p.title) === slug);
//         if (!matchedPost) {
//           setError('Blog post not found.');
//           setPost(null);
//         } else {
//           setPost(matchedPost);
//           setError(null);
//         }
//       } catch (err) {
//         console.error('Error fetching blog post:', err);
//         setError('Failed to fetch blog post.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPostBySlug();
//   }, [slug]);

//   if (loading) return <div>Loading blog post...</div>;
//   if (error) return (
//     <div>
//       <p>{error}</p>
//       <button onClick={() => navigate("/DashboardLayout")}>Go Back</button>
//     </div>
//   );
//   if (!post) return null;

//   return (
//     <div style={{ maxWidth: '800px', margin: 'auto', padding: '1rem', textAlign: 'center'}}>
//       {post.bannerImage && (
//         <img
//           src={getProperImageUrl(post.bannerImage.url || post.bannerImage)}
//           alt="Banner"
//           style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', marginBottom: '1rem' }}
//         />
//       )}
//       <h1>{post.title}</h1>
//       <div dangerouslySetInnerHTML={{ __html: post.content || '<p>No content</p>' }} />
//       <button onClick={() => navigate("/DashboardLayout")} style={{ marginTop: '2rem' }}>
//         Back to Blogs
//       </button>
//     </div>
//   );
// };

// export default BlogDetail;




// 30-05-25

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './BlogDetail.css'; // Include the CSS file

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProperImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('blob:')) return url;
    if (url.startsWith('/uploads')) return `${apiBaseUrl}${url}`;
    return `${apiBaseUrl}/uploads/${url}`;
  };

  const generateSlug = (title = '') =>
    title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();

  useEffect(() => {
    const fetchPostBySlug = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiBaseUrl}/Components/Blog/blogpost`);
        const posts = response.data || [];
        const matchedPost = posts.find((p) => generateSlug(p.title) === slug);
        if (!matchedPost) {
          setError('Blog post not found.');
          setPost(null);
        } else {
          setPost(matchedPost);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to fetch blog post.');
      } finally {
        setLoading(false);
      }
    };

    fetchPostBySlug();
  }, [slug]);

  if (loading) return <div className="loading">Loading blog post...</div>;
  if (error)
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={() => navigate('/BlogFront')}>Go Back</button>
      </div>
    );
  if (!post) return null;

  return (
    <div className="blog-detail-container">
      {post.bannerImage && (
        <img
          src={getProperImageUrl(post.bannerImage.url || post.bannerImage)}
          alt="Banner"
          className="blog-detail-image"
        />
      )}
      <h1 className="blog-detail-title">{post.title}</h1>
      <div
        className="blog-detail-content"
        dangerouslySetInnerHTML={{ __html: post.content || '<p>No content</p>' }}
      />
      <button className="back-button" onClick={() => navigate('/BlogFront')}>
        Back to Blogs
      </button>
    </div>
  );
};

export default BlogDetail;
