import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  isUpdate: boolean;
} = {
  isUpdate: false,
};

const updateSlice = createSlice({
  name: 'updateContext',
  initialState,
  reducers: {
    toggleUpdate(state) {
      state.isUpdate = !state.isUpdate;
    },
  },
});

export const { toggleUpdate } = updateSlice.actions;

export default updateSlice.reducer;
