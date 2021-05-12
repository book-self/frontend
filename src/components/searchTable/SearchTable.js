import { useHistory } from "react-router-dom";
import { Table, TableBody,
  TableCell, TableContainer, TableRow, Typography, Paper
} from '@material-ui/core';

import { publishYear, abbreviateAuthors } from '../../utilities/Utilities';
import { useStyles } from './SearchTableStyles';


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


export const SearchTable = (props) => {
  const history = useHistory();
  const classes = useStyles();

  console.log(props.books);
  console.log(props.heading);

  return (
    <main className={classes.mainContainer}>
        <div>
          {props.heading}
          <TableContainer style={{width: "50vw", margin: 'auto'}} component={Paper}>
            <Table>
              <TableBody>
                {
                  props.books.map((book, i) => (
                    <TableRow
                      className={classes.tableRow}
                      key={i}
                      onClick={() => history.push(`/book/${book.id}`)}
                    >
                      <TableCell className={classes.bookImageCell}>
                        <img width={175} height={250} src={`https://bookself-thumbnails.s3.us-east-2.amazonaws.com/${book.id}.jpg`} onError={(error) => error.target.src=`${process.env.PUBLIC_URL}/no-cover.jpg`} alt={book.title} />
                      </TableCell>

                      <TableCell component="th" className={classes.bookDataCell}>
                        <Typography variant="h5">{`${book.title} ${publishYear(book.published)}`}</Typography>

                        <Typography
                          variant="h6"
                          title={book.authors.length > 3 ? book.authors.map(author => author.name).join(', ') : ''}
                        >
                          {`${abbreviateAuthors(book.authors.map(author => author.name))}`}
                        </Typography>

                        <p className={classes.bookBlurb} ref={element => determineOverflow(element)}>{book.blurb}</p>
                      </TableCell>
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
