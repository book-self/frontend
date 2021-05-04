import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import{
    selectSingleBookStatus,
    changeBookStatus,
} from './singleBookDisplaySlice';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './singleBookDisplay.css';
import { render } from '@testing-library/react';



export function SingleBookDisplay(){
    
    
  const [anchorEl, setAnchorEl] = React.useState(null);

  const bookStatus = useSelector(selectSingleBookStatus);

  const dispatch = useDispatch();


  const handleClick = (event) => {
      console.log(event);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (chosenStatus) => {
    setAnchorEl(null);
    dispatch(changeBookStatus(chosenStatus));
  };
  
  //          onClick={() => dispatch(changeBookStatus(incrementValue))}

    return (
        <div id = "singleBookDisplay">
            <div id = "bookImagen"></div>
            <div id = "bookDataDisplay">
                <div id = "bookTitleDisplay">
                    Book Title
                </div>
                <div id = "authorDisplay">
                    Author
                </div>
                <div id = "bookGenreDisplay">Fiction Fantasy Dark</div>
                <div id = "bookDetailDisplay">
                    Book Details: Number of Pages

                </div>
                <div id = "bookStatusDisplay">
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <span>{bookStatus}</span>
                      
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => handleClose("Read")}>Read</MenuItem>
                        <MenuItem onClick={() => handleClose("Currently Reading")} >Currently Reading</MenuItem>
                        <MenuItem onClick={() => handleClose("Did Not Finish")}>Did Not Finish</MenuItem>
                        <MenuItem onClick={() => handleClose("To Be Read")}>To Be Read</MenuItem>
                    </Menu>
                    
                </div>
            </div>
        </div>
    )
}