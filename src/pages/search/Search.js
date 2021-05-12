import { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles, ButtonBase, CircularProgress, Table, TableBody,
  TableCell, TableContainer, TableRow, Typography, Paper
} from '@material-ui/core';


const useStyles = makeStyles({
  tableRow: {
    width: '100%',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#EAEAEA'
    }
  }
});


function useQuery() {
  return new URLSearchParams(useLocation().search);
}


function fetchQueryResults(query) {
  return fetch(`http://localhost:8080/v1/books/search?q=${encodeURI(query)}`)
    .then(response => response.json())
    .then(json => json);
}


// this is disgusting sorry, but not sure how else you can do this
// *if* the paragraph wants to overflow, add a 'See more' button which allows it to overflow and enlargen its container
function determineOverflow(element) {
  if (element?.offsetHeight < element?.scrollHeight) {
    let script = "this.previousSibling.style.height = 'initial'; this.style.display = 'none'; event.stopPropagation();";
    element.insertAdjacentHTML("afterend",
      `<a style="position: absolute; right: 10px; bottom: 10px; color: darkblue; font-variant: small-caps; font-size: 18px" onclick="${script}">see more</a>`
    );
  }
}


// TODO want to use this in multiple places, need to put it elsewhere
export function processNames(names) {
  return (names.length > 3 ? names.slice(0, 2).concat(['...']) : names).join(', ');
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
    <main style={{display: "flex", alignItems: "center", minHeight: "70vh", padding: "7.5vh 7.5vw", flexDirection: "column"}}>
      { books == null ? <CircularProgress /> :
        <div style={{textAlign: 'center'}}>
          <Typography variant="h4"  style={{marginBottom: "5rem"}}>We've found {books.length} result{books.length !== 1 ? 's' : ''} for <span style={{fontSize: '2.75rem', textTransform: 'lowercase', fontVariant: 'small-caps', fontWeight: 'bold'}}>{query}</span>.</Typography>
            
          <TableContainer style={{width: "50vw"}} component={Paper}>
          <Table>
            <TableBody>
              {
                books.map((book, i) => (
                  <ButtonBase component="tbody" style={{width: '100%'}}>
                    <TableRow className={classes.tableRow} key={i} onClick={() => history.push(`/book/${book.book.id}`)} >
                      <TableCell style={{verticalAlign: 'top', padding: '25px', borderRight: '2px solid #EAEAEA'}}>
                        <img width={175} height={250} src={`https://bookself-thumbnails.s3.us-east-2.amazonaws.com/${book.book.id}.jpg`} title={book.book.title} alt={book.book.title} />
                      </TableCell>
                      <TableCell component="th" style={{verticalAlign: 'top', position: 'relative', padding: '35px 35px 35px 25px'}}>
                        <Typography variant="h5">{book.book.title} ({book.book.published ? book.book.published.split('-')[0] : null})</Typography>
                        <Typography variant="h6">{processNames(book.book.authors.map(author => author.name))}</Typography>
                        <p style={{height: "125px", overflow: "hidden", padding: "10px 10px 10px 10px"}} ref={element => determineOverflow(element)}>{book.book.blurb}</p>
                      </TableCell>
                    </TableRow>
                  </ButtonBase>
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
