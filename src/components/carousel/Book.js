import { Link } from 'react-router-dom';
import { makeStyles, withStyles, Card, CardActionArea, CardContent,
    Chip, Tooltip, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import { abbreviateAuthors, publishYear } from '../../utilities/Utilities';


const HtmlTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
      maxWidth: '500px'
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
    },

    bookCard: {
        width: "20vw",
        textAlign: "center",
        margin: "25px",
        minHeight: '350px'
    }
});


export default function Book(props) {
    const classes = useStyles();

    const tooltipTitle = `${props.title} ${publishYear(props.published)}`
    const authors = props.authors.map(author => author.name);
    const tooltipAuthorsAbbreviated = `by ${abbreviateAuthors(authors)}`

    return (
        <HtmlTooltip
            title={
                <div className={classes.tooltipContainer}>
                    <Typography className={classes.tooltipTitle}>{tooltipTitle}</Typography>
                    <Typography gutterBottom>{tooltipAuthorsAbbreviated}</Typography>
                    <div className={classes.genresContainer}>
                        {props.genres.map((genre, i) => <Chip key={i} style={{margin: "5px"}} label={genre} />)}
                    </div>
                    <Rating style={{marginTop: "10px"}} value={Math.random() * 5} precision={0.1} readOnly />
                </div>
            }
        >
            <Card className={classes.bookCard}>
                <Link to={`/book/${props.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                    <CardActionArea style={{paddingTop: "25px"}}>
                        <img width={175} height={250} src={`https://bookself-thumbnails.s3.us-east-2.amazonaws.com/${props.id}.jpg`} onError={(error) => error.target.src=`${process.env.PUBLIC_URL}/no-cover.jpg`} alt={props.title} />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                                {props.title}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        </HtmlTooltip>
    );
}
