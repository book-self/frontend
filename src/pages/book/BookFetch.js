export function fetchBook(byId) {
    return fetch(`http://localhost:8080/v1/books/${byId}`)
      .then(response => response.json())
      .then(json => json);
}


export function fetchRelatedBooks(bookId, byAuthorId) {
    return fetch(`http://localhost:8080/v1/books/by-author?authorId=${byAuthorId}`)
        .then(response => response.json())
        .then(json => json.filter(book => book.id !== bookId));
}
