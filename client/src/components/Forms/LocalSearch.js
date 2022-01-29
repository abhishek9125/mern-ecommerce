import React from 'react';

function LocalSearch({ keyword, setKeyword }) {

    const handleSearchChange = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    }

    return (
        <input 
            type="search"
            placeholder="Filter Categories"
            value={keyword}
            onChange={handleSearchChange}
            className="form-control mb-4"
        />
    )
}

export default LocalSearch;
