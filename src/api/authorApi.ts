import axiosInstance from '../axios/axios.ts';
import type { Author, AuthorFormData } from './types/author.ts';

const authorApi = {
    findAll: async () => {
        return await axiosInstance.get<Author[]>('/authors');
    },
    findById: async (id: string) => {
        return await axiosInstance.get<Author>(`/authors/${id}`);
    },
    add: async (data: AuthorFormData) => {
        return await axiosInstance.post<Author>('/authors', data);
    },
    edit: async (id: string, data: AuthorFormData) => {
        return await axiosInstance.put<Author>(`/authors/${id}`, data);
    },
    delete: async (id: string) => {
        return await axiosInstance.delete(`/authors/${id}`);
    }
};

export default authorApi;

