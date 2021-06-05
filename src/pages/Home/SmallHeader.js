import { TextField, Typography, Card, IconButton } from "@material-ui/core"
import { Search } from '@material-ui/icons';

import { useStyles } from './HomeStyles';


export const SmallHeader = (props) => {
    const classes = useStyles();
    
    return (
      <header style={{marginTop: '2rem'}}>
        <Card style={{textAlign: 'center', width: '75vw', minWidth: '300px', margin: 'auto', padding: '2rem'}}>
          <Typography variant="h1" component="h1" className={classes.bookselfTitle} style={{textAlign: 'center', lineHeight: '5rem', marginBottom: '2rem', padding: '0 15px'}}>
            <span style={{fontWeight: "50"}}>Book</span> <span style={{fontWeight: "300"}}>Self</span>
          </Typography>
          <Typography variant="h5" component="h2" className={classes.bookselfDescription} style={{padding: '0 15px'}}>a self-curated library of your books.</Typography>

          <TextField
            label="Find your next book"
            className={classes.searchBar}
            InputProps={{endAdornment: <IconButton onClick={props.executeSearchQuery} style={{padding: '3.5px'}}><Search /></IconButton>}}
            variant="outlined"
            onInput={event => { if (event.target.value.trim()) props.processSearchQuery(event.target.value) }}
            onKeyUp={event => { if (event.key === 'Enter') props.executeSearchQuery() }}
            style={{margin: '2rem 0', maxWidth: '90%'}}
          />
        </Card> 
      </header>
    )
}
