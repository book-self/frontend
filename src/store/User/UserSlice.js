import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const signIn = createAsyncThunk(
  'user/signIn',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(process.env.REACT_APP_API_URL+'/v1/auth/signin', {}, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Basic '+btoa(username+":"+password)
        }
      });
      if (res.status === 200) {
        localStorage.setItem('token', btoa(username+":"+password));
        return res.data
      } else {
        localStorage.removeItem('token');
        return rejectWithValue(res.data);
      }
    } catch (e) {
      localStorage.removeItem('token');
      return rejectWithValue(e.response);
    }
  }
);

export const signUp = createAsyncThunk(
  'user/signUp',
  async ({ email, username, password }, { rejectWithValue }) => {
    try {
      const json = JSON.stringify({ email, username, password });
      const res = await axios.post(process.env.REACT_APP_API_URL+'/v1/users/new-user', json, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      if (res.status === 200) {
        const res = await axios.post(process.env.REACT_APP_API_URL+'/v1/auth/signin', {}, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Basic '+btoa(username+":"+password)
          }
        });
        if (res.status === 200) {
          localStorage.setItem('token', btoa(username+":"+password));
          return res.data
        } else {
          localStorage.removeItem('token');
          return rejectWithValue(res.data);
        }
      } else {
        return rejectWithValue(res.data);
      }
    } catch (e) {
      return rejectWithValue(e.response);
    }
  }
);

export const signOut = createAsyncThunk(
  'user/signOut',
  async (rejectWithValue) => {
    try {
      const res = await axios.post(process.env.REACT_APP_API_URL+'/v1/auth/signout', {}, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      if (res.status === 204) {
        localStorage.removeItem('token');
        return res.data
      } else {
        return rejectWithValue(res.data);
      }
    } catch (e) {
      return rejectWithValue(e.response);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',

  initialState: {
    id: null,
    username: null,
    email: null,
    created: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
    error: null
  },

  reducers: {
    updateUser: (state, payload) => {
      state.id = payload.id;
      state.email = payload.email;
      state.username = payload.username;
      state.created = payload.created;
      return state;
    },

    clearUser: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state, { payload }) => {
        state.isFetching = true;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.id = payload.id;
        state.email = payload.email;
        state.username = payload.username;
        state.created = payload.created;
        state.isFetching = false;
        state.isSuccess = true;
        state.error = null;
        return state;
      })
      .addCase(signIn.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.error = payload;
      })

      .addCase(signUp.pending, (state, { payload }) => {
        state.isFetching = true;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.id = payload.id;
        state.email = payload.email;
        state.username = payload.username;
        state.created = payload.created;
        state.isFetching = false;
        state.isSuccess = true;
        state.error = null;
        return state;
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.error = payload;
      })

      .addCase(signOut.pending, (state, { payload }) => {
        state.isFetching = true;
      })
      .addCase(signOut.fulfilled, (state, { payload }) => {
        state.id = null;
        state.email = null;
        state.username = null;
        state.created = null;
        state.isFetching = false;
        state.isSuccess = true;
        state.error = null;
        return state;
      })
      .addCase(signOut.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.error = payload;
      })
  },
});

export const { updateUser, clearUser } = userSlice.actions;
export const selectUser = (state) => state.user;

export default userSlice.reducer;
