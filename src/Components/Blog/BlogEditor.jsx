// import React, { useState, useRef } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { 
//   FaBold, FaItalic, FaUnderline, 
//   FaAlignLeft, FaAlignCenter, FaAlignRight,
//   FaLink, FaImage, FaVideo, FaTrash, FaEdit,
//   FaEllipsisV
// } from 'react-icons/fa';
// import { v4 as uuidv4 } from 'uuid';
// import { useNavigate } from 'react-router-dom';

// const BlogEditor = ({ setPublishedBlogs }) => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [images, setImages] = useState([]);
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [imageUrl, setImageUrl] = useState('');
//   const [showVideoModal, setShowVideoModal] = useState(false);
//   const [videoUrl, setVideoUrl] = useState('');
//   const [activeTab, setActiveTab] = useState('write');
//   const navigate = useNavigate();

//   const modules = {
//     toolbar: {
//       container: [
//         [{ 'header': [1, 2, 3, false] }],
//         ['bold', 'italic', 'underline', 'strike'],
//         [{ 'color': [] }, { 'background': [] }],
//         [{ 'align': [] }],
//         ['link', 'image', 'video'],
//         ['clean']
//       ],
//     }
//   };

//   const formats = [
//     'header',
//     'bold', 'italic', 'underline', 'strike',
//     'color', 'background',
//     'align',
//     'link', 'image', 'video'
//   ];

//   const handleImageUpload = () => {
//     if (!imageUrl) return;
//     const newImage = {
//       id: uuidv4(),
//       url: imageUrl,
//       caption: ''
//     };
//     setImages([...images, newImage]);
//     setImageUrl('');
//     setShowImageModal(false);
//   };

//   const handleVideoUpload = () => {
//     if (!videoUrl) return;
//     const newVideo = {
//       id: uuidv4(),
//       url: videoUrl,
//       caption: ''
//     };
//     setImages([...images, newVideo]);
//     setVideoUrl('');
//     setShowVideoModal(false);
//   };

//   const handleDeleteMedia = (id) => {
//     setImages(images.filter(img => img.id !== id));
//   };

//   const handleEditMedia = (id, newCaption) => {
//     setImages(images.map(img => 
//       img.id === id ? { ...img, caption: newCaption } : img
//     ));
//   };

//   const handlePublish = () => {
//     if (!title || !content) {
//       alert('Title and content are required');
//       return;
//     }
    
//     const newBlog = {
//       id: uuidv4(),
//       title,
//       content,
//       images,
//       date: new Date().toISOString(),
//       likes: 0,
//       comments: []
//     };
    
//     setPublishedBlogs(prev => [...prev, newBlog]);
//     alert('Blog published successfully!');
//     navigate(`/blog/${newBlog.id}`);
//   };

//   return (
//     <div className="blog-editor-container">
//       <div className="editor-header">
//         <h2>Create New Blog Post</h2>
//         <div className="tabs">
//           <button 
//             className={activeTab === 'write' ? 'active' : ''}
//             onClick={() => setActiveTab('write')}
//           >
//             Write
//           </button>
//           <button 
//             className={activeTab === 'preview' ? 'active' : ''}
//             onClick={() => setActiveTab('preview')}
//           >
//             Preview
//           </button>
//         </div>
//       </div>

//       <div className="editor-toolbar">
//         <div className="formatting-tools">
//           <button onClick={() => document.execCommand('bold', false, null)}>
//             <FaBold />
//           </button>
//           <button onClick={() => document.execCommand('italic', false, null)}>
//             <FaItalic />
//           </button>
//           <button onClick={() => document.execCommand('underline', false, null)}>
//             <FaUnderline />
//           </button>
//           <select onChange={(e) => document.execCommand('fontSize', false, e.target.value)}>
//             <option value="">Font Size</option>
//             <option value="1">Small</option>
//             <option value="3">Medium</option>
//             <option value="5">Large</option>
//             <option value="7">Extra Large</option>
//           </select>
//           <input 
//             type="color" 
//             onChange={(e) => document.execCommand('foreColor', false, e.target.value)}
//           />
//           <input 
//             type="color" 
//             onChange={(e) => document.execCommand('hiliteColor', false, e.target.value)}
//           />
//           <button onClick={() => document.execCommand('justifyLeft', false, null)}>
//             <FaAlignLeft />
//           </button>
//           <button onClick={() => document.execCommand('justifyCenter', false, null)}>
//             <FaAlignCenter />
//           </button>
//           <button onClick={() => document.execCommand('justifyRight', false, null)}>
//             <FaAlignRight />
//           </button>
//           <button onClick={() => document.execCommand('insertHorizontalRule', false, null)}>
//             Divider
//           </button>
//           <button onClick={() => {
//             const url = prompt('Enter URL:');
//             if (url) document.execCommand('createLink', false, url);
//           }}>
//             <FaLink />
//           </button>
//           <button onClick={() => setShowImageModal(true)}>
//             <FaImage />
//           </button>
//           <button onClick={() => setShowVideoModal(true)}>
//             <FaVideo />
//           </button>
//         </div>
//       </div>

//       <div className="editor-content">
//         <input
//           type="text"
//           placeholder="Blog Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="blog-title-input"
//         />
        
//         {activeTab === 'write' ? (
//           <ReactQuill
//             theme="snow"
//             value={content}
//             onChange={setContent}
//             modules={modules}
//             formats={formats}
//             placeholder="Write your blog content here..."
//           />
//         ) : (
//           <div className="preview-content" dangerouslySetInnerHTML={{ __html: content }} />
//         )}

//         <div className="media-gallery">
//           {images.map((media) => (
//             <div key={media.id} className="media-item">
//               {media.url.includes('youtube') || media.url.includes('vimeo') ? (
//                 <div className="video-container">
//                   <iframe 
//                     src={media.url} 
//                     title={`video-${media.id}`}
//                     frameBorder="0"
//                     allowFullScreen
//                   />
//                 </div>
//               ) : (
//                 <img src={media.url} alt={`blog-${media.id}`} />
//               )}
//               <div className="media-controls">
//                 <input
//                   type="text"
//                   value={media.caption}
//                   onChange={(e) => handleEditMedia(media.id, e.target.value)}
//                   placeholder="Add caption"
//                 />
//                 <button onClick={() => handleDeleteMedia(media.id)}>
//                   <FaTrash />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="editor-actions">
//         <div className="manage-dropdown">
//           <button className="dropdown-toggle">
//             <FaEllipsisV /> Manage
//           </button>
//           <div className="dropdown-menu">
//             <button onClick={() => setActiveTab(activeTab === 'preview' ? 'write' : 'preview')}>
//               {activeTab === 'preview' ? 'Back to Edit' : 'Preview'}
//             </button>
//             <button onClick={handlePublish}>Publish</button>
//           </div>
//         </div>
//       </div>

//       {/* Image Upload Modal */}
//       {showImageModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Insert Image</h3>
//             <input
//               type="text"
//               placeholder="Enter image URL"
//               value={imageUrl}
//               onChange={(e) => setImageUrl(e.target.value)}
//             />
//             <div className="modal-actions">
//               <button onClick={handleImageUpload}>Insert</button>
//               <button onClick={() => setShowImageModal(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Video Upload Modal */}
//       {showVideoModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Insert Video</h3>
//             <input
//               type="text"
//               placeholder="Enter video URL (YouTube/Vimeo)"
//               value={videoUrl}
//               onChange={(e) => setVideoUrl(e.target.value)}
//             />
//             <div className="modal-actions">
//               <button onClick={handleVideoUpload}>Insert</button>
//               <button onClick={() => setShowVideoModal(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogEditor;


// import React, { useState, useRef } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { 
//   FaBold, FaItalic, FaUnderline, 
//   FaAlignLeft, FaAlignCenter, FaAlignRight,
//   FaLink, FaImage, FaVideo, FaTrash, FaEdit,
//   FaEllipsisV
// } from 'react-icons/fa';
// import { v4 as uuidv4 } from 'uuid';
// import { useNavigate } from 'react-router-dom';

// const BlogEditor = ({ setPublishedBlogs }) => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [images, setImages] = useState([]);
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [imageUrl, setImageUrl] = useState('');
//   const [showVideoModal, setShowVideoModal] = useState(false);
//   const [videoUrl, setVideoUrl] = useState('');
//   const [activeTab, setActiveTab] = useState('write');
//   const [titleFormatting, setTitleFormatting] = useState({
//     bold: false,
//     italic: false,
//     underline: false,
//     fontSize: '',
//     color: '#000000',
//     backgroundColor: '#ffffff',
//     align: 'left'
//   });
  
//   const titleRef = useRef(null);
//   const navigate = useNavigate();

//   const modules = {
//     toolbar: {
//       container: [
//         [{ 'header': [1, 2, 3, false] }],
//         ['bold', 'italic', 'underline', 'strike'],
//         [{ 'color': [] }, { 'background': [] }],
//         [{ 'align': [] }],
//         [{ list: "ordered" }, { list: "bullet" }],
//         ['link', 'image', 'video'],
//         ['clean']
//       ],
//     }
//   };

//   const formats = [
//     'header',
//     'bold', 'italic', 'underline', 'strike',
//     'color', 'background',
//     'align',
//     'link', 'image', 'video'
//   ];

//   const applyTitleFormat = (command, value = null) => {
//     if (!titleRef.current) return;
    
//     const element = titleRef.current;
//     const newFormatting = { ...titleFormatting };
    
//     switch (command) {
//       case 'bold':
//         newFormatting.bold = !newFormatting.bold;
//         element.style.fontWeight = newFormatting.bold ? 'bold' : 'normal';
//         break;
//       case 'italic':
//         newFormatting.italic = !newFormatting.italic;
//         element.style.fontStyle = newFormatting.italic ? 'italic' : 'normal';
//         break;
//       case 'underline':
//         newFormatting.underline = !newFormatting.underline;
//         element.style.textDecoration = newFormatting.underline ? 'underline' : 'none';
//         break;
//       case 'fontSize':
//         newFormatting.fontSize = value;
//         element.style.fontSize = value ? `${value}px` : '';
//         break;
//       case 'foreColor':
//         newFormatting.color = value;
//         element.style.color = value;
//         break;
//       case 'hiliteColor':
//         newFormatting.backgroundColor = value;
//         element.style.backgroundColor = value;
//         break;
//       case 'justifyLeft':
//         newFormatting.align = 'left';
//         element.style.textAlign = 'left';
//         break;
//       case 'justifyCenter':
//         newFormatting.align = 'center';
//         element.style.textAlign = 'center';
//         break;
//       case 'justifyRight':
//         newFormatting.align = 'right';
//         element.style.textAlign = 'right';
//         break;
//       default:
//         break;
//     }
    
//     setTitleFormatting(newFormatting);
//   };

//   const handleImageUpload = () => {
//     if (!imageUrl) return;
//     const newImage = {
//       id: uuidv4(),
//       url: imageUrl,
//       caption: ''
//     };
//     setImages([...images, newImage]);
//     setImageUrl('');
//     setShowImageModal(false);
//   };

