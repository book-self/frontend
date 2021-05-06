import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import{
    changeBookStatus,
} from '../bookListDisplay/bookListSlice';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './singleBookDisplay.css';
import { render } from '@testing-library/react';




        const selectBookById = (state, bookId) => {
        return state.booklistdisplay.find((book) => book.bookID=== bookId);
        };
    

export function SingleBookDisplay({id}){

    const book = useSelector((state) => selectBookById(state, id));

    const { bookID, bookName, bookAuthor, booksPages, userBookStatus } = book;
    console.log("Book status:");
    console.log(userBookStatus);
        
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();



    const handleClick = (event) => {
        console.log(event);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (chosenStatus, bookIdAffected) => {
        setAnchorEl(null);
        dispatch(changeBookStatus([bookIdAffected, chosenStatus]));
    };
    
    return (
        <div id = "singleBookDisplay">
            <div id = "bookImage"></div>
            <div id = "bookDataDisplay">
                <div id = "bookTitleDisplay">
                    {bookName}
                </div>
                <div id = "authorDisplay">
                    {bookAuthor}
                </div>
                <div id = "bookGenreDisplay">Fiction Fantasy Dark</div>
                <div id = "bookDetailDisplay">
                    Number of Pages : {booksPages}

                </div>
                <div id = "bookStatusDisplay">
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <span>{userBookStatus}</span>
                      
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => handleClose("Read", {bookID})}>Read</MenuItem>
                        <MenuItem onClick={() => handleClose("Currently Reading", {bookID})} >Currently Reading</MenuItem>
                        <MenuItem onClick={() => handleClose("Did Not Finish", {bookID})}>Did Not Finish</MenuItem>
                        <MenuItem onClick={() => handleClose("To Be Read", {bookID})}>To Be Read</MenuItem>
                    </Menu>
                    
                </div>
            </div>
        </div>
    )
}