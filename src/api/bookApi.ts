import axiosInstance from '../axios/axios.ts';
import type {Book, BookFormData} from './types/book.ts';

const bookApi = {
    findAll: async () => {
        return await axiosInstance.get<Book[]>('/books');
    },
    findById: async (id: string) => {
        return await axiosInstance.get<Book>(`/books/${id}`);
    },
    add: async (data: BookFormData) => {
        return await axiosInstance.post<Book>('/books', data);
    },
    edit: async (id: string, data: BookFormData) => {
        return await axiosInstance.put<Book>(`/books/${id}`, data);
    },
    delete: async (id: string) => {
        return await axiosInstance.delete(`/books/${id}`);
    }
};

export default bookApi;