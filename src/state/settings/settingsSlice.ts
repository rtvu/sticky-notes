import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DEFAULT_THEME } from "../../constants";

export type Theme = "light" | "dark";

export type Settings = {
  theme: Theme;
};

const initialState: Settings = {
  theme: DEFAULT_THEME,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme: (settings, action: PayloadAction<Theme>) => {
      settings.theme = action.payload;
    },
  },
});

export const { setTheme } = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
