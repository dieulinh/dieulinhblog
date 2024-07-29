import React, { useRef } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

const Search = () => {
  const searchInputRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const query = {
      title: searchInputRef.current.value
    }
    const queryString = createSearchParams(query);

    navigate({
      pathname: '/articles',
      search: `?${queryString}`
    })
  };

  return (
    <form className="article-search-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="searchTerm">Search </label>
        <input
          type="text"
          id="searchTerm"
          ref={searchInputRef}
        />
        <button type="submit" className='btn btn-primary'>Search</button>
      </div>
    </form>
  );
};

export default Search;
