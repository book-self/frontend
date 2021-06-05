import { useMediaQuery, useTheme, makeStyles, Typography } from '@material-ui/core';
import _ from 'lodash';
import Carousel from 'react-material-ui-carousel';

import BookRow from './BookRow';


const useStyles = makeStyles({
    urlFragmentTarget: {
        position: 'relative',
        top: '27.5px'
    },

    carouselWrapper: {
        marginTop: '100px',
        width: '85vw',
        minHeight: '600px'
    },

    carouselTitle: {
        fontWeight: "bold",
        position: 'relative',
        top: '50px'
    }
});


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


// book card:
  // minWidth: 250px
  // maxWidth: 450px
// xs, sm: 1 book
// md: 2 books
// lg: 3 books
// xl: 4 books
// only problem with this is for *very large* screens, xl will always return 4
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
    default:
      return 1;
  }
}


export default function BookCarousel(props) {
    const deviceWidth = useWidth();
    const numBooksPerRow = decideNumBooksPerRow(deviceWidth);

    const classes = useStyles();
    const bookRows = _.chunk(props.books, numBooksPerRow);
  
    return <>
        {
            bookRows?.length > 0 &&
            <>
                <div className={classes.urlFragmentTarget} id={encodeURI(props.title)}></div>
                <div className={classes.carouselWrapper}>
                    <Typography variant="h4" className={classes.carouselTitle}>{props.title}</Typography>
                    <Carousel autoPlay={false} indicators={false} navButtonsAlwaysVisible={bookRows.length !== 1} navButtonsAlwaysInvisible={bookRows.length === 1} >
                        {
                            bookRows.map((bookRow, i) => (
                                <BookRow key={i} books={bookRow} />
                            ))
                        }
                    </Carousel>
                </div>
            </>
        }
    </>
}
