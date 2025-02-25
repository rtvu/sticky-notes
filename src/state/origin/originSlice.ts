import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  DEFAULT_ORIGIN_LEFT,
  DEFAULT_ORIGIN_SCALE,
  DEFAULT_ORIGIN_TOP,
  DEFAULT_WINDOW_HEIGHT,
  DEFAULT_WINDOW_WIDTH,
  MAXIMUM_SCALE,
  MINIMUM_SCALE,
} from "../../constants";

export type Origin = {
  top: number;
  left: number;
  scale: number;
};

const initialState: Origin = {
  top: DEFAULT_ORIGIN_TOP,
  left: DEFAULT_ORIGIN_LEFT,
  scale: DEFAULT_ORIGIN_SCALE,
};

const originSlice = createSlice({
  name: "origin",
  initialState,
  reducers: {
    setOriginScale: (
      origin,
      action: PayloadAction<{ scale: number; fixedPoint: { x: number | null; y: number | null } }>,
    ) => {
      return getNewOrigin(
        { ...origin },
        action.payload.scale,
        action.payload.fixedPoint.x,
        action.payload.fixedPoint.y,
      );
    },
    resetOriginScale: (origin, action: PayloadAction<{ x: number | null; y: number | null }>) => {
      return getNewOrigin({ ...origin }, DEFAULT_ORIGIN_SCALE, action.payload.x, action.payload.y);
    },
  },
});

function getNewOrigin(origin: Origin, scale: number, x: number | null, y: number | null): Origin {
  scale = Math.max(scale, MINIMUM_SCALE);
  scale = Math.min(scale, MAXIMUM_SCALE);

  x = x ?? DEFAULT_WINDOW_WIDTH / 2;
  y = y ?? DEFAULT_WINDOW_HEIGHT / 2;

  const left = Math.round((origin.left - x) * (scale / origin.scale) + x);
  const top = Math.round((origin.top - y) * (scale / origin.scale) + y);

  return { top, left, scale };
}

export const { setOriginScale, resetOriginScale } = originSlice.actions;
export const originReducer = originSlice.reducer;
