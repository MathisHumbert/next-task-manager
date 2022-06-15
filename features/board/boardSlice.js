import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  board: [],
};

export const boardSlice = createSlice({
  name: 'adverts',
  initialState,
  reducers: {},
});

export const {} = boardSlice.actions;
export default boardSlice.reducer;