//   const handleVideoUpload = () => {
//     if (!videoUrl) return;
//     const newVideo = {
//       id: uuidv4(),
//       url: videoUrl,
//       caption: ''
//     };
//     setImages([...images, newVideo]);
//     setVideoUrl('');
//     setShowVideoModal(false);
//   };

//   const handleDeleteMedia = (id) => {
//     setImages(images.filter(img => img.id !== id));
//   };

//   const handleEditMedia = (id, newCaption) => {
//     setImages(images.map(img => 
//       img.id === id ? { ...img, caption: newCaption } : img
//     ));
//   };

//   const handlePublish = () => {
//     if (!title || !content) {
//       alert('Title and content are required');
//       return;
//     }
    
//     const newBlog = {
//       id: uuidv4(),
//       title,
//       content,
//       images,
//       date: new Date().toISOString(),
//       likes: 0,
//       comments: [],
//       titleStyles: titleFormatting
//     };
    
//     setPublishedBlogs(prev => [...prev, newBlog]);
//     alert('Blog published successfully!');
//     navigate(`/blog/${newBlog.id}`);
//   };

//   const handleImageFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const newImage = {
//         id: uuidv4(),
//         url: event.target.result,
//         caption: ''
//       };
//       setImages([...images, newImage]);
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div className="blog-editor-container">
//       <div className="editor-header">
//         <h2>Create New Blog Post</h2>
//         <div className="tabs">
//           <button 
//             className={activeTab === 'write' ? 'active' : ''}
//             onClick={() => setActiveTab('write')}
//           >
//             Write
//           </button>
//           <button 
//             className={activeTab === 'preview' ? 'active' : ''}
//             onClick={() => setActiveTab('preview')}
//           >
//             Preview
//           </button>
//         </div>
//       </div>

//       <div className="editor-toolbar">
//         <div className="formatting-tools">
//           <button 
//             onClick={() => applyTitleFormat('bold')}
//             className={titleFormatting.bold ? 'active' : ''}
//           >
//             <FaBold />
//           </button>
//           <button 
//             onClick={() => applyTitleFormat('italic')}
//             className={titleFormatting.italic ? 'active' : ''}
//           >
//             <FaItalic />
//           </button>
//           <button 
//             onClick={() => applyTitleFormat('underline')}
//             className={titleFormatting.underline ? 'active' : ''}
//           >
//             <FaUnderline />
//           </button>
//           <select 
//             onChange={(e) => applyTitleFormat('fontSize', e.target.value)}
//             value={titleFormatting.fontSize}
//           >
//             <option value="">Font Size</option>
//             <option value="16">Small</option>
//             <option value="24">Medium</option>
//             <option value="32">Large</option>
//             <option value="48">Extra Large</option>
//           </select>
//           <input 
//             type="color" 
//             onChange={(e) => applyTitleFormat('foreColor', e.target.value)}
//             value={titleFormatting.color}
//           />
//           <input 
//             type="color" 
//             onChange={(e) => applyTitleFormat('hiliteColor', e.target.value)}
//             value={titleFormatting.backgroundColor}
//           />
//           <button 
//             onClick={() => applyTitleFormat('justifyLeft')}
//             className={titleFormatting.align === 'left' ? 'active' : ''}
//           >
//             <FaAlignLeft />
//           </button>
//           <button 
//             onClick={() => applyTitleFormat('justifyCenter')}
//             className={titleFormatting.align === 'center' ? 'active' : ''}
//           >
//             <FaAlignCenter />
//           </button>
//           <button 
//             onClick={() => applyTitleFormat('justifyRight')}
//             className={titleFormatting.align === 'right' ? 'active' : ''}
//           >
//             <FaAlignRight />
//           </button>
//         </div>
//       </div>

//       <div className="editor-content">
//         <input
//           ref={titleRef}
//           type="text"
//           placeholder="Blog Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="blog-title-input"
//           style={{
//             fontWeight: titleFormatting.bold ? 'bold' : 'normal',
//             fontStyle: titleFormatting.italic ? 'italic' : 'normal',
//             textDecoration: titleFormatting.underline ? 'underline' : 'none',
//             fontSize: titleFormatting.fontSize ? `${titleFormatting.fontSize}px` : '',
//             color: titleFormatting.color,
//             backgroundColor: titleFormatting.backgroundColor,
//             textAlign: titleFormatting.align
//           }}
//         />
        
//         {activeTab === 'write' ? (
//           <ReactQuill
//             theme="snow"
//             value={content}
//             onChange={setContent}
//             modules={modules}
//             formats={formats}
//             placeholder="Write your blog content here..."
//           />
//         ) : (
//           <div className="preview-content" dangerouslySetInnerHTML={{ __html: content }} />
//         )}

//         <div className="media-gallery">
//           {images.map((media) => (
//             <div key={media.id} className="media-item">
//               {media.url.includes('youtube') || media.url.includes('vimeo') ? (
//                 <div className="video-container">
//                   <iframe 
//                     src={media.url} 
//                     title={`video-${media.id}`}
//                     frameBorder="0"
//                     allowFullScreen
//                   />
//                 </div>
//               ) : (
//                 <>
//                   <img src={media.url} alt={`blog-${media.id}`} />
//                   <div className="image-controls">
//                     <button onClick={() => {
//                       // Resize logic would go here
//                       const newWidth = prompt('Enter new width in pixels:');
//                       if (newWidth) {
//                         const imgElement = document.querySelector(`img[alt="blog-${media.id}"]`);
//                         if (imgElement) imgElement.style.width = `${newWidth}px`;
//                       }
//                     }}>
//                       Resize
//                     </button>
//                   </div>
//                 </>
//               )}
//               <div className="media-controls">
//                 <input
//                   type="text"
//                   value={media.caption}
//                   onChange={(e) => handleEditMedia(media.id, e.target.value)}
//                   placeholder="Add caption"
//                 />
//                 <button onClick={() => handleDeleteMedia(media.id)}>
//                   <FaTrash />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="editor-actions">
//         <div className="manage-dropdown">
//           <button className="dropdown-toggle">
//             <FaEllipsisV /> Manage
//           </button>
//           <div className="dropdown-menu">
//             <button onClick={() => setActiveTab(activeTab === 'preview' ? 'write' : 'preview')}>
//               {activeTab === 'preview' ? 'Back to Edit' : 'Preview'}
//             </button>
//             <button onClick={handlePublish}>Publish</button>
//           </div>
//         </div>
//       </div>

//       {/* Image Upload Modal */}
//       {showImageModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Insert Image</h3>
//             <div className="upload-options">
//               <div className="upload-option">
//                 <h4>Upload from computer</h4>
//                 <input 
//                   type="file" 
//                   accept="image/*" 
//                   onChange={handleImageFileUpload}
//                 />
//               </div>
//               <div className="or-divider">OR</div>
//               <div className="upload-option">
//                 <h4>Enter image URL</h4>
//                 <input
//                   type="text"
//                   placeholder="Enter image URL"
//                   value={imageUrl}
//                   onChange={(e) => setImageUrl(e.target.value)}
//                 />
//                 <button onClick={handleImageUpload}>Insert</button>
//               </div>
//             </div>
//             <div className="modal-actions">
//               <button onClick={() => setShowImageModal(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Video Upload Modal */}
//       {showVideoModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Insert Video</h3>
//             <div className="upload-options">
//               <div className="upload-option">
//                 <h4>Enter video URL (YouTube/Vimeo)</h4>
//                 <input
//                   type="text"
//                   placeholder="Enter video URL"
//                   value={videoUrl}
//                   onChange={(e) => setVideoUrl(e.target.value)}
//                 />
//                 <button onClick={handleVideoUpload}>Insert</button>
//               </div>
//             </div>
//             <div className="modal-actions">
//               <button onClick={() => setShowVideoModal(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogEditor;


// import React, { useState, useRef, useEffect } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { 
//   FaBold, FaItalic, FaUnderline, 
//   FaAlignLeft, FaAlignCenter, FaAlignRight,
//   FaImage, FaVideo, FaTrash,
//   FaEllipsisV, FaListOl, FaListUl, FaPlus, FaMinus
// } from 'react-icons/fa';
// import { v4 as uuidv4 } from 'uuid';
// import { useNavigate } from 'react-router-dom';

// const BlogEditor = ({ setPublishedBlogs }) => {
//   // State for editor content
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [images, setImages] = useState([]);
//   const [bannerImage, setBannerImage] = useState(null);
//   const [activeTab, setActiveTab] = useState('write');
  
//   // State for formatting
//   const [titleFormatting, setTitleFormatting] = useState({
//     bold: false,
//     italic: false,
//     underline: false,
//     fontSize: '24',
//     color: '#000000',
//     backgroundColor: '#ffffff',
//     align: 'left'
//   });

//   // State for modals and settings
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [showVideoModal, setShowVideoModal] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [imageUrl, setImageUrl] = useState('');
//   const [videoUrl, setVideoUrl] = useState('');
//   const [seoTitle, setSeoTitle] = useState('');
//   const [seoDescription, setSeoDescription] = useState('');
//   const [urlSlug, setUrlSlug] = useState('');
//   const [fontSize, setFontSize] = useState(16);

//   // Refs
//   const titleRef = useRef(null);
//   const navigate = useNavigate();

//   // Generate URL slug from title
//   useEffect(() => {
//     if (title) {
//       const generatedSlug = title.toLowerCase()
//         .replace(/\s+/g, '-')
//         .replace(/[^\w-]+/g, '');
//       setUrlSlug(generatedSlug);
//     }
//   }, [title]);

//   // Quill modules configuration
//   const modules = {
//     toolbar: {
//       container: [
//         [{ 'header': [1, 2, 3, false] }],
//         ['bold', 'italic', 'underline', 'strike'],
//         [{ 'color': [] }, { 'background': [] }],
//         [{ 'align': [] }],
//         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//         ['link', 'image', 'video'],
//         ['clean']
//       ],
//     }
//   };

//   const formats = [
//     'header',
//     'bold', 'italic', 'underline', 'strike',
//     'color', 'background',
//     'align',
//     'list', 'bullet',
//     'link', 'image', 'video'
//   ];

//   // Apply formatting to title
//   const applyTitleFormat = (command, value = null) => {
//     if (!titleRef.current) return;
    
//     const element = titleRef.current;
//     const newFormatting = { ...titleFormatting };
    
//     switch (command) {
//       case 'bold':
//         newFormatting.bold = !newFormatting.bold;
//         element.style.fontWeight = newFormatting.bold ? 'bold' : 'normal';
//         break;
//       case 'italic':
//         newFormatting.italic = !newFormatting.italic;
//         element.style.fontStyle = newFormatting.italic ? 'italic' : 'normal';
//         break;
//       case 'underline':
//         newFormatting.underline = !newFormatting.underline;
//         element.style.textDecoration = newFormatting.underline ? 'underline' : 'none';
//         break;
//       case 'fontSize':
//         newFormatting.fontSize = value;
//         element.style.fontSize = value ? `${value}px` : '';
//         break;
//       case 'foreColor':
//         newFormatting.color = value;
//         element.style.color = value;
//         break;
//       case 'hiliteColor':
//         newFormatting.backgroundColor = value;
//         element.style.backgroundColor = value;
//         break;
//       case 'justifyLeft':
//         newFormatting.align = 'left';
//         element.style.textAlign = 'left';
//         break;
//       case 'justifyCenter':
//         newFormatting.align = 'center';
//         element.style.textAlign = 'center';
//         break;
//       case 'justifyRight':
//         newFormatting.align = 'right';
//         element.style.textAlign = 'right';
//         break;
//       default:
//         break;
//     }
    
