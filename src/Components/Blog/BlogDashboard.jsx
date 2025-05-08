// import React, { useState } from 'react';
// import { 
//   FaHeart, FaRegHeart, FaComment, FaShare, 
//   FaBookmark, FaRegBookmark 
// } from 'react-icons/fa';

// const PublishedBlog = ({ blog }) => {
//   const [isLiked, setIsLiked] = useState(false);
//   const [likes, setLikes] = useState(blog?.likes || 0);
//   const [comments, setComments] = useState(blog?.comments || []);
//   const [newComment, setNewComment] = useState('');
//   const [isBookmarked, setIsBookmarked] = useState(false);

//   const handleLike = () => {
//     setIsLiked(!isLiked);
//     setLikes(isLiked ? likes - 1 : likes + 1);
//   };

//   const handleCommentSubmit = (e) => {
//     e.preventDefault();
//     if (!newComment.trim()) return;
    
//     const comment = {
//       id: Date.now(),
//       text: newComment,
//       date: new Date().toISOString(),
//       author: 'Current User'
//     };
    
//     setComments([...comments, comment]);
//     setNewComment('');
//   };

//   return (
//     <div className="published-blog-container">
//       <div className="blog-header">
//         <h1>{blog.title}</h1>
//         <div className="blog-meta">
//           <span>By {blog.author}</span>
//           <span>Published on: {new Date(blog.date).toLocaleDateString()}</span>
//         </div>
//       </div>

//       <div className="blog-content">
//         <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        
//         {blog.images && blog.images.length > 0 && (
//           <div className="blog-media-gallery">
//             {blog.images.map((media) => (
//               <div key={media.id} className="media-item">
//                 {media.url.includes('youtube') || media.url.includes('vimeo') ? (
//                   <div className="video-container">
//                     <iframe 
//                       src={media.url} 
//                       title={`video-${media.id}`}
//                       frameBorder="0"
//                       allowFullScreen
//                     />
//                   </div>
//                 ) : (
//                   <img src={media.url} alt={`blog-${media.id}`} />
//                 )}
//                 {media.caption && <p className="media-caption">{media.caption}</p>}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="blog-actions">
//         <button onClick={handleLike} className="action-btn like-btn">
//           {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
//           <span>{likes}</span>
//         </button>
//         <button className="action-btn comment-btn">
//           <FaComment />
//           <span>Comment</span>
//         </button>
//         <button className="action-btn share-btn">
//           <FaShare />
//           <span>Share</span>
//         </button>
//         <button 
//           onClick={() => setIsBookmarked(!isBookmarked)} 
//           className="action-btn bookmark-btn"
//         >
//           {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
//         </button>
//       </div>

//       <div className="comments-section">
//         <h3>Comments ({comments.length})</h3>
//         <form onSubmit={handleCommentSubmit} className="comment-form">
//           <input
//             type="text"
//             placeholder="Write a comment..."
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//           />
//           <button type="submit">Post</button>
//         </form>
        
//         <div className="comments-list">
//           {comments.map((comment) => (
//             <div key={comment.id} className="comment">
//               <div className="comment-author">{comment.author}</div>
//               <div className="comment-text">{comment.text}</div>
//               <div className="comment-date">
//                 {new Date(comment.date).toLocaleString()}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PublishedBlog;











// import React from 'react';

// const PublishedBlog = ({ blog }) => {
//   // Handle case where blog might be null
//   if (!blog) {
//     return <div className="error">Blog post not found</div>;
//   }

//   return (
//     <div className="published-blog">
//       <h1>{blog.title}</h1>
//       <div className="blog-meta">
//         <span>By {blog.author}</span>
//         <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
//         {blog.status === 'published' && (
//           <span className="published-badge">Published</span>
//         )}
//       </div>
//       <div 
//         className="blog-content" 
//         dangerouslySetInnerHTML={{ __html: blog.content }} 
//       />
//     </div>
//   );
// };

// export default PublishedBlog;



// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';

// const BlogDashboard = ({ blogs, setBlogs, currentUser }) => {

//   const navigate = useNavigate();
//   const [filteredBlogs, setFilteredBlogs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     // Filter blogs to show only current user's blogs
//     const userBlogs = blogs.filter(blog => blog.author === currentUser);
    
