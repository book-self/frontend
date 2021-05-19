import { makeStyles, Typography } from '@material-ui/core';
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


export default function BookCarousel(props) {
    const classes = useStyles();
    const bookRows = _.chunk(props.books, props.perRow);
  
    return <>
        {
            bookRows.length === 0 ? null :
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
