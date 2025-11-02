import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../Posts/PostCard';
import styles from './SearchPage.module.css';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState({ posts: [], users: [] });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query && query.length >= 2) {
      performSearch();
    }
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:9291/api/search?q=${encodeURIComponent(query)}`, {
        withCredentials: true
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
      setError(error.response?.data?.message || 'An error occurred while searching');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Searching...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.searchPage}>
      <h2>Search Results for "{query}"</h2>
      
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'posts' ? styles.active : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          Posts ({results.posts?.length || 0})
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'users' ? styles.active : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Farmers ({results.users?.length || 0})
        </button>
      </div>

      {activeTab === 'posts' && (
        <div className={styles.results}>
          {results.posts?.length > 0 ? (
            results.posts.map((post) => (
              // ✅ FIX: Use unique key with prefix to avoid conflicts
              <PostCard key={`post-${post.id}`} post={post} />
            ))
          ) : (
            <p className={styles.noResults}>No posts found</p>
          )}
        </div>
      )}

      {activeTab === 'users' && (
        <div className={styles.userResults}>
          {results.users?.length > 0 ? (
            results.users.map((user) => (
              // ✅ FIX: Use unique key with prefix to avoid conflicts
              <div key={`user-${user.id}`} className={styles.userCard}>
                <img src={user.profilephoto || 'default-avatar.png'} alt={user.email} />
                <div>
                  <h3>{user.username || user.email  }</h3>
                  <p>{user.email}</p>
                  <p>{user.role || 'User'} • {user.location || 'Location not set'}</p>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noResults}>No farmers found</p>
          )}
        </div>
      )}
    </div>
  );
}