//     // Apply search filter if search term exists
//     if (searchTerm) {
//       const filtered = userBlogs.filter(blog => 
//         blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         blog.content.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredBlogs(filtered);
//     } else {
//       setFilteredBlogs(userBlogs);
//     }
//   }, [blogs, currentUser, searchTerm]);

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this blog?')) {
//       setBlogs(blogs.filter(blog => blog.id !== id));
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <h2>My Blogs</h2>
//         <div className="dashboard-controls">
//           <div className="search-container">
//             <FaSearch className="search-icon" />
//             <input
//               type="text"
//               placeholder="Search blogs..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <button 
//             className="create-new-btn"
//             onClick={() => navigate('/editor')}
//           >
//             <FaPlus /> Create New Blog
//           </button>
//         </div>
//       </div>

//       {filteredBlogs.length === 0 ? (
//         <div className="no-blogs">
//           {searchTerm ? (
//             <p>No blogs found matching your search.</p>
//           ) : (
//             <>
//               <p>You don't have any blogs yet.</p>
//               <button onClick={() => navigate('/editor')}>Create Your First Blog</button>
//             </>
//           )}
//         </div>
//       ) : (
//         <div className="blogs-grid">
//           {filteredBlogs.map(blog => (
//             <div key={blog.id} className="blog-card">
//               {blog.bannerImage && (
//                 <div className="blog-banner">
//                   <img src={blog.bannerImage} alt="Banner" />
//                 </div>
//               )}
//               <div className="blog-content">
//                 <h3>{blog.title}</h3>
//                 <div className="blog-meta">
//                   <span>Created: {formatDate(blog.date)}</span>
//                   {blog.lastUpdated && blog.lastUpdated !== blog.date && (
//                     <span>Updated: {formatDate(blog.lastUpdated)}</span>
//                   )}
//                 </div>
//                 <div className="blog-actions">
//                   <button 
//                     onClick={() => navigate(`/editor/${blog.id}`)}
//                     className="edit-btn"
//                   >
//                     <FaEdit /> Edit
//                   </button>
//                   <button 
//                     onClick={() => handleDelete(blog.id)}
//                     className="delete-btn"
//                   >
//                     <FaTrash /> Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogDashboard;













// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaEdit, FaTrash, FaPlus, FaSearch, FaArrowRight } from 'react-icons/fa';

// const BlogDashboard = ({ blogs, setBlogs, currentUser, setisLoggedIn }) => {
//   const navigate = useNavigate();
//   const [filteredBlogs, setFilteredBlogs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const userBlogs = blogs.filter(blog => blog.author === currentUser);
//     setFilteredBlogs(
//       searchTerm 
//         ? userBlogs.filter(blog => 
//             blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             blog.content.toLowerCase().includes(searchTerm.toLowerCase())
//           )
//         : userBlogs
//     );
//   }, [blogs, currentUser, searchTerm]);

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this blog?')) {
//       setBlogs(blogs.filter(blog => blog.id !== id));
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const handleCardClick = (blog) => {
//     navigate(`/blog/${blog.urlSlug}`, { state: { blog } });
//   };

//   const handleCreateNew = () => {
    
//     navigate('/login', { state: { from: '/editor' } });
//   };

//   const handleEditBlog = (id, e) => {
//     e.stopPropagation();
//     navigate('/login', { state: { from: `/editor/${id}` } });
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <h2>My Blogs</h2>
//         <div className="dashboard-controls">
//           <div className="search-container">
//             <FaSearch className="search-icon" />
//             <input
//               type="text"
//               placeholder="Search blogs..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <button onClick={handleCreateNew} className="create-new-btn">
//             <FaPlus /> Create New Blog
//           </button>
//         </div>
//       </div>

//       {filteredBlogs.length === 0 ? (
//         <div className="no-blogs">
//           {searchTerm ? (
//             <p>No blogs found matching your search.</p>
//           ) : (
//             <>
//               <p>You don't have any blogs yet.</p>
//               <button onClick={handleCreateNew} className="create-first-btn">
//                 Create Your First Blog
//               </button>
//             </>
//           )}
//         </div>
//       ) : (
//         <div className="blogs-grid">
//           {filteredBlogs.map(blog => (
//             <div key={blog.id} className="blog-card">
//               <div className="blog-card-content" onClick={() => handleCardClick(blog)}>
//                 {blog.bannerImage && (
//                   <div className="blog-banner">
//                     <img src={blog.bannerImage} alt="Banner" />
//                   </div>
//                 )}
//                 <div className="blog-content">
//                   <h3>{blog.title}</h3>
//                   <div className="blog-meta">
//                     <span>Created: {formatDate(blog.date)}</span>
//                     {blog.lastUpdated && blog.lastUpdated !== blog.date && (
//                       <span>Updated: {formatDate(blog.lastUpdated)}</span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <div className="blog-actions">
//                 <button 
//                   onClick={(e) => handleEditBlog(blog.id, e)}
//                   className="edit-btn"
//                 >
//                   <FaEdit /> Edit
//                 </button>
//                 <button 
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleDelete(blog.id);
//                   }}
//                   className="delete-btn"
//                 >
//                   <FaTrash /> Delete
//                 </button>
//                 <button 
//                   onClick={() => handleCardClick(blog)}
//                   className="view-btn"
//                 >
//                   <FaArrowRight /> View
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogDashboard;




import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaArrowRight } from 'react-icons/fa';

