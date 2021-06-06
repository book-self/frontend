import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  indigo
} from "@material-ui/core/colors";


import {
  GridList,
  GridListTile,
  Container,
  GridListTileBar,
} from "@material-ui/core";

import {fetchBookList} from './ShelfFetch';

import BookInListAlt from './BookInListAlt';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
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
 
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));


export const ListAlt = ({ bookListId, bookListTitle }) => {

  
  
  const [books, setBooks] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    (async () => {
      const { data } = await fetchBookList(bookListId);
      setBooks(data.books || [])

    })();
  }, [bookListId]);

  return (
    <React.Fragment>
      <Container className={classes.root}>
        <GridListTile>
        <GridList className={classes.gridList} cols={books.length < 9? books.length:8}>
          
          {books.map((id, i) => {
            
            if (i < 8)
            {
                console.log(i)
                return (
                    <div>
            
                    <BookInListAlt key={id} id={id} bookListId = {bookListId}/>
                    </div>
                )
            }
            return <div></div>
            
        })}
        
        </GridList>
        
        <GridListTileBar title={bookListTitle} titlePosition="top"/>
        
        </GridListTile>
      

      </Container>
    </React.Fragment>
  );
};

export default ListAlt;