import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SearchBar from './searchbar';
import SearchResults from './searchresults';

function SearchApp() {
  const [results, setResults] = useState([]);
  const [data, setData] = useState([]);
  console.log("SearchApp");
  const handleSearch = (query) => {
      axios.get('http://localhost:3000/api/stacks?&title=' + query) //TODO Need to change this to parameterized url
        .then(response => {
          console.log(response.data);
          setResults(response.data);
        })
        .catch(error => {
          console.error(error);
        });
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {results.length > 0 ? (
        <SearchResults results={results} />
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}

export default SearchApp;
