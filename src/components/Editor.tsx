import { ChangeEvent, MouseEvent, useState } from "react";

import { useAppDispatch } from "../state/hooks";
import { setNoteContent, setNoteTitle } from "../state/notes/notesSlice";

export type EditorProps = {
  id: string;
  title: string;
  content: string;
};

export function Editor({ id, title, content }: EditorProps) {
  const dispatch = useAppDispatch();

  const [isTitleSelected, setIsTitleSelected] = useState(false);
  const [isContentSelected, setIsContentSelected] = useState(false);

  const onTitleSet = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setNoteTitle({ id, title: event.target.value }));
  };

  const onContentSet = (event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setNoteContent({ id, content: event.target.value }));
  };

  const onTitleSelect = (event: MouseEvent) => {
    if (event.detail == 2) {
      setIsTitleSelected(true);
    }
  };

  const onTitleUnselect = () => {
    setIsTitleSelected(false);
  };

  const onContentSelect = (event: MouseEvent) => {
    if (event.detail == 2) {
      setIsContentSelected(true);
    }
  };

  const onContentUnselect = () => {
    setIsContentSelected(false);
  };

  return (
    <div className="join join-vertical h-full w-full">
      <input
        data-dnd-disable-on-double-click
        data-dnd-disable={isTitleSelected}
        type="text"
        className={`input join-item border-base-content bg-base-300 border px-3 py-2 text-base ${!isTitleSelected ? "focus:outline-none" : ""}`}
        placeholder="New Title"
        value={title}
        onMouseDown={onTitleSelect}
        onBlur={onTitleUnselect}
        onChange={onTitleSet}
      />
      <textarea
        data-dnd-disable-on-double-click
        data-dnd-disable={isContentSelected}
        className={`textarea border-base-content bg-base-300 join-item h-full w-full border text-base ${!isContentSelected ? "focus:outline-none" : ""}`}
        placeholder="New Note"
        value={content}
        onMouseDown={onContentSelect}
        onBlur={onContentUnselect}
        onChange={onContentSet}
      />
    </div>
  );
}
