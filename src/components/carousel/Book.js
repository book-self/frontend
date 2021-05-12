import { Link } from 'react-router-dom';
import { withStyles, Card, CardActionArea, CardContent,
    Chip, Tooltip, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';


const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
      maxWidth: '500px'
    },
}))(Tooltip);


export default function Book(props) {
    return (
        <HtmlTooltip
            title={
                <div style={{padding: '12px'}}>
                    <Typography style={{fontWeight: "bold"}}>{props.info.title} { props.info.published ? `(${props.info.published.split('-')[0]})` : null }</Typography>
                    <Typography gutterBottom>by {props.info.authors.map(author => author.name).join(', ')}</Typography>
                    <div style={{margin: "15px 5px 10px 10px"}}>{props.info.genres.map((genre, i) => <Chip key={i} style={{margin: "5px"}} label={genre} />)}</div>
                    <Rating style={{marginTop: "10px"}} value={Math.random() * 5} precision={0.1} readOnly />
                </div>
            }
        >
            <Card style={{width: "20vw", textAlign: "center", margin: "25px", minHeight: '350px'}}>
                <Link to={`/book/${props.info.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                    <CardActionArea style={{paddingTop: "25px"}}>
                        <img width={175} height={250} src={`https://bookself-thumbnails.s3.us-east-2.amazonaws.com/${props.info.id}.jpg`} title={props.info.title} alt={props.info.title} />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                                {props.info.title}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        </HtmlTooltip>
    );
}
