import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// 创建 Axios 实例
const Axios: AxiosInstance = axios.create({
    baseURL: 'https://api.example.com', // 替换为你的 API 基础 URL
    timeout: 10000, // 设置请求超时时间
});

// 请求拦截器
Axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
Axios.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    error => {
        // 处理响应错误
        if (error.response) {
            // 服务器返回的错误状态码
            console.error('Response error:', error.response.status, error.response.data);
        } else if (error.request) {
            // 请求已发送但没有收到响应
            console.error('Request error:', error.request);
        } else {
            // 其他错误
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default function ({ url, method, data, headers }: InternalAxiosRequestConfig) {
    const options: InternalAxiosRequestConfig = {
        url,
        method,
        headers
    };
    if (method && method.toLowerCase() === 'get') {
        options.params = data;
    } else {
        options.data = data;
    }
    return Axios(options);
}
