import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { notesReducer } from "./notes/notesSlice";

const rootReducer = combineReducers({
  notes: notesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
