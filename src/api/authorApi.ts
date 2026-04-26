import axiosInstance from '../axios/axios.ts';
import type { Author } from './types/author.ts';

const authorApi = {
    findAll: async () => {
        return await axiosInstance.get<Author[]>('/authors');
    },
    findById: async (id: string) => {
        return await axiosInstance.get<Author>(`/authors/${id}`);
    }
};

export default authorApi;

