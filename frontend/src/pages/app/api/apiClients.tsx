// apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8001/",
  // baseURL: "https://dev.aaranerp.com",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = "token 743fefa65c07d13:7252c8e316f7424";
    // const token = "token 81476558b8a8769:098aef2b157bef4"; // Replace with your actual token
    if (token) {
      config.headers["Authorization"] = token; // ✅ No "Bearer"
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
