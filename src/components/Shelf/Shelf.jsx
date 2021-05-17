import React from "react";
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import LocalLibraryTwoToneIcon from '@material-ui/icons/LocalLibraryTwoTone';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Shelf = ({ lists }) => {

  let history = useHistory();
  const redirect = (listId) => {
      history.push(`/profile/book-list?id=${listId}`)
  }
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {lists.map((list) => (
        <ListItem button key={list.id} id={list.id} onClick={() => redirect(list.id)}>
          <ListItemAvatar>
            <Avatar>
              <LocalLibraryTwoToneIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={list.bookListName || list.listType}
            secondary={list.books.length > 0 ? list.books.length + ' Books' : "No books in list"}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default Shelf;