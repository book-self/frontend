export function fetchBookListDetails(byId) {
    return fetch(`${process.env.REACT_APP_API_URL}/v1/book-lists/${byId}`)
        .then(response => response.json());
}


export function fetchBooksInList(byBookListId) {
    return fetch(`${process.env.REACT_APP_API_URL}/v1/book-lists/get-user-book-lists\?userId=${byBookListId}`)
        .then(response => response.json());
}


export function addBookToList(idOfBook, idOfList) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId: idOfBook, listId: idOfList })
    }
    return fetch(`${process.env.REACT_APP_API_URL}/v1/book-lists/add-book-to-list}`, requestOptions)
        .then(response => response.json())
        .then(json => json);
}
