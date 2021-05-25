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


export const BookLists = () =>{
  const classes = useStyles();

  const [bookDetails, setBookDetails] = useState(null);
  const [booksInList, setBooksInList] = useState(null);
  const [allUserBookLists, setAllUserBookLists] = useState(null);
  const [selecteBooks, setSelectedBooks] = useState([]);
  const [editedName, setEditedName] = useState("");

  let { id } = useParams();
  
  const handleEditListName = (event) => {
    setEditedName(event.target.value);
  }
    
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
      else
      {
        addToBookListId = id;
      }
      if(editedName == null || editedName === "")
      {
        
        postBooksToList(bookDetails.bookListName, bookIds,addToBookListId, id);
      }
      else
      {
        postBooksToList(editedName, bookIds,addToBookListId, id);
      }
      
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
                <form>
                <Grid container spacing={2} justify="flex-start" alignItems="flex-start" direction = "row">
                
                  
                    {booksInList.map((book, j) =>
                      
                        <Grid item sm={6}>
                        <Card variant="outlined">                          
                        <FormControlLabel value="end" control={
                              <Checkbox onChange={handleValueChange} color="primary" value = {book.id}  data-item = {j} 
                              inputProps={{ 'aria-label': 'secondary checkbox' }} />}/>  
                          <span><SingleBookDisplay key = {j}  userId = {bookDetails.userId} id = {book.id} inList = {bookDetails.listType} genres = {book.genres} title = {book.title} authors = {book.authors} pages = {book.pages} blurb = {book.blurb}/></span>
                        </Card>
                        </Grid>

                      )}
                      
                  
                </Grid>
                <button onClick = {handleSubmit}>Submit Edits</button>
              
              </form>
                
              </div>
            }
            
            </div>

          <Paper>
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

          
        </div>
        </>
    
    
}
