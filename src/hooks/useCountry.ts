import { useCallback, useEffect, useState } from 'react';
import countryApi from '../api/countryApi';
import type { Country } from '../api/types/country';

const useCountry = (id?: string) => {
    const [country, setCountry] = useState<Country | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetch = useCallback(async () => {
        if (!id) {
            return;
        }

        setLoading(true);

        try {
            const response = await countryApi.findById(id);
            setCountry(response.data);
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

    return { country, loading, error };
};

export default useCountry;

