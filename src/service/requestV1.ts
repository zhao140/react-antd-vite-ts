import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://192.168.1.52:5000';

// 创建 Axios 实例
const Axios: AxiosInstance = axios.create({
    baseURL,
    timeout: 30000, // 设置请求超时时间
});

// 请求拦截器
Axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        if (!config.headers['Content-Type']) {
            config.headers['Content-Type'] = 'application/json';
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

export default function <T>({
    url,
    method,
    data,
    headers = {} as AxiosRequestHeaders,
}: Partial<InternalAxiosRequestConfig>): Promise<AxiosResponse<T>> {
    const options: InternalAxiosRequestConfig = {
        url,
        method,
        headers,
    };
    if (method && method.toLowerCase() === 'get') {
        options.params = data;
    } else {
        options.data = data;
    }

    return new Promise((resolve, reject) => {
        Axios(options)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
}
