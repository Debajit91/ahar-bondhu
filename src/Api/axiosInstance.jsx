import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE,      // e.g. http://localhost:5000
  withCredentials: false,  // keep if you use cookies/sessions
});

// Helper URL for the streaming endpoint (fetch uses full URL)
export const chatURL = `${API_BASE.replace(/\/$/, "")}/api/chat`;

export default axiosInstance;
