import { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { Chip, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import BookCarousel from '../../components/Carousel/BookCarousel';
import BookInCarousel from '../../components/Carousel/Book';

import { fetchAllUserBookLists } from '../../components/bookList/bookListDisplay/BookListFetch'

import { fetchBook, fetchRelatedBooks, postBooksToList } from './BookFetch';
import { useStyles } from './BookStyles';

const noUserOptions = [
  'To Read',
  'Read',
  'Did Not Finish',
];
export const Book = () => {
  const classes = useStyles();
  let { id } = useParams();
  const history = useHistory();
  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState(null);
  const [allUserBookLists, setAllUserBookLists] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [userId, setUserId] = useState(null);
  // if a new book is selected (from the carousel), scroll back to the top
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

  //USER ID WAS HARD CODED INT: MINE WAS 8
  useEffect(() =>
  {
    if(userId === null)
    {
      return;
    } 
    async function getUserBookLists() {
      setAllUserBookLists(await fetchAllUserBookLists(8));
    }
    getUserBookLists();
  },[userId]
    )

  const authors = book?.authors.map(author => author.name).join(', ');

  const handleMenuItemClick = (event, listId, listName, index) => {
      
      setSelectedIndex(index);
      setAnchorEl(null);

      let bookIds = [id];
      postBooksToList(listName, bookIds,listId, listId);
      
    };
  
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickNoUserItem = (event) =>{
    setAnchorEl(event.currentTarget);
  }

  const handleMenuItemClickNoUser = (event, index) =>{
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return <>
    <div className={classes.bookContainer}>
      { !book ? null :
        <>
          <div className={classes.bookContainerLeft}>
            <div className={classes.bookImageAndRating}>
              <img width={300} height={450} src={`https://bookself-thumbnails.s3.us-east-2.amazonaws.com/${book.id}.jpg`} onError={(error) => error.target.src=`${process.env.PUBLIC_URL}/no-cover.jpg`} alt={book.title} />
              <Rating style={{marginTop: "3vh"}} value={Math.random() * 5} precision={0.1} readOnly />
            </div>
          </div>

          <div className={classes.bookContainerRight}>
            <Typography variant="h2" className={classes.bookTitle}>{book.title}</Typography>
            <Typography variant="h5" className={classes.bookAuthors}>{authors}</Typography>
            <Typography className={classes.bookBlurb}>{book.blurb}</Typography>
            <div className={classes.bookDataContainer}>
              { book.genres.map(genre => <Chip style={{margin: "5px"}} label={genre} onClick={() => history.push(`/search/${encodeURI(genre)}`)} clickable />) }
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
      
   <div>
            {
              !allUserBookLists?
              <>
              <List component="nav" aria-label="Device settings">
                  <ListItem
                  button
                  aria-haspopup="true"
                  aria-controls="lock-menu"
                  aria-label="when device is locked"
                  onClick={handleClickNoUserItem}
                  >
                  <ListItemText primary={noUserOptions[selectedIndex]} secondary="Sign up or log in to use."/>
                  </ListItem>
                </List>
                 <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}                    
                  >
                    {noUserOptions.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClickNoUser(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
              </>:
              <>
               
                <List component="nav" aria-label="Device settings">
                  <ListItem
                  button
                  aria-haspopup="true"
                  aria-controls="lock-menu"
                  aria-label="when device is locked"
                  onClick={handleClickListItem}
                  >
                  <ListItemText primary={allUserBookLists[selectedIndex].id} />
                  </ListItem>
                </List>

              
                <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}

                    
                >
                    {allUserBookLists.map((list, index) => (
                      <MenuItem
                          key={list.id}
                          value = {list.id}
                          disabled={index === selectedIndex}
                          selected={index === selectedIndex}
                          onClick={(event) => handleMenuItemClick(event, list.id, list.bookListName, index)}>

                          {list.id}
                      </MenuItem>
                      ))}
                </Menu>
              
            
              </>
            }
          </div>
      
    </div>
    <div>
      
    </div>
    { 
      !relatedBooks ? null : 
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
  </>
}
