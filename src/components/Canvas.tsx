import {
  DndContext,
  MouseSensor as DndMouseSensor,
  DragEndEvent,
  DragStartEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useWindowSize } from "@uidotdev/usehooks";
import { Fragment, MouseEvent } from "react";

import { useAppDispatch, useAppSelector } from "../state/hooks";
import { addNewNote, moveNoteToLastIndex, updateNotePosition } from "../state/notes/notesSlice";
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
          if (currentElement.dataset.disableDnd !== undefined) {
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
  const scale = 1;

  const windowSize = useWindowSize();

  const mouseSensor = useSensor(MouseSensor);
  const sensors = useSensors(mouseSensor);

  const onAddNewNote = () => {
    dispatch(addNewNote({ scale, windowSize }));
  };

  const onMoveNoteToLastIndex = ({ active }: DragStartEvent) => {
    dispatch(moveNoteToLastIndex(active.id as string));
  };

  const onUpdateNotePosition = ({ delta, active }: DragEndEvent) => {
    dispatch(updateNotePosition({ id: active.id as string, delta }));
  };

  return (
    <Fragment>
      <div className="fixed bottom-[20px] z-1 flex w-screen">
        <button className="btn btn-circle mx-auto h-[32px] w-[32px]" onClick={onAddNewNote}>
          <PlusIcon />
        </button>
      </div>
      <div className="fixed h-screen w-screen overflow-hidden">
        <DndContext onDragStart={onMoveNoteToLastIndex} onDragEnd={onUpdateNotePosition} sensors={sensors}>
          {notes.map((note) => {
            return (
              <Draggable id={note.id} key={note.id} position={note.position} scale={scale} size={note.size}>
                <Editor title={note.title} content={note.content} />
              </Draggable>
            );
          })}
        </DndContext>
      </div>
    </Fragment>
  );
}
