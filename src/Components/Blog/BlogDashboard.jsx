// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import ImageModal from '../ImageModal';

// const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// const BlogDashboard = () => {
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [showImageModal, setShowImageModal] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.get(`${apiBaseUrl}/Components/Blog/blogpost`);
//         setPosts(response.data || []);
//       } catch (err) {
//         console.error('Error fetching posts:', err);
//         setError('Failed to load posts. Please try again.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // URL handling
//   const getProperUrl = (url) => {
//     if (!url) return '';
//     if (url.startsWith('http') || url.startsWith('blob:')) return url;
//     if (url.startsWith('/uploads')) return `${apiBaseUrl}${url}`;
//     return `${apiBaseUrl}/uploads/${url}`;
//   };

//   const handleImageClick = (imageUrl) => {
//     setSelectedImage(imageUrl.startsWith('http') ? imageUrl : `${apiBaseUrl}${imageUrl}`);
//     setShowImageModal(true);
//   };

//   const handleEdit = (postId) => {
//     navigate(`/EditBlog/${postId}`);
//   };

//   const handleDelete = async (postId) => {
//     try {
//       const confirmDelete = window.confirm('Are you sure you want to delete this blog post?');
//       if (!confirmDelete) return;
      
//       await axios.delete(`${apiBaseUrl}/Components/Blog/blogpost/${postId}`);
//       setPosts(posts.filter(post => post._id !== postId));
//       alert('Blog post deleted successfully');
//     } catch (err) {
//       console.error('Error deleting post:', err);
//       alert('Failed to delete blog post');
//     }
//   };

//   const renderTitle = (title, titleStyles = {}) => {
//     const {
//       bold = false,
//       italic = false,
//       underline = false,
//       fontSize = '24',
//       color = '#000000',
//       backgroundColor = '#ffffff',
//       align = 'left',
//     } = titleStyles;

//     return (
//       <h2
//         style={{
//           fontWeight: bold ? 'bold' : 'normal',
//           fontStyle: italic ? 'italic' : 'normal',
//           textDecoration: underline ? 'underline' : 'none',
//           fontSize: `${fontSize}px`,
//           color,
//           backgroundColor,
//           textAlign: align,
//           margin: '15px 0 10px 0',
//           padding: '5px 10px',
//           borderRadius: '4px',
//         }}
//       >
//         {title || 'Untitled'}
//       </h2>
//     );
//   };

//   const renderMediaItem = (item, index) => {
//   if (!item) return null;
  
//   const mediaItem = typeof item === 'string' ? { url: item, type: 'image' } : item;
//   const { url, type, caption } = mediaItem;
//   const mediaUrl = getProperUrl(url);

//   if (type === 'video') {
//     return (
//       <div key={index} style={{ margin: '10px 0' }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//           <span style={{ fontWeight: 'bold' }}>URL:</span>
//           <a 
//             href={mediaUrl} 
//             target="_blank" 
//             rel="noopener noreferrer"
//             style={{
//               color: '#0066cc',
//               textDecoration: 'underline',
//               wordBreak: 'break-all'
//             }}
//           >
//             {mediaUrl}
//           </a>
//         </div>
//         {caption && <p style={{ fontStyle: 'italic', marginTop: '5px', fontSize: '14px' }}>{caption}</p>}
//       </div>
//     );
//   }

//   return (
//     <div key={index} style={{ margin: '10px 0' }}>
//       <img
//         src={mediaUrl}
//         alt={`media-${index}`}
//         style={{ 
//           width: '150px',
//           height: 'auto',
//           maxHeight: '150px',
//           objectFit: 'contain',
//           cursor: 'pointer',
//           border: '1px solid #eee',
//           borderRadius: '4px'
//         }}
//         onClick={() => handleImageClick(mediaUrl)}
//         onError={(e) => {
//           e.target.onerror = null; // Prevent infinite loop
//           e.target.src = ''; // Remove src if image fails to load
//           e.target.style.display = 'none'; // Hide the image
//         }}
//       />
//       {caption && <p style={{ fontStyle: 'italic', marginTop: '5px', fontSize: '14px' }}>{caption}</p>}
//     </div>
//   );
// };

//   const renderMedia = (media) => {
//     if (!Array.isArray(media)) return null;
//     return media.map((item, index) => renderMediaItem(item, index));
//   };

