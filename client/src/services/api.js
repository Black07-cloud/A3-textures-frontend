import axios from "axios";

const api = axios.create({
  baseURL: "https://a3-textures-backend.onrender.com/api",
  withCredentials: true
});

export default api;
