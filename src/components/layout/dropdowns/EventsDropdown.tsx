"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaInfo, FaQuestion, FaPhone, FaList } from "react-icons/fa";
import { IoReaderOutline } from "react-icons/io5";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { NavLink } from "../../utilities/NavLink";
import { PiPresentationChartFill } from "react-icons/pi";
import Dropdown from "rc-dropdown";
import Menu, { Item as MenuItem, Divider } from "rc-menu";
import "rc-dropdown/assets/index.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const menu = (
  <div className="bg-[#0D0D0D] rounded-[10px] w-[536px] p-5 hidden lg:flex flex-col gap-4  z-[100] shadow-lg relative top-[20px]">
    <div className="flex gap-3 h-[90%]">
      <div className="flex-[0.35] relative">
        <img
          src="/img/nav-img3.png"
          alt=""
          className="flex-[0.35] rounded-[10px] w-full object-cover"
        />
        <div className="absolute bottom-2 left-1 text-white flex flex-col gap-1">
          <span className="text-[10px] font-light">Tech Series</span>
          <span className="font-bold">Landing a Job  in UK/US/ Canada</span>
        </div>
      </div>
      <div className="flex-[0.65]">
        <div className="flex flex-col text-[14px]">
          <NavLink
            to="/events"
            className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-4 rounded-lg"
          >
            <FaList color="" />
            <div className="flex flex-col ">
              <span className="text-[13px]">Past Events</span>
              <span className="text-[11px] font-light">
                Join the waitlist for the biggest Data Conference
              </span>
            </div>
          </NavLink>

          <NavLink
            to="/free-masterclass"
            className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-4 rounded-lg"
          >
            <FaList color="" />
            <div className="flex flex-col ">
              <span className="text-[13px]">Free Masterclass</span>
              <span className="text-[11px] font-light">
                Register for our free masterclass
              </span>
            </div>
          </NavLink>

          <NavLink
            to="/virtual-taster"
            className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-4 rounded-lg"
          >
            <PiPresentationChartFill size={19} />
            <div className="flex flex-col ">
              <span className="text-[13px]">Virtual Taster</span>
              <span className="text-[11px] font-light">
                Watch all past episodes of our masterclass
              </span>
            </div>{" "}
          </NavLink>

          <NavLink
            to="/techxplore"
            className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-4 rounded-lg"
          >
            <PiPresentationChartFill size={19} />
            <div className="flex flex-col ">
              <span className="text-[13px]">TechXplore</span>
              <span className="text-[11px] font-light">
                Watch all past episodes of our Tech Series
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

const EventsDropdown = () => {
  let activeNav = {
    color: "#E7077D",
    backgroundColor: "#FFDEEF",
  };
  const [openEventsDropdown, setOpenEventsDropdown] = useState(false);

  function onVisibleChange(visible: boolean) {
    setOpenEventsDropdown(visible);
  }
  return (
    <Dropdown
      trigger={["hover"]}
      overlay={menu}
      animation="slide-up"
      onVisibleChange={onVisibleChange}
      // overlayClassName={"absolute top-[180%]"}
    >
      <div className="flex items-center gap-2 cursor-pointer relative">
        <button>Events</button>
        {openEventsDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
    </Dropdown>
  );
};
export default EventsDropdown;
