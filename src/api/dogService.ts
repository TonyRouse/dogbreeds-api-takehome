import { Breed } from '../types/Breed';
import { BreedResponse } from '../types/BreedResponse';

export const fetchDogs = async (page: number): Promise<BreedResponse> => {
    try {

        const response = await fetch(`/api/fetchBreeds?page=${page}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: (Breed | { error: string })[] = await response.json();

        // Filter out invalid records that do not have the required keys
        const validBreeds = data.filter((item): item is Breed => {
            return typeof item.breed === 'string' && (typeof item.image === 'string' || item.image === null);
        });

        return validBreeds;
    } catch (error) {
        return { error: error instanceof Error ? error.message : 'An unknown error occurred' };
    }
};