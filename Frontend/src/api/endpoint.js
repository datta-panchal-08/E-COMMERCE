import axios from "axios";

const baseUrl = "http://localhost:3000/api/v1";

const axiosInstanse = axios.create({
  baseURL: baseUrl,
  withCredentials: true
});


axiosInstanse.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const get = (url) => axiosInstanse.get(url);

export const post = (url, data) =>
  axiosInstanse.post(url, data, {
    headers: data instanceof FormData
      ? { "Content-Type": "multipart/form-data" }
      : {}
  });

export const put = (url, data) =>
  axiosInstanse.put(url, data, {
    headers: data instanceof FormData
      ? { "Content-Type": "multipart/form-data" }
      : {}
  });

export const del = (url, data) =>
  axiosInstanse.delete(url, { data });