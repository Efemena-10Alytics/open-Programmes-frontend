"use client";
import { useEffect, useState } from "react";
import api from "../lib/api";

interface Session {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  sessionLink: string;
}

// Generate recurring sessions for the current week
const generateRecurringSessions = (): Session[] => {
  const sessions: Session[] = [];
  const today = new Date();
  const currentWeek = [];

  // Get all days of current week (Sunday to Saturday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    currentWeek.push(day);
  }

  let sessionId = 1;

  currentWeek.forEach((date) => {
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const dateStr = date.toISOString().split("T")[0]; // YYYY-MM-DD format

    switch (dayOfWeek) {
      case 1: // Monday
        // Virtual Taster Session 8pm
        sessions.push({
          id: sessionId.toString(),
          title: "Virtual Taster Session",
          description:
            "Join us for an introductory session to explore our programs and offerings.",
          startTime: `${dateStr}T07:31:00`,
          endTime: `${dateStr}T08:25:00`,
          sessionLink: "https://zoom.us/j/virtual-taster-session",
        });
        sessionId++;

        // Clarity Session 2pm
        sessions.push({
          id: sessionId.toString(),
          title: "Clarity Session",
          description: "Get clarity on your tech journey and career path.",
          startTime: `${dateStr}T14:00:00`,
          endTime: `${dateStr}T15:00:00`,
          sessionLink: "https://zoom.us/j/clarity-session-mon-2pm",
        });
        sessionId++;

        // Clarity Session 8pm
        sessions.push({
          id: sessionId.toString(),
          title: "Clarity Session",
          description: "Get clarity on your tech journey and career path.",
          startTime: `${dateStr}T20:00:00`,
          endTime: `${dateStr}T21:00:00`,
          sessionLink: "https://zoom.us/j/clarity-session-mon-8pm",
        });
        sessionId++;
        break;

      case 2: // Tuesday
        // Clarity Session 12pm
        sessions.push({
          id: sessionId.toString(),
          title: "Clarity Session",
          description: "Get clarity on your tech journey and career path.",
          startTime: `${dateStr}T12:00:00`,
          endTime: `${dateStr}T13:00:00`,
          sessionLink: "https://zoom.us/j/clarity-session-tue-12pm",
        });
        sessionId++;

        // Clarity Session 8pm
        sessions.push({
          id: sessionId.toString(),
          title: "Clarity Session",
          description: "Get clarity on your tech journey and career path.",
          startTime: `${dateStr}T20:00:00`,
          endTime: `${dateStr}T21:00:00`,
          sessionLink: "https://zoom.us/j/clarity-session-tue-8pm",
        });
        sessionId++;
        break;

      case 3: // Wednesday
        // TechXplore 8pm
        sessions.push({
          id: sessionId.toString(),
          title: "TechXplore",
          description:
            "Explore the latest in technology trends and innovations.",
          startTime: `${dateStr}T20:00:00`,
          endTime: `${dateStr}T21:00:00`,
          sessionLink: "https://zoom.us/j/techxplore-wed",
        });
        sessionId++;

        // Clarity Session 2pm
        sessions.push({
          id: sessionId.toString(),
          title: "Clarity Session",
          description: "Get clarity on your tech journey and career path.",
          startTime: `${dateStr}T14:00:00`,
          endTime: `${dateStr}T15:00:00`,
          sessionLink: "https://zoom.us/j/clarity-session-wed-2pm",
        });
        sessionId++;

        // Clarity Session 8pm
        sessions.push({
          id: sessionId.toString(),
          title: "Clarity Session",
          description: "Get clarity on your tech journey and career path.",
          startTime: `${dateStr}T20:00:00`,
          endTime: `${dateStr}T21:00:00`,
          sessionLink: "https://zoom.us/j/clarity-session-wed-8pm",
        });
        sessionId++;
        break;

      case 4: // Thursday
        // Clarity Session 2pm
        sessions.push({
          id: sessionId.toString(),
          title: "Clarity Session",
          description: "Get clarity on your tech journey and career path.",
          startTime: `${dateStr}T14:00:00`,
          endTime: `${dateStr}T15:00:00`,
          sessionLink: "https://zoom.us/j/clarity-session-thu-2pm",
        });
        sessionId++;

        // Clarity Session 8pm
        sessions.push({
          id: sessionId.toString(),
          title: "Clarity Session",
          description: "Get clarity on your tech journey and career path.",
          startTime: `${dateStr}T20:00:00`,
          endTime: `${dateStr}T21:00:00`,
          sessionLink: "https://zoom.us/j/clarity-session-thu-8pm",
        });
        sessionId++;
        break;

      case 5: // Friday
        // Clarity Session 1pm
        sessions.push({
          id: sessionId.toString(),
          title: "Clarity Session",
          description: "Get clarity on your tech journey and career path.",
          startTime: `${dateStr}T13:00:00`,
          endTime: `${dateStr}T14:00:00`,
          sessionLink: "https://zoom.us/j/clarity-session-fri-1pm",
        });
        sessionId++;

        // Clarity Session 8pm
        sessions.push({
          id: sessionId.toString(),
          title: "Clarity Session",
          description: "Get clarity on your tech journey and career path.",
          startTime: `${dateStr}T20:00:00`,
          endTime: `${dateStr}T21:00:00`,
          sessionLink: "https://zoom.us/j/clarity-session-fri-8pm",
        });
        sessionId++;
        break;

      case 6: // Saturday
        // TechXplore 8pm
        sessions.push({
          id: sessionId.toString(),
          title: "TechXplore",
          description:
            "Explore the latest in technology trends and innovations.",
          startTime: `${dateStr}T20:00:00`,
          endTime: `${dateStr}T21:00:00`,
          sessionLink: "https://zoom.us/j/techxplore-sat",
        });
        sessionId++;
        break;
    }
  });

  return sessions;
};

// Check if a session is currently active (within 30 minutes before start time and hasn't ended)
const isSessionActive = (session: Session): boolean => {
  const now = new Date();
  const startTime = new Date(session.startTime);
  const endTime = new Date(session.endTime);

  // Session is active if it's within 30 minutes of start time and hasn't ended
  const thirtyMinutesBefore = new Date(startTime.getTime() - 30 * 60 * 1000);

  return now >= thirtyMinutesBefore && now <= endTime;
};

export const useActiveSession = () => {
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSessions = async () => {
      try {
        // Get recurring sessions
        const recurringSessions = generateRecurringSessions();

        // Get database sessions
        let dbSessions: Session[] = [];
        try {
          const { data } = await api.get("/api/sessions/active");
          dbSessions = data || [];
        } catch (error) {
          console.error("Error fetching database sessions:", error);
          // Continue with just recurring sessions if DB fails
        }

        // Combine both types of sessions
        const allSessions = [...recurringSessions, ...dbSessions];

        // Filter for active sessions
        const activeSessions = allSessions.filter(isSessionActive);

        // Sort by start time and get the earliest one
        const sortedSessions = activeSessions.sort(
          (a, b) =>
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        );

        setActiveSession(sortedSessions.length > 0 ? sortedSessions[0] : null);
      } catch (error) {
        console.error("Error checking sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSessions();
    // Check every minute for session changes
    const interval = setInterval(checkSessions, 60000);

    return () => clearInterval(interval);
  }, []);

  return { activeSession, loading };
};
