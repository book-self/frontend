import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

  const bookStatus = {
    READ: "Read",
    READING: "Currently Reading",
    DNF: "Did Not Finish",
    TOREAD: "To Be Read"
}
const initialState = {
    userId: '',
    userBookStatus: bookStatus.TOREAD,
    dummyValue: 0, 
}

export const singleBookDisplaySlice = createSlice({
    name: 'singelbookdisplay',
    initialState,
    bookStatus,

    reducers:{
        changeBookStatus:(state, action) =>{
            console.log(action.payload)
            const bookStatusKey = Object.keys(bookStatus).find(key => bookStatus[key] === action.payload);
            state.userBookStatus = bookStatus[bookStatusKey];
            //state.userBookStatus += 1;
        },
    },
    


})

export const {changeBookStatus} = singleBookDisplaySlice.actions;

export const selectSingleBookStatus = (state) => state.singlebookdisplay.userBookStatus;
export const bookStatusOptions = (state) => state.singlebookdisplay.bookStatus;

export default singleBookDisplaySlice.reducer;