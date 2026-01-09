"use client";
import React, { useEffect, useState } from "react";
import {
  IoIosCheckmarkCircle,
  IoMdArrowDropdown,
  IoMdArrowDropup,
} from "react-icons/io";
import CourseModuleModel from "../../models/CourseModule";
import { Lock } from "lucide-react";

interface CompletedVideos {
  videoId: string;
  isCompleted: boolean;
}

interface Props {
  module: CourseModuleModel;
  onVideoSelect: (
    videoId: string,
    videoUrl: string,
    videoTitle: string,
    weekIndex: number
  ) => void;
  watchedVideos: any[]; // Changed from CompletedVideos[] to any[] to match parent component
  weekIndex: number;
  isWeekUnlocked: boolean;
}

const ModulePanel = ({ module, onVideoSelect, watchedVideos, weekIndex, isWeekUnlocked }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<null | string>(null);

  const extractVideoId = (url: string): string => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  const handleVideoClick = (videoId: string, videoUrl: string, videoTitle: string) => {
    if (!isWeekUnlocked) return;
    setActiveVideoId(videoId);
    onVideoSelect(videoId, videoUrl, videoTitle, weekIndex);
  };

  // Check if a video is completed by looking for its ID in the watchedVideos array
  const isVideoCompleted = (videoId: string): boolean => {
    return watchedVideos.some((video: any) => video.videoId === videoId);
  };

  return (
    <div
      className="flex flex-col gap-1  border-b-[0.4px] pb-1 border-[#DADADA]
     mt-1 mb-4 cursor-pointer 
    "
    >
      <div>
        <div
          className="flex justify-between mb-4 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h2 className="text-[15px]">{module.title}</h2>
          {isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
        </div>
        {isOpen && (
          <>
            {module.projectVideos.map((video, i) => {
              const videoUrl = extractVideoId(video.videoUrl);
              const videoId = video.id;
              const isCompleted = isVideoCompleted(videoId);
              const isActive = activeVideoId === videoId;

              return (
                <div
                  className="flex flex-col gap-3 text-[13px] font-light border-l pl-1 py-1"
                  key={`${videoId}-${isCompleted}`}
                  onClick={() => handleVideoClick(videoId, videoUrl, video.title)}
                >
                  <div className={`flex justify-between items-center ${isWeekUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                    <div className="flex items-center gap-2">
                      <IoIosCheckmarkCircle
                        className={`text-[16px] ${
                          isCompleted ? "text-primary" : "text-gray-400"
                        }`}
                      />
                      <span
                        className={`${
                          isActive ? "font-medium text-primary" : ""
                        } ${!isWeekUnlocked ? 'text-gray-400' : ''}`}
                      >
                        {video.title}
                      </span>
                    </div>
                    {!isWeekUnlocked ? (
                      <Lock className="w-4 h-4 text-red-400" />
                    ) : (
                      <img src="/svg/lock.svg" alt="" className="opacity-0" />
                    )}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default ModulePanel;