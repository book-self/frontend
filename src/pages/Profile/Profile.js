// import { useEffect, useState } from 'react';
// import { Container } from '@material-ui/core';
// import Shelf from '../../components/Shelf/Shelf';
// import { fetchBookLists } from '../../components/Shelf/ShelfFetch';

export const Profile = () => {

  /**
   * Component Shelf lists all the book lists of a user.
   * Commented out here until login feature is completed and
   * we know where to get user id from...
   * Login guys: where do we get user id from?
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

  return (
    <Container maxWidth="sm">
      <Shelf lists={ bookLists } />
    </Container>
  );
   */
  return(
    <div>
      Profile
    </div>
  )
}
