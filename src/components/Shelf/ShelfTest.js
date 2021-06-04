import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  indigo
} from "@material-ui/core/colors";


import {
  GridList,
  Link,
  Container,
} from "@material-ui/core";

import ListAlt from './BookInListAlt'

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
    height: 800,
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

export const ShelfTest = (props) => {
  

  const classes = useStyles();
  console.log(props.lists);
  const bookLists = props.lists;

//   const {id: bookListId} = queryString.parse(location.search);


   return ( 
     <>
     <Container className={classes.root}>
       {
         !bookLists? null :
         <div>
           
             <GridList className={classes.gridList} cols={1}>
           {
             bookLists.map((bookList)=>
             <div>
             <Link href = { `/profile/book-list/${bookList.id}`}>
             <ListAlt location = {bookList.id} bookListTitle = {bookList.listType}/>
            </Link>
              
              </div>
             )
           }
            </GridList>
           
         </div>
       }
     </Container>
     </>
   )

};
