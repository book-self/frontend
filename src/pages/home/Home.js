import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Slide, TextField, Typography, Card, Chip, IconButton } from '@material-ui/core';
import { ArrowUpward, Search } from '@material-ui/icons';
import clsx from  'clsx';
import TextLoop from 'react-text-loop';

import BookCarousel from '../../components/carousel/BookCarousel';
import Book from '../../components/carousel/Book';

import { useStyles } from './HomeStyles';
import { fetchBooks, fetchCategories } from './HomeFetch';


export const Home = () => {
  const classes = useStyles();
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
            InputProps={{endAdornment: <Search />}}
            variant="outlined"
            onKeyUp={event => { if (event.key === 'Enter' && event.target.value.trim()) history.push(`/search?q=${event.target.value}`); }}
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
              books={books[category]?.map((book, j) => <Book key={j} {...book} />)}
              perRow={3}
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
