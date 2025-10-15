import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "http://localhost:8080",
  timeout: 30000,
});

export default api;