//     setTitleFormatting(newFormatting);
//   };

//   // Increase/decrease font size with numbered values
//   const adjustFontSize = (increase = true) => {
//     const currentSize = parseInt(titleFormatting.fontSize) || 16;
//     const newSize = increase ? currentSize + 2 : Math.max(12, currentSize - 2);
//     applyTitleFormat('fontSize', newSize.toString());
//   };

//   // Handle image upload
//   const handleImageUpload = () => {
//     if (!imageUrl) return;
//     const newImage = {
//       id: uuidv4(),
//       url: imageUrl,
//       caption: ''
//     };
//     setImages([...images, newImage]);
//     setImageUrl('');
//     setShowImageModal(false);
//   };

//   // Handle video upload
//   const handleVideoUpload = () => {
//     if (!videoUrl) return;
//     const newVideo = {
//       id: uuidv4(),
//       url: videoUrl,
//       caption: ''
//     };
//     setImages([...images, newVideo]);
//     setVideoUrl('');
//     setShowVideoModal(false);
//   };

//   // Handle file upload
//   const handleImageFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const newImage = {
//         id: uuidv4(),
//         url: event.target.result,
//         caption: ''
//       };
//       setImages([...images, newImage]);
//     };
//     reader.readAsDataURL(file);
//   };

//   // Handle banner image upload
//   const handleBannerUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       setBannerImage(event.target.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   // Handle media deletion
//   const handleDeleteMedia = (id) => {
//     setImages(images.filter(img => img.id !== id));
//   };

//   // Handle media caption edit
//   const handleEditMedia = (id, newCaption) => {
//     setImages(images.map(img => 
//       img.id === id ? { ...img, caption: newCaption } : img
//     ));
//   };

//   // Save settings
//   const handleSaveSettings = () => {
//     // In a real app, you would save these to your backend
//     console.log('SEO Settings:', { seoTitle, seoDescription });
//     console.log('URL Slug:', urlSlug);
    
//     setShowSettings(false);
//     alert('Settings saved successfully!');
//   };

//   // Publish blog
//   const handlePublish = () => {
//     if (!title || !content) {
//       alert('Title and content are required');
//       return;
//     }
    
//     const newBlog = {
//       id: uuidv4(),
//       title,
//       content,
//       images,
//       bannerImage,
//       seoTitle,
//       seoDescription,
//       urlSlug,
//       date: new Date().toISOString(),
//       likes: 0,
//       comments: [],
//       titleStyles: titleFormatting
//     };
    
//     setPublishedBlogs(prev => [...prev, newBlog]);
//     alert('Blog published successfully!');
//     navigate(`/blog/${newBlog.id}`);
//   };

//   return (
//     <div className="blog-editor-container">
//       <div className="editor-header">
//         <h2>Create New Blog Post</h2>
//         <div className="tabs">
//           <button 
//             className={activeTab === 'write' ? 'active' : ''}
//             onClick={() => setActiveTab('write')}
//           >
//             Write
//           </button>
//           <button 
//             className={activeTab === 'preview' ? 'active' : ''}
//             onClick={() => setActiveTab('preview')}
//           >
//             Preview
//           </button>
//         </div>
//       </div>

//       {/* Banner Image Upload */}
//       <div className="banner-upload-container">
//         <input
//           type="file"
//           id="banner-upload"
//           accept="image/*"
//           onChange={handleBannerUpload}
//           style={{ display: 'none' }}
//         />
//         <label htmlFor="banner-upload" className="banner-upload-btn">
//           {bannerImage ? 'Change Banner Image' : 'Upload Banner Image'}
//         </label>
//         {bannerImage && (
//           <div className="banner-preview">
//             <img src={bannerImage} alt="Banner preview" />
//             <button 
//               className="remove-banner"
//               onClick={() => setBannerImage(null)}
//             >
//               ×
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Editor Toolbar */}
//       <div className="editor-toolbar">
//         <div className="formatting-tools">
//           {/* Text Formatting */}
//           <div className="tool-group">
//             <button 
//               onClick={() => applyTitleFormat('bold')}
//               className={titleFormatting.bold ? 'active' : ''}
//               title="Bold"
//             >
//               <FaBold />
//             </button>
//             <button 
//               onClick={() => applyTitleFormat('italic')}
//               className={titleFormatting.italic ? 'active' : ''}
//               title="Italic"
//             >
//               <FaItalic />
//             </button>
//             <button 
//               onClick={() => applyTitleFormat('underline')}
//               className={titleFormatting.underline ? 'active' : ''}
//               title="Underline"
//             >
//               <FaUnderline />
//             </button>
//           </div>

//           <div className="divider"></div>

//           {/* Font Size with Numbered Controls */}
//           <div className="tool-group">
//             <button 
//               onClick={() => adjustFontSize(false)}
//               title="Decrease Font Size"
//             >
//               <FaMinus />
//             </button>
//             <span className="font-size-display">
//               {titleFormatting.fontSize || '16'}px
//             </span>
//             <button 
//               onClick={() => adjustFontSize(true)}
//               title="Increase Font Size"
//             >
//               <FaPlus />
//             </button>
//           </div>

//           <div className="divider"></div>

//           {/* Colors */}
//           <div className="tool-group">
//             <input 
//               type="color" 
//               onChange={(e) => applyTitleFormat('foreColor', e.target.value)}
//               value={titleFormatting.color}
//               title="Text Color"
//             />
//             <input 
//               type="color" 
//               onChange={(e) => applyTitleFormat('hiliteColor', e.target.value)}
//               value={titleFormatting.backgroundColor}
//               title="Background Color"
//             />
//           </div>

//           <div className="divider"></div>

//           {/* Alignment */}
//           <div className="tool-group">
//             <button 
//               onClick={() => applyTitleFormat('justifyLeft')}
//               className={titleFormatting.align === 'left' ? 'active' : ''}
//               title="Align Left"
//             >
//               <FaAlignLeft />
//             </button>
//             <button 
//               onClick={() => applyTitleFormat('justifyCenter')}
//               className={titleFormatting.align === 'center' ? 'active' : ''}
//               title="Align Center"
//             >
//               <FaAlignCenter />
//             </button>
//             <button 
//               onClick={() => applyTitleFormat('justifyRight')}
//               className={titleFormatting.align === 'right' ? 'active' : ''}
//               title="Align Right"
//             >
//               <FaAlignRight />
//             </button>
//           </div>

//           <div className="divider"></div>

//           {/* Lists */}
//           <div className="tool-group">
//             <button 
//               onClick={() => document.execCommand('insertOrderedList')}
//               title="Numbered List"
//             >
//               <FaListOl />
//             </button>
//             <button 
//               onClick={() => document.execCommand('insertUnorderedList')}
//               title="Bulleted List"
//             >
//               <FaListUl />
//             </button>
//           </div>

//           <div className="divider"></div>

//           {/* Media */}
//           <div className="tool-group">
//             <button onClick={() => setShowImageModal(true)} title="Add Image">
//               <FaImage />
//             </button>
//             <button onClick={() => setShowVideoModal(true)} title="Add Video">
//               <FaVideo />
//             </button>
//           </div>
//         </div>

//         {/* Settings Card */}
//         <div className="settings-card">
//           <button 
//             className="settings-toggle"
//             onClick={() => setShowSettings(!showSettings)}
//           >
//             <FaEllipsisV /> Settings
//           </button>
          
//           {showSettings && (
//             <div className="settings-dropdown">
//               <div className="settings-section">
//                 <h4>SEO Settings</h4>
//                 <div className="form-group">
//                   <label>SEO Title</label>
//                   <input
//                     type="text"
//                     value={seoTitle}
//                     onChange={(e) => setSeoTitle(e.target.value)}
//                     placeholder="SEO Title (60 characters max)"
//                     maxLength="60"
//                   />
//                   <div className="char-count">{seoTitle.length}/60</div>
//                 </div>
//                 <div className="form-group">
//                   <label>SEO Description</label>
//                   <textarea
//                     value={seoDescription}
//                     onChange={(e) => setSeoDescription(e.target.value)}
//                     placeholder="SEO Description (160 characters max)"
//                     maxLength="160"
//                   />
//                   <div className="char-count">{seoDescription.length}/160</div>
//                 </div>
//               </div>
              
//               <div className="settings-section">
//                 <h4>URL Settings</h4>
//                 <div className="form-group">
//                   <label>Custom URL</label>
//                   <div className="url-preview">
//                     <span>https://yourblog.com/</span>
//                     <input
//                       type="text"
//                       value={urlSlug}
//                       onChange={(e) => setUrlSlug(e.target.value)}
//                       placeholder="custom-url"
//                     />
//                   </div>
//                 </div>
//               </div>
              
//               <button className="save-settings-btn" onClick={handleSaveSettings}>
//                 Save Settings
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Editor Content */}
//       <div className="editor-content">
//         <input
//           ref={titleRef}
//           type="text"
//           placeholder="Blog Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="blog-title-input"
//           style={{
//             fontWeight: titleFormatting.bold ? 'bold' : 'normal',
//             fontStyle: titleFormatting.italic ? 'italic' : 'normal',
//             textDecoration: titleFormatting.underline ? 'underline' : 'none',
//             fontSize: titleFormatting.fontSize ? `${titleFormatting.fontSize}px` : '',
//             color: titleFormatting.color,
//             backgroundColor: titleFormatting.backgroundColor,
//             textAlign: titleFormatting.align
//           }}
//         />
        
//         {activeTab === 'write' ? (
//           <ReactQuill
//             theme="snow"
//             value={content}
//             onChange={setContent}
//             modules={modules}
//             formats={formats}
//             placeholder="Write your blog content here..."
//           />
//         ) : (
//           <div className="preview-content" dangerouslySetInnerHTML={{ __html: content }} />
//         )}

//         <div className="media-gallery">
//           {images.map((media) => (
//             <div key={media.id} className="media-item">
//               {media.url.includes('youtube') || media.url.includes('vimeo') ? (
//                 <div className="video-container">
//                   <iframe 
//                     src={media.url} 
//                     title={`video-${media.id}`}
//                     frameBorder="0"
//                     allowFullScreen
//                   />
//                 </div>
//               ) : (
//                 <>
//                   <img src={media.url} alt={`blog-${media.id}`} />
//                   <div className="image-controls">
//                     <button onClick={() => {
//                       const newWidth = prompt('Enter new width in pixels:');
//                       if (newWidth) {
//                         const imgElement = document.querySelector(`img[alt="blog-${media.id}"]`);
//                         if (imgElement) imgElement.style.width = `${newWidth}px`;
//                       }
//                     }}>
//                       Resize
//                     </button>
//                   </div>
//                 </>
//               )}
//               <div className="media-controls">
//                 <input
//                   type="text"
//                   value={media.caption}
//                   onChange={(e) => handleEditMedia(media.id, e.target.value)}
//                   placeholder="Add caption"
//                 />
//                 <button onClick={() => handleDeleteMedia(media.id)}>
//                   <FaTrash />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Editor Actions */}
//       <div className="editor-actions">
//         <button 
//           className="publish-btn"
//           onClick={handlePublish}
//         >
//           Publish Blog
//         </button>
//       </div>

