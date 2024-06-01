import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" :  process.env.REACT_APP_BASE_URL;

// Create an instance of Axios with custom configuration
export const apiRequest = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Correctly set withCredentials to true
});