//   if (isLoading) {
//     return (
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         height: '100vh' 
//       }}>
//         <div style={{ 
//           width: '50px', 
//           height: '50px', 
//           border: '5px solid #f3f3f3', 
//           borderTop: '5px solid #3498db', 
//           borderRadius: '50%', 
//           animation: 'spin 1s linear infinite' 
//         }}></div>
//         <style>{`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}</style>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{ 
//         padding: '20px', 
//         textAlign: 'center', 
//         color: '#d32f2f',
//         backgroundColor: '#ffebee',
//         borderRadius: '4px',
//         margin: '20px'
//       }}>
//         <p>{error}</p>
//         <button 
//           onClick={() => window.location.reload()}
//           style={{
//             padding: '8px 16px',
//             backgroundColor: '#1976d2',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             marginTop: '10px'
//           }}
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       padding: '2rem',
//       fontFamily: 'Arial, sans-serif',
//       backgroundColor: '#f9f9f9',
//       minHeight: '100vh',
//     }}>
//       <h1 style={{
//         fontSize: '32px',
//         marginBottom: '20px',
//         textAlign: 'center',
//         color: '#333'
//       }}>Manage All Blogs</h1>

//       {posts.length === 0 ? (
//         <p style={{ textAlign: 'center' }}>No blogs available.</p>
//       ) : (
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
//           gap: '20px',
//         }}>
//           {posts.map((post) => {
//             const postId = post._id || post.id;
//             return (
//               <div key={postId} style={{
//                 backgroundColor: '#fff',
//                 padding: '16px',
//                 borderRadius: '12px',
//                 boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//                 transition: 'transform 0.2s',
//                 display: 'flex',
//                 flexDirection: 'column',
//               }}>
//                 {/* Banner Image Section */}
//                 {post.bannerImage && (
//                   <>
//                     {/* <h3 style={{ 
//                       color: 'black',
//                       fontSize: '16px',
//                       fontWeight: 'bold',
//                       marginBottom: '5px'
//                     }}>Banner Image</h3> */}
//                     <img
//                       src={getProperUrl(post.bannerImage.url || post.bannerImage)}
//                       alt="Banner"
//                       style={{
//                         width: '100%',
//                         height: 'auto',
//                         maxHeight: '200px',
//                         objectFit: 'cover',
//                         borderRadius: '8px',
//                         marginBottom: '15px',
//                         cursor: 'pointer',
//                       }}
//                       onClick={() => handleImageClick(getProperUrl(post.bannerImage.url || post.bannerImage))}
//                     />
//                   </>
//                 )}

//                 {/* Media Files Section */}
//                 {(post.media && post.media.length > 0) && (
//                   <>
//                     <h3 style={{ 
//                       color: 'black',
//                       fontSize: '16px',
//                       fontWeight: 'bold',
//                       marginBottom: '5px'
//                     }}>Media Content</h3>
//                     <div style={{
//                       display: 'flex',
//                       flexWrap: 'wrap',
//                       gap: '10px',
//                     }}>
//                       {renderMedia(post.media)}
//                     </div>
//                   </>
//                 )}

//                 {renderTitle(post.title, post.titleStyles)}

//                 <div
//                   style={{
//                     fontSize: '16px',
//                     color: '#333',
//                     lineHeight: '1.5',
//                     flexGrow: 1,
//                   }}
//                   dangerouslySetInnerHTML={{ __html: post.content || '<p>No content</p>' }}
//                 />

//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'flex-end',
//                   gap: '8px',
//                   marginTop: '15px',
//                   paddingTop: '15px',
//                   borderTop: '1px solid #eee',
//                 }}>
//                   <button 
//                     style={{
//                       padding: '8px 16px',
//                       backgroundColor: '#4CAF50',
//                       color: 'white',
//                       border: 'none',
//                       borderRadius: '4px',
//                       cursor: 'pointer',
//                       fontSize: '14px',
//                       transition: 'background-color 0.3s',
//                     }}
//                     onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
//                     onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
//                     onClick={() => handleEdit(postId)}
//                   >
//                     Edit
//                   </button>
//                   <button 
//                     style={{
//                       padding: '8px 16px',
//                       backgroundColor: '#f44336',
//                       color: 'white',
//                       border: 'none',
//                       borderRadius: '4px',
//                       cursor: 'pointer',
//                       fontSize: '14px',
//                       transition: 'background-color 0.3s',
//                     }}
//                     onMouseOver={(e) => e.target.style.backgroundColor = '#d32f2f'}
//                     onMouseOut={(e) => e.target.style.backgroundColor = '#f44336'}
//                     onClick={() => handleDelete(postId)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {showImageModal && (
//         <ImageModal imageUrl={selectedImage} onClose={() => setShowImageModal(false)} />
//       )}
//     </div>
//   );
// };

