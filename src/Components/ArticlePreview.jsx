import React, { useState } from 'react';
import axios from 'axios';

const ArticlePreview = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('');
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form submission for previewing the article
  const handlePreviewClick = (e) => {
    e.preventDefault();

    // Show loader when data is being sent to the server
    setLoading(true);

    // Prepare article data for submission
    const articleData = {
      csrfmiddlewaretoken: document.cookie.match(/csrftoken=([^;]+)/)[1], // Get CSRF token from cookies
      action: 'preview', // Hardcoded action value
      title,
      category,
      image,
      body,
      tags,
      status,
    };

    // Replace this with the correct backend URL
    const articleURL = 'http://localhost:8000/api/article/preview'; // This is an example URL

    // Send POST request to the server
    postArticle(articleURL, articleData);
  };

  // Function to send article data to the backend and get the response
  const postArticle = (articleURL, articleData) => {
    axios
      .post(articleURL, articleData)
      .then((response) => {
        setLoading(false); // Hide loader when response is received

        // Store the preview data in state to display in the modal
        setPreviewData(response.data);
      })
      .catch((error) => {
        setLoading(false); // Hide loader in case of an error
        console.error('There was an error posting the article:', error);
      });
  };

  return (
    <div>
      <form>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div>
          <label>Tags:</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <button id="preview-article" onClick={handlePreviewClick}>
          Preview Article
        </button>
      </form>

      {/* Show loading spinner */}
      {loading && <div id="modal-loader">Loading...</div>}

      {/* Display the article preview if data is received */}
      {previewData && !loading && (
        <div id="dynamic-content">
          <article className="blog-post px-3 py-5 p-md-5">
            <div className="container">
              <header className="blog-post-header">
                <h2 className="title mb-2">{previewData.title}</h2>
                <div className="meta mb-3">
                  <span className="date">{previewData.category}</span>
                </div>
              </header>

              <div className="blog-post-body">
                <figure className="blog-banner">
                  <img
                    className="img-fluid"
                    src={previewData.image}
                    alt="article image"
                  />
                  <figcaption className="mt-2 text-center image-caption">
                    Image Credit: <a href="https://made4dev.com">made4dev.com</a>
                  </figcaption>
                </figure>
                <p>{previewData.body}</p>
              </div>
            </div>
          </article>
        </div>
      )}
    </div>
  );
};

export default ArticlePreview;
