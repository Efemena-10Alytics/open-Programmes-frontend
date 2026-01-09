"use client";
import Link from "next/link";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const FlashBanner = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      {isOpen && (
        <div className="h-[83px] flash-banner-gradient text-white flex items-center">
          <div className="w-11/12 mx-auto flex gap-3 lg:gap-0 justify-between items-center">
            <img
              src="/svg/trophy.svg"
              alt=""
              className="hidden lg:inline-block"
            />
            <span className="font-semibold text-xs lg:text-[24px] lg:text-left">
              {/* Learn a Skill Employers are Hiring for. Get 22% off all Courses
              TODAY!!! */}
              Become a tech giant. Register for the free event now.
            </span>
            <Link
              href="/events"
              // href="/signup"
              className="bg-[#FA5252] text-center text-[10px] min-w-[100px] lg:text-[16px] rounded-[24px] py-2 px-2 lg:px-5"
            >
              {/* Enroll Now */}
              Register now
            </Link>
            <IoCloseOutline
              size={24}
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FlashBanner;
