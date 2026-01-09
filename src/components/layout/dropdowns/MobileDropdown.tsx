"use client";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { NavLink } from "../../utilities/NavLink";
import { FaList } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";
import { useAuth } from "../../../contexts/AuthContext";
import Button from "../../utilities/Button";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const MobileDropdown = ({ isOpen, setIsOpen }: Props) => {
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 bg-[#0D0D0D] w-full h-full flex flex-col gap-10 overflow-y-scroll text-white z-[100]  p-8">
          <div className="flex justify-between itens-center">
            {user && (
              <Link href="#" className="flex items-center gap-3">
                <img
                  src="/img/dp2.png"
                  alt=""
                  className="h-12 w-12 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold">Jane Doe</span>
                  <span className="text-[10px] font-light">User</span>
                </div>
              </Link>
            )}

            <IoCloseOutline
              size={24}
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* Courses */}
          <div>
            <div
              className="flex justify-between items-center text-md"
              onClick={() => setIsCoursesOpen(!isCoursesOpen)}
            >
              <span>Course Catalogue</span>
              <span className="text-[22px]">
                {isCoursesOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
              </span>
            </div>
            {isCoursesOpen && (
              <div>
                <ul>
                  <li>
                    <NavLink
                      onClick={() => setIsOpen(false)}
                      to="/courses"
                      exact={true}
                      className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-2 rounded-lg"
                    >
                      <FaList color="" />
                      <div className="flex flex-col ">
                        <span className="text-[13px]">Courses</span>
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => setIsOpen(false)}
                      to="/courses/clycxjlec00015a7iycm2cbdn"
                      exact={true}
                      className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-2 rounded-lg"
                    >
                      <FaList color="" />
                      <div className="flex flex-col ">
                        <span className="text-[13px]">Data Analytics</span>
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => setIsOpen(false)}
                      to="/courses/clycxjxdz00025a7isah5z5yb"
                      exact={true}
                      className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-2 rounded-lg"
                    >
                      <FaList color="" />
                      <div className="flex flex-col ">
                        <span className="text-[13px]">Data Science </span>
                      </div>
                    </NavLink>
                  </li>{" "}
                  <li>
                    <NavLink
                      onClick={() => setIsOpen(false)}
                      to="/courses/clycxiomd00005a7ifv6t8r5o"
                      exact={true}
                      className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-2 rounded-lg"
                    >
                      <FaList color="" />
                      <div className="flex flex-col ">
                        <span className="text-[13px]">Business Analysis</span>
                      </div>
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* Resources */}
          <div>
            <div
              className="flex justify-between items-center text-md"
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
            >
              <span>Resources</span>
              <span className="text-[22px]">
                {isResourcesOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
              </span>
            </div>
            {isResourcesOpen && (
              <div>
                <ul>
                  <li>
                    <NavLink
                      onClick={() => setIsOpen(false)}
                      to="/blog"
                      className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-2 rounded-lg"
                    >
                      <FaList color="" />
                      <div className="flex flex-col ">
                        <span className="text-[13px]">Blog Articles</span>
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => setIsOpen(false)}
                      to="/tech-guides"
                      className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-2 rounded-lg"
                    >
                      <FaList color="" />
                      <div className="flex flex-col ">
                        <span className="text-[13px]">Tech Guides</span>
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => setIsOpen(false)}
                      to="/case-studies"
                      className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-2 rounded-lg"
                    >
                      <FaList color="" />
                      <div className="flex flex-col ">
                        <span className="text-[13px]">Case Studies</span>
                      </div>
                    </NavLink>
                  </li>{" "}
                  <li>
                    <NavLink
                      onClick={() => setIsOpen(false)}
                      to="/podcasts"
                      className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-2 rounded-lg"
                    >
                      <FaList color="" />
                      <div className="flex flex-col ">
                        <span className="text-[13px]">Podcasts</span>
                      </div>
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* Events */}
          <div>
            <div
              className="flex justify-between items-center text-md"
              onClick={() => setIsEventsOpen(!isEventsOpen)}
            >
              <span>Events</span>
              <span className="text-[22px]">
                {isEventsOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
              </span>
            </div>
            {isEventsOpen && (
              <div>
                <ul>
                  <li>
                    <NavLink
                      onClick={() => setIsOpen(false)}
                      to="/events"
                      className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-2 rounded-lg"
                    >
                      <FaList color="" />
                      <div className="flex flex-col ">
                        <span className="text-[13px]">Past Events</span>
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => setIsOpen(false)}
                      to="/free-masterclass"
                      className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-2 rounded-lg"
                    >
                      <FaList color="" />
                      <div className="flex flex-col ">
                        <span className="text-[13px]">Free Masterclass</span>
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => setIsOpen(false)}
                      to="/virtual-taster"
                      className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-2 rounded-lg"
                    >
                      <FaList color="" />
                      <div className="flex flex-col ">
                        <span className="text-[13px]">Virtual Taster</span>
                      </div>
                    </NavLink>
                  </li>{" "}
                  <li>
                    <NavLink
                      onClick={() => setIsOpen(false)}
                      to="/techxplore"
                      className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-2 rounded-lg"
                    >
                      <FaList color="" />
                      <div className="flex flex-col ">
                        <span className="text-[13px]">TechXplore</span>
                      </div>
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* Company */}
          <div>
            <div
              className="flex justify-between items-center text-md"
              onClick={() => setIsCompanyOpen(!isCompanyOpen)}
            >
              <span>Company</span>
              <span className="text-[22px]">
                {isCompanyOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
              </span>
            </div>
            {isCompanyOpen && (
              <div>
                <ul>
                  <li>
                    <NavLink
                      onClick={() => setIsOpen(false)}
                      to="/about"
                      className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-2 rounded-lg"
                    >
                      <FaList color="" />
                      <div className="flex flex-col ">
                        <span className="text-[13px]">About</span>
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => setIsOpen(false)}
                      to="/faqs"
                      className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-2 rounded-lg"
                    >
                      <FaList color="" />
                      <div className="flex flex-col ">
                        <span className="text-[13px]">FAQs</span>
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => setIsOpen(false)}
                      to="/contact"
                      className="text-[#828282] flex items-center gap-4 w-full hover:bg-[#FFFFFF24] hover:text-[#FFFFFF] px-2 py-2 rounded-lg"
                    >
                      <FaList color="" />
                      <div className="flex flex-col ">
                        <span className="text-[13px]">Contact</span>
                      </div>
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Auth */}
          {!user ? (
            <div className="flex flex-col gap-4">
              <Link href="/login">Sign In</Link>
              <Link href="/signup">
                <button className="bg-primary rounded-[10px] text-sm lg:text-[16px] text-white p-3">
                  Get Started
                </button>
              </Link>
            </div>
          ) : (
            <Link onClick={logout} href="/login">
              Logout
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default MobileDropdown;
