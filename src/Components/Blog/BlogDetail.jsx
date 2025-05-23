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



// import React from 'react';
// import { useParams } from 'react-router-dom';

// const BlogDetail = ({ blogs }) => {
//   const { slug } = useParams();
//   const blog = blogs.find(blog => blog.urlSlug === slug);

//   if (!blog) {
//     return <div className="not-found">Blog post not found</div>;
//   }

//   return (
//     <div className="blog-detail-container">
//       {blog.bannerImage && (
//         <div className="blog-banner">
//           <img src={blog.bannerImage} alt="Banner" />
//         </div>
//       )}
      
//       <h1 style={{
//         fontWeight: blog.titleStyles?.bold ? 'bold' : 'normal',
//         fontStyle: blog.titleStyles?.italic ? 'italic' : 'normal',
//         textDecoration: blog.titleStyles?.underline ? 'underline' : 'none',
//         fontSize: blog.titleStyles?.fontSize ? `${blog.titleStyles.fontSize}px` : '',
//         color: blog.titleStyles?.color || '#000000',
//         backgroundColor: blog.titleStyles?.backgroundColor || 'transparent',
//         textAlign: blog.titleStyles?.align || 'left',
//         padding: '10px',
//         margin: '20px 0'
//       }}>
//         {blog.title}
//       </h1>
      
//       <div className="blog-meta">
//         <span>Published: {new Date(blog.date).toLocaleDateString()}</span>
//         {blog.lastUpdated && blog.lastUpdated !== blog.date && (
//           <span>Updated: {new Date(blog.lastUpdated).toLocaleDateString()}</span>
//         )}
//       </div>
      
//       <div className="blog-content1 text-center" dangerouslySetInnerHTML={{ __html: blog.content }} />
      
//       {blog.media && blog.media.length > 0 && (
//         <div className="blog-media">
//           {blog.media.map(mediaItem => (
//             <div key={mediaItem.id} className="media-item" style={{ width: mediaItem.width || '100%' }}>
//               {mediaItem.type === 'video' ? (
//                 <div className="video-container">
//                   <iframe 
//                     src={mediaItem.url} 
//                     title={mediaItem.caption || 'Blog video'}
//                     frameBorder="0"
//                     allowFullScreen
//                   />
//                 </div>
//               ) : (
//                 <div className="image-container">
//                   <img 
//                     src={mediaItem.url} 
//                     alt={mediaItem.caption || 'Blog image'} 
//                   />
//                 </div>
//               )}
//               {mediaItem.caption && (
//                 <p className="media-caption">{mediaItem.caption}</p>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogDetail;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import ImageModal from '../ImageModal';

// const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// const BlogDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [post, setPost] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [showImageModal, setShowImageModal] = useState(false);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.get(`${apiBaseUrl}/Components/Blog/blogpost/${id}`);
//         setPost(response.data);
//       } catch (err) {
//         console.error('Error fetching post:', err);
//         setError('Failed to load post. Please try again.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPost();
//   }, [id]);

//   const getProperImageUrl = (url) => {
//     if (!url) return '';
//     if (url.startsWith('http') || url.startsWith('blob:')) return url;
//     if (url.startsWith('/uploads')) return `${apiBaseUrl}${url}`;
//     return `${apiBaseUrl}/uploads/${url}`;
//   };

//   const handleImageClick = (imageUrl) => {
//     setSelectedImage(imageUrl.startsWith('http') ? imageUrl : `${apiBaseUrl}${imageUrl}`);
//     setShowImageModal(true);
//   };

//   const renderTitle = (title, titleStyles = {}) => {
//     const {
//       bold = false,
//       italic = false,
//       underline = false,
//       fontSize = '32',
//       color = '#000000',
//       backgroundColor = '#ffffff',
//       align = 'left',
//     } = titleStyles;

//     return (
//       <h1
//         style={{
//           fontWeight: bold ? 'bold' : 'normal',
//           fontStyle: italic ? 'italic' : 'normal',
//           textDecoration: underline ? 'underline' : 'none',
//           fontSize: `${fontSize}px`,
//           color,
//           backgroundColor,
//           textAlign: align,
//           margin: '20px 0',
//           padding: '10px',
//           borderRadius: '4px',
//         }}
//       >
//         {title || 'Untitled'}
//       </h1>
//     );
//   };

