// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const categories = ['Products', 'Services'];
// const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// const CategoryPage = () => {
//   const [allPosts, setAllPosts] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAllPosts = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);
//         const result = {};

//         // Initialize all categories with empty arrays
//         categories.forEach(category => {
//           result[category] = [];
//         });

//         // Fetch all posts at once
//         try {
//           const response = await axios.get(`${apiBaseUrl}/api/posts`);
//           const allPostsData = response.data?.posts || [];
          
//           // Organize posts by category
//           categories.forEach(category => {
//             result[category] = allPostsData.filter(post => 
//               post.category?.toLowerCase() === category.toLowerCase()
//             );
//           });
//         } catch (err) {
//           console.error('Error fetching posts:', err);
//           setError('Failed to load posts. Please try again.');
//         }

//         setAllPosts(result);
//       } catch (err) {
//         console.error('Unexpected error:', err);
//         setError('An unexpected error occurred. Please try again.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAllPosts();
//   }, [apiBaseUrl]);

//   const handleDelete = async (postId) => {
//     if (!window.confirm('Are you sure you want to delete this post?')) return;

//     try {
//       const response = await axios.delete(`${apiBaseUrl}/api/posts/${postId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
      
//       if (response.data.success) {
//         setAllPosts(prev => {
//           const updated = { ...prev };
//           for (const category in updated) {
//             updated[category] = updated[category].filter(post => post.id !== postId);
//           }
//           return updated;
//         });
//       }
//     } catch (err) {
//       alert(err.response?.data?.error || 'Delete failed');
//     }
//   };

//   const getFileNameFromUrl = (fileUrl) => {
//     if (!fileUrl) return 'No file';
//     try {
//       const url = new URL(fileUrl, apiBaseUrl);
//       return decodeURIComponent(url.pathname.split('/').pop()) || 'Download';
//     } catch {
//       return fileUrl.split('/').pop() || 'Download';
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'No date';
//     try {
//       return new Date(dateString).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       });
//     } catch {
//       return dateString;
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-4xl mx-auto p-4">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <p>{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="category-page-container">
//       <div className="category-header">
//         <h1 className="category-title">All Products & Services</h1>
//         <button 
//           onClick={() => navigate('/BlogPage')}
//           className="add-post-btn"
//         >
//           <i className="fas fa-plus"></i> Add New Product
//         </button>
//       </div>

//       {categories.map(category => (
//         <section key={category} className="category-section">
//           <h2 className="category-subtitle">
//             {category.charAt(0).toUpperCase() + category.slice(1)}
//           </h2>
          
//           {!Array.isArray(allPosts[category]) || allPosts[category].length === 0 ? (
//             <p className="no-posts-message">No products in this category yet.</p>
//           ) : (
//             <div className="posts-grid">
//               {allPosts[category].map(post => (
//                 <div key={post.id} className="post-card">
//                   <div className="card-header">
//                     <h3 className="post-title">{post.title || 'Untitled Product'}</h3>
//                     <span className="post-date">{formatDate(post.createdAt)}</span>
//                   </div>
                  
//                   <div className="card-body">
//                     <p className="post-content">{post.content || 'No description available'}</p>

//                     {post.attachments?.length > 0 && (
//                       <div className="post-attachments">
//                         <h4 className="attachments-title">Files:</h4>
//                         <ul className="attachments-list">
//                           {post.attachments.map((fileUrl, index) => (
//                             <li key={index}>
//                               <a
//                                 href={fileUrl.startsWith('http') ? fileUrl : `${apiBaseUrl}${fileUrl}`}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="attachment-link"
//                               >
//                                 <i className="fas fa-file-alt"></i> {getFileNameFromUrl(fileUrl)}
//                               </a>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </div>

//                   <div className="card-footer">
//                     <button
//                       // onClick={() => navigate(`/BlogPage/${post.id}`)}
//                       onClick={() => navigate(`/BlogPage`)}

//                       className="action-btn edit-btn"
//                     >
//                       <i className="fas fa-edit"></i> Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(post.id)}
//                       className="action-btn delete-btn"
//                     >
//                       <i className="fas fa-trash"></i> Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>
//       ))}
//     </div>
//   );
// };

