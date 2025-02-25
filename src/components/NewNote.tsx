import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { useWindowSize } from "@uidotdev/usehooks";

import { useAppDispatch } from "../state/hooks";
import { addNewNote } from "../state/notes/notesSlice";

export function NewNote() {
  const dispatch = useAppDispatch();
  const scale = 1;

  const windowSize = useWindowSize();

  const onAddNewNote = () => {
    dispatch(addNewNote({ scale, windowSize }));
  };

  return (
    <button className="btn btn-square mx-[20px] h-[60px] w-[60px]" onClick={onAddNewNote}>
      <DocumentPlusIcon className="h-[42px]" />
    </button>
  );
}
