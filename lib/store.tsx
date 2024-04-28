import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const initialState = {
  todos: [],
};

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';

export const addTodo = (id: string, name: string, state: string) => ({
  type: ADD_TODO,
  payload: {
    id,
    name,
    state,
  },
});

export const removeTodo = (id: string) => ({
  type: REMOVE_TODO,
  payload: {
    id,
  },
});

const reducer = (state: any = initialState, action: any): any => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, { id: action.payload.id, name: action.payload.name, state: action.payload.state }],
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo: any) => todo.id !== action.payload.id),
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
