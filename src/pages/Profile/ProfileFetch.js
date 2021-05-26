export function fetchUserBookLists(userId){
    return fetch(`${process.env.REACT_APP_API_URL}/v1/users/${userId}/book-lists`)
    .then(response =>response.json());
}

export function fetchUserDetails(userId){
    return fetch(`${process.env.REACT_APP_API_URL}/v1/users/${userId}`).then(response =>response.json());
}