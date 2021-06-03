export function fetchUserRating(bookId) {
    return fetch(`${process.env.REACT_APP_API_URL}/v1/books/${bookId}/rating`, {
        headers: {
            'Authorization': 'Basic ' + btoa('ckleinvehn:christian')
        }
    })
        .then(response => {
            if (response.status !== 200) // API will return 404 if the user did not leave a rating on the book
                return null;

            return response.json()
        })
}


export const postRating = (bookId, object) => {
    console.log("POST");
    console.log(object);

    return fetch(`${process.env.REACT_APP_API_URL}/v1/books/${bookId}/rating`, {
        method: 'POST',
        body: JSON.stringify(object), // e.g., { "rating": 5, "comment": "Great!" } where you *need* to supply a rating; the comment is optional
        headers: {
            'Authorization': 'Basic ' + btoa('ckleinvehn:christian'),
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.status !== 201 ? null : response.json())
};


export const patchRating = (bookId, object) => {
    console.log("PATCH");
    console.log(object);

    return fetch(`${process.env.REACT_APP_API_URL}/v1/books/${bookId}/rating`, {
        method: 'PATCH',
        body: JSON.stringify(object), // e.g., { "rating": 5, "comment": "Great!" } where you can supply a rating and/or comment (comment may be null)
        headers: {
            'Authorization': 'Basic ' + btoa('ckleinvehn:christian'),
            'Content-Type': 'application/json'
        }
    })
};


// TODO should probably verify it's deleted, etc., etc.
export const deleteRating = (bookId) => {
    fetch(`${process.env.REACT_APP_API_URL}/v1/books/${bookId}/rating`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Basic ' + btoa('ckleinvehn:christian')
        }
    })
};
