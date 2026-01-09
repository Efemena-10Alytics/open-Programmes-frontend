import { ExternalLink } from "lucide-react";
import React from "react";

const TechElevatorWebinar = () => {
  const handleEnrollNow = () => {
    window.open(
      "https://paystack.com/buy/nebiant-analytics-tech-elevator",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.8),transparent_50%)]"></div>
      
      {/* Navigation with Logo */}
      <nav className="relative flex justify-between items-center z-50 w-full py-4 px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2">
          <img
            src="/img/mixedLogo.png"
            alt="Nebiant Logo"
            className="h-8 md:h-10 w-auto rounded-lg shadow-lg"
          />
        </a>
      </nav>

      {/* Video Container */}
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-40 p-4 pt-20">
        <div className="relative max-w-4xl w-full">
          <div className="aspect-video bg-black rounded-xl flex items-center justify-center shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/AKmJw_w7di0?si=vRCmkuOFntsk4CwA"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full rounded-xl"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleEnrollNow}
          className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-4 rounded-2xl font-bold text-sm md:text-base transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-red-500/25 flex items-center gap-3 justify-center backdrop-blur-sm border border-red-500/20 animate-pulse hover:animate-none"
        >
          <span className="uppercase tracking-wide">PAY NOW</span>
          <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Optional: Mobile bottom CTA for better mobile experience */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-gradient-to-t from-black/90 to-transparent p-4">
          <button
            onClick={handleEnrollNow}
            className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 w-full py-4 rounded-xl font-bold text-base transition-all duration-300 shadow-2xl flex items-center gap-3 justify-center"
          >
            <span className="uppercase tracking-wide">PAY NOW</span>
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechElevatorWebinar;