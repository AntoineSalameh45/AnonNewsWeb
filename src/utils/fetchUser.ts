import axios from 'axios';
import getCookie from './getCookie';

const fetchUser = axios.create({
    baseURL: 'https://backend-practice.euriskomobility.me',
    headers: {
        'Content-Type': 'application/json',
    },
    });

fetchUser.interceptors.request.use(
    (config) => {
        const token = getCookie("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default fetchUser;