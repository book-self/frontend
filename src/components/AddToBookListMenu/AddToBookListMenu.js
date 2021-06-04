import { useState, useEffect } from 'react';
import { Checkbox, FormControl, FormControlLabel, Typography } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { selectUser } from "../../store/User/UserSlice";

import { fetchAllUserBookLists } from '../../pages/BookList/BookListFetch';
import axios from 'axios';


export const AddToBookListMenu = (props) => {
  const [bookLists, setBookLists] = useState(null);
  const { id } = useSelector(selectUser);


  useEffect(() => {
    if (id === null) return;

    async function getBookLists() {
      const lists = (await fetchAllUserBookLists(id)).map(list => {
        return { ...list, checked: list.books.includes(props.bookId)};
      });

      setBookLists(lists);
    }

    getBookLists();
  }, [id]);


  const handleChange = (index) => {
    setBookLists(bookLists => {
      let copy = bookLists.slice();
      copy[index].checked = !copy[index].checked

      if (copy[index].checked) // POST into list
        axios.post(`${process.env.REACT_APP_API_URL}/v1/book-lists/${copy[index].id}/books/${props.bookId}`)
      else // DELETE from list
        axios.delete(`${process.env.REACT_APP_API_URL}/v1/book-lists/${copy[index].id}/books/${props.bookId}`)

      return copy;
    })
  };


  return <>
  { id && bookLists && bookLists.length > 0 &&
  <div style={{position: 'relative', width: '300px'}}>
    <Typography variant="h4" style={{fontWeight: 'bold', marginBottom: '1rem', fontVariant: 'small-caps', textAlign: 'center'}}>save for later</Typography>
    <FormControl style={{marginLeft: '1.25rem'}}>
      { bookLists.map((bookList, index) =>
           <FormControlLabel
              key={index}
              control={
                <Checkbox
                  color="primary"
                  checked={bookList.checked}
                  onChange={() => handleChange(index)}
                  title={bookList.checked ? 'It is already in this list' : null}
                />
              }
              label={bookList.bookListName ?? bookList.listType}
          />
        )
      }
    </FormControl>
  </div>
  }
  </>
}
