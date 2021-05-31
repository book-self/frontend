import React, { useState, useEffect } from 'react';

import GridListTile from "@material-ui/core/GridListTile";

import { fetchBookById } from './BookListHttpRequests';

// Customize look of grid here


// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: "space-around",
//     overflow: "hidden",
//     backgroundColor: theme.palette.background.paper,
//   },
//   gridList: {
//     width: gridListWidth,
//     height: gridListHeight,
//   },
//   icon: {
//     color: "rgba(255, 255, 255, 0.54)",
//   },
// }));

const BookInListAlt = ({ id, bookListId }) => {

    
    const [book, setBook] = useState({});

    useEffect(() => {
        (async () => {
            const { data } = await fetchBookById(id);
            setBook(data);
        })();
    }, [id]);

    const tile = {
      img: `https://bookself-thumbnails.s3.us-east-2.amazonaws.com/${id}.jpg`,
      title: book.title,
      author: book.author,
      url: `/profile/book-list/${bookListId}`
    };
    
    return (
        <GridListTile key={tile.img} style={{margin: 3}}>
            <img src={tile.img} alt={tile.title} style={{ height: "200px" }} />
            
          </GridListTile>
    );
}
 
export default BookInListAlt;