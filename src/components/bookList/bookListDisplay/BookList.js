import { useState , useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom";
import { fetchBookListDetails,fetchBooksInList } from './BookListFetch';
import {fetchBook} from '../../../pages/Book/BookFetch'
import {SingleBookDisplay} from './singleBookDisplay/SingleBookDisplay'

export const BookList = () =>{
    
    const [bookDetails, setBookDetails] = useState(null);
    const [booksInList, setBooksInList] = useState(null);
    let { id } = useParams();
    

  useEffect(() => {
    async function getBookDetails() {
      setBookDetails(await fetchBookListDetails(id));
    }

    getBookDetails();
  }, [id]);

  useEffect(() =>
  {
    async function getBooksInList() {
      setBooksInList(await fetchBooksInList(id));
    }
    getBooksInList();
  },[id]
)


    return<>
        <div>
            {
              !bookDetails ? null:
              <div>
                  Welcome to booklist: {bookDetails.id}
                <div>The ids of books in your {bookDetails.listType} are:</div>
                <div>Even more book details </div>
              </div>
            }
            {
              !booksInList?null:
              <div>
                {booksInList.map((book, j) =><div><SingleBookDisplay key = {j} userId = {bookDetails.userId} id = {book.id} inList = {bookDetails.listType} genres = {book.genres} title = {book.title} authors = {book.authors} pages = {book.pages} blurb = {book.blurb}/></div>)}
            
              </div>
            }
           
        </div>
        </>
    
    
}

