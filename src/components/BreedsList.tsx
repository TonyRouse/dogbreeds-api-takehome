import React from 'react';
import { Breed } from '../types/Breed';

interface BreedsListProps {
    breeds: Breed[];
    loading: boolean;
    error: string | null;
}

const BreedsList: React.FC<BreedsListProps> = ({ breeds, loading, error }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (breeds.length === 0) return <div>No Dogs available.</div>;

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul style={{listStyleType: 'none', padding: 0}}>
                {breeds.map((breed) => (
                    <li key={breed.breed} style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                        {breed.image ? (
                            <img
                                src={breed.image}
                                alt={breed.breed}
                                style={{width: '150px', height: 'auto', marginRight: '20px'}}
                                onError={(e) => {
                                    // Set a default placeholder image on error
                                    e.currentTarget.src = 'img.png'; // Update to your placeholder image path
                                    e.currentTarget.onerror = null; // Prevents infinite loop if the placeholder image fails
                                }}
                            />
                        ) : (
                            <img
                                src="img.png"
                                alt="No image available"
                                style={{width: '150px', height: 'auto', marginRight: '20px'}}
                            />
                        )}
                        <h2>{breed.breed}</h2>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BreedsList;