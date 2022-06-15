import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAddNewBoardOpen: false,
  isAddNewTaskOpen: false,
  isEditBoardOpen: false,
  isDeleteBoardOpen: false,
  isDeleteTaskOpen: false,
};

export const modalSlice = createSlice({
  name: 'adverts',
  initialState,
  reducers: {
    toggleNewBoard: (state) => {
      state.isAddNewBoardOpen = !state.isAddNewBoardOpen;
    },
    toggleNewTask: (state) => {
      state.isAddNewTaskOpen = !state.isAddNewTaskOpen;
    },
    toggleEditBoard: (state) => {
      state.isEditBoardOpen = !state.isEditBoardOpen;
    },
    toggleDeleteBoard: (state) => {
      state.isDeleteBoardOpen = !state.isDeleteBoardOpen;
    },
    toggleDeleteTask: (state) => {
      state.isDeleteTaskOpen = !state.isDeleteTaskOpen;
    },
  },
});

export const {
  toggleNewBoard,
  toggleNewTask,
  toggleEditBoard,
  toggleDeleteBoard,
  toggleDeleteTask,
} = modalSlice.actions;
export default modalSlice.reducer;
