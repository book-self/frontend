import { useHistory } from "react-router-dom";
import { useMediaQuery, useTheme, Table, TableBody,
  TableCell, TableContainer, TableRow, Typography, Paper
} from '@material-ui/core';

import { Rating } from '@material-ui/lab';

import { publishYear, abbreviateAuthors } from '../../utilities/Utilities';
import { useStyles } from './SearchTableStyles';
import { AddToBookListMenu } from "../AddToBookListMenu/AddToBookListMenu";
import { fetchUserRating } from '../../pages/Book/UserLeaveRating/UserLeaveRatingFetch';

import { useSelector } from 'react-redux';
import { selectUser } from "../../store/User/UserSlice";
import { useEffect, useState } from "react";

import BookCard from '../Carousel/BookCard';
import BookImage from '../Carousel/BookImage';


export const SearchTable = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const history = useHistory();

  const { id } = useSelector(selectUser);
  const [userRatings, setUserRatings] = useState({});

  const isLargerDevice = useMediaQuery(theme.breakpoints.up('lg'));
  const isSmallerDevice = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {
    setUserRatings({});
  }, []);


  useEffect(() => {
    if (!id) return;

    async function getUserRatings() {
      props.books?.forEach(book => {
        fetchUserRating(book.id)
          .then(json => setUserRatings(userRatings => ({
            ...userRatings,
            [book.id]: json["rating"]
          })))
          .catch(() => setUserRatings(userRatings => ({
            ...userRatings,
            [book.id]: null
          })));
      })
    }

    getUserRatings();

  }, [props.books, id]);

  useEffect(() => {
    setUserRatings([]);
  }, []);

  useEffect(() => {
    if (!id) return;

    async function getUserRatings() {
      props.books?.map(async (book) => {
        console.log(book);

        fetchUserRating(book.id)
          .then(json => setUserRatings(userRatings => { return { ...userRatings, [book.id]: json["rating"] } }))
          .catch(() => setUserRatings(userRatings => { return { ...userRatings, [book.id]: null } }))
      })
    }

    getUserRatings();

  }, [props.books, id]);

  return (
    <main className={classes.mainContainer}>
        <div>
          {props.heading}
          <TableContainer style={{margin: 'auto'}} component={Paper}>
            <Table>
              <TableBody>
                {
                  props.books.map((book, i) => { return isSmallerDevice ? 
                    <TableRow key={i}>
                      <TableCell style={{backgroundColor: '#EAEAEA', display: 'flex', justifyContent: 'center'}}>
                        <BookCard bookTitle={book.title} bookId={book.id} />
                      </TableCell>
                    </TableRow> 
                  :
                    <TableRow
                      className={classes.tableRow}
                      key={i}
                      onClick={() => history.push(`/book/${book.id}`)}
                    >
                      <TableCell className={classes.bookImageCell} >
                        <BookImage bookId={book.id} bookTitle={book.title} />

                        <div style={{display: 'flex', alignItems: 'center'}}>
                          <Typography style={{margin: "1rem 15px"}}><b>Avg:</b></Typography>
                          <Rating value={book.averageRating} precision={1} size="small" readOnly />
                        </div>
                        
                        { id && userRatings[book.id] !== undefined && userRatings[book.id] !== null &&
                          <div style={{display: 'flex', alignItems: 'center'}}>
                            <Typography style={{margin: "0 10px 0 10px"}}><b>Yours:</b></Typography>
                            <Rating value={userRatings[book.id]} precision={1} size="small" readOnly />
                          </div>
                        }
                      </TableCell>

                      <TableCell component="th" className={classes.bookDataCell}>
                        <Typography variant="h5">{`${book.title} ${publishYear(book.published)}`}</Typography>

                        <Typography
                          variant="h6"
                          title={book.authors.length > 3 ? book.authors.map(author => author.name).join(', ') : ''}
                        >
                          {`${abbreviateAuthors(book.authors.map(author => author.name))}`}
                        </Typography>

                        <p className={classes.bookBlurb}>{book.blurb}</p>
                      </TableCell>

                      { id && isLargerDevice &&
                        <TableCell className={classes.addToBookListCell} style={{width: "300px"}}>
                          <div onClick={(event) => event.stopPropagation()} style={{backgroundColor: 'white', cursor: 'default'}}>
                            <AddToBookListMenu bookId={book.id} />
                          </div>
                        </TableCell>
                      }
                    </TableRow>
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
    </main>
  );
}