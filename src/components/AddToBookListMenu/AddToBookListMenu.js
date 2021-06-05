import { useState, useEffect } from 'react';
import { Radio, RadioGroup, FormControl, FormControlLabel, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { useSelector } from 'react-redux';
import { selectUser } from "../../store/User/UserSlice";

import { fetchAllUserBookLists } from '../../pages/BookList/BookListFetch';
import axios from 'axios';


export const AddToBookListMenu = (props) => {
  const [bookLists, setBookLists] = useState(null);
  const [inList, setInList] = useState('None');
  const { id } = useSelector(selectUser);


  useEffect(() => {
    if (!id) return;

    async function getBookLists() {
      const lists = await fetchAllUserBookLists(id);
      setBookLists(lists);
      
      for (const list of lists) {
        if (list.books.includes(props.bookId)) {
          setInList(list.id);
          break;
        }
      }
    }

    getBookLists();
  }, [id, props.bookId]);


  const handleChange = (value) => {
    console.log(value);
    if (value === inList) return;

    const oldListId = inList;
    if (oldListId !== 'None') 
      axios.delete(`${process.env.REACT_APP_API_URL}/v1/book-lists/${oldListId}/books/${props.bookId}`)

    setInList(value);
    axios.post(`${process.env.REACT_APP_API_URL}/v1/book-lists/${value}/books/${props.bookId}`)
  };


  return <>
  { id &&
    <div style={{position: 'relative', width: '300px'}}>
      <Typography variant="h4" style={{fontWeight: 'bold', marginBottom: '1rem', fontVariant: 'small-caps', textAlign: 'center'}}>save for later</Typography>
      
      { !bookLists ? <Skeleton variant="rect" width={250} height={125} style={{margin: 'auto'}} /> :

        <FormControl style={{marginLeft: '1.25rem'}}>
          <RadioGroup value={inList} onChange={(event) => handleChange(event.target.value)}>

            <FormControlLabel
              control={<Radio color="primary" />}
              value="None"
              label="None"
            />

            { bookLists?.map((bookList, index) => <FormControlLabel
                key={index}
                control={<Radio color="primary" />}
                value={bookList.id}
                label={bookList.bookListName ?? bookList.listType}
              />)
            }

          </RadioGroup>
        </FormControl>
      }

    </div>
  }
  </>
}
