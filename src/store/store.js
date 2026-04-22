import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './boardSlice';

const store = configureStore({
  reducer: {
    board: boardReducer,
  },
});

store.subscribe(() => {
  const state = store.getState().board;
  localStorage.setItem('kanban-state', JSON.stringify(state));
});

export default store;