import { NewNote } from "./NewNote";

export function Controls() {
  return (
    <div className="fixed bottom-[20px] flex w-full">
      <div className="mx-auto"></div>
      <div className="mx-auto">
        <NewNote />
      </div>
      <div className="mx-auto"></div>
    </div>
  );
}
