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

export function postBooksListNameChange(updatedListName, idOfOldList) {
    
    const requestOptions = {
        method: 'PUT',
        crossDomain:true,
        mode: 'cors',
        headers: {
        'Content-Type':'application/json'},
        body: JSON.stringify({ newListName: updatedListName})
    }
    
    return fetch(`${process.env.REACT_APP_API_URL}/v1/book-lists/${idOfOldList}/update-list-name`, requestOptions)
    .then(response =>response.json());
}



export function postMoveBooksOffList(booksToAdd, idOfNewList, idOfOldList) {
    
    const requestOptions = {
        method: 'PUT',
        crossDomain:true,
        mode: 'cors',
        headers: {
        'Content-Type':'application/json'},
        body: JSON.stringify({ newBookListId: idOfNewList, booksToBeAdded: booksToAdd, booksToBeRemoved: booksToAdd})
    }
    return fetch(`${process.env.REACT_APP_API_URL}/v1/book-lists/${idOfOldList}/move-books`, requestOptions)
    .then(response =>response.json());
}