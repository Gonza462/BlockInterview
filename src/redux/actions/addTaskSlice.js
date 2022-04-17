import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

export const addTaskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state) => {
      state.task, initialState;
    },
  },
});

export const { addTask } = addTaskSlice.actions;
export default addTaskSlice.reducer;
