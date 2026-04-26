import { useCallback, useEffect, useState } from 'react';
import authorApi from '../api/authorApi';
import type { Author } from '../api/types/author';

const useAuthor = (id?: string) => {
    const [author, setAuthor] = useState<Author | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetch = useCallback(async () => {
        if (!id) {
            return;
        }

        setLoading(true);

        try {
            const response = await authorApi.findById(id);
            setAuthor(response.data);
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

    return { author, loading, error };
};

export default useAuthor;

