import React from 'react';

import { Link } from 'react-router-dom';
import { CardActionArea, CardContent, Typography } from '@material-ui/core';

import { useStyles } from './SingleBookDisplayStyle';
import {
  Grid
} from "@material-ui/core";


export function SingleBookDisplay(props){
    const classes = useStyles(); 
    
    const authors = props.authors.map(author => author.name);

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