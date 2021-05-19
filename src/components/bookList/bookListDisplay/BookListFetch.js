export function fetchBookListDetails(byId) {
    return fetch(`${process.env.REACT_APP_API_URL}/v1/book-lists/${byId}`)
        .then(response => response.json());
}


export function fetchBooksInList(byBookListId) {
    return fetch(`${process.env.REACT_APP_API_URL}/v1/book-lists/${byBookListId}/books`)
        .then(response => response.json());
}

export function fetchAllUserBookLists(userId){
    return fetch(`${process.env.REACT_APP_API_URL}/v1/users/${userId}/book-lists`)
    .then(response =>response.json());
}

export function addBookToList(updatedListName, addedBookLists, idOfList) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newListName: updatedListName, booksToBeAdded: addedBookLists, booksToBeRemoved: addedBookLists })
    }
    return fetch(`${process.env.REACT_APP_API_URL}/v1/book-lists/${idOfList}/update}`, requestOptions)
        .then(response => response.json())
        .then(json => json);
}
