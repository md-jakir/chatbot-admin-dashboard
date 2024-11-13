/* eslint-disable no-unused-expressions */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  isAddOrUpdateModalOpen: boolean;
  isDeleteModalOpen: boolean;
  id: string | null;
} = {
  isAddOrUpdateModalOpen: false,
  isDeleteModalOpen: false,
  id: null,
};

const modalSlice = createSlice({
  name: 'modalContext',
  initialState,
  reducers: {
    openModal(
      state,
      action: PayloadAction<{ type: string; id: string | null }>,
    ) {
      action.payload.type === 'addOrUpdate' &&
        (state.isAddOrUpdateModalOpen = true);
      action.payload.type === 'delete' && (state.isDeleteModalOpen = true);
      state.id = action.payload.id;
    },
    closeModal(state) {
      state.isAddOrUpdateModalOpen = false;
      state.isDeleteModalOpen = false;
      state.id = null;
    },
    toggleModal(state, action: PayloadAction<string | null>) {
      state.isAddOrUpdateModalOpen = !state.isAddOrUpdateModalOpen;
      state.isDeleteModalOpen = !state.isDeleteModalOpen;
      state.id = action.payload;
    },
  },
});

export const { openModal, closeModal, toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
