import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const EditBlog = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const quillRef = React.useRef(null);
    
    const [post, setPost] = useState({
        title: '',
        content: '',
        plainText: '',
        contentStyle: { formats: [], blocks: [] },
        bannerImage: null,
        media: [],
        titleStyles: {
            bold: false,
            italic: false,
            underline: false,
            fontSize: '24',
            color: '#000000',
            backgroundColor: '#ffffff',
            align: 'left'
        },
        seoTitle: '',
        seoDescription: '',
        seoKeywords: [],
        urlSlug: '',
        status: 'draft'
    });

    // Quill editor configuration
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'header': [1, 2, 3, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image', 'video'],
            ['clean']
        ]
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'align',
        'list', 'bullet',
        'link', 'image', 'video'
    ];

    // Helper function to get image URL
    const getImageUrl = (image) => {
  if (!image) return null;
  
  // Check for valid image URLs
  if (image.url && 
      (image.url.startsWith('blob:') || 
       image.url.startsWith('http') || 
       image.url.startsWith('/'))) {
    return image.url;
  }
  
  // Handle string URLs
  if (typeof image === 'string' && 
      (image.startsWith('http') || image.startsWith('/'))) {
    return image;
  }
  
  return null;
};

    // Fetch the blog post data
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}/Components/Blog/blogpost/${postId}`);
                const postData = response.data.post;
                
                setPost({
                    title: postData.title || '',
                    content: postData.content || '',
                    plainText: postData.plainText || '',
                    contentStyle: postData.contentStyle || { formats: [], blocks: [] },
                    bannerImage: postData.bannerImage || null,
                    media: postData.media || [],
                    titleStyles: postData.titleStyles || {
                        bold: false,
                        italic: false,
                        underline: false,
                        fontSize: '24',
                        color: '#000000',
                        backgroundColor: '#ffffff',
                        align: 'left'
                    },
                    seoTitle: postData.seoTitle || '',
                    seoDescription: postData.seoDescription || '',
                    seoKeywords: postData.seoKeywords || [],
                    urlSlug: postData.urlSlug || '',
                    status: postData.status || 'draft'
                });
            } catch (error) {
                console.error('Error fetching post:', error);
                toast.error('Failed to load blog post');
                navigate('/blog-dashboard');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [postId, navigate]);

    const handleContentChange = (content, delta, source, editor) => {
        setPost(prev => ({
            ...prev,
            content,
            plainText: editor.getText(),
            contentStyle: {
                formats: editor.getContents().ops.map(op => op.attributes || {}),
                blocks: editor.getContents().ops.map(op => ({
                    insert: op.insert,
                    attributes: op.attributes || {}
                }))
            }
        }));
    };

    // Handle title style changes
    const handleTitleStyleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPost(prev => ({
            ...prev,
            titleStyles: {
                ...prev.titleStyles,
                [name]: type === 'checkbox' ? checked : value
            }
        }));
    };

    // Handle banner image upload
    const handleBannerImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPost(prev => ({
                ...prev,
                bannerImage: {
                    url: URL.createObjectURL(file),
                    file
                }
            }));
        }
    };

    // Handle media files upload
    const handleMediaChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const newMedia = files.map(file => ({
                url: URL.createObjectURL(file),
                file
            }));
            setPost(prev => ({
                ...prev,
                media: newMedia
            }));
        }
    };

    // Remove a media file
    const removeMedia = (index) => {
        setPost(prev => {
            const updatedMedia = [...prev.media];
            updatedMedia.splice(index, 1);
            return { ...prev, media: updatedMedia };
        });
    };

    // Save the updated post
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const formData = new FormData();
            formData.append('title', post.title);
            formData.append('content', post.content);
            formData.append('plainText', post.plainText);
            formData.append('contentStyle', JSON.stringify(post.contentStyle));
            formData.append('titleStyles', JSON.stringify(post.titleStyles));

            if (post.bannerImage?.file) {
                formData.append('bannerImage', post.bannerImage.file);
            } else if (post.bannerImage?.url && !post.bannerImage.url.startsWith('blob:')) {
                formData.append('bannerImageUrl', post.bannerImage.url);
            }

            formData.append('clearExistingMedia', 'true');

            post.media.forEach((item) => {
                if (item.file) {
                    formData.append('media', item.file);
                }
            });

            await axios.put(`${apiBaseUrl}/Components/Blog/blogpost/${postId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success('Blog post updated successfully!');
            navigate('/DashboardLayout');
        } catch (error) {
            console.error('Error updating post:', error);
            toast.error('Failed to update blog post');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.spinner}></div>
                <p>Loading blog post...</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Edit Blog Post</h1>

            <form onSubmit={handleSubmit} style={styles.form}>
                {/* Title Section */}
                <div style={styles.section}>
                    <label style={styles.label}>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={post.title}
                        onChange={(e) => setPost({...post, title: e.target.value})}
                        style={{
                            ...styles.input,
                            fontWeight: post.titleStyles.bold ? 'bold' : 'normal',
                            fontStyle: post.titleStyles.italic ? 'italic' : 'normal',
                            textDecoration: post.titleStyles.underline ? 'underline' : 'none',
                            fontSize: `${post.titleStyles.fontSize}px`,
                            color: post.titleStyles.color,
                            backgroundColor: post.titleStyles.backgroundColor,
                            textAlign: post.titleStyles.align
                        }}
                        required
                    />
                </div>

                {/* Title Styles Section */}
                <div style={styles.section}>
                    <label style={styles.label}>Title Styles</label>
                    <div style={styles.styleControls}>
                        <label style={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                name="bold"
                                checked={post.titleStyles.bold}
                                onChange={handleTitleStyleChange}
                            />
                            Bold
                        </label>
                        <label style={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                name="italic"
                                checked={post.titleStyles.italic}
                                onChange={handleTitleStyleChange}
                            />
                            Italic
                        </label>
                        <label style={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                name="underline"
                                checked={post.titleStyles.underline}
                                onChange={handleTitleStyleChange}
                            />
                            Underline
                        </label>

                        <div style={styles.styleInputGroup}>
                            <label style={styles.smallLabel}>Font Size:</label>
                            <input
                                type="number"
                                name="fontSize"
                                value={post.titleStyles.fontSize}
                                onChange={handleTitleStyleChange}
                                style={styles.smallInput}
                                min="10"
                                max="72"
                            />
                        </div>

                        <div style={styles.styleInputGroup}>
                            <label style={styles.smallLabel}>Color:</label>
                            <input
                                type="color"
                                name="color"
                                value={post.titleStyles.color}
                                onChange={handleTitleStyleChange}
                                style={styles.colorInput}
                            />
                        </div>

                        <div style={styles.styleInputGroup}>
                            <label style={styles.smallLabel}>Align:</label>
                            <select
                                name="align"
                                value={post.titleStyles.align}
                                onChange={handleTitleStyleChange}
                                style={styles.selectInput}
                            >
                                <option value="left">Left</option>
                                <option value="center">Center</option>
                                <option value="right">Right</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div style={styles.section}>
                    <label style={styles.label}>Content</label>
                    <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        value={post.content}
                        onChange={handleContentChange}
                        modules={modules}
                        formats={formats}
                        style={{ height: '400px', marginBottom: '50px' }}
                    />
                </div>

                {/* Banner Image Section */}
                <div style={styles.section}>
                    <label style={styles.label}>Banner Image</label>
                    {post.bannerImage && (
                        <div style={styles.imagePreviewContainer}>
                            <img
                                src={getImageUrl(post.bannerImage)}
                                alt="Banner Preview"
                                style={styles.imagePreview}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleBannerImageChange}
                        style={styles.fileInput}
                    />
                </div>

                {/* Media Files Section */}
                {/* Media Files Section */}
<div style={styles.section}>
  <label style={styles.label}>Media Files</label>
  <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
    Selecting new files will replace all existing media
  </p>
  <div style={styles.mediaGrid}>
    {post.media.map((item, index) => {
      const mediaUrl = getImageUrl(item);
      // Only render if we have a valid image URL
      if (mediaUrl) {
        return (
          <div key={index} style={styles.mediaItem}>
            <img
              src={mediaUrl}
              alt={`Media ${index}`}
              style={styles.mediaPreview}
              onError={(e) => {
                // On error, remove the entire media item
                setPost(prev => {
                  const updatedMedia = [...prev.media];
                  updatedMedia.splice(index, 1);
                  return { ...prev, media: updatedMedia };
                });
              }}
            />
            <button
              type="button"
              onClick={() => removeMedia(index)}
              style={styles.removeButton}
            >
              Remove
            </button>
          </div>
        );
      }
      // Return null for invalid media (won't render anything)
      return null;
    })}
  </div>
  <input
    type="file"
    multiple
    onChange={handleMediaChange}
    style={styles.fileInput}
  />
</div>

                {/* Action Buttons */}
                <div style={styles.buttonGroup}>
                    <button
                        type="submit"
                        style={styles.submitButton}
                        disabled={isSaving}
                    >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/DashboardLayout')}
                        style={styles.cancelButton}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};
const styles = {
    container: {
        padding: '2rem',
        maxWidth: '1000px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    spinner: {
        border: '4px solid rgba(0, 0, 0, 0.1)',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        borderLeftColor: '#09f',
        animation: 'spin 1s linear infinite',
        marginBottom: '1rem',
    },
    heading: {
        fontSize: '2rem',
        marginBottom: '2rem',
        color: '#333',
        textAlign: 'center',
    },
    form: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    section: {
        marginBottom: '1.5rem',
    },
    label: {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: '600',
        color: '#444',
    },
    smallLabel: {
        fontSize: '0.8rem',
        marginRight: '0.5rem',
        color: '#666',
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '1rem',
        marginBottom: '1rem',
    },
    textarea: {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '1rem',
        minHeight: '200px',
        resize: 'vertical',
    },
    styleControls: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    styleButton: {
        padding: '0.5rem 0.75rem',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ddd',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'background-color 0.2s',
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
    },
    styleInputGroup: {
        display: 'flex',
        alignItems: 'center',
    },
    smallInput: {
        width: '60px',
        padding: '0.5rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
    },
    colorInput: {
        width: '40px',
        height: '40px',
        padding: '0',
        border: '1px solid #ddd',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    selectInput: {
        padding: '0.5rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    imagePreviewContainer: {
        marginBottom: '1rem',
    },
    imagePreview: {
        maxWidth: '100%',
        maxHeight: '300px',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    fileInput: {
        width: '100%',
        marginBottom: '1rem',
    },
    mediaGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '1rem',
        marginBottom: '1rem',
    },
    mediaItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
    },
    mediaPreview: {
        width: '100%',
        height: '100px',
        objectFit: 'cover',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    filePreview: {
        padding: '0.5rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        width: '100%',
        textAlign: 'center',
        wordBreak: 'break-all',
    },
    removeButton: {
        padding: '0.25rem 0.5rem',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.8rem',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
        marginTop: '2rem',
    },
    submitButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600',
        transition: 'background-color 0.3s',
    },
    cancelButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600',
        transition: 'background-color 0.3s',
    },
};

export default EditBlog;

















































































































































//latest

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// const EditBlog = () => {
//     const { postId } = useParams();
//     const navigate = useNavigate();
//     const [isLoading, setIsLoading] = useState(true);
//     const [isSaving, setIsSaving] = useState(false);
//     const quillRef = React.useRef(null);
    
//     const [post, setPost] = useState({
//         title: '',
//         content: '',
//         plainText: '',
//         contentStyle: { formats: [], blocks: [] },
//         bannerImage: null,
//         media: [],
//         titleStyles: {
//             bold: false,
//             italic: false,
//             underline: false,
//             fontSize: '24',
//             color: '#000000',
//             backgroundColor: '#ffffff',
//             align: 'left'
//         },
//         seoTitle: '',
//         seoDescription: '',
//         seoKeywords: [],
//         urlSlug: '',
//         status: 'draft'
//     });

//     // Quill editor configuration
//     const modules = {
//         toolbar: [
//             ['bold', 'italic', 'underline', 'strike'],
//             [{ 'header': [1, 2, 3, false] }],
//             [{ 'color': [] }, { 'background': [] }],
//             [{ 'align': [] }],
//             [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//             ['link', 'image', 'video'],
//             ['clean']
//         ]
//     };

//     const formats = [
//         'header',
//         'bold', 'italic', 'underline', 'strike',
//         'color', 'background',
//         'align',
//         'list', 'bullet',
//         'link', 'image', 'video'
//     ];

//     // Helper function to get image URL
//     const getImageUrl = (image) => {
//   if (!image) return null;
  
//   // Check for valid image URLs
//   if (image.url && 
//       (image.url.startsWith('blob:') || 
//        image.url.startsWith('http') || 
//        image.url.startsWith('/'))) {
//     return image.url;
//   }
  
//   // Handle string URLs
//   if (typeof image === 'string' && 
//       (image.startsWith('http') || image.startsWith('/'))) {
//     return image;
//   }
  
//   return null;
// };

//     // Fetch the blog post data
//     useEffect(() => {
//         const fetchPost = async () => {
//             try {
//                 const response = await axios.get(`${apiBaseUrl}/Components/Blog/blogpost/${postId}`);
//                 const postData = response.data.post;
                
//                 setPost({
//                     title: postData.title || '',
//                     content: postData.content || '',
//                     plainText: postData.plainText || '',
//                     contentStyle: postData.contentStyle || { formats: [], blocks: [] },
//                     bannerImage: postData.bannerImage || null,
//                     media: postData.media || [],
//                     titleStyles: postData.titleStyles || {
//                         bold: false,
//                         italic: false,
//                         underline: false,
//                         fontSize: '24',
//                         color: '#000000',
//                         backgroundColor: '#ffffff',
//                         align: 'left'
//                     },
//                     seoTitle: postData.seoTitle || '',
//                     seoDescription: postData.seoDescription || '',
//                     seoKeywords: postData.seoKeywords || [],
//                     urlSlug: postData.urlSlug || '',
//                     status: postData.status || 'draft'
//                 });
//             } catch (error) {
//                 console.error('Error fetching post:', error);
//                 toast.error('Failed to load blog post');
//                 navigate('/blog-dashboard');
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchPost();
//     }, [postId, navigate]);

//     const handleContentChange = (content, delta, source, editor) => {
//         setPost(prev => ({
//             ...prev,
//             content,
//             plainText: editor.getText(),
//             contentStyle: {
//                 formats: editor.getContents().ops.map(op => op.attributes || {}),
//                 blocks: editor.getContents().ops.map(op => ({
//                     insert: op.insert,
//                     attributes: op.attributes || {}
//                 }))
//             }
//         }));
//     };

//     // Handle title style changes
//     const handleTitleStyleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setPost(prev => ({
//             ...prev,
//             titleStyles: {
//                 ...prev.titleStyles,
//                 [name]: type === 'checkbox' ? checked : value
//             }
//         }));
//     };

//     // Handle banner image upload
//     const handleBannerImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setPost(prev => ({
//                 ...prev,
//                 bannerImage: {
//                     url: URL.createObjectURL(file),
//                     file
//                 }
//             }));
//         }
//     };

//     // Handle media files upload
//     const handleMediaChange = (e) => {
//         const files = Array.from(e.target.files);
//         if (files.length > 0) {
//             const newMedia = files.map(file => ({
//                 url: URL.createObjectURL(file),
//                 file
//             }));
//             setPost(prev => ({
//                 ...prev,
//                 media: newMedia
//             }));
//         }
//     };

//     // Remove a media file
//     const removeMedia = (index) => {
//         setPost(prev => {
//             const updatedMedia = [...prev.media];
//             updatedMedia.splice(index, 1);
//             return { ...prev, media: updatedMedia };
//         });
//     };

//     // Save the updated post
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSaving(true);

//         try {
//             const formData = new FormData();
//             formData.append('title', post.title);
//             formData.append('content', post.content);
//             formData.append('plainText', post.plainText);
//             formData.append('contentStyle', JSON.stringify(post.contentStyle));
//             formData.append('titleStyles', JSON.stringify(post.titleStyles));

//             if (post.bannerImage?.file) {
//                 formData.append('bannerImage', post.bannerImage.file);
//             } else if (post.bannerImage?.url && !post.bannerImage.url.startsWith('blob:')) {
//                 formData.append('bannerImageUrl', post.bannerImage.url);
//             }

//             formData.append('clearExistingMedia', 'true');

//             post.media.forEach((item) => {
//                 if (item.file) {
//                     formData.append('media', item.file);
//                 }
//             });

//             await axios.put(`${apiBaseUrl}/Components/Blog/blogpost/${postId}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             toast.success('Blog post updated successfully!');
//             navigate('/DashboardLayout');
//         } catch (error) {
//             console.error('Error updating post:', error);
//             toast.error('Failed to update blog post');
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     if (isLoading) {
//         return (
//             <div style={styles.loadingContainer}>
//                 <div style={styles.spinner}></div>
//                 <p>Loading blog post...</p>
//             </div>
//         );
//     }

//     return (
//         <div style={styles.container}>
//             <h1 style={styles.heading}>Edit Blog Post</h1>

//             <form onSubmit={handleSubmit} style={styles.form}>
//                 {/* Title Section */}
//                 <div style={styles.section}>
//                     <label style={styles.label}>Title</label>
//                     <input
//                         type="text"
//                         name="title"
//                         value={post.title}
//                         onChange={(e) => setPost({...post, title: e.target.value})}
//                         style={{
//                             ...styles.input,
//                             fontWeight: post.titleStyles.bold ? 'bold' : 'normal',
//                             fontStyle: post.titleStyles.italic ? 'italic' : 'normal',
//                             textDecoration: post.titleStyles.underline ? 'underline' : 'none',
//                             fontSize: `${post.titleStyles.fontSize}px`,
//                             color: post.titleStyles.color,
//                             backgroundColor: post.titleStyles.backgroundColor,
//                             textAlign: post.titleStyles.align
//                         }}
//                         required
//                     />
//                 </div>

//                 {/* Title Styles Section */}
//                 <div style={styles.section}>
//                     <label style={styles.label}>Title Styles</label>
//                     <div style={styles.styleControls}>
//                         <label style={styles.checkboxLabel}>
//                             <input
//                                 type="checkbox"
//                                 name="bold"
//                                 checked={post.titleStyles.bold}
//                                 onChange={handleTitleStyleChange}
//                             />
//                             Bold
//                         </label>
//                         <label style={styles.checkboxLabel}>
//                             <input
//                                 type="checkbox"
//                                 name="italic"
//                                 checked={post.titleStyles.italic}
//                                 onChange={handleTitleStyleChange}
//                             />
//                             Italic
//                         </label>
//                         <label style={styles.checkboxLabel}>
//                             <input
//                                 type="checkbox"
//                                 name="underline"
//                                 checked={post.titleStyles.underline}
//                                 onChange={handleTitleStyleChange}
//                             />
//                             Underline
//                         </label>

//                         <div style={styles.styleInputGroup}>
//                             <label style={styles.smallLabel}>Font Size:</label>
//                             <input
//                                 type="number"
//                                 name="fontSize"
//                                 value={post.titleStyles.fontSize}
//                                 onChange={handleTitleStyleChange}
//                                 style={styles.smallInput}
//                                 min="10"
//                                 max="72"
//                             />
//                         </div>

//                         <div style={styles.styleInputGroup}>
//                             <label style={styles.smallLabel}>Color:</label>
//                             <input
//                                 type="color"
//                                 name="color"
//                                 value={post.titleStyles.color}
//                                 onChange={handleTitleStyleChange}
//                                 style={styles.colorInput}
//                             />
//                         </div>

//                         <div style={styles.styleInputGroup}>
//                             <label style={styles.smallLabel}>Align:</label>
//                             <select
//                                 name="align"
//                                 value={post.titleStyles.align}
//                                 onChange={handleTitleStyleChange}
//                                 style={styles.selectInput}
//                             >
//                                 <option value="left">Left</option>
//                                 <option value="center">Center</option>
//                                 <option value="right">Right</option>
//                             </select>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Content Section */}
//                 <div style={styles.section}>
//                     <label style={styles.label}>Content</label>
//                     <ReactQuill
//                         ref={quillRef}
//                         theme="snow"
//                         value={post.content}
//                         onChange={handleContentChange}
//                         modules={modules}
//                         formats={formats}
//                         style={{ height: '400px', marginBottom: '50px' }}
//                     />
//                 </div>

//                 {/* Banner Image Section */}
//                 <div style={styles.section}>
//                     <label style={styles.label}>Banner Image</label>
//                     {post.bannerImage && (
//                         <div style={styles.imagePreviewContainer}>
//                             <img
//                                 src={getImageUrl(post.bannerImage)}
//                                 alt="Banner Preview"
//                                 style={styles.imagePreview}
//                                 onError={(e) => {
//                                     e.target.onerror = null;
//                                     e.target.style.display = 'none';
//                                 }}
//                             />
//                         </div>
//                     )}
//                     <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleBannerImageChange}
//                         style={styles.fileInput}
//                     />
//                 </div>

//                 {/* Media Files Section */}
//                 {/* Media Files Section */}
// <div style={styles.section}>
//   <label style={styles.label}>Media Files</label>
//   <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
//     Selecting new files will replace all existing media
//   </p>
//   <div style={styles.mediaGrid}>
//     {post.media.map((item, index) => {
//       const mediaUrl = getImageUrl(item);
//       // Only render if we have a valid image URL
//       if (mediaUrl) {
//         return (
//           <div key={index} style={styles.mediaItem}>
//             <img
//               src={mediaUrl}
//               alt={`Media ${index}`}
//               style={styles.mediaPreview}
//               onError={(e) => {
//                 // On error, remove the entire media item
//                 setPost(prev => {
//                   const updatedMedia = [...prev.media];
//                   updatedMedia.splice(index, 1);
//                   return { ...prev, media: updatedMedia };
//                 });
//               }}
//             />
//             <button
//               type="button"
//               onClick={() => removeMedia(index)}
//               style={styles.removeButton}
//             >
//               Remove
//             </button>
//           </div>
//         );
//       }
//       // Return null for invalid media (won't render anything)
//       return null;
//     })}
//   </div>
//   <input
//     type="file"
//     multiple
//     onChange={handleMediaChange}
//     style={styles.fileInput}
//   />
// </div>

//                 {/* Action Buttons */}
//                 <div style={styles.buttonGroup}>
//                     <button
//                         type="submit"
//                         style={styles.submitButton}
//                         disabled={isSaving}
//                     >
//                         {isSaving ? 'Saving...' : 'Save Changes'}
//                     </button>
//                     <button
//                         type="button"
//                         onClick={() => navigate('/DashboardLayout')}
//                         style={styles.cancelButton}
//                     >
//                         Cancel
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };
// const styles = {
//     container: {
//         padding: '2rem',
//         maxWidth: '1000px',
//         margin: '0 auto',
//         fontFamily: 'Arial, sans-serif',
//     },
//     loadingContainer: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100vh',
//     },
//     spinner: {
//         border: '4px solid rgba(0, 0, 0, 0.1)',
//         width: '36px',
//         height: '36px',
//         borderRadius: '50%',
//         borderLeftColor: '#09f',
//         animation: 'spin 1s linear infinite',
//         marginBottom: '1rem',
//     },
//     heading: {
//         fontSize: '2rem',
//         marginBottom: '2rem',
//         color: '#333',
//         textAlign: 'center',
//     },
//     form: {
//         backgroundColor: '#fff',
//         padding: '2rem',
//         borderRadius: '8px',
//         boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//     },
//     section: {
//         marginBottom: '1.5rem',
//     },
//     label: {
//         display: 'block',
//         marginBottom: '0.5rem',
//         fontWeight: '600',
//         color: '#444',
//     },
//     smallLabel: {
//         fontSize: '0.8rem',
//         marginRight: '0.5rem',
//         color: '#666',
//     },
//     input: {
//         width: '100%',
//         padding: '0.75rem',
//         border: '1px solid #ddd',
//         borderRadius: '4px',
//         fontSize: '1rem',
//         marginBottom: '1rem',
//     },
//     textarea: {
//         width: '100%',
//         padding: '0.75rem',
//         border: '1px solid #ddd',
//         borderRadius: '4px',
//         fontSize: '1rem',
//         minHeight: '200px',
//         resize: 'vertical',
//     },
//     styleControls: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         gap: '1rem',
//         alignItems: 'center',
//         marginBottom: '1rem',
//     },
//     styleButton: {
//         padding: '0.5rem 0.75rem',
//         backgroundColor: '#f0f0f0',
//         border: '1px solid #ddd',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         fontSize: '0.9rem',
//         transition: 'background-color 0.2s',
//     },
//     checkboxLabel: {
//         display: 'flex',
//         alignItems: 'center',
//         gap: '0.5rem',
//         cursor: 'pointer',
//     },
//     styleInputGroup: {
//         display: 'flex',
//         alignItems: 'center',
//     },
//     smallInput: {
//         width: '60px',
//         padding: '0.5rem',
//         border: '1px solid #ddd',
//         borderRadius: '4px',
//     },
//     colorInput: {
//         width: '40px',
//         height: '40px',
//         padding: '0',
//         border: '1px solid #ddd',
//         borderRadius: '4px',
//         cursor: 'pointer',
//     },
//     selectInput: {
//         padding: '0.5rem',
//         border: '1px solid #ddd',
//         borderRadius: '4px',
//         cursor: 'pointer',
//     },
//     imagePreviewContainer: {
//         marginBottom: '1rem',
//     },
//     imagePreview: {
//         maxWidth: '100%',
//         maxHeight: '300px',
//         borderRadius: '4px',
//         border: '1px solid #ddd',
//     },
//     fileInput: {
//         width: '100%',
//         marginBottom: '1rem',
//     },
//     mediaGrid: {
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
//         gap: '1rem',
//         marginBottom: '1rem',
//     },
//     mediaItem: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         gap: '0.5rem',
//     },
//     mediaPreview: {
//         width: '100%',
//         height: '100px',
//         objectFit: 'cover',
//         borderRadius: '4px',
//         border: '1px solid #ddd',
//     },
//     filePreview: {
//         padding: '0.5rem',
//         border: '1px solid #ddd',
//         borderRadius: '4px',
//         width: '100%',
//         textAlign: 'center',
//         wordBreak: 'break-all',
//     },
//     removeButton: {
//         padding: '0.25rem 0.5rem',
//         backgroundColor: '#f44336',
//         color: 'white',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         fontSize: '0.8rem',
//     },
//     buttonGroup: {
//         display: 'flex',
//         justifyContent: 'flex-end',
//         gap: '1rem',
//         marginTop: '2rem',
//     },
//     submitButton: {
//         padding: '0.75rem 1.5rem',
//         backgroundColor: '#4CAF50',
//         color: 'white',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         fontSize: '1rem',
//         fontWeight: '600',
//         transition: 'background-color 0.3s',
//     },
//     cancelButton: {
//         padding: '0.75rem 1.5rem',
//         backgroundColor: '#f44336',
//         color: 'white',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         fontSize: '1rem',
//         fontWeight: '600',
//         transition: 'background-color 0.3s',
//     },
// };

// export default EditBlog;



















































































//ss2

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// const EditBlog = () => {
//     const { postId } = useParams();
//     const navigate = useNavigate();
//     const [isLoading, setIsLoading] = useState(true);
//     const [isSaving, setIsSaving] = useState(false);
//     const [post, setPost] = useState({
//         title: '',
//         content: '',
//         bannerImage: null,
//         media: [],
//         titleStyles: {
//             bold: false,
//             italic: false,
//             underline: false,
//             fontSize: '24',
//             color: '#000000',
//             backgroundColor: '#ffffff',
//             align: 'left'
//         },
//         contentStyles: {
//             bold: false,
//             italic: false,
//             underline: false,
//             fontSize: '16',
//             color: '#000000',
//             backgroundColor: '#ffffff',
//             align: 'left',
//             lineHeight: '1.5'
//         }
//     });

//     // Helper function to get image URL
//     const getImageUrl = (image) => {
//         if (!image) return null;

//         // If it's a file object with URL (new uploads)
//         if (image.url && image.url.startsWith('blob:')) return image.url;

//         // If it's a string path from backend
//         if (typeof image === 'string') {
//             // Check if it's already a full URL
//             if (image.startsWith('http')) return image;
//             // Construct full URL for backend paths
//             return `${apiBaseUrl}${image}`;
//         }

//         // If backend returns an object with url property
//         if (image.url) {
//             if (image.url.startsWith('http')) return image.url;
//             return `${apiBaseUrl}${image.url}`;
//         }

//         // If backend returns an object with path property
//         if (image.path) {
//             if (image.path.startsWith('http')) return image.path;
//             return `${apiBaseUrl}${image.path}`;
//         }

//         return null;
//     };

//     // Fetch the blog post data
//     useEffect(() => {
//         const fetchPost = async () => {
//             try {
//                 const response = await axios.get(`${apiBaseUrl}/Components/Blog/blogpost/${postId}`);
//                 console.log('API Response:', response.data);

//                 // Handle banner image
//                 const bannerImage = response.data.post.bannerImage
//                     ? response.data.post.bannerImage
//                     : null;

//                 // Handle media files
//                 const media = response.data.post.media || [];

//                 setPost({
//                     title: response.data.post.title || '',
//                     content: response.data.post.plainText || response.data.post.content || '',
//                     bannerImage,
//                     media,
//                     titleStyles: response.data.post.titleStyles || {
//                         bold: false,
//                         italic: false,
//                         underline: false,
//                         fontSize: '24',
//                         color: '#000000',
//                         backgroundColor: '#ffffff',
//                         align: 'left'
//                     },
//                     contentStyles: response.data.post.contentStyles || {
//                         bold: false,
//                         italic: false,
//                         underline: false,
//                         fontSize: '16',
//                         color: '#000000',
//                         backgroundColor: '#ffffff',
//                         align: 'left',
//                         lineHeight: '1.5'
//                     }
//                 });
//             } catch (error) {
//                 console.error('Error fetching post:', error);
//                 toast.error('Failed to load blog post');
//                 navigate('/blog-dashboard');
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchPost();
//     }, [postId, navigate]);

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setPost(prev => ({ ...prev, [name]: value }));
//     };

//     // Handle title style changes
//     const handleTitleStyleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setPost(prev => ({
//             ...prev,
//             titleStyles: {
//                 ...prev.titleStyles,
//                 [name]: type === 'checkbox' ? checked : value
//             }
//         }));
//     };

//     // Handle content style changes
//     const handleContentStyleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setPost(prev => ({
//             ...prev,
//             contentStyles: {
//                 ...prev.contentStyles,
//                 [name]: type === 'checkbox' ? checked : value
//             }
//         }));
//     };

//     // Apply styles to selected text in content
//     const applyContentStyle = (styleType) => {
//         const textarea = document.querySelector('textarea[name="content"]');
//         const start = textarea.selectionStart;
//         const end = textarea.selectionEnd;
//         const selectedText = post.content.substring(start, end);
        
//         if (!selectedText) return;

//         let styledText = '';
        
//         switch (styleType) {
//             case 'bold':
//                 styledText = `<strong>${selectedText}</strong>`;
//                 break;
//             case 'italic':
//                 styledText = `<em>${selectedText}</em>`;
//                 break;
//             case 'underline':
//                 styledText = `<u>${selectedText}</u>`;
//                 break;
//             default:
//                 styledText = selectedText;
//         }

//         const newContent = 
//             post.content.substring(0, start) + 
//             styledText + 
//             post.content.substring(end);
            
//         setPost(prev => ({ ...prev, content: newContent }));
//     };

//     // Handle banner image upload
//     const handleBannerImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setPost(prev => ({
//                 ...prev,
//                 bannerImage: {
//                     url: URL.createObjectURL(file),
//                     file
//                 }
//             }));
//         }
//     };

//     // Handle media files upload
//     const handleMediaChange = (e) => {
//         const files = Array.from(e.target.files);
//         if (files.length > 0) {
//             const newMedia = files.map(file => ({
//                 url: URL.createObjectURL(file),
//                 file
//             }));
//             setPost(prev => ({
//                 ...prev,
//                 media: newMedia // Replace instead of append
//             }));
//         }
//     };

//     // Remove a media file
//     const removeMedia = (index) => {
//         setPost(prev => {
//             const updatedMedia = [...prev.media];
//             updatedMedia.splice(index, 1);
//             return { ...prev, media: updatedMedia };
//         });
//     };

//     // Save the updated post
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSaving(true);

//         try {
//             const formData = new FormData();
//             formData.append('title', post.title);
//             formData.append('content', post.content);
//             formData.append('titleStyles', JSON.stringify(post.titleStyles));
//             formData.append('contentStyles', JSON.stringify(post.contentStyles));

//             if (post.bannerImage?.file) {
//                 formData.append('bannerImage', post.bannerImage.file);
//             } else if (post.bannerImage?.url && !post.bannerImage.url.startsWith('blob:')) {
//                 formData.append('bannerImageUrl', post.bannerImage.url);
//             }

//             // Clear existing media URLs first
//             formData.append('clearExistingMedia', 'true');

//             // Add new media files
//             post.media.forEach((item) => {
//                 if (item.file) {
//                     formData.append('media', item.file);
//                 }
//             });

//             await axios.put(`${apiBaseUrl}/Components/Blog/blogpost/${postId}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             toast.success('Blog post updated successfully!');
//             navigate('/DashboardLayout');
//         } catch (error) {
//             console.error('Error updating post:', error);
//             toast.error('Failed to update blog post');
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     if (isLoading) {
//         return (
//             <div style={styles.loadingContainer}>
//                 <div style={styles.spinner}></div>
//                 <p>Loading blog post...</p>
//             </div>
//         );
//     }

//     return (
//         <div style={styles.container}>
//             <h1 style={styles.heading}>Edit Blog Post</h1>

//             <form onSubmit={handleSubmit} style={styles.form}>
//                 {/* Title Section */}
//                 <div style={styles.section}>
//                     <label style={styles.label}>Title</label>
//                     <input
//                         type="text"
//                         name="title"
//                         value={post.title}
//                         onChange={handleChange}
//                         style={styles.input}
//                         required
//                     />
//                 </div>

//                 {/* Title Styles Section */}
//                 <div style={styles.section}>
//                     <label style={styles.label}>Title Styles</label>
//                     <div style={styles.styleControls}>
//                         <label style={styles.checkboxLabel}>
//                             <input
//                                 type="checkbox"
//                                 name="bold"
//                                 checked={post.titleStyles.bold}
//                                 onChange={handleTitleStyleChange}
//                             />
//                             Bold
//                         </label>
//                         <label style={styles.checkboxLabel}>
//                             <input
//                                 type="checkbox"
//                                 name="italic"
//                                 checked={post.titleStyles.italic}
//                                 onChange={handleTitleStyleChange}
//                             />
//                             Italic
//                         </label>
//                         <label style={styles.checkboxLabel}>
//                             <input
//                                 type="checkbox"
//                                 name="underline"
//                                 checked={post.titleStyles.underline}
//                                 onChange={handleTitleStyleChange}
//                             />
//                             Underline
//                         </label>

//                         <div style={styles.styleInputGroup}>
//                             <label style={styles.smallLabel}>Font Size:</label>
//                             <input
//                                 type="number"
//                                 name="fontSize"
//                                 value={post.titleStyles.fontSize}
//                                 onChange={handleTitleStyleChange}
//                                 style={styles.smallInput}
//                                 min="10"
//                                 max="72"
//                             />
//                         </div>

//                         <div style={styles.styleInputGroup}>
//                             <label style={styles.smallLabel}>Color:</label>
//                             <input
//                                 type="color"
//                                 name="color"
//                                 value={post.titleStyles.color}
//                                 onChange={handleTitleStyleChange}
//                                 style={styles.colorInput}
//                             />
//                         </div>

//                         <div style={styles.styleInputGroup}>
//                             <label style={styles.smallLabel}>Align:</label>
//                             <select
//                                 name="align"
//                                 value={post.titleStyles.align}
//                                 onChange={handleTitleStyleChange}
//                                 style={styles.selectInput}
//                             >
//                                 <option value="left">Left</option>
//                                 <option value="center">Center</option>
//                                 <option value="right">Right</option>
//                             </select>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Content Section */}
//                 <div style={styles.section}>
//                     <label style={styles.label}>Content</label>
                    
//                     {/* Content Style Controls */}
//                     <div style={styles.styleControls}>
//                         <button
//                             type="button"
//                             onClick={() => applyContentStyle('bold')}
//                             style={{
//                                 ...styles.styleButton,
//                                 fontWeight: post.contentStyles.bold ? 'bold' : 'normal'
//                             }}
//                         >
//                             Bold
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => applyContentStyle('italic')}
//                             style={{
//                                 ...styles.styleButton,
//                                 fontStyle: post.contentStyles.italic ? 'italic' : 'normal'
//                             }}
//                         >
//                             Italic
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => applyContentStyle('underline')}
//                             style={{
//                                 ...styles.styleButton,
//                                 textDecoration: post.contentStyles.underline ? 'underline' : 'none'
//                             }}
//                         >
//                             Underline
//                         </button>

//                         <div style={styles.styleInputGroup}>
//                             <label style={styles.smallLabel}>Font Size:</label>
//                             <input
//                                 type="number"
//                                 name="fontSize"
//                                 value={post.contentStyles.fontSize}
//                                 onChange={handleContentStyleChange}
//                                 style={styles.smallInput}
//                                 min="10"
//                                 max="24"
//                             />
//                         </div>

//                         <div style={styles.styleInputGroup}>
//                             <label style={styles.smallLabel}>Color:</label>
//                             <input
//                                 type="color"
//                                 name="color"
//                                 value={post.contentStyles.color}
//                                 onChange={handleContentStyleChange}
//                                 style={styles.colorInput}
//                             />
//                         </div>

//                         <div style={styles.styleInputGroup}>
//                             <label style={styles.smallLabel}>Align:</label>
//                             <select
//                                 name="align"
//                                 value={post.contentStyles.align}
//                                 onChange={handleContentStyleChange}
//                                 style={styles.selectInput}
//                             >
//                                 <option value="left">Left</option>
//                                 <option value="center">Center</option>
//                                 <option value="right">Right</option>
//                             </select>
//                         </div>

//                         <div style={styles.styleInputGroup}>
//                             <label style={styles.smallLabel}>Line Height:</label>
//                             <input
//                                 type="number"
//                                 name="lineHeight"
//                                 value={post.contentStyles.lineHeight}
//                                 onChange={handleContentStyleChange}
//                                 style={styles.smallInput}
//                                 min="1"
//                                 max="3"
//                                 step="0.1"
//                             />
//                         </div>
//                     </div>
                    
//                     <textarea
//                         name="content"
//                         value={post.content}
//                         onChange={handleChange}
//                         style={{
//                             ...styles.textarea,
//                             fontSize: `${post.contentStyles.fontSize}px`,
//                             color: post.contentStyles.color,
//                             backgroundColor: post.contentStyles.backgroundColor,
//                             textAlign: post.contentStyles.align,
//                             lineHeight: post.contentStyles.lineHeight,
//                             fontWeight: post.contentStyles.bold ? 'bold' : 'normal',
//                             fontStyle: post.contentStyles.italic ? 'italic' : 'normal',
//                             textDecoration: post.contentStyles.underline ? 'underline' : 'none'
//                         }}
//                         rows="10"
//                         required
//                     />
//                 </div>

//                 {/* Banner Image Section */}
//                 <div style={styles.section}>
//                     <label style={styles.label}>Banner Image</label>
//                     {post.bannerImage && (
//                         <div style={styles.imagePreviewContainer}>
//                             <img
//                                 src={getImageUrl(post.bannerImage)}
//                                 alt="Banner Preview"
//                                 style={styles.imagePreview}
//                                 onError={(e) => {
//                                     e.target.onerror = null;
//                                     e.target.style.display = 'none';
//                                 }}
//                             />
//                         </div>
//                     )}
//                     <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleBannerImageChange}
//                         style={styles.fileInput}
//                     />
//                 </div>

//                 {/* Media Files Section */}
//                 <div style={styles.section}>
//                     <label style={styles.label}>Media Files</label>
//                     <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
//                         Selecting new files will replace all existing media
//                     </p>
//                     <div style={styles.mediaGrid}>
//                         {post.media.map((item, index) => (
//                             <div key={index} style={styles.mediaItem}>
//                                 {getImageUrl(item) ? (
//                                     <img
//                                         src={getImageUrl(item)}
//                                         alt={`Media ${index}`}
//                                         style={styles.mediaPreview}
//                                         onError={(e) => {
//                                             e.target.onerror = null;
//                                             e.target.style.display = 'none';
//                                         }}
//                                     />
//                                 ) : (
//                                     <div style={styles.filePreview}>
//                                         {item.url ? item.url.split('/').pop() : item.file?.name || 'Media'}
//                                     </div>
//                                 )}
//                                 <button
//                                     type="button"
//                                     onClick={() => removeMedia(index)}
//                                     style={styles.removeButton}
//                                 >
//                                     Remove
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                     <input
//                         type="file"
//                         multiple
//                         onChange={handleMediaChange}
//                         style={styles.fileInput}
//                     />
//                 </div>

//                 {/* Action Buttons */}
//                 <div style={styles.buttonGroup}>
//                     <button
//                         type="submit"
//                         style={styles.submitButton}
//                         disabled={isSaving}
//                     >
//                         {isSaving ? 'Saving...' : 'Save Changes'}
//                     </button>
//                     <button
//                         type="button"
//                         onClick={() => navigate('/DashboardLayout')}
//                         style={styles.cancelButton}
//                     >
//                         Cancel
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// const styles = {
//     container: {
//         padding: '2rem',
//         maxWidth: '1000px',
//         margin: '0 auto',
//         fontFamily: 'Arial, sans-serif',
//     },
//     loadingContainer: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100vh',
//     },
//     spinner: {
//         border: '4px solid rgba(0, 0, 0, 0.1)',
//         width: '36px',
//         height: '36px',
//         borderRadius: '50%',
//         borderLeftColor: '#09f',
//         animation: 'spin 1s linear infinite',
//         marginBottom: '1rem',
//     },
//     heading: {
//         fontSize: '2rem',
//         marginBottom: '2rem',
//         color: '#333',
//         textAlign: 'center',
//     },
//     form: {
//         backgroundColor: '#fff',
//         padding: '2rem',
//         borderRadius: '8px',
//         boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//     },
//     section: {
//         marginBottom: '1.5rem',
//     },
//     label: {
//         display: 'block',
//         marginBottom: '0.5rem',
//         fontWeight: '600',
//         color: '#444',
//     },
//     smallLabel: {
//         fontSize: '0.8rem',
//         marginRight: '0.5rem',
//         color: '#666',
//     },
//     input: {
//         width: '100%',
//         padding: '0.75rem',
//         border: '1px solid #ddd',
//         borderRadius: '4px',
//         fontSize: '1rem',
//         marginBottom: '1rem',
//     },
//     textarea: {
//         width: '100%',
//         padding: '0.75rem',
//         border: '1px solid #ddd',
//         borderRadius: '4px',
//         fontSize: '1rem',
//         minHeight: '200px',
//         resize: 'vertical',
//     },
//     styleControls: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         gap: '1rem',
//         alignItems: 'center',
//         marginBottom: '1rem',
//     },
//     styleButton: {
//         padding: '0.5rem 0.75rem',
//         backgroundColor: '#f0f0f0',
//         border: '1px solid #ddd',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         fontSize: '0.9rem',
//         transition: 'background-color 0.2s',
//     },
//     checkboxLabel: {
//         display: 'flex',
//         alignItems: 'center',
//         gap: '0.5rem',
//         cursor: 'pointer',
//     },
//     styleInputGroup: {
//         display: 'flex',
//         alignItems: 'center',
//     },
//     smallInput: {
//         width: '60px',
//         padding: '0.5rem',
//         border: '1px solid #ddd',
//         borderRadius: '4px',
//     },
//     colorInput: {
//         width: '40px',
//         height: '40px',
//         padding: '0',
//         border: '1px solid #ddd',
//         borderRadius: '4px',
//         cursor: 'pointer',
//     },
//     selectInput: {
//         padding: '0.5rem',
//         border: '1px solid #ddd',
//         borderRadius: '4px',
//         cursor: 'pointer',
//     },
//     imagePreviewContainer: {
//         marginBottom: '1rem',
//     },
//     imagePreview: {
//         maxWidth: '100%',
//         maxHeight: '300px',
//         borderRadius: '4px',
//         border: '1px solid #ddd',
//     },
//     fileInput: {
//         width: '100%',
//         marginBottom: '1rem',
//     },
//     mediaGrid: {
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
//         gap: '1rem',
//         marginBottom: '1rem',
//     },
//     mediaItem: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         gap: '0.5rem',
//     },
//     mediaPreview: {
//         width: '100%',
//         height: '100px',
//         objectFit: 'cover',
//         borderRadius: '4px',
//         border: '1px solid #ddd',
//     },
//     filePreview: {
//         padding: '0.5rem',
//         border: '1px solid #ddd',
//         borderRadius: '4px',
//         width: '100%',
//         textAlign: 'center',
//         wordBreak: 'break-all',
//     },
//     removeButton: {
//         padding: '0.25rem 0.5rem',
//         backgroundColor: '#f44336',
//         color: 'white',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         fontSize: '0.8rem',
//     },
//     buttonGroup: {
//         display: 'flex',
//         justifyContent: 'flex-end',
//         gap: '1rem',
//         marginTop: '2rem',
//     },
//     submitButton: {
//         padding: '0.75rem 1.5rem',
//         backgroundColor: '#4CAF50',
//         color: 'white',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         fontSize: '1rem',
//         fontWeight: '600',
//         transition: 'background-color 0.3s',
//     },
//     cancelButton: {
//         padding: '0.75rem 1.5rem',
//         backgroundColor: '#f44336',
//         color: 'white',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         fontSize: '1rem',
//         fontWeight: '600',
//         transition: 'background-color 0.3s',
//     },
// };

// export default EditBlog;












































































//sagar

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// const EditBlog = () => {
//     const { postId } = useParams();
//     const navigate = useNavigate();
//     const [isLoading, setIsLoading] = useState(true);
//     const [isSaving, setIsSaving] = useState(false);
//     const [post, setPost] = useState({
//         title: '',
//         content: '',
//         bannerImage: null,
//         media: [],
//         titleStyles: {
//             bold: false,
//             italic: false,
//             underline: false,
//             fontSize: '24',
//             color: '#000000',
//             backgroundColor: '#ffffff',
//             align: 'left'
//         }
//     });

//     // Helper function to get image URL
//     const getImageUrl = (image) => {
//         if (!image) return null;

//         // If it's a file object with URL (new uploads)
//         if (image.url && image.url.startsWith('blob:')) return image.url;

//         // If it's a string path from backend
//         if (typeof image === 'string') {
//             // Check if it's already a full URL
//             if (image.startsWith('http')) return image;
//             // Construct full URL for backend paths
//             return `${apiBaseUrl}${image}`;
//         }

//         // If backend returns an object with url property
//         if (image.url) {
//             if (image.url.startsWith('http')) return image.url;
//             return `${apiBaseUrl}${image.url}`;
//         }

//         // If backend returns an object with path property
//         if (image.path) {
//             if (image.path.startsWith('http')) return image.path;
//             return `${apiBaseUrl}${image.path}`;
//         }

//         return null;
//     };

//     // Fetch the blog post data
//     useEffect(() => {
//         const fetchPost = async () => {
//             try {
//                 const response = await axios.get(`${apiBaseUrl}/Components/Blog/blogpost/${postId}`);
//                 console.log('API Response:', response.data);

//                 // Handle banner image
//                 const bannerImage = response.data.post.bannerImage
//                     ? response.data.post.bannerImage
//                     : null;

//                 // Handle media files
//                 const media = response.data.post.media || [];

//                 setPost({
//                     title: response.data.post.title || '',
//                     content: response.data.post.plainText || '',
//                     bannerImage,
//                     media,
//                     titleStyles: response.data.post.titleStyles || {
//                         bold: false,
//                         italic: false,
//                         underline: false,
//                         fontSize: '24',
//                         color: '#000000',
//                         backgroundColor: '#ffffff',
//                         align: 'left'
//                     }
//                 });
//             } catch (error) {
//                 console.error('Error fetching post:', error);
//                 toast.error('Failed to load blog post');
//                 navigate('/blog-dashboard');
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchPost();
//     }, [postId, navigate]);

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setPost(prev => ({ ...prev, [name]: value }));
//     };

//     // Handle title style changes
//     const handleStyleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setPost(prev => ({
//             ...prev,
//             titleStyles: {
//                 ...prev.titleStyles,
//                 [name]: type === 'checkbox' ? checked : value
//             }
//         }));
//     };

//     // Handle banner image upload
//     const handleBannerImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setPost(prev => ({
//                 ...prev,
//                 bannerImage: {
//                     url: URL.createObjectURL(file),
//                     file
//                 }
//             }));
//         }
//     };

//     // Handle media files upload
//     const handleMediaChange = (e) => {
//         const files = Array.from(e.target.files);
//         if (files.length > 0) {
//             const newMedia = files.map(file => ({
//                 url: URL.createObjectURL(file),
//                 file
//             }));
//             setPost(prev => ({
//                 ...prev,
//                 media: newMedia // Replace instead of append
//             }));
//         }
//     };

//     // Remove a media file
//     const removeMedia = (index) => {
//         setPost(prev => {
//             const updatedMedia = [...prev.media];
//             updatedMedia.splice(index, 1);
//             return { ...prev, media: updatedMedia };
//         });
//     };

//     // Save the updated post
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSaving(true);

//         try {
//             const formData = new FormData();
//             formData.append('title', post.title);
//             formData.append('content', post.content);
//             formData.append('titleStyles', JSON.stringify(post.titleStyles));

//             if (post.bannerImage?.file) {
//                 formData.append('bannerImage', post.bannerImage.file);
//             } else if (post.bannerImage?.url && !post.bannerImage.url.startsWith('blob:')) {
//                 formData.append('bannerImageUrl', post.bannerImage.url);
//             }

//             // Clear existing media URLs first
//             formData.append('clearExistingMedia', 'true');

//             // Add new media files
//             post.media.forEach((item) => {
//                 if (item.file) {
//                     formData.append('media', item.file);
//                 }
//             });

//             await axios.put(`${apiBaseUrl}/Components/Blog/blogpost/${postId}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             toast.success('Blog post updated successfully!');
//             navigate('/DashboardLayout');
//         } catch (error) {
//             console.error('Error updating post:', error);
//             toast.error('Failed to update blog post');
//         } finally {
//             setIsSaving(false);
//         }
//     };
//     if (isLoading) {
//         return (
//             <div style={styles.loadingContainer}>
//                 <div style={styles.spinner}></div>
//                 <p>Loading blog post...</p>
//             </div>
//         );
//     }

//     return (
//         <div style={styles.container}>
//             <h1 style={styles.heading}>Edit Blog Post</h1>

//             <form onSubmit={handleSubmit} style={styles.form}>
//                 {/* Title Section */}
//                 <div style={styles.section}>
//                     <label style={styles.label}>Title</label>
//                     <input
//                         type="text"
//                         name="title"
//                         value={post.title}
//                         onChange={handleChange}
//                         style={styles.input}
//                         required
//                     />
//                 </div>

//                 {/* Title Styles Section */}
//                 <div style={styles.section}>
//                     <label style={styles.label}>Title Styles</label>
//                     <div style={styles.styleControls}>
//                         <label style={styles.checkboxLabel}>
//                             <input
//                                 type="checkbox"
//                                 name="bold"
//                                 checked={post.titleStyles.bold}
//                                 onChange={handleStyleChange}
//                             />
//                             Bold
//                         </label>
//                         <label style={styles.checkboxLabel}>
//                             <input
//                                 type="checkbox"
//                                 name="italic"
//                                 checked={post.titleStyles.italic}
//                                 onChange={handleStyleChange}
//                             />
//                             Italic
//                         </label>
//                         <label style={styles.checkboxLabel}>
//                             <input
//                                 type="checkbox"
//                                 name="underline"
//                                 checked={post.titleStyles.underline}
//                                 onChange={handleStyleChange}
//                             />
//                             Underline
//                         </label>

//                         <div style={styles.styleInputGroup}>
//                             <label style={styles.smallLabel}>Font Size:</label>
//                             <input
//                                 type="number"
//                                 name="fontSize"
//                                 value={post.titleStyles.fontSize}
//                                 onChange={handleStyleChange}
//                                 style={styles.smallInput}
//                                 min="10"
//                                 max="72"
//                             />
//                         </div>

//                         <div style={styles.styleInputGroup}>
//                             <label style={styles.smallLabel}>Color:</label>
//                             <input
//                                 type="color"
//                                 name="color"
//                                 value={post.titleStyles.color}
//                                 onChange={handleStyleChange}
//                                 style={styles.colorInput}
//                             />
//                         </div>

//                         <div style={styles.styleInputGroup}>
//                             <label style={styles.smallLabel}>Align:</label>
//                             <select
//                                 name="align"
//                                 value={post.titleStyles.align}
//                                 onChange={handleStyleChange}
//                                 style={styles.selectInput}
//                             >
//                                 <option value="left">Left</option>
//                                 <option value="center">Center</option>
//                                 <option value="right">Right</option>
//                             </select>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Content Section */}
//                 <div style={styles.section}>
//                     <label style={styles.label}>Content</label>
//                     <textarea
//                         name="content"
//                         value={post.content}
//                         onChange={handleChange}
//                         style={styles.textarea}
//                         rows="10"
//                         required
//                     />
//                 </div>

//                 {/* Banner Image Section */}
//                 <div style={styles.section}>
//                     <label style={styles.label}>Banner Image</label>
//                     {post.bannerImage && (
//                         <div style={styles.imagePreviewContainer}>
//                             <img
//                                 src={getImageUrl(post.bannerImage)}
//                                 alt="Banner Preview"
//                                 style={styles.imagePreview}
//                                 onError={(e) => {
//                                     e.target.onerror = null;
//                                     e.target.style.display = 'none';
//                                 }}
//                             />
//                         </div>
//                     )}
//                     <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleBannerImageChange}
//                         style={styles.fileInput}
//                     />
//                 </div>

//                 {/* Media Files Section */}
//                 <div style={styles.section}>
//                     <label style={styles.label}>Media Files</label>
//                     <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
//                         Selecting new files will replace all existing media
//                     </p>
//                     <div style={styles.mediaGrid}>
//                         {post.media.map((item, index) => (
//                             <div key={index} style={styles.mediaItem}>
//                                 {getImageUrl(item) ? (
//                                     <img
//                                         src={getImageUrl(item)}
//                                         alt={`Media ${index}`}
//                                         style={styles.mediaPreview}
//                                         onError={(e) => {
//                                             e.target.onerror = null;
//                                             e.target.style.display = 'none';
//                                         }}
//                                     />
//                                 ) : (
//                                     <div style={styles.filePreview}>
//                                         {item.url ? item.url.split('/').pop() : item.file?.name || 'Media'}
//                                     </div>
//                                 )}
//                                 <button
//                                     type="button"
//                                     onClick={() => removeMedia(index)}
//                                     style={styles.removeButton}
//                                 >
//                                     Remove
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                     <input
//                         type="file"
//                         multiple
//                         onChange={handleMediaChange}
//                         style={styles.fileInput}
//                     />
//                 </div>

//                 {/* Action Buttons */}
//                 <div style={styles.buttonGroup}>
//                     <button
//                         type="submit"
//                         style={styles.submitButton}
//                         disabled={isSaving}
//                     >
//                         {isSaving ? 'Saving...' : 'Save Changes'}
//                     </button>
//                     <button
//                         type="button"
//                         onClick={() => navigate('/DashboardLayout')}
//                         style={styles.cancelButton}
//                     >
//                         Cancel
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// const styles = {
//     container: {
//         padding: '2rem',
//         maxWidth: '1000px',
//         margin: '0 auto',
//         fontFamily: 'Arial, sans-serif',
//     },
//     loadingContainer: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100vh',
//     },
//     spinner: {
//         border: '4px solid rgba(0, 0, 0, 0.1)',
//         width: '36px',
//         height: '36px',
//         borderRadius: '50%',
//         borderLeftColor: '#09f',
//         animation: 'spin 1s linear infinite',
//         marginBottom: '1rem',
//     },
//     heading: {
//         fontSize: '2rem',
//         marginBottom: '2rem',
//         color: '#333',
//         textAlign: 'center',
//     },
//     form: {
//         backgroundColor: '#fff',
//         padding: '2rem',
//         borderRadius: '8px',
//         boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//     },
//     section: {
//         marginBottom: '1.5rem',
//     },
//     label: {
//         display: 'block',
//         marginBottom: '0.5rem',
//         fontWeight: '600',
//         color: '#444',
//     },
//     smallLabel: {
//         fontSize: '0.8rem',
//         marginRight: '0.5rem',
//         color: '#666',
//     },
//     input: {
//         width: '100%',
//         padding: '0.75rem',
//         border: '1px solid #ddd',
//         borderRadius: '4px',
//         fontSize: '1rem',
//         marginBottom: '1rem',
//     },
//     textarea: {
//         width: '100%',
//         padding: '0.75rem',
//         border: '1px solid #ddd',
//         borderRadius: '4px',
//         fontSize: '1rem',
//         minHeight: '200px',
//         resize: 'vertical',
//     },
//     styleControls: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         gap: '1rem',
//         alignItems: 'center',
//         marginBottom: '1rem',
//     },
//     checkboxLabel: {
//         display: 'flex',
//         alignItems: 'center',
//         gap: '0.5rem',
//         cursor: 'pointer',
//     },
//     styleInputGroup: {
//         display: 'flex',
//         alignItems: 'center',
//     },
//     smallInput: {
//         width: '60px',
//         padding: '0.5rem',
//         border: '1px solid #ddd',
//         borderRadius: '4px',
//     },
//     colorInput: {
//         width: '40px',
//         height: '40px',
//         padding: '0',
//         border: '1px solid #ddd',
//         borderRadius: '4px',
//         cursor: 'pointer',
//     },
//     selectInput: {
//         padding: '0.5rem',
//         border: '1px solid #ddd',
//         borderRadius: '4px',
//         cursor: 'pointer',
//     },
//     imagePreviewContainer: {
//         marginBottom: '1rem',
//     },
//     imagePreview: {
//         maxWidth: '100%',
//         maxHeight: '300px',
//         borderRadius: '4px',
//         border: '1px solid #ddd',
//     },
//     fileInput: {
//         width: '100%',
//         marginBottom: '1rem',
//     },
//     mediaGrid: {
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
//         gap: '1rem',
//         marginBottom: '1rem',
//     },
//     mediaItem: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         gap: '0.5rem',
//     },
//     mediaPreview: {
//         width: '100%',
//         height: '100px',
//         objectFit: 'cover',
//         borderRadius: '4px',
//         border: '1px solid #ddd',
//     },
//     filePreview: {
//         padding: '0.5rem',
//         border: '1px solid #ddd',
//         borderRadius: '4px',
//         width: '100%',
//         textAlign: 'center',
//         wordBreak: 'break-all',
//     },
//     removeButton: {
//         padding: '0.25rem 0.5rem',
//         backgroundColor: '#f44336',
//         color: 'white',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         fontSize: '0.8rem',
//     },
//     buttonGroup: {
//         display: 'flex',
//         justifyContent: 'flex-end',
//         gap: '1rem',
//         marginTop: '2rem',
//     },
//     submitButton: {
//         padding: '0.75rem 1.5rem',
//         backgroundColor: '#4CAF50',
//         color: 'white',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         fontSize: '1rem',
//         fontWeight: '600',
//         transition: 'background-color 0.3s',
//     },
//     cancelButton: {
//         padding: '0.75rem 1.5rem',
//         backgroundColor: '#f44336',
//         color: 'white',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         fontSize: '1rem',
//         fontWeight: '600',
//         transition: 'background-color 0.3s',
//     },
// };

// export default EditBlog;