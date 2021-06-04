import { TextField, Typography, Card, IconButton } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import clsx from  'clsx';
import TextLoop from 'react-text-loop';

import { useStyles } from './HomeStyles';


export const LargeHeader = (props) => {
  const classes = useStyles();

  return <header className={classes.headerContainer}>
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
            InputProps={{endAdornment: <IconButton style={{padding: '3.5px'}}><Search onClick={props.executeSearchQuery} /></IconButton>}}
            variant="outlined"
            onInput={event => { if (event.target.value.trim()) props.processSearchQuery(event.target.value) }}
            onKeyUp={event => { if (event.key === 'Enter') props.executeSearchQuery() }}
          />
        </Card>
      </div>
    </header>
}
