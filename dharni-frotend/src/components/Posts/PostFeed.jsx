import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import CreatePost from './CreatePost';
import { socket } from '../socket/socket';
import './styles/postFeed.css';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeUserCount, setActiveUserCount] = useState({ onlineUsers: 0, totalUsers: 0 });

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:9291/api/posts', {
        withCredentials: true
      });
      setPosts(response.data.posts);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();

    // Listen for real-time active user count updates
    socket.on('active_user_count', (data) => {
      setActiveUserCount(data);
    });

    return () => {
      socket.off('active_user_count');
    };
  }, []);

  const handlePostCreated = () => {
    fetchPosts();
  };

  if (loading) {
    return <div className="loading-spinner">Loading posts...</div>;
  }

  return (
    <div className="post-feed-container">
      {/* Active Users Display */}
      <div className="active-users-banner">
        🌐 Active Users: <strong>{activeUserCount.onlineUsers}</strong> / Total: <strong>{activeUserCount.totalUsers}</strong>
      </div>

      {/* Create Post Component */}
      <CreatePost onPostCreated={handlePostCreated} />

      {/* Posts List */}
      <div className="posts-list">
        {posts.length === 0 ? (
          <div className="no-posts">
            <p>No posts yet. Be the first to share something!</p>
          </div>
        ) : (
          posts.map(post => (
            <PostCard key={Math.random()} post={post} onUpdate={fetchPosts} />
          ))
        )}
      </div>
    </div>
  );
};

export default PostFeed;
