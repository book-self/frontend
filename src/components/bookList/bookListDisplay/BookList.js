import { useState , useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom";
import { fetchBookListDetails } from './BookListFetch';
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

  const bookIds = bookDetails?.books;

  useEffect(() =>
  {
    if (bookIds == null) return;

    let getBooksInList = async() =>{
      for(const bookId of bookIds){
        
        const bookInList = await fetchBook(bookId);
        console.log(bookInList);
    
      }
    }
    getBooksInList();
  },[bookIds]
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
              !booksInList ? null:
              <div>
                  {booksInList}
              </div>
            }
           
        </div>
        </>
    
    
}

