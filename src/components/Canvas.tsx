import {
  DndContext,
  MouseSensor as DndMouseSensor,
  DragEndEvent,
  DragStartEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { MouseEvent as ReactMouseEvent, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../state/hooks";
import { moveNoteToLastIndex, updateNotePosition } from "../state/notes/notesSlice";
import { Draggable } from "./Draggable";
import { Editor } from "./Editor";

type Pan = "DISABLED" | "ENABLED" | "ACTIVE";
const cursor: Record<Pan, "" | "cursor-grab" | "cursor-grabbing"> = {
  DISABLED: "",
  ENABLED: "cursor-grab",
  ACTIVE: "cursor-grabbing",
};

class MouseSensor extends DndMouseSensor {
  static activators = [
    {
      eventName: "onMouseDown" as const,
      handler: ({ nativeEvent: event }: ReactMouseEvent) => {
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
  const scale = useAppSelector((state) => state.settings.scale);

  const mouseSensor = useSensor(MouseSensor);
  const sensors = useSensors(mouseSensor);

  const [isSpaceKeyDown, setIsSpaceKeyDown] = useState(false);
  const [isMainMouseButtonDown, setIsMainMouseButtonDown] = useState(false);

  let pan = "DISABLED";
  if (isSpaceKeyDown) {
    if (isMainMouseButtonDown) {
      pan = "ACTIVE";
    } else {
      pan = "ENABLED";
    }
  }

  const onMoveNoteToLastIndex = ({ active }: DragStartEvent) => {
    dispatch(moveNoteToLastIndex(active.id as string));
  };

  const onUpdateNotePosition = ({ delta, active }: DragEndEvent) => {
    dispatch(updateNotePosition({ id: active.id as string, delta }));
  };

  useEffect(() => {
    const spaceKeyDownHandler = (event: KeyboardEvent) => {
      if (event.code === "Space" && !isSpaceKeyDown) {
        setIsSpaceKeyDown(true);
      }
    };

    const spaceKeyUpHandler = (event: KeyboardEvent) => {
      if (event.code === "Space" && isSpaceKeyDown) {
        setIsSpaceKeyDown(false);
      }
    };

    const mainMouseDownHandler = (event: MouseEvent) => {
      console.log("begin down", event);
      if (event.button === 0 && !isMainMouseButtonDown) {
        console.log("down");
        setIsMainMouseButtonDown(true);
      }
    };

    const mainMouseUpHandler = (event: MouseEvent) => {
      if (event.button === 0 && isMainMouseButtonDown) {
        setIsMainMouseButtonDown(false);
      }
    };

    window.addEventListener("keydown", spaceKeyDownHandler);
    window.addEventListener("keyup", spaceKeyUpHandler);
    window.addEventListener("mousedown", mainMouseDownHandler);
    window.addEventListener("mouseup", mainMouseUpHandler);

    return () => {
      window.removeEventListener("keydown", spaceKeyDownHandler);
      window.removeEventListener("keyup", spaceKeyUpHandler);
      window.removeEventListener("mousedown", mainMouseDownHandler);
      window.removeEventListener("mouseup", mainMouseUpHandler);
    };
  }, [isSpaceKeyDown, setIsSpaceKeyDown, isMainMouseButtonDown, setIsMainMouseButtonDown]);

  return (
    <div className={`fixed h-screen w-screen overflow-hidden ${cursor[pan]}`}>
      <DndContext onDragStart={onMoveNoteToLastIndex} onDragEnd={onUpdateNotePosition} sensors={sensors}>
        {notes.map((note) => {
          return (
            <Draggable id={note.id} key={note.id} position={note.position} scale={scale} size={note.size}>
              <Editor id={note.id} title={note.title} content={note.content} />
            </Draggable>
          );
        })}
      </DndContext>
    </div>
  );
}
