import React, { useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import{
    changeBookStatus,
} from '../bookListSlice';

import { Link } from 'react-router-dom';
import { makeStyles, withStyles, CardActionArea, CardContent, CardMedia,
    Chip, Tooltip, Typography } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { abbreviateAuthors, publishYear } from '../../../utilities/Utilities';
import { useStyles } from './SingleBookDisplayStyle';
import {
  Paper,
  Avatar,
  Checkbox,
  Grid
} from "@material-ui/core";


export function SingleBookDisplay(props){
    const classes = useStyles(); 
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const authors = props.authors.map(author => author.name);
    const tooltipTitle = `${props.title} ${publishYear(props.published)}`
    const tooltipAuthorsAbbreviated = `by ${abbreviateAuthors(authors)}`
    let bookListType = `${props.inList}`;

    return (
         
        <div id = "singleBookDisplay">
                <Link to={`/book/${props.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                    <CardActionArea style={{paddingTop: "25px"}}>
                        <Grid container justify = "center">
                            <img width={175} height={250} src={`https://bookself-thumbnails.s3.us-east-2.amazonaws.com/${props.id}.jpg`} onError={(error) => error.target.src=`${process.env.PUBLIC_URL}/no-cover.jpg`} alt={props.title} />
                        </Grid>
                        
                        
                    </CardActionArea>
                </Link>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        {props.title}
                    </Typography>
                    <Typography variant="h7" className={classes.bookAuthors}>{authors}</Typography>
                </CardContent>
            
        </div>
    
    )
}