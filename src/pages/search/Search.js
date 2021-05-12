import { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { CircularProgress, Table, TableBody,
  TableCell, TableContainer, TableRow, Typography, Paper
} from '@material-ui/core';

import { publishYear, abbreviateAuthors } from '../../utilities/Utilities';
import { useStyles } from './SearchStyles';


function useQuery() { return new URLSearchParams(useLocation().search); }
function fetchQueryResults(query) {
  return fetch(`http://localhost:8080/v1/books/search?q=${encodeURI(query)}`)
    .then(response => response.json())
    .then(json => json);
}


// this is disgusting, but not sure how else you can do this
// *if* the paragraph wants to overflow, add a 'See more' button which allows it to overflow and enlargen its container
function determineOverflow(element) {
  if (element?.offsetHeight < element?.scrollHeight) {
    let style = "position: absolute; right: 10px; bottom: 10px; color: darkblue; font-variant: small-caps; font-size: 18px";
    let script = "this.previousSibling.style.height = 'initial'; this.style.display = 'none'; event.stopPropagation();";

    element.insertAdjacentHTML("afterend",
      `<a style="${style}" onclick="${script}">see more</a>`
    );
  }
}


export const Search = () => {
  const history = useHistory();
  const classes = useStyles();
  const [query] = useState(useQuery().get("q"));
  const [books, setBooks] = useState(null);


  useEffect(() => {
    async function getBooks() {
      setBooks(await fetchQueryResults(query));
    }

    getBooks();
  }, [query]);


  return (
    <main className={classes.mainContainer}>
      { books == null ? <CircularProgress /> :
        <div>
          <Typography variant="h4" className={classes.searchHeading}>
            We've found {books.length} result{books.length !== 1 ? 's' : ''} for <span className={classes.searchQuery}>{query}</span>.
          </Typography>
          <TableContainer style={{width: "50vw"}} component={Paper}>
            <Table>
              <TableBody>
                {
                  books.map((book, i) => (
                    <TableRow
                      className={classes.tableRow}
                      key={i}
                      onClick={() => history.push(`/book/${book.book.id}`)}
                    >
                      <TableCell className={classes.bookImageCell}>
                        <img width={175} height={250} src={`https://bookself-thumbnails.s3.us-east-2.amazonaws.com/${book.book.id}.jpg`} alt={book.book.title} />
                      </TableCell>

                      <TableCell component="th" className={classes.bookDataCell}>
                        <Typography variant="h5">{`${book.book.title} ${publishYear(book.book.published)}`}</Typography>

                        <Typography
                          variant="h6"
                          title={book.book.authors.length > 3 ? book.book.authors.map(author => author.name).join(', ') : ''}
                        >
                          {`${abbreviateAuthors(book.book.authors.map(author => author.name))}`}
                        </Typography>

                        <p className={classes.bookBlurb} ref={element => determineOverflow(element)}>{book.book.blurb}</p>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      }
    </main>
  );
}
