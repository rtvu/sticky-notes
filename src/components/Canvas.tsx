import { DndContext, MouseSensor as DndMouseSensor, DragEndEvent, useSensor, useSensors } from "@dnd-kit/core";
import { MouseEvent, useState } from "react";

import { Draggable, DraggableInfo } from "./Draggable";
import { Editor, EditorProps } from "./Editor";

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
  const scale = 1;

  const [notes, setNotes] = useState<(DraggableInfo & EditorProps)[]>([
    {
      id: "0",
      position: {
        x: 150,
        y: 150,
      },
      size: {
        width: 400,
        height: 400,
      },
      zIndex: 1,
      title: "Title",
      content: "",
    },
  ]);

  const mouseSensor = useSensor(MouseSensor);
  const sensors = useSensors(mouseSensor);

  const updateNotePosition = ({ delta, active }: DragEndEvent) => {
    setNotes((notes) => {
      return notes.map((note) => {
        if (note.id === active.id) {
          return {
            ...note,
            position: {
              x: note.position.x + delta.x,
              y: note.position.y + delta.y,
            },
          };
        }

        return note;
      });
    });
  };

  return (
    <div className="fixed h-screen w-screen overflow-hidden">
      <DndContext onDragEnd={updateNotePosition} sensors={sensors}>
        {notes.map((note) => {
          return (
            <Draggable
              id={note.id}
              key={note.id}
              position={note.position}
              scale={scale}
              size={note.size}
              zIndex={note.zIndex}
            >
              <Editor title={note.title} content={note.content} />
            </Draggable>
          );
        })}
      </DndContext>
    </div>
  );
}
