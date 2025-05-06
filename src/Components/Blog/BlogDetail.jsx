// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import PublishedBlog from './PublishedBlog';
// import { FaEllipsisV } from 'react-icons/fa';

// const BlogDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBlogPost = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/articles/${id}`, {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
        
//         if (response.data) {
//           setBlog(response.data);
//         } else {
//           setError('Blog post not found');
//         }
//       } catch (err) {
//         console.error('Error fetching blog post:', err);
//         setError(err.response?.data?.message || err.message || 'Failed to load blog post');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogPost();
//   }, [id]);

//   const handlePublish = async () => {
//     try {
//       const response = await axios.patch(
//         `http://localhost:8000/api/articles/${id}/publish`,
//         {},
//         {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         }
//       );
//       setBlog(response.data);
//     } catch (err) {
//       console.error('Error publishing blog:', err);
//       setError(err.response?.data?.message || err.message || 'Failed to publish blog');
//     }
//   };

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   if (error) {
//     return (
//       <div className="error-message">
//         <h3>Error: {error}</h3>
//         <p>The requested blog post could not be found or you don't have permission to view it.</p>
//         <button onClick={() => navigate('/blog')}>Back to Blog</button>
//       </div>
//     );
//   }

//   if (!blog) {
//     return <Navigate to="/blog" />;
//   }

//   return (
//     <div className="blog-detail-container">
//       <PublishedBlog blog={blog} />
      
//       {/* Only show manage buttons if user is the author */}
//       {blog.userId === localStorage.getItem('userId') && (
//         <div className="editor-actions">
//           <div className="manage-dropdown">
//             <button className="dropdown-toggle">
//               <FaEllipsisV /> Manage
//             </button>
//             <div className="dropdown-menu">
//               <button onClick={() => navigate(`/edit/${blog.id}`)}>
//                 Edit Post
//               </button>
//               <button onClick={handlePublish}>
//                 {blog.status === 'published' ? 'Unpublish' : 'Publish'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogDetail;



// import React, { useState, useEffect } from 'react'; // Added missing imports
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import PublishedBlog from './PublishedBlog';

// const BlogDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBlogPost = async () => {
//       try {
//         console.log(`Fetching article with ID: ${id}`);
//         const response = await axios.get(
//           `http://localhost:8000/api/articles/${id}`,
//           {
//             headers: {
//               'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
//             }
//           }
//         );
        
//         if (response.data) {
//           console.log('Article found:', response.data);
//           setBlog(response.data);
//         } else {
//           console.error('Empty response received');
//           setError('Blog post not found');
//         }
//       } catch (err) {
//         console.error('API Error:', err);
//         if (err.response?.status === 404) {
//           setError('Blog post not found');
//         } else {
//           setError(err.response?.data?.message || 'Failed to load blog post');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogPost();
//   }, [id]);

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   if (error) {
//     return (
//       <div className="error-message">
//         <p>Error: {error}</p>
//         <button onClick={() => navigate('/blog')}>Back to Blog</button>
//       </div>
//     );
//   }

//   return (
//     <div className="blog-detail-container">
//       {blog && <PublishedBlog blog={blog} />}
//     </div>
//   );
// };

// export default BlogDetail;


// import React from 'react';
// import { useParams } from 'react-router-dom';

// const BlogDetail = ({ blogs }) => {
//   const { id } = useParams();
//   const blog = blogs.find(blog => blog.id === id);

//   if (!blog) {
//     return <div>Blog post not found</div>;
//   }

//   return (
//     <div className="blog-detail-container">
//       <h1>{blog.title}</h1>
//       <div dangerouslySetInnerHTML={{ __html: blog.content }} />
//       {blog.media && blog.media.map(mediaItem => (
//         <div key={mediaItem.id}>
//           {mediaItem.type === 'image' ? (
//             <img src={mediaItem.url} alt={mediaItem.caption} />
//           ) : (
//             <iframe src={mediaItem.url} title={mediaItem.caption} />
//           )}
//           <p>{mediaItem.caption}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BlogDetail;



import React from 'react';
import { useParams } from 'react-router-dom';

const BlogDetail = ({ blogs }) => {
  const { slug } = useParams();
  const blog = blogs.find(blog => blog.urlSlug === slug);

  if (!blog) {
    return <div className="not-found">Blog post not found</div>;
  }

  return (
    <div className="blog-detail-container">
      {blog.bannerImage && (
        <div className="blog-banner">
          <img src={blog.bannerImage} alt="Banner" />
        </div>
      )}
      
      <h1 style={{
        fontWeight: blog.titleStyles?.bold ? 'bold' : 'normal',
        fontStyle: blog.titleStyles?.italic ? 'italic' : 'normal',
        textDecoration: blog.titleStyles?.underline ? 'underline' : 'none',
        fontSize: blog.titleStyles?.fontSize ? `${blog.titleStyles.fontSize}px` : '',
        color: blog.titleStyles?.color || '#000000',
        backgroundColor: blog.titleStyles?.backgroundColor || 'transparent',
        textAlign: blog.titleStyles?.align || 'left',
        padding: '10px',
        margin: '20px 0'
      }}>
        {blog.title}
      </h1>
      
      <div className="blog-meta">
        <span>Published: {new Date(blog.date).toLocaleDateString()}</span>
        {blog.lastUpdated && blog.lastUpdated !== blog.date && (
          <span>Updated: {new Date(blog.lastUpdated).toLocaleDateString()}</span>
        )}
      </div>
      
      <div className="blog-content1 text-center" dangerouslySetInnerHTML={{ __html: blog.content }} />
      
      {blog.media && blog.media.length > 0 && (
        <div className="blog-media">
          {blog.media.map(mediaItem => (
            <div key={mediaItem.id} className="media-item" style={{ width: mediaItem.width || '100%' }}>
              {mediaItem.type === 'video' ? (
                <div className="video-container">
                  <iframe 
                    src={mediaItem.url} 
                    title={mediaItem.caption || 'Blog video'}
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="image-container">
                  <img 
                    src={mediaItem.url} 
                    alt={mediaItem.caption || 'Blog image'} 
                  />
                </div>
              )}
              {mediaItem.caption && (
                <p className="media-caption">{mediaItem.caption}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogDetail;