"use client";

import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import CourseModulePanel from "./CourseModulePanel";
import CourseWeekModel from "../../models/CourseWeek";

interface Props {
  week: CourseWeekModel;
}

const CourseWeekPanel = ({ week }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-[#DDDDDD] rounded-[10px]">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-[#FFFBFB] ${
          isOpen ? "border-b" : "border-b-0 rounded-[10px]"
        }  border-[#DDDDDD] rounded-tl-[10px] rounded-tr-[10px]  p-3
      flex justify-between items-center cursor-pointer`}
      >
        <span className="text-[#33333z3] text-[20px] font-bold">
          {week.title}
        </span>
        {isOpen ? (
          <IoIosArrowUp
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer"
          />
        ) : (
          <IoIosArrowDown
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer"
          />
        )}
      </div>
      {isOpen && (
        <>
          {week?.courseModules.map((module, i) => {
            return <CourseModulePanel module={module} key={i} />;
          })}
          {/* Replace below with CourseModule during integration */}
          {/* <div className="flex justify-between items-center px-3 py-2">
            <div className="flex items-center gap-1">
              <img src="svg/project.svg" alt="" />
              <span>Project: Case Study around Data Cleaning Functions </span>
            </div>
          </div>{" "}
          <div className="flex justify-between items-center px-3 py-2">
            <div className="flex items-center gap-1">
              <img src="svg/module.svg" alt="" />
              <span>
                Live class 1: Case Study on Data Cleaning and Data Analysis
                Toolkit{" "}
              </span>
            </div>
          </div> */}
        </>
      )}
    </div>
  );
};

export default CourseWeekPanel;
