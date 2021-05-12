import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUser, createUser } from './TokenAPI';

const initialState = {
  value: null,
  status: 'idle',
};

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (payload) => {
    const response = await fetchUser(payload);
    return response;
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (payload) => {
    const response = await createUser(payload);
    return response;
  }
);

export const tokenSlice = createSlice({
  name: 'token',
  initialState,

  reducers: {
    updateToken: (state, action) => {
      state.value = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      })
      .addCase(signUp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const { updateToken } = tokenSlice.actions;
export const selectToken = (state) => state.token.value;

export default tokenSlice.reducer;
