
import { Link } from 'react-router-dom';
import { withStyles, Card, CardActionArea, CardContent, Typography } from '@material-ui/core';

import BookImage from './BookImage';
import React from 'react';


// throwback: Material-UI tooltip needs to forward a reference, but a functional component can't do this
class BookCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, bookId, bookTitle, ...other } = this.props; 

    return <Card { ...other } className={classes.bookCard}>
      <Link to={`/book/${bookId}`} style={{textDecoration: 'none', color: 'inherit'}}>
          <CardActionArea style={{paddingTop: "25px"}}>
              <BookImage bookId={bookId} bookTitle={bookTitle} />
              <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                      {bookTitle}
                  </Typography>
              </CardContent>
          </CardActionArea>
      </Link>
    </Card>
  }
}

export default withStyles({
  bookCard: {
    width: '100%',
    minWidth: '250px',
    maxWidth: '450px',
    textAlign: "center",
    margin: "25px",
    minHeight: '350px'
  }
})(BookCard);
