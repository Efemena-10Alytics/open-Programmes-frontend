import Link from "next/link";
import React, { useState } from "react";
import { FaInfo, FaQuestion, FaPhone, FaList } from "react-icons/fa";
import { IoReaderOutline } from "react-icons/io5";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { NavLink } from "../../utilities/NavLink";
import { PiPresentationChartFill } from "react-icons/pi";
import Dropdown from "rc-dropdown";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const menu = (
  <div className="bg-[#0D0D0D] rounded-[10px] w-[536px] p-5 hidden lg:flex flex-col gap-4 relative top-[20px]  z-[100] shadow-lg">
    <div className="flex gap-3 h-[90%]">
      <div className="flex-[0.35] relative">
        <img
          src="/img/nav-img2.png"
          alt=""
          className="flex-[0.35] rounded-[10px] w-full object-cover"
        />
        <div className="absolute bottom-5 left-1 text-white flex flex-col gap-1">
          <span className="text-[10px] font-light">Free Crash Course</span>
          <span className="font-bold">How To Get Started In Data Science</span>
        </div>
      </div>
      <div className="flex-[0.65]">
        <div className="flex flex-col text-[14px]">
          <NavLink
            href="/courses"
            exact={true}
            className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-4 rounded-lg"
          >
            <FaList color="" />
            <div className="flex flex-col ">
              <span className="text-[13px]">All Courses</span>
              <span className="text-[11px] font-light">
                Access all courses offered by nebiant analytics here
              </span>
            </div>
          </NavLink>

          <NavLink
            href="/courses/clycxjlec00015a7iycm2cbdn"
            className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-4 rounded-lg"
          >
            <FaList color="" />
            <div className="flex flex-col ">
              <span className="text-[13px]">Data Analytics</span>
              <span className="text-[11px] font-light">
                Kickstart your Data Analytics Journey here
              </span>
            </div>
          </NavLink>

          <NavLink
            href="/courses/clycxjxdz00025a7isah5z5yb"
            exact={true}
            className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-4 rounded-lg"
          >
            <PiPresentationChartFill size={19} />
            <div className="flex flex-col ">
              <span className="text-[13px]">Data Science</span>
              <span className="text-[11px] font-light">
                Find out all you need about our Data Science Course here{" "}
              </span>
            </div>{" "}
          </NavLink>

          <NavLink
            href="/courses/clycxiomd00005a7ifv6t8r5o"
            exact={true}
            className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-4 rounded-lg"
          >
            <img src="/svg/chart.svg" />
            <div className="flex flex-col ">
              <span className="text-[13px]">Business Analysis</span>
              <span className="text-[11px] font-light">
                Learn about our Business Analysis program and duration here{" "}
              </span>
            </div>{" "}
          </NavLink>
        </div>
      </div>
    </div>
    <div className="flex gap-3 bg-[#2F2F2F]  text-white p-4 rounded-lg justify-center">
      <FaPhone />
      <Link href="/contact" className="text-[12px] uupercase">
        Contact customer support
      </Link>{" "}
    </div>
  </div>
);

const CoursesDropdown = () => {
  const [openCoursesDropdown, setOpenCoursesDropdown] = useState(false);
  function onVisibleChange(visible: boolean) {
    setOpenCoursesDropdown(visible);
  }
  let activeNav = {
    color: "#E7077D",
    backgroundColor: "#FFDEEF",
  };

  return (
    <Dropdown
      trigger={["hover"]}
      overlay={menu}
      animation="slide-up"
      onVisibleChange={onVisibleChange}
      // overlayClassName={"absolute top-[180%]"}
    >
      <div className="flex items-center gap-2 cursor-pointer relative">
        <button>Course Catalogue</button>
        {openCoursesDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
    </Dropdown>
  );
};
export default CoursesDropdown;
