import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImageModal from '../ImageModal';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const BlogFront = () => {
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

  // Banner Image handling
  const getProperImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('blob:')) return url;
    if (url.startsWith('/uploads')) return `${apiBaseUrl}${url}`;
    return `${apiBaseUrl}/uploads/${url}`;
  };

  // Media files handling
  const isImageFile = (filename) => {
    if (typeof filename !== 'string') return false;
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    return imageExtensions.some((ext) => filename.toLowerCase().endsWith(ext));
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

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>All Blogs are Here!</h1>

      {posts.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <div style={styles.grid}>
          {posts.map((post) => {
            const postId = post._id || post.id;
            return (
              <div key={postId} style={styles.card}>
                {/* Banner Image Section */}
                <h3 style={{color: "black",fontSize:'20px',fontWeight:'bold'}}>Banner Image</h3>
                {post.bannerImage && (
                  <img
                    src={getProperImageUrl(post.bannerImage.url || post.bannerImage)}
                    alt="Banner"
                    style={styles.bannerImage}
                    onClick={() => handleImageClick(getProperImageUrl(post.bannerImage.url || post.bannerImage))}
                  />
                )}

                {/* Media Files Section */}
                {Array.isArray(post.media) && post.media.length > 0 && (
                  <div style={styles.mediaContainer}>
                    <div style={styles.mediaGrid}>
                      {post.media.map((file, index) => {
                        const fileUrl = typeof file === 'string' ? file : file?.url || '';
                        return isImageFile(fileUrl) ? (
                          <div key={index} style={styles.mediaItem}>
                            <h3 style={{color: "black",fontSize:'20px'}}>Media</h3>
                            <img
                              src={getProperImageUrl(fileUrl)}
                              alt={`Media ${index}`}
                              style={styles.mediaImage}
                              onClick={() => handleImageClick(getProperImageUrl(fileUrl))}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder-image.jpg';
                              }}
                            />
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                {renderTitle(post.title, post.titleStyles)}

                <div
                  style={styles.content}
                  dangerouslySetInnerHTML={{ __html: post.content || '<p>No content</p>' }}
                />
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

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  pageTitle: {
    fontSize: '32px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    display: 'flex',
    flexDirection: 'column',
  },
  bannerImage: {
    width: '100%',
    height: 'auto',
    maxHeight: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '15px',
    cursor: 'pointer',
  },
  mediaContainer: {
    marginBottom: '15px',
  },
  mediaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
    gap: '10px',
  },
  mediaItem: {
    width: '100%',
  },
  mediaImage: {
    width: '100%',
    height: '80px',
    objectFit: 'cover',
    cursor: 'pointer',
    borderRadius: '6px',
    border: '1px solid #eee',
  },
  content: {
    fontSize: '16px',
    color: '#333',
    lineHeight: '1.5',
    flexGrow: 1,
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    marginTop: '15px',
    paddingTop: '15px',
    borderTop: '1px solid #eee',
  },
  editButton: {
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#45a049',
    },
  },
  deleteButton: {
    padding: '8px 16px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#d32f2f',
    },
  },
};

export default BlogFront;
