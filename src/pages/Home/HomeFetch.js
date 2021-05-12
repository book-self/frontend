export function fetchCategories() {
    return fetch(`${process.env.REACT_APP_API_URL}/v1/genres/any`)
      .then(response => response.json())
      .then(json => json);
}


export function fetchBooks(byCategory) {
    return fetch(`${process.env.REACT_APP_API_URL}/v1/books/by-genre?genre=${byCategory.replaceAll(' ', '+')}`)
        .then(response => response.json())
        .then(json => json);
}
