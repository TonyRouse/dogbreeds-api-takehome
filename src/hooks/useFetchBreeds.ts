import { useEffect, useState } from 'react';
import { Breed } from '../types/Breed';
import { fetchDogs } from '../api/dogService';
import { mockFetchDogs } from '../api/mockDogService';

const useFetchBreeds = (page: number) => {
    const [breeds, setBreeds] = useState<Breed[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBreeds = async () => {
            setLoading(true);
            setError(null);
            const useMock = false;
            const data = (useMock) ? await mockFetchDogs(page) : await fetchDogs(page);

            if (Array.isArray(data)) {
                setBreeds(data);
            } else if ('error' in data) {
                setError(data.error);
            }
            setLoading(false);
        };

        loadBreeds();
    }, [page]);

    return { breeds, loading, error };
};

export default useFetchBreeds;