//       {/* Image Upload Modal */}
//       {showImageModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Insert Image</h3>
//             <div className="upload-options">
//               <div className="upload-option">
//                 <h4>Upload from computer</h4>
//                 <input 
//                   type="file" 
//                   accept="image/*" 
//                   onChange={handleImageFileUpload}
//                 />
//               </div>
//               <div className="or-divider">OR</div>
//               <div className="upload-option">
//                 <h4>Enter image URL</h4>
//                 <input
//                   type="text"
//                   placeholder="Enter image URL"
//                   value={imageUrl}
//                   onChange={(e) => setImageUrl(e.target.value)}
//                 />
//                 <button onClick={handleImageUpload}>Insert</button>
//               </div>
//             </div>
//             <div className="modal-actions">
//               <button onClick={() => setShowImageModal(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Video Upload Modal */}
//       {showVideoModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Insert Video</h3>
//             <div className="upload-options">
//               <div className="upload-option">
//                 <h4>Enter video URL (YouTube/Vimeo)</h4>
//                 <input
//                   type="text"
//                   placeholder="Enter video URL"
//                   value={videoUrl}
//                   onChange={(e) => setVideoUrl(e.target.value)}
//                 />
//                 <button onClick={handleVideoUpload}>Insert</button>
//               </div>
//             </div>
//             <div className="modal-actions">
//               <button onClick={() => setShowVideoModal(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogEditor;









// import React, { useState, useRef, useEffect } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { 
//   FaBold, FaItalic, FaUnderline, 
//   FaAlignLeft, FaAlignCenter, FaAlignRight,
//   FaImage, FaVideo, FaTrash,
//   FaEllipsisV, FaListOl, FaListUl, FaPlus, FaMinus
// } from 'react-icons/fa';
// import { v4 as uuidv4 } from 'uuid';
// import { useNavigate } from 'react-router-dom';

// const BlogEditor = ({ setPublishedBlogs, blogs }) => {
//   // State for editor content
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [media, setMedia] = useState([]);
//   const [bannerImage, setBannerImage] = useState(null);
//   const [activeTab, setActiveTab] = useState('write');
  
//   // State for formatting
//   const [titleFormatting, setTitleFormatting] = useState({
//     bold: false,
//     italic: false,
//     underline: false,
//     fontSize: '24',
//     color: '#000000',
//     backgroundColor: '#ffffff',
//     align: 'left'
//   });

//   // State for modals and settings
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [showVideoModal, setShowVideoModal] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [imageUrl, setImageUrl] = useState('');
//   const [videoUrl, setVideoUrl] = useState('');
//   const [seoTitle, setSeoTitle] = useState('');
//   const [seoDescription, setSeoDescription] = useState('');
//   const [urlSlug, setUrlSlug] = useState('');
//   const [urlError, setUrlError] = useState('');
//   const [mediaSize, setMediaSize] = useState({});

//   // Refs
//   const titleRef = useRef(null);
//   const navigate = useNavigate();

//   // Generate URL slug from title and check for uniqueness
//   useEffect(() => {
//     if (title) {
//       const generatedSlug = title.toLowerCase()
//         .replace(/\s+/g, '-')
//         .replace(/[^\w-]+/g, '');
//       setUrlSlug(generatedSlug);
      
//       // Check if URL is already taken
//       if (blogs.some(blog => blog.urlSlug === generatedSlug)) {
//         setUrlError('This URL is already taken. Please customize it.');
//       } else {
//         setUrlError('');
//       }
//     }
//   }, [title, blogs]);

//   // Quill modules configuration
//   const modules = {
//     toolbar: {
//       container: [
//         [{ 'header': [1, 2, 3, false] }],
//         ['bold', 'italic', 'underline', 'strike'],
//         [{ 'color': [] }, { 'background': [] }],
//         [{ 'align': [] }],
//         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//         ['link', 'image', 'video'],
//         ['clean']
//       ],
//     }
//   };

//   const formats = [
//     'header',
//     'bold', 'italic', 'underline', 'strike',
//     'color', 'background',
//     'align',
//     'list', 'bullet',
//     'link', 'image', 'video'
//   ];

//   // Apply formatting to title
//   const applyTitleFormat = (command, value = null) => {
//     if (!titleRef.current) return;
    
//     const element = titleRef.current;
//     const newFormatting = { ...titleFormatting };
    
//     switch (command) {
//       case 'bold':
//         newFormatting.bold = !newFormatting.bold;
//         element.style.fontWeight = newFormatting.bold ? 'bold' : 'normal';
//         break;
//       case 'italic':
//         newFormatting.italic = !newFormatting.italic;
//         element.style.fontStyle = newFormatting.italic ? 'italic' : 'normal';
//         break;
//       case 'underline':
//         newFormatting.underline = !newFormatting.underline;
//         element.style.textDecoration = newFormatting.underline ? 'underline' : 'none';
//         break;
//       case 'fontSize':
//         newFormatting.fontSize = value;
//         element.style.fontSize = value ? `${value}px` : '';
//         break;
//       case 'foreColor':
//         newFormatting.color = value;
//         element.style.color = value;
//         break;
//       case 'hiliteColor':
//         newFormatting.backgroundColor = value;
//         element.style.backgroundColor = value;
//         break;
//       case 'justifyLeft':
//         newFormatting.align = 'left';
//         element.style.textAlign = 'left';
//         break;
//       case 'justifyCenter':
//         newFormatting.align = 'center';
//         element.style.textAlign = 'center';
//         break;
//       case 'justifyRight':
//         newFormatting.align = 'right';
//         element.style.textAlign = 'right';
//         break;
//       default:
//         break;
//     }
    
//     setTitleFormatting(newFormatting);
//   };

//   // Increase/decrease font size with numbered values
//   const adjustFontSize = (increase = true) => {
//     const currentSize = parseInt(titleFormatting.fontSize) || 16;
//     const newSize = increase ? currentSize + 2 : Math.max(12, currentSize - 2);
//     applyTitleFormat('fontSize', newSize.toString());
//   };

//   // Handle image upload
//   const handleImageUpload = () => {
//     if (!imageUrl) return;
//     const newImage = {
//       id: uuidv4(),
//       url: imageUrl,
//       caption: '',
//       type: 'image',
//       width: '100%'
//     };
//     setMedia([...media, newImage]);
//     setMediaSize(prev => ({ ...prev, [newImage.id]: '100%' }));
//     setImageUrl('');
//     setShowImageModal(false);
//   };

//   // Handle video upload
//   const handleVideoUpload = () => {
//     if (!videoUrl) return;
    
//     // Convert YouTube URL to embed format if needed
//     let embedUrl = videoUrl;
//     if (videoUrl.includes('youtube.com/watch')) {
//       const videoId = videoUrl.split('v=')[1].split('&')[0];
//       embedUrl = `https://www.youtube.com/embed/${videoId}`;
//     } else if (videoUrl.includes('vimeo.com')) {
//       const videoId = videoUrl.split('vimeo.com/')[1].split('?')[0];
//       embedUrl = `https://player.vimeo.com/video/${videoId}`;
//     }
    
//     const newVideo = {
//       id: uuidv4(),
//       url: embedUrl,
//       caption: '',
//       type: 'video',
//       width: '100%'
//     };
//     setMedia([...media, newVideo]);
//     setMediaSize(prev => ({ ...prev, [newVideo.id]: '100%' }));
//     setVideoUrl('');
//     setShowVideoModal(false);
//   };

//   // Handle file upload
//   const handleImageFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const newImage = {
//         id: uuidv4(),
//         url: event.target.result,
//         caption: '',
//         type: 'image',
//         width: '100%'
//       };
//       setMedia([...media, newImage]);
//       setMediaSize(prev => ({ ...prev, [newImage.id]: '100%' }));
//     };
//     reader.readAsDataURL(file);
//   };

//   // Handle banner image upload
//   const handleBannerUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       setBannerImage(event.target.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   // Handle media deletion
//   const handleDeleteMedia = (id) => {
//     setMedia(media.filter(item => item.id !== id));
//   };

//   // Handle media caption edit
//   const handleEditMedia = (id, newCaption) => {
//     setMedia(media.map(item => 
//       item.id === id ? { ...item, caption: newCaption } : item
//     ));
//   };

//   // Handle media resize
//   const handleResizeMedia = (id) => {
//     const newWidth = prompt('Enter new width (in pixels or percentage, e.g. "500px" or "50%"):');
//     if (newWidth && (newWidth.endsWith('px') || newWidth.endsWith('%'))) {
//       setMedia(media.map(item => 
//         item.id === id ? { ...item, width: newWidth } : item
//       ));
//       setMediaSize(prev => ({ ...prev, [id]: newWidth }));
//     } else if (newWidth) {
//       alert('Please include "px" or "%" in your width value');
//     }
//   };

//   // Save settings
//   const handleSaveSettings = () => {
//     if (urlError) {
//       alert('Please fix the URL error before saving');
//       return;
//     }
    
//     console.log('SEO Settings:', { seoTitle, seoDescription });
//     console.log('URL Slug:', urlSlug);
    
//     setShowSettings(false);
//     alert('Settings saved successfully!');
//   };

//   // Validate URL slug
//   const validateUrlSlug = (slug) => {
//     if (!slug) return 'URL cannot be empty';
//     if (!/^[a-z0-9-]+$/.test(slug)) return 'URL can only contain lowercase letters, numbers and hyphens';
//     if (blogs.some(blog => blog.urlSlug === slug)) return 'This URL is already taken';
//     return '';
//   };

//   // Publish blog
//   const handlePublish = () => {
//     if (!title || !content) {
//       alert('Title and content are required');
//       return;
//     }
    
//     const urlValidationError = validateUrlSlug(urlSlug);
//     if (urlValidationError) {
//       setUrlError(urlValidationError);
//       alert(`URL Error: ${urlValidationError}`);
//       return;
//     }
    
//     const newBlog = {
//       id: uuidv4(),
//       title,
//       content,
//       media,
//       bannerImage,
//       seoTitle: seoTitle || title,
//       seoDescription: seoDescription || content.substring(0, 160),
//       urlSlug,
//       date: new Date().toISOString(),
//       likes: 0,
//       comments: [],
//       titleStyles: titleFormatting
//     };
    
//     setPublishedBlogs(prev => [...prev, newBlog]);
//     alert('Blog published successfully!');
//     navigate(`/blog/${urlSlug}`);
//   };

//   return (
//     <div className="blog-editor-container">
//       <div className="editor-header">
//         <h2>Create New Blog Post</h2>
//         <div className="tabs">
//           <button 
//             className={activeTab === 'write' ? 'active' : ''}
//             onClick={() => setActiveTab('write')}
//           >
//             Write
//           </button>
//           <button 
//             className={activeTab === 'preview' ? 'active' : ''}
//             onClick={() => setActiveTab('preview')}
//           >
//             Preview
//           </button>
//         </div>
//       </div>

