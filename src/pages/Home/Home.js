import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMediaQuery, useTheme, Slide, Typography, Chip, IconButton } from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';
import clsx from  'clsx';

import { LargeHeader } from './LargeHeader';
import { SmallHeader } from './SmallHeader';

import BookCarousel from '../../components/Carousel/BookCarousel.js';
import Book from "../../components/Carousel/Book.js";

import { useStyles } from './HomeStyles';
import { 
  fetchMostPopularCategories,
  fetchAssortedGenreOfferings,
  fetchBooks
} from './HomeFetch';

import { useSelector } from 'react-redux';
import { selectUser } from "../../store/User/UserSlice";


function useCategorizations(userId) {
  const [categorizations, setCategorizations] = useState([]);

  useEffect(() => {
    (async () => {
      const mostPopularCategories = await fetchMostPopularCategories();
      setCategorizations([mostPopularCategories]);
    })();
  }, []);


  useEffect(() => {
    (async () => {
      // if (!userId) {
        const genreOfferings = await fetchAssortedGenreOfferings();
        setCategorizations(categorizations => {
          const categoriesSoFar = categorizations.flatMap(categorization => categorization.categories);

          // make sure it's not already a category
          genreOfferings.categories = genreOfferings.categories.filter(genre => !categoriesSoFar.includes(genre));
          return categorizations.concat([genreOfferings]);
        });
     // }
    })();
  }, []); // [userId]);


  // useEffect(() => {
  //   if (userId)
  //     setCategorizations(categorizations =>
  //       categorizations.concat([await fetchUserRecommendations()])
  //     );
  // }, [userId]);


  return categorizations;
}


export const Home = () => {
  const theme = useTheme();
  const classes = useStyles();

  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState({});
  const [displayScrollBtn, setDisplayScrollBtn] = useState(false);

  const history = useHistory();
  const { id } = useSelector(selectUser);
  const categorizations = useCategorizations(id);


  // fetching of books to put into the carousels
  useEffect(() => {
    async function getBooks() {
      for (const categorization of categorizations) {
        for (const category of categorization.categories) {
          const booksInCategory = await fetchBooks(category);
          setBooks((booksSoFar) => ({ ...booksSoFar, [category]: booksInCategory}));
        }
      }
    }

    getBooks();
  }, [categorizations]);


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
      { categorizations?.map((categorization, index) => <div key={index} style={{margin: '50px 30px 0 30px', minWidth: '400px'}}>

        <Typography variant="h4" style={{textAlign: 'center'}}>{categorization.name}</Typography>
        <ul className={classes.categoriesList}>
          { 
            categorization?.categories.map((category, i) =>
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

      </div>)
      }
    </div>
    
    <div className={classes.carouselContainer}>
      {
          categorizations.flatMap((categorization, i) => 
            categorization.categories.map((category, j) =>
              <div key={categorization.name + category}>
                <BookCarousel
                  key={categorization.name + category}
                  title={category}
                  books={books[category]?.map((book, j) => <Book key={j} {...book} />)}
                />
              </div>
            )
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
