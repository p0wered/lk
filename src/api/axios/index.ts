import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://lk.mfo-0.ru/api/v1/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('access_token'),
        'X-Custom-Header': 'CustomValue',
    },
});

// Опционально: добавляем интерцепторы
instance.interceptors.request.use(
    (config) => {
        // Можно динамически обновлять токен перед запросом
        const token = localStorage.getItem('access_token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error),
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error('Ошибка 401: Не авторизован');
            // Можно добавить редирект на /login
        }
        return Promise.reject(error);
    },
);

// Экспортируем готовый экземпляр
export default instance;