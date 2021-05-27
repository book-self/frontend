import { React, useState , useEffect} from 'react';
import { useParams } from "react-router-dom";
import { fetchBookListDetails,fetchBooksInList, fetchAllUserBookLists, postBooksToList } from './BookListFetch';
import {SingleBookDisplay} from '../../components/BookList/singleBookDisplay/SingleBookDisplay'

import { useStyles } from './BookListStyles';

import { selectUser } from "../../store/User/UserSlice";
import { useSelector } from "react-redux";

import LibraryBooksTwoToneIcon from "@material-ui/icons/LibraryBooksTwoTone";
import SaveIcon from "@material-ui/icons/Save";

import EditIcon from "@material-ui/icons/Edit";

import {
  Paper,
  Avatar,
  Checkbox,
  Grid,
  Card,
  Typography,
  Fab,
  Input,
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

  const [bookListDetails, setBookListDetails] = useState(null);
  const [booksInList, setBooksInList] = useState(null);
  const [allUserBookLists, setAllUserBookLists] = useState(null);
  const [editedName, setEditedName] = useState("");
  const {id} = useSelector(selectUser);

  let { listId } = useParams();
  
  const handleEditListName = (event) => {
    setEditedName(event.target.value);
  }
    
  useEffect(() => {
    async function getBookDetails() {
      
      setBookListDetails(await fetchBookListDetails(listId));
    }

    getBookDetails();
  }, [listId]);

const userId = id;
  useEffect(() =>
  {
    async function getBooksInList() {
      setBooksInList(await fetchBooksInList(listId));
    }
    getBooksInList();
  },[listId]
)
useEffect(() =>
  {
    if(userId === null) return;
    async function getUserBookLists() {
      setAllUserBookLists(await fetchAllUserBookLists(userId));
      
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
            return element !== (event.target.value);

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
      else
      {
        addToBookListId = listId;
      }
      if(editedName == null || editedName === "")
      {
        
        postBooksToList(bookListDetails.bookListName, bookIds,addToBookListId, listId);
      }
      else
      {
        postBooksToList(editedName, bookIds,addToBookListId, listId);
      }
      
    }

 
    return<>
        <div>
          <div>
        
            {
              !bookListDetails ? null:
              <div>
            
                <Paper className={classes.paper} elevation={0}>
                <Grid container wrap="nowrap" spacing={2} alignItems="center" justify="center">
                
                    <Avatar className={classes.indigo}>
                      <LibraryBooksTwoToneIcon
                        style={{
                          backgroundColor: indigo[500],
                          color: indigo[50],
                        }}
                      />
                    </Avatar>
                    <Typography variant="h4" component="h4" noWrap>
                      {bookListDetails.editedName || bookListDetails.bookListName}
                    </Typography>
                
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
   
                        if(userListDetails.id !== listId){
                          return (
                              <div> 
                              <FormControlLabel value="end" control={<Radio color="primary" value = {userListDetails.id} onChange={handleBookListChange}/>} label={`Add to ${userListDetails.listType}`}/>  
                              </div>
                              )
                            }
                            else{
                              return(<div> 
                              <FormControlLabel value="end" control={<Radio color="primary" value = {userListDetails.id} onChange={handleBookListChange}/>} label={`Remove from ${userListDetails.listType}`}/>  
                                        
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
                
                <form>
                  <Paper className={classes.fabRoot}  elevation={0}>
                  <Input
                    id="standard-basic"
                    placeholder="edit list name"
                    value={editedName}
                    onChange={handleEditListName}
                    
                    endAdornment={
                      <InputAdornment position="end">
                        <EditIcon style={{ color: indigo[500] }} />
                      </InputAdornment>
                    }
                  />
                  
                  <Fab
                    type = "submit"
                    variant="extended"
                    style={{ backgroundColor: indigo[500], color: "white" }}
                    onClick = {handleSubmit}
                  >
                    <SaveIcon
                      className={classes.extendedIcon}
                      style={{ color: "white" }}
                    />
                    Save Changes
                  </Fab>
                </Paper>
                <Grid container spacing={2} justify="flex-start" alignItems="flex-start" direction = "row">
                
                  
                    {booksInList.map((book, j) =>
                      
                        <Grid item sm={4}>
                        <Card className = {classes.bookContainer}variant="outlined">
                                                    
                        <FormControlLabel value="end" control={
                              <Checkbox onChange={handleValueChange} color="primary" value = {book.id}  data-item = {j} 
                              inputProps={{ 'aria-label': 'secondary checkbox' }} />}/>  
                          <span><SingleBookDisplay key = {j}  userId = {bookListDetails.userId} id = {book.id} inList = {bookListDetails.listType} genres = {book.genres} title = {book.title} authors = {book.authors} pages = {book.pages} blurb = {book.blurb}/></span>
                        </Card>
                        </Grid>
                        
                      )}
                      
                  
                </Grid>
              
              </form>
            
                
              </div>
            }
            
            </div>

          
        </div>
        </>
    
    
}
