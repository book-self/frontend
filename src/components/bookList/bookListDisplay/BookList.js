import React, { useState } from 'react';
import {shallowEqual } from 'react-redux'

import { useSelector, useDispatch } from 'react-redux';

import {SingleBookDisplay} from "../singleBookDisplay/SingleBookDisplay"

const selectBookList = (state) => state.booklistdisplay.map((book) => book.bookID)

export function BookList(){
    const booksTempList = useSelector(selectBookList, shallowEqual)


    const renderedListItems = booksTempList.map((book) => {
        return <SingleBookDisplay key={book} id={book} />})

    return(
        <div><ul className="book-list">{renderedListItems}</ul></div>
    )
}