import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SearchBar from './searchbar';
import SearchResults from './searchresults';

function SearchApp() {
  const [results, setResults] = useState([]);
  const [data, setData] = useState([]);
  console.log("SearchApp");


  const handleSearch = (title) => {
    //how to invoke graphql query using axios
    
    const stackquery = `
    query {
      searchStacksByTitle (title:"${title}") {
        id
        body
        title
        skill
        discord
        category
      }
    }
`;

console.log("stackquery : " + stackquery);

axios.post('  http://localhost:3001/', { //TODO Need to change this to parameterized url
  query: stackquery
}, {
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log(response.data.data.searchStacksByTitle);
  setResults(response.data.data.searchStacksByTitle);
})
.catch(error => {
  console.error(error);
});

  //     axios.get('http://localhost:3000/api/stacks?&title=' + title) //TODO Need to change this to parameterized url
  //       .then(response => {
  //         console.log(response.data);
  //         setResults(response.data);
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
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
