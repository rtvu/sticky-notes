import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

import { DraggableInfo } from "../../components/Draggable";
import { EditorProps } from "../../components/Editor";
import { DEFAULT_NOTE_HEIGHT, DEFAULT_NOTE_WIDTH, DEFAULT_WINDOW_HEIGHT, DEFAULT_WINDOW_WIDTH } from "../../constants";

export type Note = DraggableInfo & EditorProps;

const initialState: Note[] = [];

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNewNote: (
      notes,
      action: PayloadAction<{ scale: number; windowWidth: number | null; windowHeight: number | null }>,
    ) => {
      const { scale, windowWidth, windowHeight } = action.payload;

      const width = DEFAULT_NOTE_WIDTH;
      const height = DEFAULT_NOTE_HEIGHT;
      const x = Math.round(((windowWidth ?? DEFAULT_WINDOW_WIDTH) - (width * scale) / 100) / 2);
      const y = Math.round(((windowHeight ?? DEFAULT_WINDOW_HEIGHT) - (height * scale) / 100) / 2);

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
        title: "",
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
    setNoteContent: (notes, action: PayloadAction<{ id: string; content: string }>) => {
      const { id, content } = action.payload;

      const note = notes.find((note) => note.id === id);
      if (note !== undefined) {
        note.content = content;
      }
    },
    setNoteTitle: (notes, action: PayloadAction<{ id: string; title: string }>) => {
      const { id, title } = action.payload;

      const note = notes.find((note) => note.id === id);
      if (note !== undefined) {
        note.title = title;
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
    updateNoteScale: (
      notes,
      action: PayloadAction<{ oldScale: number; newScale: number; centerX: number; centerY: number }>,
    ) => {
      const { oldScale, newScale, centerX, centerY } = action.payload;

      console.log({ oldScale, newScale, centerX, centerY });
      console.log({ ...notes[0].size });
      console.log({ ...notes[0].position });

      notes.map((note) => {
        note.position.x = Math.round((note.position.x - centerX) * (newScale / oldScale) + centerX);
        note.position.y = Math.round((note.position.y - centerY) * (newScale / oldScale) + centerY);
      });

      console.log({ ...notes[0].position });
    },
  },
});

export const { addNewNote, moveNoteToLastIndex, setNoteContent, setNoteTitle, updateNotePosition, updateNoteScale } =
  notesSlice.actions;
export const notesReducer = notesSlice.reducer;
