import axios from 'axios';

// export function fetchMostPopularCategories
// export function fetchAssortedGenreOfferings

export function fetchMostPopularCategories() {
  return axios.get(`${process.env.REACT_APP_API_URL}/v1/genres?popular=yes`)
    .then(response => ({
      name: 'Our most popular categories',
      categories: response.data?.slice(0, 10)
    }));
}


export function fetchAssortedGenreOfferings() {
  return axios.get(`${process.env.REACT_APP_API_URL}/v1/genres`)
    .then(response => ({
      name: 'Assorted genre offerings',
      categories: response.data?.slice(0, 5)
    }));
}


export function fetchBooks(byCategory) {
    return axios.get(`${process.env.REACT_APP_API_URL}/v1/books?genre=${byCategory.replaceAll(' ', '+')}`)
      .then(response => response.data)
}


// TODO:
// export function fetchUserRecommendations


// OLD:
// export function fetchCategories() {
//   return fetch(`${process.env.REACT_APP_API_URL}/v1/genres/any`)
//     .then(response => response.json())
//     .then(json => json);
// }
