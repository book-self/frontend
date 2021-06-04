import { useHistory } from "react-router-dom";
import { Table, TableBody,
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


export const SearchTable = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const { id } = useSelector(selectUser);
  const [userRatings, setUserRatings] = useState([]);

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
                  props.books.map((book, i) => (
                    <TableRow
                      className={classes.tableRow}
                      key={i}
                      onClick={() => history.push(`/book/${book.id}`)}
                    >
                      <TableCell className={classes.bookImageCell} >
                        <img width={175} height={250} src={`https://bookself-thumbnails.s3.us-east-2.amazonaws.com/${book.id}.jpg`} onError={(error) => error.target.src=`${process.env.PUBLIC_URL}/no-cover.jpg`} alt={book.title} />

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

                      { id &&
                        <TableCell style={{borderLeft: '2px solid #EAEAEA', cursor: 'default', backgroundColor: 'white'}} onClick={(event) => event.stopPropagation()}>
                          <AddToBookListMenu bookId={book.id} />
                        </TableCell>
                      }
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div>
    </main>
  );
}
