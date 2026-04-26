import axiosInstance from '../axios/axios.ts';
import type { Book } from './types/book.ts';

const bookApi = {
    findAll: async () => {
        return await axiosInstance.get<Book[]>('/books');
    },
    findById: async (id: string) => {
        return await axiosInstance.get<Book>(`/books/${id}`);
    }
};

export default bookApi;