import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { CircularProgress, Typography } from '@material-ui/core';
import _ from 'lodash';

import { SearchTable } from '../../components/SearchTable/SearchTable';


function useQuery() { return new URLSearchParams(useLocation().search); }
function fetchQueryResults(query) {
  return fetch(`http://localhost:8080/v1/books/search?q=${encodeURI(query)}`)
    .then(response => response.json())
    .then(json => json);
}


export const QuerySearch = () => {
  const [query] = useState(useQuery().get("q"));
  const [books, setBooks] = useState(null);


  useEffect(() => {
    async function getBooks() {
      setBooks(await fetchQueryResults(query));
      
    }

    getBooks();
  }, [query]);

  return (<>
    {
      !books ? 
        <CircularProgress style={{position: 'absolute', top: '50vh', left: '50vw'}} />
        :
        <SearchTable
          books={books.map(book => (_.pick(book, ['book'])['book']))}
          heading={
            <Typography variant="h4" style={{marginBottom: "5rem"}}>
              We've found {books.length} result{books.length !== 1 ? 's' : ''} for <span style={{textTransform: 'lowercase', fontVariant: 'small-caps', fontWeight: 'bold'}}>{query}</span>.
            </Typography>
          }
        />
    }
  </>);
}
