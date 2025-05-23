import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImageModal from '../ImageModal';

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

  // URL handling
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
      <div key={index} style={{ margin: '10px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 'bold' }}>URL:</span>
          <a 
            href={mediaUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              color: '#0066cc',
              textDecoration: 'underline',
              wordBreak: 'break-all'
            }}
          >
            {mediaUrl}
          </a>
        </div>
        {caption && <p style={{ fontStyle: 'italic', marginTop: '5px', fontSize: '14px' }}>{caption}</p>}
      </div>
    );
  }

  return (
    <div key={index} style={{ margin: '10px 0' }}>
      <img
        src={mediaUrl}
        alt={`media-${index}`}
        style={{ 
          width: '150px',
          height: 'auto',
          maxHeight: '150px',
          objectFit: 'contain',
          cursor: 'pointer',
          border: '1px solid #eee',
          borderRadius: '4px'
        }}
        onClick={() => handleImageClick(mediaUrl)}
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop
          e.target.src = ''; // Remove src if image fails to load
          e.target.style.display = 'none'; // Hide the image
        }}
      />
      {caption && <p style={{ fontStyle: 'italic', marginTop: '5px', fontSize: '14px' }}>{caption}</p>}
    </div>
  );
};

  const renderMedia = (media) => {
    if (!Array.isArray(media)) return null;
    return media.map((item, index) => renderMediaItem(item, index));
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div style={{ 
          width: '50px', 
          height: '50px', 
          border: '5px solid #f3f3f3', 
          borderTop: '5px solid #3498db', 
          borderRadius: '50%', 
          animation: 'spin 1s linear infinite' 
        }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center', 
        color: '#d32f2f',
        backgroundColor: '#ffebee',
        borderRadius: '4px',
        margin: '20px'
      }}>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh',
    }}>
      <h1 style={{
        fontSize: '32px',
        marginBottom: '20px',
        textAlign: 'center',
        color: '#333'
      }}>Manage All Blogs</h1>

      {posts.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No blogs available.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '20px',
        }}>
          {posts.map((post) => {
            const postId = post._id || post.id;
            return (
              <div key={postId} style={{
                backgroundColor: '#fff',
                padding: '16px',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
                display: 'flex',
                flexDirection: 'column',
              }}>
                {/* Banner Image Section */}
                {post.bannerImage && (
                  <>
                    {/* <h3 style={{ 
                      color: 'black',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      marginBottom: '5px'
                    }}>Banner Image</h3> */}
                    <img
                      src={getProperUrl(post.bannerImage.url || post.bannerImage)}
                      alt="Banner"
                      style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '200px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        marginBottom: '15px',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleImageClick(getProperUrl(post.bannerImage.url || post.bannerImage))}
                    />
                  </>
                )}

                {/* Media Files Section */}
                {(post.media && post.media.length > 0) && (
                  <>
                    <h3 style={{ 
                      color: 'black',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      marginBottom: '5px'
                    }}>Media Content</h3>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '10px',
                    }}>
                      {renderMedia(post.media)}
                    </div>
                  </>
                )}

                {renderTitle(post.title, post.titleStyles)}

                <div
                  style={{
                    fontSize: '16px',
                    color: '#333',
                    lineHeight: '1.5',
                    flexGrow: 1,
                  }}
                  dangerouslySetInnerHTML={{ __html: post.content || '<p>No content</p>' }}
                />

                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '8px',
                  marginTop: '15px',
                  paddingTop: '15px',
                  borderTop: '1px solid #eee',
                }}>
                  <button 
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'background-color 0.3s',
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
                    onClick={() => handleEdit(postId)}
                  >
                    Edit
                  </button>
                  <button 
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'background-color 0.3s',
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#d32f2f'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#f44336'}
                    onClick={() => handleDelete(postId)}
                  >
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

//   // Banner Image handling
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

//   const renderMedia = (media) => {
//     if (!Array.isArray(media)) return null;

//     return media.map((item, index) => {
//       if (!item) return null;
      