//       {/* Banner Image Upload */}
//       <div className="banner-upload-container">
//         <input
//           type="file"
//           id="banner-upload"
//           accept="image/*"
//           onChange={handleBannerUpload}
//           style={{ display: 'none' }}
//         />
//         <label htmlFor="banner-upload" className="banner-upload-btn">
//           {bannerImage ? 'Change Banner Image' : 'Upload Banner Image'}
//         </label>
//         {bannerImage && (
//           <div className="banner-preview">
//             <img src={bannerImage} alt="Banner preview" />
//             <button 
//               className="remove-banner"
//               onClick={() => setBannerImage(null)}
//             >
//               ×
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Editor Toolbar */}
//       <div className="editor-toolbar">
//         <div className="formatting-tools">
//           {/* Text Formatting */}
//           <div className="tool-group">
//             <button 
//               onClick={() => applyTitleFormat('bold')}
//               className={titleFormatting.bold ? 'active' : ''}
//               title="Bold"
//             >
//               <FaBold />
//             </button>
//             <button 
//               onClick={() => applyTitleFormat('italic')}
//               className={titleFormatting.italic ? 'active' : ''}
//               title="Italic"
//             >
//               <FaItalic />
//             </button>
//             <button 
//               onClick={() => applyTitleFormat('underline')}
//               className={titleFormatting.underline ? 'active' : ''}
//               title="Underline"
//             >
//               <FaUnderline />
//             </button>
//           </div>

//           <div className="divider"></div>

//           {/* Font Size with Numbered Controls */}
//           <div className="tool-group">
//             <button 
//               onClick={() => adjustFontSize(false)}
//               title="Decrease Font Size"
//             >
//               <FaMinus />
//             </button>
//             <span className="font-size-display">
//               {titleFormatting.fontSize || '16'}px
//             </span>
//             <button 
//               onClick={() => adjustFontSize(true)}
//               title="Increase Font Size"
//             >
//               <FaPlus />
//             </button>
//           </div>

//           <div className="divider"></div>

//           {/* Colors */}
//           <div className="tool-group">
//             <input 
//               type="color" 
//               onChange={(e) => applyTitleFormat('foreColor', e.target.value)}
//               value={titleFormatting.color}
//               title="Text Color"
//             />
//             <input 
//               type="color" 
//               onChange={(e) => applyTitleFormat('hiliteColor', e.target.value)}
//               value={titleFormatting.backgroundColor}
//               title="Background Color"
//             />
//           </div>

//           <div className="divider"></div>

//           {/* Alignment */}
//           <div className="tool-group">
//             <button 
//               onClick={() => applyTitleFormat('justifyLeft')}
//               className={titleFormatting.align === 'left' ? 'active' : ''}
//               title="Align Left"
//             >
//               <FaAlignLeft />
//             </button>
//             <button 
//               onClick={() => applyTitleFormat('justifyCenter')}
//               className={titleFormatting.align === 'center' ? 'active' : ''}
//               title="Align Center"
//             >
//               <FaAlignCenter />
//             </button>
//             <button 
//               onClick={() => applyTitleFormat('justifyRight')}
//               className={titleFormatting.align === 'right' ? 'active' : ''}
//               title="Align Right"
//             >
//               <FaAlignRight />
//             </button>
//           </div>

//           <div className="divider"></div>

//           {/* Lists */}
//           <div className="tool-group">
//             <button 
//               onClick={() => document.execCommand('insertOrderedList')}
//               title="Numbered List"
//             >
//               <FaListOl />
//             </button>
//             <button 
//               onClick={() => document.execCommand('insertUnorderedList')}
//               title="Bulleted List"
//             >
//               <FaListUl />
//             </button>
//           </div>

//           <div className="divider"></div>

//           {/* Media */}
//           <div className="tool-group">
//             <button onClick={() => setShowImageModal(true)} title="Add Image">
//               <FaImage />
//             </button>
//             <button onClick={() => setShowVideoModal(true)} title="Add Video">
//               <FaVideo />
//             </button>
//           </div>
//         </div>

//         {/* Settings Card */}
//         <div className="settings-card">
//           <button 
//             className="settings-toggle"
//             onClick={() => setShowSettings(!showSettings)}
//           >
//             <FaEllipsisV /> Settings
//           </button>
          
//           {showSettings && (
//             <div className="settings-dropdown">
//               <div className="settings-section">
//                 <h4>SEO Settings</h4>
//                 <div className="form-group">
//                   <label>SEO Title</label>
//                   <input
//                     type="text"
//                     value={seoTitle}
//                     onChange={(e) => setSeoTitle(e.target.value)}
//                     placeholder="SEO Title (60 characters max)"
//                     maxLength="60"
//                   />
//                   <div className="char-count">{seoTitle.length}/60</div>
//                 </div>
//                 <div className="form-group">
//                   <label>SEO Description</label>
//                   <textarea
//                     value={seoDescription}
//                     onChange={(e) => setSeoDescription(e.target.value)}
//                     placeholder="SEO Description (160 characters max)"
//                     maxLength="160"
//                   />
//                   <div className="char-count">{seoDescription.length}/160</div>
//                 </div>
//               </div>
              
//               <div className="settings-section">
//                 <h4>URL Settings</h4>
//                 <div className="form-group">
//                   <label>Custom URL</label>
//                   <div className="url-preview">
//                     <span>https://yourblog.com/</span>
//                     <input
//                       type="text"
//                       value={urlSlug}
//                       onChange={(e) => {
//                         const newSlug = e.target.value.toLowerCase()
//                           .replace(/\s+/g, '-')
//                           .replace(/[^\w-]+/g, '');
//                         setUrlSlug(newSlug);
//                         setUrlError(validateUrlSlug(newSlug));
//                       }}
//                       placeholder="custom-url"
//                     />
//                   </div>
//                   {urlError && <div className="error-message">{urlError}</div>}
//                 </div>
//               </div>
              
//               <button className="save-settings-btn" onClick={handleSaveSettings}>
//                 Save Settings
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Editor Content */}
//       <div className="editor-content">
//         <input
//           ref={titleRef}
//           type="text"
//           placeholder="Blog Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="blog-title-input"
//           style={{
//             fontWeight: titleFormatting.bold ? 'bold' : 'normal',
//             fontStyle: titleFormatting.italic ? 'italic' : 'normal',
//             textDecoration: titleFormatting.underline ? 'underline' : 'none',
//             fontSize: titleFormatting.fontSize ? `${titleFormatting.fontSize}px` : '',
//             color: titleFormatting.color,
//             backgroundColor: titleFormatting.backgroundColor,
//             textAlign: titleFormatting.align
//           }}
//         />
        
//         {activeTab === 'write' ? (
//           <ReactQuill
//             theme="snow"
//             value={content}
//             onChange={setContent}
//             modules={modules}
//             formats={formats}
//             placeholder="Write your blog content here..."
//           />
//         ) : (
//           <div className="preview-content" dangerouslySetInnerHTML={{ __html: content }} />
//         )}

//         <div className="media-gallery">
//           {media.map((item) => (
//             <div key={item.id} className="media-item">
//               {item.type === 'video' ? (
//                 <div className="video-container" style={{ width: item.width }}>
//                   <iframe 
//                     src={item.url} 
//                     title={`video-${item.id}`}
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                   />
//                 </div>
//               ) : (
//                 <div className="image-container" style={{ width: item.width }}>
//                   <img 
//                     src={item.url} 
//                     alt={`blog-${item.id}`} 
//                     style={{ width: '100%' }}
//                   />
//                 </div>
//               )}
//               <div className="media-controls">
//                 <input
//                   type="text"
//                   value={item.caption}
//                   onChange={(e) => handleEditMedia(item.id, e.target.value)}
//                   placeholder="Add caption"
//                 />
//                 <div className="media-buttons">
//                   <button onClick={() => handleResizeMedia(item.id)}>
//                     Resize
//                   </button>
//                   <button onClick={() => handleDeleteMedia(item.id)}>
//                     <FaTrash />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Editor Actions */}
//       <div className="editor-actions">
//         <button 
//           className="publish-btn"
//           onClick={handlePublish}
//           disabled={!!urlError}
//         >
//           Publish Blog
//         </button>
//       </div>

//       {/* Image Upload Modal */}
//       {showImageModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Insert Image</h3>
//             <div className="upload-options">
//               <div className="upload-option">
//                 <h4>Upload from computer</h4>
//                 <input 
//                   type="file" 
//                   accept="image/*" 
//                   onChange={handleImageFileUpload}
//                 />
//               </div>
//               <div className="or-divider">OR</div>
//               <div className="upload-option">
//                 <h4>Enter image URL</h4>
//                 <input
//                   type="text"
//                   placeholder="Enter image URL"
//                   value={imageUrl}
//                   onChange={(e) => setImageUrl(e.target.value)}
//                 />
//                 <button onClick={handleImageUpload}>Insert</button>
//               </div>
//             </div>
//             <div className="modal-actions">
//               <button onClick={() => setShowImageModal(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Video Upload Modal */}
//       {showVideoModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Insert Video</h3>
//             <div className="upload-options">
//               <div className="upload-option">
//                 <h4>Enter video URL (YouTube/Vimeo)</h4>
//                 <input
//                   type="text"
//                   placeholder="Enter video URL (YouTube or Vimeo)"
//                   value={videoUrl}
//                   onChange={(e) => setVideoUrl(e.target.value)}
//                 />
//                 <button onClick={handleVideoUpload}>Insert</button>
//               </div>
//             </div>
//             <div className="modal-actions">
//               <button onClick={() => setShowVideoModal(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogEditor;



// import React, { useState, useRef, useEffect } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { 
//   FaBold, FaItalic, FaUnderline, 
//   FaAlignLeft, FaAlignCenter, FaAlignRight,
//   FaImage, FaVideo, FaTrash,
//   FaEllipsisV, FaListOl, FaListUl, FaPlus, FaMinus,
//   FaArrowLeft, FaSave
// } from 'react-icons/fa';
// import { v4 as uuidv4 } from 'uuid';
// import { useNavigate, useParams } from 'react-router-dom';

// const BlogEditor = ({ blogs, setBlogs, currentUser }) => {
//   const { id } = useParams();
//   const isEditMode = !!id;
  
//   const existingBlog = isEditMode 
//     ? blogs.find(blog => blog.id === id && blog.author === currentUser) 
//     : null;

//   // State initialization
//   const [title, setTitle] = useState(existingBlog?.title || '');
//   const [content, setContent] = useState(existingBlog?.content || '');
//   const [media, setMedia] = useState(existingBlog?.media || []);
//   const [bannerImage, setBannerImage] = useState(existingBlog?.bannerImage || null);
//   const [activeTab, setActiveTab] = useState('write');
//   const [titleFormatting, setTitleFormatting] = useState(existingBlog?.titleStyles || {
//     bold: false,
//     italic: false,
//     underline: false,
//     fontSize: '24',
//     color: '#000000',
//     backgroundColor: '#ffffff',
//     align: 'left'
//   });
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [showVideoModal, setShowVideoModal] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [imageUrl, setImageUrl] = useState('');
//   const [videoUrl, setVideoUrl] = useState('');
//   const [seoTitle, setSeoTitle] = useState(existingBlog?.seoTitle || '');
//   const [seoDescription, setSeoDescription] = useState(existingBlog?.seoDescription || '');
//   const [urlSlug, setUrlSlug] = useState(existingBlog?.urlSlug || '');
//   const [urlError, setUrlError] = useState('');

