import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Chip, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import BookCarousel from '../../components/carousel/BookCarousel';
import CarouselBook from '../../components/carousel/Book';
import { processNames } from '../search/Search'


// const useStyles = makeStyles({

// });


function fetchBook(byId) {
  return fetch(`http://localhost:8080/v1/books/${byId}`)
    .then(response => response.json())
    .then(json => json);
}


function fetchRelatedBooks(bookId, byAuthorId) {
  return fetch(`http://localhost:8080/v1/books/by-author?authorId=${byAuthorId}`)
    .then(response => response.json())
    .then(json => json.filter(book => book.id !== bookId));
}


export const Book = () => {
  // const classes = useStyles();
  let { id } = useParams();
  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState(null);


  useEffect(() => {
    window.scrollTo(0, 0)
    setRelatedBooks(null);
  }, [book])


  useEffect(() => {
    async function getBook() {
      setBook(await fetchBook(id));
    }

    getBook();
  }, [id]);


  useEffect(() => {
    if (book === null) return;

    let getRelatedBooks = async () => {
      for (const author of book.authors) {
        const booksBySameAuthor = await fetchRelatedBooks(id, author.id);

        if (booksBySameAuthor.length > 0) {
          setRelatedBooks(books => ({ ...books, [author.name]: booksBySameAuthor}));
        }
      }
    }

    getRelatedBooks();
  }, [id, book]);


  return (
    <>
    <div style={{display: "flex", alignItems: "flex-start", width: '80vw', margin: '6vh auto 7.5vh auto', minHeight: '75vh'}}>
      { book == null ? null :
      <>
        <div style={{width: '40%', textAlign: 'center', height: '75vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{width: '75%', height: '100%', paddingRight: '2rem', borderRight: '5px solid grey', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
            <img width={300} height={450} src={`https://bookself-thumbnails.s3.us-east-2.amazonaws.com/${book.id}.jpg`} title={book.title} alt={book.title} />
            <Rating style={{marginTop: "3vh"}} value={Math.random() * 5} precision={0.1} readOnly getLabelText={() => { return Math.floor(Math.random() * 500).toString()} } />
          </div>
        </div>

        <div style={{width: '60%', height: '100%', display: 'flex', alignItems: "flex-start", justifyContent: "flex-start", flexDirection: 'column', padding: '25px'}}>
          <Typography variant="h2" style={{fontVariant: 'small-caps', textTransform: 'lowercase', fontWeight: 'bold', width: '35vw', lineHeight: '.9'}}>{book.title}</Typography>
          <Typography variant="h5" style={{margin: "1rem 0"}}>by {processNames(book.authors.map(author => author.name))}</Typography>
          <Typography style={{padding: '2rem', width: '35vw', textAlign: 'justify'}}>{book.blurb}</Typography>
          <div style={{margin: "15px 5px 10px 10px", width: '20vw', position: 'relative'}}>
            {book.genres.map(genre => <Chip style={{margin: "5px"}} label={genre} />)}
            <div style={{position: 'absolute', left: '25vw', bottom: '15px', width: "100%", textAlign: 'right'}}>
              <table>
                <tr>
                  <td><Typography variant="h6" style={{textAlign: 'left', fontWeight: 'bold', marginRight: '25px'}}>Publication date: </Typography></td>
                  <td><Typography variant="h6">{book.published}</Typography></td>
                </tr>
                <tr>
                  <td><Typography variant="h6" style={{textAlign: 'left', fontWeight: 'bold'}}>Page count: </Typography></td>
                  <td><Typography variant="h6">{book.pages}pp</Typography></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </>
      } 
    </div>
    { 
    relatedBooks === null || relatedBooks === [] ? null : 
    <div style={{display: "flex", flexDirection: 'column', alignItems: "center", justifyContent: "center", marginBottom: "100px"}} >
      {
        book?.authors.map((author, i) =>
          <div style={{textAlign: 'center'}} >
            <BookCarousel key={i} title={`Other books from ${author.name}`} books={relatedBooks[author.name]?.map((book, j) => <CarouselBook key={j} info={book} />)} perRow={3} />
          </div>
        )
      }
    </div>
    }
    </>
  );
}
