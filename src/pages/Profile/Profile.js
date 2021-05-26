import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/User/UserSlice';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import {fetchUserBookLists} from './ProfileFetch';

export const Profile = () => {

  const { username, id, email } = useSelector(selectUser);

  const [bookLists, setBookLists] = useState([]);

  const storedItem = localStorage.getItem('token');
  console.log("Token: ", storedItem)
  console.log(localStorage)
  console.log(username)

  const userId = null;

  useEffect(() =>
  {
    if(userId === null) return;
    async function getUserBookLists() {
      setBookLists(await fetchUserBookLists(userId));

    }
    getUserBookLists();
  },[id]
    )

  return(
    <div>
      <h1>Welcome, { username }</h1>
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
