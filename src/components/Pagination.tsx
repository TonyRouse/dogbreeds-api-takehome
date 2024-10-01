import React from 'react';

interface PaginationProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ page, setPage }) => {
    return (
        <div>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                Previous
            </button>
            <button onClick={() => setPage(page + 1)}>
                Next
            </button>
            <strong>Page: {page}</strong>
        </div>
    );
};

export default Pagination;