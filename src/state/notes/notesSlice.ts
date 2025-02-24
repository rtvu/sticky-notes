import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

import { DraggableInfo } from "../../components/Draggable";
import { EditorProps } from "../../components/Editor";

export type Note = DraggableInfo & EditorProps;

const DEFAULT_NOTE_WIDTH = 300;
const DEFAULT_NOTE_HEIGHT = 400;
const DEFAULT_WINDOW_WIDTH = 800;
const DEFAULT_WINDOW_HEIGHT = 600;

const initialState: Note[] = [];

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNewNote: (
      notes,
      action: PayloadAction<{ scale: number; windowSize: { width: number | null; height: number | null } }>,
    ) => {
      const {
        scale,
        windowSize: { width: windowWidth, height: windowHeight },
      } = action.payload;

      const width = Math.round(DEFAULT_NOTE_WIDTH * scale);
      const height = Math.round(DEFAULT_NOTE_HEIGHT * scale);
      const x = Math.round(((windowWidth ?? DEFAULT_WINDOW_WIDTH) - width) / 2);
      const y = Math.round(((windowHeight ?? DEFAULT_WINDOW_HEIGHT) - height) / 2);

      notes.push({
        id: uuid(),
        position: {
          x: x,
          y: y,
        },
        size: {
          width: width,
          height: height,
        },
        title: "Title",
        content: "",
      });
    },
    moveNoteToLastIndex: (notes, action: PayloadAction<string>) => {
      const id = action.payload;

      const noteIndex = notes.findIndex((note) => note.id === id);
      if (noteIndex >= 0) {
        const note = notes[noteIndex];
        notes.splice(noteIndex, 1);
        notes.push(note);
      }
    },
    updateNotePosition: (notes, action: PayloadAction<{ id: string; delta: { x: number; y: number } }>) => {
      const {
        id,
        delta: { x, y },
      } = action.payload;

      const note = notes.find((note) => note.id === id);
      if (note !== undefined) {
        note.position = {
          x: note.position.x + x,
          y: note.position.y + y,
        };
      }
    },
  },
});

export const { addNewNote, moveNoteToLastIndex, updateNotePosition } = notesSlice.actions;
export const notesReducer = notesSlice.reducer;