const BlogDashboard = ({ blogs = [], setBlogs, currentUser }) => {
  const navigate = useNavigate();
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter blogs by current user
  const getFilteredBlogs = useCallback(() => {
    return blogs.filter(blog => blog.author === currentUser);
  }, [blogs, currentUser]);

  // Update filtered blogs when search term changes
  useEffect(() => {
    const filtered = getFilteredBlogs();
    if (searchTerm) {
      setFilteredBlogs(
        filtered.filter(blog => 
          blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.content?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredBlogs(filtered);
    }
  }, [searchTerm, getFilteredBlogs]);

  // Initial load
  useEffect(() => {
    setIsLoading(true);
    try {
      const filtered = getFilteredBlogs();
      setFilteredBlogs(filtered);
      setError(null);
    } catch (err) {
      console.error('Error loading blogs:', err);
      setError('Failed to load blogs');
    } finally {
      setIsLoading(false);
    }
  }, [getFilteredBlogs]);

  const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
          setBlogs(blogs.filter(blog => blog.id !== id));
        }
      };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Unknown date';
    }
  };

  const handleCardClick = (blog) => {
    navigate(`/blog/${blog.urlSlug || blog.id}`);
  };

  const handleCreateNew = () => {
    navigate('/Login');
  };

  const handleEditBlog = (id, e) => {
    e.stopPropagation();
    navigate(`/dashboard/${id}`);
  };

  if (isLoading) {
    return <div className="loading">Loading blogs...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>My Blogs</h2>
        <div className="dashboard-controls">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* <button onClick={handleCreateNew} className="create-new-btn">
            <FaPlus /> Create New Blog
          </button> */}
        </div>
      </div>

      {filteredBlogs.length === 0 ? (
        <div className="no-blogs">
          {searchTerm ? (
            <p>No blogs found matching your search.</p>
          ) : (
            <>
              <p>You don't have any blogs yet.</p>
              {/* <button onClick={handleCreateNew} className="create-first-btn">
                Create Your First Blog
              </button> */}
            </>
          )}
        </div>
      ) : (
        <div className="blogs-grid">
          {filteredBlogs.map(blog => (
            <div key={blog.id} className="blog-card" onClick={() => handleCardClick(blog)}>
              {blog.bannerImage && (
                <div className="blog-banner">
                  <img 
                    src={blog.bannerImage} 
                    alt="Banner" 
                    onError={(e) => e.target.src = '/default-blog-image.jpg'}
                  />
                </div>
              )}
              <div className="blog-content">
                <h3>{blog.title || 'Untitled Blog'}</h3>
                <div className="blog-meta">
                  <span>Created: {formatDate(blog.date)}</span>
                  {blog.lastUpdated && <span>Updated: {formatDate(blog.lastUpdated)}</span>}
                </div>
              </div>
              <div className="blog-actions">
                <button onClick={(e) => handleEditBlog(blog.id, e)} className="edit-btn">
                  <FaEdit /> Edit
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(blog.id);
                  }}
                  className="delete-btn"
                >
                  <FaTrash /> Delete
                </button>
                <button onClick={() => handleCardClick(blog)} className="view-btn">
                  <FaArrowRight /> View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogDashboard;