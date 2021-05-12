export function fetchCategories() {
    return fetch(`http://localhost:8080/v1/genres/any`)
      .then(response => response.json())
      .then(json => json);
}


export function fetchBooks(byCategory) {
    return fetch(`http://localhost:8080/v1/books/by-genre?genre=${byCategory.replaceAll(' ', '+')}`)
        .then(response => response.json())
        .then(json => json);
}
