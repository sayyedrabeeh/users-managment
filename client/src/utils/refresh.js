// utils/refresh.js
import axios from 'axios';

export const getNewAccessToken = async (refresh) => {
  try {
    const res = await axios.post('http://localhost:8000/api/token/refresh/', {
      refresh: refresh
    });
    return res.data.access;
  } catch (err) {
    console.error("❌ Refresh failed", err);
    return null;
  }
};
