import { Card, Select, Typography, MenuItem, Paper, Table, TableBody, TableRow, TableContainer, TableCell } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useStyles } from './BookRatingsStyles';


function calculatePercentage(book, numStars) {
    if (!book?.ratings.length) return;

    const length = book.ratings.filter(userRating => userRating.rating === numStars).length;
    return Math.round((length / book.ratings.length) * 100); 
}


function useNameOfUser(id) {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    (async () => {
      axios.get(`${process.env.REACT_APP_API_URL}/v1/users/${id}`)
        .then(response => response.data)
        .then(data => setUsername(data?.username))
    })();

  }, [id]);

  return username;
}


const Username = ({id}) => {
  return <Typography style={{fontWeight: 'bold', fontVariant: 'small-caps'}} variant="h5">
    {useNameOfUser(id)}
  </Typography>
}


export const BookRatings = ({ book }) => {
  const classes = useStyles();
  const [numStars, setNumStars] = useState('all');

  const ratingsWithReviews = book?.ratings.filter(userRating => userRating.comment);

  return ( book &&
    <div className={classes.ratingsContainer}>
      <div className={classes.ratingsStatistics}>
        <div className={classes.ratingsStatisticsInnerBox}>

          <div className={classes.averageRatingBox}>
            <Rating value={book.averageRating} precision={0.1} size="large" readOnly />
            <span className={classes.outOfFiveStars}>
              ({book.averageRating}/5)
            </span>
            <Typography className={classes.numRatings}>
              {book.ratings.length} rating{book.ratings.length !== 1 ? 's' : ''}
            </Typography>
          </div>

          <div className={classes.ratingsBrokenDownBox}>
            <div className={classes.ratingAndPercentage} onClick={() => setNumStars(5)}>
              <Rating value={5} readOnly />
              <span className={classes.ratingPercentage}>({calculatePercentage(book, 5)}%)</span>
            </div>

            <div className={classes.ratingAndPercentage} onClick={() => setNumStars(4)}>
              <Rating value={4} readOnly />
              <span className={classes.ratingPercentage}>({calculatePercentage(book, 4)}%)</span>
            </div>
            
            <div className={classes.ratingAndPercentage} onClick={() => setNumStars(3)}>
              <Rating value={3} readOnly />
              <span className={classes.ratingPercentage}>({calculatePercentage(book, 3)}%)</span>
            </div>

            <div className={classes.ratingAndPercentage} onClick={() => setNumStars(2)}>
              <Rating value={2} readOnly />
              <span className={classes.ratingPercentage}>({calculatePercentage(book, 2)}%)</span>
            </div>

            <div className={classes.ratingAndPercentage} onClick={() => setNumStars(1)}>
              <Rating value={1} readOnly />
              <span className={classes.ratingPercentage}>({calculatePercentage(book, 1)}%)</span>
            </div>

            <div className={classes.ratingAndPercentage} onClick={() => setNumStars(0)}>
              <Rating value={0} readOnly />
              <span className={classes.ratingPercentage}>({calculatePercentage(book, 0)}%)</span>
            </div>
          </div>

        </div>
      </div>

      <div className={classes.ratingsDisplayContainer}>
        <Select style={{width: "200px", marginTop: '1rem', fontSize: '1.2rem'}} value={numStars} onChange={(event) => setNumStars(event.target.value)}>
          <MenuItem value='all'>&nbsp;&nbsp;All reviews</MenuItem>
          <MenuItem value={5}>&nbsp;&nbsp;5 stars</MenuItem>
          <MenuItem value={4}>&nbsp;&nbsp;4 stars</MenuItem>
          <MenuItem value={3}>&nbsp;&nbsp;3 stars</MenuItem>
          <MenuItem value={2}>&nbsp;&nbsp;2 stars</MenuItem>
          <MenuItem value={1}>&nbsp;&nbsp;1 star</MenuItem>
          <MenuItem value={0}>&nbsp;&nbsp;0 stars</MenuItem>
        </Select>

        <TableContainer style={{margin: '3rem auto', width: '90%', maxWidth: '800px'}} component={Paper}>
          <Table>
            <TableBody>
            {
              (numStars === 'all' ? ratingsWithReviews : ratingsWithReviews.filter(userRating => userRating.rating === numStars)).map((rating, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div style={{position: 'relative'}}>
                      <div style={{padding: '1rem'}}>
                        <Username id={rating.userId}/>
                      </div>
                      <Rating style={{position: 'absolute', right: '1rem', top: '1rem'}} value={rating.rating} readOnly />
                      <Typography style={{textAlign: 'justify', padding: '5% 10% 5% 10%'}}>{rating.comment}</Typography>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            }
            </TableBody>
          </Table>
        </TableContainer>
      </div>  
    </div>
  );
}