//   const titleRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (title && !isEditMode) {
//       const generatedSlug = title.toLowerCase()
//         .replace(/\s+/g, '-')
//         .replace(/[^\w-]+/g, '');
//       setUrlSlug(generatedSlug);
      
//       if (blogs.some(blog => blog.urlSlug === generatedSlug)) {
//         setUrlError('This URL is already taken. Please customize it.');
//       } else {
//         setUrlError('');
//       }
//     }
//   }, [title, blogs, isEditMode]);

//   const modules = {
//     toolbar: {
//       container: [
//         [{ 'header': [1, 2, 3, false] }],
//         ['bold', 'italic', 'underline', 'strike'],
//         [{ 'color': [] }, { 'background': [] }],
//         [{ 'align': [] }],
//         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//         ['link', 'image', 'video'],
//         ['clean']
//       ],
//     }
//   };

//   const formats = [
//     'header',
//     'bold', 'italic', 'underline', 'strike',
//     'color', 'background',
//     'align',
//     'list', 'bullet',
//     'link', 'image', 'video'
//   ];

//   const applyTitleFormat = (command, value = null) => {
//     if (!titleRef.current) return;
    
//     const element = titleRef.current;
//     const newFormatting = { ...titleFormatting };
    
//     switch (command) {
//       case 'bold':
//         newFormatting.bold = !newFormatting.bold;
//         element.style.fontWeight = newFormatting.bold ? 'bold' : 'normal';
//         break;
//       case 'italic':
//         newFormatting.italic = !newFormatting.italic;
//         element.style.fontStyle = newFormatting.italic ? 'italic' : 'normal';
//         break;
//       case 'underline':
//         newFormatting.underline = !newFormatting.underline;
//         element.style.textDecoration = newFormatting.underline ? 'underline' : 'none';
//         break;
//       case 'fontSize':
//         newFormatting.fontSize = value;
//         element.style.fontSize = value ? `${value}px` : '';
//         break;
//       case 'foreColor':
//         newFormatting.color = value;
//         element.style.color = value;
//         break;
//       case 'hiliteColor':
//         newFormatting.backgroundColor = value;
//         element.style.backgroundColor = value;
//         break;
//       case 'justifyLeft':
//         newFormatting.align = 'left';
//         element.style.textAlign = 'left';
//         break;
//       case 'justifyCenter':
//         newFormatting.align = 'center';
//         element.style.textAlign = 'center';
//         break;
//       case 'justifyRight':
//         newFormatting.align = 'right';
//         element.style.textAlign = 'right';
//         break;
//       default:
//         break;
//     }
    
//     setTitleFormatting(newFormatting);
//   };

//   const adjustFontSize = (increase = true) => {
//     const currentSize = parseInt(titleFormatting.fontSize) || 16;
//     const newSize = increase ? currentSize + 2 : Math.max(12, currentSize - 2);
//     applyTitleFormat('fontSize', newSize.toString());
//   };

//   const handleImageUpload = () => {
//     if (!imageUrl) return;
//     const newImage = {
//       id: uuidv4(),
//       url: imageUrl,
//       caption: '',
//       type: 'image',
//       width: '100%'
//     };
//     setMedia([...media, newImage]);
//     setImageUrl('');
//     setShowImageModal(false);
//   };

//   const handleVideoUpload = () => {
//     if (!videoUrl) return;
    
//     let embedUrl = videoUrl;
//     if (videoUrl.includes('youtube.com/watch')) {
//       const videoId = videoUrl.split('v=')[1].split('&')[0];
//       embedUrl = `https://www.youtube.com/embed/${videoId}`;
//     } else if (videoUrl.includes('vimeo.com')) {
//       const videoId = videoUrl.split('vimeo.com/')[1].split('?')[0];
//       embedUrl = `https://player.vimeo.com/video/${videoId}`;
//     }
    
//     const newVideo = {
//       id: uuidv4(),
//       url: embedUrl,
//       caption: '',
//       type: 'video',
//       width: '100%'
//     };
//     setMedia([...media, newVideo]);
//     setVideoUrl('');
//     setShowVideoModal(false);
//   };

//   const handleImageFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const newImage = {
//         id: uuidv4(),
//         url: event.target.result,
//         caption: '',
//         type: 'image',
//         width: '100%'
//       };
//       setMedia([...media, newImage]);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleBannerUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       setBannerImage(event.target.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleDeleteMedia = (id) => {
//     setMedia(media.filter(item => item.id !== id));
//   };

//   const handleEditMedia = (id, newCaption) => {
//     setMedia(media.map(item => 
//       item.id === id ? { ...item, caption: newCaption } : item
//     ));
//   };

//   const handleResizeMedia = (id) => {
//     const newWidth = prompt('Enter new width (e.g., "500px" or "50%"):');
//     if (newWidth && (newWidth.endsWith('px') || newWidth.endsWith('%'))) {
//       setMedia(media.map(item => 
//         item.id === id ? { ...item, width: newWidth } : item
//       ));
//     } else if (newWidth) {
//       alert('Please include "px" or "%" in your width value');
//     }
//   };

//   const validateUrlSlug = (slug) => {
//     if (!slug) return 'URL cannot be empty';
//     if (!/^[a-z0-9-]+$/.test(slug)) return 'URL can only contain lowercase letters, numbers and hyphens';
//     if (blogs.some(blog => blog.urlSlug === slug && (!isEditMode || blog.id !== id))) {
//       return 'This URL is already taken';
//     }
//     return '';
//   };

//   const handlePublish = () => {
//     if (!title || !content) {
//       alert('Title and content are required');
//       return;
//     }
    
//     const urlValidationError = validateUrlSlug(urlSlug);
//     if (urlValidationError) {
//       setUrlError(urlValidationError);
//       alert(`URL Error: ${urlValidationError}`);
//       return;
//     }
    
//     if (isEditMode) {
//       setBlogs(blogs.map(blog => 
//         blog.id === id ? {
//           ...blog,
//           title,
//           content,
//           media,
//           bannerImage,
//           seoTitle: seoTitle || title,
//           seoDescription: seoDescription || content.substring(0, 160),
//           urlSlug,
//           lastUpdated: new Date().toISOString(),
//           titleStyles: titleFormatting
//         } : blog
//       ));
//     } else {
//       const newBlog = {
//         id: uuidv4(),
//         title,
//         content,
//         media,
//         bannerImage,
//         seoTitle: seoTitle || title,
//         seoDescription: seoDescription || content.substring(0, 160),
//         urlSlug,
//         date: new Date().toISOString(),
//         lastUpdated: new Date().toISOString(),
//         likes: 0,
//         comments: [],
//         titleStyles: titleFormatting,
//         author: currentUser
//       };
      
//       setBlogs(prev => [...prev, newBlog]);
//     }
    
//     alert(`Blog ${isEditMode ? 'updated' : 'published'} successfully!`);
//     navigate('/dashboard');
//   };

//   return (
//     <div className="blog-editor-container">
//       <button 
//         className="back-button"
//         onClick={() => navigate('/dashboard')}
//       >
//         <FaArrowLeft /> Back to Dashboard
//       </button>
      
//       <div className="editor-header">
//         <h2>{isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
//         <div className="tabs">
//           <button 
//             className={activeTab === 'write' ? 'active' : ''}
//             onClick={() => setActiveTab('write')}
//           >
//             Write
//           </button>
//           <button 
//             className={activeTab === 'preview' ? 'active' : ''}
//             onClick={() => setActiveTab('preview')}
//           >
//             Preview
//           </button>
//         </div>
//       </div>

//       <div className="banner-upload-container">
//         <input
//           type="file"
//           id="banner-upload"
//           accept="image/*"
//           onChange={handleBannerUpload}
//           style={{ display: 'none' }}
//         />
//         <label htmlFor="banner-upload" className="banner-upload-btn">
//           {bannerImage ? 'Change Banner Image' : 'Upload Banner Image'}
//         </label>
//         {bannerImage && (
//           <div className="banner-preview">
//             <img src={bannerImage} alt="Banner preview" />
//             <button 
//               className="remove-banner"
//               onClick={() => setBannerImage(null)}
//             >
//               ×
//             </button>
//           </div>
//         )}
//       </div>

//       <div className="editor-toolbar">
//         <div className="formatting-tools">
//           <div className="tool-group">
//             <button 
//               onClick={() => applyTitleFormat('bold')}
//               className={titleFormatting.bold ? 'active' : ''}
//               title="Bold"
//             >
//               <FaBold />
//             </button>
//             <button 
//               onClick={() => applyTitleFormat('italic')}
//               className={titleFormatting.italic ? 'active' : ''}
//               title="Italic"
//             >
//               <FaItalic />
//             </button>
//             <button 
//               onClick={() => applyTitleFormat('underline')}
//               className={titleFormatting.underline ? 'active' : ''}
//               title="Underline"
//             >
//               <FaUnderline />
//             </button>
//           </div>

//           <div className="divider"></div>

//           <div className="tool-group">
//             <button 
//               onClick={() => adjustFontSize(false)}
//               title="Decrease Font Size"
//             >
//               <FaMinus />
//             </button>
//             <span className="font-size-display">
//               {titleFormatting.fontSize || '16'}px
//             </span>
//             <button 
//               onClick={() => adjustFontSize(true)}
//               title="Increase Font Size"
//             >
//               <FaPlus />
//             </button>
//           </div>

//           <div className="divider"></div>

//           <div className="tool-group">
//             <input 
//               type="color" 
//               onChange={(e) => applyTitleFormat('foreColor', e.target.value)}
//               value={titleFormatting.color}
//               title="Text Color"
//             />
//             <input 
//               type="color" 
//               onChange={(e) => applyTitleFormat('hiliteColor', e.target.value)}
//               value={titleFormatting.backgroundColor}
//               title="Background Color"
//             />
//           </div>

//           <div className="divider"></div>

//           <div className="tool-group">
//             <button 
//               onClick={() => applyTitleFormat('justifyLeft')}
//               className={titleFormatting.align === 'left' ? 'active' : ''}
//               title="Align Left"
//             >
//               <FaAlignLeft />
//             </button>
//             <button 
//               onClick={() => applyTitleFormat('justifyCenter')}
//               className={titleFormatting.align === 'center' ? 'active' : ''}
//               title="Align Center"
//             >
//               <FaAlignCenter />
//             </button>
//             <button 
//               onClick={() => applyTitleFormat('justifyRight')}
//               className={titleFormatting.align === 'right' ? 'active' : ''}
//               title="Align Right"
//             >
//               <FaAlignRight />
//             </button>
//           </div>

//           <div className="divider"></div>

