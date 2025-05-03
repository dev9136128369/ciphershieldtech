import React, { useState, useRef, useEffect } from 'react';

const LinkedInArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('<p><br></p>');
  const [formats, setFormats] = useState({
    bold: false,
    italic: false,
    unorderedList: false,
    orderedList: false,
    blockquote: false,
    code: false
  });
  const [status, setStatus] = useState('Draft');
  const [coverImage, setCoverImage] = useState(null);
  const [articleUrl, setArticleUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  
  const contentEditableRef = useRef(null);
  const linkInputRef = useRef(null);
  const imageInputRef = useRef(null);

  // Formatting functions
  const toggleFormat = (format) => {
    document.execCommand(format, false, null);
    setFormats(prev => ({ ...prev, [format]: !prev[format] }));
    contentEditableRef.current.focus();
  };

  const insertLink = () => {
    if (linkUrl) {
      document.execCommand('createLink', false, linkUrl);
      setShowLinkInput(false);
      setLinkUrl('');
      contentEditableRef.current.focus();
    }
  };

  const insertImage = () => {
    if (imageUrl) {
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = 'User uploaded content';
      img.style.maxWidth = '100%';
      
      const selection = window.getSelection();
      if (selection.rangeCount) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(img);
      }
      
      setShowImageInput(false);
      setImageUrl('');
      contentEditableRef.current.focus();
    }
  };

  const handlePublish = () => {
    if (!title.trim()) {
      alert('Please add a title before publishing');
      return;
    }
    
    setStatus('Published');
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    setArticleUrl(`https://linkedin.com/pulse/${slug}-${Date.now().toString(36)}`);
  };

  const handleCoverImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContentChange = () => {
    if (contentEditableRef.current) {
      setContent(contentEditableRef.current.innerHTML);
    }
  };

  useEffect(() => {
    if (showLinkInput && linkInputRef.current) {
      linkInputRef.current.focus();
    }
  }, [showLinkInput]);

  useEffect(() => {
    if (showImageInput && imageInputRef.current) {
      imageInputRef.current.focus();
    }
  }, [showImageInput]);

  return (
    <div className="scaffold-layout">
      <section className="scaffold-layout-toolbar">
        <div className="scaffold-layout-toolbar__content">
          <div className="article-editor-nav__container">
            <div className="article-editor-nav__group-top">
              <div className="author-dropdown">
                <button className="dropdown-trigger">
                  <div className="author-lockup">
                    <div className="author-image-container">
                      <img 
                        src="https://media.licdn.com/dms/image/v2/D5635AQHZtNtK67MeGw/profile-framedphoto-shrink_100_100/B56ZYD7kLRGUAk-/0/1743822668859?e=1746860400&v=beta&t=oO8rP9d4K5qhSgUgSgGkfevZS2ZA39ekSDc5IbuiY_g" 
                        alt="Profile" 
                      />
                    </div>
                    <div className="author-info">
                      <span className="author-name">Yashveer Singh</span>
                      <svg className="caret-icon" width="16" height="16" viewBox="0 0 16 16">
                        <path d="M8 11L3 6h10z" fillRule="evenodd"></path>
                      </svg>
                      <span className="author-type">Individual article</span>
                    </div>
                  </div>
                </button>
              </div>

              <div className="article-actions">
                <div className="manage-dropdown">
                  <button className="dropdown-trigger">
                    Manage
                    <svg className="dropdown-icon" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M8 11L3 6h10z" fillRule="evenodd"></path>
                    </svg>
                  </button>
                </div>
                <button 
                  className={`publish-button ${status === 'Published' ? 'published' : ''}`}
                  onClick={handlePublish}
                >
                  {status === 'Draft' ? 'Publish' : 'Published'}
                </button>
              </div>
            </div>

            <div className="article-editor-toolbar">
              <div className="style-dropdown">
                <button className="dropdown-trigger">
                  Style
                  <svg className="dropdown-icon" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M8 11L3 6h10z" fillRule="evenodd"></path>
                  </svg>
                </button>
              </div>

              <div className="toolbar-group">
                <button 
                  className={`toolbar-button ${formats.bold ? 'active' : ''}`}
                  onClick={() => toggleFormat('bold')}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M15.6 11.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 7.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
                  </svg>
                </button>
                <button 
                  className={`toolbar-button ${formats.italic ? 'active' : ''}`}
                  onClick={() => toggleFormat('italic')}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M10 5.5c0 .83.67 1.5 1.5 1.5h.71l-3.42 8H7.5c-.83 0-1.5.67-1.5 1.5S6.67 18 7.5 18h5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-.71l3.42-8h1.29c.83 0 1.5-.67 1.5-1.5S17.33 4 16.5 4h-5c-.83 0-1.5.67-1.5 1.5z" />
                  </svg>
                </button>
              </div>

              <div className="toolbar-group">
                <button 
                  className={`toolbar-button ${formats.unorderedList ? 'active' : ''}`}
                  onClick={() => toggleFormat('insertUnorderedList')}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" />
                  </svg>
                </button>
                <button 
                  className={`toolbar-button ${formats.orderedList ? 'active' : ''}`}
                  onClick={() => toggleFormat('insertOrderedList')}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z" />
                  </svg>
                </button>
              </div>

              <div className="toolbar-group">
                <button 
                  className={`toolbar-button ${formats.blockquote ? 'active' : ''}`}
                  onClick={() => toggleFormat('formatBlock')}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                  </svg>
                </button>
                <button 
                  className={`toolbar-button ${formats.code ? 'active' : ''}`}
                  onClick={() => toggleFormat('formatBlock')}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                  </svg>
                </button>
                <button className="toolbar-button" onClick={() => document.execCommand('insertHorizontalRule', false, null)}>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M19 13H5v-2h14v2z" />
                  </svg>
                </button>
              </div>

              <div className="toolbar-group">
                <button 
                  className="toolbar-button"
                  onClick={() => setShowLinkInput(!showLinkInput)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
                  </svg>
                </button>
                <button 
                  className="toolbar-button"
                  onClick={() => setShowImageInput(!showImageInput)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="scaffold-layout__inner">
        <div className="scaffold-layout__content">
          <main className="article-editor-main">
            <div className="article-editor-container">
              {coverImage ? (
                <div 
                  className="article-editor-cover-image" 
                  style={{ backgroundImage: `url(${coverImage})` }}
                  onClick={() => setCoverImage(null)}
                ></div>
              ) : (
                <div className="article-editor-cover-image">
                  <div className="article-editor-cover-image__placeholder">
                    <svg className="cover-image-placeholder" width="64" height="64" viewBox="0 0 64 64">
                      <image href="https://static.licdn.com/aero-v1/sc/h/3v0qqn0qg9h47wg81rum0twek" x="0" y="0" width="64" height="64"></image>
                    </svg>
                    <fieldset className="cover-image-upload">
                      <legend>
                        <p>We recommend uploading an image that is <strong>1920x1080 pixels</strong></p>
                      </legend>
                      <div className="upload-buttons">
                        <label className="upload-button">
                          <input 
                            type="file" 
                            accept="image/*" 
                            style={{ display: 'none' }} 
                            onChange={handleCoverImageUpload}
                          />
                          Upload from computer
                        </label>
                      </div>
                    </fieldset>
                  </div>
                </div>
              )}

              <div className="article-editor-content-container">
                <div className="article-editor-headline">
                  <textarea
                    className="article-title"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength="150"
                  ></textarea>
                </div>

                <div className="article-editor-content">
                  <div
                    ref={contentEditableRef}
                    className="content-editable"
                    contentEditable
                    dangerouslySetInnerHTML={{ __html: content }}
                    onInput={handleContentChange}
                    data-placeholder="Write here. You can also include @mentions."
                  ></div>
                </div>

                {showLinkInput && (
                  <div className="link-input-container">
                    <input
                      ref={linkInputRef}
                      type="text"
                      placeholder="Paste URL"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && insertLink()}
                    />
                    <button onClick={insertLink}>Insert</button>
                    <button onClick={() => setShowLinkInput(false)}>Cancel</button>
                  </div>
                )}

                {showImageInput && (
                  <div className="image-input-container">
                    <input
                      ref={imageInputRef}
                      type="text"
                      placeholder="Paste image URL"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && insertImage()}
                    />
                    <button onClick={insertImage}>Insert</button>
                    <button onClick={() => setShowImageInput(false)}>Cancel</button>
                  </div>
                )}
              </div>

              <div className="article-status-container">
                <div className="article-status">
                  <span className={`status-dot ${status === 'Published' ? 'published' : ''}`}></span>
                  <span className="status-text">{status}</span>
                  {status === 'Published' && articleUrl && (
                    <div className="article-url">
                      <p>Your article is live: <a href={articleUrl} target="_blank" rel="noopener noreferrer">{articleUrl}</a></p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LinkedInArticle;