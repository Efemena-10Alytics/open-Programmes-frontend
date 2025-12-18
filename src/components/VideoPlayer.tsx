// @ts-nocheck

import React, { useEffect, useRef, useState } from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { IconContext } from "react-icons";
import { FaPause, FaPlay } from "react-icons/fa";
import VerticalRangeSlider from "../dashboard/VerticalRangeSlider";

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
  const playerRef = useRef<HTMLDivElement | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
      videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        videoRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      }
    };
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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
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

  const handleSeekForward = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      videoRef.current.currentTime = currentTime + 10;
    }
  };

  const handleSeekBackward = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      videoRef.current.currentTime = currentTime - 10;
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      setIsMuted(true);
      setVolume(0);
    }
  };

  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      if (volume === 0) {
        setVolume(0.5);
        videoRef.current.volume = 0.5;
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volumeValue = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = volumeValue;
      setVolume(volumeValue);
      setIsMuted(volumeValue === 0);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleFullscreen = () => {
    if (playerRef.current) {
      if (!isFullScreen) {
        enterFullscreen(playerRef.current);
      } else {
        exitFullscreen();
      }
    }
  };

  const enterFullscreen = (element: HTMLElement) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
    setIsFullScreen(true);
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsFullScreen(false);
  };

  //   const handleFullscreenChange = () => {
  //     setIsFullScreen(
  //       !!(
  //         document.fullscreenElement ||
  //         document.webkitFullscreenElement ||
  //         document.mozFullScreenElement ||
  //         document.msFullscreenElement
  //       )
  //     );
  //   };

  //   const handleFullscreen = () => {
  //     if (videoRef.current) {
  //       if (!isFullScreen) {
  //         if (videoRef.current.requestFullscreen) {
  //           videoRef.current.requestFullscreen();
  //         }
  //         // else if (videoRef.current.mozRequestFullScreen) {
  //         //   videoRef.current.mozRequestFullScreen();
  //         // } else if (videoRef.current.webkitRequestFullscreen) {
  //         //   videoRef.current.webkitRequestFullscreen();
  //         // } else if (videoRef.current.msRequestFullscreen) {
  //         //   videoRef.current.msRequestFullscreen();
  //         // }
  //       } else {
  //         if (document.exitFullscreen) {
  //           document.exitFullscreen();
  //         }
  //         // else if (document.mozCancelFullScreen) {
  //         //   document.mozCancelFullScreen();
  //         // } else if (document.webkitExitFullscreen) {
  //         //   document.webkitExitFullscreen();
  //         // } else if (document.msExitFullscreen) {
  //         //   document.msExitFullscreen();
  //         // }
  //       }
  //     }
  //   };

  //   const handleFullscreenChange = () => {
  //     setIsFullScreen(
  //       !!(
  //         document.fullscreenElement
  //         // ||
  //         // document.webkitFullscreenElement ||
  //         // document.mozFullScreenElement ||
  //         // document.msFullscreenElement
  //       )
  //     );
  //   };

  //   useEffect(() => {
  //     document.addEventListener("fullscreenchange", handleFullscreenChange);
  //     document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
  //     document.addEventListener("mozfullscreenchange", handleFullscreenChange);
  //     document.addEventListener("MSFullscreenChange", handleFullscreenChange);

  //     return () => {
  //       document.removeEventListener("fullscreenchange", handleFullscreenChange);
  //       document.removeEventListener(
  //         "webkitfullscreenchange",
  //         handleFullscreenChange
  //       );
  //       document.removeEventListener(
  //         "mozfullscreenchange",
  //         handleFullscreenChange
  //       );
  //       document.removeEventListener(
  //         "MSFullscreenChange",
  //         handleFullscreenChange
  //       );
  //     };
  //   }, []);
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
        console.log("played");
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        console.log("paused");
      }
    }
  };

  return (
    <div ref={playerRef} className="w-full">
      <div className="relative bg-slate-400">
        <video
          ref={videoRef}
          autoPlay={autoPlay}
          src={src}
          // src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
          controls={false}
          playsInline
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onClick={handleVideoClick}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className={`w-full ${classNames}`}
          poster={poster}
          // muted={true}
        ></video>
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <IconContext.Provider value={{ className: "text-white text-xl" }}>
              <FaPlay onClick={handleVideoClick} />
            </IconContext.Provider>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 px-2 w-full h-[30px] text-white flex flex-col gap-2 items-center justify-between">
        <div className="flex gap-2 justify-between items-center text-xs h-[30px]">
          <button onClick={handlePlayPause} className="max-w-fit">
            {isPlaying ? (
              // <PauseCircle variant="Bold" />
              <FaPause />
            ) : (
              // <PlayCircle variant="Bold" />
              <FaPlay />
            )}
          </button>
          <span className="">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="block w-full"
            style={{
              background: `linear-gradient(to right, #007bff 0%, #007bff ${
                (currentTime / duration) * 100
              }%, #ddd ${(currentTime / duration) * 100}%, #ddd 100%)`,
            }}
          />
          <span className="">{formatTime(duration)}</span>
          <div className="flex gap-2 items-center">
            <div className="flex gap-3 items-center">
              {isMuted ? (
                <button onClick={handleUnmute}>
                  {/* <VolumeCross size="15px" /> */}
                  vc
                </button>
              ) : (
                <button onClick={handleMute}>
                  {/* <VolumeHigh size="15px" /> */}
                  vh
                </button>
              )}
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                className="max-w-[50px]"
                style={{
                  background: `linear-gradient(to right, #007bff 0%, #007bff ${
                    volume * 100
                  }%, #ddd ${volume * 100}%, #ddd 100%)`,
                }}
              />
              {/* <VerticalRangeSlider
                min={0}
                max={1}
                step={0.01}
                value={volume}
                className="max-w-[100px]"
                style={{
                  background: `linear-gradient(to right, #007bff 0%, #007bff ${
                    volume * 100
                  }%, #ddd ${volume * 100}%, #ddd 100%)`,
                }}
              /> */}
            </div>
          </div>
        </div>

        {/* <div className="flex items-center justify-between  w-full"> */}
        {/* <button className="text-[23px]" onClick={handleFullscreen}>
            {isFullScreen ? (
              <AiOutlineFullscreenExit size={"15px"} />
            ) : (
              <AiOutlineFullscreen size={"15px"} />
            )}
          </button> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default VideoPlayer;
