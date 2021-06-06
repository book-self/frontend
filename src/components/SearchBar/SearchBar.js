import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { InputBase } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import { useStyles } from './SearchBarStyles';

export const SearchBar = () => {
  const classes = useStyles();
  const history = useHistory();

  const [searchQuery, setSearchQuery] = useState('');

  const processSearchQuery = (text) => {
    setSearchQuery(text.trim());
  };

  const executeSearchQuery = () => {
    if (searchQuery.trim()) {
      history.replace(`/search?q=${searchQuery}`);
    }
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <Search />
      </div>
      <InputBase
        margin="dense"
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        onInput={event => { if (event.target.value.trim()) processSearchQuery(event.target.value) }}
        onKeyUp={event => { if (event.key === 'Enter') executeSearchQuery() }}
      />
    </div>
  );
}