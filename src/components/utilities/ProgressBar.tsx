import React from "react";

interface ProgressBarProps {
  progress?: number; // The progress percentage (0-100)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress = 0 }) => {
  return (
    <div className="relative w-full bg-[#D9D9D9] h-[4px] rounded-[10px]">
      <div
        className="bg-primary h-[4px] rounded-[10px] text-center text-xs font-medium leading-none text-primary-100"
        style={{ width: `${progress}%` }}
      ></div>
      {/* <span
        className="absolute top-[-6px] right-[0px] text-xs font-medium text-primary-100"
        style={{ transform: `translateX(${progress}%` }}
      >
        {progress}%
      </span> */}
    </div>
  );
};

export default ProgressBar;
