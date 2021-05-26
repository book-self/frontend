import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import deepOrange from "@material-ui/core/colors/deepOrange";
import indigo from "@material-ui/core/colors/indigo";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import LibraryBooksTwoToneIcon from "@material-ui/icons/LibraryBooksTwoTone";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: indigo[50],
  },
}));

export const Shelf = ({ lists }) => {
  let history = useHistory();
  const redirect = (listId) => {
    history.push(`/shelf?id=${listId}`);
  };
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {lists.map((list) => (
        <ListItem
          button
          key={list.id}
          id={list.id}
          onClick={() => redirect(list.id)}
        >
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: indigo[500] }}>
              <LibraryBooksTwoToneIcon
                style={{ backgroundColor: indigo[500], color: indigo[50] }}
              />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={list.bookListName || list.listType}
            primaryTypographyProps={{
              style: { color: indigo[400], fontWeight: "bolder" },
            }}
            secondary={
              list.books.length > 0
                ? list.books.length + " Books"
                : "No books in list"
            }
            secondaryTypographyProps={{ style: { color: deepOrange[500] } }}
          />
        </ListItem>
      ))}
    </List>
  );
};
