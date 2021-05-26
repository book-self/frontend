import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';

import { Link } from "react-router-dom";
import {fetchUserBookLists} from './ProfileFetch';
export const Profile = () => {

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
