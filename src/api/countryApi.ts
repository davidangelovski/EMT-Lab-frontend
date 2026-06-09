import axiosInstance from '../axios/axios.ts';
import type { Country, CountryFormData } from './types/country.ts';

const countryApi = {
    findAll: async () => {
        return await axiosInstance.get<Country[]>('/countries');
    },
    findById: async (id: string) => {
        return await axiosInstance.get<Country>(`/countries/${id}`);
    },
    add: async (data: CountryFormData) => {
        return await axiosInstance.post<Country>('/countries', data);
    },
    edit: async (id: string, data: CountryFormData) => {
        return await axiosInstance.put<Country>(`/countries/${id}`, data);
    },
    delete: async (id: string) => {
        return await axiosInstance.delete(`/countries/${id}`);
    }
};

export default countryApi;

