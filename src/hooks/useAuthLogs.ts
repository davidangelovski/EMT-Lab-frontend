import { useEffect, useState, useCallback } from 'react';
import authApi from '../api/authApi.ts';
import type {AuthLog} from '../api/types/auth.ts';

const useAuthLogs = () => {
    const [AuthLogs, setAuthlogs] = useState<AuthLog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await authApi.getLogs();
            setAuthlogs(response.data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An unknown error occurred.'));
        } finally {
            setLoading(false);
        }
    }, []);


    const onDelete = useCallback(async (id: number) => {
        await authApi.delete(id.toString());
        await fetch();
    },[fetch]);

    useEffect(() => {
        void Promise.resolve().then(fetch);
    }, [fetch]);

    return { AuthLogs, loading, error, fetch, onDelete };
};

export default useAuthLogs;