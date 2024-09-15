/**
 * axios实例
 */
import axios, {AxiosError} from 'axios';
import type {AxiosResponse} from 'axios';
import type {R} from "@/interface/interface";

const baseURL = 'http://localhost:8080/api'
const instance = axios.create({
    baseURL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
});
instance.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});
instance.interceptors.response.use((response: AxiosResponse<R<any>>) => {
   return response;
}, (error: AxiosError) => {
    return Promise.reject(error);
});

export default instance