// export default CategoryPage;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImageModal from './ImageModal'; // We'll create this component

const categories = ['Products', 'Services'];
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const CategoryPage = () => {
  const [allPosts, setAllPosts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = {};

        // Initialize all categories with empty arrays
        categories.forEach(category => {
          result[category] = [];
        });

        // Fetch all posts at once
        try {
          const response = await axios.get(`${apiBaseUrl}/api/posts`);
          const allPostsData = response.data?.posts || [];
          
          // Organize posts by category
          categories.forEach(category => {
            result[category] = allPostsData.filter(post => 
              post.category?.toLowerCase() === category.toLowerCase()
            );
          });
        } catch (err) {
          console.error('Error fetching posts:', err);
          setError('Failed to load posts. Please try again.');
        }

        setAllPosts(result);
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllPosts();
  }, [apiBaseUrl]);

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await axios.delete(`${apiBaseUrl}/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        setAllPosts(prev => {
          const updated = { ...prev };
          for (const category in updated) {
            updated[category] = updated[category].filter(post => post.id !== postId);
          }
          return updated;
        });
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Delete failed');
    }
  };

  const getFileNameFromUrl = (fileUrl) => {
    if (!fileUrl) return 'No file';
    try {
      const url = new URL(fileUrl, apiBaseUrl);
      return decodeURIComponent(url.pathname.split('/').pop()) || 'Download';
    } catch {
      return fileUrl.split('/').pop() || 'Download';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const isImageFile = (filename) => {
    if (!filename) return false;
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl.startsWith('http') ? imageUrl : `${apiBaseUrl}${imageUrl}`);
    setShowImageModal(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="category-page-container">
        <h1 className="category-title">All Products & Services</h1>

      <div className="category-header">
        {/* <button 
          onClick={() => navigate('/BlogPage')}
          className="add-post-btn"
        >
          <i className="fas fa-plus"></i> Add New Product
        </button> */}
      </div>

      {categories.map(category => (
        <section key={category} className="category-section">
          <h2 className="category-subtitle">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h2>
          
          {!Array.isArray(allPosts[category]) || allPosts[category].length === 0 ? (
            <p className="no-posts-message">No products in this category yet.</p>
          ) : (
            <div className="posts-grid">
              {allPosts[category].map(post => (
                <div key={post.id} className="post-card">
               
                  
                  <div className="card-body">

                    {post.attachments?.length > 0 && (
                      <div className="post-attachments">
                        <h4 className="attachments-title">Files:</h4>
                        <ul className="attachments-list">
                          {post.attachments.map((fileUrl, index) => {
                            const filename = getFileNameFromUrl(fileUrl);
                            const fullUrl = fileUrl.startsWith('http') ? fileUrl : `${apiBaseUrl}${fileUrl}`;
                            
                            return (
                              <li key={index}>
                                {isImageFile(filename) ? (
                                  <div className="image-attachment">
                                    <img
                                      src={fullUrl}
                                      alt={filename}
                                      className="thumbnail-image"
                                      onClick={() => handleImageClick(fileUrl)}
                                    />
                                    {/* <span className="image-filename">{filename}</span> */}
                                  </div>
                                ) : (
                                  <a
                                    href={fullUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="attachment-link"
                                  >
                                    <i className="fas fa-file-alt"></i> {filename}
                                  </a>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="card-header">
                    <h3 className="post-title">{post.title || 'Untitled Product'}</h3>
                    {/* <span className="post-date">{formatDate(post.createdAt)}</span> */}
                  </div>
                  <div className='container'>
                  <p className="post-content">{post.content || 'No description available'}</p>

                  </div>

                 
                  {/* <div className="card-footer">
                    <button
                      onClick={() => navigate(`/BlogPage`)}
                      className="action-btn edit-btn"
                    >
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="action-btn delete-btn"
                    >
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </div> */}
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      {/* Image Modal */}
      {showImageModal && (
        <ImageModal 
          imageUrl={selectedImage}
          onClose={() => setShowImageModal(false)}
        />
      )}
    </div>
  );
};

export default CategoryPage;