import React, { useState } from 'react';
import useFetchBreeds from '../hooks/useFetchBreeds';
import BreedsList from '../components/BreedsList';
import Pagination from "../components/Pagination.tsx";

const Home: React.FC = () => {
    const [page, setPage] = useState(1);
    const { breeds, loading, error } = useFetchBreeds(page);

    return (
        <div>
            <h1>Dog Breeds</h1>
            <BreedsList breeds={breeds} loading={loading} error={error} />
            <div>
             <Pagination page={page} setPage={setPage} />
            </div>
        </div>
    );
};

export default Home;