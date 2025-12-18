import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { useAuth } from "../../../contexts/AuthContext";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useEffect, useRef } from "react";
import { formatName } from "../../../utils/formatName";

interface DashboardNavbarProps {
  toggleSidebar: () => void;
}

const DashboardNavbar = ({ toggleSidebar }: DashboardNavbarProps) => {
  const { user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstName = formatName(user?.name)?.split(" ")[0] || "User";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-40 w-full bg-white shadow-sm">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 mx-auto flex justify-between items-center h-14 sm:h-16 md:h-20">
        {/* Left Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Hamburger Menu */}
          <button
            className="md:hidden flex items-center justify-center p-1"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <RxHamburgerMenu className="text-xl text-gray-700" />
          </button>

          {/* Logo */}
          <Link href={"/dashboard"} className="flex-shrink-0">
            <img
              src="/img/mixedLogo.png"
              alt="Dashboard Logo"
              className="h-12 sm:h-14 md:h-12 w-auto"
            />
          </Link>

          {/* Dashboard Title - Hidden on xs screens */}
          <h1 className="hidden sm:block text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl font-bold truncate">
            Your Learning Dashboard
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center">
          {/* Icons - Hidden on small screens */}
          <div className="hidden sm:flex items-center mr-2 md:mr-4">
            <button
              className="p-1.5 bg-gray-50 rounded-full hover:bg-gray-100 mr-3"
              aria-label="Toggle theme"
            >
              <img
                src="/svg/toggle.svg"
                alt="Toggle theme"
                className="h-4 w-4 md:h-5 md:w-5"
              />
            </button>
            <button
              className="p-1 relative hover:bg-gray-100 rounded-full"
              aria-label="Notifications"
            >
              <img
                src="/svg/bell.svg"
                alt="Notifications"
                className="h-4 w-4 md:h-5 md:w-5"
              />
              {/* Optional: Notification indicator */}
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* Profile Section */}
          <div className="flex items-center pl-2 sm:pl-3 md:pl-4 border-l border-gray-300">
            <span className="hidden md:inline-block text-gray-600 text-xs md:text-sm mr-2">
              Hi, {firstName}
            </span>
            <div className="relative" ref={menuRef}>
              <button
                className="flex items-center focus:outline-none"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                aria-expanded={showProfileMenu}
                aria-haspopup="true"
              >
                <img
                  src={user?.image || "/img/dp1.png"}
                  alt="Profile"
                  className="rounded-full h-7 w-7 sm:h-8 sm:w-8 object-cover"
                />
                <IoIosArrowDown
                  className={`ml-1 text-gray-600 transform transition-transform duration-200 ${
                    showProfileMenu ? "rotate-180" : ""
                  } hidden sm:block`}
                />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border border-gray-100 overflow-hidden">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-100 md:hidden">
                      <p className="text-sm font-medium text-gray-900">
                        Hi, {firstName}
                      </p>
                    </div>
                    <Link
                      href="/dashboard/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Settings
                    </Link>
                    <div className="block sm:hidden px-4 py-2 text-sm hover:bg-gray-50">
                      <button className="flex items-center text-gray-700">
                        <img
                          src="/svg/toggle.svg"
                          alt="Toggle theme"
                          className="h-4 w-4 mr-2"
                        />
                        Theme
                      </button>
                    </div>
                    <div className="block sm:hidden px-4 py-2 text-sm hover:bg-gray-50">
                      <button className="flex items-center text-gray-700">
                        <img
                          src="/svg/bell.svg"
                          alt="Notifications"
                          className="h-4 w-4 mr-2"
                        />
                        Notifications
                      </button>
                    </div>
                    <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
