"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useProgressTracking } from "../contexts/ProgressTrackingContext";

const messages = [
  "You're falling behind! Watch today's video to catch up.",
  "Don't fall behind! Complete this week's lessons to stay on track.",
  "Watch today's video to catch up!",
  "Consistency is key! Watch at least one video today.",
];

const MotivationCard = ({ layoutType = "dashboard" }) => {
  const pathname = usePathname();
  const {
    showMotivationCard,
    dismissMotivationCard,
    currentWeek,
    expectedWeek,
  } = useProgressTracking();
  const [message, setMessage] = useState(messages[0]);
  const [visible, setVisible] = useState(false);

  // Don't show on lesson details page
  const isLessonPage = pathname?.includes("/dashboard/lessons/");

  // Determine which layout should show the card
  const isDashboardRoute = pathname?.includes("/dashboard");
  const shouldShowCard =
    layoutType === "dashboard" ? isDashboardRoute : !isDashboardRoute;

  useEffect(() => {
    if (showMotivationCard && !isLessonPage && shouldShowCard) {
      console.log(
        "MotivationCard: Showing card for current week",
        currentWeek,
        "expected week",
        expectedWeek
      );

      // Randomize message
      const randomMessage = messages[
        Math.floor(Math.random() * messages.length)
      ]
        .replace("{current}", currentWeek.toString())
        .replace("{expected}", expectedWeek.toString());
      setMessage(randomMessage);

      // Fade in effect
      setVisible(true);

      // Auto-dismiss after 10 seconds
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(dismissMotivationCard, 500); // Wait for fade out
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [
    showMotivationCard,
    currentWeek,
    expectedWeek,
    isLessonPage,
    dismissMotivationCard,
    shouldShowCard,
  ]);

  if (!showMotivationCard || isLessonPage || !shouldShowCard) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 w-80 bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Header */}
      <div className="bg-black text-white px-4 py-3 flex justify-between items-center">
        <h3 className="font-bold text-lg text-red-500">Daily Video Reminder</h3>
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(dismissMotivationCard, 500);
          }}
          className="text-white hover:text-red-200 transition-colors duration-200 text-xl font-bold"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="p-4 bg-black">
        <p className="text-white font-bold text-base leading-relaxed">
          {message}
        </p>
      </div>

      {/* Footer accent */}
      <div className="h-1 bg-black"></div>
    </div>
  );
};

export default MotivationCard;