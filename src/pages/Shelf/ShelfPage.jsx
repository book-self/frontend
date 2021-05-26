import { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { Shelf } from '../../components/Shelf/Shelf';
import { fetchBookLists } from '../../components/Shelf/ShelfFetch';

export const ShelfPage = ({ location }) => {

  const [bookLists, setBookLists] = useState([]);

  useEffect(() => {
    (
      async () => {
        const userId = 1;
        const { data } = await fetchBookLists(userId);
        setBookLists(data);
      }
    )()
  }, [])

  return (
    <Container maxWidth="sm">
      <Shelf lists={ bookLists } />
    </Container>
  );
}
