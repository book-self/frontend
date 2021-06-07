import axios from 'axios';


export const fetchUserRating = (bookId) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/v1/books/${bookId}/rating`)
        .then(response => {
            if (response.status !== 200) // API will return 404 if the user did not leave a rating on the book
                return null;

            return response.data
        });
}


// e.g., { "rating": 5, "comment": "Great!" } where you *need* to supply a rating; the comment is optional
export const postRating = (bookId, requestBody) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/v1/books/${bookId}/rating`, requestBody)
      .then(response => response.status !== 201 ? null : response.data)
      
};


// e.g., { "rating": 5, "comment": "Great!" } where you can supply a rating and/or comment (comment may be null)
export const patchRating = (bookId, requestBody) => {
    return axios.patch(`${process.env.REACT_APP_API_URL}/v1/books/${bookId}/rating`, requestBody);
};


export const deleteRating = (bookId) => {
    return axios.delete(`${process.env.REACT_APP_API_URL}/v1/books/${bookId}/rating`)
      .then(response => { return response.status; });
};
