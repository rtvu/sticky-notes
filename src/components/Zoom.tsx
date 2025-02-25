import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useWindowSize } from "@uidotdev/usehooks";

import { DEFAULT_ORIGIN_SCALE, MAXIMUM_SCALE, MINIMUM_SCALE, SCALE_INCREMENT } from "../constants";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { resetOriginScale, setOriginScale } from "../state/origin/originSlice";

export function Zoom() {
  const dispatch = useAppDispatch();
  const scale = useAppSelector((state) => state.origin.scale);

  const windowSize = useWindowSize();
  const fixedPoint = {
    x: windowSize.width !== null ? windowSize.width / 2 : null,
    y: windowSize.height !== null ? windowSize.height / 2 : null,
  };

  const onDecreaseScale = () => {
    dispatch(setOriginScale({ scale: scale - SCALE_INCREMENT, fixedPoint }));
  };

  const onIncreaseScale = () => {
    dispatch(setOriginScale({ scale: scale + SCALE_INCREMENT, fixedPoint }));
  };

  const onResetScale = () => {
    dispatch(resetOriginScale(fixedPoint));
  };

  return (
    <div className="join pl-[20px]">
      <button
        className="join-item btn btn-square h-[32px] w-[32px]"
        onClick={onDecreaseScale}
        disabled={scale === MINIMUM_SCALE}
      >
        <MinusIcon className="h-[20px]" />
      </button>
      <button
        className={`join-item btn btn-square h-[32px] w-[60px] ${scale === DEFAULT_ORIGIN_SCALE ? "pointer-events-none" : ""}`}
        onClick={onResetScale}
      >
        {scale}%
      </button>
      <button
        className="join-item btn btn-square h-[32px] w-[32px]"
        onClick={onIncreaseScale}
        disabled={scale === MAXIMUM_SCALE}
      >
        <PlusIcon className="h-[20px]" />
      </button>
    </div>
  );
}
