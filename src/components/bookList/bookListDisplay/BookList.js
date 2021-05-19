import { useState , useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom";
import { fetchBookListDetails,fetchBooksInList, fetchAllUserBookLists, postBooksToList } from './BookListFetch';
import {fetchBook} from '../../../pages/Book/BookFetch'
import {SingleBookDisplay} from './singleBookDisplay/SingleBookDisplay'



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
    }
    getBooksInList();
  },[id]
)
useEffect(() =>
  {
    if(userId === null) return;
    async function getUserBookLists() {
      setAllUserBookLists(await fetchAllUserBookLists(8));
      
    }
    getUserBookLists();
  },[userId]
    )
  let bookIds = [];
  let addToBookListId;

  const handleValueChange = function(event) {

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
        
    }

    const handleBookListChange = function(event){
      
      addToBookListId = event.target.value;
    }

    const handleSubmit = function(event){
      event.preventDefault();
      console.log("BookIDS:" + bookIds);
      if(addToBookListId != null)
      {
        console.log("Add to" + addToBookListId);
      }

      console.log("Remove from" + id);
      postBooksToList("", bookIds,addToBookListId, id);
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
             !allUserBookLists ? null:
              
             <div> {allUserBookLists.map((userListDetails, j) => {
               if(userListDetails.id !== id){
                 return (
                    <div> 
                    
                    <input type="radio" name = "listChangeRadio" defaultChecked = {false} value = {userListDetails.id}  data-item = {j} onChange={handleBookListChange}/> 
                    Add to {userListDetails.listType}              
                    </div>)
                  }
                  else{
                    return(<div> 
                    
                    <input type="radio" name = "listChangeRadio" defaultChecked = {false} value = {userListDetails.id}  data-item = {j} onChange={handleBookListChange}/> 
                    Just remove from {userListDetails.listType}              
                    </div>)

                  } 
                }
             )
            }
            </div>
             
            }
            {
              !booksInList?null:
              <div>
                <form>
                  {booksInList.map((book, j) =><div>
                    <label>
                    
                    <input type="checkbox" defaultChecked = {false} value = {book.id}  data-item = {j} onChange={handleValueChange}/>


                    <SingleBookDisplay key = {j}  userId = {bookDetails.userId} id = {book.id} inList = {bookDetails.listType} genres = {book.genres} title = {book.title} authors = {book.authors} pages = {book.pages} blurb = {book.blurb}/>
                    </label>
                    </div>)}
                    <button onClick = {handleSubmit}>Submit Edits</button>
                  </form>
                  
                
              </div>
            }
           
        </div>
        </>
    
    
}
