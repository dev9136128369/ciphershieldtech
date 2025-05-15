import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  FaBold, FaItalic, FaUnderline,
  FaAlignLeft, FaAlignCenter, FaAlignRight,
  FaImage, FaVideo, FaTrash,
  FaEllipsisV, FaListOl, FaListUl, FaPlus, FaMinus,
  FaArrowLeft, FaSave, FaLink, FaTimes
} from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';

const BlogEditor = ({ blogs = [], setBlogs = () => { }, currentUser }) => {
  const { id } = useParams();
  const isEditMode = !!id;

  const existingBlog = isEditMode
    ? blogs.find(blog => blog.id === id && blog.author?.id === currentUser?.id)
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
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [seoTitle, setSeoTitle] = useState(existingBlog?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(existingBlog?.seoDescription || '');
  const [seoKeywords, setSeoKeywords] = useState(existingBlog?.seoKeywords || '');
  const [urlSlug, setUrlSlug] = useState(existingBlog?.urlSlug || '');
  const [urlError, setUrlError] = useState('');
  const [isUrlCreated, setIsUrlCreated] = useState(!!existingBlog?.urlSlug);
  const [isGeneratingUrl, setIsGeneratingUrl] = useState(false);

  const titleRef = useRef(null);
  const quillRef = useRef(null);
  const navigate = useNavigate();

  const generateUrlSlug = (title) => {
    return title.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  };

  useEffect(() => {
    if (existingBlog) {
      setIsUrlCreated(true);
    }
  }, [existingBlog]);

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
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
  setShowImageModal(false); // This line closes the modal
};

  const handleVideoUpload = () => {
    if (!videoUrl) return;

    let embedUrl = videoUrl;
    let originalUrl = videoUrl;

    // Handle YouTube URLs
    if (videoUrl.includes('youtube.com/watch')) {
      const videoId = videoUrl.split('v=')[1].split('&')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } 
    // Handle Vimeo URLs
    else if (videoUrl.includes('vimeo.com')) {
      const videoId = videoUrl.split('vimeo.com/')[1].split('?')[0];
      embedUrl = `https://player.vimeo.com/video/${videoId}`;
    }

    const newVideo = {
      id: uuidv4(),
      url: embedUrl,
      originalUrl: originalUrl,
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

  const newImage = {
    id: uuidv4(),
    file: file,
    preview: URL.createObjectURL(file),
    caption: '',
    type: 'image',
    width: '100%'
  };
  setMedia([...media, newImage]);
  setShowImageModal(false); // This line closes the modal
};
  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setBannerImage({
      file: file,
      preview: URL.createObjectURL(file)
    });
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

  const handleGenerateUrl = () => {
    if (!title) {
      alert('Please enter a title first');
      return;
    }

    setIsGeneratingUrl(true);

    setTimeout(() => {
      const generatedSlug = generateUrlSlug(title);
      setUrlSlug(generatedSlug);
      setIsUrlCreated(true);

      if (blogs && blogs.some(blog => blog.urlSlug === generatedSlug && (!isEditMode || blog.id !== id))) {
        setUrlError('This URL is already taken. Please customize it.');
      } else {
        setUrlError('');
      }

      setIsGeneratingUrl(false);
    }, 1000);
  };

  const validateUrlSlug = (slug) => {
    if (!slug) return 'URL cannot be empty';
    if (!/^[a-z0-9-]+$/.test(slug)) return 'URL can only contain lowercase letters, numbers and hyphens';

    if (blogs && blogs.some(blog => blog.urlSlug === slug && (!isEditMode || blog.id !== id))) {
      return 'This URL is already taken';
    }
    return '';
  };

  const handlePublish = async () => {
    if (!title || !content) {
      alert('Title and content are required');
      return;
    }

    if (!isUrlCreated) {
      alert('Please create a URL for your article first');
      return;
    }

    const urlValidationError = validateUrlSlug(urlSlug);
    if (urlValidationError) {
      setUrlError(urlValidationError);
      alert(`URL Error: ${urlValidationError}`);
      return;
    }

    // Prepare blog data
    const formData = new FormData();
    
    // Separate local files and external URLs
    const localMedia = media.filter(item => item.file);
    const externalMedia = media.filter(item => !item.file);

    // Prepare blog data object
    const blogData = {
      title,
      content,
      media: media.map(item => ({
        type: item.type,
        url: item.type === 'video' ? item.originalUrl : item.url,
        embedUrl: item.type === 'video' ? item.url : null,
        caption: item.caption,
        width: item.width
      })),
      seoTitle,
      seoDescription,
      seoKeywords: seoKeywords.split(',').map(k => k.trim()),
      urlSlug,
      author: currentUser,
      titleStyles: titleFormatting,
      createdAt: isEditMode ? existingBlog?.createdAt || new Date().toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Append JSON data
    formData.append('blogData', JSON.stringify(blogData));

    // Append banner image if exists
    if (bannerImage?.file) {
      formData.append('bannerImage', bannerImage.file);
    }

    // Append media files
    localMedia.forEach(item => {
      formData.append('mediaFiles', item.file);
    });

    try {
      const endpoint = isEditMode
        ? `http://localhost:8000/api/blogs/update/${id}`
        : 'http://localhost:8000/api/blogs/publish';

      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert(response.data.message);
      navigate('/dashboard/blogs');
    } catch (error) {
      console.error('Publish Error:', error);
      const errorMessage = error.response?.data?.message ||
        error.message ||
        'Unknown error occurred while publishing the blog';
      alert(`Error publishing blog. Please try again.\n\nDetails: ${errorMessage}`);
    }
  };

  const SettingsModal = () => (
    <div className="settings-modal-overlay">
      <div className="settings-modal-content">
        <div className="settings-modal-header">
          <h2>Article Settings</h2>
          <button
            className="close-modal-btn"
            onClick={() => setShowSettingsModal(false)}
          >
            <FaTimes />
          </button>
        </div>

        <section>
          <div>
            <h3 className="settings-section-title">General</h3>
            <h4 className="settings-subtitle">Article URL</h4>
            <p className="settings-description">
              This URL will be created using your article's current title. {isUrlCreated ?
                "This URL cannot be changed once it is created." :
                "This URL cannot be changed once it is created."}
            </p>

            {!title ? (
              <div className="url-creation-container">
                <p className="settings-description">
                  You need to add a title before you can create a URL for your article.
                </p>
                <button
                  disabled
                  aria-label="Create URL"
                  className="create-url-btn disabled"
                >
                  Create URL
                </button>
              </div>
            ) : isUrlCreated ? (
              <div className="url-preview-container">
                <p className="settings-description">
                  Your article URL:
                </p>
                <div className="url-display">
                  https://yourblog.com/{urlSlug}
                </div>
              </div>
            ) : (
              <div className="url-creation-container">
                <p className="settings-description">
                  Click below to create a URL for your article.
                </p>
                <button
                  aria-label="Create URL"
                  className="create-url-btn"
                  onClick={handleGenerateUrl}
                  disabled={isGeneratingUrl}
                >
                  {isGeneratingUrl ? 'Creating...' : 'Create URL'}
                </button>
              </div>
            )}
          </div>
        </section>

        <hr className="settings-divider" />

        <section>
          <h3 className="settings-section-title">SEO</h3>

          <form className="seo-form">
            <div className="form-group">
              <h4 className="settings-subtitle">SEO title</h4>
              <p className="settings-description">
                We'll use your added SEO title in place of your article title for search engine result pages.
              </p>
              <div className="input-container">
                <label htmlFor="seo-title-input">Title</label>
                <input
                  id="seo-title-input"
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="Ex: My article"
                  maxLength="60"
                />
                <div className="char-counter">{seoTitle.length}/60</div>
              </div>
            </div>

            <div className="form-group">
              <h4 className="settings-subtitle">SEO description</h4>
              <p className="settings-description">
                We'll use the SEO description in place of the first few lines of your article on search engine result pages.
                We suggest utilizing keywords, summarizing your writing, and aiming to write between 140-160 characters.
              </p>
              <div className="input-container">
                <label htmlFor="seo-description-input">Description</label>
                <textarea
                  id="seo-description-input"
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="Ex: A recap about what the article is about"
                  maxLength="160"
                  rows="3"
                />
                <div className="char-counter">{seoDescription.length}/160</div>
              </div>
            </div>
          </form>
        </section>

        <div className="settings-modal-footer">
          <button
            className="save-settings-btn"
            onClick={() => setShowSettingsModal(false)}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="blog-editor-container">
      <button
        className="back-button"
        onClick={() => navigate('/dashboard/blogs')}
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
            <img src={bannerImage.preview || bannerImage} alt="Banner preview" />
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

        <button
          className="settings-toggle"
          onClick={() => setShowSettingsModal(true)}
        >
          <FaEllipsisV /> Settings
        </button>
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
                  <div className="video-url-display">
                    Original URL: {item.originalUrl}
                  </div>
                </div>
              ) : (
                <div className="image-container" style={{ width: item.width }}>
                  <img
                    src={item.url || item.preview}
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
            onChange={(e) => {
              handleImageFileUpload(e);
              setShowImageModal(false); // Close modal after file selection
            }}
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
                <p className="video-url-help">
                  Supports YouTube and Vimeo URLs (e.g., https://www.youtube.com/watch?v=... or https://vimeo.com/...)
                </p>
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

      {/* Settings Modal */}
      {showSettingsModal && <SettingsModal />}
    </div>
  );
};

export default BlogEditor;





























































// import axios from 'axios';
// import React, { useState, useRef, useEffect } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import {
//   FaBold, FaItalic, FaUnderline,
//   FaAlignLeft, FaAlignCenter, FaAlignRight,
//   FaImage, FaVideo, FaTrash,
//   FaEllipsisV, FaListOl, FaListUl, FaPlus, FaMinus,
//   FaArrowLeft, FaSave, FaLink, FaTimes
// } from 'react-icons/fa';
// import { v4 as uuidv4 } from 'uuid';
// import { useNavigate, useParams } from 'react-router-dom';

// const BlogEditor = ({ blogs = [], setBlogs = () => { }, currentUser }) => {
//   const { id } = useParams();
//   const isEditMode = !!id;

//   const existingBlog = isEditMode
//     ? blogs.find(blog => blog.id === id && blog.author?.id === currentUser?.id)
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
//   const [showLinkModal, setShowLinkModal] = useState(false);
//   const [showSettingsModal, setShowSettingsModal] = useState(false);
//   const [imageUrl, setImageUrl] = useState('');
//   const [videoUrl, setVideoUrl] = useState('');
//   const [linkUrl, setLinkUrl] = useState('');
//   const [linkText, setLinkText] = useState('');
//   const [seoTitle, setSeoTitle] = useState(existingBlog?.seoTitle || '');
//   const [seoDescription, setSeoDescription] = useState(existingBlog?.seoDescription || '');
//   const [seoKeywords, setSeoKeywords] = useState(existingBlog?.seoKeywords || '');
//   const [urlSlug, setUrlSlug] = useState(existingBlog?.urlSlug || '');
//   const [urlError, setUrlError] = useState('');
//   const [isUrlCreated, setIsUrlCreated] = useState(!!existingBlog?.urlSlug);
//   const [isGeneratingUrl, setIsGeneratingUrl] = useState(false);

//   const titleRef = useRef(null);
//   const quillRef = useRef(null);
//   const navigate = useNavigate();

//   const generateUrlSlug = (title) => {
//     return title.toLowerCase()
//       .replace(/\s+/g, '-')
//       .replace(/[^\w-]+/g, '');
//   };

//   useEffect(() => {
//     if (existingBlog) {
//       setIsUrlCreated(true);
//     }
//   }, [existingBlog]);

//   const modules = {
//     toolbar: {
//       container: [
//         [{ 'header': [1, 2, 3, false] }],
//         ['bold', 'italic', 'underline', 'strike'],
//         [{ 'color': [] }, { 'background': [] }],
//         [{ 'align': [] }],
//         [{ 'list': 'ordered' }, { 'list': 'bullet' }],
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
//   if (!imageUrl) return;
//   const newImage = {
//     id: uuidv4(),
//     url: imageUrl,
//     caption: '',
//     type: 'image',
//     width: '100%'
//   };
//   setMedia([...media, newImage]);
//   setImageUrl('');
//   setShowImageModal(false); // This line closes the modal
// };

//   const handleVideoUpload = () => {
//     if (!videoUrl) return;

//     let embedUrl = videoUrl;
//     let originalUrl = videoUrl;

//     // Handle YouTube URLs
//     if (videoUrl.includes('youtube.com/watch')) {
//       const videoId = videoUrl.split('v=')[1].split('&')[0];
//       embedUrl = `https://www.youtube.com/embed/${videoId}`;
//     } 
//     // Handle Vimeo URLs
//     else if (videoUrl.includes('vimeo.com')) {
//       const videoId = videoUrl.split('vimeo.com/')[1].split('?')[0];
//       embedUrl = `https://player.vimeo.com/video/${videoId}`;
//     }

//     const newVideo = {
//       id: uuidv4(),
//       url: embedUrl,
//       originalUrl: originalUrl,
//       caption: '',
//       type: 'video',
//       width: '100%'
//     };
    
//     setMedia([...media, newVideo]);
//     setVideoUrl('');
//     setShowVideoModal(false);
//   };

//   const handleImageFileUpload = (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   const newImage = {
//     id: uuidv4(),
//     file: file,
//     preview: URL.createObjectURL(file),
//     caption: '',
//     type: 'image',
//     width: '100%'
//   };
//   setMedia([...media, newImage]);
//   setShowImageModal(false); // This line closes the modal
// };
//   const handleBannerUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setBannerImage({
//       file: file,
//       preview: URL.createObjectURL(file)
//     });
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

//   const handleInsertLink = () => {
//     if (!linkUrl || !linkText) return;

//     const quill = quillRef.current?.getEditor();
//     if (quill) {
//       const range = quill.getSelection();
//       quill.insertText(range?.index || 0, linkText, 'link', linkUrl);
//     }

//     setLinkUrl('');
//     setLinkText('');
//     setShowLinkModal(false);
//   };

//   const handleGenerateUrl = () => {
//     if (!title) {
//       alert('Please enter a title first');
//       return;
//     }

//     setIsGeneratingUrl(true);

//     setTimeout(() => {
//       const generatedSlug = generateUrlSlug(title);
//       setUrlSlug(generatedSlug);
//       setIsUrlCreated(true);

//       if (blogs && blogs.some(blog => blog.urlSlug === generatedSlug && (!isEditMode || blog.id !== id))) {
//         setUrlError('This URL is already taken. Please customize it.');
//       } else {
//         setUrlError('');
//       }

//       setIsGeneratingUrl(false);
//     }, 1000);
//   };

//   const validateUrlSlug = (slug) => {
//     if (!slug) return 'URL cannot be empty';
//     if (!/^[a-z0-9-]+$/.test(slug)) return 'URL can only contain lowercase letters, numbers and hyphens';

//     if (blogs && blogs.some(blog => blog.urlSlug === slug && (!isEditMode || blog.id !== id))) {
//       return 'This URL is already taken';
//     }
//     return '';
//   };

//   const handlePublish = async () => {
//     if (!title || !content) {
//       alert('Title and content are required');
//       return;
//     }

//     if (!isUrlCreated) {
//       alert('Please create a URL for your article first');
//       return;
//     }

//     const urlValidationError = validateUrlSlug(urlSlug);
//     if (urlValidationError) {
//       setUrlError(urlValidationError);
//       alert(`URL Error: ${urlValidationError}`);
//       return;
//     }

//     // Prepare blog data
//     const formData = new FormData();
    
//     // Separate local files and external URLs
//     const localMedia = media.filter(item => item.file);
//     const externalMedia = media.filter(item => !item.file);

//     // Prepare blog data object
//     const blogData = {
//       title,
//       content,
//       media: media.map(item => ({
//         type: item.type,
//         url: item.type === 'video' ? item.originalUrl : item.url,
//         embedUrl: item.type === 'video' ? item.url : null,
//         caption: item.caption,
//         width: item.width
//       })),
//       seoTitle,
//       seoDescription,
//       seoKeywords: seoKeywords.split(',').map(k => k.trim()),
//       urlSlug,
//       author: currentUser,
//       titleStyles: titleFormatting,
//       createdAt: isEditMode ? existingBlog?.createdAt || new Date().toISOString() : new Date().toISOString(),
//       updatedAt: new Date().toISOString()
//     };

//     // Append JSON data
//     formData.append('blogData', JSON.stringify(blogData));

//     // Append banner image if exists
//     if (bannerImage?.file) {
//       formData.append('bannerImage', bannerImage.file);
//     }

//     // Append media files
//     localMedia.forEach(item => {
//       formData.append('mediaFiles', item.file);
//     });

//     try {
//       const endpoint = isEditMode
//         ? `http://localhost:8000/api/blogs/update/${id}`
//         : 'http://localhost:8000/api/blogs/publish';

//       const response = await axios.post(endpoint, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       alert(response.data.message);
//       navigate('/dashboard/blogs');
//     } catch (error) {
//       console.error('Publish Error:', error);
//       const errorMessage = error.response?.data?.message ||
//         error.message ||
//         'Unknown error occurred while publishing the blog';
//       alert(`Error publishing blog. Please try again.\n\nDetails: ${errorMessage}`);
//     }
//   };

//   const SettingsModal = () => (
//     <div className="settings-modal-overlay">
//       <div className="settings-modal-content">
//         <div className="settings-modal-header">
//           <h2>Article Settings</h2>
//           <button
//             className="close-modal-btn"
//             onClick={() => setShowSettingsModal(false)}
//           >
//             <FaTimes />
//           </button>
//         </div>

//         <section>
//           <div>
//             <h3 className="settings-section-title">General</h3>
//             <h4 className="settings-subtitle">Article URL</h4>
//             <p className="settings-description">
//               This URL will be created using your article's current title. {isUrlCreated ?
//                 "This URL cannot be changed once it is created." :
//                 "This URL cannot be changed once it is created."}
//             </p>

//             {!title ? (
//               <div className="url-creation-container">
//                 <p className="settings-description">
//                   You need to add a title before you can create a URL for your article.
//                 </p>
//                 <button
//                   disabled
//                   aria-label="Create URL"
//                   className="create-url-btn disabled"
//                 >
//                   Create URL
//                 </button>
//               </div>
//             ) : isUrlCreated ? (
//               <div className="url-preview-container">
//                 <p className="settings-description">
//                   Your article URL:
//                 </p>
//                 <div className="url-display">
//                   https://yourblog.com/{urlSlug}
//                 </div>
//               </div>
//             ) : (
//               <div className="url-creation-container">
//                 <p className="settings-description">
//                   Click below to create a URL for your article.
//                 </p>
//                 <button
//                   aria-label="Create URL"
//                   className="create-url-btn"
//                   onClick={handleGenerateUrl}
//                   disabled={isGeneratingUrl}
//                 >
//                   {isGeneratingUrl ? 'Creating...' : 'Create URL'}
//                 </button>
//               </div>
//             )}
//           </div>
//         </section>

//         <hr className="settings-divider" />

//         <section>
//           <h3 className="settings-section-title">SEO</h3>

//           <form className="seo-form">
//             <div className="form-group">
//               <h4 className="settings-subtitle">SEO title</h4>
//               <p className="settings-description">
//                 We'll use your added SEO title in place of your article title for search engine result pages.
//               </p>
//               <div className="input-container">
//                 <label htmlFor="seo-title-input">Title</label>
//                 <input
//                   id="seo-title-input"
//                   type="text"
//                   value={seoTitle}
//                   onChange={(e) => setSeoTitle(e.target.value)}
//                   placeholder="Ex: My article"
//                   maxLength="60"
//                 />
//                 <div className="char-counter">{seoTitle.length}/60</div>
//               </div>
//             </div>

//             <div className="form-group">
//               <h4 className="settings-subtitle">SEO description</h4>
//               <p className="settings-description">
//                 We'll use the SEO description in place of the first few lines of your article on search engine result pages.
//                 We suggest utilizing keywords, summarizing your writing, and aiming to write between 140-160 characters.
//               </p>
//               <div className="input-container">
//                 <label htmlFor="seo-description-input">Description</label>
//                 <textarea
//                   id="seo-description-input"
//                   value={seoDescription}
//                   onChange={(e) => setSeoDescription(e.target.value)}
//                   placeholder="Ex: A recap about what the article is about"
//                   maxLength="160"
//                   rows="3"
//                 />
//                 <div className="char-counter">{seoDescription.length}/160</div>
//               </div>
//             </div>
//           </form>
//         </section>

//         <div className="settings-modal-footer">
//           <button
//             className="save-settings-btn"
//             onClick={() => setShowSettingsModal(false)}
//           >
//             Save Settings
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="blog-editor-container">
//       <button
//         className="back-button"
//         onClick={() => navigate('/dashboard/blogs')}
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
//             <img src={bannerImage.preview || bannerImage} alt="Banner preview" />
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
//             <button onClick={() => setShowLinkModal(true)} title="Add Link">
//               <FaLink />
//             </button>
//           </div>
//         </div>

//         <button
//           className="settings-toggle"
//           onClick={() => setShowSettingsModal(true)}
//         >
//           <FaEllipsisV /> Settings
//         </button>
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
//             ref={quillRef}
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
//                   <div className="video-url-display">
//                     Original URL: {item.originalUrl}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="image-container" style={{ width: item.width }}>
//                   <img
//                     src={item.url || item.preview}
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

//       {/* Image Upload Modal */}
//       {showImageModal && (
//   <div className="modal-overlay">
//     <div className="modal-content">
//       <h3>Insert Image</h3>
//       <div className="upload-options">
//         <div className="upload-option">
//           <h4>Upload from computer</h4>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               handleImageFileUpload(e);
//               setShowImageModal(false); // Close modal after file selection
//             }}
//           />
//         </div>
//         <div className="or-divider">OR</div>
//         <div className="upload-option">
//           <h4>Enter image URL</h4>
//           <input
//             type="text"
//             placeholder="Enter image URL"
//             value={imageUrl}
//             onChange={(e) => setImageUrl(e.target.value)}
//           />
//           <button onClick={handleImageUpload}>Insert</button>
//         </div>
//       </div>
//       <div className="modal-actions">
//         <button onClick={() => setShowImageModal(false)}>Cancel</button>
//       </div>
//     </div>
//   </div>
// )}

//       {/* Video Upload Modal */}
//       {showVideoModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Insert Video</h3>
//             <div className="upload-options">
//               <div className="upload-option">
//                 <h4>Enter video URL (YouTube/Vimeo)</h4>
//                 <p className="video-url-help">
//                   Supports YouTube and Vimeo URLs (e.g., https://www.youtube.com/watch?v=... or https://vimeo.com/...)
//                 </p>
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

//       {/* Link Insert Modal */}
//       {showLinkModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Insert Link</h3>
//             <div className="form-group">
//               <label>Link Text</label>
//               <input
//                 type="text"
//                 value={linkText}
//                 onChange={(e) => setLinkText(e.target.value)}
//                 placeholder="Text to display"
//               />
//             </div>
//             <div className="form-group">
//               <label>URL</label>
//               <input
//                 type="text"
//                 value={linkUrl}
//                 onChange={(e) => setLinkUrl(e.target.value)}
//                 placeholder="https://example.com"
//               />
//             </div>
//             <div className="modal-actions">
//               <button onClick={() => setShowLinkModal(false)}>Cancel</button>
//               <button onClick={handleInsertLink}>Insert Link</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Settings Modal */}
//       {showSettingsModal && <SettingsModal />}
//     </div>
//   );
// };

// export default BlogEditor;













































































































// import axios from 'axios';
// import React, { useState, useRef, useEffect } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import {
//   FaBold, FaItalic, FaUnderline,
//   FaAlignLeft, FaAlignCenter, FaAlignRight,
//   FaImage, FaVideo, FaTrash,
//   FaEllipsisV, FaListOl, FaListUl, FaPlus, FaMinus,
//   FaArrowLeft, FaSave, FaLink, FaTimes
// } from 'react-icons/fa';
// import { v4 as uuidv4 } from 'uuid';
// import { useNavigate, useParams } from 'react-router-dom';

// const BlogEditor = ({ blogs = [], setBlogs = () => { }, currentUser }) => {
//   const { id } = useParams();
//   const isEditMode = !!id;

//   const existingBlog = isEditMode
//     ? blogs.find(blog => blog.id === id && blog.author?.id === currentUser?.id)
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
//   const [showLinkModal, setShowLinkModal] = useState(false);
//   const [showSettingsModal, setShowSettingsModal] = useState(false);
//   const [imageUrl, setImageUrl] = useState('');
//   const [videoUrl, setVideoUrl] = useState('');
//   const [linkUrl, setLinkUrl] = useState('');
//   const [linkText, setLinkText] = useState('');
//   const [seoTitle, setSeoTitle] = useState(existingBlog?.seoTitle || '');
//   const [seoDescription, setSeoDescription] = useState(existingBlog?.seoDescription || '');
//   const [seoKeywords, setSeoKeywords] = useState(existingBlog?.seoKeywords || '');
//   const [urlSlug, setUrlSlug] = useState(existingBlog?.urlSlug || '');
//   const [urlError, setUrlError] = useState('');
//   const [isUrlCreated, setIsUrlCreated] = useState(!!existingBlog?.urlSlug);
//   const [isGeneratingUrl, setIsGeneratingUrl] = useState(false);

//   const titleRef = useRef(null);
//   const quillRef = useRef(null);
//   const navigate = useNavigate();

//   const generateUrlSlug = (title) => {
//     return title.toLowerCase()
//       .replace(/\s+/g, '-')
//       .replace(/[^\w-]+/g, '');
//   };

//   useEffect(() => {
//     if (existingBlog) {
//       setIsUrlCreated(true);
//     }
//   }, [existingBlog]);

//   const modules = {
//     toolbar: {
//       container: [
//         [{ 'header': [1, 2, 3, false] }],
//         ['bold', 'italic', 'underline', 'strike'],
//         [{ 'color': [] }, { 'background': [] }],
//         [{ 'align': [] }],
//         [{ 'list': 'ordered' }, { 'list': 'bullet' }],
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
//     let originalUrl = videoUrl;

//     // Handle YouTube URLs
//     if (videoUrl.includes('youtube.com/watch')) {
//       const videoId = videoUrl.split('v=')[1].split('&')[0];
//       embedUrl = `https://www.youtube.com/embed/${videoId}`;
//     } 
//     // Handle Vimeo URLs
//     else if (videoUrl.includes('vimeo.com')) {
//       const videoId = videoUrl.split('vimeo.com/')[1].split('?')[0];
//       embedUrl = `https://player.vimeo.com/video/${videoId}`;
//     }

//     const newVideo = {
//       id: uuidv4(),
//       url: embedUrl,
//       originalUrl: originalUrl,
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

//     const newImage = {
//       id: uuidv4(),
//       file: file,
//       preview: URL.createObjectURL(file),
//       caption: '',
//       type: 'image',
//       width: '100%'
//     };
//     setMedia([...media, newImage]);
//   };

//   const handleBannerUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setBannerImage({
//       file: file,
//       preview: URL.createObjectURL(file)
//     });
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

//   const handleInsertLink = () => {
//     if (!linkUrl || !linkText) return;

//     const quill = quillRef.current?.getEditor();
//     if (quill) {
//       const range = quill.getSelection();
//       quill.insertText(range?.index || 0, linkText, 'link', linkUrl);
//     }

//     setLinkUrl('');
//     setLinkText('');
//     setShowLinkModal(false);
//   };

//   const handleGenerateUrl = () => {
//     if (!title) {
//       alert('Please enter a title first');
//       return;
//     }

//     setIsGeneratingUrl(true);

//     setTimeout(() => {
//       const generatedSlug = generateUrlSlug(title);
//       setUrlSlug(generatedSlug);
//       setIsUrlCreated(true);

//       if (blogs && blogs.some(blog => blog.urlSlug === generatedSlug && (!isEditMode || blog.id !== id))) {
//         setUrlError('This URL is already taken. Please customize it.');
//       } else {
//         setUrlError('');
//       }

//       setIsGeneratingUrl(false);
//     }, 1000);
//   };

//   const validateUrlSlug = (slug) => {
//     if (!slug) return 'URL cannot be empty';
//     if (!/^[a-z0-9-]+$/.test(slug)) return 'URL can only contain lowercase letters, numbers and hyphens';

//     if (blogs && blogs.some(blog => blog.urlSlug === slug && (!isEditMode || blog.id !== id))) {
//       return 'This URL is already taken';
//     }
//     return '';
//   };

//   const handlePublish = async () => {
//     if (!title || !content) {
//       alert('Title and content are required');
//       return;
//     }

//     if (!isUrlCreated) {
//       alert('Please create a URL for your article first');
//       return;
//     }

//     const urlValidationError = validateUrlSlug(urlSlug);
//     if (urlValidationError) {
//       setUrlError(urlValidationError);
//       alert(`URL Error: ${urlValidationError}`);
//       return;
//     }

//     // Prepare blog data
//     const formData = new FormData();
    
//     // Separate local files and external URLs
//     const localMedia = media.filter(item => item.file);
//     const externalMedia = media.filter(item => !item.file);

//     // Prepare blog data object
//     const blogData = {
//       title,
//       content,
//       media: media.map(item => ({
//         type: item.type,
//         url: item.type === 'video' ? item.originalUrl : item.url,
//         embedUrl: item.type === 'video' ? item.url : null,
//         caption: item.caption,
//         width: item.width
//       })),
//       seoTitle,
//       seoDescription,
//       seoKeywords: seoKeywords.split(',').map(k => k.trim()),
//       urlSlug,
//       author: currentUser,
//       titleStyles: titleFormatting,
//       createdAt: isEditMode ? existingBlog?.createdAt || new Date().toISOString() : new Date().toISOString(),
//       updatedAt: new Date().toISOString()
//     };

//     // Append JSON data
//     formData.append('blogData', JSON.stringify(blogData));

//     // Append banner image if exists
//     if (bannerImage?.file) {
//       formData.append('bannerImage', bannerImage.file);
//     }

//     // Append media files
//     localMedia.forEach(item => {
//       formData.append('mediaFiles', item.file);
//     });

//     try {
//       const endpoint = isEditMode
//         ? `http://localhost:8000/api/blogs/update/${id}`
//         : 'http://localhost:8000/api/blogs/publish';

//       const response = await axios.post(endpoint, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       alert(response.data.message);
//       navigate('/dashboard/blogs');
//     } catch (error) {
//       console.error('Publish Error:', error);
//       const errorMessage = error.response?.data?.message ||
//         error.message ||
//         'Unknown error occurred while publishing the blog';
//       alert(`Error publishing blog. Please try again.\n\nDetails: ${errorMessage}`);
//     }
//   };

//   const SettingsModal = () => (
//     <div className="settings-modal-overlay">
//       <div className="settings-modal-content">
//         <div className="settings-modal-header">
//           <h2>Article Settings</h2>
//           <button
//             className="close-modal-btn"
//             onClick={() => setShowSettingsModal(false)}
//           >
//             <FaTimes />
//           </button>
//         </div>

//         <section>
//           <div>
//             <h3 className="settings-section-title">General</h3>
//             <h4 className="settings-subtitle">Article URL</h4>
//             <p className="settings-description">
//               This URL will be created using your article's current title. {isUrlCreated ?
//                 "This URL cannot be changed once it is created." :
//                 "This URL cannot be changed once it is created."}
//             </p>

//             {!title ? (
//               <div className="url-creation-container">
//                 <p className="settings-description">
//                   You need to add a title before you can create a URL for your article.
//                 </p>
//                 <button
//                   disabled
//                   aria-label="Create URL"
//                   className="create-url-btn disabled"
//                 >
//                   Create URL
//                 </button>
//               </div>
//             ) : isUrlCreated ? (
//               <div className="url-preview-container">
//                 <p className="settings-description">
//                   Your article URL:
//                 </p>
//                 <div className="url-display">
//                   https://yourblog.com/{urlSlug}
//                 </div>
//               </div>
//             ) : (
//               <div className="url-creation-container">
//                 <p className="settings-description">
//                   Click below to create a URL for your article.
//                 </p>
//                 <button
//                   aria-label="Create URL"
//                   className="create-url-btn"
//                   onClick={handleGenerateUrl}
//                   disabled={isGeneratingUrl}
//                 >
//                   {isGeneratingUrl ? 'Creating...' : 'Create URL'}
//                 </button>
//               </div>
//             )}
//           </div>
//         </section>

//         <hr className="settings-divider" />

//         <section>
//           <h3 className="settings-section-title">SEO</h3>

//           <form className="seo-form">
//             <div className="form-group">
//               <h4 className="settings-subtitle">SEO title</h4>
//               <p className="settings-description">
//                 We'll use your added SEO title in place of your article title for search engine result pages.
//               </p>
//               <div className="input-container">
//                 <label htmlFor="seo-title-input">Title</label>
//                 <input
//                   id="seo-title-input"
//                   type="text"
//                   value={seoTitle}
//                   onChange={(e) => setSeoTitle(e.target.value)}
//                   placeholder="Ex: My article"
//                   maxLength="60"
//                 />
//                 <div className="char-counter">{seoTitle.length}/60</div>
//               </div>
//             </div>

//             <div className="form-group">
//               <h4 className="settings-subtitle">SEO description</h4>
//               <p className="settings-description">
//                 We'll use the SEO description in place of the first few lines of your article on search engine result pages.
//                 We suggest utilizing keywords, summarizing your writing, and aiming to write between 140-160 characters.
//               </p>
//               <div className="input-container">
//                 <label htmlFor="seo-description-input">Description</label>
//                 <textarea
//                   id="seo-description-input"
//                   value={seoDescription}
//                   onChange={(e) => setSeoDescription(e.target.value)}
//                   placeholder="Ex: A recap about what the article is about"
//                   maxLength="160"
//                   rows="3"
//                 />
//                 <div className="char-counter">{seoDescription.length}/160</div>
//               </div>
//             </div>
//           </form>
//         </section>

//         <div className="settings-modal-footer">
//           <button
//             className="save-settings-btn"
//             onClick={() => setShowSettingsModal(false)}
//           >
//             Save Settings
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="blog-editor-container">
//       <button
//         className="back-button"
//         onClick={() => navigate('/dashboard/blogs')}
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
//             <img src={bannerImage.preview || bannerImage} alt="Banner preview" />
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
//             <button onClick={() => setShowLinkModal(true)} title="Add Link">
//               <FaLink />
//             </button>
//           </div>
//         </div>

//         <button
//           className="settings-toggle"
//           onClick={() => setShowSettingsModal(true)}
//         >
//           <FaEllipsisV /> Settings
//         </button>
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
//             ref={quillRef}
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
//                   <div className="video-url-display">
//                     Original URL: {item.originalUrl}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="image-container" style={{ width: item.width }}>
//                   <img
//                     src={item.url || item.preview}
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
//                 <p className="video-url-help">
//                   Supports YouTube and Vimeo URLs (e.g., https://www.youtube.com/watch?v=... or https://vimeo.com/...)
//                 </p>
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

//       {/* Link Insert Modal */}
//       {showLinkModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Insert Link</h3>
//             <div className="form-group">
//               <label>Link Text</label>
//               <input
//                 type="text"
//                 value={linkText}
//                 onChange={(e) => setLinkText(e.target.value)}
//                 placeholder="Text to display"
//               />
//             </div>
//             <div className="form-group">
//               <label>URL</label>
//               <input
//                 type="text"
//                 value={linkUrl}
//                 onChange={(e) => setLinkUrl(e.target.value)}
//                 placeholder="https://example.com"
//               />
//             </div>
//             <div className="modal-actions">
//               <button onClick={() => setShowLinkModal(false)}>Cancel</button>
//               <button onClick={handleInsertLink}>Insert Link</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Settings Modal */}
//       {showSettingsModal && <SettingsModal />}
//     </div>
//   );
// };

// export default BlogEditor;