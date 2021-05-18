import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import Fab from "@material-ui/core/Fab";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import { fetchBookList } from "./BookListFetch";
import BookInList from './BookInList';
import _ from "lodash";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 15,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 800,
    height: 400,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export const BookList = () => {
  const [bookList, setBookList] = useState({});
  const classes = useStyles();

  // Get bookListId from path or query params
  const bookListId = "0b776d2a84d84da09fee7e09";

  useEffect(() => {
    (async () => {
      const { data } = await fetchBookList(bookListId);
      setBookList(data);
    })();
  }, []);

  let { books } = bookList;
  books = books ? books : [];

  const handleNameChange = (event) => {
    setBookList({...bookList, bookListName: event.target.value})
  }

  const handleSaveBookList = (event) => {
    console.log(bookList);
  }

  return (
    <React.Fragment>
      <Container className={classes.root}>
        <GridList className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <FormControl
              size="medium"
              className={classes.margin}
              variant="filled"
            >
              <OutlinedInput
                id="outlined-adornment-amount"
                value={bookList.bookListName}
                onChange={handleNameChange}
                endAdornment={
                  <InputAdornment position="end">
                    <EditIcon style={{ color: indigo[500] }} />
                  </InputAdornment>
                }
                labelWidth={0}
              />
            </FormControl>
          </GridListTile>
          {books.map((id) => (
            <BookInList id={"17841"} />
          ))}
        </GridList>
      </Container>
    </React.Fragment>
  );
};
