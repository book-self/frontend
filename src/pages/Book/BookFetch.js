export function fetchBook(byId) {
    return fetch(`${process.env.REACT_APP_API_URL}/v1/books/${byId}`)
      .then(response => response.json())
      .then(json => json);
}


export function fetchRelatedBooks(bookId, byAuthorId) {
    return fetch(`${process.env.REACT_APP_API_URL}/v1/books/by-author?authorId=${byAuthorId}`)
        .then(response => response.json())
        .then(json => json.filter(book => book.id !== bookId));
}


export function postBooksToList(updatedListName, booksToAdd, idOfNewList, idOfOldList) {
    
    const requestOptions = {
        method: 'PUT',
        crossDomain:true,
        mode: 'cors',
        headers: {
        'Content-Type':'application/json'},
        body: JSON.stringify({ newListName: updatedListName, newBookListId: idOfNewList, booksToBeAdded: booksToAdd, booksToBeRemoved: []})
    }
    console.log(requestOptions);
    return fetch(`${process.env.REACT_APP_API_URL}/v1/book-lists/${idOfOldList}/update`, requestOptions)
    .then(response =>response.json());
}
