import React, { useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import{
    changeBookStatus,
} from '../bookListSlice';

import { Link } from 'react-router-dom';
import { makeStyles, withStyles, Card, CardActionArea, CardContent,
    Chip, Tooltip, Typography } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { abbreviateAuthors, publishYear } from '../../../../utilities/Utilities';



const useStyles = makeStyles({
    tooltipContainer: {
        padding: '12px'
    },

    tooltipTitle: {
        fontWeight: 'bold'
    },

    genresContainer: {
        margin: "15px 5px 10px 10px"
    },

    bookCard: {
        width: "20vw",
        textAlign: "center",
        margin: "25px",
        minHeight: '350px'
    }
});


export function SingleBookDisplay(props){
    const classes = useStyles(); 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    const authors = props.authors.map(author => author.name);
    const tooltipTitle = `${props.title} ${publishYear(props.published)}`
    const tooltipAuthorsAbbreviated = `by ${abbreviateAuthors(authors)}`
    let bookListType = `${props.inList}`;

    
    const handleClick = (event) => {
        console.log(event);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (tempVar) => {
        setAnchorEl(null); 
    };
    return (
        <div id = "singleBookDisplay">
            <div id = "bookImage"></div>
            <div id = "bookDataDisplay">
                
                <Card className={classes.bookCard}>
                <Link to={`/book/${props.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                    <CardActionArea style={{paddingTop: "25px"}}>
                        <img width={175} height={250} src={`https://bookself-thumbnails.s3.us-east-2.amazonaws.com/${props.id}.jpg`} onError={(error) => error.target.src=`${process.env.PUBLIC_URL}/no-cover.jpg`} alt={props.title} />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                                {props.title}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
                <div id = "bookTitleDisplay">
                  
                    <Typography className={classes.tooltipTitle}>{tooltipTitle}</Typography>
                    <Typography gutterBottom>{tooltipAuthorsAbbreviated}</Typography>
                </div>
                <div id = "bookDetailDisplay">
                    Number of Pages : {props.pages}

                </div>
               
            </div>
        </div>
    )
}