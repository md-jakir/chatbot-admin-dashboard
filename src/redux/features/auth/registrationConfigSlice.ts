import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  gender?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  profileName?: string;
  category?: string;
  designation?: string;
  degree?: string;
  specialization?: string;
  bmdcRegNo?: string;
  institution?: string;
  address?: string;
  city?: string;
  country?: string;
  zipCode?: string;
  profileDescription?: string;
} = {
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  password: undefined,
  gender: undefined,
  phoneNumber: undefined,
  dateOfBirth: undefined,
  profileName: undefined,
  category: undefined,
  designation: undefined,
  degree: undefined,
  specialization: undefined,
  bmdcRegNo: undefined,
  institution: undefined,
  address: undefined,
  city: undefined,
  country: undefined,
  zipCode: undefined,
  profileDescription: undefined,
};

const registrationConfigSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
    emptyState() {
      return initialState;
    },
  },
});

export const { updateState, emptyState } = registrationConfigSlice.actions;

export default registrationConfigSlice.reducer;
