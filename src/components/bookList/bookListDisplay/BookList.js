import { useState , useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom";
import { fetchBookListDetails,fetchBooksInList, fetchAllUserBookLists } from './BookListFetch';
import {fetchBook} from '../../../pages/Book/BookFetch'
import {SingleBookDisplay} from './singleBookDisplay/SingleBookDisplay'

export const BookList = () =>{
    
    const [bookDetails, setBookDetails] = useState(null);
    const [booksInList, setBooksInList] = useState(null);
    const [allUserBookLists, setAllUserBookLists] = useState(null);
    let { id } = useParams();
    

  useEffect(() => {
    async function getBookDetails() {
      setBookDetails(await fetchBookListDetails(id));
    }

    getBookDetails();
  }, [id]);

const userId = bookDetails?.userId;
  useEffect(() =>
  {
    async function getBooksInList() {
      setBooksInList(await fetchBooksInList(id));
    }
    getBooksInList();
  },[id]
)

useEffect(() =>
  {
    if(userId === null) return;
    console.log(userId);
    async function getUserBookLists() {
      const temp = await fetchAllUserBookLists(userId);
      console.log(temp);
    }
    getUserBookLists();
  },[userId]
    )


    return<>
        <div>
            {
              !bookDetails ? null:
              <div>
                  Welcome to booklist: {bookDetails.id} 
                  
                <div>The ids of books in your {bookDetails.listType} are:</div>
                <div>Even more book details {bookDetails.userId}</div>
              </div>
            }
            {
              !allUserBookLists?null:
              <div>{allUserBookLists}</div>
            }
            {
              !booksInList?null:
              <div>
                {booksInList.map((book, j) =><div><SingleBookDisplay key = {j} allUserBookLists = {allUserBookLists} userId = {bookDetails.userId} id = {book.id} inList = {bookDetails.listType} genres = {book.genres} title = {book.title} authors = {book.authors} pages = {book.pages} blurb = {book.blurb} userBookLists = {allUserBookLists}/></div>)}
            
              </div>
            }
           
        </div>
        </>
    
    
}

