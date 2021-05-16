export function fetchBookListDetails(byId) {
    return fetch(`${process.env.REACT_APP_API_URL}/v1/book-lists/${byId}`)
        .then(response => response.json());
}


export function fetchBooksInList(byBookListId) {
    return fetch(`${process.env.REACT_APP_API_URL}/v1/book-lists/get-books-in-list\?bookListId=${byBookListId}`)
        .then(response => response.json());
}

export function fetchAllUserBookLists(userId){
    return fetch(`${process.env.REACT_APP_API_URL}/v1/book-lists/get-user-book-lists?userId=${userId}`)
    .then(response =>response.json());
}

export function addBookToList(idOfBook, chosenListType, userId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId: idOfBook, listType: chosenListType, userId: userId })
    }
    return fetch(`${process.env.REACT_APP_API_URL}/v1/book-lists/add-book-to-list}`, requestOptions)
        .then(response => response.json())
        .then(json => json);
}
