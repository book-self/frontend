import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMediaQuery, useTheme, Slide, TextField, Typography, Card, Chip, IconButton } from '@material-ui/core';
import { ArrowUpward, Search } from '@material-ui/icons';
import clsx from  'clsx';
import TextLoop from 'react-text-loop';

import BookCarousel from '../../components/Carousel/BookCarousel.js';
import Book from "../../components/Carousel/Book.js";

import { useStyles } from './HomeStyles';
import { fetchBooks, fetchCategories } from './HomeFetch';


/*
  xs, extra-small: 0px
  sm, small: 600px
  md, medium: 960px
  lg, large: 1280px
  xl, extra-large: 1920px

  from https://material-ui.com/components/use-media-query/#migrating-from-withwidth
*/
function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}


const decideNumBooksPerRow = (breakpoint) => {
  switch (breakpoint) {
    case 'xs':
    case 'sm':
      return 1
    case 'md':
      return 2
    case 'lg':
      return 3;
    case 'xl':
      return 4;
  }
}


export const Home = () => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState({});
  const [displayScrollBtn, setDisplayScrollBtn] = useState(false);
  const history = useHistory();

  const numBooksPerRow = decideNumBooksPerRow(useWidth());
  console.log(numBooksPerRow);

  // book card:
    // minWidth ~250px
    // maxWidth ~450px
  // xs, sm: 1 book
  // md: 2 books
  // lg: 3 books? 4?
  // xl: 4 books? 5? 6?


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
    <header className={classes.headerContainer}>
      <div className={clsx(classes.leftContainer, classes.contentContainer)}>
        <Card className={clsx(classes.headerCard, classes.leftCard)}>
          <Typography variant="h1" component="h1" className={classes.bookselfTitle}>
            <span style={{fontWeight: "50"}}>Book</span> <span style={{fontWeight: "300"}}>Self</span>
          </Typography>
          <Typography variant="h5" component="h2" className={classes.bookselfDescription}>a self-curated library of your books.</Typography>
          <ul className={classes.featuresList}>
            <li><Typography component="h3" className={classes.featuresBulletpoints}>Browse through our collection of thousands of books.</Typography></li>
            <li><Typography component="h3" className={classes.featuresBulletpoints}>Add books of interest to your own personal lists.</Typography></li>
            <li><Typography component="h3" className={classes.featuresBulletpoints}>Review and rate books you've read, save those you haven't.</Typography></li>
            <li><Typography component="h3" className={classes.featuresBulletpoints}>Join book clubs and chat with like-minded readers!</Typography></li>
          </ul>
        </Card>
      </div>

      <div className={clsx(classes.rightContainer, classes.contentContainer)}>
        <Card className={clsx(classes.headerCard, classes.rightCard)}>
          <Typography className={classes.searchBarText}>
              Search for a book by its {" "}
              <TextLoop>
                  <b>title</b>
                  <b>author</b>
                  <b>genre</b>
                  <b>content</b>
              </TextLoop>
          </Typography>
          <TextField 
            className={classes.searchBar}
            InputProps={{endAdornment: <IconButton style={{padding: '3.5px'}}><Search onClick={executeSearchQuery} /></IconButton>}}
            variant="outlined"
            onInput={event => { if (event.target.value.trim()) processSearchQuery(event.target.value) }}
            onKeyUp={event => { if (event.key === 'Enter') executeSearchQuery() }}
          />
        </Card>
      </div>
    </header>

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
              books={books[category]?.map((book, j) => <Book key={j} {...book} numBooksPerRow={numBooksPerRow} />)}
              perRow={numBooksPerRow}
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
