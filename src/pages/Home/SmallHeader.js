import { TextField, Typography, Card, IconButton } from "@material-ui/core"
import { Search } from '@material-ui/icons';

import { useStyles } from './HomeStyles';


export const SmallHeader = (props) => {
    const classes = useStyles();
    
    // className={clsx(classes.headerCard, classes.leftCard)}

    return (
      <header>
        <Card style={{textAlign: 'center', width: '75vw', margin: 'auto'}}>
          <Typography variant="h1" component="h1" className={classes.bookselfTitle} style={{textAlign: 'center', lineHeight: '5rem', marginBottom: '2rem', padding: '0 15px'}}>
            <span style={{fontWeight: "50"}}>Book</span> <span style={{fontWeight: "300"}}>Self</span>
          </Typography>
          <Typography variant="h5" component="h2" className={classes.bookselfDescription} style={{padding: '0 15px'}}>a self-curated library of your books.</Typography>

          <TextField
            label="Find your next book"
            className={classes.searchBar}
            InputProps={{endAdornment: <IconButton style={{padding: '3.5px'}}><Search onClick={props.executeSearchQuery} /></IconButton>}}
            variant="outlined"
            onInput={event => { if (event.target.value.trim()) props.processSearchQuery(event.target.value) }}
            onKeyUp={event => { if (event.key === 'Enter') props.executeSearchQuery() }}
            style={{marginBottom: '2rem', maxWidth: '90%'}}
          />
        </Card> 
      </header>
    )
}
