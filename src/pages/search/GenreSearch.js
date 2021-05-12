import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { CircularProgress, Typography } from '@material-ui/core';

import { SearchTable } from '../../components/SearchTable/SearchTable';


function fetchGenreResults(genre) {
  return fetch(`http://localhost:8080/v1/books/by-genre?genre=${encodeURI(genre)}`)
    .then(response => response.json())
    .then(json => json);
}


export const GenreSearch = () => {
  let { genre } = useParams();
  const [books, setBooks] = useState(null);


  useEffect(() => {
    async function getBooks() {
      setBooks(await fetchGenreResults(genre));
    }

    getBooks();
  }, [genre]);

  return (<>
    {
      !books ? 
        <CircularProgress style={{position: 'absolute', top: '50vh', left: '50vw'}} />
        :
        <SearchTable
          books={books}
          heading={
            <Typography variant="h4" style={{marginBottom: "5rem"}}>
              Displaying {books.length} book{books.length !== 1 ? 's' : ''} tagged <span style={{textTransform: 'lowercase', fontVariant: 'small-caps', fontWeight: 'bold'}}>{genre}</span>.
            </Typography>
          }
        />
    }
  </>);
}
