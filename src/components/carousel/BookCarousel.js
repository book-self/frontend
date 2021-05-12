import { Typography } from '@material-ui/core';
import _ from 'lodash';
import Carousel from 'react-material-ui-carousel'

import BookRow from './BookRow';


// const useStyles = makeStyles({

// });


export default function BookCarousel(props) {
    // const classes = useStyles();
    const bookRows = _.chunk(props.books, props.perRow);
  
    return (
    <>
        {
            bookRows.length === 0 ? null :
            <>
                <div style={{position: 'relative', top: '-15px'}} id={encodeURI(props.title)}></div>
                <div style={{marginTop: '100px', width: '85vw', minHeight: '600px'}}>
                    <Typography variant="h4" style={{fontWeight: "bold", position: 'relative', top: '50px'}}>
                        {props.title}
                    </Typography>
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
    )
}
