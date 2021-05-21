import axios from 'axios';

export const fetchBookLists = (id) => {
    const url = `${process.env.REACT_APP_API_URL}/v1/users/${id}/book-lists`
    return axios.get(url);
}