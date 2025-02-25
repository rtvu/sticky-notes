import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark";

export type Settings = {
  theme: Theme;
};

const initialState: Settings = {
  theme: "light",
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
