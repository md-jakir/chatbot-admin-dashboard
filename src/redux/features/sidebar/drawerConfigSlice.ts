import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  isDrawerOpen: boolean;
  id: string | null;
} = {
  isDrawerOpen: false,
  id: null,
};

const drawerSlice = createSlice({
  name: 'drawerContext',
  initialState,
  reducers: {
    openDrawer(state, action: PayloadAction<string>) {
      state.isDrawerOpen = true;
      state.id = action.payload;
    },
    closeDrawer(state) {
      state.isDrawerOpen = false;
      state.id = null;
    },
    toggleDrawer(state, action: PayloadAction<string | null>) {
      state.isDrawerOpen = !state.isDrawerOpen;
      if (!state.isDrawerOpen) state.id = action.payload;
      else state.id = null;
    },
  },
});

export const { openDrawer, closeDrawer, toggleDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
