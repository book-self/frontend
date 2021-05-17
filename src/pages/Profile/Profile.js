import { useEffect, useState } from 'react';
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

  return (
    <div>
      <Shelf lists={ bookLists } />
    </div>
  );
}
