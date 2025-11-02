import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TopNavbar.module.css';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleFocus = () => {
    navigate('/feed/search');
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim().length >= 2) {
      navigate(`/feed/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <input
        type="text"
        className={styles.searchBar}
        placeholder="🔍 Search posts or farmers"
        value={searchQuery}
        onChange={handleChange}
        onFocus={handleFocus}
      />
    </form>
  );
}
