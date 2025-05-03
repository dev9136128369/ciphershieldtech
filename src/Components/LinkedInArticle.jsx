import React, { useState, useRef, useEffect } from 'react';

const LinkedInArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [articleStatus, setArticleStatus] = useState('Draft');
  const [showCoverOptions, setShowCoverOptions] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [articleUrl, setArticleUrl] = useState('');
  const contentEditableRef = useRef(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.innerText);
  };

  const handleFormat = (format) => {
    document.execCommand(format, false, null);
    if (format === 'bold') setIsBold(!isBold);
    if (format === 'italic') setIsItalic(!isItalic);
  };

  const handlePublish = () => {
    setArticleStatus('Published');
    // Generate a URL based on the title
    const url = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    setArticleUrl(`https://linkedin.com/pulse/${url}-${Date.now().toString(36)}`);
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

  useEffect(() => {
    if (contentEditableRef.current) {
      contentEditableRef.current.focus();
    }
  }, []);

  return (
    <div className="scaffold-layout scaffold-layout--breakpoint-md scaffold-layout--main scaffold-layout--reflow">
      <section className="scaffold-layout-toolbar">
        <div className="scaffold-layout-toolbar__content scaffold-layout-container scaffold-layout-container--reflow">
          <div className="article-editor-nav__container--small-width">
            <div className="article-editor-nav__group-top--small-width">
              <div className="artdeco-dropdown article-editor-actor-toggle__dropdown">
                <button className="artdeco-dropdown__trigger display-flex align-items-center" type="button">
                  <div className="artdeco-entity-lockup artdeco-entity-lockup--size-2">
                    <div className="display-flex">
                      <div className="article-editor-actor-toggle__lockup-image-container">
                        <div className="artdeco-entity-lockup__image article-editor-actor-toggle__author-lockup-container--author-image">
                          <img 
                            src="https://media.licdn.com/dms/image/v2/D5635AQHZtNtK67MeGw/profile-framedphoto-shrink_100_100/B56ZYD7kLRGUAk-/0/1743822668859?e=1746860400&v=beta&t=oO8rP9d4K5qhSgUgSgGkfevZS2ZA39ekSDc5IbuiY_g" 
                            alt="Profile" 
                            className="lazy-image"
                          />
                        </div>
                      </div>
                      <div className="article-editor-actor-toggle__author-lockup-content">
                        <div className="artdeco-entity-lockup__title article-editor-actor-toggle__author-lockup-title">
                          <span className="article-editor-actor-toggle__author-title text-body-medium-bold">
                            Yashveer Singh
                          </span>
                          <svg className="article-editor-actor-toggle__caret-icon" width="16" height="16" viewBox="0 0 16 16">
                            <path d="M8 11L3 6h10z" fillRule="evenodd"></path>
                          </svg>
                        </div>
                        <div className="artdeco-entity-lockup__subtitle">
                          <span className="text-body-small">
                            Individual article
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              <div className="article-editor-nav__group-right--small-width">
                <div className="artdeco-dropdown article-editor-manage-menu">
                  <button className="artdeco-dropdown__trigger article-editor-manage-menu__dropdown-trigger artdeco-button artdeco-button--secondary" type="button">
                    Manage
                    <svg className="artdeco-dropdown__trigger-icon" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M8 11L3 6h10z" fillRule="evenodd"></path>
                    </svg>
                  </button>
                </div>
                <button 
                  className="article-editor-nav__publish artdeco-button artdeco-button--primary" 
                  onClick={handlePublish}
                >
                  <svg className="artdeco-button__icon" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M5 3l6 5-6 5z" fillRule="evenodd"></path>
                  </svg>
                  <span className="artdeco-button__text">
                    {articleStatus === 'Draft' ? 'Publish' : 'Published'}
                  </span>
                </button>
              </div>
            </div>

            <div className="article-editor-toolbar article-editor-toolbar__container--small-width">
              <div className="artdeco-dropdown article-editor-toolbar__heading-dropdown">
                <button className="article-editor-toolbar__heading-dropdown-trigger artdeco-button artdeco-button--tertiary artdeco-button--muted" type="button">
                  Style
                  <svg className="artdeco-dropdown__trigger-icon" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M8 11L3 6h10z" fillRule="evenodd"></path>
                  </svg>
                </button>
              </div>

              <div className="article-editor-toolbar__button-group">
                <button 
                  className={`scaffold-formatted-text-editor-icon-button ${isBold ? 'active' : ''}`}
                  onClick={() => handleFormat('bold')}
                  aria-pressed={isBold}
                >
                  <svg className="scaffold-formatted-text-editor-icon" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M15.6 11.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 7.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
                  </svg>
                </button>
                <button 
                  className={`scaffold-formatted-text-editor-icon-button ${isItalic ? 'active' : ''}`}
                  onClick={() => handleFormat('italic')}
                  aria-pressed={isItalic}
                >
                  <svg className="scaffold-formatted-text-editor-icon" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M10 5.5c0 .83.67 1.5 1.5 1.5h.71l-3.42 8H7.5c-.83 0-1.5.67-1.5 1.5S6.67 18 7.5 18h5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-.71l3.42-8h1.29c.83 0 1.5-.67 1.5-1.5S17.33 4 16.5 4h-5c-.83 0-1.5.67-1.5 1.5z" />
                  </svg>
                </button>
              </div>

              <div className="article-editor-toolbar__button-group">
                <button className="scaffold-formatted-text-editor-icon-button" onClick={() => handleFormat('insertUnorderedList')}>
                  <svg className="scaffold-formatted-text-editor-icon" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" />
                  </svg>
                </button>
                <button className="scaffold-formatted-text-editor-icon-button" onClick={() => handleFormat('insertOrderedList')}>
                  <svg className="scaffold-formatted-text-editor-icon" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z" />
                  </svg>
                </button>
              </div>

              <div className="article-editor-toolbar__button-group">
                <button className="scaffold-formatted-text-editor-icon-button" onClick={() => handleFormat('formatBlock', '<blockquote>')}>
                  <svg className="scaffold-formatted-text-editor-icon" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                  </svg>
                </button>
                <button className="scaffold-formatted-text-editor-icon-button">
                  <svg className="scaffold-formatted-text-editor-icon" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                  </svg>
                </button>
                <button className="scaffold-formatted-text-editor-icon-button">
                  <svg className="scaffold-formatted-text-editor-icon" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M19 13H5v-2h14v2z" />
                  </svg>
                </button>
              </div>

              <div className="article-editor-toolbar__button-group">
                <button className="scaffold-formatted-text-editor-icon-button article-editor-toolbar__link-button">
                  <svg className="scaffold-formatted-text-editor-icon" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
                  </svg>
                </button>
                <button className="scaffold-formatted-text-editor-icon-button article-editor-toolbar__embed-button">
                  <svg className="scaffold-formatted-text-editor-icon" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M17 15h2V7c0-1.1-.9-2-2-2H9v2h8v8zM7 17V1H5v4H1v2h4v10c0 1.1.9 2 2 2h10v4h2v-4h4v-2H7z" />
                  </svg>
                </button>
              </div>

              <div className="article-editor-toolbar__button-group">
                <button 
                  className="scaffold-formatted-text-editor-icon-button" 
                  onClick={() => setShowCoverOptions(!showCoverOptions)}
                >
                  <svg className="scaffold-formatted-text-editor-icon" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="scaffold-layout__inner scaffold-layout-container scaffold-layout-container--reflow">
        <div className="scaffold-layout__row scaffold-layout__content scaffold-layout__content--main">
          <main className="article-editor-main">
            <div className="article-editor-container">
              {coverImage ? (
                <div className="article-editor-cover-image" style={{ backgroundImage: `url(${coverImage})` }}></div>
              ) : (
                <div className="article-editor-cover-image">
                  <div className="article-editor-cover-image__placeholder">
                    <svg className="article-editor-cover-image__placeholder-illustration" width="64" height="64" viewBox="0 0 64 64">
                      <image href="https://static.licdn.com/aero-v1/sc/h/3v0qqn0qg9h47wg81rum0twek" x="0" y="0" width="64" height="64"></image>
                    </svg>
                    <fieldset className="article-editor-cover-image__file-input-description">
                      <legend>
                        <p className="article-editor-cover-image__placeholder-description">
                          We recommend uploading or dragging in an image that is <strong>1920x1080 pixels</strong>
                        </p>
                      </legend>
                      <div className="article-editor-cover-image__buttons-container">
                        <label className="artdeco-button artdeco-button--muted artdeco-button--secondary">
                          <input 
                            type="file" 
                            accept="image/*" 
                            style={{ display: 'none' }} 
                            onChange={handleCoverImageUpload}
                          />
                          <svg className="artdeco-button__icon" width="16" height="16" viewBox="0 0 16 16">
                            <path d="M8 11L3 6h10z" fillRule="evenodd"></path>
                          </svg>
                          <span className="artdeco-button__text">Upload from computer</span>
                        </label>
                      </div>
                    </fieldset>
                  </div>
                </div>
              )}

              <div className="article-editor-content-container">
                <div className="article-editor-headline">
                  <label className="a11y-text" htmlFor="article-editor-headline__textarea">Title</label>
                  <textarea
                    id="article-editor-headline__textarea"
                    className="article-editor-headline__textarea"
                    placeholder="Title"
                    required
                    maxLength="150"
                    rows="1"
                    value={title}
                    onChange={handleTitleChange}
                  ></textarea>
                </div>

                <div className="article-editor-content">
                  <div 
                    ref={contentEditableRef}
                    className="ProseMirror"
                    contentEditable
                    aria-label="Article editor content"
                    role="textbox"
                    aria-required="true"
                    onInput={handleContentChange}
                    dangerouslySetInnerHTML={{ __html: content }}
                  ></div>
                </div>
                <div className="article-editor-content__whitespace"></div>
              </div>

              <div className="article-editor-article-status__container">
                <div className="article-editor-article-status">
                  <span className={`article-editor-article-status__dot ${articleStatus === 'Published' ? 'published' : ''}`}></span>
                  <span className="article-editor-article-status__message">
                    {articleStatus}
                  </span>
                  {articleStatus === 'Published' && articleUrl && (
                    <div className="article-url-container">
                      <p>Your article is live at: <a href={articleUrl} target="_blank" rel="noopener noreferrer">{articleUrl}</a></p>
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