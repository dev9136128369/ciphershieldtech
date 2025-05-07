import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const EditPostPage = () => {
  const { search } = useLocation(); // Get the URL query parameters
  const navigate = useNavigate(); // To navigate after editing the post
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const params = new URLSearchParams(search);
  const postId = params.get('id');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiBaseUrl}/api/posts/${postId}`);
        if (response.data && response.data.post) {
          setPost(response.data.post);
          setFormData({
            title: response.data.post.title,
            content: response.data.post.content,
          });
        }
      } catch (err) {
        setError('Failed to fetch post.');
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    } else {
      setError('Post ID is missing.');
      setLoading(false);
    }
  }, [postId]);

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission to update the post
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${apiBaseUrl}/api/posts/${postId}`,
        formData, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you have authentication
          },
        }
      );
      if (response.data.success) {
        alert('Post updated successfully!');
        navigate(`/view-post/${postId}`); // Redirect to the view page after successful update
      } else {
        alert('Failed to update the post.');
      }
    } catch (err) {
      setError('Failed to update post. Please try again.');
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="6"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPostPage;
