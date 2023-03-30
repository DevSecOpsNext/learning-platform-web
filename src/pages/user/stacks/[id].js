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
        <a href={item.discord}>Discord</a>
      </p>
      <p>{item.conent}</p>
    </div>
  );
}

function StackDetails() {
  const [results, setResults] = useState([]);
  const router = useRouter();
  const stackid = router.query.id;
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/stacks/' + stackid) //TODO need to change this to parameterized url
      .then((response) => {
        console.log(response.data);
        setResults(response.data);
      })
      .catch((error) => {
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
