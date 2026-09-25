import axios from "axios";
import { BASE_URL } from "../Constants/constants";


const AxiosInstance=axios.create({
    baseURL : BASE_URL,
    withCredentials: true
})

AxiosInstance.interceptors.request.use(function(config) {
    const token = localStorage.getItem('token');

    if(token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }   
    return config;
});

export default AxiosInstance