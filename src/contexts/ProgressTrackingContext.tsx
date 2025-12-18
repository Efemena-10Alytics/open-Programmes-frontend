import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import api from "../lib/api";
import { useQuery } from "@tanstack/react-query";

interface ProgressTrackingContextType {
  isBehind: boolean;
  currentWeek: number;
  expectedWeek: number;
  showMotivationCard: boolean;
  dismissMotivationCard: () => void;
  setShowMotivationCard: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProgressTrackingContext = createContext<ProgressTrackingContextType>({
  isBehind: false,
  currentWeek: 0,
  expectedWeek: 0,
  showMotivationCard: false,
  dismissMotivationCard: () => {},
  setShowMotivationCard: () => {},
});

export const ProgressTrackingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, userID } = useAuth();
  const [showMotivationCard, setShowMotivationCard] = useState(false);
  const [lastShown, setLastShown] = useState<Date | null>(null);

  const courseId = user?.course_purchased?.[0]?.course?.id;
  const cohortId = user?.cohorts?.[0]?.cohortId;

  // Fetch user's current progress
  const { data: currentWeekData } = useQuery({
    queryKey: ["currentWeek", userID, courseId],
    queryFn: async () => {
      if (!userID || !courseId) return null;
      const response = await api.get(
        `/api/users/${userID}/courses/${courseId}/current-week`
      );
      return response.data.data;
    },
    enabled: !!userID && !!courseId,
  });

  // Calculate expected progress based on cohort start date
  const { data: cohortData } = useQuery({
    queryKey: ["cohort", cohortId],
    queryFn: async () => {
      if (!cohortId) return null;
      const response = await api.get(`/api/cohorts/${cohortId}`);
      return response.data;
    },
    enabled: !!cohortId,
  });

  // Calculate if user is behind
  const [isBehind, setIsBehind] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [expectedWeek, setExpectedWeek] = useState(0);

  useEffect(() => {
    if (!currentWeekData || !cohortData) return;

    // Calculate expected week based on cohort start date
    const cohortStartDate = new Date(cohortData.startDate);
    console.log("Cohort start date:", cohortStartDate);

    const now = new Date();
    const weeksSinceStart =
      Math.floor(
        (now.getTime() - cohortStartDate.getTime()) / (7 * 24 * 60 * 60 * 1000)
      ) + 1;

    console.log("Calculated weeks since start:", weeksSinceStart);
    console.log("Current week from API:", currentWeekData.currentWeekNumber);
    setCurrentWeek(currentWeekData.currentWeekNumber || 0);
    setExpectedWeek(weeksSinceStart);
    setIsBehind((currentWeekData.currentWeekNumber || 0) < weeksSinceStart);

    // Show motivation card if behind and not shown in last 24 hours
    if ((currentWeekData.currentWeekNumber || 0) < weeksSinceStart) {
      const shouldShow =
        !lastShown ||
        new Date().getTime() - lastShown.getTime() > 24 * 60 * 60 * 1000;

      if (shouldShow) {
        setShowMotivationCard(true);
        setLastShown(new Date());
      }
    }
  }, [currentWeekData, cohortData, lastShown]);

  const dismissMotivationCard = () => {
    setShowMotivationCard(false);
  };

  return (
    <ProgressTrackingContext.Provider
      value={{
        isBehind,
        currentWeek,
        expectedWeek,
        showMotivationCard,
        dismissMotivationCard,
        setShowMotivationCard,
      }}
    >
      {children}
    </ProgressTrackingContext.Provider>
  );
};

export const useProgressTracking = () => useContext(ProgressTrackingContext);
