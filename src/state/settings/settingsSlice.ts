import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DEFAULT_SCALE, DEFAULT_THEME } from "../../constants";

export type Theme = "light" | "dark";

export type Settings = {
  scale: number;
  theme: Theme;
};

const initialState: Settings = {
  scale: DEFAULT_SCALE,
  theme: DEFAULT_THEME,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setScale: (settings, action: PayloadAction<number>) => {
      settings.scale = action.payload;
    },
    setTheme: (settings, action: PayloadAction<Theme>) => {
      settings.theme = action.payload;
    },
  },
});

export const { setScale, setTheme } = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