//       // Handle both string media items and object media items
//       const mediaItem = typeof item === 'string' ? { url: item, type: 'image' } : item;
//       const { url, type, caption, width = '100%' } = mediaItem;
//       const mediaUrl = getProperImageUrl(url);

//       if (type === 'video') {
//         return (
//           <div key={index} style={{ margin: '10px 0', width }}>
//             <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
//               <iframe
//                 src={mediaUrl}
//                 title={`video-${index}`}
//                 style={{
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   width: '100%',
//                   height: '100%',
//                   border: 'none'
//                 }}
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               />
//             </div>
//             {caption && <p style={{ textAlign: 'center', fontStyle: 'italic', marginTop: '5px' }}>{caption}</p>}
//           </div>
//         );
//       }

//       // Default to image if type is not specified or is 'image'
//       return (
//         <div key={index} style={{ margin: '10px 0', width }}>
//           <img
//             src={mediaUrl}
//             alt={`media-${index}`}
//             style={{ 
//               width: '100%', 
//               maxHeight: '300px', 
//               objectFit: 'contain',
//               cursor: 'pointer',
//               border: '1px solid #eee',
//               borderRadius: '4px'
//             }}
//             onClick={() => handleImageClick(mediaUrl)}
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = '/placeholder-image.jpg';
//             }}
//           />
//           {caption && <p style={{ textAlign: 'center', fontStyle: 'italic', marginTop: '5px' }}>{caption}</p>}
//         </div>
//       );
//     });
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
//                       src={getProperImageUrl(post.bannerImage.url || post.bannerImage)}
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
//                       onClick={() => handleImageClick(getProperImageUrl(post.bannerImage.url || post.bannerImage))}
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
//                     {renderMedia(post.media)}
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

//   // Banner Image handling
//   const getProperImageUrl = (url) => {
//     if (!url) return '';
//     if (url.startsWith('http') || url.startsWith('blob:')) return url;
//     if (url.startsWith('/uploads')) return `${apiBaseUrl}${url}`;
//     return `${apiBaseUrl}/uploads/${url}`;
//   };

//   // Media files handling
//   const isImageFile = (filename) => {
//     if (typeof filename !== 'string') return false;
//     const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
//     return imageExtensions.some((ext) => filename.toLowerCase().endsWith(ext));
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

//   if (isLoading) {
//     return (
//       <div className="loading-spinner">
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="error-message">
//         <p>{error}</p>
//         <button onClick={() => window.location.reload()}>Retry</button>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.pageTitle}>Manage All Blogs</h1>

//       {posts.length === 0 ? (
//         <p>No blogs available.</p>
//       ) : (
//         <div style={styles.grid}>
//           {posts.map((post) => {
//             const postId = post._id || post.id;
//             return (
//               <div key={postId} style={styles.card}>
//                 {/* Banner Image Section */}
//                 <h3 style={{color: "black",fontSize:'20px',fontWeight:'bold'}}>Banner Image</h3>
//                 {post.bannerImage && (
//                   <img
//                     src={getProperImageUrl(post.bannerImage.url || post.bannerImage)}
//                     alt="Banner"
//                     style={styles.bannerImage}
//                     onClick={() => handleImageClick(getProperImageUrl(post.bannerImage.url || post.bannerImage))}
//                   />
//                 )}

//                 {/* Media Files Section */}
//                 {Array.isArray(post.media) && post.media.length > 0 && (
//                   <div style={styles.mediaContainer}>
//                     <div style={styles.mediaGrid}>
//                       {post.media.map((file, index) => {
//                         const fileUrl = typeof file === 'string' ? file : file?.url || '';
//                         return isImageFile(fileUrl) ? (
//                           <div key={index} style={styles.mediaItem}>
//                             <h3 style={{color: "black",fontSize:'20px'}}>Media</h3>
//                             <img
//                               src={getProperImageUrl(fileUrl)}
//                               alt={`Media ${index}`}
//                               style={styles.mediaImage}
//                               onClick={() => handleImageClick(getProperImageUrl(fileUrl))}
//                               onError={(e) => {
//                                 e.target.onerror = null;
//                                 e.target.src = '/placeholder-image.jpg';
//                               }}
//                             />
//                           </div>
//                         ) : null;
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {renderTitle(post.title, post.titleStyles)}

