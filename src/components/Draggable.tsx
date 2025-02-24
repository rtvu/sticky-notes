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
  scale: number;
  children: ReactNode;
};

export function Draggable({ children, id, position, scale, size }: DraggableProps) {
  const { listeners, setNodeRef, transform } = useDraggable({ id });

  const style: CSSProperties = {
    position: "absolute",
    top: `${position.y}px`,
    left: `${position.x}px`,
    width: `${size.width}px`,
    height: `${size.height}px`,
  };

  if (transform === null) {
    style.transform = `scale(${scale})`;
  } else {
    style.transform = `${CSS.Translate.toString(transform)} scale(${scale})`;
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners}>
      {children}
    </div>
  );
}
