import axios from 'axios';
import { toast } from 'sonner';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000
});

 apiClient.interceptors.request.use((config)=>{
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401) {
            toast.error('Sessione scaduta, effettua di nuovo il login');
            localStorage.removeItem('token')
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;