//                 <div
//                   style={styles.content}
//                   dangerouslySetInnerHTML={{ __html: post.content || '<p>No content</p>' }}
//                 />

//                 <div style={styles.actionButtons}>
//                   <button 
//                     style={styles.editButton}
//                     onClick={() => handleEdit(postId)}
//                   >
//                     Edit
//                   </button>
//                   <button 
//                     style={styles.deleteButton}
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

// const styles = {
//   container: {
//     padding: '2rem',
//     fontFamily: 'Arial, sans-serif',
//     backgroundColor: '#f9f9f9',
//     minHeight: '100vh',
//   },
//   pageTitle: {
//     fontSize: '32px',
//     marginBottom: '20px',
//     textAlign: 'center',
//   },
//   grid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
//     gap: '20px',
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: '16px',
//     borderRadius: '12px',
//     boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//     transition: 'transform 0.2s',
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   bannerImage: {
//     width: '100%',
//     height: 'auto',
//     maxHeight: '200px',
//     objectFit: 'cover',
//     borderRadius: '8px',
//     marginBottom: '15px',
//     cursor: 'pointer',
//   },
//   mediaContainer: {
//     marginBottom: '15px',
//   },
//   mediaGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
//     gap: '10px',
//   },
//   mediaItem: {
//     width: '100%',
//   },
//   mediaImage: {
//     width: '100%',
//     height: '80px',
//     objectFit: 'cover',
//     cursor: 'pointer',
//     borderRadius: '6px',
//     border: '1px solid #eee',
//   },
//   content: {
//     fontSize: '16px',
//     color: '#333',
//     lineHeight: '1.5',
//     flexGrow: 1,
//   },
//   actionButtons: {
//     display: 'flex',
//     justifyContent: 'flex-end',
//     gap: '8px',
//     marginTop: '15px',
//     paddingTop: '15px',
//     borderTop: '1px solid #eee',
//   },
//   editButton: {
//     padding: '8px 16px',
//     backgroundColor: '#4CAF50',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     fontSize: '14px',
//     transition: 'background-color 0.3s',
//     ':hover': {
//       backgroundColor: '#45a049',
//     },
//   },
//   deleteButton: {
//     padding: '8px 16px',
//     backgroundColor: '#f44336',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     fontSize: '14px',
//     transition: 'background-color 0.3s',
//     ':hover': {
//       backgroundColor: '#d32f2f',
//     },
//   },
// };

// export default BlogDashboard;


















































// ss 

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

//   const getProperImageUrl = (url) => {
//     if (!url) return '';
//     if (url.startsWith('http') || url.startsWith('blob:')) return url;
//     if (url.startsWith('/uploads')) return `${apiBaseUrl}${url}`;
//     if (url.startsWith('file://')) return `${apiBaseUrl}/uploads/${path.basename(url)}`;
//     return `${apiBaseUrl}/uploads/${url}`;
//   };

//   const isImageFile = (filename) => {
//     if (typeof filename !== 'string') return false;
//     const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
//     return imageExtensions.some((ext) => filename.toLowerCase().endsWith(ext));
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
      
//       const response=await axios.delete(`${apiBaseUrl}/Components/Blog/blogpost/${postId}`);
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
//           marginBottom: '10px',
//           padding: '5px 10px',
//           borderRadius: '4px',
//         }}
//       >
//         {title || 'Untitled'}
//       </h2>
//     );
//   };

//   if (isLoading) {
//     return (
//       <div className="loading-spinner">
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="error-message">
//         <p>{error}</p>
//         <button onClick={() => window.location.reload()}>Retry</button>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.pageTitle}>Manage All Blogs</h1>

//       {posts.length === 0 ? (
//         <p>No blogs available.</p>
//       ) : (
//         <div style={styles.grid}>
//           {posts.map((post) => {
//             const postId = post._id || post.id;
//             return (
//               <div key={postId} style={styles.card}>
//                 {renderTitle(post.title, post.titleStyles)}

//                 <div
//                   style={styles.content}
//                   dangerouslySetInnerHTML={{ __html: post.content || '<p>No content</p>' }}
//                 />

//                 {post.bannerImage && (
//                   <img
//                     src={getProperImageUrl(post.bannerImage.url || post.bannerImage)}
//                     alt="Banner"
//                     style={styles.bannerImage}
//                     onClick={() => handleImageClick(getProperImageUrl(post.bannerImage.url || post.bannerImage))}
//                   />
//                 )}

//                 {Array.isArray(post.media) && post.media.length > 0 && (
//                   <div>
//                     <h4 style={{ marginTop: '10px' }}>Media:</h4>
//                     <div style={styles.mediaGrid}>
//                       {post.media.map((file, index) => {
//                         const fileUrl = typeof file === 'string' ? file : file?.url || '';
//                         return (
//                           <div key={index} style={styles.mediaItem}>
//                             {isImageFile(fileUrl) ? (
//                               <img
//                                 src={getProperImageUrl(fileUrl)}
//                                 alt={`Media ${index}`}
//                                 style={styles.mediaImage}
//                                 onClick={() => handleImageClick(getProperImageUrl(fileUrl))}
//                                 onError={(e) => {
//                                   e.target.onerror = null;
//                                   e.target.src = '/placeholder-image.jpg';
//                                 }}
//                               />
//                             ) : (
//                               <a href={fileUrl} target="_blank" rel="noopener noreferrer">
//                                 {fileUrl.split('/').pop() || 'Download'}
//                               </a>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {/* Moved action buttons to the bottom of the card */}
//                 <div style={styles.actionButtons}>
//                   <button 
//                     style={styles.editButton}
//                     onClick={() => handleEdit(postId)}
//                   >
//                     Edit
//                   </button>
//                   <button 
//                     style={styles.deleteButton}
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

// const styles = {
//   container: {
//     padding: '2rem',
//     fontFamily: 'Arial, sans-serif',
//     backgroundColor: '#f9f9f9',
//     minHeight: '100vh',
//   },
//   pageTitle: {
//     fontSize: '32px',
//     marginBottom: '20px',
//     textAlign: 'center',
//   },
//   grid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
//     gap: '20px',
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: '16px',
//     borderRadius: '12px',
//     boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//     transition: 'transform 0.2s',
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   content: {
//     fontSize: '16px',
//     color: '#333',
//     marginTop: '10px',
//     lineHeight: '1.5',
//     flexGrow: 1,
//   },
//   bannerImage: {
//     width: '100%',
//     height: 'auto',
//     borderRadius: '8px',
//     marginTop: '12px',
//     cursor: 'pointer',
//   },
//   mediaGrid: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '10px',
//     marginTop: '10px',
//   },
//   mediaItem: {
//     width: '100px',
//     textAlign: 'center',
//   },
//   mediaImage: {
//     width: '100%',
//     height: 'auto',
//     cursor: 'pointer',
//     borderRadius: '6px',
//   },
//   actionButtons: {
//     display: 'flex',
//     justifyContent: 'flex-end',
//     gap: '8px',
//     marginTop: '15px',
//     paddingTop: '15px',
//     borderTop: '1px solid #eee',
//   },
//   editButton: {
//     padding: '8px 16px',
//     backgroundColor: '#4CAF50',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     fontSize: '14px',
//     transition: 'background-color 0.3s',
//     ':hover': {
//       backgroundColor: '#45a049',
//     },
//   },
//   deleteButton: {
//     padding: '8px 16px',
//     backgroundColor: '#f44336',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     fontSize: '14px',
//     transition: 'background-color 0.3s',
//     ':hover': {
//       backgroundColor: '#d32f2f',
//     },
//   },
// };

// export default BlogDashboard;