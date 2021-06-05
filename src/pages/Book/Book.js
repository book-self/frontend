import { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { Chip, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import BookCarousel from '../../components/Carousel/BookCarousel';
import BookInCarousel from '../../components/Carousel/Book';
import { AddToBookListMenu } from '../../components/AddToBookListMenu/AddToBookListMenu';
import { UserLeaveRating } from './UserLeaveRating/UserLeaveRating';

import { fetchBook, fetchRelatedBooks } from './BookFetch';
import { useStyles } from './BookStyles';

import { BookRatings } from './BookRatings/BookRatings';


export const Book = () => {
  const classes = useStyles();
  let { bookId } = useParams();
  const history = useHistory();

  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState(null);
  const authors = book?.authors.map(author => author.name).join(', ');

  // if a new book is selected, scroll back to the top
  useEffect(() => {
    window.scrollTo(0, 0)
    setRelatedBooks(null);
  }, [book])


  // get the book
  useEffect(() => {
    async function getBook() {
      setBook(await fetchBook(bookId));
    }

    getBook();
  }, [bookId]);


  // get books related by author
  useEffect(() => {
    if (book === null) return;

    let getRelatedBooks = async () => {
      for (const author of book.authors) {
        const booksBySameAuthor = await fetchRelatedBooks(bookId, author.id);

        if (booksBySameAuthor.length > 0) {
          setRelatedBooks(books => ({ ...books, [author.name]: booksBySameAuthor}));
        }
      }
    }

    getRelatedBooks();
  }, [bookId, book]);


  return <>
    <div className={classes.bookContainer}>
      { book &&
        <>
          <div className={classes.bookContainerLeft}>
            <div className={classes.bookImageAndRating}>
              <img width={300} height={450} src={`https://bookself-thumbnails.s3.us-east-2.amazonaws.com/${book.id}.jpg`} onError={(error) => error.target.src=`${process.env.PUBLIC_URL}/no-cover.jpg`} alt={book.title} />
              <div className={classes.rating} onClick={() => window.location = '#ratings' }>
                <Rating value={book.averageRating} precision={0.1} readOnly />
              </div>
            </div>
          </div>

          <div className={classes.bookContainerRight}>
            <Typography variant="h2" className={classes.bookTitle}>{book.title}</Typography>
            <Typography variant="h5" className={classes.bookAuthors}>{authors}</Typography>
            <Typography className={classes.bookBlurb}>{book.blurb}</Typography>
            <div className={classes.bookDataContainer}>
              <div className={classes.bookGenreList}>
                { book.genres.map(genre => <Chip style={{margin: "5px"}} label={genre} onClick={() => history.push(`/search/${encodeURI(genre)}`)} clickable />) }
              </div>
              <div className={classes.bookDataTable}>
                <table style={{width: '100%'}}>
                  <tr>
                    <td><Typography variant="h6" className={classes.bookDataLabel} style={{marginRight: '25px'}}>Publication date: </Typography></td>
                    <td><Typography variant="h6">{book.published}</Typography></td>
                  </tr>
                  <tr>
                    <td><Typography variant="h6" className={classes.bookDataLabel}>Page count: </Typography></td>
                    <td><Typography variant="h6">{book.pages}pp</Typography></td>
                  </tr>
                </table>
              </div>
            </div>  
          </div>

          <AddToBookListMenu bookId={bookId} />
        </>
      }
    </div>

    { relatedBooks &&  
      <div className={classes.carouselContainer}>
        {
          book?.authors.map((author, i) =>
            <div style={{textAlign: 'center'}}>
              <BookCarousel
                key={i}
                title={`Other books from ${author.name}`}
                books={relatedBooks[author.name]?.map((relatedBook, j) => <BookInCarousel key={j} {...relatedBook} />)}
                perRow={3}
              />
            </div>
          )
        }
      </div>
    }

    <div style={{margin: '200px auto'}}>
      <UserLeaveRating bookId={bookId} />
    </div>

    <div id="ratings" style={{position: 'relative', top: '-100px'}}></div>
    <BookRatings book={book} />
  </>
} 
