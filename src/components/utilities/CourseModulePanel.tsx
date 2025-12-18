import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import CourseItem from "./CourseItem";
import CourseModuleModel from "../../models/CourseModule";

interface Props {
  module: CourseModuleModel;
}

const CourseModulePanel = ({ module }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className="flex justify-between items-center px-3 py-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-1 flex-grow min-w-0">
          <img src="svg/module.svg" alt="" className="flex-shrink-0" />
          <span className="break-words">{module.title}</span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="font-semibold whitespace-nowrap">
            {/* (0 Lessons) */}
          </span>
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      {isOpen && (
        <div className="bg-[#F9FAFB] p-2">
          <div className="bg-white flex flex-col gap-3 px-3 py-2">
            {module.projectVideos.map((video, i) => {
              return (
                <CourseItem
                  title={video.title}
                  duration={video.duration}
                  key={i}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseModulePanel;
