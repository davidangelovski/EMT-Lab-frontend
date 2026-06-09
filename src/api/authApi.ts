import axiosInstance from '../axios/axios.ts';
import type {AuthCredentials, AuthLog, AuthResponse} from './types/auth';

const authApi = {
    login: async (data: AuthCredentials) => {
        return await axiosInstance.post<AuthResponse>('/auth/login', data);
    },
    register: async (data: AuthCredentials) => {
        return await axiosInstance.post<AuthResponse>('/auth/register', data);
    },
    getLogs: async () => {
        return await axiosInstance.get<AuthLog[]>('/auth//auth-logs');
    },
    delete: async (id: string) => {
        return await axiosInstance.delete(`/auth/auth-logs/${id}`);
    }
};

export default authApi;