//           <div className="tool-group">
//             <button 
//               onClick={() => document.execCommand('insertOrderedList')}
//               title="Numbered List"
//             >
//               <FaListOl />
//             </button>
//             <button 
//               onClick={() => document.execCommand('insertUnorderedList')}
//               title="Bulleted List"
//             >
//               <FaListUl />
//             </button>
//           </div>

//           <div className="divider"></div>

//           <div className="tool-group">
//             <button onClick={() => setShowImageModal(true)} title="Add Image">
//               <FaImage />
//             </button>
//             <button onClick={() => setShowVideoModal(true)} title="Add Video">
//               <FaVideo />
//             </button>
//           </div>
//         </div>

//         <div className="settings-card">
//           <button 
//             className="settings-toggle"
//             onClick={() => setShowSettings(!showSettings)}
//           >
//             <FaEllipsisV /> Settings
//           </button>
          
//           {showSettings && (
//             <div className="settings-dropdown">
//               <div className="settings-section">
//                 <h4>SEO Settings</h4>
//                 <div className="form-group">
//                   <label>SEO Title</label>
//                   <input
//                     type="text"
//                     value={seoTitle}
//                     onChange={(e) => setSeoTitle(e.target.value)}
//                     placeholder="SEO Title (60 characters max)"
//                     maxLength="60"
//                   />
//                   <div className="char-count">{seoTitle.length}/60</div>
//                 </div>
//                 <div className="form-group">
//                   <label>SEO Description</label>
//                   <textarea
//                     value={seoDescription}
//                     onChange={(e) => setSeoDescription(e.target.value)}
//                     placeholder="SEO Description (160 characters max)"
//                     maxLength="160"
//                   />
//                   <div className="char-count">{seoDescription.length}/160</div>
//                 </div>
//               </div>
              
//               <div className="settings-section">
//                 <h4>URL Settings</h4>
//                 <div className="form-group">
//                   <label>Custom URL</label>
//                   <div className="url-preview">
//                     <span>https://yourblog.com/</span>
//                     <input
//                       type="text"
//                       value={urlSlug}
//                       onChange={(e) => {
//                         const newSlug = e.target.value.toLowerCase()
//                           .replace(/\s+/g, '-')
//                           .replace(/[^\w-]+/g, '');
//                         setUrlSlug(newSlug);
//                         setUrlError(validateUrlSlug(newSlug));
//                       }}
//                       placeholder="custom-url"
//                     />
//                   </div>
//                   {urlError && <div className="error-message">{urlError}</div>}
//                 </div>
//               </div>
              
//               <button className="save-settings-btn" onClick={() => setShowSettings(false)}>
//                 Save Settings
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="editor-content">
//         <input
//           ref={titleRef}
//           type="text"
//           placeholder="Blog Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="blog-title-input"
//           style={{
//             fontWeight: titleFormatting.bold ? 'bold' : 'normal',
//             fontStyle: titleFormatting.italic ? 'italic' : 'normal',
//             textDecoration: titleFormatting.underline ? 'underline' : 'none',
//             fontSize: titleFormatting.fontSize ? `${titleFormatting.fontSize}px` : '',
//             color: titleFormatting.color,
//             backgroundColor: titleFormatting.backgroundColor,
//             textAlign: titleFormatting.align
//           }}
//         />
        
//         {activeTab === 'write' ? (
//           <ReactQuill
//             theme="snow"
//             value={content}
//             onChange={setContent}
//             modules={modules}
//             formats={formats}
//             placeholder="Write your blog content here..."
//           />
//         ) : (
//           <div className="preview-content" dangerouslySetInnerHTML={{ __html: content }} />
//         )}

//         <div className="media-gallery">
//           {media.map((item) => (
//             <div key={item.id} className="media-item">
//               {item.type === 'video' ? (
//                 <div className="video-container" style={{ width: item.width }}>
//                   <iframe 
//                     src={item.url} 
//                     title={`video-${item.id}`}
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                   />
//                 </div>
//               ) : (
//                 <div className="image-container" style={{ width: item.width }}>
//                   <img 
//                     src={item.url} 
//                     alt={`blog-${item.id}`} 
//                     style={{ width: '100%' }}
//                   />
//                 </div>
//               )}
//               <div className="media-controls">
//                 <input
//                   type="text"
//                   value={item.caption}
//                   onChange={(e) => handleEditMedia(item.id, e.target.value)}
//                   placeholder="Add caption"
//                 />
//                 <div className="media-buttons">
//                   <button onClick={() => handleResizeMedia(item.id)}>
//                     Resize
//                   </button>
//                   <button onClick={() => handleDeleteMedia(item.id)}>
//                     <FaTrash />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="editor-actions">
//         <button 
//           className="publish-btn"
//           onClick={handlePublish}
//           disabled={!!urlError}
//         >
//           <FaSave /> {isEditMode ? 'Update Blog' : 'Publish Blog'}
//         </button>
//       </div>

//       {showImageModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Insert Image</h3>
//             <div className="upload-options">
//               <div className="upload-option">
//                 <h4>Upload from computer</h4>
//                 <input 
//                   type="file" 
//                   accept="image/*" 
//                   onChange={handleImageFileUpload}
//                 />
//               </div>
//               <div className="or-divider">OR</div>
//               <div className="upload-option">
//                 <h4>Enter image URL</h4>
//                 <input
//                   type="text"
//                   placeholder="Enter image URL"
//                   value={imageUrl}
//                   onChange={(e) => setImageUrl(e.target.value)}
//                 />
//                 <button onClick={handleImageUpload}>Insert</button>
//               </div>
//             </div>
//             <div className="modal-actions">
//               <button onClick={() => setShowImageModal(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showVideoModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Insert Video</h3>
//             <div className="upload-options">
//               <div className="upload-option">
//                 <h4>Enter video URL (YouTube/Vimeo)</h4>
//                 <input
//                   type="text"
//                   placeholder="Enter video URL (YouTube or Vimeo)"
//                   value={videoUrl}
//                   onChange={(e) => setVideoUrl(e.target.value)}
//                 />
//                 <button onClick={handleVideoUpload}>Insert</button>
//               </div>
//             </div>
//             <div className="modal-actions">
//               <button onClick={() => setShowVideoModal(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogEditor;




import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { 
  FaBold, FaItalic, FaUnderline, 
  FaAlignLeft, FaAlignCenter, FaAlignRight,
  FaImage, FaVideo, FaTrash,
  FaEllipsisV, FaListOl, FaListUl, FaPlus, FaMinus,
  FaArrowLeft, FaSave, FaLink
} from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';

