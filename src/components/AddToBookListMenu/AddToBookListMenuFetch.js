import axios from 'axios';

export function postBooksToList(booksToAdd, idOfNewList, idOfOldList) {
  axios.put(`${process.env.REACT_APP_API_URL}/v1/book-lists/${idOfOldList}/move-books`, {
    newBookListId: idOfNewList,
    booksToBeAdded: booksToAdd,
    booksToBeRemoved: []
  })
    .then(response =>response.json());
}
