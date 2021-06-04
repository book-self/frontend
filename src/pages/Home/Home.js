import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMediaQuery, useTheme, Slide, TextField, Typography, Card, Chip, IconButton } from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';
import clsx from  'clsx';

import { LargeHeader } from './LargeHeader';
import { SmallHeader } from './SmallHeader';

import BookCarousel from '../../components/Carousel/BookCarousel.js';
import Book from "../../components/Carousel/Book.js";

import { useStyles } from './HomeStyles';
import { fetchBooks, fetchCategories } from './HomeFetch';


export const Home = () => {
  const theme = useTheme();
  const classes = useStyles();

  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState({});
  const [displayScrollBtn, setDisplayScrollBtn] = useState(false);

  const history = useHistory();


  // fetching of categories to make into carousels (TODO will eventually recommend categories based on the logged-in user)
  useEffect(() => {
    async function getCategories() {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    }

    getCategories();
  }, []);


  // fetching of books to put into the carousels
  useEffect(() => {
    async function getBooks() {
      for (const category of categories) {
        const booksInCategory = await fetchBooks(category);
        setBooks((booksSoFar) => ({ ...booksSoFar, [category]: booksInCategory}));
      }
    }

    getBooks();
  }, [categories]);


  // hide the 'scroll to top' button until the user is far enough down the page for it to be useful
  useEffect(() => {
    window.onscroll = () => {
      (window.scrollY > window.innerHeight * 1.2) ? setDisplayScrollBtn(true) : setDisplayScrollBtn(false);
    }
  }, []);


  const processSearchQuery = (text) => { setSearchQuery(text.trim()) }
  const executeSearchQuery = () => { if (searchQuery.trim()) history.push(`/search?q=${searchQuery}`) }


  return <>
    { 
      useMediaQuery(theme.breakpoints.up('md')) ? 
        <LargeHeader processSearchQuery={processSearchQuery} executeSearchQuery={executeSearchQuery} /> 
      : 
        <SmallHeader processSearchQuery={processSearchQuery} executeSearchQuery={executeSearchQuery} />
    }

    <div className={classes.categoriesContainer}>
      <Typography variant="h4">Categories you might be interested in</Typography>
      <ul className={classes.categoriesList}>
        { 
          !categories ? null :
          categories.map((category, i) =>
            <li key={i} className={classes.categoriesListItem}>
              <Chip
                label={category}
                component="a"
                href={`#${encodeURI(category)}`}
                clickable
              />
            </li>
          )
        }
      </ul>
    </div>
    
    <div className={classes.carouselContainer}>
      {
        categories?.map((category, i) =>
          <div>
            <BookCarousel
              key={i}
              title={category}
              books={books[category]?.map((book, j) => <Book key={j} {...book} />)}
            />
          </div>
        )
      }
    </div>

    <Slide direction="up" in={displayScrollBtn} mountOnEnter unmountOnExit>
      <IconButton
        onClick={() => { window.scrollTo(0,0) }}
        className={clsx(classes.scrollToTopButton, { 'visibility: visible': displayScrollBtn, 'visibility: hidden': !displayScrollBtn })}
      >
        <ArrowUpward />
      </IconButton>
    </Slide> 
  </>;
}
