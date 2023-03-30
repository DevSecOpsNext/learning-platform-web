import React from 'react';
import Link from 'next/link';


function SearchResults({ results }) {

    return (
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Categorisation</th>
              <th>Skill Level</th>
              <th>Discord</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result._id}>
                <td>
                  <Link href={`/user/stacks/${result._id}`}>
                    <a>{result.title}</a>
                </Link>
               </td>
                <td>{result.title}</td>                
                <td>{result.categorisation}</td>
                <td>{result.skill_level}</td>
                <td>{result.discord}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
}

export default SearchResults;
