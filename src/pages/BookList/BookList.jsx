import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  indigo
} from "@material-ui/core/colors";

import LibraryBooksTwoToneIcon from "@material-ui/icons/LibraryBooksTwoTone";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

import {
  Paper,
  Avatar,
  Grid,
  Typography,
  IconButton,
  Fab,
  GridList,
  GridListTile,
  Input,
  Container,
  InputAdornment,
  FormControl,
} from "@material-ui/core";

import queryString from "query-string";
import { fetchBookList } from "./BookListFetch";
import BookInList from './BookInList';

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
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(3, 2),
  },
  indigo: {
    color: theme.palette.getContrastText(indigo[500]),
    backgroundColor: indigo[500],
  },
  fabRoot: {
    "& > *": {
      margin: theme.spacing(3),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export const BookList = ({ location }) => {
  const [bookList, setBookList] = useState({});
  const classes = useStyles();

  const {id: bookListId} = queryString.parse(location.search);

  useEffect(() => {
    (async () => {
      const { data } = await fetchBookList(bookListId);
      setBookList(data);
    })();
  }, [bookListId]);

  let { books } = bookList;
  books = books ? books : [];

  const [editedName, setEditedName] = useState("");

  const handleEditListName = (event) => {
    setEditedName(event.target.value);
  }

  const handleEditListKeyDown = (event) => {
    if(event.key === 'Enter') {
      handleNameChange(event);
    }
  }

  const handleNameChange = (event) => {
    setBookList({...bookList, bookListName: editedName})
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
              <Paper className={classes.paper} elevation={0}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar className={classes.indigo}>
                      <LibraryBooksTwoToneIcon
                        style={{
                          backgroundColor: indigo[500],
                          color: indigo[50],
                        }}
                      />
                    </Avatar>
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Typography variant="h4" component="h4" noWrap>
                      {bookList.bookListName}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </FormControl>
          </GridListTile>
          {books.map((id) => (
            <BookInList key={id} id={id} />
          ))}
        </GridList>

        <Paper className={classes.fabRoot} elevation={0}>
          <Input
            id="standard-basic"
            placeholder="edit list name"
            value={editedName}
            onChange={handleEditListName}
            onKeyDown={handleEditListKeyDown}
            endAdornment={
              <InputAdornment position="end">
                <EditIcon style={{ color: indigo[500] }} />
              </InputAdornment>
            }
          />

          <Fab
            variant="extended"
            style={{ backgroundColor: indigo[500], color: "white" }}
          >
            <AddIcon
              className={classes.extendedIcon}
              style={{ color: "white" }}
            />
            Add Books To List
          </Fab>
          
          <Fab
            variant="extended"
            style={{ backgroundColor: indigo[500], color: "white" }}
          >
            <SaveIcon
              className={classes.extendedIcon}
              style={{ color: "white" }}
            />
            Save Changes
          </Fab>
        </Paper>

      </Container>
    </React.Fragment>
  );
};
