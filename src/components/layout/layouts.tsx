import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FlashBanner from "./FlashBanner";
import DashboardNavbar from "../dashboard/layout/DashboardNavbar";
import DashboardSidebar from "../dashboard/layout/DashboardSidebar";
import { useState, useEffect } from "react";
import MotivationCard from "../MotivationCard";
import { useProgressTracking } from "../../contexts/ProgressTrackingContext";

export const Layout1 = () => {
  const { setShowMotivationCard } = useProgressTracking();

  const triggerMotivationCard = () => {
    setShowMotivationCard(true);
  };

  return (
    <div className="layout-1 relative">
      {/* <FlashBanner /> */}
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />

      {/* Manual trigger button for testing */}
      {/*
      <button
        onClick={triggerMotivationCard}
        className="fixed bottom-4 left-4 z-50 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-200"
      >
        Show Reminder
      </button>
      */}

      {/* MotivationCard for public pages */}
      <div className="fixed z-50">
        <MotivationCard layoutType="public" />
      </div>
    </div>
  );
};

export const DashboardLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { showMotivationCard, setShowMotivationCard } = useProgressTracking();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const triggerMotivationCard = () => {
    setShowMotivationCard(true);
  };

  // Handle body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobile, sidebarOpen]);

  return (
    <div className="bg-[#F4F4F4] min-h-screen flex flex-col relative">
      <DashboardNavbar toggleSidebar={toggleSidebar} />

      {/* Overlay when mobile sidebar is open */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <section className="flex flex-1 relative">
        <DashboardSidebar
          isMobile={isMobile}
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />
        <div
          className={`flex-1 mx-[10px] sm:mx-[15px] md:mx-[20px] lg:mx-[30px] transition-all duration-300 ${
            isMobile && sidebarOpen ? "opacity-50" : "opacity-100"
          }`}
        >
          <Outlet />
        </div>
      </section>

      {/* Manual trigger button for testing */}
     {/*
      <button
        onClick={triggerMotivationCard}
        className="fixed bottom-4 left-4 z-50 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-200"
      >
        Show Reminder
      </button>
      */}

      {/* MotivationCard for dashboard pages */}
      <div className="fixed z-50">
        <MotivationCard layoutType="dashboard" />
      </div>
    </div>
  );
};
