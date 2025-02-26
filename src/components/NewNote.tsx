import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { useWindowSize } from "@uidotdev/usehooks";

import { useAppDispatch, useAppSelector } from "../state/hooks";
import { addNewNote } from "../state/notes/notesSlice";

export function NewNote() {
  const dispatch = useAppDispatch();
  const scale = useAppSelector((state) => state.settings.scale);

  const windowSize = useWindowSize();

  const onAddNewNote = () => {
    dispatch(addNewNote({ scale, windowWidth: windowSize.width, windowHeight: windowSize.height }));
  };

  return (
    <button className="btn btn-square h-[60px] w-[60px]" onClick={onAddNewNote}>
      <DocumentPlusIcon className="h-[42px]" />
    </button>
  );
}
