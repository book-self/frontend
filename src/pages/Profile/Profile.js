import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';

// import { Container } from '@material-ui/core';
// import Shelf from '../../components/Shelf/Shelf';
// import { fetchBookLists } from '../../components/Shelf/ShelfFetch';
import { Link } from "react-router-dom";
import {fetchUserBookLists} from './ProfileFetch';
export const Profile = () => {

  //const [userId = 8;
  //const [userId, setUserId] = useState(null);
  const userId = null;
  const [bookLists, setBookLists] = useState([]);

  useEffect(() =>
  {
    if(userId === null) return;
    async function getUserBookLists() {
      setBookLists(await fetchUserBookLists(userId));
    }
    getUserBookLists();
  },[userId]
    )
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
        const { data } = await fetchUserBookLists(userId);
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
      {
        !bookLists ? null :
        <div>
          {bookLists.map((bookList, j) => {
            return (
              <div>
            <Button component={ Link } to={"/profile/book-list/" + bookList.id} variant="contained" color="primary">
              {bookList.listType}
              
            </Button>
          </div>
            )
           
          }

          )}
           
        </div>
      }
    </div>
  )
}
