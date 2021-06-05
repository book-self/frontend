import { makeStyles, withStyles, useTheme, useMediaQuery, Chip, Tooltip, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import BookCard  from './BookCard';
import { abbreviateAuthors, publishYear } from '../../utilities/Utilities';


const HtmlTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: '#F5F5F9',
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
      maxWidth: '550px'
    },
}))(Tooltip);


const useStyles = makeStyles({
    tooltipContainer: {
        padding: '12px'
    },

    tooltipTitle: {
        fontWeight: 'bold'
    },

    genresContainer: {
        margin: "15px 5px 10px 10px"
    }
});


export default function Book(props) {
    const classes = useStyles();
    const theme = useTheme();

    const tooltipTitle = `${props.title} ${publishYear(props.published)}`
    const authors = props.authors.map(author => author.name);
    const tooltipAuthorsAbbreviated = `by ${abbreviateAuthors(authors)}`

    return <>
      { 
        useMediaQuery(theme.breakpoints.up('md')) ? <HtmlTooltip
            title={
                <div className={classes.tooltipContainer}>
                    <Typography className={classes.tooltipTitle}>{tooltipTitle}</Typography>
                    <Typography gutterBottom>{tooltipAuthorsAbbreviated}</Typography>
                    <div className={classes.genresContainer}>
                        {props.genres.map((genre, i) => <Chip key={i} style={{margin: "5px"}} label={genre} />)}
                    </div>
                    <Rating style={{marginTop: "10px"}} value={props.averageRating} precision={0.1} readOnly />
                </div>
            }
          >
            <BookCard bookTitle={props.title} bookId={props.id} />
          </HtmlTooltip>
        : <BookCard bookTitle={props.title} bookId={props.id} />
      }
    </>
}
