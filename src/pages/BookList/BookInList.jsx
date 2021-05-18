import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";
import { fetchBookById } from './BookListFetch';

// Customize look of grid here
const thumbnailWidth = 100;
const gridListWidth = 200;
const gridListHeight = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: gridListWidth,
    height: gridListHeight,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

const BookInList = ({ id }) => {

    const classes = useStyles();
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
      url: `/book/${id}`
    };
    
    return (
        <GridListTile key={tile.img} style={{margin: 3}}>
            <Link to={tile.url}><img src={tile.img} alt={tile.title} style={{ width: thumbnailWidth }} /></Link>
            <GridListTileBar
              title={""}
              subtitle={<span></span>}
              actionIcon={
                <IconButton
                  aria-label={`info about ${tile.title}`}
                  className={classes.icon}
                >
                <Avatar style={{backgroundColor: deepOrange[500]}}>
                    <DeleteForeverIcon style={{ color: 'white' }} />
                </Avatar>
                </IconButton>
              }
            />
          </GridListTile>
    );
}
 
export default BookInList;