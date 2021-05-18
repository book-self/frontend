import axios from 'axios';

export const fetchBookList = (id) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/v1/book-lists/${id}`;
    return axios.get(endpoint);
}

export const fetchBookById = (id) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/v1/books/${id}`;
    return axios.get(endpoint);
}