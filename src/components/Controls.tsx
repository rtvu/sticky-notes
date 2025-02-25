import { NewNote } from "./NewNote";
import { Zoom } from "./Zoom";

export function Controls() {
  return (
    <div className="fixed bottom-[20px] flex w-full">
      <div className="my-auto mr-auto">
        <Zoom />
      </div>
      <div className="mx-auto">
        <NewNote />
      </div>
      <div className="mx-auto"></div>
    </div>
  );
}
