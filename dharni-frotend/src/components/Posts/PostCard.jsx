import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './styles/postCard.css';

const PostCard = ({ post, onUpdate }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.like_count || 0);
  const [commentCount, setCommentCount] = useState(post.comment_count || 0);
  const [shareCount, setShareCount] = useState(post.share_count || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { userId } = useContext(AuthContext);

  // Handle like/unlike
  const handleLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:9291/api/posts/${post.id}/like`,
        { userId: userId },
        { withCredentials: true }
      );

      if (response.data.liked) {
        setLiked(true);
        setLikeCount(likeCount + 1);
      } else {
        setLiked(false);
        setLikeCount(likeCount - 1);
      }
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  // Fetch comments
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9291/api/posts/${post.id}/comments`,
        { withCredentials: true }
      );
      setComments(response.data.comments);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  // Toggle comments visibility
  const toggleComments = () => {
    if (!showComments) {
      fetchComments();
    }
    setShowComments(!showComments);
  };

  // Add comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      await axios.post(
        `http://localhost:9291/api/posts/${post.id}/comment`,
        { userId: userId, content: newComment },
        { withCredentials: true }
      );

      setNewComment('');
      setCommentCount(commentCount + 1);
      fetchComments();
    } catch (err) {
      console.error('Error adding comment:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle share
  const handleShare = async () => {
    try {
      await axios.post(
        `http://localhost:9291/api/posts/${post.id}/share`,
        { userId: userId },
        { withCredentials: true }
      );
      setShareCount(shareCount + 1);
      alert('📤 Post shared successfully!');
    } catch (err) {
      console.error('Error sharing post:', err);
    }
  };

  return (
    <div className="post-card">
      {/* Post Header */}
      <div className="post-header">
        <img
          src={post.profilephoto || '/default-avatar.png'}
          alt={post.username || post.email}
          className="post-user-photo"
        />
        <div className="post-user-info">
          <h3>{post.username || post.email}</h3>
          <p className="post-meta">
            {post.role} • {post.location} • {new Date(post.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <div className="post-content">
        <p>{post.content}</p>
        {post.image_url && (
          <img src={post.image_url} alt="Post" className="post-image" />
        )}
      </div>

      {/* Post Actions */}
      <div className="post-actions">
        <button 
          className={`action-btn ${liked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          👍 {likeCount}
        </button>
        <button className="action-btn" onClick={toggleComments}>
          💬 {commentCount}
        </button>
        <button className="action-btn" onClick={handleShare}>
          🔗 {shareCount}
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="comments-section">
          <form onSubmit={handleAddComment} className="comment-form">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-input"
            />
            <button type="submit" disabled={loading} className="comment-submit">
              {loading ? '⏳' : '💬'}
            </button>
          </form>

          <div className="comments-list">
            {comments.map(comment => (
              <div key={comment.id} className="comment-item">
                <img
                  src={comment.profile_photo || '/default-avatar.png'}
                  alt={comment.email}
                  className="comment-user-photo"
                />
                <div className="comment-content">
                  <strong>{comment.username || comment.email}</strong>
                  <p>{comment.content}</p>
                  <span className="comment-time">
                    {new Date(comment.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
