import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './styles/createPost.css';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { userId } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Please write something to post');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:9291/api/posts', {
        userId: userId,
        content: content,
        image_url: imageUrl || null
      }, {
        withCredentials: true
      });

      // Clear form
      setContent('');
      setImageUrl('');
      
      // Notify parent component to refresh posts
      if (onPostCreated) {
        onPostCreated();
      }

      alert('✅ Post created successfully!');
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-card">
      <h2>📝 Create a Post</h2>
      
      <form onSubmit={handleSubmit} className="create-post-form">
        <textarea
          className="post-textarea"
          placeholder="What's on your mind? Share your farming tips, questions, or experiences..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
          required
        />

        <input
          type="text"
          className="image-url-input"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        {error && <p className="error-msg">{error}</p>}

        <button 
          type="submit" 
          className="post-submit-btn"
          disabled={loading}
        >
          {loading ? '📤 Posting...' : '📤 Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
