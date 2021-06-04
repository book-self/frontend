import { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Menu, MenuItem } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { selectUser } from "../../store/User/UserSlice";

import { fetchAllUserBookLists } from '../../pages/BookList/BookListFetch';
import { postBooksToList } from './AddToBookListMenuFetch';


export const AddToBookListMenu = (props) => {
  const [allUserBookLists, setAllUserBookLists] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const { username, userId } = useSelector(selectUser);
  console.log(username);
  console.log(userId);


  useEffect(() => {
    if (userId === null) return;

    async function getUserBookLists() {
      setAllUserBookLists(await fetchAllUserBookLists(userId));
    }

    getUserBookLists();
  }, [userId]);


  const handleMenuItemClick = (listId, listName, index) => {
      setSelectedIndex(index);
      setAnchorEl(null);

      let bookIds = [props.bookId];
      postBooksToList(listName, bookIds, listId, listId);
  };


  return <div>
    {
      allUserBookLists && <>
          <List component="nav">
            <ListItem button onClick={(event) => setAnchorEl(event.currentTarget)}>
              <ListItemText primary={allUserBookLists[selectedIndex].id} />
            </ListItem>
          </List>

          <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} >
              { allUserBookLists.map((list, index) => (
                  <MenuItem
                          key={list.id}
                          value = {list.id}
                          disabled={index === selectedIndex}
                          selected={index === selectedIndex}
                          onClick={(_) => handleMenuItemClick(list.id, list.bookListName, index)}>

                      {list.id}
                  </MenuItem>
                ))
              }
          </Menu>
      </>
    }
  </div>
}
