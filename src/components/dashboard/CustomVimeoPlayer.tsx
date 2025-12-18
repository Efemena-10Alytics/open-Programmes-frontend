import React, { useState, useCallback, useEffect, useRef } from "react";
import Vimeo from "@u-wave/react-vimeo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";
import { Lock, Settings } from "lucide-react";

interface CustomVimeoPlayerProps {
  videoId: string;
  videoUrl: string;
  onVideoWatched: (videoId: string, videoUrl: string) => void;
  courseId: string;
  watchedVideos?: any[];
  initialPosition?: number;
  onTimeUpdate?: (position: number) => void;
  isLocked?: boolean;
}

const CustomVimeoPlayer: React.FC<CustomVimeoPlayerProps> = ({
  videoId,
  videoUrl,
  onVideoWatched,
  courseId,
  watchedVideos = [],
  initialPosition = 0,
  onTimeUpdate,
  isLocked = false,
}) => {
  const [isWatched, setIsWatched] = useState(
    watchedVideos.some((video: any) => video.videoId === videoId)
  );
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const playerRef = useRef<any>(null);
  const queryClient = useQueryClient();
  const progressUpdateRef = useRef<boolean>(false);

  // Available playback speeds
  const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  // Reset progress tracking when video changes
  useEffect(() => {
    progressUpdateRef.current = false;
    setIsWatched(watchedVideos.some((video: any) => video.videoId === videoId));
  }, [videoId, watchedVideos]);

  // Setting initial position and playback rate when the player is ready
  const handleReady = useCallback(async (player: any) => {
    if (isLocked) return;
    
    playerRef.current = player;
    
    // Set initial position if provided
    if (initialPosition > 0) {
      try {
        const duration = await player.getDuration();
        if (initialPosition < duration - 10) {
          player.setCurrentTime(initialPosition);
        }
      } catch (error) {
        console.error("Error setting initial position:", error);
      }
    }

    // Set initial playback rate
    try {
      await player.setPlaybackRate(playbackRate);
    } catch (error) {
      console.error("Error setting playback rate:", error);
    }
  }, [initialPosition, isLocked, playbackRate]);

  // Update playback rate when it changes
  useEffect(() => {
    if (playerRef.current && !isLocked) {
      const updatePlaybackRate = async () => {
        try {
          await playerRef.current.setPlaybackRate(playbackRate);
        } catch (error) {
          console.error("Error updating playback rate:", error);
        }
      };
      updatePlaybackRate();
    }
  }, [playbackRate, isLocked]);

  const { mutate: updateProgress } = useMutation({
    mutationFn: async () => {
      const response = await api.post(
        `/api/courses/${courseId}/update-video-progress`,
        { videoId }
      );
      return response.data;
    },
    onSuccess: () => {
      onVideoWatched(videoId, videoUrl);
    },
  });

  // Tracking video position and completion
  const handleTimeUpdate = useCallback(
    (event: { seconds: number; percent: number }) => {
      if (isLocked) return;
      
      if (onTimeUpdate) {
        onTimeUpdate(event.seconds);
      }

      if (event.percent >= 0.7 && !isWatched && !progressUpdateRef.current) {
        progressUpdateRef.current = true;
        setIsWatched(true);
        updateProgress();
      }
    },
    [isWatched, updateProgress, onTimeUpdate, isLocked]
  );

  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    setShowSpeedMenu(false);
  };

  const toggleSpeedMenu = () => {
    setShowSpeedMenu(!showSpeedMenu);
  };

  if (isLocked) {
    return (
      <div className="w-full aspect-video relative bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <Lock className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-bold mb-2">Content Locked</h2>
          <p className="text-gray-300">Complete previous videos to unlock this content</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video relative">
      <Vimeo
        video={videoUrl}
        autoplay={false}
        onTimeUpdate={handleTimeUpdate}
        onReady={handleReady}
        width="100%"
        height="100%"
        responsive={true}
      />
      
      {/* Speed control button and menu */}
      <div className="absolute bottom-4 right-4 flex items-center space-x-2">
        {showSpeedMenu && (
          <div className="bg-black bg-opacity-80 rounded-lg p-2 absolute bottom-10 right-0 min-w-[100px]">
            {playbackSpeeds.map((speed) => (
              <button
                key={speed}
                onClick={() => handleSpeedChange(speed)}
                className={`w-full text-left px-3 py-2 rounded-md text-white text-sm hover:bg-gray-700 transition-colors ${
                  playbackRate === speed ? 'bg-blue-600' : ''
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        )}
        
        <button
          onClick={toggleSpeedMenu}
          className="bg-black bg-opacity-70 text-white px-3 py-2 rounded-md text-sm flex items-center space-x-2 hover:bg-opacity-90 transition-all"
        >
          <Settings className="w-4 h-4" />
          <span>{playbackRate}x</span>
        </button>
      </div>

      {initialPosition > 0 && (
        <div className="absolute bottom-16 left-0 right-0 flex justify-center">
          <div className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-sm transition-opacity duration-1000 opacity-0 hover:opacity-100">
            Resuming from previous position
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomVimeoPlayer;