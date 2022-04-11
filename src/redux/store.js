import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

export default configureStore({
  // redux store is a single state tree that holds all the application state and is updated by actions that are dispatched from todoSlice.
  // todoSlice is a reducer that is used to update the state tree.
  // the most important thing to remember about the store is that it is a single state tree. a single state tree means that the state tree is a single object that holds all the application state.
  reducer: {
    todos: todoReducer,
  },
});
