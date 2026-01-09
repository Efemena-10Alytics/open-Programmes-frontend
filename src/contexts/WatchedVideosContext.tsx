"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";

interface CompletedVideos {
  videoId: string;
  isCompleted: boolean;
}

interface WatchedVideosContextType {
  watchedVideos: CompletedVideos[];
  addWatchedVideo: (videoId: string) => void;
}

const WatchedVideosContext = createContext<
  WatchedVideosContextType | undefined
>(undefined);

interface WatchedVideosProviderProps {
  children: ReactNode;
}

export const WatchedVideosProvider: React.FC<WatchedVideosProviderProps> = ({
  children,
}) => {
  const [watchedVideos, setWatchedVideos] = useState<CompletedVideos[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.completed_videos) {
      console.log("Raw user completed videos:", user.completed_videos);

      const formattedVideos: CompletedVideos[] = user.completed_videos.map(
        (video) => {
          // If user.completed_videos is just an array of IDs
          if (typeof video === "string") {
            return {
              videoId: video,
              isCompleted: true,
            };
          }
          // If user.completed_videos already has a specific structure
          return {
            videoId: video.videoId || video.id,
            isCompleted: true,
          };
        }
      );

      setWatchedVideos(formattedVideos);
    }
  }, [user]);

  const memoizedWatchedVideos = useMemo(() => watchedVideos, [watchedVideos]);

  const addWatchedVideo = (videoId: string) => {
    setWatchedVideos((prev) => {
      const exists = prev.some((video) => video.videoId === videoId);
      if (!exists) {
        return [...prev, { videoId, isCompleted: true }];
      }
      return prev;
    });
  };

  return (
    <WatchedVideosContext.Provider
      value={{ watchedVideos: memoizedWatchedVideos, addWatchedVideo }}
    >
      {children}
    </WatchedVideosContext.Provider>
  );
};

export const useWatchedVideos = () => {
  const context = useContext(WatchedVideosContext);
  if (context === undefined) {
    throw new Error(
      "useWatchedVideos must be used within a WatchedVideosProvider"
    );
  }
  return context;
};
