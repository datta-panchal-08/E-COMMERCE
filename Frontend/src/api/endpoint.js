import axios from 'axios';

const baseUrl = "http://localhost:3000/api/v1";

const axiosInstanse = axios.create({
    baseURL:baseUrl,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json"
    }
});

export const get = (url)=>axiosInstanse.get(url);
export const post = (url, data, config = {}) => axiosInstanse.post(url, data, config);
export const put = (url,data,config={})=> axiosInstanse.put(url,data,config);
export const del = (url)=>axiosInstanse.delete(url);