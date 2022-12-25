import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1';

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
  timeout: 2000,
});

export default axiosClient;
