import Link from "next/link";
import { useState } from "react";
import { FaPhone, FaList } from "react-icons/fa";
import { NavLink } from "../../utilities/NavLink";
import { PiPresentationChartFill } from "react-icons/pi";
import Dropdown from "rc-dropdown";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const menu = (
  <div className="bg-[#0D0D0D] rounded-[10px] w-[323px] p-5 hidden lg:flex flex-col absolute top-[180%]  z-[100] shadow-lg">
    <div className="flex gap-3 h-[90">
      <div className="">
        <div className="flex flex-col text-[14px]">
          <NavLink
            href="/about"
            className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-4 rounded-lg"
          >
            <FaList color="" />
            <div className="flex flex-col ">
              <span className="text-[13px]">About Us</span>
              <span className="text-[11px] font-light">
                Join the waitlist for the biggest Data Conference
              </span>
            </div>
          </NavLink>

          <NavLink
            href="/faqs"
            className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-4 rounded-lg"
          >
            <FaList color="" />
            <div className="flex flex-col ">
              <span className="text-[13px]">FAQs</span>
              <span className="text-[11px] font-light">
                Join the waitlist for the biggest AI Conference
              </span>
            </div>
          </NavLink>
          <NavLink
            href="/contact"
            className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-4 rounded-lg"
          >
            <PiPresentationChartFill size={19} />
            <div className="flex flex-col">
              <span className="text-[13px]">Contact Us</span>
              <span className="text-[11px] font-light">
                Watch all past episodes of our masterclass
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
    <div className="flex gap-3 bg-[#2F2F2F]  text-white p-4 rounded-lg justify-center mt-3">
      <FaPhone />
      <Link href="/contact" className="text-[12px] uupercase">
        Contact customer support
      </Link>{" "}
    </div>
  </div>
);

const CompanyDropdown = () => {
  const [openCompanyDropdown, setOpenCompanyDropdown] = useState(false);

  let activeNav = {
    color: "#E7077D",
    backgroundColor: "#FFDEEF",
  };

  function onVisibleChange(visible: boolean) {
    setOpenCompanyDropdown(visible);
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
        <button>Company</button>
        {openCompanyDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
    </Dropdown>
  );
};
export default CompanyDropdown;
