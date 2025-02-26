import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useWindowSize } from "@uidotdev/usehooks";

import {
  DEFAULT_SCALE,
  DEFAULT_WINDOW_HEIGHT,
  DEFAULT_WINDOW_WIDTH,
  MAXIMUM_SCALE,
  MINIMUM_SCALE,
  SCALE_INCREMENT,
} from "../constants";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { updateNoteScale } from "../state/notes/notesSlice";
import { setScale } from "../state/settings/settingsSlice";

export function Transform() {
  const dispatch = useAppDispatch();
  const scale = useAppSelector((state) => state.settings.scale);

  const windowSize = useWindowSize();
  const windowCenter = {
    x: (windowSize.width ?? DEFAULT_WINDOW_WIDTH) / 2,
    y: (windowSize.height ?? DEFAULT_WINDOW_HEIGHT) / 2,
  };

  const onDecreaseScale = () => {
    const newScale = Math.max(scale - SCALE_INCREMENT, MINIMUM_SCALE);
    dispatch(setScale(newScale));
    dispatch(updateNoteScale({ oldScale: scale, newScale, centerX: windowCenter.x, centerY: windowCenter.y }));
  };

  const onResetScale = () => {
    const newScale = DEFAULT_SCALE;
    dispatch(setScale(newScale));
    dispatch(updateNoteScale({ oldScale: scale, newScale, centerX: windowCenter.x, centerY: windowCenter.y }));
  };

  const onIncreaseScale = () => {
    const newScale = Math.min(scale + SCALE_INCREMENT, MAXIMUM_SCALE);
    dispatch(setScale(newScale));
    dispatch(updateNoteScale({ oldScale: scale, newScale, centerX: windowCenter.x, centerY: windowCenter.y }));
  };

  return (
    <div className="join">
      <button className="join-item btn btn-square h-[32px] w-[32px]" onClick={onDecreaseScale}>
        <MinusIcon className="h-[20px]" />
      </button>
      <button className="join-item btn btn-square h-[32px] w-[60px]" onClick={onResetScale}>
        {scale}%
      </button>
      <button className="join-item btn btn-square h-[32px] w-[32px]" onClick={onIncreaseScale}>
        <PlusIcon className="h-[20px]" />
      </button>
    </div>
  );
}
