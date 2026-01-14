import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    headers:{
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
      const userId = localStorage.getItem("userId");
  
      if (userId && userId !== "undefined" && userId !== "null") {
        config.headers["X-User-Id"] = userId;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default api;