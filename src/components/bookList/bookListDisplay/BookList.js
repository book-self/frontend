import { React, useState , useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom";
import { fetchBookListDetails,fetchBooksInList, fetchAllUserBookLists, postBooksToList } from './BookListFetch';
import {SingleBookDisplay} from './singleBookDisplay/SingleBookDisplay'

import { useStyles } from './BookListStyles';

import LibraryBooksTwoToneIcon from "@material-ui/icons/LibraryBooksTwoTone";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";

import EditIcon from "@material-ui/icons/Edit";

import {
  Paper,
  Avatar,
  Checkbox,
  Grid,
  Card,
  Typography,
  Fab,
  GridList,
  GridListTile,
  Input,
  Container,
  InputAdornment,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup
} from "@material-ui/core";


import {
  indigo
} from "@material-ui/core/colors";


export const BookList = () =>{
  const classes = useStyles();

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
          <div>
        
            {
              !bookDetails ? null:
              <div>
            
                <Paper className={classes.paper} elevation={0}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar className={classes.indigo}>
                      <LibraryBooksTwoToneIcon
                        style={{
                          backgroundColor: indigo[500],
                          color: indigo[50],
                        }}
                      />
                    </Avatar>
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Typography variant="h4" component="h4" noWrap>
                      {bookDetails.editedName || bookDetails.bookListName}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
              </div>
            }
            {
             !allUserBookLists ? null:
              
             <div>
               <Paper className={classes.paperListOptions} elevation = {0}>
                 <Grid container wrap="nowrap" spacing={2} alignItems="center" justify="center">
                  <FormControl> 
                    <RadioGroup row aria-label="position" name="list-change-radio" defaultValue="end">
                      {allUserBookLists.map((userListDetails, j) => {
                        if(userListDetails.id !== id){
                          return (
                              <div> 
                              <FormControlLabel value="end" control={<Radio color="primary" value = {userListDetails.id} onChange={handleBookListChange}/>} label={"Add to " + `${userListDetails.listType}`}/>  
                              </div>
                              )
                            }
                            else{
                              return(<div> 
                              <FormControlLabel value="end" control={<Radio color="primary" value = {userListDetails.id} onChange={handleBookListChange}/>} label={"Remove from " + `${userListDetails.listType}`}/>  
                                        
                              </div>)

                            } 
                          }
                      )
                    }
                    </RadioGroup>

                  </FormControl>
              </Grid>
              </Paper>
            </div>
             
            }
            {
              !booksInList?null:
              <div className={classes.rootBookList}>
                
                <Grid container wrap="nowrap" spacing={24} alignItems="center" justify="center" >
                <FormControl> 
                  <form>
                    {booksInList.map((book, j) =>
                      
                        <Grid item sm={6} lg = {6}>
                        <Card variant="outlined">                          <FormControlLabel value="end" control={
                              <Checkbox onChange={handleValueChange} color="primary" value = {book.id}  data-item = {j} 
                              inputProps={{ 'aria-label': 'secondary checkbox' }} />}/>  
                          <span><SingleBookDisplay key = {j}  userId = {bookDetails.userId} id = {book.id} inList = {bookDetails.listType} genres = {book.genres} title = {book.title} authors = {book.authors} pages = {book.pages} blurb = {book.blurb}/></span>
                        </Card>
                        </Grid>

                      )}
                      <button onClick = {handleSubmit}>Submit Edits</button>
                  </form>
                  
                </FormControl>
                </Grid>
              
                
                
              </div>
            }
            
            </div>

          
        </div>
        </>
    
    
}
