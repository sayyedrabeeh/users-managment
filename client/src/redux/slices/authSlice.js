import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');
const refresh = localStorage.getItem('refresh');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: user || null,
    token: token || null,
    refresh: refresh || null,
    isAuthenticated: !!token
  },
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refresh = action.payload.refresh;
      state.isAuthenticated = true;

      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('refresh', action.payload.refresh);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refresh = null;
      state.isAuthenticated = false;
      localStorage.clear();
    },
    updateUser: (state, action) => {
    state.user = action.payload;
    localStorage.setItem('user', JSON.stringify(action.payload));
  }
  }
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
