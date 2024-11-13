import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  id?: number;
  name?: string;
  username: string;
  email: string;
  phone?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  token?: string;
} = {
  username: '',
  email: '',
  password: '',
};

const authConfigSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogin(state, action) {
      return { ...state, ...action.payload };
    },
    emptyState() {
      return initialState;
    },
  },
});

export const { userLogin, emptyState } = authConfigSlice.actions;

export default authConfigSlice.reducer;
