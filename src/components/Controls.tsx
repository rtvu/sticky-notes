import { NewNote } from "./NewNote";
import { Transform } from "./Transform";

export function Controls() {
  return (
    <div className="fixed bottom-[20px] flex w-full">
      <div className="my-auto ml-[20px] w-1/2">
        <Transform />
      </div>
      <div className="mx-[20px]">
        <NewNote />
      </div>
      <div className="w-1/2"></div>
    </div>
  );
}
