import axios from 'axios';

export const fetchBookLists = (id) => {
    const url = `${process.env.REACT_APP_API_URL}/v1/users/${id}/book-lists`
    return axios.get(url);
}

export const fetchBookList = (id) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/v1/book-lists/${id}`;
    return axios.get(endpoint);
}