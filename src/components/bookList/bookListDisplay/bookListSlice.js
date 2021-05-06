import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

  const bookStatus = {
    READ: "Read",
    READING: "Currently Reading",
    DNF: "Did Not Finish",
    TOREAD: "To Be Read"
}
const initialState = [
    {"bookID": 112233, "bookName": "Homo Deus", "bookAuthor": "Yuval Noah Harari", "booksPages": 123, "userBookStatus": bookStatus.TOREAD},
    {"bookID": 445566, "bookName": "Bad Blood", "bookAuthor": "John Carreyrou", "booksPages": 234, "userBookStatus": bookStatus.TOREAD}
];

const userState = {
    userId: '',
}


export const bookListSlice = createSlice({
    name: 'bookList',
    initialState,
    bookStatus,


    reducers:{
        bookListTest:(state = initialState, action) =>{
            return state;
        },

        changeBookStatus:(state = initialState, action) =>{
            const affectedBook = action.payload[0];
            const newBookStatus = action.payload[1];
            const bookStatusKey = Object.keys(bookStatus).find(key => bookStatus[key] === newBookStatus);
            
            switch(action.type){
                case("bookList/changeBookStatus"):
                    return state.map(book =>{
                        if(book.bookID == affectedBook.bookID){
                            return{
                                ...book,
                                userBookStatus:bookStatus[bookStatusKey]
                            };
                        };
                        return book;
                    });
                default:
                    return state; 
            }
            
        },
    },
})



export const {changeBookStatus} = bookListSlice.actions;

export const selectSingleBookStatus = (state) => state.booklistdisplay.userBookStatus;
export const bookStatusOptions = (state) => state.booklistdisplay.bookStatus;

export default bookListSlice.reducer;