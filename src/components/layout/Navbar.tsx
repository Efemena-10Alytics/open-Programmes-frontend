import Button from "../utilities/Button";
import Link from "next/link";
import CoursesDropdown from "./dropdowns/CoursesDropdown";
import ResourcesDropdown from "./dropdowns/ResourcesDropdown";
import EventsDropdown from "./dropdowns/EventsDropdown";
import CompanyDropdown from "./dropdowns/CompanyDropdown";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import MobileDropdown from "./dropdowns/MobileDropdown";
import { useAuth } from "../../contexts/AuthContext";
import Image from "next/image"; // Use Next.js Image component for optimization

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useAuth();
  
  return (
    <>
      {/* DESKTOP */}
      <header className="hidden lg:flex h-[144px] items-center justify-between w-11/12 mx-auto">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/img/mixedLogo.png"
            alt="Logo"
            width={0}
            height={48}
            sizes="100vw"
            className="h-12 sm:h-14 md:h-12 w-auto"
            style={{ width: 'auto' }}
          />
        </Link>
        <nav className="bg-[#FFEFEF] w-[647px] rounded-[10px] py-4 px-6">
          <ul className="flex justify-between items-center">
            <li className="cursor-pointer">
              <CoursesDropdown />
            </li>
            <li className="cursor-pointer">
              <ResourcesDropdown />
            </li>
            <li className="cursor-pointer">
              <EventsDropdown />
            </li>
            <li className="cursor-pointer">
              <CompanyDropdown />
            </li>
          </ul>
        </nav>

        {user ? (
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-[#454545] text-[14px] font-bold underline"
            >
              Go To Dashboard
            </Link>
            <Image 
              src="/img/dp2.png" 
              alt="User profile" 
              width={48}
              height={48}
              className="h-12 w-12 rounded-full"
            />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/login">Sign In</Link>
            <Link href="/signup">
              <Button text="Get Started" />
            </Link>
          </div>
        )}
      </header>

      {/* MOBILE */}
      <header className="lg:hidden w-11/12 mx-auto mb-7 flex items-center justify-between">
        {isDropdownOpen ? (
          <MobileDropdown
            isOpen={isDropdownOpen}
            setIsOpen={setIsDropdownOpen}
          />
        ) : (
          <>
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/img/mixedLogo.png"
                alt="Logo"
                width={0}
                height={48}
                sizes="100vw"
                className="h-12 sm:h-14 md:h-12 w-auto"
                style={{ width: 'auto' }}
              />
            </Link>

            <RxHamburgerMenu
              className="text-[25px] mt-3 cursor-pointer"
              onClick={() => setIsDropdownOpen(true)}
            />
          </>
        )}
      </header>
    </>
  );
};

export default Navbar;