// export default BlogDashboard;
































// 30-05-25

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImageModal from '../ImageModal';
import './BlogDashboard.css'; // Include the CSS file

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const BlogDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${apiBaseUrl}/Components/Blog/blogpost`);
        setPosts(response.data || []);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const getProperUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('blob:')) return url;
    if (url.startsWith('/uploads')) return `${apiBaseUrl}${url}`;
    return `${apiBaseUrl}/uploads/${url}`;
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl.startsWith('http') ? imageUrl : `${apiBaseUrl}${imageUrl}`);
    setShowImageModal(true);
  };

  const handleEdit = (postId) => {
    navigate(`/EditBlog/${postId}`);
  };

  const handleDelete = async (postId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this blog post?');
      if (!confirmDelete) return;

      await axios.delete(`${apiBaseUrl}/Components/Blog/blogpost/${postId}`);
      setPosts(posts.filter(post => post._id !== postId));
      alert('Blog post deleted successfully');
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete blog post');
    }
  };

  const renderTitle = (title, titleStyles = {}) => {
    const {
      bold = false,
      italic = false,
      underline = false,
      fontSize = '24',
      color = '#000000',
      backgroundColor = '#ffffff',
      align = 'left',
    } = titleStyles;

    return (
      <h2
        style={{
          fontWeight: bold ? 'bold' : 'normal',
          fontStyle: italic ? 'italic' : 'normal',
          textDecoration: underline ? 'underline' : 'none',
          fontSize: `${fontSize}px`,
          color,
          backgroundColor,
          textAlign: align,
          margin: '15px 0 10px 0',
          padding: '5px 10px',
          borderRadius: '4px',
        }}
      >
        {title || 'Untitled'}
      </h2>
    );
  };

  const renderMediaItem = (item, index) => {
    if (!item) return null;

    const mediaItem = typeof item === 'string' ? { url: item, type: 'image' } : item;
    const { url, type, caption } = mediaItem;
    const mediaUrl = getProperUrl(url);

    if (type === 'video') {
      return (
        <div key={index} className="media-video">
          <div>
            <span className="media-label">URL:</span>
            <a href={mediaUrl} target="_blank" rel="noopener noreferrer" className="media-link">
              {mediaUrl}
            </a>
          </div>
          {caption && <p className="media-caption">{caption}</p>}
        </div>
      );
    }

    return (
      <div key={index} className="media-image-container">
        <img
          src={mediaUrl}
          alt={`media-${index}`}
          className="media-image"
          onClick={() => handleImageClick(mediaUrl)}
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
          }}
        />
        {caption && <p className="media-caption">{caption}</p>}
      </div>
    );
  };

  const renderMedia = (media) => {
    if (!Array.isArray(media)) return null;
    return media.map((item, index) => renderMediaItem(item, index));
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="blog-dashboard-container">
      <h1 className="dashboard-title">Manage All Blogs</h1>

      {posts.length === 0 ? (
        <p className="no-blogs">No blogs available.</p>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => {
            const postId = post._id || post.id;
            return (
              <div key={postId} className="post-card">
                {post.bannerImage && (
                  <img
                    src={getProperUrl(post.bannerImage.url || post.bannerImage)}
                    alt="Banner"
                    className="banner-image"
                    onClick={() =>
                      handleImageClick(getProperUrl(post.bannerImage.url || post.bannerImage))
                    }
                  />
                )}

                {post.media && post.media.length > 0 && (
                  <>
                    <h3 className="media-header">Media Content</h3>
                    <div className="media-container">{renderMedia(post.media)}</div>
                  </>
                )}

                {renderTitle(post.title, post.titleStyles)}

                <div
                  className="post-content"
                  dangerouslySetInnerHTML={{ __html: post.content || '<p>No content</p>' }}
                />

                <div className="actions">
                  <button className="edit-btn" onClick={() => handleEdit(postId)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(postId)}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showImageModal && (
        <ImageModal imageUrl={selectedImage} onClose={() => setShowImageModal(false)} />
      )}
    </div>
  );
};

export default BlogDashboard;





















//sagar

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import ImageModal from '../ImageModal';

// const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// const BlogDashboard = () => {
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [showImageModal, setShowImageModal] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.get(`${apiBaseUrl}/Components/Blog/blogpost`);
//         setPosts(response.data || []);
//       } catch (err) {
//         console.error('Error fetching posts:', err);
//         setError('Failed to load posts. Please try again.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // URL handling
//   const getProperUrl = (url) => {
//     if (!url) return '';
//     if (url.startsWith('http') || url.startsWith('blob:')) return url;
//     if (url.startsWith('/uploads')) return `${apiBaseUrl}${url}`;
//     return `${apiBaseUrl}/uploads/${url}`;
//   };

//   const handleImageClick = (imageUrl) => {
//     setSelectedImage(imageUrl.startsWith('http') ? imageUrl : `${apiBaseUrl}${imageUrl}`);
//     setShowImageModal(true);
//   };

//   const handleEdit = (postId) => {
//     navigate(`/EditBlog/${postId}`);
//   };

//   const handleDelete = async (postId) => {
//     try {
//       const confirmDelete = window.confirm('Are you sure you want to delete this blog post?');
//       if (!confirmDelete) return;
      
//       await axios.delete(`${apiBaseUrl}/Components/Blog/blogpost/${postId}`);
//       setPosts(posts.filter(post => post._id !== postId));
//       alert('Blog post deleted successfully');
//     } catch (err) {
//       console.error('Error deleting post:', err);
//       alert('Failed to delete blog post');
//     }
//   };

//   const renderTitle = (title, titleStyles = {}) => {
//     const {
//       bold = false,
//       italic = false,
//       underline = false,
//       fontSize = '24',
//       color = '#000000',
//       backgroundColor = '#ffffff',
//       align = 'left',
//     } = titleStyles;

//     return (
//       <h2
//         style={{
//           fontWeight: bold ? 'bold' : 'normal',
//           fontStyle: italic ? 'italic' : 'normal',
//           textDecoration: underline ? 'underline' : 'none',
//           fontSize: `${fontSize}px`,
//           color,
//           backgroundColor,
//           textAlign: align,
//           margin: '15px 0 10px 0',
//           padding: '5px 10px',
//           borderRadius: '4px',
//         }}
//       >
//         {title || 'Untitled'}
//       </h2>
//     );
//   };

//   const renderMediaItem = (item, index) => {
//     if (!item) return null;
    
//     // Handle both string media items and object media items
//     const mediaItem = typeof item === 'string' ? { url: item, type: 'image' } : item;
//     const { url, type, caption } = mediaItem;
//     const mediaUrl = getProperUrl(url);

//     if (type === 'video') {
//       return (
//         <div key={index} style={{ margin: '10px 0' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <span style={{ fontWeight: 'bold' }}>URL:</span>
//             <a 
//               href={mediaUrl} 
//               target="_blank" 
//               rel="noopener noreferrer"
//               style={{
//                 color: '#0066cc',
//                 textDecoration: 'underline',
//                 wordBreak: 'break-all'
//               }}
//             >
//               {mediaUrl}
//             </a>
//           </div>
//           {caption && <p style={{ fontStyle: 'italic', marginTop: '5px', fontSize: '14px' }}>{caption}</p>}
//         </div>
//       );
//     }

//     // Default to image if type is not specified or is 'image'
//     return (
//       <div key={index} style={{ margin: '10px 0' }}>
//         <img
//           src={mediaUrl}
//           // alt={`media-${index}`}
//           style={{ 
//             width: '150px', // Smaller fixed width for media images
//             height: 'auto',
//             maxHeight: '150px',
//             objectFit: 'contain',
//             cursor: 'pointer',
//             border: '1px solid #eee',
//             borderRadius: '4px'
//           }}
//           onClick={() => handleImageClick(mediaUrl)}
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = '/placeholder-image.jpg';
//           }}
//         />
//         {caption && <p style={{ fontStyle: 'italic', marginTop: '5px', fontSize: '14px' }}>{caption}</p>}
//       </div>
//     );
//   };

//   const renderMedia = (media) => {
//     if (!Array.isArray(media)) return null;
//     return media.map((item, index) => renderMediaItem(item, index));
//   };

//   if (isLoading) {
//     return (
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         height: '100vh' 
//       }}>
//         <div style={{ 
//           width: '50px', 
//           height: '50px', 
//           border: '5px solid #f3f3f3', 
//           borderTop: '5px solid #3498db', 
//           borderRadius: '50%', 
//           animation: 'spin 1s linear infinite' 
//         }}></div>
//         <style>{`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}</style>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{ 
//         padding: '20px', 
//         textAlign: 'center', 
//         color: '#d32f2f',
//         backgroundColor: '#ffebee',
//         borderRadius: '4px',
//         margin: '20px'
//       }}>
//         <p>{error}</p>
//         <button 
//           onClick={() => window.location.reload()}
//           style={{
//             padding: '8px 16px',
//             backgroundColor: '#1976d2',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             marginTop: '10px'
//           }}
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       padding: '2rem',
//       fontFamily: 'Arial, sans-serif',
//       backgroundColor: '#f9f9f9',
//       minHeight: '100vh',
//     }}>
//       <h1 style={{
//         fontSize: '32px',
//         marginBottom: '20px',
//         textAlign: 'center',
//         color: '#333'
//       }}>Manage All Blogs</h1>

//       {posts.length === 0 ? (
//         <p style={{ textAlign: 'center' }}>No blogs available.</p>
//       ) : (
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
//           gap: '20px',
//         }}>
//           {posts.map((post) => {
//             const postId = post._id || post.id;
//             return (
//               <div key={postId} style={{
//                 backgroundColor: '#fff',
//                 padding: '16px',
//                 borderRadius: '12px',
//                 boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//                 transition: 'transform 0.2s',
//                 display: 'flex',
//                 flexDirection: 'column',
//               }}>
//                 {/* Banner Image Section */}
//                 {post.bannerImage && (
//                   <>
//                     <h3 style={{ 
//                       color: 'black',
//                       fontSize: '16px',
//                       fontWeight: 'bold',
//                       marginBottom: '5px'
//                     }}>Banner Image</h3>
//                     <img
//                       src={getProperUrl(post.bannerImage.url || post.bannerImage)}
//                       alt="Banner"
//                       style={{
//                         width: '100%',
//                         height: 'auto',
//                         maxHeight: '200px',
//                         objectFit: 'cover',
//                         borderRadius: '8px',
//                         marginBottom: '15px',
//                         cursor: 'pointer',
//                       }}
//                       onClick={() => handleImageClick(getProperUrl(post.bannerImage.url || post.bannerImage))}
//                     />
//                   </>
//                 )}

//                 {/* Media Files Section */}
//                 {(post.media && post.media.length > 0) && (
//                   <>
//                     <h3 style={{ 
//                       color: 'black',
//                       fontSize: '16px',
//                       fontWeight: 'bold',
//                       marginBottom: '5px'
//                     }}>Media Content</h3>
//                     <div style={{
//                       display: 'flex',
//                       flexWrap: 'wrap',
//                       gap: '10px',
//                     }}>
//                       {renderMedia(post.media)}
//                     </div>
//                   </>
//                 )}

//                 {renderTitle(post.title, post.titleStyles)}

//                 <div
//                   style={{
//                     fontSize: '16px',
//                     color: '#333',
//                     lineHeight: '1.5',
//                     flexGrow: 1,
//                   }}
//                   dangerouslySetInnerHTML={{ __html: post.content || '<p>No content</p>' }}
//                 />

//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'flex-end',
//                   gap: '8px',
//                   marginTop: '15px',
//                   paddingTop: '15px',
//                   borderTop: '1px solid #eee',
//                 }}>
//                   <button 
//                     style={{
//                       padding: '8px 16px',
//                       backgroundColor: '#4CAF50',
//                       color: 'white',
//                       border: 'none',
//                       borderRadius: '4px',
//                       cursor: 'pointer',
//                       fontSize: '14px',
//                       transition: 'background-color 0.3s',
//                     }}
//                     onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
//                     onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
//                     onClick={() => handleEdit(postId)}
//                   >
//                     Edit
//                   </button>
//                   <button 
//                     style={{
//                       padding: '8px 16px',
//                       backgroundColor: '#f44336',
//                       color: 'white',
//                       border: 'none',
//                       borderRadius: '4px',
//                       cursor: 'pointer',
//                       fontSize: '14px',
//                       transition: 'background-color 0.3s',
//                     }}
//                     onMouseOver={(e) => e.target.style.backgroundColor = '#d32f2f'}
//                     onMouseOut={(e) => e.target.style.backgroundColor = '#f44336'}
//                     onClick={() => handleDelete(postId)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {showImageModal && (
//         <ImageModal imageUrl={selectedImage} onClose={() => setShowImageModal(false)} />
//       )}
//     </div>
//   );
// };

// export default BlogDashboard;








































  