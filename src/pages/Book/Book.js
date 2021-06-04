import { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { Chip, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import BookCarousel from '../../components/Carousel/BookCarousel';
import BookInCarousel from '../../components/Carousel/Book';
import AddToBookListMenu from '../../components/AddToBookListMenu/AddToBookListMenu';
import { UserLeaveRating } from './UserLeaveRating/UserLeaveRating';

import { fetchBook, fetchRelatedBooks } from './BookFetch';
import { useStyles } from './BookStyles';

import { useSelector } from 'react-redux';
import { selectUser } from "../../store/User/UserSlice";


export const Book = () => {
  const classes = useStyles();
  let { bookId } = useParams();
  const history = useHistory();

  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState(null);
  const authors = book?.authors.map(author => author.name).join(', ');

  const { id } = useSelector(selectUser);
  console.log(id);

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
                <table>
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

    {
      <div style={{width: "70%", margin: '200px auto'}}>
        <UserLeaveRating bookId={bookId} />
      </div>
    }

{ /* TODO - NOT FINISHED 
    <div id="ratings" style={{display: 'flex', width: '85vw', margin: '200px auto 100px auto'}}>
      <div style={{flex: '0 0 350px', borderRight: '2px solid grey', marginRight: '10%'}}>
        <div style={{width: '325px', padding: '35px'}}>
          <div style={{backgroundColor: '#EAEAEA', padding: '1.25rem'}}>
            <Rating value={4.5} precision={0.1} size="large" readOnly /><span style={{position: 'relative', fontSize: '1.25rem', top: '-.45rem', left: '.5rem', fontWeight: 'bold'}}>(4.5)</span>
            <Typography style={{marginTop: '.5rem', fontSize: '1.15rem', textAlign: 'center'}}>133 ratings</Typography>
          </div>

          <div style={{marginLeft: '2rem'}}>
            <Rating value={5} readOnly style={{marginTop: '2.5rem'}} /><span style={{position: 'relative', fontSize: '1rem', top: '-.40rem', left: '.5rem'}}>(25%)</span>
            <Rating value={4} readOnly style={{marginTop: '1.5rem'}} /><span style={{position: 'relative', fontSize: '1rem', top: '-.40rem', left: '.5rem'}}>(10%)</span>
            <Rating value={3} readOnly style={{marginTop: '1.5rem'}} /><span style={{position: 'relative', fontSize: '1rem', top: '-.40rem', left: '.5rem'}}>(15%)</span>
            <Rating value={2} readOnly style={{marginTop: '1.5rem'}} /><span style={{position: 'relative', fontSize: '1rem', top: '-.40rem', left: '.5rem'}}>(20%)</span>
            <Rating value={1} readOnly style={{marginTop: '1.5rem'}} /><span style={{position: 'relative', fontSize: '1rem', top: '-.40rem', left: '.5rem'}}>(30%)</span>
          </div>
        </div>
      </div>
      <div style={{width: "100%"}}>
        World
      </div>
    </div>
*/ }
  </>
} 
