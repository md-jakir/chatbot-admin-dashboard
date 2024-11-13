import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  isSidebarOpen: boolean;
} = {
  isSidebarOpen: false,
};

const sidebarSlice = createSlice({
  name: 'sidebarContext',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    closeSidebar(state) {
      state.isSidebarOpen = false;
    },
  },
});

export const { toggleSidebar, closeSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
