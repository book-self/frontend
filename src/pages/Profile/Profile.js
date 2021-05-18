import { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import Shelf from '../../components/Shelf/Shelf';
import { fetchBookLists } from '../../components/Shelf/ShelfFetch';

export const Profile = () => {

  // Login guys: where do we get user id from?
  const userId = 8;
  const [bookLists, setBookLists] = useState([]);

  useEffect(() => {
    (
      async () => {
        const { data } = await fetchBookLists(userId);
        setBookLists(data);
      }
    )()
  }, [])

  console.log(bookLists)

  return (
    <Container maxWidth="sm">
      <Shelf lists={ bookLists } />
    </Container>
  );
}
