import Link from "next/link";
import Button from "../utilities/Button";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Navbar from "../layout/Navbar";
import Logo from "../layout/Logo";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
}

const VideoModal = ({ isOpen, onClose, videoId, title }: VideoModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-[16px] p-6 w-11/12 max-w-4xl mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[18px] lg:text-[20px] font-semibold text-dark">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>
        <div className="aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="rounded-[12px]"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

const TechRoadmap = () => {
  const [selectedVideo, setSelectedVideo] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const testimonialVideos = [
    {
      title: "How Helen got a role as a data analyst",
      videoId: "qiSzYUoWTEg",
      thumbnail: `https://img.youtube.com/vi/qiSzYUoWTEg/maxresdefault.jpg`,
    },
    {
      title: "How I got promoted",
      videoId: "-FBxXCWKpVw",
      thumbnail: `https://img.youtube.com/vi/-FBxXCWKpVw/maxresdefault.jpg`,
    },
    {
      title: "How I landed an M and E role",
      videoId: "OHC6jyhL4Mw",
      thumbnail: `https://img.youtube.com/vi/OHC6jyhL4Mw/maxresdefault.jpg`,
    },
    {
      title: "I just got hired as a data coach",
      videoId: "jBVy-DyeL5A",
      thumbnail: `https://img.youtube.com/vi/jBVy-DyeL5A/maxresdefault.jpg`,
    },
    {
      title: "How I landed the job where over 90 people enrolled",
      videoId: "lTu71vsTBVU",
      thumbnail: `https://img.youtube.com/vi/lTu71vsTBVU/maxresdefault.jpg`,
    },
    {
      title: "I built a dashboard with Zero Experience",
      videoId: "ERycA__67hM",
      thumbnail: `https://img.youtube.com/vi/ERycA__67hM/maxresdefault.jpg`,
    },
  ];

  const scrollToVideo = () => {
    const videoSection = document.getElementById("main-video-section");
    if (videoSection) {
      videoSection.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const openVideoModal = (videoId: string, title: string) => {
    setSelectedVideo({ id: videoId, title });
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <Logo/>
      <main>
        {/* Hero Section */}
        <section className="mx-auto pt-[20px] lg:pt-[70px] pb-[60px]">
          <div className="w-11/12 mx-auto text-center">
            <h1 className="text-dark text-[28px] lg:text-[48px] font-bold leading-[36px] lg:leading-[60px] mb-6">
              <span className="text-primary">ROADMAP TO LANDING A HIGH PAYING REMOTE TECH JOB</span>{" "}
              IN 3 MONTHS
            </h1>

            <div className="max-w-4xl mx-auto mb-8">
              <p className="text-dark text-[16px] lg:text-[20px] leading-[24px] lg:leading-[28px] mb-6">
                This 30-Minute Video Guide Provides A Clear, Step-By-Step
                Framework To Help You Master The Skills And Experiences That Are Required To Land A High-Paying Remote Tech Job In 3 Months.
              </p>

              <p className="text-[#828282] text-[14px] lg:text-[18px] leading-[22px] lg:leading-[26px]">
                While also helping you cut through the noise, target ideal
                opportunities, and transform your job application success rate
                strategically.
              </p>
            </div>

            <button
              onClick={scrollToVideo}
              className="bg-primary hover:bg-opacity-90 text-white px-8 py-4 rounded-full text-[16px] lg:text-[18px] font-semibold transition-colors mb-4"
            >
              Hit play below ⬇️
            </button>
          </div>
        </section>

        {/* Video Section */}
        <section
          id="main-video-section"
          className="bg-[#FFF4F4] py-12 lg:py-20"
        >
          <div className="w-11/12 lg:w-[70%] mx-auto">
            <div className="relative bg-black rounded-[20px] overflow-hidden shadow-2xl">
              <div className="aspect-video">
                <video
                  width="100%"
                  height="100%"
                  controls
                  className="w-full h-full"
                  poster="img/trmthumbnail.png"
                >
                  <source
                    src="https://player.vimeo.com/progressive_redirect/playback/1114507368/rendition/720p/file.mp4?loc=external&signature=f3d7e98bfe0ceb40eb70ed4a8ecb65d51bedef3f318c44013749137ba82509ba"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            <div className="text-center mt-8">
              <a
                href="https://calendly.com/enquiries-nebiant/clarity-session"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  text="Speak to a career counselor at no cost"
                  classNames="text-[16px] lg:text-[18px] px-8 py-4"
                />
              </a>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-12 lg:py-16">
          <div className="w-11/12 mx-auto text-center">
            <p className="text-[#828282] text-[16px] lg:text-[20px] font-medium mb-8">
              Trusted by over 5,000 students
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-6 h-6 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </section>

        {/* Video Modal */}
        {selectedVideo && (
          <VideoModal
            isOpen={!!selectedVideo}
            onClose={closeVideoModal}
            videoId={selectedVideo.id}
            title={selectedVideo.title}
          />
        )}
      </main>
    </>
  );
};

export default TechRoadmap;