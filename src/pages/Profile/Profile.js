import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';

import { Typography } from '@material-ui/core';

import { selectUser } from '../../store/User/UserSlice';
import { ShelfTest } from "../../components/Shelf/ShelfTest";


const fetchBookLists = (id) => {
    const url = `${process.env.REACT_APP_API_URL}/v1/users/${id}/book-lists`
    return axios.get(url);
}


export const Profile = () => {
  const { username, id } = useSelector(selectUser);
  const [bookLists, setBookLists] = useState([]);


  useEffect(() => {
    (
      async () => {
        const { data } = await fetchBookLists(id);
        setBookLists(data);
      }
    )()
  }, [id]);


  return (
    <div style={{width: '80%', margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      <Typography variant="h3" style={{fontWeight: '500', margin: '5rem 0'}}>Welcome <b>{ username }</b></Typography>
      {/* <Shelf lists={bookLists} /> */}
      <ShelfTest lists={bookLists} />
    </div>
  )
}
