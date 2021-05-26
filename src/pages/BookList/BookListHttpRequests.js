import axios from 'axios';
import _ from "lodash";

export const fetchBookList = (id) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/v1/book-lists/${id}`;
    return axios.get(endpoint);
}

export const fetchBookById = (id) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/v1/books/${id}`;
    return axios.get(endpoint);
}

export const updateBookList = (bookList) => {
    const { id, bookListName, editedName, books, add, remove } = bookList;
    const booksToBeAdded = _.without(add, ...books, ...remove);
    const booksToBeRemoved = _.without(_.intersection(books, remove), ...add);
    const updateName = editedName && bookListName !== editedName ? { newListName: editedName} : {};
    const addBooks = booksToBeAdded.length > 0 ? { booksToBeAdded } : {};
    const removeBooks = booksToBeRemoved.length > 0 ? { booksToBeRemoved } : {};
    const payload = { ...updateName, ...addBooks, ...removeBooks, newBookListId: id };
    const endpoint = `${process.env.REACT_APP_API_URL}/v1/book-lists/${id}/update`;
    return axios.put(endpoint, payload);
}