//   if (isLoading) {
//     return (
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh'
//       }}>
//         <div className="loading-spinner">
//           <div className="spinner"></div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{
//         padding: '2rem',
//         textAlign: 'center'
//       }}>
//         <p style={{ color: 'red' }}>{error}</p>
//         <button 
//           onClick={() => window.location.reload()}
//           style={{
//             padding: '8px 16px',
//             backgroundColor: '#f44336',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer'
//           }}
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   if (!post) {
//     return (
//       <div style={{
//         padding: '2rem',
//         textAlign: 'center'
//       }}>
//         <p>Blog post not found</p>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       maxWidth: '1200px',
//       margin: '0 auto',
//       padding: '2rem',
//       fontFamily: 'Arial, sans-serif',
//       backgroundColor: '#f9f9f9',
//       minHeight: '100vh'
//     }}>
//       <button 
//         onClick={() => navigate(-1)}
//         style={{
//           background: 'none',
//           border: 'none',
//           color: '#2196F3',
//           fontSize: '1rem',
//           cursor: 'pointer',
//           marginBottom: '1rem',
//           padding: '0.5rem 1rem',
//           borderRadius: '4px',
//           ':hover': {
//             textDecoration: 'underline'
//           }
//         }}
//       >
//         &larr; Back to Blogs
//       </button>

//       {post.bannerImage && (
//         <img
//           src={getProperImageUrl(post.bannerImage.url || post.bannerImage)}
//           alt="Banner"
//           style={{
//             width: '100%',
//             maxHeight: '400px',
//             objectFit: 'cover',
//             borderRadius: '8px',
//             marginBottom: '2rem',
//             cursor: 'pointer'
//           }}
//           onClick={() => handleImageClick(getProperImageUrl(post.bannerImage.url || post.bannerImage))}
//         />
//       )}

//       {renderTitle(post.title, post.titleStyles)}

//       <div 
//         style={{
//           fontSize: '18px',
//           lineHeight: '1.6',
//           color: '#333',
//           marginBottom: '2rem'
//         }}
//         dangerouslySetInnerHTML={{ __html: post.content || '<p>No content</p>' }} 
//       />

//       {Array.isArray(post.media) && post.media.length > 0 && (
//         <div style={{ marginBottom: '2rem' }}>
//           <h3 style={{ marginBottom: '1rem' }}>Media Gallery</h3>
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
//             gap: '1rem'
//           }}>
//             {post.media.map((file, index) => {
//               const fileUrl = typeof file === 'string' ? file : file?.url || '';
//               return isImageFile(fileUrl) ? (
//                 <div key={index} style={{ width: '100%' }}>
//                   <img
//                     src={getProperImageUrl(fileUrl)}
//                     alt={`Media ${index}`}
//                     style={{
//                       width: '100%',
//                       height: '200px',
//                       objectFit: 'cover',
//                       borderRadius: '6px',
//                       cursor: 'pointer'
//                     }}
//                     onClick={() => handleImageClick(getProperImageUrl(fileUrl))}
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = '/placeholder-image.jpg';
//                     }}
//                   />
//                 </div>
//               ) : null;
//             })}
//           </div>
//         </div>
//       )}

//       {showImageModal && (
//         <ImageModal 
//           imageUrl={selectedImage} 
//           onClose={() => setShowImageModal(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default BlogDetail;












// BlogDetails.jsx
// BlogPost.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ImageModal from '../ImageModal';
import './BlogPost.css';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        
        // Check for valid ID param
        if (!id) {
          setError('No blog post ID provided. Please select a post.');
          setPost(null);
          setIsLoading(false);
          return;
        }

        const response = await axios.get(`${apiBaseUrl}/Components/Blog/blogpost/${id}`);

        if (!response.data) {
          throw new Error('Blog post not found');
        }

        setPost(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load post. Please try again.');
        setPost(null);
        
        // Redirect to blog list if post not found (404)
        if (err.response?.status === 404 || err.message === 'Blog post not found') {
          navigate('/blog', { replace: true });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const getProperImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('blob:')) return url;
    if (url.startsWith('/uploads')) return `${apiBaseUrl}${url}`;
    return `${apiBaseUrl}/uploads/${url}`;
  };

  const isImageFile = (filename) => {
    if (typeof filename !== 'string') return false;
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    return imageExtensions.some((ext) => filename.toLowerCase().endsWith(ext));
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl.startsWith('http') ? imageUrl : `${apiBaseUrl}${imageUrl}`);
    setShowImageModal(true);
  };

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading blog post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="retry-button"
        >
          Retry
        </button>
        <button 
          onClick={() => navigate('/blog')} 
          className="back-button"
        >
          Back to Blog List
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="not-found">
        <p>Post not found</p>
        <button 
          onClick={() => navigate('/blog')} 
          className="back-button"
        >
          Back to Blog List
        </button>
      </div>
    );
  }

  return (
    <div className="blog-detail-container">
      {post.bannerImage && (
        <img
          src={getProperImageUrl(post.bannerImage.url || post.bannerImage)}
          alt="Banner"
          className="banner-image"
          onClick={() => handleImageClick(getProperImageUrl(post.bannerImage.url || post.bannerImage))}
        />
      )}

      <h1 className="blog-title">{post.title || 'Untitled'}</h1>

      <div className="blog-meta">
        {post.createdAt && (
          <span className="post-date">
            Published on: {new Date(post.createdAt).toLocaleDateString()}
          </span>
        )}
        {post.updatedAt && post.updatedAt !== post.createdAt && (
          <span className="post-date">
            | Last updated: {new Date(post.updatedAt).toLocaleDateString()}
          </span>
        )}
      </div>

      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: post.content || '<p>No content</p>' }}
      />

      {Array.isArray(post.media) && post.media.length > 0 && (
        <div className="media-gallery">
          <h3>Media Gallery</h3>
          <div className="media-grid">
            {post.media.map((file, index) => {
              const fileUrl = typeof file === 'string' ? file : file?.url || '';
              return isImageFile(fileUrl) ? (
                <div key={index} className="media-item">
                  <img
                    src={getProperImageUrl(fileUrl)}
                    alt={`Media ${index}`}
                    className="media-image"
                    onClick={() => handleImageClick(getProperImageUrl(fileUrl))}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
                  {file.caption && <p className="media-caption">{file.caption}</p>}
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}

      {showImageModal && (
        <ImageModal
          imageUrl={selectedImage}
          onClose={() => setShowImageModal(false)}
        />
      )}
    </div>
  );
};

export default BlogDetail;
