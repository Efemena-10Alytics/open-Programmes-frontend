import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { NavLink } from "../../utilities/NavLink";
import Logout from "../Logout";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "../../10alytics"

interface DashboardSidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  closeSidebar: () => void;
}

const DashboardSidebar = ({
  isMobile,
  isOpen,
  closeSidebar,
}: DashboardSidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the sidebar to close it on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobile &&
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, isOpen, closeSidebar]);

  const sidebarItems = [
    { to: "/dashboard", icon: "/svg/dots.svg", text: "Dashboard" },
    {
      to: "/dashboard/catalog",
      icon: "/svg/clock2.svg",
      text: "Course Catalog",
    },
    { to: "/dashboard/lessons", icon: "/svg/tv2.svg", text: "Lesson Videos" },
    {
      to: "/dashboard/timetable",
      icon: "/svg/alarm.svg",
      text: "Class Timetable",
    },
    {
      to: "/dashboard/certifications",
      icon: "/svg/certificate3.svg",
      text: "My Certificate",
    },
    {
      to: "/dashboard/help-center",
      icon: "/svg/help.svg",
      text: "Help Centre",
    },
    { to: "/dashboard/settings", icon: "/svg/gear.svg", text: "Settings" },
  ];

  // Desktop version with hover effect
  if (!isMobile) {
    return (
      <div
        className={`bg-white p-4 rounded-t-[10px] transition-all duration-300 h-full ${isExpanded ? "w-[180px]" : "w-[70px]"
          }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="flex text-[#D9D9D9] text-lg mb-2">
          {isExpanded ? (
            <FaArrowLeft className="" />
          ) : (
            <FaArrowRight className="relative left-2" />
          )}
        </div>

        <ul className="text-[#6D6D6D] text-[13px]">
          {sidebarItems.map((item, index) => (
            <li
              key={index}
              className={
                index === 5 ? "border-t border-[#E3E3E3] mt-5 pt-4" : ""
              }
            >
              <NavLink
                to={item.to}
                exact={true}
                className={`flex items-center gap-2 py-3 ${isExpanded ? "" : "justify-center"
                  }`}
                activeClassName={`font-semibold text-primary bg-[#7C3AED0A] rounded-full ${isExpanded ? "pl-2" : ""
                  }`}
              >
                <img src={item.icon} alt="" className="w-5 h-5" />
                {isExpanded && <span>{item.text}</span>}
              </NavLink>
            </li>
          ))}
        </ul>

        {isExpanded && <Logout />}
      </div>
    );
  }

  // Mobile version with slide-in effect
  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 z-40 h-full bg-white p-4 shadow-lg transition-all duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      style={{ width: "240px" }}
    >
      <div className="flex justify-between items-center mb-6">
        <Link href="/dashboard">
          <Logo />
        </Link>
        <FaTimes className="text-xl cursor-pointer" onClick={closeSidebar} />
      </div>

      <ul className="text-[#6D6D6D] text-[14px]">
        {sidebarItems.map((item, index) => (
          <li
            key={index}
            className={index === 5 ? "border-t border-[#E3E3E3] mt-5 pt-4" : ""}
          >
            <NavLink
              to={item.to}
              exact={true}
              className="flex items-center gap-3 py-4"
              activeClassName="font-semibold text-primary bg-[#7C3AED0A] rounded-full pl-2"
              onClick={closeSidebar}
            >
              <img src={item.icon} alt="" className="w-5 h-5" />
              <span>{item.text}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <Logout />
      </div>
    </div>
  );
};

export default DashboardSidebar;
