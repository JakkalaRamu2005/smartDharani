import axios from 'axios';

const API_URL = 'http://localhost:9291/api';

// Get user profile
export const getProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/profile/${userId}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

// Update user profile
export const updateProfile = async (userId, data) => {
  try {
    const response = await axios.put(`${API_URL}/profile/${userId}`, data, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};
