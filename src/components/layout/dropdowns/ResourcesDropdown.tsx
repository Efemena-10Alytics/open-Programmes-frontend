"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaInfo, FaQuestion, FaPhone, FaList } from "react-icons/fa";
import { NavLink } from "../../utilities/NavLink";
import { PiPresentationChartFill } from "react-icons/pi";
import Dropdown from "rc-dropdown";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const menu = (
  <div className="bg-[#0D0D0D] rounded-[10px] w-[536px] p-5 hidden lg:flex flex-col  relative top-[20px]  z-[100] shadow-lg">
    <div className="flex gap-3 h-[90%]">
      <div className="flex-[0.35] relative">
        <img
          src="/img/nav-img1.png"
          alt=""
          className="flex-[0.35] rounded-[10px] w-full object-cover"
        />
        <div className="absolute bottom-8 left-1 text-white flex flex-col gap-1">
          <span className="text-[10px] font-light">Tech Guides</span>
          <span className="font-bold">
            Getting Started in Business  Analysis
          </span>
        </div>
      </div>
      <div className="flex-[0.65]">
        <div className="flex flex-col text-[14px]">
          <NavLink
            to="/blog"
            className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-4 rounded-lg"
          >
            <FaList color="" />
            <div className="flex flex-col ">
              <span className="text-[13px]">Blog Articles</span>
              <span className="text-[11px] font-light">
                Read articles that will help you gain the right knowledge
              </span>
            </div>
          </NavLink>

          <NavLink
            to="/tech-guides"
            className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-4 rounded-lg"
          >
            <FaList color="" />
            <div className="flex flex-col ">
              <span className="text-[13px]">Tech Guides</span>
              <span className="text-[11px] font-light">
                Get cheat-sheets and tool-kits on how to get started in Tech
              </span>
            </div>
          </NavLink>

          <NavLink
            to="/case-studies"
            className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-4 rounded-lg"
          >
            <PiPresentationChartFill size={19} />
            <div className="flex flex-col ">
              <span className="text-[13px]">Case Studies</span>
              <span className="text-[11px] font-light">
                Access free datasets and materials for your projects
              </span>
            </div>{" "}
          </NavLink>

          <NavLink
            to="/podcasts"
            className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-4 rounded-lg"
          >
            <PiPresentationChartFill size={19} />
            <div className="flex flex-col ">
              <span className="text-[13px]">Podcast</span>
              <span className="text-[11px] font-light">
                Listen to industry leaders converse about data trends{" "}
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

const ResourcesDropdown = () => {
  const [openResourcesDropdown, setOpenResourcesDropdown] = useState(false);

  function onVisibleChange(visible: boolean) {
    setOpenResourcesDropdown(visible);
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
        <button>Resources</button>
        {openResourcesDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
    </Dropdown>
  );
};
export default ResourcesDropdown;
