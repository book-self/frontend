import { useState , useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom";
import { fetchBookListDetails,fetchBooksInList, fetchAllUserBookLists } from './BookListFetch';
import {fetchBook} from '../../../pages/Book/BookFetch'
import {SingleBookDisplay} from './singleBookDisplay/SingleBookDisplay'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { $CombinedState } from 'redux';



export const BookList = () =>{
    
    const [bookDetails, setBookDetails] = useState(null);
    const [booksInList, setBooksInList] = useState(null);
    const [allUserBookLists, setAllUserBookLists] = useState(null);
    const [selecteBooks, setSelectedBooks] = useState([]);
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
      console.log("TESTING: " + await fetchBooksInList(id));
    }
    getBooksInList();
  },[id]
)

useEffect(() =>
  {
    if(userId === null) return;
    console.log(userId);
    async function getUserBookLists() {
      const temp = await fetchAllUserBookLists(8);
      console.log(temp);
    }
    getUserBookLists();
  },[userId]
    )

  let bookIds = [];
  const handleValueChange = function(event) {

        
        console.log("Testing");
        console.log(event.target.checked);
        if(event.target.checked)
        {
          bookIds.push(event.target.value);
        }
        else
        {
          let newBookIds = bookIds.filter(function(element){
            return element != (event.target.value);

          })
          bookIds = newBookIds;
        }
        console.log(event.target);
        console.log(event.target.value)
        console.log(bookIds);
        
    }

 
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
              
            }
            {
              !booksInList?null:
              <div>
                <form>
                  
                    <button>Submit Edits</button>
                  </form>
                  
                
              </div>
            }
           
        </div>
        </>
    
    
}

