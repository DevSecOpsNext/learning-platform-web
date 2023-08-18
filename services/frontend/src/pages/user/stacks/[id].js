import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function DetailView({ item }) {
  return (
    <div>
      <h2>{item.title}</h2>
      <p>{item.categorisation}</p>
      <p>{item.skill_level}</p>
      <p>
        <a href={item.discord}>{item.discord}</a>
      </p>
      <p>{item.content}</p>
    </div>
  );
}

function StackDetails() {
  const [results, setResults] = useState([]);
  const router = useRouter();
  const stackid = router.query.id;
  const stackquery = `
    query {
      getStackById(id: ${stackid}) {
        id
        body
        title
        skill
        discord
        category
        content
      }        
    }
`;
console.log("stackquery : " + stackquery);
  useEffect(() => {
    axios.post('  http://localhost:3001/', { //TODO Need to change this to parameterized url
    query: stackquery
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(response.data.data.getStackById);
      setResults(response.data.data.getStackById);
    })
    .catch(error => {
      console.error(error);
    });

  }, []);
  return (
    <div>
      {results ? <DetailView item={results} /> : <p>Stack details not found</p>}
    </div>
  );
}

export default StackDetails;
