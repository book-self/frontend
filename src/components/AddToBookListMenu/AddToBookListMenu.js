import { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Menu, MenuItem } from '@material-ui/core';

import { fetchAllUserBookLists } from '../../components/bookList/bookListDisplay/BookListFetch';
import { postBooksToList } from './AddToBookListMenuFetch';


const noUserOptions = [
  'To Read',
  'Read',
  'Did Not Finish',
];


export const AddToBookListMenu = () => {
  const [allUserBookLists, setAllUserBookLists] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);


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

      let bookIds = [id];
      postBooksToList(listName, bookIds, listId, listId);
      
  };
  

  return <div>
    {
      allUserBookLists &&
      <>
          <List component="nav">
            <ListItem button onClick={(event) => setAnchorEl(event.currentTarget)}>
              <ListItemText primary={allUserBookLists[selectedIndex].id} />
            </ListItem>
          </List>

          <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
          >
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
