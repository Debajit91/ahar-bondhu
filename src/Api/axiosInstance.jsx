import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ahar-bondhu-server.vercel.app'
});

export default axiosInstance;
