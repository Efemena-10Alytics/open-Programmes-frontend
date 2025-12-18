import React, { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

interface Props {
  src: string;
  classNames?: string;
  autoPlay?: boolean;
  poster?: string;
}

const VideoPlayer: React.FC<Props> = ({
  src,
  classNames,
  autoPlay,
  poster,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="w-full">
      <div className="relative bg-black">
        <video
          ref={videoRef}
          src={src}
          className={`w-full ${classNames}`}
          autoPlay={autoPlay}
          poster={poster}
          controls={false}
          onClick={handlePlayPause}
        />
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="text-white text-4xl">
              <FaPlay />
            </button>
          </div>
        )}
      </div>
      <div className="bg-gray-800 p-2 flex items-center gap-3">
        <button onClick={handlePlayPause} className="text-white">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <span className="text-white text-sm">{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="flex-1"
        />
        <span className="text-white text-sm">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default VideoPlayer;