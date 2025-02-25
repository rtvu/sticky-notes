import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { notesReducer } from "./notes/notesSlice";
import { originReducer } from "./origin/originSlice";

const rootReducer = combineReducers({
  notes: notesReducer,
  origin: originReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
