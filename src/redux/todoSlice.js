import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// The todoSlice is a reducer that is used to update the state tree.
// Redux Toolkit uses Immer under the hood to maintain the immutability of the state tree.
// what is redux slice? https://redux-toolkit.js.org/api/createSlice
// as per the documentation, createSlice is a function that accepts an initial state, an obect of reducers, and an object of extra options.
//

export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async () => {
    const response = await fetch('http://localhost:7000/todos');
    if (response.ok) {
      const todos = await response.json();
      return { todos };
    }
    throw new Error('Failed to fetch todos');
  }
);

export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (payload) => {
    const response = await fetch('http://localhost:7000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: payload.title }),
    });
    if (response.ok) {
      const todo = await response.json();
      return { todo };
    }
    throw new Error('Failed to add todo');
  }
);

export const toggleTodoAsync = createAsyncThunk(
  'todos/toggleTodoAsync',
  async (payload) => {
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: payload.completed }),
    });
    if (response.ok) {
      const todo = await response.json();
      return { todo };
    }
    throw new Error('Failed to toggle todo');
  }
);

export const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    // state is the current state, action is the action that is being dispatched which includes the title
    // when the action is dispatched, the reducer is called with the current state and the action
    addTodo: (state, action) => {
      const todo = {
        id: new Date(),
        title: action.payload.title,
        completed: false,
      };
      state.push(todo);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getTodosAsync.fulfilled]: (state, action) => {
      return action.payload.todos;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      const todo = action.payload.todo;
      state.push(todo);
    },
    [toggleTodoAsync.fulfilled]: (state, action) => {
      const todo = action.payload.todo;
      const index = state.findIndex((t) => t.id === todo.id);
      state[index] = todo;
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
