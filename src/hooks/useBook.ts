import { useEffect, useState, useCallback } from 'react';
import bookApi from '../api/bookApi';
import type { Book } from '../api/types/book';

const useBook = (id?: string) => {
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetch = useCallback(async () => {
        if (!id) {
            return;
        }

        setLoading(true);

        try {
            const response = await bookApi.findById(id);
            setBook(response.data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An unknown error occurred.'));
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        void fetch();
    }, [fetch]);

    return { book, loading, error };
};

export default useBook;