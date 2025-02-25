import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties, ReactNode } from "react";

export type DraggableInfo = {
  id: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
};

export type DraggableProps = DraggableInfo & {
  children: ReactNode;
};

export function Draggable({ children, id, position, size }: DraggableProps) {
  const { listeners, setNodeRef, transform } = useDraggable({ id });

  const style: CSSProperties = {
    position: "absolute",
    top: `${position.y}px`,
    left: `${position.x}px`,
    width: `${size.width}px`,
    height: `${size.height}px`,
  };

  style.transform = CSS.Translate.toString(transform);

  return (
    <div ref={setNodeRef} style={style} {...listeners}>
      {children}
    </div>
  );
}