const BlogEditor = ({ blogs, setBlogs, currentUser }) => {
  const { id } = useParams();
  const isEditMode = !!id;
  
  const existingBlog = isEditMode 
    ? blogs.find(blog => blog.id === id && blog.author === currentUser) 
    : null;

  // State initialization
  const [title, setTitle] = useState(existingBlog?.title || '');
  const [content, setContent] = useState(existingBlog?.content || '');
  const [media, setMedia] = useState(existingBlog?.media || []);
  const [bannerImage, setBannerImage] = useState(existingBlog?.bannerImage || null);
  const [activeTab, setActiveTab] = useState('write');
  const [titleFormatting, setTitleFormatting] = useState(existingBlog?.titleStyles || {
    bold: false,
    italic: false,
    underline: false,
    fontSize: '24',
    color: '#000000',
    backgroundColor: '#ffffff',
    align: 'left'
  });
  const [showImageModal, setShowImageModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [seoTitle, setSeoTitle] = useState(existingBlog?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(existingBlog?.seoDescription || '');
  const [urlSlug, setUrlSlug] = useState(existingBlog?.urlSlug || '');
  const [urlError, setUrlError] = useState('');

  const titleRef = useRef(null);
  const quillRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (title && !isEditMode) {
      const generatedSlug = title.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
      setUrlSlug(generatedSlug);
      
      if (blogs.some(blog => blog.urlSlug === generatedSlug)) {
        setUrlError('This URL is already taken. Please customize it.');
      } else {
        setUrlError('');
      }
    }
  }, [title, blogs, isEditMode]);

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image', 'video'],
        ['clean']
      ],
    }
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'align',
    'list', 'bullet',
    'link', 'image', 'video'
  ];

  const applyTitleFormat = (command, value = null) => {
    if (!titleRef.current) return;
    
    const element = titleRef.current;
    const newFormatting = { ...titleFormatting };
    
    switch (command) {
      case 'bold':
        newFormatting.bold = !newFormatting.bold;
        element.style.fontWeight = newFormatting.bold ? 'bold' : 'normal';
        break;
      case 'italic':
        newFormatting.italic = !newFormatting.italic;
        element.style.fontStyle = newFormatting.italic ? 'italic' : 'normal';
        break;
      case 'underline':
        newFormatting.underline = !newFormatting.underline;
        element.style.textDecoration = newFormatting.underline ? 'underline' : 'none';
        break;
      case 'fontSize':
        newFormatting.fontSize = value;
        element.style.fontSize = value ? `${value}px` : '';
        break;
      case 'foreColor':
        newFormatting.color = value;
        element.style.color = value;
        break;
      case 'hiliteColor':
        newFormatting.backgroundColor = value;
        element.style.backgroundColor = value;
        break;
      case 'justifyLeft':
        newFormatting.align = 'left';
        element.style.textAlign = 'left';
        break;
      case 'justifyCenter':
        newFormatting.align = 'center';
        element.style.textAlign = 'center';
        break;
      case 'justifyRight':
        newFormatting.align = 'right';
        element.style.textAlign = 'right';
        break;
      default:
        break;
    }
    
    setTitleFormatting(newFormatting);
  };

  const adjustFontSize = (increase = true) => {
    const currentSize = parseInt(titleFormatting.fontSize) || 16;
    const newSize = increase ? currentSize + 2 : Math.max(12, currentSize - 2);
    applyTitleFormat('fontSize', newSize.toString());
  };

  const handleImageUpload = () => {
    if (!imageUrl) return;
    const newImage = {
      id: uuidv4(),
      url: imageUrl,
      caption: '',
      type: 'image',
      width: '100%'
    };
    setMedia([...media, newImage]);
    setImageUrl('');
    setShowImageModal(false);
  };

  const handleVideoUpload = () => {
    if (!videoUrl) return;
    
    let embedUrl = videoUrl;
    if (videoUrl.includes('youtube.com/watch')) {
      const videoId = videoUrl.split('v=')[1].split('&')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (videoUrl.includes('vimeo.com')) {
      const videoId = videoUrl.split('vimeo.com/')[1].split('?')[0];
      embedUrl = `https://player.vimeo.com/video/${videoId}`;
    }
    
    const newVideo = {
      id: uuidv4(),
      url: embedUrl,
      caption: '',
      type: 'video',
      width: '100%'
    };
    setMedia([...media, newVideo]);
    setVideoUrl('');
    setShowVideoModal(false);
  };

  const handleImageFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const newImage = {
        id: uuidv4(),
        url: event.target.result,
        caption: '',
        type: 'image',
        width: '100%'
      };
      setMedia([...media, newImage]);
    };
    reader.readAsDataURL(file);
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setBannerImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteMedia = (id) => {
    setMedia(media.filter(item => item.id !== id));
  };

  const handleEditMedia = (id, newCaption) => {
    setMedia(media.map(item => 
      item.id === id ? { ...item, caption: newCaption } : item
    ));
  };

  const handleResizeMedia = (id) => {
    const newWidth = prompt('Enter new width (e.g., "500px" or "50%"):');
    if (newWidth && (newWidth.endsWith('px') || newWidth.endsWith('%'))) {
      setMedia(media.map(item => 
        item.id === id ? { ...item, width: newWidth } : item
      ));
    } else if (newWidth) {
      alert('Please include "px" or "%" in your width value');
    }
  };

  const handleInsertLink = () => {
    if (!linkUrl || !linkText) return;
    
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const range = quill.getSelection();
      quill.insertText(range?.index || 0, linkText, 'link', linkUrl);
    }
    
    setLinkUrl('');
    setLinkText('');
    setShowLinkModal(false);
  };

  const validateUrlSlug = (slug) => {
    if (!slug) return 'URL cannot be empty';
    if (!/^[a-z0-9-]+$/.test(slug)) return 'URL can only contain lowercase letters, numbers and hyphens';
    if (blogs.some(blog => blog.urlSlug === slug && (!isEditMode || blog.id !== id))) {
      return 'This URL is already taken';
    }
    return '';
  };

  const handlePublish = () => {
    if (!title || !content) {
      alert('Title and content are required');
      return;
    }
    
    const urlValidationError = validateUrlSlug(urlSlug);
    if (urlValidationError) {
      setUrlError(urlValidationError);
      alert(`URL Error: ${urlValidationError}`);
      return;
    }
    
    if (isEditMode) {
      setBlogs(blogs.map(blog => 
        blog.id === id ? {
          ...blog,
          title,
          content,
          media,
          bannerImage,
          seoTitle: seoTitle || title,
          seoDescription: seoDescription || content.substring(0, 160),
          urlSlug,
          lastUpdated: new Date().toISOString(),
          titleStyles: titleFormatting
        } : blog
      ));
    } else {
      const newBlog = {
        id: uuidv4(),
        title,
        content,
        media,
        bannerImage,
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || content.substring(0, 160),
        urlSlug,
        date: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        likes: 0,
        comments: [],
        titleStyles: titleFormatting,
        author: currentUser
      };
      
      setBlogs(prev => [...prev, newBlog]);
    }
    
    alert(`Blog ${isEditMode ? 'updated' : 'published'} successfully!`);
    navigate('/dashboard');
  };

  return (
    <div className="blog-editor-container">
      <button 
        className="back-button"
        onClick={() => navigate('/dashboard')}
      >
        <FaArrowLeft /> Back to Dashboard
      </button>
      
      <div className="editor-header">
        <h2>{isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
        <div className="tabs">
          <button 
            className={activeTab === 'write' ? 'active' : ''}
            onClick={() => setActiveTab('write')}
          >
            Write
          </button>
          <button 
            className={activeTab === 'preview' ? 'active' : ''}
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
        </div>
      </div>

      <div className="banner-upload-container">
        <input
          type="file"
          id="banner-upload"
          accept="image/*"
          onChange={handleBannerUpload}
          style={{ display: 'none' }}
        />
        <label htmlFor="banner-upload" className="banner-upload-btn">
          {bannerImage ? 'Change Banner Image' : 'Upload Banner Image'}
        </label>
        {bannerImage && (
          <div className="banner-preview">
            <img src={bannerImage} alt="Banner preview" />
            <button 
              className="remove-banner"
              onClick={() => setBannerImage(null)}
            >
              ×
            </button>
          </div>
        )}
      </div>

      <div className="editor-toolbar">
        <div className="formatting-tools">
          <div className="tool-group">
            <button 
              onClick={() => applyTitleFormat('bold')}
              className={titleFormatting.bold ? 'active' : ''}
              title="Bold"
            >
              <FaBold />
            </button>
            <button 
              onClick={() => applyTitleFormat('italic')}
              className={titleFormatting.italic ? 'active' : ''}
              title="Italic"
            >
              <FaItalic />
            </button>
            <button 
              onClick={() => applyTitleFormat('underline')}
              className={titleFormatting.underline ? 'active' : ''}
              title="Underline"
            >
              <FaUnderline />
            </button>
          </div>

          <div className="divider"></div>

          <div className="tool-group">
            <button 
              onClick={() => adjustFontSize(false)}
              title="Decrease Font Size"
            >
              <FaMinus />
            </button>
            <span className="font-size-display">
              {titleFormatting.fontSize || '16'}px
            </span>
            <button 
              onClick={() => adjustFontSize(true)}
              title="Increase Font Size"
            >
              <FaPlus />
            </button>
          </div>

          <div className="divider"></div>

          <div className="tool-group">
            <input 
              type="color" 
              onChange={(e) => applyTitleFormat('foreColor', e.target.value)}
              value={titleFormatting.color}
              title="Text Color"
            />
            <input 
              type="color" 
              onChange={(e) => applyTitleFormat('hiliteColor', e.target.value)}
              value={titleFormatting.backgroundColor}
              title="Background Color"
            />
          </div>

          <div className="divider"></div>

          <div className="tool-group">
            <button 
              onClick={() => applyTitleFormat('justifyLeft')}
              className={titleFormatting.align === 'left' ? 'active' : ''}
              title="Align Left"
            >
              <FaAlignLeft />
            </button>
            <button 
              onClick={() => applyTitleFormat('justifyCenter')}
              className={titleFormatting.align === 'center' ? 'active' : ''}
              title="Align Center"
            >
              <FaAlignCenter />
            </button>
            <button 
              onClick={() => applyTitleFormat('justifyRight')}
              className={titleFormatting.align === 'right' ? 'active' : ''}
              title="Align Right"
            >
              <FaAlignRight />
            </button>
          </div>

          <div className="divider"></div>

          <div className="tool-group">
            <button 
              onClick={() => document.execCommand('insertOrderedList')}
              title="Numbered List"
            >
              <FaListOl />
            </button>
            <button 
              onClick={() => document.execCommand('insertUnorderedList')}
              title="Bulleted List"
            >
              <FaListUl />
            </button>
          </div>

          <div className="divider"></div>

          <div className="tool-group">
            <button onClick={() => setShowImageModal(true)} title="Add Image">
              <FaImage />
            </button>
            <button onClick={() => setShowVideoModal(true)} title="Add Video">
              <FaVideo />
            </button>
            <button onClick={() => setShowLinkModal(true)} title="Add Link">
              <FaLink />
            </button>
          </div>
        </div>

        <div className="settings-card">
          <button 
            className="settings-toggle"
            onClick={() => setShowSettings(!showSettings)}
          >
            <FaEllipsisV /> Settings
          </button>
          
          {showSettings && (
            <div className="settings-dropdown">
              <div className="settings-section">
                <h4>SEO Settings</h4>
                <div className="form-group">
                  <label>SEO Title</label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="SEO Title (60 characters max)"
                    maxLength="60"
                  />
                  <div className="char-count">{seoTitle.length}/60</div>
                </div>
                <div className="form-group">
                  <label>SEO Description</label>
                  <textarea
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    placeholder="SEO Description (160 characters max)"
                    maxLength="160"
                  />
                  <div className="char-count">{seoDescription.length}/160</div>
                </div>
              </div>
              
              <div className="settings-section">
                <h4>URL Settings</h4>
                <div className="form-group">
                  <label>Custom URL</label>
                  <div className="url-preview">
                    <span>https://yourblog.com/</span>
                    <input
                      type="text"
                      value={urlSlug}
                      onChange={(e) => {
                        const newSlug = e.target.value.toLowerCase()
                          .replace(/\s+/g, '-')
                          .replace(/[^\w-]+/g, '');
                        setUrlSlug(newSlug);
                        setUrlError(validateUrlSlug(newSlug));
                      }}
                      placeholder="custom-url"
                    />
                  </div>
                  {urlError && <div className="error-message">{urlError}</div>}
                </div>
              </div>
              
              <button className="save-settings-btn" onClick={() => setShowSettings(false)}>
                Save Settings
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="editor-content">
        <input
          ref={titleRef}
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="blog-title-input"
          style={{
            fontWeight: titleFormatting.bold ? 'bold' : 'normal',
            fontStyle: titleFormatting.italic ? 'italic' : 'normal',
            textDecoration: titleFormatting.underline ? 'underline' : 'none',
            fontSize: titleFormatting.fontSize ? `${titleFormatting.fontSize}px` : '',
            color: titleFormatting.color,
            backgroundColor: titleFormatting.backgroundColor,
            textAlign: titleFormatting.align
          }}
        />
        
        {activeTab === 'write' ? (
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            placeholder="Write your blog content here..."
          />
        ) : (
          <div className="preview-content" dangerouslySetInnerHTML={{ __html: content }} />
        )}

        <div className="media-gallery">
          {media.map((item) => (
            <div key={item.id} className="media-item">
              {item.type === 'video' ? (
                <div className="video-container" style={{ width: item.width }}>
                  <iframe 
                    src={item.url} 
                    title={`video-${item.id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="image-container" style={{ width: item.width }}>
                  <img 
                    src={item.url} 
                    alt={`blog-${item.id}`} 
                    style={{ width: '100%' }}
                  />
                </div>
              )}
              <div className="media-controls">
                <input
                  type="text"
                  value={item.caption}
                  onChange={(e) => handleEditMedia(item.id, e.target.value)}
                  placeholder="Add caption"
                />
                <div className="media-buttons">
                  <button onClick={() => handleResizeMedia(item.id)}>
                    Resize
                  </button>
                  <button onClick={() => handleDeleteMedia(item.id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="editor-actions">
        <button 
          className="publish-btn"
          onClick={handlePublish}
          disabled={!!urlError}
        >
          <FaSave /> {isEditMode ? 'Update Blog' : 'Publish Blog'}
        </button>
      </div>

      {/* Image Upload Modal */}
      {showImageModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Insert Image</h3>
            <div className="upload-options">
              <div className="upload-option">
                <h4>Upload from computer</h4>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageFileUpload}
                />
              </div>
              <div className="or-divider">OR</div>
              <div className="upload-option">
                <h4>Enter image URL</h4>
                <input
                  type="text"
                  placeholder="Enter image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <button onClick={handleImageUpload}>Insert</button>
              </div>
            </div>
            <div className="modal-actions">
              <button onClick={() => setShowImageModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Video Upload Modal */}
      {showVideoModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Insert Video</h3>
            <div className="upload-options">
              <div className="upload-option">
                <h4>Enter video URL (YouTube/Vimeo)</h4>
                <input
                  type="text"
                  placeholder="Enter video URL (YouTube or Vimeo)"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
                <button onClick={handleVideoUpload}>Insert</button>
              </div>
            </div>
            <div className="modal-actions">
              <button onClick={() => setShowVideoModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Link Insert Modal */}
      {showLinkModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Insert Link</h3>
            <div className="form-group">
              <label>Link Text</label>
              <input
                type="text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="Text to display"
              />
            </div>
            <div className="form-group">
              <label>URL</label>
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <div className="modal-actions">
              <button onClick={() => setShowLinkModal(false)}>Cancel</button>
              <button onClick={handleInsertLink}>Insert Link</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogEditor;