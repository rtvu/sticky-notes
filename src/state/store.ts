import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { notesReducer } from "./notes/notesSlice";
import { settingsReducer } from "./settings/settingsSlice";

const rootReducer = combineReducers({
  notes: notesReducer,
  settings: settingsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
