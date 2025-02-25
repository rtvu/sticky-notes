import {
  DndContext,
  MouseSensor as DndMouseSensor,
  DragEndEvent,
  DragStartEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { MouseEvent } from "react";

import { useAppDispatch, useAppSelector } from "../state/hooks";
import { moveNoteToLastIndex, updateNotePosition } from "../state/notes/notesSlice";
import { Draggable } from "./Draggable";
import { Editor } from "./Editor";

class MouseSensor extends DndMouseSensor {
  static activators = [
    {
      eventName: "onMouseDown" as const,
      handler: ({ nativeEvent: event }: MouseEvent) => {
        if (event.button === 2) {
          return false;
        }

        let currentElement: HTMLElement | null = event.target as HTMLElement;

        while (currentElement !== null) {
          if (currentElement.dataset.dndDisable === "true") {
            return false;
          }

          if (currentElement.dataset.dndDisableOnDoubleClick === "true" && event.detail === 2) {
            return false;
          }

          currentElement = currentElement.parentElement;
        }

        return true;
      },
    },
  ];
}

export function Canvas() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes);

  const mouseSensor = useSensor(MouseSensor);
  const sensors = useSensors(mouseSensor);

  const onMoveNoteToLastIndex = ({ active }: DragStartEvent) => {
    dispatch(moveNoteToLastIndex(active.id as string));
  };

  const onUpdateNotePosition = ({ delta, active }: DragEndEvent) => {
    dispatch(updateNotePosition({ id: active.id as string, delta }));
  };

  return (
    <div className="fixed h-screen w-screen overflow-hidden">
      <DndContext onDragStart={onMoveNoteToLastIndex} onDragEnd={onUpdateNotePosition} sensors={sensors}>
        {notes.map((note) => {
          return (
            <Draggable id={note.id} key={note.id} position={note.position} size={note.size}>
              <Editor id={note.id} title={note.title} content={note.content} />
            </Draggable>
          );
        })}
      </DndContext>
    </div>
  );
}
