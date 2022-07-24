import classNames from "classnames";
import { usePromiseTracker } from "react-promise-tracker";

type PaginationControlsProps = {
  currentCount: number;
  maxCount: number;
  onClick: () => void;
};

export const PaginationControls = ({
  currentCount,
  maxCount,
  onClick,
}: PaginationControlsProps) => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    <div className="max-w-screen-sm mx-auto grid grid-cols-1 gap-2 mt-4">
      {currentCount < maxCount && (
        <a
          className={classNames("btn", promiseInProgress && "loading")}
          onClick={onClick}
        >
          Load more
        </a>
      )}
      <progress
        className="progress w-56 mt-4"
        value={currentCount}
        max={maxCount}
      ></progress>
      <p className="text-xs text-center">
        <span className="font-bold">{currentCount}</span> of{" "}
        <span className="font-bold">{maxCount}</span>
      </p>
    </div>
  );
};

export default PaginationControls;
