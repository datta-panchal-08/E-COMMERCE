import axios from 'axios';

const baseUrl = "http://localhost:3000/api/v1";
const token = localStorage.getItem("access-token");

const axiosInstanse = axios.create({
    baseURL:baseUrl,
    withCredentials:true,
    headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json"
    }
});

export const get = (url)=>axiosInstanse.get(url);
export const post = (url, data) => axiosInstanse.post(url, data);
export const put = (url,data)=> axiosInstanse.put(url,data);
export const del = (url,data)=>axiosInstanse.delete(url,data);